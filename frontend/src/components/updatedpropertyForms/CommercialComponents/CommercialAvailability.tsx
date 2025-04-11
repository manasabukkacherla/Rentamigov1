import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Dog, Clock4 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CommercialAvailabilityProps {
  onAvailabilityChange?: (availability: Record<string, any>) => void;
}

const CommercialAvailability = ({ onAvailabilityChange }: CommercialAvailabilityProps) => {
  const [availability, setAvailability] = useState({
    availableFrom: '',
    availableImmediately: false,
    leaseDuration: '',
    noticePeriod: '',
    petsAllowed: false,
    operatingHours: {
      restricted: false,
      restrictions: ''
    }
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

  const handleOperatingHoursChange = (field: string, value: any) => {
    const updatedHours = {
      ...availability.operatingHours,
      [field]: value
    };
    handleChange('operatingHours', updatedHours);
  };

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
          {/* Available Immediately */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availability.availableImmediately}
                onChange={(e) => handleChange('availableImmediately', e.target.checked)}
                className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="text-black">Available Immediately</span>
            </label>
          </div>

          {/* Available From */}
          {!availability.availableImmediately && (
            <div>
              <label htmlFor="availableFrom" className="block text-gray-800 font-medium mb-2">
                Available From
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="availableFrom"
                  value={availability.availableFrom}
                  onChange={(e) => handleChange('availableFrom', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                />
              </div>
            </div>
          )}

          {/* Lease Duration */}
          <div>
            <label htmlFor="leaseDuration" className="block text-gray-800 font-medium mb-2">
              Preferred Lease Duration
            </label>
            <select
              id="leaseDuration"
              value={availability.leaseDuration}
              onChange={(e) => handleChange('leaseDuration', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="">Select lease duration</option>
              <option value="6 months">6 Months</option>
              <option value="1 year">1 Year</option>
              <option value="2 years">2 Years</option>
              <option value="3 years">3 Years</option>
              <option value="5 years">5 Years</option>
              <option value="flexible">Flexible</option>
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
                      checked={availability.petsAllowed}
                      onChange={() => handleChange('petsAllowed', true)}
                      className="text-white border-white/20 bg-transparent focus:ring-white"
                    />
                    <span className="text-black/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!availability.petsAllowed}
                      onChange={() => handleChange('petsAllowed', false)}
                      className="text-white border-white/20 bg-transparent focus:ring-white"
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
                        checked={availability.operatingHours.restricted}
                        onChange={() => handleOperatingHoursChange('restricted', true)}
                        className="text-white border-white/20 bg-transparent focus:ring-white"
                      />
                      <span className="text-black/80">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={!availability.operatingHours.restricted}
                        onChange={() => handleOperatingHoursChange('restricted', false)}
                        className="text-white border-white/20 bg-transparent focus:ring-white"
                      />
                      <span className="text-black/80">No</span>
                    </label>
                  </div>
                  {availability.operatingHours.restricted && (
                    <input
                      type="text"
                      value={availability.operatingHours.restrictions}
                      onChange={(e) => handleOperatingHoursChange('restrictions', e.target.value)}
                      placeholder="Specify operating hours restrictions"
                      className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                    />
                  )}
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