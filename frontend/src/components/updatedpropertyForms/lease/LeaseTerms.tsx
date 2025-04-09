import { useState } from 'react';
import { ArrowRight, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface LeaseTermsProps {
  onLeaseTermsChange?: (terms: Record<string, any>) => void;
}

const LeaseTerms = ({ onLeaseTermsChange }: LeaseTermsProps) => {
  const [terms, setTerms] = useState({
    securityDeposit: '',
    maintenanceCharges: '',
    parkingCharges: '',
    waterCharges: '',
    electricityCharges: '',
    otherCharges: '',
    furnishingStatus: 'unfurnished',
    petPolicy: 'not-allowed',
    smokingPolicy: 'not-allowed',
    parkingAvailable: 'yes',
    parkingType: 'open',
    parkingCount: '1'
  });

  const handleChange = (field: string, value: any) => {
    const updatedTerms = { ...terms, [field]: value };
    setTerms(updatedTerms);
    onLeaseTermsChange?.(updatedTerms);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-bold text-gray-800">Lease Terms</h3>
        <ArrowRight className="text-blue-500" size={20} />
        <span className="text-sm text-gray-600">Enter Lease Terms</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
        {/* Charges Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FileText size={20} className="text-blue-500" />
            Charges & Deposits
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Security Deposit */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Security Deposit</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={terms.securityDeposit}
                  onChange={(e) => handleChange('securityDeposit', e.target.value)}
                  placeholder="Enter security deposit"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
                />
              </div>
            </div>

            {/* Maintenance Charges */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Maintenance Charges</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={terms.maintenanceCharges}
                  onChange={(e) => handleChange('maintenanceCharges', e.target.value)}
                  placeholder="Enter maintenance charges"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
                />
              </div>
            </div>

            {/* Parking Charges */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Parking Charges</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={terms.parkingCharges}
                  onChange={(e) => handleChange('parkingCharges', e.target.value)}
                  placeholder="Enter parking charges"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
                />
              </div>
            </div>

            {/* Other Charges */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Other Charges</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <span className="text-gray-400">₹</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={terms.otherCharges}
                  onChange={(e) => handleChange('otherCharges', e.target.value)}
                  placeholder="Enter other charges"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-blue-500" />
            Policies
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Furnishing Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Furnishing Status</label>
              <select
                value={terms.furnishingStatus}
                onChange={(e) => handleChange('furnishingStatus', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
              >
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-furnished</option>
                <option value="fully-furnished">Fully-furnished</option>
              </select>
            </div>

            {/* Pet Policy */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Pet Policy</label>
              <select
                value={terms.petPolicy}
                onChange={(e) => handleChange('petPolicy', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            {/* Smoking Policy */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Smoking Policy</label>
              <select
                value={terms.smokingPolicy}
                onChange={(e) => handleChange('smokingPolicy', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>

            {/* Parking Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Parking Available</label>
              <select
                value={terms.parkingAvailable}
                onChange={(e) => handleChange('parkingAvailable', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {terms.parkingAvailable === 'yes' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Parking Type</label>
                  <select
                    value={terms.parkingType}
                    onChange={(e) => handleChange('parkingType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 hover:border-blue-300"
                  >
                    <option value="open">Open</option>
                    <option value="covered">Covered</option>
                    <option value="basement">Basement</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Number of Parking Spots</label>
                  <input
                    type="number"
                    min="1"
                    value={terms.parkingCount}
                    onChange={(e) => handleChange('parkingCount', e.target.value)}
                    placeholder="Enter number of parking spots"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder:text-gray-400 hover:border-blue-300"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseTerms; 