import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function ButtonComponent({ label, onClick }: ButtonProps) {
  return (
    <div className="w-full max-w-md pl-4 sm:pl-6 md:pl-8">
      <button
        onClick={onClick}
        className="w-full sm:w-[360px] px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {label}
      </button>
    </div>
  );
}
