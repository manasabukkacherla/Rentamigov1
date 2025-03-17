import React, { useState } from 'react';
import { CheckCircle, X, CreditCard, Crown, Coins } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface Plan {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface TokenPack {
  tokens: number;
  price: number;
  savings?: string;
  recommended?: boolean;
}

const subscriptionPlans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      '5 Properties',
      '10 Leads/month',
      'Basic Analytics',
      'Email Support'
    ]
  },
  {
    name: 'Basic',
    price: 999,
    features: [
      '20 Properties',
      '50 Leads/month',
      'Advanced Analytics',
      'Email Support',
      'Priority Listing'
    ],
    recommended: true
  },
  {
    name: 'Premium',
    price: 2499,
    features: [
      'Unlimited Properties',
      'Unlimited Leads',
      'Premium Analytics',
      '24/7 Support',
      'Featured Listings',
      'Custom Branding'
    ]
  },
  {
    name: 'Enterprise',
    price: 4999,
    features: [
      'Custom Solutions',
      'Dedicated Account Manager',
      'API Access',
      'Custom Branding',
      'White Label Solution',
      'Custom Analytics'
    ]
  }
];

const tokenPacks: TokenPack[] = [
  {
    tokens: 100,
    price: 499
  },
  {
    tokens: 500,
    price: 1999,
    savings: '20% savings',
    recommended: true
  },
  {
    tokens: 1000,
    price: 3499,
    savings: '30% savings'
  },
  {
    tokens: 2000,
    price: 5999,
    savings: '40% savings'
  }
];

export function Plans() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTokenPack, setSelectedTokenPack] = useState<TokenPack | null>(null);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'tokens'>(
    searchParams.get('tab') === 'tokens' ? 'tokens' : 'subscriptions'
  );

  const currentPlan = searchParams.get('currentPlan') || 'free';
  const currentTokens = parseInt(searchParams.get('tokens') || '0', 10);

  const handleTabChange = (tab: 'subscriptions' | 'tokens') => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    navigate(`/plans?${params.toString()}`);
  };

  const handlePurchase = () => {
    alert('Payment processing would be implemented here');
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setSelectedTokenPack(null);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Plans & Pricing</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b border-black/10 mb-6">
        <button
          onClick={() => handleTabChange('subscriptions')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative
            ${activeTab === 'subscriptions' 
              ? 'text-black' 
              : 'text-black/60 hover:text-black'
            }
          `}
        >
          Subscription Plans
          {activeTab === 'subscriptions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('tokens')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative
            ${activeTab === 'tokens' 
              ? 'text-black' 
              : 'text-black/60 hover:text-black'
            }
          `}
        >
          Token Packs
          {activeTab === 'tokens' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
      </div>

      {/* Current Tokens Display */}
      {activeTab === 'tokens' && (
        <div className="mb-6 bg-white rounded-xl p-4 sm:p-6 border-2 border-black/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-lg">
                <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-black/60">Current Balance</h3>
                <p className="text-2xl font-bold text-black">{currentTokens} Tokens</p>
              </div>
            </div>
            <div className="text-sm text-black/60">
              Use tokens to boost your listings and reach more potential clients
            </div>
          </div>
        </div>
      )}

      {/* Subscription Plans */}
      {activeTab === 'subscriptions' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subscriptionPlans.map((plan) => {
            const isCurrentPlan = plan.name.toLowerCase() === currentPlan;
            
            return (
              <div
                key={plan.name}
                className={`
                  relative bg-white rounded-xl p-4 sm:p-6 border-2 transition-all
                  ${plan.recommended 
                    ? 'border-black shadow-lg scale-105' 
                    : isCurrentPlan
                    ? 'border-green-500 shadow-lg'
                    : 'border-black/10 hover:border-black/20 hover:shadow-md'
                  }
                `}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Current Plan
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-black">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-black">₹{plan.price}</span>
                    <span className="text-black/60">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className={`w-4 h-4 mr-2 shrink-0 ${isCurrentPlan ? 'text-green-500' : 'text-black'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPaymentModal(true);
                  }}
                  disabled={isCurrentPlan}
                  className={`
                    w-full py-2 rounded-lg text-sm transition-colors
                    ${isCurrentPlan
                      ? 'bg-green-500 text-white cursor-not-allowed opacity-50'
                      : plan.recommended
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-black/5 text-black hover:bg-black/10'
                    }
                  `}
                >
                  {isCurrentPlan ? 'Current Plan' : plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Token Packs */}
      {activeTab === 'tokens' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tokenPacks.map((pack) => {
            const totalTokens = currentTokens + pack.tokens;
            
            return (
              <div
                key={pack.tokens}
                className={`
                  relative bg-white rounded-xl p-4 sm:p-6 border-2 transition-all
                  ${pack.recommended 
                    ? 'border-black shadow-lg scale-105' 
                    : 'border-black/10 hover:border-black/20 hover:shadow-md'
                  }
                `}
              >
                {pack.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full">
                    Best Value
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-black">+{pack.tokens} Tokens</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-black">₹{pack.price}</span>
                  </div>
                  {pack.savings && (
                    <div className="mt-1 text-sm text-green-600">{pack.savings}</div>
                  )}
                  <div className="mt-3 text-sm text-black/60">
                    Total after purchase: <span className="font-medium text-black">{totalTokens} Tokens</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTokenPack(pack);
                    setShowPaymentModal(true);
                  }}
                  className={`
                    w-full py-2 rounded-lg text-sm transition-colors
                    ${pack.recommended
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-black/5 text-black hover:bg-black/10'
                    }
                  `}
                >
                  Purchase Now
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (selectedPlan || selectedTokenPack) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black">
                {selectedPlan ? 'Upgrade to ' + selectedPlan.name : `Purchase ${selectedTokenPack?.tokens} Tokens`}
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-black/5 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-black/60">Amount</span>
                  <span className="text-lg font-semibold text-black">
                    ₹{selectedPlan?.price || selectedTokenPack?.price}
                  </span>
                </div>
                {selectedTokenPack?.savings && (
                  <div className="mt-1 text-sm text-green-600 text-right">
                    {selectedTokenPack.savings}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/60">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <CreditCard className="w-5 h-5 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/60">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/60">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors mt-6"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}