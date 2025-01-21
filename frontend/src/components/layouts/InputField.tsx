import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  min?: string;
  max?: string;
}

export function InputField({ 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  type = 'text',
  placeholder,
  min,
  max
}: InputFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
      />
    </div>
  );
}