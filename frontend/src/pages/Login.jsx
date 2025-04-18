import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { user, login, register, loading, error } = useAuth()
  const navigate = useNavigate()

  // اگر کاربر قبلاً وارد شده باشد به داشبورد هدایت می‌شود
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      let result

      if (isRegistering) {
        // فرایند ثبت‌نام
        if (!name.trim()) {
          setErrorMessage('لطفاً نام خود را وارد کنید')
          return
        }

        result = await register(name, email, password)
      } else {
        // فرایند ورود
        result = await login(email, password)
      }

      if (result.success) {
        navigate('/')
      } else {
        setErrorMessage(result.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.')
      }
    } catch (err) {
      setErrorMessage('خطا در برقراری ارتباط با سرور')
    }
  }

  // تغییر بین فرم ورود و ثبت‌نام
  const toggleForm = () => {
    setIsRegistering(!isRegistering)
    setErrorMessage('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRegistering ? 'ایجاد حساب کاربری جدید' : 'ورود به حساب کاربری'}
          </h1>
          <p className="text-sm text-gray-600">
            {isRegistering 
              ? 'برای استفاده از MindMirror AI حساب کاربری ایجاد کنید' 
              : 'به MindMirror AI خوش آمدید'}
          </p>
        </div>

        {(errorMessage || error) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{errorMessage || error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                نام
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="نام و نام خانوادگی"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="********"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full button-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 ml-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  در حال پردازش...
                </span>
              ) : isRegistering ? 'ثبت‌نام' : 'ورود'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isRegistering 
              ? 'قبلاً حساب کاربری دارید؟ وارد شوید' 
              : 'حساب کاربری ندارید؟ ثبت‌نام کنید'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login 