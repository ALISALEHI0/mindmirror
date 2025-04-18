from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# ایجاد موتور SQLAlchemy
engine = create_engine(settings.DATABASE_URL)

# ایجاد کلاس جلسه پایگاه داده
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 