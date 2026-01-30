from flask import Blueprint, jsonify
from models.unit import Unit
from flask_jwt_extended import jwt_required
from utils.auth import role_required

units_bp = Blueprint("units", __name__, url_prefix="/units")

@units_bp.route("", methods=["GET"], endpoint="get_units")
def get_units():
    from flask import request
    
    tower_id = request.args.get("tower_id")
    
    if tower_id:
        units = Unit.query.filter_by(tower_id=tower_id).all()
    else:
        units = Unit.query.all()

    return jsonify([
        {
            "id" : u.id,
            "unit_number": u.unit_number,
            "bedrooms": u.bedrooms,
            "rent": u.rent,
            "is_available": u.is_available,
            "amenities": [{"id": a.id, "name": a.name} for a in u.amenities],
            "tower": {"id": u.tower.id, "name": u.tower.name} if u.tower else None,
            "image_url": u.image_url
        } for u in units
    ])

@units_bp.route("", methods=["POST"], endpoint="create_unit")
@role_required("ADMIN")
@jwt_required()
def create_unit():
    from flask import request
    from extensions import db

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    unit = Unit(
        unit_number=data["unit_number"],
        bedrooms=data["bedrooms"],
        rent=data["rent"],
        is_available=data.get("is_available", True),
        tower_id=data.get("tower_id"),
        image_url=data.get("image_url")
    )

    if "amenities_ids" in data and len(data["amenities_ids"]) > 0:
        from models.amenity import Amenity
        unit.amenities.extend( Amenity.query.filter(Amenity.id.in_(data["amenities_ids"])).all())

    db.session.add(unit)
    db.session.commit()

    return jsonify({"message": "Unit created successfully"}), 201