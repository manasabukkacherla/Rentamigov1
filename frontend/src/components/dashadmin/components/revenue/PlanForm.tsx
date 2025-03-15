import React from 'react';
import { Trash2 } from 'lucide-react';

interface PlanFormData {
  name: string;
  price: number;
  billingCycle: string;
  maxProperties: number;
  maxLeads: number;
  tokensPerLead: number;
  features: string[];
  description: string;
  trialDays: number;
}

interface PlanFormProps {
  data: PlanFormData;
  onChange: (data: PlanFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ data, onChange, onSubmit, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Create New Subscription Plan</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Plan Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({...data, name: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="e.g., Professional Plan"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={data.price}
                onChange={(e) => onChange({...data, price: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Billing Cycle</label>
              <select
                value={data.billingCycle}
                onChange={(e) => onChange({...data, billingCycle: e.target.value})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Properties</label>
              <input
                type="number"
                value={data.maxProperties}
                onChange={(e) => onChange({...data, maxProperties: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Leads</label>
              <input
                type="number"
                value={data.maxLeads}
                onChange={(e) => onChange({...data, maxLeads: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="100"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tokens per Lead</label>
              <input
                type="number"
                value={data.tokensPerLead}
                onChange={(e) => onChange({...data, tokensPerLead: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Trial Days</label>
              <input
                type="number"
                value={data.trialDays}
                onChange={(e) => onChange({...data, trialDays: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="14"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => onChange({...data, description: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              rows={3}
              placeholder="Describe the plan's benefits..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features</label>
            {data.features.map((feature, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = e.target.value;
                    onChange({...data, features: newFeatures});
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Add a feature"
                />
                <button
                  onClick={() => {
                    const newFeatures = data.features.filter((_, i) => i !== index);
                    onChange({...data, features: newFeatures});
                  }}
                  className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onChange({...data, features: [...data.features, '']})}
              className="mt-2 text-sm text-gray-600 hover:text-gray-900"
            >
              + Add feature
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanForm;