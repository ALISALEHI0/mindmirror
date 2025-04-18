import os
from typing import List, Union
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    API_HOST: str = "localhost"
    API_PORT: int = 8000
    DEBUG: bool = True
    
    # تنظیمات امنیتی
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # پایگاه داده
    DATABASE_URL: str
    
    # InfluxDB
    INFLUXDB_URL: str
    INFLUXDB_TOKEN: str
    INFLUXDB_ORG: str
    INFLUXDB_BUCKET: str
    
    # Redis
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    REDIS_PASSWORD: str = None
    
    # Kafka
    KAFKA_BOOTSTRAP_SERVERS: str
    KAFKA_EEG_TOPIC: str
    KAFKA_AUDIO_TOPIC: str
    
    @validator("DATABASE_URL", pre=True)
    def validate_database_url(cls, v):
        if os.environ.get("TESTING", "False").lower() == "true":
            return os.environ.get("DATABASE_TEST_URL")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# ایجاد نمونه تنظیمات
settings = Settings() 