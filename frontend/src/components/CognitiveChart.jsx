import { useRef, useEffect } from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const CognitiveChart = ({ data, title = 'پروفایل شناختی' }) => {
  const chartRef = useRef(null)

  // پیکربندی نمودار راداری
  const chartData = {
    labels: [
      'تمرکز',
      'آرامش',
      'استرس',
      'خلاقیت',
      'هوشیاری',
      'پردازش هیجانی'
    ],
    datasets: [
      {
        label: 'وضعیت فعلی',
        data: data.current || [65, 75, 30, 85, 70, 60],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
      },
      {
        label: 'میانگین',
        data: data.average || [60, 65, 40, 70, 65, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
      }
    ]
  }

  // تنظیمات نمودار
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        },
        pointLabels: {
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
        <Radar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default CognitiveChart 