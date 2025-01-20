import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {property.images.length > 0 && (
        <div className="relative h-48 w-full">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {property.name}
          </h3>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            ${property.rentAmount.toLocaleString()}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Owner: {property.ownerName}
        </p>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex justify-end gap-2 mt-auto">
          <button
            onClick={() => onEdit(property)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Edit property"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Delete property"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}