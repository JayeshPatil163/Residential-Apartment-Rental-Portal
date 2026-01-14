from flask import Blueprint, jsonify, request
from models.amenity import Amenity
from flask_jwt_extended import jwt_required
from utils.auth import role_required
from extensions import db

amenity_bp = Blueprint("amenities", __name__, url_prefix="/amenities")

@amenity_bp.route("", methods=["GET"], endpoint="get_amenities")
def get_amenities():

    amenities = Amenity.query.all()

    return jsonify([
        {
            "id": a.id,
            "name": a.name
        } for a in amenities
    ])

@amenity_bp.route("/", methods=["POST"], endpoint="create_amenity")
@role_required("ADMIN")
@jwt_required()
def create_amenity():

    data = request.get_json()
    
    if not data:
        return jsonify({"message": "No data provided"}), 400
    
    amenity = Amenity(
        name = data["name"]
    )

    db.session.add(amenity)
    db.session.commit()

    return jsonify({"message" : "Amenity created"}), 201