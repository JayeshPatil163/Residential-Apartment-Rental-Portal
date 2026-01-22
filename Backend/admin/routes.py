from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models.booking import Booking
from models.unit import Unit
from models.unit_amenities import UnitAmenity
from models.amenity import Amenity
from utils.auth import role_required
from models.user import User
from extensions import db

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

@admin_bp.route("/bookings", methods=["GET"])
@jwt_required()
@role_required("ADMIN")
def get_all_bookings():
   
   bookings = Booking.query.all()
   return jsonify([
      {
         "id": b.id,
         "unit_id": Unit.query.get(b.unit_id).unit_number,
         "user_id": User.query.get(b.user_id).name,
         "status": b.status,
         "created_at": b.created_at,
      } for b in bookings
   ])


@admin_bp.route("/bookings/<int:booking_id>/approve", methods=["POST"])
@jwt_required()
@role_required("ADMIN")
def approve_booking(booking_id):
   
    booking = Booking.query.get(booking_id)

    if not booking:
       return jsonify({"message": "Booking not found"}), 404
   
    booking.status = "APPROVED"
    unit = Unit.query.get(booking.unit_id)
    unit.is_available = False

    db.session.commit()
    return jsonify({"message": "Booking approved successfully"}), 201


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