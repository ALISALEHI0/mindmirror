from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_active_user, get_current_admin_user
from app.schemas.user import User, UserUpdate, UserCreate
from app.models.user import User as UserModel
from app.services.user_service import get_user, get_users, update_user, delete_user

router = APIRouter()

@router.get("/", response_model=List[User])
async def read_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_admin_user)
):
    """
    دریافت لیست تمام کاربران (فقط ادمین)
    """
    users = get_users(db, skip=skip, limit=limit)
    return users

@router.get("/{user_id}", response_model=User)
async def read_user(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    دریافت اطلاعات یک کاربر با شناسه
    """
    # کاربر فقط می‌تواند اطلاعات خودش را ببیند مگر اینکه ادمین باشد
    if user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="شما به این اطلاعات دسترسی ندارید"
        )
    
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="کاربر پیدا نشد")
    return db_user

@router.put("/{user_id}", response_model=User)
async def update_user_info(
    user_id: int, 
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    به‌روزرسانی اطلاعات کاربر
    """
    # کاربر فقط می‌تواند اطلاعات خودش را تغییر دهد مگر اینکه ادمین باشد
    if user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="شما اجازه تغییر اطلاعات این کاربر را ندارید"
        )
    
    db_user = update_user(db, user_id=user_id, user_update=user_update)
    if db_user is None:
        raise HTTPException(status_code=404, detail="کاربر پیدا نشد")
    return db_user

@router.delete("/{user_id}", response_model=User)
async def delete_user_account(
    user_id: int, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    حذف کاربر
    """
    # کاربر فقط می‌تواند حساب خودش را حذف کند مگر اینکه ادمین باشد
    if user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="شما اجازه حذف این کاربر را ندارید"
        )
    
    db_user = delete_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="کاربر پیدا نشد")
    return db_user 