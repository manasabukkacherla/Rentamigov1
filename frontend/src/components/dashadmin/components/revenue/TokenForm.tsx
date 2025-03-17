import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { showToast } from '../../components/Toast';
import { Toaster } from 'react-hot-toast';

interface TokenFormData {
  _id?: string; // Optional since it exists only when editing
  name: string;
  tokens: number;
  price: number;
  bonusTokens: number;
  minPurchase: number;
  tokensPerLead: number;
  validityDays: number;
  features: string[];
  description: string;
  status?: string; // Optional status field
}

interface TokenFormProps {
  onClose: () => void;
  onSave: (data: TokenFormData, isEdit: boolean, id?: string) => void;
  initialData?: TokenFormData;
  tokenId?: string;
}

const TokenForm: React.FC<TokenFormProps> = ({ onClose, onSave, initialData, tokenId }) => {
  const [formData, setFormData] = useState<TokenFormData>(
    initialData || {
      name: '',
      tokens: 0,
      price: 0,
      bonusTokens: 0,
      minPurchase: 0,
      tokensPerLead: 0,
      validityDays: 0,
      features: [''],
      description: '',
    }
  );

  // Fetch token details when editing
  useEffect(() => {
    if (tokenId) {
      fetch(`http://localhost:8000/api/tokens/${tokenId}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch(() => showToast.error('Error fetching token details'));
    }
  }, [tokenId]);

  const handleChange = (updatedData: Partial<TokenFormData>) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    handleChange({ features: updatedFeatures });
  };

  const handleAddFeature = () => {
    handleChange({ features: [...formData.features, ''] });
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    handleChange({ features: updatedFeatures });
  };

  const handleSubmit = async () => {
    try {
      const isEdit = !!(formData._id || tokenId);
      const url = isEdit 
        ? `http://localhost:8000/api/tokens/${formData._id || tokenId}` 
        : 'http://localhost:8000/api/tokens';
  
      const method = isEdit ? 'PUT' : 'POST';
  
      console.log("Submitting:", { url, method, formData }); // Debugging log
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json(); // Parse the response JSON
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save token package');
      }
  
      showToast.success(`Token package ${isEdit ? 'updated' : 'created'} successfully!`);
      onSave(formData, isEdit, tokenId);
      onClose();
    } catch (error) {
      const errMessage = (error as Error).message || `Error ${tokenId ? 'updating' : 'creating'} token package.`;
      showToast.error(errMessage);
    }
  };
  
  return (
    <>
      <Toaster />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">
            {tokenId ? 'Edit' : 'Create'} Token Package
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Package Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange({ name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="e.g., Premium Token Pack"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Tokens</label>
                <input
                  type="number"
                  value={formData.tokens}
                  onChange={(e) => handleChange({ tokens: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange({ price: Number(e.target.value) })}
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
                  value={formData.bonusTokens}
                  onChange={(e) => handleChange({ bonusTokens: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Purchase</label>
                <input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => handleChange({ minPurchase: Number(e.target.value) })}
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
                  value={formData.tokensPerLead}
                  onChange={(e) => handleChange({ tokensPerLead: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Validity (days)</label>
                <input
                  type="number"
                  value={formData.validityDays}
                  onChange={(e) => handleChange({ validityDays: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="365"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange({ description: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                rows={3}
                placeholder="Describe the token package benefits..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex mt-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Add a feature"
                  />
                  <button onClick={() => handleRemoveFeature(index)} className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button onClick={handleAddFeature} className="mt-2 text-sm text-gray-600 hover:text-gray-900">
                + Add feature
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">{tokenId ? 'Save Changes' : 'Create Package'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenForm;
