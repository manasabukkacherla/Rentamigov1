import React from "react";
import { DollarSign, Edit, Trash2, Users } from "lucide-react";
import { Plan } from "../Types";

interface SubscriptionPlansProps {
  plans: Plan[];
  onEdit: (plan: Plan) => void;
  onDelete: (planId: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ plans, onEdit, onDelete }) => {
  if (!plans || plans.length === 0) {
    return <p className="text-center text-gray-500">No subscription plans available.</p>;
  }

  return (
    <div className="space-y-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h4>
                <div className="mt-1 space-x-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${plan.price}/{plan.billingCycle}
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
                  className="p-2 text-gray-600 hover:text-blue-600 border rounded-lg transition"
                >
                  <Edit className="w-5 h-5" />
                </button>

                {/* ✅ Delete Button */}
                <button
                  onClick={() => onDelete(plan.id)}
                  className="p-2 text-gray-600 hover:text-red-600 border rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ✅ Max Properties & Max Leads */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 text-gray-400 mr-2" />
                <span>
                  Max Properties:{" "}
                  {plan.maxProperties === -1 ? "Unlimited" : plan.maxProperties}
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

            {/* ✅ Features */}
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* ✅ Status */}
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
      ))}
    </div>
  );
};

export default SubscriptionPlans;
