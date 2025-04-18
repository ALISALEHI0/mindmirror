import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // بررسی وضعیت احراز هویت در هنگام بارگذاری
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        // بررسی توکن در localStorage
        const token = localStorage.getItem('token')
        
        if (token) {
          // تنظیم توکن پیش‌فرض برای تمام درخواست‌ها
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          // دریافت اطلاعات کاربر
          const response = await axios.get('/api/auth/me')
          setUser(response.data)
        }
      } catch (err) {
        console.error('خطا در بررسی احراز هویت:', err)
        // پاک کردن توکن در صورت خطا
        localStorage.removeItem('token')
        setError('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // ورود کاربر
  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/auth/login', { email, password })
      
      // ذخیره توکن
      localStorage.setItem('token', response.data.token)
      
      // تنظیم توکن پیش‌فرض
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      // تنظیم اطلاعات کاربر
      setUser(response.data.user)
      setError(null)
      
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ورود به سیستم')
      return { success: false, error: err.response?.data?.message || 'خطا در ورود به سیستم' }
    } finally {
      setLoading(false)
    }
  }

  // ثبت‌نام کاربر
  const register = async (name, email, password) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      })
      
      // ذخیره توکن
      localStorage.setItem('token', response.data.token)
      
      // تنظیم توکن پیش‌فرض
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      // تنظیم اطلاعات کاربر
      setUser(response.data.user)
      setError(null)
      
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ثبت‌نام')
      return { success: false, error: err.response?.data?.message || 'خطا در ثبت‌نام' }
    } finally {
      setLoading(false)
    }
  }

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext 