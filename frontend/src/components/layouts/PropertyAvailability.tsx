import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface AvailabilityData {
  _id: any;
  availableFrom: string;
}

interface PropertyAvailabilityProps {
  availabilityData: AvailabilityData;
  setAvailabilityData: React.Dispatch<React.SetStateAction<AvailabilityData>>;
}

export function PropertyAvailability({
  availabilityData,
  setAvailabilityData,
}: PropertyAvailabilityProps) {
  const [isDateValid, setIsDateValid] = useState(true);

  const handleDateChange = (value: string) => {
    if (!value) {
      setIsDateValid(false);
      toast.error('Please select a valid date.');
    } else {
      setIsDateValid(true);
    }
    setAvailabilityData((prev) => ({ ...prev, availableFrom: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Available From
          </label>
          <input
            type="date"
            value={availabilityData.availableFrom}
            onChange={(e) => handleDateChange(e.target.value)}
            className={`w-full px-4 py-2 border ${
              isDateValid ? 'border-gray-300' : 'border-red-500'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
          />
          {!isDateValid && (
            <p className="text-sm text-red-500 mt-1">This field is required.</p>
          )}
        </div>
      </div>
    </div>
  );
}
