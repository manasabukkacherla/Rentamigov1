import React, { useState, useRef, useEffect } from 'react';
import { User, Bell, Shield, X, Upload, Coins, CheckCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface Plan {
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface TokenPack {
  tokens: number;
  price: number;
  savings?: string;
  recommended?: boolean;
}

const subscriptionPlans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    features: [
      '5 Properties',
      '10 Leads/month',
      'Basic Analytics',
      'Email Support'
    ]
  },
  {
    name: 'Basic',
    price: 999,
    features: [
      '20 Properties',
      '50 Leads/month',
      'Advanced Analytics',
      'Email Support',
      'Priority Listing'
    ],
    recommended: true
  },
  {
    name: 'Premium',
    price: 2499,
    features: [
      'Unlimited Properties',
      'Unlimited Leads',
      'Premium Analytics',
      '24/7 Support',
      'Featured Listings',
      'Custom Branding'
    ]
  },
  {
    name: 'Enterprise',
    price: 4999,
    features: [
      'Custom Solutions',
      'Dedicated Account Manager',
      'API Access',
      'Custom Branding',
      'White Label Solution',
      'Custom Analytics'
    ]
  }
];

const tokenPacks: TokenPack[] = [
  {
    tokens: 100,
    price: 499
  },
  {
    tokens: 500,
    price: 1999,
    savings: '20% savings',
    recommended: true
  },
  {
    tokens: 1000,
    price: 3499,
    savings: '30% savings'
  },
  {
    tokens: 2000,
    price: 5999,
    savings: '40% savings'
  }
];

export function Settings() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType>({
    id: '',
    fullName: '',
    username: '',
    email: '',
    role: '',
    photoUrl: '',
    tokens: 0,
    plan: 'free',
    planExpiry: '',
    phone: '',
    company: '',
    address: '',
    notifications: {
      emailNotifications: false,
      smsNotifications: false,
    }
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showTokensModal, setShowTokensModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTokenPack, setSelectedTokenPack] = useState<TokenPack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Retrieved user from session storage:', parsedUser);

        if (parsedUser.id) {
          fetchUserDetails(parsedUser.id);
        } else {
          console.error('User ID is missing in session storage.');
          setError('User ID not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error parsing session storage:', error);
        setError('Error reading user data.');
        setLoading(false);
      }
    } else {
      console.error('No user data found in session storage.');
      setError('No user data found.');
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      console.log('Fetching user details for ID:', userId);

      const response = await fetch(`http://localhost:8000/api/sign/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response Status:', response.status);

      const data = await response.json();
      console.log('Fetched user data:', data);

      if (response.ok) {
        setUser(data.user);
      } else {
        console.error('Error fetching user details:', data.error);
        setError(data.error || 'Failed to fetch user details.');
      }
    } catch (error) {
      console.error('Network error fetching user details:', error);
      setError('❌ Network error while fetching user details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({
          ...prev,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (type: 'emailNotifications' | 'smsNotifications') => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  
    const storedUser = sessionStorage.getItem('user');
    let userId = '';
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.id || parsedUser._id;
      } catch (error) {
        console.error('❌ Error parsing session storage:', error);
        setError('Error reading user data. Please log in again.');
        toast.error('Error reading user data. Please log in again.');
        return;
      }
    } else {
      console.error('❌ No user data found in session storage.');
      setError('No user data found. Please log in again.');
      toast.error('No user data found. Please log in again.');
      return;
    }
  
    console.log('🔄 Using User ID from sessionStorage:', userId);
  
    if (!userId) {
      console.error('❌ Error: User ID is missing. Cannot update profile.');
      setError('User ID not found. Please try again.');
      toast.error('User ID not found. Please try again.');
      return;
    }
  
    fetch(`http://localhost:8000/api/sign/user/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Profile update response:', data);
  
        if (data.success || data.message === 'User updated successfully') {
          toast.success('✅ Profile updated successfully!');
        } else {
          console.error('❌ Backend returned an error:', data.error);
          setError(data.error || 'Failed to update profile.');
          toast.error(data.error || 'Failed to update profile.');
        }
      })
      .catch((error) => {
        console.error('❌ Network error updating profile:', error);
        setError('Network error while updating profile.');
        toast.error('Network error while updating profile.');
      });
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('All password fields are required.');
      return;
    }
  
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
  
    const storedUser = sessionStorage.getItem('user');
    let userId = '';
  
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.id || parsedUser._id;
      } catch (error) {
        console.error('❌ Error parsing session storage:', error);
        setError('Error reading user data. Please log in again.');
        return;
      }
    } else {
      console.error('❌ No user data found in session storage.');
      setError('No user data found. Please log in again.');
      return;
    }
  
    console.log('🔄 Changing password for User ID:', userId);
  
    try {
      const response = await fetch(`http://localhost:8000/api/sign/user/update-password/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });
  
      const data = await response.json();
      console.log('✅ Password change response:', data);
  
      if (data.success) {
        alert('✅ Password changed successfully!');
        setShowPasswordModal(false);
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error updating password:', error);
      alert('❌ Network error while updating password.');
    }
  };

  const handlePurchase = () => {
    alert('Payment processing would be implemented here');
    setShowPaymentModal(false);
    setSelectedPlan(null);
    setSelectedTokenPack(null);
  };

  const handleUpgradePlan = () => {
    navigate(`/plans?tab=subscriptions&currentPlan=${user.plan}`);
  };

  const handleBuyTokens = () => {
    navigate(`/plans?tab=tokens&tokens=${user.tokens}`);
  };

  if (loading) return <p className="text-center text-gray-600">Loading user details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const planFeatures = {
    free: ['5 Properties', '10 Leads/month', 'Basic Analytics'],
    basic: ['20 Properties', '50 Leads/month', 'Advanced Analytics', 'Email Support'],
    premium: ['Unlimited Properties', 'Unlimited Leads', 'Premium Analytics', '24/7 Support'],
    enterprise: ['Custom Solutions', 'Dedicated Account Manager', 'API Access', 'Custom Branding']
  };

  const getPlanDisplay = () => {
    if (!user.plan) return 'FREE';
    return user.plan.toUpperCase();
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Settings</h1>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Photo & Basic Info */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-6">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">Profile Settings</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Profile Photo and Stats */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={user?.photoUrl || 'https://via.placeholder.com/150'}
                  alt={user?.fullName || 'User'}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-black/10"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              
              {/* User Stats */}
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="text-center p-2 bg-black/5 rounded-lg w-full">
                  <p className="text-sm font-medium text-black">{user?.role || 'N/A'}</p>
                  <p className="text-xs text-black/60">Account Type</p>
                </div>
                <div className="text-center p-2 bg-black/5 rounded-lg w-full">
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="w-4 h-4 text-black" />
                    <p className="text-sm font-medium text-black">{user.tokens}</p>
                  </div>
                  <p className="text-xs text-black/60">Available Tokens</p>
                </div>
              </div>
            </div>

            {/* Basic Info Form */}
            <form onSubmit={handleProfileUpdate} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Username</label>
                <input
                  type="text"
                  value={user?.username || ''}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Phone</label>
                <input
                  type="tel"
                  value={user?.phone || ''}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">Company</label>
                <input
                  type="text"
                  value={user?.company || ''}
                  onChange={(e) => setUser({ ...user, company: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">Address</label>
                <input
                  type="text"
                  value={user?.address || ''}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Subscription & Tokens */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-6">
            <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">Subscription & Tokens</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Current Plan */}
            <div className="space-y-4">
              <div className="bg-black/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-black">Current Plan</h3>
                  <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                    {getPlanDisplay()}
                  </span>
                </div>
                <p className="text-sm text-black/60 mb-4">Valid until {user.planExpiry}</p>
                <ul className="space-y-2">
                  {Object.keys(planFeatures).includes(user.plan) ? (
                    planFeatures[user.plan].map((feature, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 text-black mr-2" />
                        {feature}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-red-500">Invalid Plan Selected</li>
                  )}
                </ul>
                <button 
                  onClick={handleUpgradePlan}
                  className="w-full mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Tokens */}
            <div className="space-y-4">
              <div className="bg-black/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-black">Available Tokens</h3>
                  <span className="text-xl font-bold text-black">{user.tokens}</span>
                </div>
                <p className="text-sm text-black/60 mb-4">Use tokens to boost your listings</p>
                <button 
                  onClick={handleBuyTokens}
                  className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                >
                  Buy More Tokens
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">Notification Preferences</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={user.notifications?.emailNotifications || false}
                onChange={() => handleNotificationChange('emailNotifications')}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-black/20 text-black focus:ring-red-500"
              />
              <label className="ml-2 text-sm sm:text-base text-black">
                Email notifications for new leads
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={user.notifications?.smsNotifications || false}
                onChange={() => handleNotificationChange('smsNotifications')}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded border-black/20 text-black focus:ring-red-500"
              />
              <label className="ml-2 text-sm sm:text-base text-black">
                SMS notifications for urgent updates
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">Security</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full px-4 py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
            >
              Change Password
            </button>
            <button
              onClick={() => alert('2FA setup would be implemented here')}
              className="w-full px-4 py-2 bg-black/5 text-black text-sm sm:text-base rounded-lg hover:bg-black/10 transition-colors"
            >
              Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 bg-black/5 text-black text-sm sm:text-base rounded-lg hover:bg-black/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (selectedPlan || selectedTokenPack) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black">
                {selectedPlan ? 'Upgrade to ' + selectedPlan.name : `Purchase ${selectedTokenPack?.tokens} Tokens`}
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-black/5 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-black/60">Amount</span>
                  <span className="text-lg font-semibold text-black">
                    ₹{selectedPlan?.price || selectedTokenPack?.price}
                  </span>
                </div>
                {selectedTokenPack?.savings && (
                  <div className="mt-1 text-sm text-green-600 text-right">
                    {selectedTokenPack.savings}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/60">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <CreditCard className="w-5 h-5 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/60">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/60">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors mt-6"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}