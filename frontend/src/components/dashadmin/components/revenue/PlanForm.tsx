import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { showToast } from "../Toast"; // Ensure the correct import path for toast.tsx
import { Plan } from "../Types";

interface PlanFormData {
  name: string;
  price: number;
  billingCycle: string;
  maxProperties: number;
  maxLeads: number;
  tokensPerLead: number;
  features: string[];
  description: string;
  trialDays: number;
}

interface PlanFormProps {
  onClose: () => void;
  // editingPlan: Plan ; // Removed duplicate declaration
  onUpdate: (updatedPlan: Plan) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: () => void;
  editingPlan?: Plan | undefined; // ✅ Use optional `Plan` instead of `PlanFormData`
}

const PlanForm: React.FC<PlanFormProps> = ({ onClose, editingPlan }) => {
  const [data, setData] = useState<PlanFormData>({
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

  // ✅ Pre-fill form when editing an existing plan
  useEffect(() => {
    if (editingPlan) {
      setData(editingPlan); // ✅ Load existing plan when editing
    } else {
      setData({
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
    }
  }, [editingPlan]); // ✅ Runs when `editingPlan` changes

  const handleChange = (updatedData: Partial<PlanFormData>) => {
    setData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleSubmit = async () => {
    try {
      const planId = editingPlan?.id || editingPlan?._id; // ✅ Ensure correct ID

      if (editingPlan && !planId) {
        console.error("Error: Editing plan has no valid ID");
        showToast.error("Invalid subscription plan ID!");
        return;
      }

      const url = editingPlan
        ? `/api/subscription/${planId}` // ✅ Use _id or id
        : "/api/subscription";

      const method = editingPlan ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _id: planId, // ✅ Ensure API gets _id
        }),
      });

      if (!response.ok) throw new Error("Failed to save subscription plan");

      showToast.success(
        `Plan ${editingPlan ? "updated" : "created"} successfully!`
      );
      onClose();
    } catch (error) {
      console.error("Error saving plan:", error);
      showToast.error("Error saving subscription plan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {editingPlan
            ? "Edit Subscription Plan"
            : "Create New Subscription Plan"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plan Name
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange({ name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="e.g., Professional Plan"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={data.price}
                onChange={(e) =>
                  handleChange({ price: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Billing Cycle
              </label>
              <select
                value={data.billingCycle}
                onChange={(e) => handleChange({ billingCycle: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Properties
              </label>
              <input
                type="number"
                value={data.maxProperties}
                onChange={(e) =>
                  handleChange({ maxProperties: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Leads
              </label>
              <input
                type="number"
                value={data.maxLeads}
                onChange={(e) =>
                  handleChange({ maxLeads: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tokens per Lead
              </label>
              <input
                type="number"
                value={data.tokensPerLead}
                onChange={(e) =>
                  handleChange({ tokensPerLead: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Features
            </label>
            {data.features.map((feature, index) => (
              <div key={index} className="flex mt-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...data.features];
                    newFeatures[index] = e.target.value;
                    handleChange({ features: newFeatures });
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Add a feature"
                />
                <button
                  onClick={() => {
                    const newFeatures = data.features.filter(
                      (_, i) => i !== index
                    );
                    handleChange({ features: newFeatures });
                  }}
                  className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => handleChange({ features: [...data.features, ""] })}
              className="mt-2 text-sm text-gray-600 hover:text-gray-900"
            >
              + Add feature
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            {editingPlan ? "Update Plan" : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanForm;
