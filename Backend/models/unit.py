from extensions import db

class Unit(db.Model):
    __tablename__ = "units"

    id = db.Column(db.Integer, primary_key=True)
    unit_number = db.Column(db.String(50), nullable=False)
    bedrooms = db.Column(db.Integer)
    rent = db.Column(db.Float)
    is_available = db.Column(db.Boolean, default=True)

    amenities = db.relationship(
        "Amenity",
        secondary="unit_amenities",
        backref="units"
    )
