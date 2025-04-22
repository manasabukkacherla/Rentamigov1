import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Dog, Clock4 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CommercialAvailabilityProps {
  onAvailabilityChange?: (availability: Record<string, any>) => void;
}

interface AvailabilityState {
  type: 'immediate' | 'specific';
  date: Date;
  preferredSaleDuration: string;
  noticePeriod: string;
  isPetsAllowed: boolean;
  operatingHours: boolean;
}

const CommercialAvailability = ({ onAvailabilityChange }: CommercialAvailabilityProps) => {
  const [availability, setAvailability] = useState<AvailabilityState>({
    type: 'immediate',
    date: new Date(),
    preferredSaleDuration: '',
    noticePeriod: '',
    isPetsAllowed: false,
    operatingHours: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedAvailability = { ...availability, [field]: value };
    setAvailability(updatedAvailability);
    onAvailabilityChange?.(updatedAvailability);
  };

  // const handleTenantChange = (tenant: string, checked: boolean) => {
  //   const updatedTenants = checked
  //     ? [...availability.preferredTenants, tenant]
  //     : availability.preferredTenants.filter(t => t !== tenant);
    
  //   handleChange('preferredTenants', updatedTenants);
  // };

  const tenantTypes = [
    'Corporate',
    'Retail Brands',
    'Startups',
    'Warehousing',
    'Manufacturing',
    'IT/Software',
    'Educational',
    'Healthcare',
    'Others'
  ];

  // Get today's date for min attribute
  const today = new Date();

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <Calendar className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Availability</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Availability Type */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Availability</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={availability.type === 'immediate'}
                  onChange={() => handleChange('type', 'immediate')}
                  className="text-black border-gray-300 focus:ring-black"
                />
                <span className="text-black/80">Available Immediately</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={availability.type === 'specific'}
                  onChange={() => handleChange('type', 'specific')}
                  className="text-black border-gray-300 focus:ring-black"
                />
                <span className="text-black/80">Specific Date</span>
              </label>
            </div>
          </div>

          {/* Available From */}
          {availability.type === 'specific' && (
            <div>
              <label htmlFor="availableFrom" className="block text-gray-800 font-medium mb-2">
                Available From
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="availableFrom"
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    handleChange('date', selectedDate);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                />
              </div>
            </div>
          )}

          {/* Preferred Sale Duration */}
          <div>
            <label htmlFor="preferredSaleDuration" className="block text-gray-800 font-medium mb-2">
              Preferred Sale Duration
            </label>
            <select
              id="preferredSaleDuration"
              value={availability.preferredSaleDuration}
              onChange={(e) => handleChange('preferredSaleDuration', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="">Select preferred duration</option>
              <option value="1-3 months">1-3 Months</option>
              <option value="3-6 months">3-6 Months</option>
              <option value="6-12 months">6-12 Months</option>
              <option value="Over 1 year">Over 1 Year</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Notice Period */}
          <div>
            <label htmlFor="noticePeriod" className="block text-gray-800 font-medium mb-2">
              Notice Period
            </label>
            <select
              id="noticePeriod"
              value={availability.noticePeriod}
              onChange={(e) => handleChange('noticePeriod', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="">Select notice period</option>
              <option value="15 days">15 Days</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
            </select>
          </div>

          {/* Pets & Operating Hours */}
          <div className="bg-white/5 p-6 rounded-lg space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Pets Allowed */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Dog size={20} className="text-black/60" />
                  Pets Allowed
                </h4>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={availability.isPetsAllowed}
                      onChange={() => handleChange('isPetsAllowed', true)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!availability.isPetsAllowed}
                      onChange={() => handleChange('isPetsAllowed', false)}
                      className="text-black border-gray-300 focus:ring-black"
                    />
                    <span className="text-black/80">No</span>
                  </label>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium flex items-center gap-2">
                  <Clock4 size={20} className="text-black/60" />
                  Operating Hours Restrictions
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={availability.operatingHours}
                        onChange={() => handleChange('operatingHours', true)}
                        className="text-black border-gray-300 focus:ring-black"
                      />
                      <span className="text-black/80">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={!availability.operatingHours}
                        onChange={() => handleChange('operatingHours', false)}
                        className="text-black border-gray-300 focus:ring-black"
                      />
                      <span className="text-black/80">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialAvailability;