from typing import Optional, Dict, Any
from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    """
    طرح‌واره توکن دسترسی
    """
    access_token: str
    token_type: str
    user: Dict[str, Any]

class TokenPayload(BaseModel):
    """
    طرح‌واره محتوای توکن JWT
    """
    email: Optional[EmailStr] = None 