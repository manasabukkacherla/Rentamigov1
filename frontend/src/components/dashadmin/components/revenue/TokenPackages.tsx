import React, { useEffect, useState } from 'react';
import { Coins, Edit, Trash2 } from 'lucide-react';
import { showToast } from '../../components/Toast';
import { Toaster } from 'react-hot-toast';
import TokenForm from './TokenForm'; // Import the TokenForm component

interface TokenPackage {
  _id: string;
  name: string;
  tokens: number;
  price: number;
  bonusTokens: number;
  minPurchase: number;
  tokensPerLead: number;
  validityDays: number;
  features: string[];
  description: string;
  status: 'active' | 'inactive'; // Better typing for status
}

const TokenPackages: React.FC = () => {
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingPackage, setEditingPackage] = useState<TokenPackage | null>(null);

  // ✅ Fetch all token packages
  const fetchTokenPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/tokens');
      if (!response.ok) throw new Error(`Failed to fetch token packages. Status: ${response.status}`);

      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching token packages:', error);
      showToast.error('Error fetching token packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenPackages();
  }, []);

  // ✅ Open Edit Modal with Token Data
  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tokens/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch package details. Status: ${response.status}`);

      const packageData = await response.json();
      setEditingPackage(packageData);
    } catch (error) {
      console.error('Error fetching package:', error);
      showToast.error('Error fetching package details');
    }
  };

  // ✅ Handle Delete Token Package
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/tokens/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Failed to delete package. Status: ${response.status}`);

      showToast.success('Token package deleted successfully');
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id)); // ✅ Remove deleted item locally
    } catch (error) {
      console.error('Error deleting package:', error);
      showToast.error('Error deleting package');
    }
  };

  // ✅ Handle Save (PUT API Call)
  const handleSave = async (updatedPackage: TokenPackage) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tokens/${updatedPackage._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPackage),
      });

      if (!response.ok) throw new Error(`Failed to update package. Status: ${response.status}`);

      showToast.success('Token package updated successfully');
      setEditingPackage(null); // ✅ Close modal

      // ✅ Update state directly instead of refetching
      setPackages((prev) =>
        prev.map((pkg) => (pkg._id === updatedPackage._id ? updatedPackage : pkg))
      );
    } catch (error) {
      console.error('Error updating package:', error);
      showToast.error('Error updating package');
    }
  };

  return (
    <>
      <Toaster />
      <div className="space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading token packages...</p>
        ) : (
          packages.map((token) => (
            <div key={token._id} className="bg-white shadow-sm rounded-lg p-6 border">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{token.name}</h4>
                    <div className="mt-1 space-x-4">
                      <span className="text-2xl font-bold text-gray-900">${token.price}</span>
                      <span className="text-lg text-gray-600">
                        {token.tokens} tokens {token.bonusTokens > 0 && `+ ${token.bonusTokens} bonus`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {token.tokensPerLead} tokens per lead
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(token._id)}
                      className="p-2 text-gray-600 hover:text-blue-600 border rounded-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(token._id)}
                      className="p-2 text-gray-600 hover:text-red-600 border rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {token.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Coins className="w-5 h-5 text-yellow-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      token.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {token.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Edit Token Form Modal */}
      {editingPackage && (
        <TokenForm
          onClose={() => setEditingPackage(null)}
          initialData={editingPackage}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default TokenPackages;
