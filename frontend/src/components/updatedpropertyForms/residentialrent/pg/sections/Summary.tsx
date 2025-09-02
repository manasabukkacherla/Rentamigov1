import React from 'react';
import { UseFormWatch } from 'react-hook-form';

interface SummaryProps {
  watch: UseFormWatch<any>;
}

const Summary: React.FC<SummaryProps> = ({ watch }) => {
  const formData = watch();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Review Your Listing</h2>

      {/* Basic Details */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Property Name</p>
            <p className="font-medium text-black">{formData.propertyName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Owner Name</p>
            <p className="font-medium text-black">{formData.ownerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Contact Number</p>
            <p className="font-medium text-black">{formData.contactNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-black">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Property Type</p>
            <p className="font-medium text-black">{formData.propertyType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gender Allowed</p>
            <p className="font-medium text-black">{formData.genderAllowed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sharing Types</p>
            <p className="font-medium text-black">{formData.sharingTypes?.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Location Details */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Location Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium text-black">{formData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Landmark</p>
            <p className="font-medium text-black">{formData.landmark || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="font-medium text-black">{formData.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">State</p>
            <p className="font-medium text-black">{formData.state}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pincode</p>
            <p className="font-medium text-black">{formData.pincode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location Type</p>
            <p className="font-medium text-black">{formData.locationType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Property Age</p>
            <p className="font-medium text-black">{formData.propertyAge}</p>
          </div>
        </div>
      </div>

      {/* Rent Details */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Rent Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Rent Amount</p>
            <p className="font-medium text-black">{formatCurrency(formData.rentAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Security Deposit</p>
            <p className="font-medium text-black">{formatCurrency(formData.securityDeposit)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Maintenance Charges</p>
            <p className="font-medium text-black">
              {formData.maintenanceCharges ? formatCurrency(formData.maintenanceCharges) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Food Charges</p>
            <p className="font-medium text-black">
              {formData.foodCharges ? formatCurrency(formData.foodCharges) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Other Charges</p>
            <p className="font-medium text-black">
              {formData.otherCharges ? formatCurrency(formData.otherCharges) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Terms</p>
            <p className="font-medium text-black">{formData.paymentTerms}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Advance Payment</p>
            <p className="font-medium text-black">{formData.advancePayment}</p>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Room Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Rooms</p>
            <p className="font-medium text-black">{formData.totalRooms}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Room Size</p>
            <p className="font-medium text-black">{formData.roomSize} sq ft</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Room Type</p>
            <p className="font-medium text-black">{formData.roomType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Room Furnishing</p>
            <p className="font-medium text-black">{formData.roomFurnishing}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Room Features</p>
            <p className="font-medium text-black">{formData.roomFeatures?.join(', ')}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Room Description</p>
            <p className="font-medium text-black">{formData.roomDescription}</p>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Amenities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">Selected Amenities</p>
            <p className="font-medium text-black">{formData.amenities?.join(', ')}</p>
          </div>
          {formData.additionalAmenities && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Additional Amenities</p>
              <p className="font-medium text-black">{formData.additionalAmenities}</p>
            </div>
          )}
          <div className="md:col-span-2">
            <p className="text-sm text-gray-600">House Rules</p>
            <p className="font-medium text-black">{formData.houseRules}</p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium text-black mb-3">Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Available From</p>
            <p className="font-medium text-black">{formatDate(formData.availableFrom)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Available Until</p>
            <p className="font-medium text-black">
              {formData.availableUntil ? formatDate(formData.availableUntil) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Beds Available</p>
            <p className="font-medium text-black">{formData.bedsAvailable}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Preferred Tenant Type</p>
            <p className="font-medium text-black">{formData.preferredTenantType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Minimum Stay Duration</p>
            <p className="font-medium text-black">{formData.minimumStayDuration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Preferred Move-in Time</p>
            <p className="font-medium text-black">{formData.preferredMoveInTime}</p>
          </div>
          {formData.additionalNotes && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Additional Notes</p>
              <p className="font-medium text-black">{formData.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary; 