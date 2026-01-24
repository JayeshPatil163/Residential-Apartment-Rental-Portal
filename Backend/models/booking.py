from extensions import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    unit_id = db.Column(db.Integer, db.ForeignKey("units.id"))
    status = db.Column(db.String(20), default="PENDING")
    is_active_tenant = db.Column(db.Boolean, default=False)
    payment_status = db.Column(db.String(20), default="UNPAID")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="bookings")
    unit = db.relationship("Unit", backref="bookings")

    def to_dict(self):
        return {
            "id": self.id,
            "user_name": self.user.username if self.user else "Unknown",
            "unit_number": self.unit.unit_number if self.unit else "N/A",
            "status": self.status,
            "payment_status": self.payment_status,
            "is_active": self.is_active_tenant,
            "created_at": self.created_at.isoformat()
        }