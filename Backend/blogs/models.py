from database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    caption = Column(String, nullable=False)
    title = Column(String, nullable=False)
    image_url = Column(String, nullable=True)
    image_public_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
