from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    """
    طرح‌واره پایه کاربر
    """
    email: EmailStr
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None

class UserCreate(UserBase):
    """
    طرح‌واره برای ایجاد کاربر
    """
    password: str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    """
    طرح‌واره برای به‌روزرسانی کاربر
    """
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8)

class UserInDB(UserBase):
    """
    طرح‌واره کاربر در پایگاه داده
    """
    id: int
    is_active: bool
    is_admin: bool
    hashed_password: str
    
    class Config:
        orm_mode = True

class User(UserBase):
    """
    طرح‌واره کاربر برای پاسخ‌های API
    """
    id: int
    is_active: bool
    
    class Config:
        orm_mode = True 