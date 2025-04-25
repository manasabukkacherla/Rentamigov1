import React, { useState } from 'react';
import { IndianRupee, Calendar, Shield, Receipt, Wallet, Building2, Percent, Clock, Lock, Users } from 'lucide-react';

interface RoomShareDetails {
  monthlyRent: string;
  securityDeposit: string;
  maintenanceCharge: string;
  amenitiesCharge: string;
  advancePaymentMonths: string;
  advancePaymentPercentage: string;
  noticePeriod: string;
  lockInPeriod: string;
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
  securityDeposit: '',
  maintenanceCharge: '',
  amenitiesCharge: '',
  advancePaymentMonths: '1',
  advancePaymentPercentage: '100',
  noticePeriod: '1',
  lockInPeriod: '6',
};

const Pricing = () => {
  const [roomSharePricing, setRoomSharePricing] = useState<RoomSharePricing>({
    singleShare: { ...defaultRoomShareDetails },
    doubleShare: { ...defaultRoomShareDetails },
    tripleShare: { ...defaultRoomShareDetails },
    fourShare: { ...defaultRoomShareDetails },
    fiveShare: { ...defaultRoomShareDetails },
    multiShare: { 
      ...defaultRoomShareDetails,
      capacity: '6',
    },
  });

  const [activeTab, setActiveTab] = useState<keyof RoomSharePricing>('singleShare');

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

  const calculateMonthlyTotal = (shareType: keyof RoomSharePricing) => {
    const details = roomSharePricing[shareType];
    const rent = parseFloat(details.monthlyRent) || 0;
    const amenities = parseFloat(details.amenitiesCharge) || 0;
    return rent + amenities;
  };

  const getShareDisplayName = (shareType: keyof RoomSharePricing): string => {
    switch (shareType) {
      case 'singleShare': return 'Single Share (1 Person)';
      case 'doubleShare': return 'Double Share (2 Persons)';
      case 'tripleShare': return 'Triple Share (3 Persons)';
      case 'fourShare': return 'Four Share (4 Persons)';
      case 'fiveShare': return 'Five Share (5 Persons)';
      case 'multiShare': return `Multi Share (${roomSharePricing.multiShare.capacity}+ Persons)`;
      default: return '';
    }
  };

  const renderTabContent = (shareType: keyof RoomSharePricing) => {
    const isMultiShare = shareType === 'multiShare';

    return (
      <div className="space-y-6">
        {/* Monthly Charges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-5">
            <div className="p-2 rounded-md bg-black text-white mr-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Monthly Charges</h3>
              <p className="text-sm text-gray-500 mt-0.5">Regular recurring charges for residents</p>
            </div>
          </div>

          <div className="space-y-4">
            {isMultiShare && (
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
                    value={roomSharePricing[shareType].monthlyRent}
                    onChange={(e) => handleRoomSharePricingChange(shareType, 'monthlyRent', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Amenities Charge</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="number"
                    value={roomSharePricing[shareType].amenitiesCharge}
                    onChange={(e) => handleRoomSharePricingChange(shareType, 'amenitiesCharge', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Monthly Payment</span>
                <span className="text-lg font-medium text-black">
                  ₹{calculateMonthlyTotal(shareType).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* One-time Charges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-5">
            <div className="p-2 rounded-md bg-gray-100 text-gray-700 mr-3">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">One-time Charges</h3>
              <p className="text-sm text-gray-500 mt-0.5">Initial payments required at move-in</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={roomSharePricing[shareType].securityDeposit}
                  onChange={(e) => handleRoomSharePricingChange(shareType, 'securityDeposit', e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Refundable at the end of stay, subject to deductions</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">One-time Maintenance Charge</label>
              <div className="relative">
                <Receipt className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={roomSharePricing[shareType].maintenanceCharge}
                  onChange={(e) => handleRoomSharePricingChange(shareType, 'maintenanceCharge', e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advance Payment Terms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-5">
            <div className="p-2 rounded-md bg-gray-100 text-gray-700 mr-3">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Advance Payment Terms</h3>
              <p className="text-sm text-gray-500 mt-0.5">Terms for rental payments in advance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Advance Months Required</label>
              <select
                value={roomSharePricing[shareType].advancePaymentMonths}
                onChange={(e) => handleRoomSharePricingChange(shareType, 'advancePaymentMonths', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment Percentage</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={roomSharePricing[shareType].advancePaymentPercentage}
                  onChange={(e) => handleRoomSharePricingChange(shareType, 'advancePaymentPercentage', e.target.value)}
                  min="0"
                  max="100"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contract Terms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-5">
            <div className="p-2 rounded-md bg-gray-100 text-gray-700 mr-3">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contract Terms</h3>
              <p className="text-sm text-gray-500 mt-0.5">Agreement duration and notice requirements</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select
                  value={roomSharePricing[shareType].noticePeriod}
                  onChange={(e) => handleRoomSharePricingChange(shareType, 'noticePeriod', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Lock-in Period</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select
                  value={roomSharePricing[shareType].lockInPeriod}
                  onChange={(e) => handleRoomSharePricingChange(shareType, 'lockInPeriod', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="9">9 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Room Share Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap border-b border-gray-200">
          {Object.keys(roomSharePricing).map((shareType) => (
            <button
              key={shareType}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === shareType
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(shareType as keyof RoomSharePricing)}
            >
              {getShareDisplayName(shareType as keyof RoomSharePricing)}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {renderTabContent(activeTab)}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-black text-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Pricing Summary</h3>
        
        <div className="space-y-3">
          {/* Room Sharing Options Summary */}
          <div className="pb-3 mb-3 border-b border-white/20">
            <div className="text-white/70 mb-2">Room Sharing Options:</div>
            {Object.entries(roomSharePricing).map(([shareType, details]) => {
              if (details.monthlyRent) {
                const formattedRent = parseInt(details.monthlyRent).toLocaleString();
                const displayName = shareType === 'multiShare' 
                  ? `${details.capacity} Person Share`
                  : getShareDisplayName(shareType as keyof RoomSharePricing).split(' ')[0];
                
                return (
                  <div key={shareType} className="flex justify-between ml-4">
                    <span>{displayName}:</span>
                    <span>₹{formattedRent}/month</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          
          {/* Current Selected Option Details */}
          {roomSharePricing[activeTab].monthlyRent && (
            <>
              <div className="text-white/70 mb-2">Selected: {getShareDisplayName(activeTab)}</div>
              
              <div className="flex justify-between ml-4">
                <span>Monthly Rent:</span>
                <span>₹{parseInt(roomSharePricing[activeTab].monthlyRent).toLocaleString()}</span>
              </div>
              
              {roomSharePricing[activeTab].amenitiesCharge && (
                <div className="flex justify-between ml-4">
                  <span>Monthly Amenities:</span>
                  <span>₹{parseInt(roomSharePricing[activeTab].amenitiesCharge).toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between pt-2 ml-4 border-t border-white/20">
                <span className="font-medium">Total Monthly:</span>
                <span className="font-medium">₹{calculateMonthlyTotal(activeTab).toLocaleString()}</span>
              </div>
              
              {roomSharePricing[activeTab].securityDeposit && (
                <div className="flex justify-between pt-3 mt-2 ml-4 border-t border-white/20">
                  <span>Security Deposit:</span>
                  <span>₹{parseInt(roomSharePricing[activeTab].securityDeposit).toLocaleString()}</span>
                </div>
              )}
              
              {roomSharePricing[activeTab].advancePaymentMonths !== '1' && (
                <div className="flex justify-between ml-4">
                  <span>Advance Payment:</span>
                  <span>{roomSharePricing[activeTab].advancePaymentMonths} months ({roomSharePricing[activeTab].advancePaymentPercentage}%)</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;