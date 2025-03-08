import React from 'react';
import { Coins, Edit, Trash2 } from 'lucide-react';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  bonusTokens: number;
  minPurchase: number;
  tokensPerLead: number;
  validityDays: number;
  features: string[];
  status: string;
}

interface TokenPackagesProps {
  packages: TokenPackage[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TokenPackages: React.FC<TokenPackagesProps> = ({ packages, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {packages.map((token) => (
        <div key={token.id} className="bg-gray-50 rounded-lg p-6">
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
                  onClick={() => onEdit(token.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 border rounded-lg"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(token.id)}
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
              <span className={`px-3 py-1 rounded-full text-sm ${
                token.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {token.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenPackages;