import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import RevenueStats from './revenue/RevenueStats';
import SubscriptionPlans from './revenue/SubscriptionPlans';
import TokenPackages from './revenue/TokenPackages';
import PlanForm from './revenue/PlanForm';
import TokenForm from './revenue/TokenForm';

const Revenue = () => {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showTokenForm, setShowTokenForm] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: 0,
    billingCycle: 'monthly',
    maxProperties: 0,
    maxLeads: 0,
    tokensPerLead: 0,
    features: [''],
    description: '',
    trialDays: 0
  });

  const [newToken, setNewToken] = useState({
    name: '',
    tokens: 0,
    price: 0,
    bonusTokens: 0,
    minPurchase: 0,
    tokensPerLead: 0,
    validityDays: 0,
    features: [''],
    description: ''
  });

  const revenueStats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$125,450',
      change: '+15.2%',
      period: 'vs last month'
    },
    {
      id: 2,
      title: 'Active Subscriptions',
      value: '284',
      change: '+12.5%',
      period: 'vs last month'
    },
    {
      id: 3,
      title: 'Tokens Sold',
      value: '15,240',
      change: '+18.7%',
      period: 'vs last month'
    },
    {
      id: 4,
      title: 'Average Revenue/User',
      value: '$89.50',
      change: '+8.4%',
      period: 'vs last month'
    }
  ];

  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: '1',
      name: 'Basic Agent',
      price: 49,
      billingCycle: 'monthly',
      maxProperties: 5,
      maxLeads: 50,
      tokensPerLead: 2,
      trialDays: 14,
      features: [
        'List up to 5 properties',
        'Basic analytics dashboard',
        'Email support',
        'Standard listing visibility',
        '100 contact credits'
      ],
      status: 'active'
    },
    {
      id: '2',
      name: 'Professional Agent',
      price: 99,
      billingCycle: 'monthly',
      maxProperties: 20,
      maxLeads: 200,
      tokensPerLead: 1,
      trialDays: 14,
      features: [
        'List up to 20 properties',
        'Advanced analytics & reports',
        'Priority support',
        'Featured listings',
        '500 contact credits',
        'Custom branding'
      ],
      status: 'active'
    },
    {
      id: '3',
      name: 'Agency Elite',
      price: 199,
      billingCycle: 'monthly',
      maxProperties: -1,
      maxLeads: -1,
      tokensPerLead: 1,
      trialDays: 30,
      features: [
        'Unlimited properties',
        'Premium analytics suite',
        '24/7 dedicated support',
        'Premium listing placement',
        'Unlimited contact credits',
        'White-label solution',
        'API access'
      ],
      status: 'active'
    }
  ]);

  const [tokenPackages, setTokenPackages] = useState([
    {
      id: '1',
      name: 'Starter Pack',
      tokens: 100,
      price: 25,
      bonusTokens: 0,
      minPurchase: 1,
      tokensPerLead: 2,
      validityDays: 365,
      features: [
        'Contact property owners',
        'View detailed analytics',
        'Access premium listings',
        'No expiration'
      ],
      status: 'active'
    },
    {
      id: '2',
      name: 'Popular Pack',
      tokens: 500,
      price: 99,
      bonusTokens: 50,
      minPurchase: 1,
      tokensPerLead: 2,
      validityDays: 365,
      features: [
        'All Starter Pack features',
        'Priority support',
        'Bulk property access',
        '10% bonus tokens',
        'No expiration'
      ],
      status: 'active'
    },
    {
      id: '3',
      name: 'Premium Pack',
      tokens: 1000,
      price: 189,
      bonusTokens: 150,
      minPurchase: 1,
      tokensPerLead: 1,
      validityDays: 365,
      features: [
        'All Popular Pack features',
        'VIP support',
        'Advanced analytics',
        '15% bonus tokens',
        'Exclusive property previews',
        'No expiration'
      ],
      status: 'active'
    }
  ]);

  const handleAddPlan = () => {
    setShowPlanForm(true);
  };

  const handleAddToken = () => {
    setShowTokenForm(true);
  };

  const handleSubmitPlan = () => {
    const plan = {
      id: Date.now().toString(),
      ...newPlan,
      status: 'active'
    };
    setSubscriptionPlans([...subscriptionPlans, plan]);
    setShowPlanForm(false);
    setNewPlan({
      name: '',
      price: 0,
      billingCycle: 'monthly',
      maxProperties: 0,
      maxLeads: 0,
      tokensPerLead: 0,
      features: [''],
      description: '',
      trialDays: 0
    });
  };

  const handleSubmitToken = () => {
    const token = {
      id: Date.now().toString(),
      ...newToken,
      status: 'active'
    };
    setTokenPackages([...tokenPackages, token]);
    setShowTokenForm(false);
    setNewToken({
      name: '',
      tokens: 0,
      price: 0,
      bonusTokens: 0,
      minPurchase: 0,
      tokensPerLead: 0,
      validityDays: 0,
      features: [''],
      description: ''
    });
  };

  const handleDeletePlan = (planId: string) => {
    setSubscriptionPlans(plans => plans.filter(plan => plan.id !== planId));
  };

  const handleDeleteToken = (tokenId: string) => {
    setTokenPackages(tokens => tokens.filter(token => token.id !== tokenId));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
        <button 
          onClick={activeTab === 'subscriptions' ? handleAddPlan : handleAddToken}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New {activeTab === 'subscriptions' ? 'Plan' : 'Token Package'}
        </button>
      </div>

      <RevenueStats stats={revenueStats} />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscriptions'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('tokens')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tokens'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Token Packages
          </button>
        </nav>
      </div>

      {activeTab === 'subscriptions' ? (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Subscription Plans Management</h3>
            <p className="text-sm text-gray-500 mt-1">Configure and manage your subscription plans</p>
          </div>
          <div className="p-6">
            <SubscriptionPlans
              plans={subscriptionPlans}
              onEdit={setEditingPlan}
              onDelete={handleDeletePlan}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Token Packages Management</h3>
            <p className="text-sm text-gray-500 mt-1">Configure and manage your token packages</p>
          </div>
          <div className="p-6">
            <TokenPackages
              packages={tokenPackages}
              onEdit={setEditingToken}
              onDelete={handleDeleteToken}
            />
          </div>
        </div>
      )}

      {showPlanForm && (
        <PlanForm
          data={newPlan}
          onChange={setNewPlan}
          onSubmit={handleSubmitPlan}
          onCancel={() => setShowPlanForm(false)}
        />
      )}
      
      {showTokenForm && (
        <TokenForm
          data={newToken}
          onChange={setNewToken}
          onSubmit={handleSubmitToken}
          onCancel={() => setShowTokenForm(false)}
        />
      )}
    </div>
  );
};

export default Revenue;