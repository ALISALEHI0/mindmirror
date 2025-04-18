import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const DataContext = createContext(null)

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const { user } = useAuth()
  const [cognitiveData, setCognitiveData] = useState(null)
  const [emotionData, setEmotionData] = useState(null)
  const [brainwaveData, setBrainwaveData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // دریافت داده‌های کاربر زمانی که کاربر تغییر می‌کند
  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      // پاکسازی داده‌ها در صورت خروج کاربر
      setCognitiveData(null)
      setEmotionData(null)
      setBrainwaveData(null)
    }
  }, [user])

  // دریافت تمام داده‌های کاربر
  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)

      // دریافت داده‌های شناختی
      const cognitiveResponse = await axios.get('/api/data/cognitive')
      setCognitiveData(cognitiveResponse.data)

      // دریافت داده‌های احساسی
      const emotionResponse = await axios.get('/api/data/emotion')
      setEmotionData(emotionResponse.data)

      // دریافت داده‌های امواج مغزی
      const brainwaveResponse = await axios.get('/api/data/brainwave')
      setBrainwaveData(brainwaveResponse.data)
    } catch (err) {
      console.error('خطا در دریافت داده‌ها:', err)
      setError('خطا در دریافت داده‌ها. لطفاً بعداً تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  // ثبت داده‌های EEG جدید
  const submitEEGData = async (eegData) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/data/eeg', eegData)
      
      // به‌روزرسانی داده‌های برین‌ویو و شناختی
      setBrainwaveData(response.data.brainwaveData)
      setCognitiveData(response.data.cognitiveData)
      
      return { success: true, data: response.data }
    } catch (err) {
      console.error('خطا در ثبت داده‌های EEG:', err)
      setError('خطا در ثبت داده‌های EEG. لطفاً بعداً تلاش کنید.')
      return { success: false, error: err.response?.data?.message || 'خطا در ثبت داده‌ها' }
    } finally {
      setLoading(false)
    }
  }

  // ثبت داده‌های صوتی جدید
  const submitAudioData = async (audioData) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/data/audio', audioData)
      
      // به‌روزرسانی داده‌های احساسی
      setEmotionData(response.data.emotionData)
      
      return { success: true, data: response.data }
    } catch (err) {
      console.error('خطا در ثبت داده‌های صوتی:', err)
      setError('خطا در ثبت داده‌های صوتی. لطفاً بعداً تلاش کنید.')
      return { success: false, error: err.response?.data?.message || 'خطا در ثبت داده‌ها' }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    cognitiveData,
    emotionData,
    brainwaveData,
    loading,
    error,
    fetchUserData,
    submitEEGData,
    submitAudioData
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataContext