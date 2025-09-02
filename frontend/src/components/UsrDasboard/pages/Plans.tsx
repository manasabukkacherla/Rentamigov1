import React, { useState, useEffect } from "react";
import { Coins } from "lucide-react";
import { toast } from "react-toastify";

function Plans() {
  const [pricePerToken, setPricePerToken] = useState<number | null>(null);
  const [tokenCount, setTokenCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPayments, setUserPayments] = useState<any[]>([]);
  const [totalTokens, setTotalTokens] = useState<number>(0);

  const fetchTokenPrice = async () => {
    try {
      const response = await fetch(`/api/tokens?nocache=${Date.now()}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].pricePerToken) {
        setPricePerToken(data[0].pricePerToken);
      } else {
        alert("Token pricing is not available. Please try again later.");
      }
    } catch (err) {
      console.error("Failed to fetch token price", err);
      alert("Could not fetch token price. Please try again later.");
    }
  };

  const fetchUserPayments = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch(`/api/payment/user/${userId}?nocache=${Date.now()}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setUserPayments(data);
        const total = data.reduce((sum, p) => sum + (p.tokensPurchased || 0), 0);
        setTotalTokens(total);
      }
    } catch (err) {
      console.error("Failed to fetch user payments:", err);
    }
  };

  useEffect(() => {
    fetchTokenPrice();
    fetchUserPayments();

    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => console.log("Razorpay loaded");
      document.body.appendChild(script);
    }
  }, []);

  const handleTokenPurchase = async () => {
    if (!pricePerToken || tokenCount <= 0) {
      alert("Please enter a valid number of tokens.");
      return;
    }

    const amount = pricePerToken * tokenCount;
    const amountInPaise = amount * 100;

    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("username");

    if (!userId || !userName) {
      alert("Please log in to make a purchase.");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const orderData = await orderRes.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Token Purchase",
        description: `Buying ${tokenCount} tokens`,
        order_id: orderData.id,
        handler: async function (response: any) {
          alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);

          const paymentDetails = {
            userId,
            userName,
            amount,
            transactionId: response.razorpay_payment_id,
            planName: "Token Purchase",
            planId: orderData.id,
            plantype: "token",
            tokensPurchased: tokenCount,
          };

          // 1. Save payment
          const saveRes = await fetch("/api/payment/save-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
          });

          if (!saveRes.ok) {
            alert("Payment saved failed, but transaction succeeded.");
            setLoading(false);
            return;
          }

          // 2. Add tokens to user
          try {
            const tokenAddRes = await fetch("/api/usertoken/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                tokensToAdd: tokenCount,
              }),
            });

            const tokenAddData = await tokenAddRes.json();

            if (tokenAddRes.ok) {
              toast.success("Tokens added successfully!");
            } else {
              toast.error(tokenAddData.message || "Token addition failed");
            }
          } catch (tokenError) {
            console.error("Error calling /usertoken/add:", tokenError);
            toast.error("Error adding tokens to your account.");
          }

          // 3. Update UI
          setTokenCount(0);
          fetchUserPayments();
        },
        prefill: {
          name: userName,
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = pricePerToken ? (tokenCount * pricePerToken).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Buy Tokens</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Price Per Token</label>
          <div className="text-lg font-medium text-gray-800">
            {pricePerToken !== null ? `₹${pricePerToken}` : "Loading..."}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tokenCount" className="block text-gray-700 mb-1">
            Enter Number of Tokens
          </label>
          <input
            id="tokenCount"
            type="number"
            min={1}
            value={tokenCount}
            onChange={(e) => setTokenCount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. 100"
            disabled={pricePerToken === null}
          />
        </div>

        <div className="mb-6 text-gray-700">
          <div className="flex items-center">
            <Coins className="w-5 h-5 mr-2 text-yellow-500" />
            <span>
              Total Amount: <strong>₹{totalPrice}</strong>
            </span>
          </div>
        </div>

        <button
          onClick={handleTokenPurchase}
          disabled={loading || !pricePerToken}
          className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Purchase Tokens"}
        </button>

        {/* Token Balance */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Token Balance</h3>
          <div className="text-xl text-green-700 font-bold">{totalTokens} tokens</div>
        </div>

        {/* Purchase History */}
        {userPayments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Purchase History</h3>
            <ul className="space-y-2">
              {userPayments.map((payment) => (
                <li
                  key={payment._id}
                  className="border border-gray-200 rounded-lg p-3 text-sm"
                >
                  <div>
                    <strong>Tokens:</strong> {payment.tokensPurchased || 0}
                  </div>
                  <div>
                    <strong>Amount:</strong> ₹{payment.amount}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Txn ID:</strong> {payment.transactionId}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;
