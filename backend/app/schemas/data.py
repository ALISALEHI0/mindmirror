from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class EEGData(BaseModel):
    """
    طرح‌واره داده‌های خام EEG
    """
    channels: List[str]
    timestamps: List[float]
    values: List[List[float]]
    sampling_rate: float
    device_info: Optional[Dict[str, Any]] = None

class AudioData(BaseModel):
    """
    طرح‌واره داده‌های صوتی
    """
    audio_bytes: bytes
    format: str
    duration: float
    sampling_rate: float

class CognitiveData(BaseModel):
    """
    طرح‌واره داده‌های شناختی
    """
    current: List[float]
    average: List[float]
    trend: Optional[List[List[float]]] = None

class EmotionData(BaseModel):
    """
    طرح‌واره داده‌های احساسی
    """
    labels: List[str]
    positive: List[float]
    negative: List[float]
    neutral: List[float]

class BrainwaveData(BaseModel):
    """
    طرح‌واره داده‌های امواج مغزی
    """
    alpha: List[float]
    beta: List[float]
    delta: List[float]
    theta: List[float]
    gamma: List[float]