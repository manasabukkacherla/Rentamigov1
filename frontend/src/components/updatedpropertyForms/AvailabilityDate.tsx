import React, { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface AvailabilityDateProps {
  onAvailabilityChange?: (availability: {
    type: 'immediate' | 'specific';
    date?: string;
  }) => void;
}

const AvailabilityDate = ({ onAvailabilityChange }: AvailabilityDateProps) => {
  const [availabilityType, setAvailabilityType] = useState<'immediate' | 'specific'>('immediate');
  const [specificDate, setSpecificDate] = useState<Date | null>(null);

  const handleTypeChange = (type: 'immediate' | 'specific') => {
    setAvailabilityType(type);
    onAvailabilityChange?.({
      type,
      date: type === 'specific' ? specificDate?.toISOString() : undefined,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSpecificDate(date);
    if (date) {
      onAvailabilityChange?.({
        type: availabilityType,
        date: date.toISOString(),
      });
    }
  };

  // Get today's date for min attribute
  const today = new Date();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Availability Date</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">When will the property be available?</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleTypeChange('immediate')}
              className={`flex-1 px-6 py-4 rounded-lg border transition-all duration-200 ${
                availabilityType === 'immediate'
                  ? 'bg-white text-black border-white'
                  : 'border-white/20 hover:border-white'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar size={20} />
                <span className="font-medium">Immediate</span>
              </div>
              <p className="text-sm mt-1 opacity-70">Available right now</p>
            </button>

            <button
              onClick={() => handleTypeChange('specific')}
              className={`flex-1 px-6 py-4 rounded-lg border transition-all duration-200 ${
                availabilityType === 'specific'
                  ? 'bg-white text-black border-white'
                  : 'border-white/20 hover:border-white'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Calendar size={20} />
                <span className="font-medium">Specific Date</span>
              </div>
              <p className="text-sm mt-1 opacity-70">Available from a future date</p>
            </button>
          </div>

          {availabilityType === 'specific' && (
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                <Calendar size={20} className="text-white/40" />
              </div>
              <DatePicker
                selected={specificDate}
                onChange={handleDateChange}
                minDate={today}
                placeholderText="Select availability date"
                dateFormat="dd/MM/yyyy"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                wrapperClassName="w-full"
                calendarClassName="!bg-black !border-white/20 !text-white"
                showPopperArrow={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDate;