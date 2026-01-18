from flask import Flask, jsonify
from config import Config
from extensions import db, jwt
from models.user import User
from models.unit import Unit
from models.booking import Booking
from models.amenity import Amenity
from models.unit_amenities import UnitAmenity
from auth.routes import auth_bp
from units.routes import units_bp
from bookings.routes import bookings_bp
from admin.routes import admin_bp
from amenity.routes import amenity_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    CORS(app, origins=["http://localhost:4200"])


    db.init_app(app)

    with app.app_context():
        db.create_all()
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(units_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(amenity_bp)

    @app.route("/health")
    def health():
        return jsonify({"status": "Backend is running"})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
