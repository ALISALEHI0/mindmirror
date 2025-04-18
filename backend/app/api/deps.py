from typing import Generator
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.db.session import SessionLocal
from app.schemas.token import TokenPayload
from app.services.user_service import get_user_by_email
from app.api.routes.auth import get_current_user

def get_db() -> Generator[Session, None, None]:
    """
    تابع وابستگی برای دریافت جلسه پایگاه داده
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# وابستگی برای دسترسی کاربران معمولی
get_current_active_user = get_current_user

# وابستگی برای دسترسی ادمین‌ها
def get_current_admin_user(current_user = Depends(get_current_user)):
    """
    تابع وابستگی برای دسترسی ادمین‌ها
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="شما به این بخش دسترسی ندارید",
        )
    return current_user 