import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, positive }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="flex items-baseline mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 flex items-center text-sm ${
          positive ? 'text-green-600' : 'text-red-600'
        }`}>
          {positive ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;