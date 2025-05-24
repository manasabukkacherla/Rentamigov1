import React, { useState } from 'react';
import { IndianRupee, Calendar, Shield, Receipt, Wallet, Building2, Percent, Clock, Lock, Users } from 'lucide-react';

interface ShareDetails {
  monthlyRent?: string;
  advancePaymentMonths?: string;
  lockInPeriod?: string;
  noticePeriod?: string;
}

interface MultiShareDetails extends ShareDetails {
  numberOfPersons?: string;
}

interface RoomSharePricing {
  singleShare?: ShareDetails;
  doubleShare?: ShareDetails;
  tripleShare?: ShareDetails;
  fourShare?: ShareDetails;
  fiveShare?: ShareDetails;
  multiShare?: MultiShareDetails;
}

interface PricingProps {
  pricing: {
    rent: number;
    deposit?: number;
    maintenance?: number;
    includedUtilities?: string[];
    terms?: string;
    roomSharePricing?: RoomSharePricing;
  };
  onPricingChange: (pricing: any) => void;
  selectedShares: string[];
  customShare: string;
}

const defaultShareDetails: ShareDetails = {
  monthlyRent: '',
  advancePaymentMonths: '1',
  lockInPeriod: '6',
  noticePeriod: '1',
};

const defaultMultiShareDetails: MultiShareDetails = {
  ...defaultShareDetails,
  numberOfPersons: '6',
};

const Pricing: React.FC<PricingProps> = ({ pricing, onPricingChange, selectedShares, customShare }) => {
  // Initialize roomSharePricing from props or default values
  const [roomSharePricing, setRoomSharePricing] = useState<RoomSharePricing>({
    singleShare: pricing.roomSharePricing?.singleShare || { ...defaultShareDetails },
    doubleShare: pricing.roomSharePricing?.doubleShare || { ...defaultShareDetails },
    tripleShare: pricing.roomSharePricing?.tripleShare || { ...defaultShareDetails },
    fourShare: pricing.roomSharePricing?.fourShare || { ...defaultShareDetails },
    fiveShare: pricing.roomSharePricing?.fiveShare || { ...defaultShareDetails },
    multiShare: pricing.roomSharePricing?.multiShare || { ...defaultMultiShareDetails },
  });
  
  // Additional pricing state
  const [deposit, setDeposit] = useState<string>(pricing.deposit?.toString() || '');
  const [maintenance, setMaintenance] = useState<string>(pricing.maintenance?.toString() || '');
  const [includedUtilities, setIncludedUtilities] = useState<string[]>(pricing.includedUtilities || []);
  const [terms, setTerms] = useState<string>(pricing.terms || '');

  // Update parent component when pricing changes - debounced for better performance
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // Filter out empty share types to keep the data clean
      const cleanedRoomSharePricing: RoomSharePricing = {};
      
      // Only include share types that are selected and have at least one value set
      Object.entries(roomSharePricing).forEach(([key, value]) => {
        const shareType = key as keyof RoomSharePricing;
        if (value && Object.values(value).some(v => v !== '' && v !== undefined)) {
          cleanedRoomSharePricing[shareType] = value;
        }
      });
      
      onPricingChange({
        ...pricing,
        roomSharePricing: Object.keys(cleanedRoomSharePricing).length > 0 ? cleanedRoomSharePricing : undefined,
        deposit: deposit ? Number(deposit) : undefined,
        maintenance: maintenance ? Number(maintenance) : undefined,
        includedUtilities: includedUtilities.length > 0 ? includedUtilities : undefined,
        terms: terms || undefined
      });
    }, 300); // 300ms debounce
    
    return () => clearTimeout(timer);
  }, [roomSharePricing, deposit, maintenance, includedUtilities, terms, pricing, onPricingChange]);

  // Memoized handler for better performance
  const handleRoomSharePricingChange = React.useCallback(
    (shareType: keyof RoomSharePricing, field: string, value: string) => {
      setRoomSharePricing(prev => ({
        ...prev,
        [shareType]: {
          ...prev[shareType],
          [field]: value,
        },
      }));
    },
    []
  );

  const getShareDisplayName = (shareType: keyof RoomSharePricing): string => {
    switch (shareType) {
      case 'singleShare': return 'Single Share (1 Person)';
      case 'doubleShare': return 'Double Share (2 Persons)';
      case 'tripleShare': return 'Triple Share (3 Persons)';
      case 'fourShare': return 'Four Share (4 Persons)';
      case 'fiveShare': return 'Five Share (5 Persons)';
      case 'multiShare': return `Multi Share (${roomSharePricing.multiShare?.numberOfPersons || '6+'} Persons)`;
      default: return '';
    }
  };

  // Memoized filter function for better performance
  const shareTypeMap = React.useMemo<Record<string, keyof RoomSharePricing>>(() => ({
    'single': 'singleShare',
    'double': 'doubleShare',
    'triple': 'tripleShare',
    'four': 'fourShare',
    'five': 'fiveShare',
    'more': 'multiShare'
  }), []);
  
  // Filter share types based on selected shares - memoized for performance
  const filteredShareTypes = React.useMemo(() => {
    // If no shares are selected, show all available share types
    if (!selectedShares || selectedShares.length === 0) {
      return Object.keys(roomSharePricing);
    }
    
    // Map the selected shares to their corresponding share types
    return selectedShares.map(shareId => {
      // Find the corresponding share type for this shareId
      const shareType = Object.entries(shareTypeMap).find(([id, _]) => id === shareId)?.[1];
      return shareType;
    }).filter(Boolean) as string[];
  }, [roomSharePricing, selectedShares, shareTypeMap]);

  // Utility options
  const utilityOptions = [
    { id: 'electricity', label: 'Electricity' },
    { id: 'water', label: 'Water' },
    { id: 'internet', label: 'Internet/WiFi' },
    { id: 'gas', label: 'Gas' },
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'laundry', label: 'Laundry' },
  ];

  return (
    <div className="space-y-6">
      {/* General Pricing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">General Pricing Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Maintenance</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
              />
            </div>
          </div>
        </div>
        
        {/* Included Utilities */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Included Utilities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {utilityOptions.map(utility => (
              <div key={utility.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`utility-${utility.id}`}
                  checked={includedUtilities.includes(utility.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIncludedUtilities([...includedUtilities, utility.id]);
                    } else {
                      setIncludedUtilities(includedUtilities.filter(id => id !== utility.id));
                    }
                  }}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor={`utility-${utility.id}`} className="ml-2 text-sm text-gray-700">
                  {utility.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Terms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Terms & Conditions</label>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Enter any additional terms or conditions"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
          />
        </div>
      </div>
      
      {/* Room Pricing Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">Room Pricing Details</h2>
        <div className="space-y-10">
          {filteredShareTypes.map((shareType) => (
            <div key={shareType} className="mb-8 border-b border-gray-100 pb-8">
              <h3 className="text-lg font-semibold mb-4">{getShareDisplayName(shareType as keyof RoomSharePricing)}</h3>
              {shareType === 'multiShare' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Persons</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing.multiShare?.numberOfPersons}
                      onChange={(e) => setRoomSharePricing(prev => ({
                        ...prev,
                        multiShare: {
                          ...prev.multiShare,
                          numberOfPersons: e.target.value,
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
                      value={roomSharePricing[shareType as keyof RoomSharePricing]?.monthlyRent || ''}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'monthlyRent', e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Months Required</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing[shareType as keyof RoomSharePricing]?.advancePaymentMonths || '1'}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'advancePaymentMonths', e.target.value)}
                      placeholder="Enter months"
                      min="1"
                      max="12"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period (Months)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing[shareType as keyof RoomSharePricing]?.noticePeriod || '1'}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'noticePeriod', e.target.value)}
                      placeholder="Enter months"
                      min="0.5"
                      step="0.5"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lock-in Period (Months)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="number"
                      value={roomSharePricing[shareType as keyof RoomSharePricing]?.lockInPeriod || '6'}
                      onChange={(e) => handleRoomSharePricingChange(shareType as keyof RoomSharePricing, 'lockInPeriod', e.target.value)}
                      placeholder="Enter months"
                      min="1"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4">Pricing Summary</h3>
        <div className="space-y-3">
          {/* Room Sharing Options Summary */}
          <div className="pb-3 mb-3 border-b border-gray-200">
            <div className="text-gray-700 font-medium mb-2">Room Sharing Options:</div>
            {filteredShareTypes.length > 0 ? (
              filteredShareTypes.map(shareType => {
                const details = roomSharePricing[shareType as keyof RoomSharePricing];
                if (details?.monthlyRent) {
                  const formattedRent = parseInt(details.monthlyRent).toLocaleString();
                  const displayName = shareType === 'multiShare' 
                    ? `${(details as MultiShareDetails).numberOfPersons || '6+'} Person Share`
                    : getShareDisplayName(shareType as keyof RoomSharePricing).split(' ')[0];
                  return (
                    <div key={shareType} className="ml-4 mb-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{displayName}:</span>
                        <span className="font-medium">₹{formattedRent}/month</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-600 text-xs mt-1">
                        <div>Advance: {details.advancePaymentMonths || '1'} month(s)</div>
                        <div>Notice: {details.noticePeriod === '0.5' ? '15 Days' : `${details.noticePeriod || '1'} Month(s)`}</div>
                        <div>Lock-in: {details.lockInPeriod || '6'} month(s)</div>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <div className="text-gray-500 italic ml-4">No room sharing options selected</div>
            )}
          </div>
          
          {/* General Pricing Summary */}
          {(deposit || maintenance || includedUtilities.length > 0) && (
            <div className="pb-3 mb-3 border-b border-gray-200">
              <div className="text-gray-700 font-medium mb-2">General Pricing:</div>
              <div className="ml-4 space-y-2">
                {deposit && <div className="flex justify-between"><span>Security Deposit:</span><span>₹{parseInt(deposit).toLocaleString()}</span></div>}
                {maintenance && <div className="flex justify-between"><span>Monthly Maintenance:</span><span>₹{parseInt(maintenance).toLocaleString()}</span></div>}
                {includedUtilities.length > 0 && (
                  <div>
                    <div className="mb-1">Included Utilities:</div>
                    <div className="flex flex-wrap gap-2">
                      {includedUtilities.map(util => (
                        <span key={util} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {utilityOptions.find(option => option.id === util)?.label || util}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;