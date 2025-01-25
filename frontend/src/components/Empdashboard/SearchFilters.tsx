import React from 'react';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  rentRange: [number, number];
  onRentRangeChange: (range: [number, number]) => void;
  status: string;
  onStatusChange: (status: string) => void;
}

export function SearchFilters({
  searchTerm,
  onSearchChange,
  rentRange,
  onRentRangeChange,
  status,
  onStatusChange
}: SearchFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

       {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Min Rent
            </label>
            <input
              type="number"
              value={rentRange[0]}
              onChange={(e) => onRentRangeChange([Number(e.target.value), rentRange[1]])}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Rent
            </label>
            <input
              type="number"
              value={rentRange[1]}
              onChange={(e) => onRentRangeChange([rentRange[0], Number(e.target.value)])}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          {/*<select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
          </select>
        </div>*/} 
      </div>
    </div>
  );
}