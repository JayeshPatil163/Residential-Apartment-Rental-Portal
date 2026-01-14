from flask import Blueprint, jsonify
from models.unit import Unit

units_bp = Blueprint("units", __name__, url_prefix="/units")

@units_bp.route("", methods=["GET"])
def get_units():

    units = Unit.query.all()

    return jsonify([
        {
            "id" : u.id,
            "unit_number": u.unit_number,
            "bedrooms": u.bedrooms,
            "rent": u.rent,
            "is_available": u.is_available,
            "amenities": [a.name for a in u.amenities]
        } for u in units
    ])

@units_bp.route("/entry", methods=["POST"])
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
        is_available=data.get("is_available", True)
    )

    db.session.add(unit)
    db.session.commit()

    return jsonify({"message": "Unit created successfully"}), 201