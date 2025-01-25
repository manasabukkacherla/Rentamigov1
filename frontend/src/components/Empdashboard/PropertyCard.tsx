import React from "react";

interface PropertyCardProps {
  property: {
    id: string;
    propertyName: string;
    ownerName: string;
  };
  onEdit: (property: PropertyCardProps["property"]) => void;
  onDelete: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <h3 className="text-lg font-semibold text-gray-800">{property.propertyName}</h3>
      <p className="text-gray-600 text-sm">Owner: {property.ownerName}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onDelete(property.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
