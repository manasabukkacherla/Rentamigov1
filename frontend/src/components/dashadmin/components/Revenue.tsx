"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import RevenueStats from "./revenue/RevenueStats";
import TokenForm from "./revenue/TokenForm";
import { showToast } from "./Toast";

interface TokenPackage {
  _id?: string;
  pricePerToken: number;
}

const Revenue = () => {
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [tokenPackage, setTokenPackage] = useState<TokenPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tokens");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setTokenPackage(data[0]); // Use the first available package
      } else {
        setTokenPackage(null); // No package found
      }
    } catch (err) {
      showToast.error("Failed to fetch token packages");
      setTokenPackage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [refreshTrigger]);

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
      title: "Tokens Sold",
      value: "15,240",
      change: "+18.7%",
      period: "vs last month",
    },
    {
      id: 3,
      title: "Average Revenue/User",
      value: "$89.50",
      change: "+8.4%",
      period: "vs last month",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Revenue Management</h2>
        <button
          onClick={() => {
            setShowTokenForm(true);
            showToast.info(
              tokenPackage ? "Editing existing token price..." : "Creating new token price..."
            );
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {tokenPackage ? "Update Token Price" : "Create Token Price"}
        </button>
      </div>

      <RevenueStats stats={revenueStats} />

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Token Price Details</h3>
          <p className="text-sm text-gray-500 mt-1">
            {tokenPackage
              ? "Current price per token is shown below."
              : "No token pricing available. Please create one."}
          </p>
        </div>
        <div className="p-6">
          {loading ? (
            <p>Loading token price...</p>
          ) : tokenPackage ? (
            <div className="text-xl font-medium text-gray-800">
              ₹ {tokenPackage.pricePerToken} per token
            </div>
          ) : (
            <p>No token price found.</p>
          )}
        </div>
      </div>

      {showTokenForm && (
        <TokenForm
          onClose={() => setShowTokenForm(false)}
          onSave={() => {
            showToast.success(
              tokenPackage ? "Token price updated" : "Token price created"
            );
            setShowTokenForm(false);
            setRefreshTrigger((prev) => prev + 1);
          }}
          initialData={tokenPackage ?? undefined}
        />
      )}
    </div>
  );
};

export default Revenue;
