from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.core.config import settings
from app.api.deps import get_db
from app.core.security import create_access_token, verify_password, get_password_hash
from app.schemas.user import UserCreate, UserInDB, User
from app.schemas.token import Token, TokenPayload
from app.services.user_service import get_user_by_email, create_user

router = APIRouter()

@router.post("/register", response_model=User)
async def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    ثبت‌نام کاربر جدید
    """
    # بررسی وجود ایمیل در پایگاه داده
    db_user = get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ایمیل وارد شده قبلاً ثبت شده است"
        )
    
    # ایجاد کاربر جدید
    return create_user(db=db, user=user_in)

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    ورود کاربر و دریافت توکن دسترسی
    """
    # بررسی کاربر با ایمیل وارد شده
    user = get_user_by_email(db, email=form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ایمیل یا رمز عبور اشتباه است",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # بررسی صحت رمز عبور
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ایمیل یا رمز عبور اشتباه است",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # ایجاد توکن دسترسی
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    دریافت کاربر فعلی بر اساس توکن
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="اعتبارنامه‌های نامعتبر",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # رمزگشایی توکن
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenPayload(email=email)
    except JWTError:
        raise credentials_exception
    
    # دریافت کاربر از پایگاه داده
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=User)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    """
    دریافت اطلاعات کاربر فعلی
    """
    return current_user 