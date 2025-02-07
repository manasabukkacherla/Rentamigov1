import React, { useState } from 'react';
import { User, Bell, Shield, X } from 'lucide-react';

export function Settings() {
  const [user, setUser] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
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

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-6">Settings</h1>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
          <div className="flex items-center mb-4 sm:mb-6">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-black mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold text-black">Profile Settings</h2>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">Full Name</label>
              <input
                type="text"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-black/60 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
            >
              Save Changes
            </button>
          </form>
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