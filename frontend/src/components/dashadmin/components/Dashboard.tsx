import React from 'react';
import { Users, DollarSign, Home, Eye } from 'lucide-react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import PropertyList from './PropertyList';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,592',
      change: '+14.2%',
      icon: DollarSign,
      positive: true
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
      value: '48',
      change: '-2.1%',
      icon: Users,
      positive: false
    }
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