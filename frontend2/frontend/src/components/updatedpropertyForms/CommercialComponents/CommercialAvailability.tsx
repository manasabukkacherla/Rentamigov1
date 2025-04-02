import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Users, Dog, Clock4 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface CommercialAvailabilityProps {
  onAvailabilityChange?: (availability: Record<string, any>) => void;
}

const CommercialAvailability = ({ onAvailabilityChange }: CommercialAvailabilityProps) => {
  const [availability, setAvailability] = useState({
    availableFrom: null as Date | null,
    preferredTenants: [] as string[],
    lockInPeriod: '',
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

  const handleTenantChange = (tenant: string, checked: boolean) => {
    const updatedTenants = checked
      ? [...availability.preferredTenants, tenant]
      : availability.preferredTenants.filter(t => t !== tenant);
    
    handleChange('preferredTenants', updatedTenants);
  };

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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Availability & Terms</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Availability Details</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Available From */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Calendar size={20} className="text-white/60" />
            Available From
          </h4>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <Calendar size={20} className="text-white/40" />
            </div>
            <DatePicker
              selected={availability.availableFrom}
              onChange={(date: any) => handleChange('availableFrom', date)}
              minDate={today}
              placeholderText="Select availability date"
              dateFormat="dd/MM/yyyy"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              wrapperClassName="w-full"
              popperClassName="!bg-gray-900 !border-white/20 !text-white"
              showPopperArrow={false}
              dayClassName={() => "!text-white hover:!bg-white/20"}
              monthClassName={() => "!text-white"}
              weekDayClassName={() => "!text-white"}
            />
          </div>
        </div>

        {/* Preferred Tenants */}
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Users size={20} className="text-white/60" />
            Preferred Tenants
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tenantTypes.map(tenant => (
              <label key={tenant} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                <input
                  type="checkbox"
                  checked={availability.preferredTenants.includes(tenant)}
                  onChange={(e) => handleTenantChange(tenant, e.target.checked)}
                  className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                />
                <span className="text-white/80">{tenant}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Lock-in & Notice Period */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Lock-in Period */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock size={20} className="text-white/60" />
                Lock-in Period
              </h4>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={availability.lockInPeriod}
                  onChange={(e) => handleChange('lockInPeriod', e.target.value)}
                  placeholder="Enter number of years"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Notice Period */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock size={20} className="text-white/60" />
                Notice Period
              </h4>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={availability.noticePeriod}
                  onChange={(e) => handleChange('noticePeriod', e.target.value)}
                  placeholder="Enter number of months"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pets & Operating Hours */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pets Allowed */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Dog size={20} className="text-white/60" />
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
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!availability.petsAllowed}
                    onChange={() => handleChange('petsAllowed', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Clock4 size={20} className="text-white/60" />
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
                    <span className="text-white/80">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!availability.operatingHours.restricted}
                      onChange={() => handleOperatingHoursChange('restricted', false)}
                      className="text-white border-white/20 bg-transparent focus:ring-white"
                    />
                    <span className="text-white/80">No</span>
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
  );
};

export default CommercialAvailability;