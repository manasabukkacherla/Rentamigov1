import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white border border-black/10 rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 sm:space-y-2">
          <p className="text-[10px] sm:text-sm text-black/60 line-clamp-1">{title}</p>
          <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-black">{value.toLocaleString()}</h3>
          {trend && (
            <p className={`text-[10px] sm:text-sm flex items-center ${trend > 0 ? 'text-black' : 'text-black/60'}`}>
              <span className={`inline-block mr-1 ${trend > 0 ? 'rotate-0' : 'rotate-180'}`}>↑</span>
              {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className="bg-black text-white p-1.5 sm:p-2 md:p-2.5 rounded-full">
          <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
}