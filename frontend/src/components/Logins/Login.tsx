import React, { useState } from 'react';
import { Mail, Lock, LogIn, Apple, ExternalLink } from 'lucide-react';
import TermsAndConditions from './TermsAndConditions';
import ForgotPassword from './ForgotPassword';

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: (email: string) => void;
}

interface GoogleAccount {
  email: string;
  name: string;
  picture?: string;
}

interface AppleAccount {
  email: string;
  name: string;
}

function Login({ onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false);
  const [showAppleAccounts, setShowAppleAccounts] = useState(false);
  const [googleAccounts, setGoogleAccounts] = useState<GoogleAccount[]>([]);
  const [appleAccounts, setAppleAccounts] = useState<AppleAccount[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Call onLoginSuccess with the user's email
      onLoginSuccess(formData.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const accounts = await new Promise<GoogleAccount[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { email: 'user1@gmail.com', name: 'User One', picture: 'https://ui-avatars.com/api/?name=User+One' },
            { email: 'user2@gmail.com', name: 'User Two', picture: 'https://ui-avatars.com/api/?name=User+Two' },
          ]);
        }, 500);
      });
      
      setGoogleAccounts(accounts);
      setShowGoogleAccounts(true);
      setShowAppleAccounts(false);
    } catch (error) {
      console.error('Failed to get Google accounts:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const accounts = await new Promise<AppleAccount[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { email: 'user1@icloud.com', name: 'User One' },
            { email: 'user2@icloud.com', name: 'User Two' },
          ]);
        }, 500);
      });
      
      setAppleAccounts(accounts);
      setShowAppleAccounts(true);
      setShowGoogleAccounts(false);
    } catch (error) {
      console.error('Failed to get Apple accounts:', error);
    }
  };

  const handleSelectAccount = async (email: string, type: 'google' | 'apple') => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/oauth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, provider: type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      onLoginSuccess(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
      setShowGoogleAccounts(false);
      setShowAppleAccounts(false);
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="relative">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
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
          
          {showGoogleAccounts && googleAccounts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
              {googleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSelectAccount(account.email, 'google')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <img
                    src={account.picture}
                    alt={account.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={handleAppleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <Apple className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Apple</span>
          </button>

          {showAppleAccounts && appleAccounts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20">
              {appleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleSelectAccount(account.email, 'apple')}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white/80 text-gray-500">Or continue with</span>
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              <LogIn className="h-5 w-5" />
              Sign In
            </>
          )}
        </button>

        <div className="text-sm text-gray-500 mt-4">
          By signing in, you agree to our{' '}
          <button
            className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            onClick={() => setShowTerms(true)}
          >
            Terms and Conditions
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
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

export default Login;