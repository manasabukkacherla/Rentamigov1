import React, { useState, useRef ,useEffect} from 'react';
import { User, Bell, Shield, X, Upload, Coins, Building, Phone, MapPin, CheckCircle } from 'lucide-react';
import { User as UserType } from '../types';

export function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserType>({
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'agent',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tokens: 500,
    plan: 'basic',
    planExpiry: '2025-12-31',
    phone: '+1 (555) 123-4567',
    company: 'RentAmigo Properties',
    address: '123 Main St, New York, NY 10001',
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
    }
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const planFeatures = {
    free: ['5 Properties', '10 Leads/month', 'Basic Analytics'],
    basic: ['20 Properties', '50 Leads/month', 'Advanced Analytics', 'Email Support'],
    premium: ['Unlimited Properties', 'Unlimited Leads', 'Premium Analytics', '24/7 Support'],
    enterprise: ['Custom Solutions', 'Dedicated Account Manager', 'API Access', 'Custom Branding']
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
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt={user.fullName}
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
              <div className="text-center">
                <p className="text-sm font-medium text-black">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p className="text-xs text-black/60">Account Type</p>
              </div>
            </div>

            {/* Basic Info Form */}
            <form onSubmit={handleProfileUpdate} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Username</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black/60 mb-1">Phone</label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">Company</label>
                <input
                  type="text"
                  value={user.company}
                  onChange={(e) => setUser({ ...user, company: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-black/60 mb-1">Address</label>
                <input
                  type="text"
                  value={user.address}
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
                    {user.plan.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-black/60 mb-4">Valid until {user.planExpiry}</p>
                <ul className="space-y-2">
                  {planFeatures[user.plan].map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 text-black mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors">
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
                <button className="w-full px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors">
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
                checked={user.notifications.emailNotifications}
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
                checked={user.notifications.smsNotifications}
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
    </div>
  );
}