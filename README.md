<<<<<<< HEAD
# MindMirror AI

پلتفرم هوش مصنوعی برای تحلیل داده‌های مغزی و احساسی

## ساختار پروژه

```
mindmirror/
├── frontend/          # React + Vite frontend
│   ├── src/          # کد منبع فرانت‌اند
│   ├── public/       # فایل‌های استاتیک
│   └── ...
│
└── backend/          # FastAPI backend
    ├── app/         # کد منبع بک‌اند
    ├── tests/      # تست‌ها
    └── ...
```

## نصب و راه‌اندازی

### فرانت‌اند

```bash
cd frontend
npm install
npm run dev
```

### بک‌اند

```bash
cd backend
python -m venv venv
source venv/bin/activate  # در Unix
# یا
.\venv\Scripts\activate  # در Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## متغیرهای محیطی

برای اجرای پروژه، فایل‌های `.env` زیر را تنظیم کنید:

### فرانت‌اند (`frontend/.env`)
```
VITE_API_URL=http://localhost:8000/api
```

### بک‌اند (`backend/.env`)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SECRET_KEY=your_secret_key
...
``` 
=======
# mindmirror
>>>>>>> 16629ac999ac88697a961fb1267647ba8cd0e5f3
