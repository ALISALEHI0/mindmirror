import logging
from sqlalchemy.orm import Session

from app.db.session import engine
from app.models.base import Base
from app.core.security import get_password_hash
from app.models.user import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    """
    اولیه‌سازی پایگاه داده
    """
    # ایجاد جداول
    Base.metadata.create_all(bind=engine)
    
    # بررسی وجود کاربر ادمین
    user = db.query(User).filter(User.email == "admin@mindmirror.ai").first()
    if not user:
        logger.info("ایجاد کاربر ادمین")
        admin_user = User(
            email="admin@mindmirror.ai",
            name="ادمین سیستم",
            hashed_password=get_password_hash("adminpassword"),  # در محیط واقعی، یک رمز عبور قوی استفاده کنید
            is_active=True,
            is_admin=True
        )
        db.add(admin_user)
        db.commit()
        logger.info("کاربر ادمین با موفقیت ایجاد شد")
    
    logger.info("پایگاه داده اولیه‌سازی شد") 