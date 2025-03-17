import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TokenPackage } from '../Types';

interface TokenFormProps {
  editingToken?: TokenPackage;
  onSave: (data: TokenPackage) => Promise<void>;
  onClose: () => void;
}

const TokenForm: React.FC<TokenFormProps> = ({ editingToken, onSave, onClose }) => {
  const [tokenData, setTokenData] = useState<TokenPackage>({
    id: '',
    name: '',
    tokens: 0,
    price: 0,
    bonusTokens: 0,
    minPurchase: 0,
    tokensPerLead: 0,
    validityDays: 0,
    features: [''],
    description: '',
    status: '', // ✅ Default status value
  });

  // ✅ Load existing token data if editingToken is passed
  useEffect(() => {
    if (editingToken) {
      setTokenData(editingToken);
    }
  }, [editingToken]);

  // ✅ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTokenData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle feature changes
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...tokenData.features];
    updatedFeatures[index] = value;
    setTokenData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // ✅ Remove a feature
  const removeFeature = (index: number) => {
    const updatedFeatures = tokenData.features.filter((_, i) => i !== index);
    setTokenData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  // ✅ Add a new feature
  const addFeature = () => {
    setTokenData((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(tokenData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {editingToken ? 'Edit Token Package' : 'Create New Token Package'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Token Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                type="text"
                name="name"
                value={tokenData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="e.g., Premium Token Pack"
              />
            </div>

            {/* Number of Tokens & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Tokens</label>
                <input
                  type="number"
                  name="tokens"
                  value={tokenData.tokens}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={tokenData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Bonus Tokens & Minimum Purchase */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bonus Tokens</label>
                <input
                  type="number"
                  name="bonusTokens"
                  value={tokenData.bonusTokens}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Purchase</label>
                <input
                  type="number"
                  name="minPurchase"
                  value={tokenData.minPurchase}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={tokenData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Features</label>
              {tokenData.features.map((feature, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 text-sm text-gray-600 hover:text-gray-900"
              >
                + Add feature
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingToken ? 'Update Package' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenForm;
