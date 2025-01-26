import React from "react";
import { LucideIcon } from "lucide-react";

interface InputFieldProps {
  label: string;
  icon: LucideIcon;
  value: string | number;
  onChange: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  className?: string; // Custom styling
  error?: string; // Error message
  onBlur?: () => void; // Blur handler
}

export function InputField({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
  max,
  className = "",
  error,
  onBlur,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur} // Trigger onBlur handler if provided
        placeholder={placeholder}
        min={min}
        max={max}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
