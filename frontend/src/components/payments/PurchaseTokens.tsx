import React, { useState } from "react";

const PurchaseTokens = () => {
  const [loading, setLoading] = useState(false);

  // Function to handle Razorpay payment
  const handlePayment = async () => {
    setLoading(true);

    try {
      // Request your backend to create an order
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1900, // Amount in INR (1900 INR)
        }),
      });

      const data = await response.json();

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === "undefined") {
        alert("Razorpay script not loaded");
        return;
      }

      const options = {
        key: data.key_id, // Razorpay key from backend
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: "Token Package Purchase",
        description: "Purchase tokens for your account",
        image: "https://yourwebsite.com/logo.png", // Add your logo URL
        order_id: data.id,
        handler: function (response: any) {
          alert(
            `Payment successful. Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "User Name", // Optionally fetch user details
          email: "user@example.com", // Optionally fetch user email
          contact: "1234567890", // Optionally fetch user contact
        },
        notes: {
          address: "Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Open the Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error occurred while fetching order:", error);
      alert("Error occurred while fetching order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg"
      >
        {loading ? "Loading..." : "Purchase Tokens"}
      </button>
    </div>
  );
};

export default PurchaseTokens;
