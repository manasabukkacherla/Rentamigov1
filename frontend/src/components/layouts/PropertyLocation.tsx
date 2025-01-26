import React, { useState } from 'react';
import { 
  Home, 
  Building, 
  MapPin, 
  Navigation, 
  MapPinned, 
  Map as MapIcon, 
  Hash 
} from 'lucide-react';
import { InputField } from './InputField';

export interface LocationData {
  _id: any;
  flatNo: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  latitude: string;
  longitude: string;
  locality: string;
  area: string;
  pinCode: string;
}

interface PropertyLocationProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
}

export function PropertyLocation({ locationData, setLocationData }: PropertyLocationProps) {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof LocationData) => (value: string) => {
    setLocationData(prev => ({ ...prev, [field]: value }));
  };

  const validateField = (field: keyof LocationData, value: string) => {
    if (!value) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: `${field} is required.`,
      }));
    } else {
      setValidationErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[field];
        return updatedErrors;
      });
    }
  };

  const handleBlur = (field: keyof LocationData) => {
    const value = locationData[field];
    validateField(field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Flat No"
        icon={Building}
        value={locationData.flatNo}
        onChange={updateField('flatNo')}
        placeholder="Flat Number"
        error={validationErrors.flatNo}
        onBlur={() => handleBlur('flatNo')}
      />

      <InputField
        label="Address Line 1"
        icon={MapPin}
        value={locationData.addressLine1}
        onChange={updateField('addressLine1')}
        placeholder="Line 1"
        error={validationErrors.addressLine1}
        onBlur={() => handleBlur('addressLine1')}
      />

      <InputField
        label="Address Line 2"
        icon={MapPin}
        value={locationData.addressLine2}
        onChange={updateField('addressLine2')}
        placeholder="Line 2"
        error={validationErrors.addressLine2}
        onBlur={() => handleBlur('addressLine2')}
      />

      <InputField
        label="Address Line 3"
        icon={MapPin}
        value={locationData.addressLine3}
        onChange={updateField('addressLine3')}
        placeholder="Line 3"
        error={validationErrors.addressLine3}
        onBlur={() => handleBlur('addressLine3')}
      />

      <InputField
        label="Latitude"
        icon={Navigation}
        value={locationData.latitude}
        onChange={updateField('latitude')}
        type="number"
        placeholder="Latitude"
        error={validationErrors.latitude}
        onBlur={() => handleBlur('latitude')}
      />

      <InputField
        label="Longitude"
        icon={Navigation}
        value={locationData.longitude}
        onChange={updateField('longitude')}
        type="number"
        placeholder="Longitude"
        error={validationErrors.longitude}
        onBlur={() => handleBlur('longitude')}
      />

      <InputField
        label="Locality"
        icon={MapPinned}
        value={locationData.locality}
        onChange={updateField('locality')}
        placeholder="Locality of the property"
        error={validationErrors.locality}
        onBlur={() => handleBlur('locality')}
      />

      <InputField
        label="Area"
        icon={MapIcon}
        value={locationData.area}
        onChange={updateField('area')}
        placeholder="Area or multiple areas"
        error={validationErrors.area}
        onBlur={() => handleBlur('area')}
      />

      <InputField
        label="Pin Code"
        icon={Hash}
        value={locationData.pinCode}
        onChange={updateField('pinCode')}
        type="number"
        placeholder="Pincode of the property"
        error={validationErrors.pinCode}
        onBlur={() => handleBlur('pinCode')}
      />
    </div>
  );
}
