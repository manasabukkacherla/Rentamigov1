import React from 'react';
import { X } from 'lucide-react';
import { FormData } from './PropertyForm';
import { LocationData } from './PropertyLocation';
import { FeaturesData } from './PropertyFeatures';
import { AmenitiesData } from './SocietyAmenities';
import { FlatAmenitiesData } from './FlatAmenities';
import { RestrictionsData } from './PropertyRestrictions';
import { CommercialsData } from './PropertyCommercials';
import { AvailabilityData } from './PropertyAvailability';
import { PhotoData } from './PropertyPhotos';

interface PreviewModalProps {
  onClose: () => void;
  formData: FormData;
  locationData: LocationData;
  featuresData: FeaturesData;
  amenitiesData: AmenitiesData;
  flatAmenitiesData: FlatAmenitiesData;
  restrictionsData: RestrictionsData;
  commercialsData: CommercialsData;
  availabilityData: AvailabilityData;
  photoData: PhotoData;
}

export function PreviewModal({
  onClose,
  formData,
  locationData,
  featuresData,
  amenitiesData,
  flatAmenitiesData,
  restrictionsData,
  commercialsData,
  availabilityData,
  photoData,
}: PreviewModalProps) {
  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="border-b pb-4 mb-4 last:border-b-0">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {content}
    </div>
  );

  const renderPhotoPreview = (file: File | null, label: string) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    return (
      <div key={label} className="relative group">
        <img
          src={url}
          alt={label}
          className="w-full h-32 object-cover rounded-lg"
          onLoad={() => URL.revokeObjectURL(url)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
          <span className="text-white text-sm">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Property Details Preview</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Basic Details */}
          {renderSection("Basic Details", (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="font-medium">Property Type:</span> {formData.propertyType}</div>
              <div><span className="font-medium">Configuration:</span> {formData.propertyConfiguration}</div>
              <div><span className="font-medium">Furnishing:</span> {formData.furnishingStatus}</div>
              <div><span className="font-medium">Facing:</span> {formData.facing}</div>
            </div>
          ))}

          {/* Location */}
          {renderSection("Location", (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="font-medium">Property Name:</span> {locationData.propertyName}</div>
              <div><span className="font-medium">Flat No:</span> {locationData.flatNo}</div>
              <div className="col-span-full"><span className="font-medium">Address:</span> {[locationData.addressLine1, locationData.addressLine2, locationData.addressLine3].filter(Boolean).join(', ')}</div>
              <div><span className="font-medium">Locality:</span> {locationData.locality}</div>
              <div><span className="font-medium">Area:</span> {locationData.area}</div>
              <div><span className="font-medium">Pin Code:</span> {locationData.pinCode}</div>
            </div>
          ))}

          {/* Features */}
          {renderSection("Features", (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="font-medium">Bedrooms:</span> {featuresData.bedrooms}</div>
              <div><span className="font-medium">Bathrooms:</span> {featuresData.bathrooms}</div>
              <div><span className="font-medium">Balconies:</span> {featuresData.balconies}</div>
              <div><span className="font-medium">Floor:</span> {featuresData.floorNumber}</div>
              <div><span className="font-medium">Total Floors:</span> {featuresData.totalFloors}</div>
              <div><span className="font-medium">Property Age:</span> {featuresData.propertyAge}</div>
              <div className="col-span-full">
                <span className="font-medium">Extra Rooms:</span> {featuresData.extraRooms.join(', ')}
              </div>
              <div><span className="font-medium">Super Builtup Area:</span> {featuresData.superBuiltupArea} sq ft</div>
              <div><span className="font-medium">Builtup Area:</span> {featuresData.builtupArea} sq ft</div>
              <div><span className="font-medium">Carpet Area:</span> {featuresData.carpetArea} sq ft</div>
              <div><span className="font-medium">Property Description:</span> {featuresData.propertyDescription}</div>
            </div>
          ))}

          {/* Amenities */}
          {renderSection("Society Amenities", (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {amenitiesData.selectedAmenities.map(amenity => (
                  <span key={amenity} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {amenity}
                    {amenity === 'Power Backup' && amenitiesData.powerBackupType && 
                      ` (${amenitiesData.powerBackupType})`}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Flat Amenities */}
          {renderSection("Flat Amenities", (
            <div className="flex flex-wrap gap-2">
              {flatAmenitiesData.selectedAmenities.map(amenity => (
                <span key={amenity} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>
          ))}

          {/* Restrictions */}
          {renderSection("Restrictions", (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="font-medium">Bachelor Tenants:</span> {restrictionsData.bachelorTenants}</div>
              <div><span className="font-medium">Non-Veg Tenants:</span> {restrictionsData.nonVegTenants}</div>
              <div><span className="font-medium">Pets Allowed:</span> {restrictionsData.tenantWithPets}</div>
              <div><span className="font-medium">Property Overlooking:</span> {restrictionsData.propertyOverlooking}</div>
              <div><span className="font-medium">Car Parking:</span> {restrictionsData.carParking === 'Yes' ? `Yes (${restrictionsData.carParkingCount})` : 'No'}</div>
              <div><span className="font-medium">Two Wheeler Parking:</span> {restrictionsData.twoWheelerParking === 'Yes' ? `Yes (${restrictionsData.twoWheelerParkingCount})` : 'No'}</div>
              <div><span className="font-medium">Flooring Type:</span> {restrictionsData.flooringType}</div>
            </div>
          ))}

          {/* Commercials */}
          {renderSection("Commercials", (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><span className="font-medium">Monthly Rent:</span> ₹{commercialsData.monthlyRent}</div>
              <div><span className="font-medium">Security Deposit:</span> ₹{commercialsData.securityDeposit}</div>
              <div><span className="font-medium">Maintenance:</span> {commercialsData.maintenance}</div>
              {commercialsData.maintenance === 'Excluded' && (
                <div><span className="font-medium">Maintenance Amount:</span> ₹{commercialsData.maintenanceAmount}</div>
              )}
            </div>
          ))}

          {/* Availability */}
          {renderSection("Availability", (
            <div>
              <span className="font-medium">Available From:</span> {new Date(availabilityData.availableFrom).toLocaleDateString()}
            </div>
          ))}

          {/* Photos */}
          {renderSection("Photos", (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.entries(photoData).map(([key, file]) => (
                file && renderPhotoPreview(file, key)
              ))}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}