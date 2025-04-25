import React, { useState } from 'react';
import { IndianRupee, Calendar, Shield, Receipt, Wallet, Building2, Percent, Clock, Lock } from 'lucide-react';

interface PricingDetails {
  monthlyRent: string;
  securityDeposit: string;
  maintenanceCharge: string;
  amenitiesCharge: string;
}

const Pricing = () => {
  const [pricing, setPricing] = useState<PricingDetails>({
    monthlyRent: '',
    securityDeposit: '',
    maintenanceCharge: '',
    amenitiesCharge: '',
  });

  const [advancePayment, setAdvancePayment] = useState({
    months: '1',
    percentage: '100',
  });

  const [periods, setPeriods] = useState({
    noticePeriod: '1',
    lockInPeriod: '6',
  });

  const handlePricingChange = (field: keyof PricingDetails, value: string) => {
    setPricing(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateMonthlyTotal = () => {
    const rent = parseFloat(pricing.monthlyRent) || 0;
    const amenities = parseFloat(pricing.amenitiesCharge) || 0;
    return rent + amenities;
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="number"
                  value={pricing.monthlyRent}
                  onChange={(e) => handlePricingChange('monthlyRent', e.target.value)}
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
                  value={pricing.amenitiesCharge}
                  onChange={(e) => handlePricingChange('amenitiesCharge', e.target.value)}
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
                ₹{calculateMonthlyTotal().toLocaleString()}
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
                value={pricing.securityDeposit}
                onChange={(e) => handlePricingChange('securityDeposit', e.target.value)}
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
                value={pricing.maintenanceCharge}
                onChange={(e) => handlePricingChange('maintenanceCharge', e.target.value)}
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
              value={advancePayment.months}
              onChange={(e) => setAdvancePayment({ ...advancePayment, months: e.target.value })}
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
                value={advancePayment.percentage}
                onChange={(e) => setAdvancePayment({ ...advancePayment, percentage: e.target.value })}
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
                value={periods.noticePeriod}
                onChange={(e) => setPeriods(prev => ({ ...prev, noticePeriod: e.target.value }))}
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
                value={periods.lockInPeriod}
                onChange={(e) => setPeriods(prev => ({ ...prev, lockInPeriod: e.target.value }))}
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

      {/* Summary */}
      <div className="bg-black text-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Pricing Summary</h3>
        
        <div className="space-y-3">
          {pricing.monthlyRent && (
            <div className="flex justify-between">
              <span>Monthly Rent:</span>
              <span>₹{parseInt(pricing.monthlyRent).toLocaleString()}</span>
            </div>
          )}
          
          {pricing.amenitiesCharge && (
            <div className="flex justify-between">
              <span>Monthly Amenities:</span>
              <span>₹{parseInt(pricing.amenitiesCharge).toLocaleString()}</span>
            </div>
          )}
          
          {(pricing.monthlyRent || pricing.amenitiesCharge) && (
            <div className="flex justify-between pt-2 border-t border-white/20">
              <span className="font-medium">Total Monthly:</span>
              <span className="font-medium">₹{calculateMonthlyTotal().toLocaleString()}</span>
            </div>
          )}
          
          {pricing.securityDeposit && (
            <div className="flex justify-between pt-3 mt-2 border-t border-white/20">
              <span>Security Deposit:</span>
              <span>₹{parseInt(pricing.securityDeposit).toLocaleString()}</span>
            </div>
          )}
          
          {advancePayment.months !== '1' && (
            <div className="flex justify-between">
              <span>Advance Payment:</span>
              <span>{advancePayment.months} months ({advancePayment.percentage}%)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;