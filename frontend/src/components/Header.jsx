import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/src/assets/mindmirror-logo.svg" alt="MindMirror AI" className="h-10 w-10 ml-2" />
            <span className="text-xl font-bold text-primary-600">MindMirror AI</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-4 rtl:space-x-reverse">
          <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md transition-colors">داشبورد</Link>
          <Link to="/profile" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md transition-colors">پروفایل</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md transition-colors">درباره ما</Link>
        </nav>
        
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              <span className="ml-2 text-sm text-gray-700">{user.name}</span>
              <button 
                onClick={handleLogout}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition-colors"
              >
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition-colors">
              ورود
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 