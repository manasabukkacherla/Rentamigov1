import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API calls
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [revenueFilter, setRevenueFilter] = useState('monthly');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // State variables for chart data
  const [revenueData, setRevenueData] = useState<any>(null);
  const [trafficData, setTrafficData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [deviceData, setDeviceData] = useState<any>(null);

  const metrics = [
    {
      id: 1,
      title: 'Total Views',
      value: '124.7k',
      change: '+12.5%',
      period: 'vs last month'
    },
    {
      id: 2,
      title: 'Unique Visitors',
      value: '45.2k',
      change: '+8.2%',
      period: 'vs last month'
    },
    {
      id: 3,
      title: 'Avg. Session Duration',
      value: '4m 32s',
      change: '+2.4%',
      period: 'vs last month'
    },
    {
      id: 4,
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-4.3%',
      period: 'vs last month'
    }
  ];

  // Function to fetch the revenue data based on the selected filter
  const fetchRevenueData = async () => {
    try {
      console.log("Fetching data with filter:", revenueFilter); // Debugging log
      const response = await axios.get(`/api/payment/revenue-by-date?filter=${revenueFilter}`);
      const data = response.data;

      console.log("API Response:", data); // Check the response data
  
      // Filter out invalid data with "null-null" as date
      const filteredData = data.filter((item: any) => item.date !== 'null-null');
      
      if (filteredData.length === 0) {
        console.log("No valid data available after filtering.");
      }

      const labels = filteredData.map((item: any) => item.date); // Valid dates
      const dataPoints = filteredData.map((item: any) => item.revenue); // Corresponding revenue values
  
      console.log("Filtered Data:", filteredData);
  
      // Set the revenueData state
      setRevenueData({
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: dataPoints,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4
          }
        ]
      });
  
      // Set the traffic data (for now using revenue data)
      setTrafficData({
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: dataPoints,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4
          }
        ]
      });
  
      // Sample location data (this can be modified as needed)
      setLocationData({
        labels: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Houston'],
        datasets: [
          {
            data: [24, 18, 15, 12, 10],
            backgroundColor: [
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.6)',
              'rgba(0, 0, 0, 0.4)',
              'rgba(0, 0, 0, 0.3)',
              'rgba(0, 0, 0, 0.2)',
            ],
            borderColor: Array(5).fill('rgb(255, 255, 255)'),
            borderWidth: 1,
          },
        ],
      });
  
      // Sample device data (this can be modified as needed)
      setDeviceData({
        labels: labels,
        datasets: [
          {
            label: 'Desktop',
            data: dataPoints.map((val: number) => val * 0.6),
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
          {
            label: 'Mobile',
            data: dataPoints.map((val: number) => val * 0.3),
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          {
            label: 'Tablet',
            data: dataPoints.map((val: number) => val * 0.1),
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };
  
  // Fetch revenue data whenever revenueFilter changes
  useEffect(() => {
    fetchRevenueData();
  }, [revenueFilter]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        display: window.innerWidth > 768,
      },
    },
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-900">{metric.value}</p>
            <div className="flex items-center mt-2">
              <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">{metric.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <select
                value={revenueFilter}
                onChange={(e) => setRevenueFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="halfYearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          {revenueData ? (
            <div className="h-[300px] md:h-[400px]">
              <Line options={options} data={revenueData} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Top Locations</h3>
          </div>
          <div className="h-[300px] md:h-[400px]">
            <Pie data={locationData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">Device Usage</h3>
        </div>
        <div className="h-[300px] md:h-[400px]">
          <Bar options={options} data={deviceData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
