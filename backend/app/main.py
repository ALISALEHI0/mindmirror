from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, users, data
from app.core.config import settings

# ایجاد نمونه FastAPI
app = FastAPI(
    title="MindMirror AI API",
    description="API برای پروفایل شناختی از طریق یکپارچه‌سازی داده‌های چند حسی",
    version="0.1.0"
)

# تنظیم CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # آدرس فرانت‌اند
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# اضافه کردن روت‌های API
app.include_router(auth.router, prefix="/api/auth", tags=["احراز هویت"])
app.include_router(users.router, prefix="/api/users", tags=["کاربران"])
app.include_router(data.router, prefix="/api/data", tags=["داده‌ها"])

@app.get("/", tags=["سلامت"])
async def root():
    """
    بررسی وضعیت سرویس
    """
    return {
        "status": "آنلاین",
        "service": "MindMirror AI API",
        "version": "0.1.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    ) 