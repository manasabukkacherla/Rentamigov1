import React, { useState } from 'react';
import { AlertTriangle, Clock, Ban, Volume2, Cigarette, Beer, Users, Fingerprint } from 'lucide-react';

interface Restriction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  customInput?: boolean;
  options?: string[];
}

const Restrictions = () => {
  const [selectedRestrictions, setSelectedRestrictions] = useState<Set<string>>(new Set());
  const [customTimes, setCustomTimes] = useState({
    inTime: '',
    outTime: '',
    quietHoursStart: '',
    quietHoursEnd: '',
  });
  const [has24HourAccess, setHas24HourAccess] = useState(false);

  const restrictions: Restriction[] = [
    {
      id: 'timing',
      label: 'In/Out Timing',
      description: 'Set entry and exit time restrictions',
      icon: <Clock className="w-6 h-6" />,
      customInput: true
    },
    {
      id: 'quiet-hours',
      label: 'Quiet Hours',
      description: 'Designated quiet hours for studying/sleeping',
      icon: <Volume2 className="w-6 h-6" />,
      customInput: true
    },
    {
      id: 'smoking',
      label: 'No Smoking',
      description: 'Smoking is strictly prohibited within premises',
      icon: <Cigarette className="w-6 h-6" />
    },
    {
      id: 'alcohol',
      label: 'No Alcohol',
      description: 'Alcohol consumption is not allowed',
      icon: <Beer className="w-6 h-6" />
    },
    {
      id: 'guests',
      label: 'Guest Policy',
      description: 'Rules for bringing guests to the premises',
      icon: <Users className="w-6 h-6" />,
      options: [
        'No guests allowed',
        'Only same-gender guests allowed',
        'Guests allowed in common areas only',
        'Guests allowed with prior permission',
        'No overnight guests'
      ]
    },
    {
      id: 'prohibited-items',
      label: 'Prohibited Items',
      description: 'Items not allowed in the PG',
      icon: <Ban className="w-6 h-6" />,
      options: [
        'Electric cooking appliances',
        'Candles/Incense sticks',
        'Pets',
        'Heavy electrical equipment',
        'Weapons of any kind'
      ]
    }
  ];

  const handleRestrictionChange = (restrictionId: string) => {
    const newSelectedRestrictions = new Set(selectedRestrictions);
    if (newSelectedRestrictions.has(restrictionId)) {
      newSelectedRestrictions.delete(restrictionId);
    } else {
      newSelectedRestrictions.add(restrictionId);
    }
    setSelectedRestrictions(newSelectedRestrictions);
  };

  const handleTimeChange = (field: keyof typeof customTimes, value: string) => {
    setCustomTimes(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 bg-black text-white">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold">PG Restrictions & Rules</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fingerprint Access Card */}
        <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <Fingerprint className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <label htmlFor="fingerprint-access" className="font-medium">
                  24/7 Fingerprint Access
                </label>
                <input
                  type="checkbox"
                  id="fingerprint-access"
                  checked={has24HourAccess}
                  onChange={() => setHas24HourAccess(!has24HourAccess)}
                  className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Secure 24/7 access using biometric fingerprint authentication
              </p>
            </div>
          </div>
        </div>

        {/* Other Restrictions */}
        {restrictions.map((restriction) => (
          <div 
            key={restriction.id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {restriction.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <label htmlFor={restriction.id} className="font-medium">
                    {restriction.label}
                  </label>
                  <input
                    type="checkbox"
                    id={restriction.id}
                    checked={selectedRestrictions.has(restriction.id)}
                    onChange={() => handleRestrictionChange(restriction.id)}
                    className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                    disabled={restriction.id === 'timing' && has24HourAccess}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">{restriction.description}</p>
                {restriction.id === 'timing' && has24HourAccess && (
                  <p className="text-sm text-blue-400 mt-1">
                    24/7 access enabled with fingerprint authentication
                  </p>
                )}

                {/* Custom Time Inputs */}
                {restriction.customInput && selectedRestrictions.has(restriction.id) && !has24HourAccess && (
                  <div className="mt-4 space-y-3">
                    {restriction.id === 'timing' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">In Time</label>
                          <input
                            type="time"
                            value={customTimes.inTime}
                            onChange={(e) => handleTimeChange('inTime', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Out Time</label>
                          <input
                            type="time"
                            value={customTimes.outTime}
                            onChange={(e) => handleTimeChange('outTime', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </>
                    )}
                    {restriction.id === 'quiet-hours' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Time</label>
                          <input
                            type="time"
                            value={customTimes.quietHoursStart}
                            onChange={(e) => handleTimeChange('quietHoursStart', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Time</label>
                          <input
                            type="time"
                            value={customTimes.quietHoursEnd}
                            onChange={(e) => handleTimeChange('quietHoursEnd', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Options Selection */}
                {restriction.options && selectedRestrictions.has(restriction.id) && (
                  <div className="mt-4 space-y-2">
                    {restriction.options.map((option, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      {(selectedRestrictions.size > 0 || has24HourAccess) && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Active Restrictions:</h2>
          <div className="space-y-4">
            {has24HourAccess && (
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Fingerprint className="w-6 h-6 text-blue-400" />
                  <span className="font-medium">24/7 Fingerprint Access</span>
                </div>
                <p className="text-sm text-gray-400">
                  Unrestricted access with biometric authentication
                </p>
              </div>
            )}
            {Array.from(selectedRestrictions).map(restrictionId => {
              const restriction = restrictions.find(r => r.id === restrictionId);
              if (!restriction || (restriction.id === 'timing' && has24HourAccess)) return null;

              return (
                <div key={restrictionId} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {restriction.icon}
                    <span className="font-medium">{restriction.label}</span>
                  </div>
                  {restrictionId === 'timing' && customTimes.inTime && customTimes.outTime && (
                    <p className="text-sm text-gray-400">
                      In Time: {customTimes.inTime} | Out Time: {customTimes.outTime}
                    </p>
                  )}
                  {restrictionId === 'quiet-hours' && customTimes.quietHoursStart && customTimes.quietHoursEnd && (
                    <p className="text-sm text-gray-400">
                      Quiet Hours: {customTimes.quietHoursStart} to {customTimes.quietHoursEnd}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restrictions;