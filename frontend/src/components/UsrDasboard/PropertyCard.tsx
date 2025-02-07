import React from 'react';
import { Edit2, Trash2, ToggleRight, Home, Clock, CheckCircle } from 'lucide-react';
import { Property } from './types';

interface PropertyCardProps {
  property: Property;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string) => void;
}

export function PropertyCard({ property, onEdit, onDelete, onStatusUpdate }: PropertyCardProps) {
  const statusConfig = {
    Available: {
      color: 'bg-green-100 text-green-800',
      icon: Home,
      description: 'Ready to rent'
    },
    Rented: {
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircle,
      description: 'Currently occupied'
    },
    Pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      description: 'Under process'
    }
  };

  const StatusIcon = statusConfig[property.status].icon;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-black/10">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2">
        <h3 className="text-sm sm:text-base font-semibold text-black line-clamp-1">{property.name}</h3>
        <p className="text-xs sm:text-sm text-black/60">₹{property.rent.toLocaleString()}/month</p>
        
        {/* Status Badge with Icon and Description */}
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusConfig[property.status].color}`}>
          <StatusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{property.status}</span>
          <span className="hidden sm:inline text-[10px] opacity-75">
            • {statusConfig[property.status].description}
          </span>
        </div>
        
        <div className="flex justify-end items-center gap-1 pt-1.5 sm:pt-2">
          {/* Edit Button */}
          <div className="group relative">
            <button
              onClick={() => onEdit(property.id)}
              className="p-1.5 text-black hover:bg-black/5 rounded-lg transition-colors"
              aria-label="Edit property"
            >
              <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Edit property
            </div>
          </div>

          {/* Delete Button */}
          <div className="group relative">
            <button
              onClick={() => onDelete(property.id)}
              className="p-1.5 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete property"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Delete property
            </div>
          </div>

          {/* Status Update Button */}
          <div className="group relative">
            <button
              onClick={() => onStatusUpdate(property.id)}
              className="p-1.5 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Change property status"
            >
              <ToggleRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute bottom-full right-0 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Update status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}