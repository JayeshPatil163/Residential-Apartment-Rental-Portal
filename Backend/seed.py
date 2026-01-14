from app import create_app
from extensions import db
from models.user import User
from models.unit import Unit
from models.amenity import Amenity
from models.unit_amenities import UnitAmenity
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    if not User.query.filter_by(email="admin@test.com").first():
        admin = User(
            name="Admin",
            email="admin@test.com",
            password_hash=generate_password_hash("admin123"),
            role="ADMIN"
        )
        db.session.add(admin)

    if Unit.query.count() == 0:
        units = [
            Unit(unit_number="A101", bedrooms=2, rent=15000),
            Unit(unit_number="A102", bedrooms=3, rent=20000),
            Unit(unit_number="B201", bedrooms=1, rent=12000),
        ]
        db.session.add_all(units)

    if Amenity.query.count() == 0:
        amenities = [
            Amenity(name="Gym"),
            Amenity(name="Pool"),
            Amenity(name="Parking"),
        ]
        db.session.add_all(amenities)

    db.session.commit()

    if UnitAmenity.query.count() == 0:
        gym = Amenity.query.filter_by(name="Gym").first()
        parking = Amenity.query.filter_by(name="Parking").first()
        pool = Amenity.query.filter_by(name="Pool").first()

        unit1 = Unit.query.filter_by(unit_number="A101").first()
        unit2 = Unit.query.filter_by(unit_number="A102").first()

        if unit1 and gym:
            db.session.add(UnitAmenity(unit_id=unit1.id, amenity_id=gym.id))
        if unit1 and parking:
            db.session.add(UnitAmenity(unit_id=unit1.id, amenity_id=parking.id))
        if unit2 and pool:
            db.session.add(UnitAmenity(unit_id=unit2.id, amenity_id=pool.id))

        db.session.commit()

    print("Seed data inserted successfully.")
