"use client";

import { useState } from "react"
import { ArrowRight, Droplets, Zap, Flame, Plus } from "lucide-react"

interface OtherChargesProps {
  otherCharges: {
    water: {
      amount: number;
      type: string;
    };
    electricity: {  
      amount: number;
      type: string;
    };
    gas: {
      amount: number;
      type: string;
    };
    others: {
      amount: number;
      type: string;
    };
  }
  onOtherChargesChange?: (charges: {
    water: { type: string; amount: number };
    electricity: { type: string; amount: number };
    gas: { type: string; amount: number };
    others: { type: string; amount: number };
  }) => void;
}

interface Charge {
  amount: number;
  type: string;
}

interface ChargesState {
  water: Charge;
  electricity: Charge;
  gas: Charge;
  others: Charge;
}

interface OtherChargesProps {
  onOtherChargesChange?: (charges: ChargesState) => void;
}

const OtherCharges: React.FC<OtherChargesProps> = ({ otherCharges, onOtherChargesChange }) => {
  const [charges, setCharges] = useState<ChargesState>(otherCharges)  

  const handleChange = (field: keyof ChargesState, value: Charge) => {
    const updatedCharges = {
      ...charges,
      [field]: value,
    };
    setCharges(updatedCharges);
    onOtherChargesChange?.(updatedCharges);
  };

  const utilities = [
    { key: "water", label: "Water", icon: Droplets },
    { key: "electricity", label: "Electricity", icon: Zap },
    { key: "gas", label: "Gas", icon: Flame },
    { key: "others", label: "Others", icon: Plus },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-2xl border border-black/20">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold text-black">Other Charges</h3>
        <ArrowRight className="text-black" size={20} />
        <span className="text-sm text-gray-500">Enter Utility Charges</span>
      </div>

      <div className="space-y-6 max-w-4xl">
        {utilities.map(({ key, label, icon: Icon }) => {
          const currentCharge = charges[key as keyof ChargesState];
          return (
            <div key={key} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Icon size={24} className="text-black" />
                <h4 className="text-lg font-medium text-gray-800">{label}</h4>
              </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  handleChange(key as keyof typeof charges, {
                    ...(charges[key as keyof typeof charges] as Charge),
                    type: 'inclusive',
                  })
                }
                className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                  (charges[key as keyof typeof charges] as Charge).type === 'inclusive'
                    ? "bg-gray-50 border-black text-black-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                Inclusive
              </button>
              <button
                type="button"
                onClick={() =>
                    handleChange(key as keyof typeof charges, {
                      ...(charges[key as keyof typeof charges] as Charge),
                    type: 'exclusive',
                    })
                  }
                className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                  (charges[key as keyof typeof charges] as Charge).type === 'exclusive'
                    ? "bg-gray-50 border-black text-black-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
                >
                  Exclusive
                </button>
              </div>

              {currentCharge.type === "exclusive" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:border-black outline-none transition-colors duration-200"
                    value={currentCharge.amount || ""}
                    onChange={(e) =>
                      handleChange(key as keyof ChargesState, {
                        ...currentCharge,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="Enter amount"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherCharges;
