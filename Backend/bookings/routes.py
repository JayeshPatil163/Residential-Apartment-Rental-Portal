from flask import Blueprint, request, jsonify
from models.booking import Booking
from models.unit import Unit
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

bookings_bp = Blueprint("bookings", __name__, url_prefix="/bookings")

@bookings_bp.route("", methods=["GET"], endpoint="get_bookings")
@jwt_required()
def get_bookings():

    identity = int(get_jwt_identity())
    
    bookings = Booking.query.filter_by(user_id=identity).all()

    return jsonify([
        {
            "id": b.id,
            "unit_number": Unit.query.filter_by(id=b.unit_id).first().unit_number,
            "status": b.status,
            "created_at": b.created_at
        } for b in bookings
    ])

@bookings_bp.route("", methods=["POST"], endpoint="create_booking")
@jwt_required()
def create_booking():

    data = request.get_json()
    identity = int(get_jwt_identity())
    
    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    unit = Unit.query.filter_by(id=data["unit_id"], is_available=True).first()

    if not unit:
        return jsonify({"message": "Unit not available"}), 400
    
    booking = Booking(
        user_id=identity,
        unit_id=unit.id,
    )

    db.session.add(booking)
    db.session.commit()

    return jsonify({"message" : "Booking requested"}), 201