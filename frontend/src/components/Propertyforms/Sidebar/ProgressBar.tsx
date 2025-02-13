import React from 'react';

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}