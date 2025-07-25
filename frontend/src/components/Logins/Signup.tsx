// import React, { useState } from 'react';
// import { Mail, Lock, User, Phone, MapPin, Building, Map, UserPlus, UserCog, ExternalLink } from 'lucide-react';
// import TermsAndConditions from './TermsAndConditions';
// import OTPModal from './OTPModal';

// interface SignupProps {
//   onSwitchToLogin: () => void;
// }

// type UserRole = 'owner' | 'agent' | 'tenant' | 'pg' ;

// function Signup({ onSwitchToLogin }: SignupProps) {
//   const [showTerms, setShowTerms] = useState(false);
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOTPSent] = useState(false); // ✅ Track OTP sent status
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [emailVerified, setEmailVerified] = useState(false); // ✅ Track OTP verification

//   const [formData, setFormData] = useState({
//     username: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     password: '',
//     role: '' as UserRole,
//     acceptTerms: false,
//     emailVerified: false,
//   });

//   const roles = [
//     { value: 'owner', label: 'Owner' },
//     { value: 'agent', label: 'Agent' },
//     { value: 'tenant', label: 'Tenant' },
//     { value: 'pg', label: 'PG' },
//     { value: 'employee', label: 'Employee' },
//     { value: 'admin', label: 'Admin' },
//   ];

//   /**
//    * 1️⃣ Send OTP for Email Verification
//    */
//   const handleSendOTP = async () => {
//     if (!formData.email) {
//       setError('Please enter your email address first.');
//       return;
//     }
//     if (emailVerified) {
//       setError('Email is already verified.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('/api/sign/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || 'Failed to send OTP');

//       setShowOTPModal(true);
//       setOTPSent(true); // ✅ Mark OTP as sent
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * 2️⃣ Verify OTP when user enters OTP
//    */
//   const handleVerifyOTP = async (otp: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch('/api/sign/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email, otp }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.error || 'Failed to verify OTP');

//       setEmailVerified(true);
//       setOTPSent(false); // ✅ Reset OTP Sent Status

//       // ✅ Update formData to include emailVerified
//       setFormData((prevData) => ({
//         ...prevData,
//         emailVerified: true,
//       }));

//       setShowOTPModal(false);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to verify OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /**
//    * 3️⃣ Submit Registration Form (Only After OTP Verification)
//    */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // ✅ Prevent registration if email is not verified
//     if (!emailVerified) {
//       setError('Please verify your email before submitting.');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await fetch('/api/sign/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, emailVerified: true }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.error || 'Registration failed');

//       setSuccess(true);

//       // Reset form after successful registration
//       setFormData({
//         username: '',
//         fullName: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//         state: '',
//         password: '',
//         role: '' as UserRole,
//         acceptTerms: false,
//         emailVerified: false,
//       });

//       setEmailVerified(false);

//       setTimeout(() => {
//         onSwitchToLogin();
//       }, 2000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred during registration');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full relative z-10">
//       {/* Logo */}
//       <div className="absolute top-8 left-8">
//         <img
//           src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=96&h=96&q=80"
//           alt="Company Logo"
//           className="w-8 h-8 object-cover rounded-lg"
//         />
//       </div>

//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Create Account
//         </h2>
//         <p className="text-gray-600 text-sm mt-1">Join our property management platform</p>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
//           {error}
//         </div>
//       )}

//       {/* Success Message */}
//       {success && (
//         <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
//           Registration successful! Redirecting to login...
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <div className="col-span-2">
//           <div className="relative">
//             <UserCog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <select
//               required
//               className="w-full pl-12 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               value={formData.role}
//               onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
//               disabled={loading}
//             >
//               <option value="">Select role</option>
//               {roles.map((role) => (
//                 <option key={role.value} value={role.value}>
//                   {role.label}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-2 sm:col-span-1">
//           <div className="relative">
//             <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               required
//               className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Username"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//               pattern="^[a-zA-Z0-9]{8,20}$"
//               title="Username should be 8-20 alphanumeric characters."
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="col-span-2 sm:col-span-1">
//           <div className="relative">
//             <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               required
//               className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Full name"
//               value={formData.fullName}
//               onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="col-span-2">
//           <div className="relative">
//             <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="email"
//               required
//               className="w-full pl-12 pr-24 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Email address"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               disabled={loading || emailVerified}
//             />
//             <button
//               type="button"
//               onClick={handleSendOTP}
//               disabled={loading || !formData.email || emailVerified}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
//             >
//               {emailVerified ? 'Verified' : 'Verify'}
//             </button>
//           </div>
//         </div>

//         <div className="col-span-2 sm:col-span-1">
//           <div className="relative">
//             <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="tel"
//               required
//               className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Phone number"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="col-span-2 sm:col-span-1">
//           <div className="relative">
//             <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="password"
//               required
//               className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="col-span-2">
//           <div className="relative">
//             <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               required
//               className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               disabled={loading}
//             />
//           </div>
//         </div>

//         <div className="relative">
//           <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             required
//             className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//             placeholder="City"
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             disabled={loading}
//           />
//         </div>

//         <div className="relative">
//           <Map className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           <input
//             type="text"
//             required
//             className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
//             placeholder="State"
//             value={formData.state}
//             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             disabled={loading}
//           />
//         </div>

//         <div className="col-span-2">
//           <div className="flex items-start gap-3">
//             <div className="flex items-center h-5">
//               <input
//                 type="checkbox"
//                 required
//                 checked={formData.acceptTerms}
//                 onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
//                 className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
//                 disabled={loading}
//               />
//             </div>
//             <div className="text-xs">
//               <label className="font-medium text-gray-700">
//                 Accept Terms and Conditions
//               </label>
//               <p className="text-gray-500">
//                 I agree to the{' '}
//                 <button
//                   type="button"
//                   className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
//                   onClick={() => setShowTerms(true)}
//                 >
//                   Terms and Conditions
//                   <ExternalLink className="h-3 w-3" />
//                 </button>
//                 {' '}and confirm that I have read the Privacy Policy.
//               </p>
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
//           disabled={loading || !emailVerified}
//         >
//           {loading ? (
//             <div className="flex items-center gap-2">
//               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Creating Account...
//             </div>
//           ) : (
//             <>
//               <UserPlus className="h-5 w-5" />
//               Create Account
//             </>
//           )}
//         </button>
//       </form>

//       <div className="mt-4 text-center">
//         <p className="text-gray-600 text-sm">
//           Already have an account?{' '}
//           <button
//             onClick={onSwitchToLogin}
//             className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//             disabled={loading}
//           >
//             Sign in
//           </button>
//         </p>
//       </div>

//       {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
//       <OTPModal
//         isOpen={showOTPModal}
//         onClose={() => setShowOTPModal(false)}
//         onVerify={handleVerifyOTP}
//         loading={loading}
//       />
//     </div>
//   );
// }

// export default Signup;
import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Building,
  Map,
  UserPlus,
  UserCog,
  ExternalLink,
} from "lucide-react";
import TermsAndConditions from "./TermsAndConditions";
import OTPModal from "./OTPModal";

interface SignupProps {
  onSwitchToLogin: () => void;
}

type UserRole = "owner" | "agent" | "tenant" | "pg" | "admin";

function Signup({ onSwitchToLogin }: SignupProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    password: "",
    role: "" as UserRole,
    acceptTerms: false,
    emailVerified: false,
  });

  // Add effect to handle admin role selection


  const roles = [
    { value: "owner", label: "Owner" },
    { value: "agent", label: "Agent" },
    { value: "tenant", label: "Tenant" },
    { value: "pg", label: "PG" },
    { value: "employee", label: "Employee" },
    
  ];

  const handleSendOTP = async () => {
    if (!formData.email) {
      setError("Please enter your email address first.");
      return;
    }
    if (emailVerified) {
      setError("Email is already verified.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/sign/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send OTP");

      setShowOTPModal(true);
      setOTPSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/sign/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to verify OTP");

      setEmailVerified(true);
      setOTPSent(false);

      setFormData((prevData) => ({
        ...prevData,
        emailVerified: true,
      }));

      setShowOTPModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      setError("Please verify your email before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/sign/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, emailVerified: true }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      setSuccess(true);

      setFormData({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        password: "",
        role: "" as UserRole,
        acceptTerms: false,
        emailVerified: false,
      });

      setEmailVerified(false);

      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full relative z-10">
      <div className="absolute top-8 left-8">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=96&h=96&q=80"
          alt="Company Logo"
          className="w-8 h-8 object-cover rounded-lg"
        />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Join our property management platform
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <UserCog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              required
              className="w-full pl-12 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as UserRole })
              }
              disabled={loading}
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {formData.role !== "admin" && (
          <>
            <div className="col-span-2 sm:col-span-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  pattern="^[a-zA-Z0-9]{8,20}$"
                  title="Username should be 8-20 alphanumeric characters."
                  disabled={loading}
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-24 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={loading || emailVerified}
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading || !formData.email || emailVerified}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {emailVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  required
                  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
            </div>

            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="relative">
              <Map className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>
                <div className="text-xs">
                  <label className="font-medium text-gray-700">
                    Accept Terms and Conditions
                  </label>
                  <p className="text-gray-500">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                      onClick={() => setShowTerms(true)}
                    >
                      Terms and Conditions
                      <ExternalLink className="h-3 w-3" />
                    </button>{" "}
                    and confirm that I have read the Privacy Policy.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              disabled={loading || !emailVerified}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
        loading={loading}
      />
    </div>
  );
}

export default Signup;
