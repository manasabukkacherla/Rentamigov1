import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface RentDetailsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const RentDetails: React.FC<RentDetailsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Rent Details</h2>

      {/* Rent Amount */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Rent Amount (₹) *
        </label>
        <input
          type="number"
          {...register('rentAmount')}
          ref={firstFieldRef}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter rent amount"
        />
        {errors.rentAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.rentAmount.message as string}</p>
        )}
      </div>

      {/* Security Deposit */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Security Deposit (₹) *
        </label>
        <input
          type="number"
          {...register('securityDeposit')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter security deposit amount"
        />
        {errors.securityDeposit && (
          <p className="mt-1 text-sm text-red-600">{errors.securityDeposit.message as string}</p>
        )}
      </div>

      {/* Maintenance Charges */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Maintenance Charges (₹)
        </label>
        <input
          type="number"
          {...register('maintenanceCharges')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter maintenance charges"
        />
        {errors.maintenanceCharges && (
          <p className="mt-1 text-sm text-red-600">{errors.maintenanceCharges.message as string}</p>
        )}
      </div>

      {/* Food Charges */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Food Charges (₹)
        </label>
        <input
          type="number"
          {...register('foodCharges')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter food charges"
        />
        {errors.foodCharges && (
          <p className="mt-1 text-sm text-red-600">{errors.foodCharges.message as string}</p>
        )}
      </div>

      {/* Other Charges */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Other Charges (₹)
        </label>
        <input
          type="number"
          {...register('otherCharges')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
          placeholder="Enter other charges"
        />
        {errors.otherCharges && (
          <p className="mt-1 text-sm text-red-600">{errors.otherCharges.message as string}</p>
        )}
      </div>

      {/* Payment Terms */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Payment Terms *
        </label>
        <select
          {...register('paymentTerms')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select payment terms</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Yearly">Yearly</option>
        </select>
        {errors.paymentTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.paymentTerms.message as string}</p>
        )}
      </div>

      {/* Advance Payment Required */}
      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Advance Payment Required *
        </label>
        <select
          {...register('advancePayment')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-black"
        >
          <option value="">Select advance payment</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="6 Months">6 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
        {errors.advancePayment && (
          <p className="mt-1 text-sm text-red-600">{errors.advancePayment.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default RentDetails; 