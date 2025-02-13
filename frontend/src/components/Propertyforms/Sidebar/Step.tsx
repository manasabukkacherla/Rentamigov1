import React from 'react';
import { StepIndicator } from './StepIndicator';
import { Check } from 'lucide-react';

export type StepStatus = 'pending' | 'in-progress' | 'completed';

type StepProps = {
  label: string;
  description: string;
  status: StepStatus;
  isLast?: boolean;
};

export function Step({ label, description, status, isLast }: StepProps) {
  const isActive = status === 'in-progress';
  const isCompleted = status === 'completed';

  return (
    <div 
      className={`relative flex items-start p-4 rounded-lg transition-colors ${
        isActive ? 'bg-purple-50' : 'hover:bg-gray-50'
      } group cursor-pointer`}
    >
      {!isLast && (
        <div className={`absolute left-[31px] top-[52px] w-[2px] h-[calc(100%-20px)] transition-colors ${
          isActive ? 'bg-purple-200' : isCompleted ? 'bg-green-200' : 'bg-gray-200'
        }`} />
      )}
      
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all ${
        isActive 
          ? 'bg-purple-600 shadow-md shadow-purple-200'
          : isCompleted
            ? 'bg-green-600'
            : 'bg-gray-100 group-hover:bg-gray-200'
      }`}>
        {isCompleted ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <div className={`w-3 h-3 rounded-full transition-colors ${
            isActive ? 'bg-white' : 'bg-gray-400 group-hover:bg-gray-500'
          }`} />
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <h3 className={`font-medium truncate ${
          isActive 
            ? 'text-purple-600' 
            : isCompleted
              ? 'text-green-600'
              : 'text-gray-700 group-hover:text-gray-900'
        }`}>
          {label}
        </h3>
        <p className={`text-sm truncate ${
          isActive 
            ? 'text-purple-500'
            : isCompleted
              ? 'text-green-500'
              : 'text-gray-500'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}