import React, { useState, useCallback } from 'react';
import { MapPin, Square, Calendar, Edit2, Trash2, Check } from 'lucide-react';
import { Property } from '../types/index';
import { format } from 'date-fns';

export interface PropertyImage {
  id: string;
  url: string;
  title?: string;
}

export interface PropertyCardProps {
  property: Property;
  matchedFields?: Set<string>;
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (id: string) => void;
  onStatusUpdate?: (id: string) => void;
  onClick?: (propertyId: string) => void;
  showActions?: boolean;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  matchedFields = new Set(),
  onDelete,
  onEdit,
  onStatusUpdate,
  onClick,
  showActions = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Function to highlight matched fields
  const highlightIfMatched = useCallback((field: string, content: string) => {
    if (!matchedFields || !matchedFields.size) return content;
    return matchedFields.has(field) ? (
      <span className="bg-yellow-100 px-1 rounded">{content}</span>
    ) : (
      content
    );
  }, [matchedFields]);

  // Function to determine status color
  const getStatusColor = useCallback((status: string) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'available':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rented':
      case 'sold':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
      case 'under maintenance':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }, []);

  // Function to determine intent color
  const getIntentColor = useCallback((intent: string) => {
    const intentLower = intent?.toLowerCase() || '';
    switch (intentLower) {
      case 'rent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'sale':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'lease':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'pg/co-living':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!onDelete) return;

    try {
      setIsDeleting(true);
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting property:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  }, [onDelete]);

  const handleEdit = useCallback((id: string) => {
    if (onEdit) {
      onEdit(id);
    }
  }, [onEdit]);

  const handleStatusUpdate = useCallback((id: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(id);
    }
  }, [onStatusUpdate]);

  const propertyType = property.type || 'Property';

  const postedDate = property.postedDate ? new Date(property.postedDate) : new Date();
  const formattedDate = format(postedDate, 'MMM d, yyyy');

  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (onClick && property.id) {
      onClick(property.id);
    }
  };

  const getListingType = () => {
    return property.intent || 'Rent';
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={property.imageUrl}
          alt={property.title || 'Property image'}
          className="w-full h-full object-cover"
        />

        {/* Status and Type Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {property.listingType && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${property.listingType === 'RentAmigo' ? 'bg-black text-white' : 'bg-white text-gray-800 border border-gray-200'
              }`}>
              {property.listingType}
            </span>
          )}

          {(property.status || property.intent) && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(property.status || '')}`}>
              {property.status || 'Available'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && onEdit && onDelete && (
          <div
            className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (property.id) handleEdit(property.id);
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Edit property"
            >
              <Edit2 size={16} className="text-gray-700" />
            </button>

            {showConfirmDelete ? (
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (property.id) handleDelete(property.id);
                  }}
                  disabled={isDeleting}
                  className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors disabled:opacity-50"
                  aria-label="Confirm delete"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmDelete(false);
                  }}
                  className="p-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 transition-colors"
                  aria-label="Cancel delete"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmDelete(true);
                }}
                className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors text-gray-700"
                aria-label="Delete property"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
    {highlightIfMatched('title', property.title || 'Untitled Property')}
  </h3>

          <div className="flex-shrink-0 ml-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getIntentColor(property.intent || '')}`}>
              {getListingType()}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="truncate">
            {highlightIfMatched('location', property.location || 'Location not specified')}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
            <Square size={12} className="mr-1 text-gray-500" />
            <span>{property.area ? `${property.area} sq.ft` : 'Area N/A'}</span>
          </div>

          {property.furnishing && (
            <div className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
              {property.furnishing}
            </div>
          )}

          {propertyType && (
            <div className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
              {propertyType}
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ₹{property.price?.toLocaleString() || 'Price on request'}
              </span>
              {property.price && (
                <span className="text-xs text-gray-500 ml-1">
                  {property.intent?.toLowerCase() === 'rent' ? '/month' : ''}
                </span>
              )}
            </div>

            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {onStatusUpdate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (property.id) handleStatusUpdate(property.id);
              }}
              className="mt-2 w-full py-1.5 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              {property.status === 'Available' ? 'Mark as Rented' : 'Mark as Available'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

