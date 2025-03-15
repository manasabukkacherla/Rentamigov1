import React from 'react';
import { Trash2 } from 'lucide-react';

interface TokenFormData {
  name: string;
  tokens: number;
  price: number;
  bonusTokens: number;
  minPurchase: number;
  tokensPerLead: number;
  validityDays: number;
  features: string[];
  description: string;
}

interface TokenFormProps {
  data: TokenFormData;
  onChange: (data: TokenFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const TokenForm: React.FC<TokenFormProps> = ({ data, onChange, onSubmit, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Create New Token Package</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({...data, name: e.target.value})}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="e.g., Premium Token Pack"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Tokens</label>
              <input
                type="number"
                value={data.tokens}
                onChange={(e) => onChange({...data, tokens: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                value={data.price}
                onChange={(e) => onChange({...data, price: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="99"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bonus Tokens</label>
              <input
                type="number"
                value={data.bonusTokens}
                onChange={(e) => onChange({...data, bonusTokens: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Purchase</label>
              <input
                type="number"
                value={data.minPurchase}
                onChange={(e) => onChange({...data, minPurchase: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="1"
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
              <label className="block text-sm font-medium text-gray-700">Validity (days)</label>
              <input
                type="number"
                value={data.validityDays}
                onChange={(e) => onChange({...data, validityDays: Number(e.target.value)})}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="365"
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
              placeholder="Describe the token package benefits..."
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
            Create Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenForm;