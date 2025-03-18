import React, { useState, useEffect } from "react";
import { DollarSign, Users, Coins, CheckCircle2, Crown } from "lucide-react";
import { Plan, TokenPackage } from "../types";

function Plans() {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "tokens">("subscriptions");
  const [subscriptionPlans, setSubscriptionPlans] = useState<Plan[]>([]);
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPlanId, setCurrentPlanId] = useState<string>("plan2"); // Example: Replace with actual current plan ID
  const [currentTokenPackageId, setCurrentTokenPackageId] = useState<string>("token1"); // Example: Replace with actual token package ID

  // Fetch Subscription Plans
  const fetchSubscriptionPlans = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/subscription");
      if (!response.ok) throw new Error("Failed to fetch subscription plans");
      const data = await response.json();
      setSubscriptionPlans(data);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Token Packages
  const fetchTokenPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/tokens");
      if (!response.ok) throw new Error("Failed to fetch token packages");
      const data = await response.json();
      setTokenPackages(data);
    } catch (error) {
      console.error("Error fetching token packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
    fetchTokenPackages();
  }, []);

  const handlePurchase = (type: string, id: string) => {
    console.log(`Purchasing ${type} with id: ${id}`);
    // Implement purchase logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect plan for your business needs</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-200 ${
              activeTab === "subscriptions"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab("tokens")}
            className={`px-6 py-3 text-lg font-medium rounded-full transition-all duration-200 ${
              activeTab === "tokens"
                ? "bg-gray-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Token Packages
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        )}

        {/* Subscription Plans */}
        {activeTab === "subscriptions" && !loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlanId;
              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105 relative ${
                    isCurrentPlan ? 'ring-2 ring-gray-800' : ''
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span className="text-sm font-medium">Current Plan</span>
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">
                          {plan.maxProperties === -1 ? "Unlimited" : plan.maxProperties} Properties
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Coins className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-600">
                          {plan.tokensPerLead} tokens per lead
                        </span>
                      </div>
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <button
                      onClick={() => handlePurchase('subscription', plan.id)}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                        isCurrentPlan
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                      disabled={isCurrentPlan}
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Subscribe Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Token Packages */}
        {activeTab === "tokens" && !loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tokenPackages.map((token) => {
              const isCurrentPackage = token._id === currentTokenPackageId;
              return (
                <div
                  key={token._id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105 relative ${
                    isCurrentPackage ? 'ring-2 ring-gray-800' : ''
                  }`}
                >
                  {isCurrentPackage && (
                    <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span className="text-sm font-medium">Current Package</span>
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{token.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${token.price}</span>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <Coins className="w-5 h-5 text-yellow-500 mr-3" />
                        <span className="text-lg font-medium">
                          {token.tokens} tokens
                        </span>
                      </div>
                      {token.bonusTokens > 0 && (
                        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          +{token.bonusTokens} Bonus Tokens!
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {token.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <button
                      onClick={() => handlePurchase('token', token._id)}
                      className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200"
                    >
                      Purchase Tokens
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;