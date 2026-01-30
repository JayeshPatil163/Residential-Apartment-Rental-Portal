from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models.booking import Booking
from models.unit import Unit
from models.unit_amenities import UnitAmenity
from models.amenity import Amenity
from utils.auth import role_required
from models.user import User
from extensions import db
from sqlalchemy import func

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

@admin_bp.route("/bookings", methods=["GET"])
@jwt_required()
@role_required("ADMIN")
def get_all_bookings():
   
    if request.args.get("status") == "APPROVED":
        bookings = Booking.query.filter_by(status="APPROVED").all()
    else:
        bookings = Booking.query.all()

    return jsonify([
      {
         "id": b.id,
         "unit_id": Unit.query.get(b.unit_id).unit_number,
         "user_id": User.query.get(b.user_id).name,
         "status": b.status,
         "payment_status": b.payment_status == "PAID" and "PAID" or "PENDING",
         "created_at": b.created_at,
         "tower": Unit.query.get(b.unit_id).tower.name,
      } for b in bookings
   ])


@admin_bp.route("/bookings/<int:booking_id>/approve", methods=["POST"])
@jwt_required()
@role_required("ADMIN")
def approve_booking(booking_id):
   
    if request.args.get("rent") == "Collecting rent" :
        booking = Booking.query.get(booking_id)
        booking.payment_status = "PAID"
        db.session.commit()
        return jsonify({"message": "Rent collected successfully"}), 201
    
    booking = Booking.query.get(booking_id)

    if not booking:
       return jsonify({"message": "Booking not found"}), 404
   
    booking.status = "APPROVED"
    booking.is_active_tenant = True
    unit = Unit.query.get(booking.unit_id)
    unit.is_available = False

    db.session.commit()
    return jsonify({"message": "Booking approved successfully"}), 201

@admin_bp.route("/bookings/<int:booking_id>/decline", methods=["POST"])
@jwt_required()
@role_required("ADMIN")
def decline_booking(booking_id):

    if request.args.get("action") == "Terminating":
        booking = Booking.query.get(booking_id)
        booking.status = "TERMINATED"
        unit = Unit.query.get(booking.unit_id)
        unit.is_available = True
        booking.is_active_tenant = False
        booking.payment_status = "UNPAID"
        db.session.commit()
        return jsonify({"message": "Booking terminated successfully"}), 201
   
    booking = Booking.query.get(booking_id)

    if not booking:
       return jsonify({"message": "Booking not found"}), 404
   
    booking.status = "DECLINED"

    db.session.commit()
    return jsonify({"message": "Booking declined successfully"}), 201


@admin_bp.route("/units/<int:unit_id>/amenities", methods=["POST"])
@role_required("ADMIN")
@jwt_required()
def add_amenity_to_unit(unit_id):

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    aminity_ids = data.get("amenity_ids", [])

    unit = Unit.query.get(unit_id)
    if not unit:
        return jsonify({"message": "Unit not found"}), 404
    
    UnitAmenity.query.filter_by(unit_id=unit_id).delete()

    for amenity_id in aminity_ids:
        amenity = Amenity.query.get(amenity_id)
        if amenity:
            unit_amenity = UnitAmenity(
                unit_id=unit_id,
                amenity_id=amenity_id
            )
            db.session.add(unit_amenity)


    db.session.commit()
    return jsonify({"message": "Amenities updated for unit"}), 201


@admin_bp.route("/dashboard-stats", methods=["GET"])
@role_required("ADMIN")
@jwt_required()
def get_dashboard_stats():
    total_units = Unit.query.count()
    vacant_units = Unit.query.filter_by(is_available=True).count()
    occupied_units = Unit.query.filter_by(is_available=False).count()
    
    total_revenue = db.session.query(func.sum(Unit.rent)).filter(Unit.is_available == False).scalar() or 0
    

    payments = Booking.query.filter_by(status="APPROVED").order_by(Booking.created_at.desc()).all()

    recent_payments = []
    for payment in payments:
        recent_payments.append({
            "date": payment.created_at.strftime("%Y-%m-%d"),
            "tenant": payment.user.name,
            "amount": payment.unit.rent,
            "status": payment.payment_status == "PAID" and "Paid" or "Pending"
        })

    return jsonify({
        "total_units": total_units,
        "vacant_units": vacant_units,
        "occupied_units": occupied_units,
        "total_revenue": total_revenue,
        "recent_payments": recent_payments
    })