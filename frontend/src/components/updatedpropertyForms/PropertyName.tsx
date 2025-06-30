"use client"

import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface PropertyNameProps {
  propertyName: string;
  onPropertyNameChange: (name: string) => void;
}

const PropertyName = ({ propertyName, onPropertyNameChange }: PropertyNameProps) => {
  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Building2 className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Property Name</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-4 relative z-20">
          <div className="relative">
            <input
              type="text"
              value={propertyName}
              onChange={(e) => onPropertyNameChange(e.target.value)}
              placeholder="Enter property name"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40 relative z-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyName;

