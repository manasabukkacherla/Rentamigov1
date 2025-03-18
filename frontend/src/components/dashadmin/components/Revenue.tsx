import { useState, useEffect, SetStateAction } from "react";
import SubscriptionPlans from "./revenue/SubscriptionPlans";
import TokenPackages from "./revenue/TokenPackages";
import PlanForm from "./revenue/PlanForm";
import TokenForm from "./revenue/TokenForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plan, TokenPackage } from "./Types";

const Revenue = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<Plan[]>([]);
  const [tokenPackages, setTokenPackages] = useState<TokenPackage[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | undefined>(undefined);
  const [editingToken, setEditingToken] = useState<TokenPackage | undefined>(undefined);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"subscriptions" | "tokens">("subscriptions");

  // ✅ Fetch subscription plans from backend
  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/subscription");
      if (!response.ok) throw new Error("Failed to fetch plans");

      const data = await response.json();
      setSubscriptionPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch subscription plans!");
    }
  };

  // ✅ Fetch token packages from backend
  const fetchTokenPackages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tokens");
      if (!response.ok) throw new Error("Failed to fetch tokens");

      const data = await response.json();
      setTokenPackages(data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      toast.error("Failed to fetch token packages!");
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
    fetchTokenPackages(); // ✅ Fetch both tokens and subscriptions
  }, []);

  // ✅ Handle Save Plan (Add/Edit)
  const handleSavePlan = async (plan: Plan) => {
    try {
      const method = plan.id ? "PUT" : "POST";
      const url = plan.id
        ? `http://localhost:8000/api/subscription/${plan.id}`
        : `http://localhost:8000/api/subscription`;

      // ✅ Optimistic Update for UI
      if (plan.id) {
        setSubscriptionPlans((prev) =>
          prev.map((item) => (item.id === plan.id ? plan : item))
        );
        toast.success(`Subscription plan "${plan.name}" updated successfully!`);
      } else {
        const tempId = Date.now().toString();
        setSubscriptionPlans((prev) => [...prev, { ...plan, id: tempId }]);
        toast.success(`New plan "${plan.name}" created successfully!`);
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
      });

      if (!response.ok) throw new Error("Failed to save plan");

      const savedPlan = await response.json();

      // ✅ Replace temporary ID or existing plan ID with the saved ID
      setSubscriptionPlans((prev) =>
        prev.map((item) =>
          item.id === plan.id || item.id === plan.tempId ? { ...savedPlan } : item
        )
      );

      // Reload plans after successful save to ensure data is synced
      fetchSubscriptionPlans();

      setShowPlanForm(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save subscription plan!");
      fetchSubscriptionPlans(); // Rollback if failed
    }
  };

  // ✅ Handle Delete Plan
  const handleDeletePlan = async (planId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/subscription/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete plan. Status: ${response.status}`);
      }

      // Optimistic update: Immediately update the UI
      setSubscriptionPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));

      toast.success("Subscription plan deleted successfully!");

      // Reload subscription plans to ensure data is synced
      fetchSubscriptionPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete subscription plan!");
    }
  };

  // ✅ Handle Delete Token
  const handleDeleteToken = async (tokenId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/token/${tokenId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete token");

      setTokenPackages((prevTokens) => prevTokens.filter((token) => token.id !== tokenId));

      toast.success("Token package deleted successfully!");
    } catch (error) {
      console.error("Error deleting token:", error);
      toast.error("Failed to delete token package!");
    }
  };

  function handleSaveToken(data: TokenPackage): Promise<void> {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2 ${activeTab === "subscriptions" ? "bg-gray-800 text-white" : "bg-gray-200"} rounded-lg`}
        >
          Subscription Plans
        </button>
        <button
          onClick={() => setActiveTab("tokens")}
          className={`px-4 py-2 ${activeTab === "tokens" ? "bg-gray-800 text-white" : "bg-gray-200"} rounded-lg`}
        >
          Token Packages
        </button>
      </div>

      {/* ✅ Subscription Plans */}
      {activeTab === "subscriptions" ? (
        <SubscriptionPlans
          plans={subscriptionPlans}
          onEdit={(plan) => {
            setEditingPlan(plan);
            setShowPlanForm(true);
          }}
          onDelete={handleDeletePlan}  // Pass the delete handler for plans
        />
      ) : (
        <TokenPackages
          packages={tokenPackages}
          onEdit={(id: string) => {
            const token = tokenPackages.find((token) => token.id === id);
            setEditingToken(token);
            setShowTokenForm(true);
          }}
          onDelete={handleDeleteToken}  // Pass the delete handler for tokens
        />
      )}

      {/* ✅ Plan Form */}
      {showPlanForm && (
        <PlanForm
          editingPlan={editingPlan}
          onSave={handleSavePlan}
          onClose={() => setShowPlanForm(false)} onUpdate={function (_updatedPlan: Plan): void {
            throw new Error("Function not implemented.");
          } } onSubmit={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}

      {/* ✅ Token Form */}
      {showTokenForm && (
        <TokenForm
          editingToken={editingToken}
          onSave={handleSaveToken}
          onClose={() => setShowTokenForm(false)} token={{
            name: "",
            tokens: 0,
            price: 0,
            bonusTokens: 0,
            minPurchase: 0,
            tokensPerLead: 0,
            validityDays: 0,
            features: [],
            description: ""
          }} onChange={function (_token: any): void {
            throw new Error("Function not implemented.");
          } } onSubmit={function (): void {
            throw new Error("Function not implemented.");
          } } onCancel={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </div>
  );
};

export default Revenue;
