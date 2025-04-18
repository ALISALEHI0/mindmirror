import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'
import CognitiveChart from '../components/CognitiveChart'
import EmotionChart from '../components/EmotionChart'

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth()
  const { 
    cognitiveData, 
    emotionData, 
    loading: dataLoading, 
    error: dataError,
    fetchUserData
  } = useData()
  const navigate = useNavigate()
  const [recording, setRecording] = useState(false)

  // ریدایرکت به صفحه لاگین اگر کاربر احراز هویت نشده باشد
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  // بارگذاری مجدد داده‌ها
  const handleRefreshData = () => {
    fetchUserData()
  }

  // شبیه‌سازی شروع ضبط EEG
  const handleStartRecording = () => {
    setRecording(true)
    // اینجا منطق واقعی اتصال به دستگاه EEG اضافه می‌شود
  }

  // شبیه‌سازی توقف ضبط
  const handleStopRecording = () => {
    setRecording(false)
    // اینجا منطق واقعی قطع اتصال از دستگاه EEG اضافه می‌شود
  }

  // نمایش لودینگ
  if (authLoading || dataLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">داشبورد شناختی</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleRefreshData}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            به‌روزرسانی
          </button>
          {recording ? (
            <button 
              onClick={handleStopRecording}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              توقف ضبط
            </button>
          ) : (
            <button 
              onClick={handleStartRecording}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              شروع ضبط
            </button>
          )}
        </div>
      </div>

      {dataError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{dataError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CognitiveChart 
          data={cognitiveData || {}} 
          title="پروفایل شناختی" 
        />
        <EmotionChart 
          data={emotionData || {}} 
          title="تحلیل احساسات" 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">فعالیت‌های اخیر</h2>
        
        {recording ? (
          <div className="flex items-center mb-4 bg-blue-50 p-4 rounded-lg">
            <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse ml-2"></div>
            <p>در حال ضبط و تحلیل داده‌های مغزی...</p>
          </div>
        ) : null}
        
        <div className="space-y-4">
          <div className="border-b pb-3">
            <p className="text-gray-800">جلسه تحلیل شناختی انجام شده</p>
            <p className="text-sm text-gray-500">امروز، ساعت 14:30</p>
          </div>
          <div className="border-b pb-3">
            <p className="text-gray-800">تحلیل احساسی از مکالمه صوتی</p>
            <p className="text-sm text-gray-500">دیروز، ساعت 16:45</p>
          </div>
          <div className="border-b pb-3">
            <p className="text-gray-800">پروفایل شناختی به‌روزرسانی شد</p>
            <p className="text-sm text-gray-500">2 روز پیش، ساعت 10:15</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 