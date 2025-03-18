import  { useState } from "react";
import { Plus } from "lucide-react";
import RevenueStats from "./revenue/RevenueStats";
import SubscriptionPlans from "./revenue/SubscriptionPlans";
import TokenPackages from "./revenue/TokenPackages";
import PlanForm from "./revenue/PlanForm";
import TokenForm from "./revenue/TokenForm";
import { showToast } from "./Toast";
import { Plan, TokenPackage } from "./Types";

const Revenue = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>(undefined);
  const [showPlanForm, setShowPlanForm] = useState(false);
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

  const [newToken, setNewToken] = useState({
    name: "",
    tokens: 0,
    price: 0,
    bonusTokens: 0,
    minPurchase: 0,
    tokensPerLead: 0,
    validityDays: 0,
    features: [""],
    description: "",
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

  const [tokenPackages, setTokenPackages] = useState([
    {
      id: "1",
      name: "Starter Pack",
      tokens: 100,
      price: 25,
      bonusTokens: 0,
      minPurchase: 1,
      tokensPerLead: 2,
      validityDays: 365,
      features: [
        "Contact property owners",
        "View detailed analytics",
        "Access premium listings",
        "No expiration",
      ],
      status: "active",
    },
    {
      id: "2",
      name: "Popular Pack",
      tokens: 500,
      price: 99,
      bonusTokens: 50,
      minPurchase: 1,
      tokensPerLead: 2,
      validityDays: 365,
      features: [
        "All Starter Pack features",
        "Priority support",
        "Bulk property access",
        "10% bonus tokens",
        "No expiration",
      ],
      status: "active",
    },
    {
      id: "3",
      name: "Premium Pack",
      tokens: 1000,
      price: 189,
      bonusTokens: 150,
      minPurchase: 1,
      tokensPerLead: 1,
      validityDays: 365,
      features: [
        "All Popular Pack features",
        "VIP support",
        "Advanced analytics",
        "15% bonus tokens",
        "Exclusive property previews",
        "No expiration",
      ],
      status: "active",
    },
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
      status: "active",
    };
    setPlans((prevPlans) => [...prevPlans, plan]);
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

  const handleSubmitToken = () => {
    const token = {
      id: Date.now().toString(),
      ...newToken,
      status: "active",
    };
    setTokenPackages([...tokenPackages, token]);
    setShowTokenForm(false);
    setNewToken({
      name: "",
      tokens: 0,
      price: 0,
      bonusTokens: 0,
      minPurchase: 0,
      tokensPerLead: 0,
      validityDays: 0,
      features: [""],
      description: "",
    });
  };

  //edit subscription plan
  const handleEditPlan = (plan: any) => {
    if (!plan || (!plan.id && !plan._id)) {
      console.error("Error: Plan does not have a valid ID", plan);
      showToast.error("Invalid plan selected for editing!");
      return;
    }

    setEditingPlan({
      ...plan,
      id: plan.id || plan._id, // Map _id to id
    });

    setShowPlanForm(true);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      showToast.error("Invalid plan ID!");
      console.error("Error: Plan ID is undefined");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/subscription/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete plan");

      setPlans((prevPlans) => prevPlans.filter((plan: { id: string; }) => plan.id !== id));

      showToast.success("Subscription Plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting plan:", error);
      showToast.error("Failed to delete subscription plan");
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    setTokenPackages((tokens) =>
      tokens.filter((token) => token.id !== tokenId)
    );
  };

  function setEditingToken(_id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
        <button
          onClick={
            activeTab === "subscriptions" ? handleAddPlan : handleAddToken
          }
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
            onClick={() => setActiveTab("subscriptions")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "subscriptions"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab("tokens")}
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
            <SubscriptionPlans
              onEdit={handleEditPlan}
              onDelete={handleDelete}
            />
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
          editingPlan={editingPlan} 
          onClose={() => {
            setShowPlanForm(false);
            setEditingPlan(undefined);
          }}
          onSubmit={handleSubmitPlan} 
        />
      )}

      {showTokenForm && (
        <TokenForm
          token={newToken}
          onChange={setNewToken}
          onSubmit={handleSubmitToken}
          onCancel={() => setShowTokenForm(false)} onSave={function (_data: TokenPackage): Promise<void> {
            throw new Error("Function not implemented.");
          } } onClose={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
};

export default Revenue;
function setPlans(_arg0: (prevPlans: any) => any) {
  throw new Error("Function not implemented.");
}

