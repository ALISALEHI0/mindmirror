from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_active_user
from app.models.user import User as UserModel
from app.services.eeg_service import process_eeg_data
from app.services.audio_service import process_audio_data
from app.schemas.data import EEGData, AudioData, CognitiveData, EmotionData, BrainwaveData

router = APIRouter()

@router.post("/eeg", response_model=Dict[str, Any])
async def upload_eeg_data(
    eeg_data: EEGData,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    آپلود و پردازش داده‌های EEG
    """
    # پردازش داده‌های EEG
    result = process_eeg_data(db, current_user.id, eeg_data)
    
    return {
        "status": "موفقیت",
        "message": "داده‌های EEG با موفقیت ثبت شدند",
        "brainwaveData": result.get("brainwave_data"),
        "cognitiveData": result.get("cognitive_data")
    }

@router.post("/audio", response_model=Dict[str, Any])
async def upload_audio_data(
    audio_file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    آپلود و پردازش داده‌های صوتی
    """
    # بررسی نوع فایل
    if not audio_file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="فایل باید از نوع صوتی باشد"
        )
    
    # خواندن محتوای فایل
    audio_data = await audio_file.read()
    
    # پردازش داده‌های صوتی
    result = process_audio_data(db, current_user.id, audio_data)
    
    return {
        "status": "موفقیت",
        "message": "داده‌های صوتی با موفقیت ثبت شدند",
        "emotionData": result.get("emotion_data")
    }

@router.get("/cognitive", response_model=CognitiveData)
async def get_cognitive_data(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    دریافت داده‌های شناختی کاربر
    """
    # اینجا در نسخه واقعی، از پایگاه داده یا InfluxDB داده‌ها را دریافت می‌کنیم
    # برای نمونه، داده‌های شبیه‌سازی شده برمی‌گردانیم
    
    return {
        "current": [75, 65, 40, 80, 85, 70],
        "average": [60, 60, 50, 65, 70, 60],
        "trend": [
            [50, 55, 60, 65, 70, 75],
            [40, 45, 50, 55, 60, 65],
            [30, 35, 40, 45, 50, 40],
            [60, 65, 70, 75, 80, 80],
            [65, 70, 75, 80, 85, 85],
            [50, 55, 60, 65, 70, 70]
        ]
    }

@router.get("/emotion", response_model=EmotionData)
async def get_emotion_data(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    دریافت داده‌های احساسی کاربر
    """
    # اینجا در نسخه واقعی، از پایگاه داده یا InfluxDB داده‌ها را دریافت می‌کنیم
    # برای نمونه، داده‌های شبیه‌سازی شده برمی‌گردانیم
    
    return {
        "labels": ["۸:۰۰", "۱۰:۰۰", "۱۲:۰۰", "۱۴:۰۰", "۱۶:۰۰", "۱۸:۰۰", "۲۰:۰۰"],
        "positive": [65, 70, 80, 75, 85, 90, 88],
        "negative": [35, 30, 20, 25, 15, 10, 12],
        "neutral": [50, 55, 50, 60, 55, 45, 50]
    }

@router.get("/brainwave", response_model=BrainwaveData)
async def get_brainwave_data(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user)
):
    """
    دریافت داده‌های امواج مغزی کاربر
    """
    # اینجا در نسخه واقعی، از پایگاه داده یا InfluxDB داده‌ها را دریافت می‌کنیم
    # برای نمونه، داده‌های شبیه‌سازی شده برمی‌گردانیم
    
    return {
        "alpha": [10, 12, 14, 13, 15, 16, 15],
        "beta": [20, 22, 25, 24, 26, 28, 27],
        "delta": [5, 6, 4, 5, 7, 6, 5],
        "theta": [8, 9, 7, 8, 10, 9, 8],
        "gamma": [30, 32, 35, 34, 36, 38, 37]
    } 