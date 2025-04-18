import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'

const Profile = () => {
  const { user, loading: authLoading } = useAuth()
  const { loading: dataLoading } = useData()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  
  // تنظیمات کاربر
  const [settings, setSettings] = useState({
    notifications: true,
    dataSharing: false,
    language: 'fa',
    theme: 'light'
  })
  
  // اطلاعات شخصی کاربر
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  })
  
  // پیام‌های سیستم
  const [message, setMessage] = useState(null)
  
  // ریدایرکت به صفحه لاگین اگر کاربر احراز هویت نشده باشد
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    } else if (user) {
      // پر کردن اطلاعات کاربر
      setUserInfo({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        gender: user.gender || ''
      })
    }
  }, [user, authLoading, navigate])
  
  // تغییر تنظیمات
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }
  
  // تغییر اطلاعات کاربر
  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  // ذخیره اطلاعات پروفایل
  const handleSaveProfile = () => {
    // اینجا ارسال اطلاعات به سرور انجام می‌شود
    setMessage({
      type: 'success',
      text: 'اطلاعات پروفایل با موفقیت ذخیره شد'
    })
    
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  
  // ذخیره تنظیمات
  const handleSaveSettings = () => {
    // اینجا ارسال تنظیمات به سرور انجام می‌شود
    setMessage({
      type: 'success',
      text: 'تنظیمات با موفقیت ذخیره شد'
    })
    
    setTimeout(() => {
      setMessage(null)
    }, 3000)
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
      <h1 className="text-2xl font-bold mb-8">پروفایل کاربری</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <p>{message.text}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            اطلاعات شخصی
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            تنظیمات
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === 'data' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('data')}
          >
            داده‌های من
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">اطلاعات شخصی</h2>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  نام
                </label>
                <input
                  id="name"
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleUserInfoChange('name', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  ایمیل
                </label>
                <input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => handleUserInfoChange('email', e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    سن
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={userInfo.age}
                    onChange={(e) => handleUserInfoChange('age', e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    جنسیت
                  </label>
                  <select
                    id="gender"
                    value={userInfo.gender}
                    onChange={(e) => handleUserInfoChange('gender', e.target.value)}
                    className="form-input"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="male">مرد</option>
                    <option value="female">زن</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleSaveProfile}
                  className="button-primary"
                >
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">تنظیمات</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">اعلان‌ها</h3>
                    <p className="text-sm text-gray-500">دریافت اعلان‌های مرتبط با تحلیل‌ها</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">اشتراک‌گذاری داده‌ها</h3>
                    <p className="text-sm text-gray-500">استفاده از داده‌های شما برای بهبود الگوریتم‌ها (بدون اطلاعات شخصی)</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.dataSharing}
                      onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    زبان
                  </label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="form-input"
                  >
                    <option value="fa">فارسی</option>
                    <option value="en">انگلیسی</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                    تم
                  </label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                    className="form-input"
                  >
                    <option value="light">روشن</option>
                    <option value="dark">تیره</option>
                    <option value="system">سیستم</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleSaveSettings}
                  className="button-primary"
                >
                  ذخیره تنظیمات
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">داده‌های من</h2>
              
              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-2">داده‌های EEG</h3>
                  <p className="text-sm text-gray-600 mb-2">تعداد جلسات ضبط شده: 8</p>
                  <p className="text-sm text-gray-600 mb-2">زمان ضبط: 4 ساعت و 25 دقیقه</p>
                  <p className="text-sm text-gray-600">آخرین ضبط: 2 روز پیش</p>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-2">داده‌های صوتی</h3>
                  <p className="text-sm text-gray-600 mb-2">تعداد مکالمات ضبط شده: 15</p>
                  <p className="text-sm text-gray-600 mb-2">زمان ضبط: 2 ساعت و 10 دقیقه</p>
                  <p className="text-sm text-gray-600">آخرین ضبط: دیروز</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    دانلود داده‌های من
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    حذف تمام داده‌ها
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 