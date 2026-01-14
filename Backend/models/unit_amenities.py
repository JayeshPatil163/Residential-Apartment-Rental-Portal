from extensions import db

class UnitAmenity(db.Model):
    __tablename__ = "unit_amenities"

    unit_id = db.Column(db.Integer, db.ForeignKey("units.id"), primary_key=True)
    amenity_id = db.Column(db.Integer, db.ForeignKey("amenities.id"), primary_key=True)
