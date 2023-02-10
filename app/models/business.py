from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Business(db.Model):
  __tablename__ = 'businesses'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  store_name = db.Column(db.String, nullable=False)
  description = db.Column(db.String, nullable=False)
  city = db.Column(db.String, nullable=False)
  state = db.Column(db.String, nullable=False)
  address = db.Column(db.String, nullable=False)
  zipcode = db.Column(db.Integer, nullable=False)
  business_type = db.Column(db.String, nullable=False)
  opening_time = db.Column(db.Time, nullable=False)
  closing_time = db.Column(db.Time, nullable=False)
  phone_num = db.Column(db.Integer, nullable=False)
  avg_rating = db.Column(db.Numeric(2, 1), nullable=False)
  num_reviews = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
  updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  business_images = db.relationship("BusinessImages", back_populates="business_images")

  def to_dict(self):
    return {
      "id": self.id,
      "owner_id": self.owner_id,
      "store_name": self.store_name,
      "description": self.description,
      "city": self.city,
      "state": self.state,
      "address": self.address,
      "zipcode": self.zipcode,
      "business_type": self.business_type,
      "opening_time": self.opening_time,
      "closing_time": self.closing_time,
      "phone_num": self.phone_num,
      "avg_rating": self.avg_rating,
      "num_reviews": self.num_reviews
    }
