import React, { useEffect, useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import TermsAndConditions from "./TermsAndConditions";
import ForgotPassword from "./ForgotPassword";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: (email: string) => void;
}

function EmployeeLogin({ onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔹 Check session storage on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log("User already logged in:", userData);
      redirectUser(userData.role); // Auto-redirect if already logged in
    }
  }, [navigate]);

  // 🔹 Function to redirect user based on role
  const redirectUser = (role: string) => {
    if (["owner", "pg", "agent"].includes(role)) {
      navigate("/Userdashboard"); // ✅ Redirect PG, Owner, Agent to Userdashboard
    } else if (role === "user") {
      navigate("/homepage");
    } else if (role === "admin") {
      navigate("/admindash");
    } else if (role === "employee" || "manager") {
      navigate("/empdash");
    } else {
      navigate("/homepage"); // Default route if role is unknown
    }
  };

  // 🔹 Handle Google Authentication Success
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google Credential Response:", credentialResponse);

      const response = await axios.post("/api/loginuser/google", {
        credential: credentialResponse.credential,
      });

      const userData = response.data;
      console.log("✅ Google Login Successful:", userData);

      if (userData.error) {
        alert("You are not registered. Please sign up first.");
        onSwitchToSignup();
        return;
      }

      // ✅ Store full user details in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData.user));

      // ✅ Store userId separately for easy API access
      sessionStorage.setItem("userId", userData.user.id);
      sessionStorage.setItem("role", userData.user.role);
      sessionStorage.setItem("email", userData.user.email);
      sessionStorage.setItem(
        "fullName",
        userData.user.fullName || userData.user.name || ""
      );
      sessionStorage.setItem("username", userData.user.username);
      sessionStorage.setItem("token", userData.token);

      console.log(
        "✅ Session Storage Updated:",
        sessionStorage.getItem("user")
      );
      console.log("User Data Response:", userData.user);

      redirectUser(userData.user.role);
      onLoginSuccess(userData.user.email);
    } catch (error) {
      console.error("❌ Google Login Error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  // 🔹 Handle Google Authentication Error
  const handleGoogleError = () => {
    console.log("❌ Google Login Failed");
    alert("Google login failed. Please try again.");
  };

  // 🔹 Handle Manual Login (Email & Password)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/loginuser/emp-login", formData);
      const userData = response.data;
      console.log(userData);
      // ✅ Store full user details in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData.employee));

      // ✅ Store userId separately for easy API access
      sessionStorage.setItem("userId", userData.employee.id);
      sessionStorage.setItem("role", userData.employee.role);
      sessionStorage.setItem("email", userData.employee.email);
      sessionStorage.setItem(
        "fullName",
        userData.employee.name || userData.employee.fullName || ""
      );
      sessionStorage.setItem("username", userData.employee.email);
      sessionStorage.setItem("token", userData.token);

      console.log(
        "✅ Session Storage Updated:",
        sessionStorage.getItem("user")
      );
      console.log("User Data Response:", userData.employee);

      redirectUser(userData.employee.role);
      onLoginSuccess(userData.employee.email);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full relative z-10">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=96&h=96&q=80"
          alt="Company Logo"
          className="w-8 h-8 object-cover rounded-lg"
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>

      {/* Google Login Button */}
      <div className="flex justify-center mb-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white/80 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-gray-700 text-sm font-medium">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              required
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="h-5 w-5" /> Sign In
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </div>

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </div>
  );
}

export default EmployeeLogin;
