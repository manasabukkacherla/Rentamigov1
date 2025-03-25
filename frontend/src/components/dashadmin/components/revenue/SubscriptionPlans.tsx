import React, { useEffect, useState, useCallback } from "react";
import { DollarSign, Edit, Trash2, Users } from "lucide-react";
import { showToast } from "../Toast";

interface Plan {
  tempId: string;
  description: string;
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  maxProperties: number;
  maxLeads: number;
  tokensPerLead: number;
  trialDays: number;
  features: string[];
  status: string;
}

interface SubscriptionPlansProps {
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => Promise<void>;
  refreshTrigger: number; // Declare refreshTrigger prop here
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  onEdit,
  onDelete,
  refreshTrigger,
}) => {
  const [plans, setPlans] = useState<Plan[]>([]); // State to store plans
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  // ✅ Fetch subscription plans from the API
  const fetchPlans = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch("/api/subscription");
      if (!response.ok) throw new Error("Failed to fetch plans");

      const data = await response.json();
      console.log("Fetched Plans:", data); // Debugging log
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      showToast.error("Failed to fetch subscription plans!");
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, []);

  // ✅ Trigger refetch when `refreshTrigger` changes
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans, refreshTrigger]); // Now it listens for refreshTrigger

  // ✅ Handle Delete Plan
  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      showToast.error("Invalid plan ID!");
      console.error("Error: Plan ID is undefined");
      return;
    }

    try {
      await onDelete(id); // Call parent delete handler
      showToast.success("Subscription plan deleted successfully!");
    } catch (error) {
      console.error("Error deleting plan:", error);
      showToast.error("Failed to delete subscription plan");
    }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <p className="text-center text-gray-500">
          Loading subscription plans...
        </p>
      ) : plans.length === 0 ? (
        <p className="text-center text-gray-500">
          No subscription plans found. Create your first plan!
        </p>
      ) : (
        plans.map((plan) => (
          <div key={plan.id} className="bg-gray-50 rounded-lg p-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h4>
                  <div className="mt-1 space-x-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${plan.price}/month
                    </span>
                    <span className="text-sm text-gray-600">
                      {plan.tokensPerLead} tokens per lead
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* ✅ Edit Button */}
                  <button
                    onClick={() => onEdit(plan)}
                    className="p-2 text-gray-600 hover:text-blue-600 border rounded-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  {/*  */}
                  {/* ✅ Delete Button */}
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-gray-600 hover:text-red-600 border rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span>
                    Max Properties:{" "}
                    {plan.maxProperties === -1
                      ? "Unlimited"
                      : plan.maxProperties}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <span>
                    Max Leads:{" "}
                    {plan.maxLeads === -1 ? "Unlimited" : plan.maxLeads}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    plan.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {plan.status}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubscriptionPlans;
