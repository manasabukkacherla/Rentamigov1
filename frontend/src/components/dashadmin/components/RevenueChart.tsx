import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/payment/revenue-by-date');
        const data = res.data; // Example: [{ date: '2025-03-19', revenue: 1900 }, ...]

        // Group revenue by month
        const revenueByMonth: Record<string, number> = {};

        data.forEach((item: any) => {
          const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
          revenueByMonth[month] = (revenueByMonth[month] || 0) + item.revenue;
        });

        const labels = Object.keys(revenueByMonth);
        const values = Object.values(revenueByMonth);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: values,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.1)',
              tension: 0.4
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(value);
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    }
  };

  return (
    <div className="h-64">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default RevenueChart;
