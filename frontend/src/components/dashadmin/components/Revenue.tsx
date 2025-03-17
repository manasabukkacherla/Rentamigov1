import { useState, useEffect, SetStateAction } from "react";

import SubscriptionPlans from "./revenue/SubscriptionPlans";
import TokenPackages from "./revenue/TokenPackages"; // ✅ Added back Tokens section
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

      toast.success("Subscription plans loaded successfully!");
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

      toast.success("Token packages loaded successfully!");
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

      // ✅ Optimistic Update
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

      // ✅ Replace temp ID with backend ID
      setSubscriptionPlans((prev) =>
        prev.map((item) =>
          item.id === plan.id || item.id === savedPlan.tempId ? savedPlan : item
        )
      );

      setShowPlanForm(false);
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save subscription plan!");
      fetchSubscriptionPlans(); // ✅ Rollback if failed
    }
  };

  // ✅ Handle Save Token (Add/Edit)
  const handleSaveToken = async (token: TokenPackage) => {
    try {
      const method = token.id ? "PUT" : "POST";
      const url = token.id
        ? `http://localhost:8000/api/token/${token.id}`
        : `http://localhost:8000/api/token`;

      // ✅ Optimistic Update
      if (token.id) {
        setTokenPackages((prev) =>
          prev.map((item) => (item.id === token.id ? token : item))
        );
        toast.success(`Token package "${token.name}" updated successfully!`);
      } else {
        const tempId = Date.now().toString();
        setTokenPackages((prev) => [...prev, { ...token, id: tempId }]);
        toast.success(`New token package "${token.name}" created successfully!`);
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      });

      if (!response.ok) throw new Error("Failed to save token");

      const savedToken = await response.json();

      // ✅ Replace temp ID with backend ID
      setTokenPackages((prev) =>
        prev.map((item) =>
          item.id === token.id || item.id === savedToken.tempId ? savedToken : item
        )
      );

      setShowTokenForm(false);
    } catch (error) {
      console.error("Error saving token:", error);
      toast.error("Failed to save token package!");
      fetchTokenPackages(); // ✅ Rollback if failed
    }
  };

  return (
    <div>
      {/* ✅ Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2 ${
            activeTab === "subscriptions" ? "bg-gray-800 text-white" : "bg-gray-200"
          } rounded-lg`}
        >
          Subscription Plans
        </button>
        <button
          onClick={() => setActiveTab("tokens")}
          className={`px-4 py-2 ${
            activeTab === "tokens" ? "bg-gray-800 text-white" : "bg-gray-200"
          } rounded-lg`}
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
          onDelete={() => {}}
        />
      ) : (
        <TokenPackages
          packages={tokenPackages}
          onEdit={(token: SetStateAction<TokenPackage | undefined>) => {
            setEditingToken(token);
            setShowTokenForm(true);
          }}
          onDelete={() => {}}
        />
      )}

      {/* ✅ Plan Form */}
      {showPlanForm && (
        <PlanForm
          editingPlan={editingPlan}
          onSave={handleSavePlan}
          onClose={() => setShowPlanForm(false)} onUpdate={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}

      {/* ✅ Token Form */}
      {showTokenForm && (
        <TokenForm
          editingToken={editingToken}
          onSave={handleSaveToken}
          onClose={() => setShowTokenForm(false)}
        />
      )}
    </div>
  );
};

export default Revenue;
