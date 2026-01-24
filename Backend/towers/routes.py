from flask import Blueprint, request, jsonify
from extensions import db, jwt
from models.tower import Tower
from flask_jwt_extended import jwt_required, get_jwt
from utils.auth import role_required

towers_bp = Blueprint("towers", __name__, url_prefix="/towers")

@towers_bp.route("", methods=["POST"])
@role_required("ADMIN")
@jwt_required()
def create_tower():

    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"message": "Name is required"}), 400

    if Tower.query.filter_by(name=data["name"]).first():
        return jsonify({"message": "Tower already exists"}), 400

    tower = Tower(name=data["name"])
    db.session.add(tower)
    db.session.commit()

    return jsonify({"message": "Tower created successfully", "tower": tower.to_dict()}), 201

@towers_bp.route("", methods=["GET"])
@role_required("ADMIN")
@jwt_required()
def get_towers():
    towers = Tower.query.all()
    return jsonify([tower.to_dict() for tower in towers]), 200
