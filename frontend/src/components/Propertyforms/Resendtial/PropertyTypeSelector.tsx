import React from 'react';
import { Building2, Building } from 'lucide-react';

type PropertyTypeSelectorProps = {
  selected: string;
  onSelect: (type: string) => void;
};

export function PropertyTypeSelector({ selected, onSelect }: PropertyTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-gray-700 font-medium">
        Property Type <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onSelect('residential')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            selected === 'residential'
              ? 'border-purple-500 bg-purple-50 shadow-sm'
              : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            selected === 'residential' ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <Building2 className={`w-5 h-5 ${
              selected === 'residential' ? 'text-purple-600' : 'text-gray-500'
            }`} />
          </div>
          <div className="text-left">
            <div className={`font-medium ${
              selected === 'residential' ? 'text-purple-700' : 'text-gray-700'
            }`}>
              Residential
            </div>
            <div className="text-sm text-gray-500">
              Houses, Apartments, Villas
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('commercial')}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            selected === 'commercial'
              ? 'border-purple-500 bg-purple-50 shadow-sm'
              : 'border-gray-200 hover:border-purple-200'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            selected === 'commercial' ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <Building className={`w-5 h-5 ${
              selected === 'commercial' ? 'text-purple-600' : 'text-gray-500'
            }`} />
          </div>
          <div className="text-left">
            <div className={`font-medium ${
              selected === 'commercial' ? 'text-purple-700' : 'text-gray-700'
            }`}>
              Commercial
            </div>
            <div className="text-sm text-gray-500">
              Offices, Shops, Warehouses
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}