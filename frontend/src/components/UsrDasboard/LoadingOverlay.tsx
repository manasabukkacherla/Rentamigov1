import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-black/70 text-sm sm:text-base animate-pulse">{message}</p>
      </div>
    </div>
  );
}