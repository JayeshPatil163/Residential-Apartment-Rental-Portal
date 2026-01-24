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

    tower_id = db.Column(db.Integer, db.ForeignKey("towers.id"), nullable=True)
    tower = db.relationship("Tower", backref="units")

    def to_dict(self):
        return {
            "id": self.id,
            "unit_number": self.unit_number,
            "bedrooms": self.bedrooms,
            "rent": self.rent,
            "is_available": self.is_available,
            "tower_name": self.tower.name if self.tower else "N/A",
            "tower_id": self.tower_id,
            "amenities": [a.name for a in self.amenities]
        }