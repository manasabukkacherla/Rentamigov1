import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute w-full h-full rounded-full border-2 border-black/10"></div>
      <div className="absolute w-full h-full rounded-full border-2 border-black border-t-transparent animate-spin"></div>
    </div>
  );
}