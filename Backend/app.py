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

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    with app.app_context():
        db.create_all()
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(units_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(admin_bp)

    @app.route("/health")
    def health():
        return jsonify({"status": "ok"})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
