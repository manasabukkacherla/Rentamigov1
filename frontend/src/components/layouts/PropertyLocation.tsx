import React from 'react';
import { Home, Building, MapPin, Map, Navigation, MapPinned, Map as MapIcon, Hash } from 'lucide-react';
import { InputField } from './InputField';

export interface LocationData {
  propertyName: string;
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
  const updateField = (field: keyof LocationData) => (value: string) => {
    setLocationData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Property Name"
        icon={Home}
        value={locationData.propertyName}
        onChange={updateField('propertyName')}
        placeholder="Name of the property"
      />

      <InputField
        label="Flat No"
        icon={Building}
        value={locationData.flatNo}
        onChange={updateField('flatNo')}
        placeholder="Flat Number"
      />

      <InputField
        label="Address Line 1"
        icon={MapPin}
        value={locationData.addressLine1}
        onChange={updateField('addressLine1')}
        placeholder="Line 1"
      />

      <InputField
        label="Address Line 2"
        icon={MapPin}
        value={locationData.addressLine2}
        onChange={updateField('addressLine2')}
        placeholder="Line 2"
      />

      <InputField
        label="Address Line 3"
        icon={MapPin}
        value={locationData.addressLine3}
        onChange={updateField('addressLine3')}
        placeholder="Line 3"
      />

      <InputField
        label="Latitude"
        icon={Navigation}
        value={locationData.latitude}
        onChange={updateField('latitude')}
        type="number"
        placeholder="Co-ordinates"
      />

      <InputField
        label="Longitude"
        icon={Navigation}
        value={locationData.longitude}
        onChange={updateField('longitude')}
        type="number"
        placeholder="Co-ordinates"
      />

      <InputField
        label="Locality"
        icon={MapPinned}
        value={locationData.locality}
        onChange={updateField('locality')}
        placeholder="Locality of the property"
      />

      <InputField
        label="Area"
        icon={MapIcon}
        value={locationData.area}
        onChange={updateField('area')}
        placeholder="Multiple Areas"
      />

      <InputField
        label="Pin Code"
        icon={Hash}
        value={locationData.pinCode}
        onChange={updateField('pinCode')}
        type="number"
        placeholder="Pincode of the property"
      />
    </div>
  );
}