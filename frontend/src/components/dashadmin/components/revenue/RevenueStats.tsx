import React from 'react';
import { DollarSign } from 'lucide-react';

interface RevenueStat {
  id: number;
  title: string;
  value: string;
  change: string;
  period: string;
}

interface RevenueStatsProps {
  stats: RevenueStat[];
}

const RevenueStats: React.FC<RevenueStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>{stat.change}</span>
            <span className="text-sm text-gray-500 ml-2">{stat.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueStats;