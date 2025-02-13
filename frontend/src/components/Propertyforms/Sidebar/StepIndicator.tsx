import React from 'react';

type StepIndicatorProps = {
  isActive: boolean;
};

export function StepIndicator({ isActive }: StepIndicatorProps) {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 transition-all ${
      isActive 
        ? 'bg-purple-600 shadow-md shadow-purple-200'
        : 'bg-gray-100 group-hover:bg-gray-200'
    }`}>
      <div className={`w-3 h-3 rounded-full transition-colors ${
        isActive ? 'bg-white' : 'bg-gray-400 group-hover:bg-gray-500'
      }`} />
    </div>
  );
}