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
    <div className="p-4 bg-black text-white">
      <div className="flex items-center space-x-2 mb-4">
        <IndianRupee className="w-6 h-6 text-green-500" />
        <h1 className="text-xl font-bold">Pricing & Terms</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pricing Form */}
        <div className="space-y-4">
          {/* Monthly Charges */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Monthly Charges</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Rent</label>
                <div className="relative">
                  <IndianRupee className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={pricing.monthlyRent}
                    onChange={(e) => handlePricingChange('monthlyRent', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Monthly Amenities Charge</label>
                <div className="relative">
                  <Wallet className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={pricing.amenitiesCharge}
                    onChange={(e) => handlePricingChange('amenitiesCharge', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Monthly</span>
                  <span className="text-base font-semibold text-green-500">
                    ₹{calculateMonthlyTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* One-time Charges */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">One-time Charges</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Security Deposit</label>
                <div className="relative">
                  <Shield className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={pricing.securityDeposit}
                    onChange={(e) => handlePricingChange('securityDeposit', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">One-time Maintenance Charge</label>
                <div className="relative">
                  <Receipt className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={pricing.maintenanceCharge}
                    onChange={(e) => handlePricingChange('maintenanceCharge', e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Lock className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold">Contract Terms</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Notice Period</label>
                <div className="relative">
                  <Clock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={periods.noticePeriod}
                    onChange={(e) => setPeriods(prev => ({ ...prev, noticePeriod: e.target.value }))}
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                  >
                    <option value="0.5">15 Days</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Lock-in Period</label>
                <div className="relative">
                  <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={periods.lockInPeriod}
                    onChange={(e) => setPeriods(prev => ({ ...prev, lockInPeriod: e.target.value }))}
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
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

        {/* Advance Payment Terms */}
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold">Advance Payment Terms</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Advance Months Required</label>
                <select
                  value={advancePayment.months}
                  onChange={(e) => setAdvancePayment({ ...advancePayment, months: e.target.value })}
                  className="w-full px-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                >
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Advance Payment Percentage</label>
                <div className="relative">
                  <Percent className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={advancePayment.percentage}
                    onChange={(e) => setAdvancePayment({ ...advancePayment, percentage: e.target.value })}
                    min="0"
                    max="100"
                    className="w-full pl-8 pr-2 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;