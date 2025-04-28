import React, { useState } from 'react';
import { IndianRupee, Calendar, Shield, Receipt, Wallet, Building2, Percent, Clock, Lock, Users } from 'lucide-react';

interface RoomShareDetails {
  monthlyRent: string;
  advancePaymentMonths: string;
  lockInPeriod: string;
  noticePeriod: string;
}

interface RoomSharePricing {
  singleShare: RoomShareDetails;
  doubleShare: RoomShareDetails;
  tripleShare: RoomShareDetails;
  fourShare: RoomShareDetails;
  fiveShare: RoomShareDetails;
  multiShare: RoomShareDetails & {
    capacity: string;
  };
}

const defaultRoomShareDetails: RoomShareDetails = {
  monthlyRent: '',
  advancePaymentMonths: '1',
  lockInPeriod: '6',
  noticePeriod: '1',
};

const Pricing = () => {
  const [roomSharePricing, setRoomSharePricing] = useState<RoomSharePricing>({
    singleShare: { ...defaultRoomShareDetails },
    doubleShare: { ...defaultRoomShareDetails },
    tripleShare: { ...defaultRoomShareDetails },
    fourShare: { ...defaultRoomShareDetails },
    fiveShare: { ...defaultRoomShareDetails },
    multiShare: { ...defaultRoomShareDetails, capacity: '6' },
  });

  const handleRoomSharePricingChange = (
    shareType: keyof RoomSharePricing,
    field: keyof RoomShareDetails,
    value: string
  ) => {
    setRoomSharePricing(prev => ({
      ...prev,
      [shareType]: {
        ...prev[shareType],
        [field]: value,
      },
    }));
  };

  const getShareDisplayName = (shareType: keyof RoomSharePricing): string => {
    switch (shareType) {
      case 'singleShare': return 'Single Share (1 Person)';
      case 'doubleShare': return 'Double Share (2 Persons)';
      case 'tripleShare': return 'Triple Share (3 Persons)';
      case 'fourShare': return 'Four Share (4 Persons)';
      case 'fiveShare': return 'Five Share (5 Persons)';
      case 'multiShare': return `Multi Share (${roomSharePricing.multiShare.capacity || '6+'} Persons)`;
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">Room Pricing Details</h2>
        <div className="space-y-10">
          {Object.keys(roomSharePricing).map((shareType) => (
            <div key={shareType} className="mb-8 border-b border-gray-100 pb-8">
              <h3 className="text-lg font-semibold mb-4">{getShareDisplayName(shareType as keyof RoomSharePricing)}</h3>
              {shareType === 'multiShare' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Persons</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing.multiShare.capacity}
                      onChange={(e) => setRoomSharePricing(prev => ({
                        ...prev,
                        multiShare: {
                          ...prev.multiShare,
                          capacity: e.target.value,
                        },
                      }))}
                      min="6"
                      placeholder="Enter number"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing[shareType as keyof RoomSharePricing].monthlyRent}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'monthlyRent', e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Months Required</label>
                  <select
                    value={roomSharePricing[shareType as keyof RoomSharePricing].advancePaymentMonths}
                    onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'advancePaymentMonths', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                  >
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      value={roomSharePricing[shareType as keyof RoomSharePricing].noticePeriod}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'noticePeriod', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    >
                      <option value="0.5">15 Days</option>
                      <option value="1">1 Month</option>
                      <option value="2">2 Months</option>
                      <option value="3">3 Months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Return (Lock-in Period)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      value={roomSharePricing[shareType as keyof RoomSharePricing].lockInPeriod}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'lockInPeriod', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    >
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="9">9 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="text-black rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Pricing Summary</h3>
        <div className="space-y-3">
          {/* Room Sharing Options Summary */}
          <div className="pb-3 mb-3 border-b border-black/20">
            <div className="text-black/70 mb-2">Room Sharing Options:</div>
            {Object.entries(roomSharePricing).map(([shareType, details]) => {
              if (details.monthlyRent) {
                const formattedRent = parseInt(details.monthlyRent).toLocaleString();
                const displayName = shareType === 'multiShare' 
                  ? `${details.capacity} Person Share`
                  : getShareDisplayName(shareType as keyof RoomSharePricing).split(' ')[0];
                return (
                  <div key={shareType} className="ml-4 mb-2">
                    <div className="flex justify-between">
                      <span>{displayName}:</span>
                      <span>₹{formattedRent}/month</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-white/80 text-xs mt-1">
                      <div>Advance: {details.advancePaymentMonths} month(s)</div>
                      <div>Notice: {details.noticePeriod === '0.5' ? '15 Days' : `${details.noticePeriod} Month(s)`}</div>
                      <div>Lock-in: {details.lockInPeriod} month(s)</div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;