import React, { useState } from "react";
import { Plus } from "lucide-react";
import RevenueStats from "./revenue/RevenueStats";
import SubscriptionPlans from "./revenue/SubscriptionPlans";
import TokenPackages from "./revenue/TokenPackages";
import PlanForm from "./revenue/PlanForm";
import TokenForm from "./revenue/TokenForm";
import { showToast } from "./Toast";
import { Plan } from "./Types";

const Revenue = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>(undefined);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [showTokenForm, setShowTokenForm] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: 0,
    billingCycle: "monthly",
    maxProperties: 0,
    maxLeads: 0,
    tokensPerLead: 0,
    features: [""],
    description: "",
    trialDays: 0,
  });

  const revenueStats = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$125,450",
      change: "+15.2%",
      period: "vs last month",
    },
    {
      id: 2,
      title: "Active Subscriptions",
      value: "284",
      change: "+12.5%",
      period: "vs last month",
    },
    {
      id: 3,
      title: "Tokens Sold",
      value: "15,240",
      change: "+18.7%",
      period: "vs last month",
    },
    {
      id: 4,
      title: "Average Revenue/User",
      value: "$89.50",
      change: "+8.4%",
      period: "vs last month",
    },
  ];

  const handleAddPlan = () => {
    setShowPlanForm(true);
    showToast.info("Opening form to create a new subscription plan...");
  };

  const handleAddToken = () => {
    setShowTokenForm(true);
    showToast.info("Opening form to create a new token package...");
  };

  const handleSubmitPlan = () => {
    if (!newPlan.name || !newPlan.price || !newPlan.maxProperties || !newPlan.maxLeads) {
      showToast.error("Please fill in all required fields!");
      return;
    }

    const plan = {
      id: Date.now().toString(),
      ...newPlan,
      status: "active",
    };

    showToast.success("Subscription Plan created successfully!");
    setShowPlanForm(false); 
    setNewPlan({
      name: "",
      price: 0,
      billingCycle: "monthly",
      maxProperties: 0,
      maxLeads: 0,
      tokensPerLead: 0,
      features: [""],
      description: "",
      trialDays: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditPlan = (plan: Plan) => {
    showToast.info("Opening form to edit subscription plan...");
    setEditingPlan({ ...plan, description: plan.description || "" });
    setShowPlanForm(true);
  };

  const handleDeletePlan = async (id: string | undefined) => {
    if (!id) {
      showToast.error("Invalid plan ID!");
      return;
    }

    try {
      showToast.info("Deleting subscription plan...");
      const response = await fetch(`http://localhost:8000/api/subscription/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete plan");

      showToast.success("Subscription Plan deleted successfully!");
    } catch (error) {
      showToast.error("Failed to delete subscription plan");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    showToast.info(`Switching to ${tab} tab`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
        <button
          onClick={activeTab === "subscriptions" ? handleAddPlan : handleAddToken}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New {activeTab === "subscriptions" ? "Plan" : "Token Package"}
        </button>
      </div>

      <RevenueStats stats={revenueStats} />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange("subscriptions")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "subscriptions"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => handleTabChange("tokens")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tokens"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Token Packages
          </button>
        </nav>
      </div>

      {activeTab === "subscriptions" ? (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription Plans Management
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Configure and manage your subscription plans
            </p>
          </div>
          <div className="p-6">
            <SubscriptionPlans onEdit={handleEditPlan} plans={[]} onDelete={handleDeletePlan} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Token Packages Management
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Configure and manage your token packages
            </p>
          </div>
          <div className="p-6">
            <TokenPackages />
          </div>
        </div>
      )}

      {showPlanForm && (
        <PlanForm
          editingPlan={editingPlan}
          onChange={handleInputChange}
          onSubmit={handleSubmitPlan}
          onClose={() => setShowPlanForm(false)} onUpdate={function (_updatedPlan: Plan): void {
            throw new Error("Function not implemented.");
          } }        />
      )}

      {showTokenForm && (
        <TokenForm
          onClose={() => setShowTokenForm(false)}
          onSave={(_data, _isEdit) => {}}
          initialData={undefined}
        />
      )}
    </div>
  );
};

export default Revenue;
