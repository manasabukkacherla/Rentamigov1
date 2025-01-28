import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Building, Map, UserPlus, Apple, UserCog, ExternalLink } from 'lucide-react';
import TermsAndConditions from './TermsAndConditions';

interface SignupProps {
  onSwitchToLogin: () => void;
}

type UserRole = 'owner' | 'agent' | 'tenant' | 'pg' | 'employee';

interface ApiError {
  error: string;
}

function Signup({ onSwitchToLogin }: SignupProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    password: '',
    role: '' as UserRole,
    acceptTerms: false,
  });

  const roles = [
    { value: 'owner', label: 'Owner' },
    { value: 'agent', label: 'Agent' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'pg', label: 'PG' },
    { value: 'employee', label: 'Employee' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/api/sign/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ApiError).error || 'Registration failed');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        password: '',
        role: '' as UserRole,
        acceptTerms: false,
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup
    console.log('Google signup - to be implemented');
  };

  const handleAppleSignup = () => {
    // Implement Apple OAuth signup
    console.log('Apple signup - to be implemented');
  };

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

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-600 text-sm mt-1">Join our property management platform</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
          Registration successful! Redirecting to login...
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
          disabled={loading}
        >
          <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="font-medium">Google</span>
        </button>

        <button
          onClick={handleAppleSignup}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
          disabled={loading}
        >
          <Apple className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Apple</span>
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white/80 text-gray-500">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <UserCog className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              required
              className="w-full pl-12 pr-10 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
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
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              pattern="^[a-zA-Z0-9]{8,20}$"
              title="Username should be 8-20 alphanumeric characters."
              
              disabled={loading}
            />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                disabled={loading}
              />
            </div>
            <div className="text-xs">
              <label className="font-medium text-gray-700">
                Accept Terms and Conditions
              </label>
              <p className="text-gray-500">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  onClick={() => setShowTerms(true)}
                >
                  Terms and Conditions
                  <ExternalLink className="h-3 w-3" />
                </button>
                {' '}and confirm that I have read the Privacy Policy.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
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
    </div>
  );
}

export default Signup;