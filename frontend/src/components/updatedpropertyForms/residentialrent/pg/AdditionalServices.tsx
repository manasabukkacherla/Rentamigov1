import React, { useState } from 'react';
import { Brush, ShowerHead, Shield, Battery, Car, Dumbbell, Warehouse, Bike } from 'lucide-react';

interface Service {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  pricing?: string;
  isOptional?: boolean;
}

interface ParkingOption {
  type: 'covered' | 'open';
  vehicle: '2wheeler' | '4wheeler';
}

interface AdditionalServicesProps {
  selectedServices: string[];
  onChange: (selected: string[]) => void;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({ selectedServices, onChange }) => {
  const [localSelected, setLocalSelected] = useState<Set<string>>(new Set(selectedServices));

  React.useEffect(() => {
    setLocalSelected(new Set(selectedServices));
  }, [selectedServices]);

  const [parkingOptions, setParkingOptions] = useState<ParkingOption[]>([]);

  const services: Service[] = [
    {
      id: 'housekeeping',
      label: 'Housekeeping',
      description: 'Regular cleaning and maintenance of your room',
      pricing: 'Daily/Weekly service available',
      icon: <Brush className="w-6 h-6" />
    },
    {
      id: 'laundry',
      label: 'Laundry Service',
      description: 'Professional washing and ironing service',
      pricing: 'Extra charges apply',
      icon: <ShowerHead className="w-6 h-6" />,
      isOptional: true
    },
    {
      id: 'security',
      label: 'Security Features',
      description: '24/7 CCTV surveillance and security guard',
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'power',
      label: 'Power Backup',
      description: 'Uninterrupted power supply during outages',
      icon: <Battery className="w-6 h-6" />
    },
    {
      id: 'parking',
      label: 'Parking Space',
      description: 'Secure parking for two-wheelers and four-wheelers',
      pricing: 'Limited spots available',
      icon: <Car className="w-6 h-6" />,
      isOptional: true
    },
    {
      id: 'gym',
      label: 'Gym/Fitness Center',
      description: 'Well-equipped fitness facility',
      pricing: 'Premium amenity',
      icon: <Dumbbell className="w-6 h-6" />,
      isOptional: true
    }
  ];

  const handleServiceChange = (serviceId: string) => {
    const newSelected = new Set(localSelected);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
      if (serviceId === 'parking') {
        setParkingOptions([]);
      }
    } else {
      newSelected.add(serviceId);
    }
    setLocalSelected(newSelected);
    onChange(Array.from(newSelected));
  };

  const handleParkingOptionChange = (type: 'covered' | 'open', vehicle: '2wheeler' | '4wheeler') => {
    const exists = parkingOptions.some(
      option => option.type === type && option.vehicle === vehicle
    );

    if (exists) {
      setParkingOptions(parkingOptions.filter(
        option => !(option.type === type && option.vehicle === vehicle)
      ));
    } else {
      setParkingOptions([...parkingOptions, { type, vehicle }]);
    }
  };

  const isParkingOptionSelected = (type: 'covered' | 'open', vehicle: '2wheeler' | '4wheeler') => {
    return parkingOptions.some(
      option => option.type === type && option.vehicle === vehicle
    );
  };

  return (
    <div className="p-6 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Additional Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="bg-white rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {service.icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <label htmlFor={service.id} className="font-medium flex items-center">
                  {service.label}
                  {service.isOptional && (
                    <span className="ml-2 text-sm text-gray-400">(Optional)</span>
                  )}
                </label>
                <input
                  type="checkbox"
                  id={service.id}
                  checked={localSelected.has(service.id)}
                  onChange={() => handleServiceChange(service.id)}
                  className="h-5 w-5 border-white rounded bg-white checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">{service.description}</p>
              {service.pricing && (
                <p className="text-sm text-gray-500 mt-1 italic">
                  {service.pricing}
                </p>
              )}

              {/* Parking Options */}
              {service.id === 'parking' && localSelected.has('parking') && (
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <h3 className="text-sm font-semibold mb-3">Parking Options:</h3>
                  <div className="space-y-4">
                    {/* Covered Parking */}
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="flex items-center mb-2">
                        <Warehouse className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Covered Parking</span>
                      </div>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isParkingOptionSelected('covered', '2wheeler')}
                            onChange={() => handleParkingOptionChange('covered', '2wheeler')}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Bike className="w-4 h-4" />
                          <span>2 Wheeler</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isParkingOptionSelected('covered', '4wheeler')}
                            onChange={() => handleParkingOptionChange('covered', '4wheeler')}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Car className="w-4 h-4" />
                          <span>4 Wheeler</span>
                        </label>
                      </div>
                    </div>

                    {/* Open Parking */}
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="flex items-center mb-2">
                        <Car className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Open Parking</span>
                      </div>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isParkingOptionSelected('open', '2wheeler')}
                            onChange={() => handleParkingOptionChange('open', '2wheeler')}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Bike className="w-4 h-4" />
                          <span>2 Wheeler</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={isParkingOptionSelected('open', '4wheeler')}
                            onChange={() => handleParkingOptionChange('open', '4wheeler')}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Car className="w-4 h-4" />
                          <span>4 Wheeler</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6">
        <h2 className="text-lg font-semibold mb-4">Selected Additional Services:</h2>
        <div className="text-sm">
          <ul className="list-disc list-inside space-y-2">
            {Array.from(selectedServices).map(serviceId => {
              const service = services.find(s => s.id === serviceId);
              return (
                <li key={serviceId} className="text-gray-300">
                  {service?.label}
                  {service?.pricing && (
                    <span className="text-gray-500 italic ml-2">
                      ({service.pricing})
                    </span>
                  )}
                  {serviceId === 'parking' && parkingOptions.length > 0 && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {parkingOptions.map((option, index) => (
                        <li key={index} className="text-gray-400">
                          {option.type === 'covered' ? 'Covered' : 'Open'} parking for{' '}
                          {option.vehicle === '2wheeler' ? '2 wheeler' : '4 wheeler'}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices;