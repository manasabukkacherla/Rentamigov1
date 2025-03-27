import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, DollarSign, Home, Eye } from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import PropertyList from './PropertyList';

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
const [employeeChange, setEmployeeChange] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/payment/total-revenue');
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };
  
    const fetchActiveEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees/active-count');
        console.log("📦 Active Count Response:", res.data); // 👀 Debug here
        if (res.data.success) {
          setActiveEmployees(res.data.count);
        }
      } catch (err) {
        console.error('Error fetching active employees:', err);
      }
    };
    const fetchRevenueChange = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/payment/revenue-change');
        if (res.data.success) {
          setTotalRevenue(res.data.current);
          setRevenueChange(res.data.change);
        }
      } catch (err) {
        console.error('Error fetching revenue change:', err);
      }
    };

    const fetchEmployeeChange = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/employees/active-change');
        if (res.data.success) {
          setActiveEmployees(res.data.current);
          setEmployeeChange(res.data.change);
        }
      } catch (err) {
        console.error('Error fetching employee change:', err);
      }
    };
  

    fetchRevenue();
    fetchActiveEmployees();
  }, []);
  

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(2)}%`,
      icon: DollarSign,
      positive: revenueChange >= 0,
    },
    {
      title: 'Active Properties',
      value: '284',
      change: '+7.4%',
      icon: Home,
      positive: true
    },
    {
      title: 'Total Views',
      value: '12,849',
      change: '+24.5%',
      icon: Eye,
      positive: true
    },
    {
      title: 'Active Employees',
      value: activeEmployees.toString(),
      change: `${employeeChange > 0 ? '+' : ''}${employeeChange.toFixed(2)}%`,
      icon: Users,
      positive: employeeChange >= 0,
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
          <RevenueChart />
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Properties</h3>
          <PropertyList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
