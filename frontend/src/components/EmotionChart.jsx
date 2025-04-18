import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const EmotionChart = ({ data, title = 'تحلیل احساسات' }) => {
  // داده‌های پیش‌فرض در صورت عدم ارسال
  const defaultData = {
    labels: ['۸:۰۰', '۱۰:۰۰', '۱۲:۰۰', '۱۴:۰۰', '۱۶:۰۰', '۱۸:۰۰', '۲۰:۰۰'],
    positive: [65, 70, 80, 75, 85, 90, 88],
    negative: [35, 30, 20, 25, 15, 10, 12],
    neutral: [50, 55, 50, 60, 55, 45, 50]
  }

  // استفاده از داده‌های ارسالی یا پیش‌فرض
  const chartData = {
    labels: data?.labels || defaultData.labels,
    datasets: [
      {
        label: 'مثبت',
        data: data?.positive || defaultData.positive,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'منفی',
        data: data?.negative || defaultData.negative,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'خنثی',
        data: data?.neutral || defaultData.neutral,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  // تنظیمات نمودار
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          font: {
            family: 'Vazirmatn'
          }
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Vazirmatn'
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Vazirmatn'
          }
        }
      },
      tooltip: {
        bodyFont: {
          family: 'Vazirmatn'
        },
        titleFont: {
          family: 'Vazirmatn'
        }
      }
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default EmotionChart 