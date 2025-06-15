import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Plans: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'token'>('subscription');

  const tokenPackages = [
    {
      name: "Test 1",
      price: "$124",
      tokens: "1235",
      bonusTokens: "12",
      features: ["aadasdewfeac"]
    },
    {
      name: "mnvhj",
      price: "$6576",
      tokens: "4",
      bonusTokens: "5",
      features: ["jhkj"]
    },
    {
      name: "vbn",
      price: "$3",
      tokens: "3",
      bonusTokens: "3",
      features: ["cxv"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="mt-2 text-lg text-gray-600">Select the perfect plan for your business needs</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('subscription')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'subscription'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Subscription Plans
        </button>
        <button
          onClick={() => setActiveTab('token')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'token'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Token Packages
        </button>
      </div>

      {activeTab === 'token' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tokenPackages.map((package_, index) => (
            <div key={index} className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900">{package_.name}</h3>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">{package_.price}</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-700">
                  <span>{package_.tokens} tokens</span>
                </div>
                <div className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  +{package_.bonusTokens} Bonus Tokens!
                </div>
                {package_.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-indigo-600 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full py-3 px-6 rounded-lg font-medium bg-gray-100 text-gray-900 hover:bg-gray-200">
                Purchase Tokens
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Plan 1",
              description: "Description",
              price: "$135",
              properties: "100",
              tokens: "5",
              features: ["Feature one"]
            },
            {
              name: "3",
              description: "adasd",
              price: "$46",
              properties: "1",
              tokens: "1",
              features: []
            },
            {
              name: "Plan 1",
              description: "Description",
              price: "$135",
              properties: "100",
              tokens: "5",
              features: ["Feature one"]
            }
          ].map((plan, index) => (
            <div key={index} className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-gray-500 mt-2">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>{plan.properties} Properties</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>{plan.tokens} tokens per lead</span>
                </div>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-indigo-600 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full py-3 px-6 rounded-lg font-medium bg-gray-100 text-gray-900 hover:bg-gray-200">
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plans;