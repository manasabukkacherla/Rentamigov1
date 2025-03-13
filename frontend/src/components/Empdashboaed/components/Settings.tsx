import React, { useState } from 'react';
import { User, Lock, Bell, Moon, Sun, Camera, Mail, Phone, Shield, Eye, EyeOff, ChevronRight } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  propertyAlerts: boolean;
  maintenanceUpdates: boolean;
  paymentReminders: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    emailNotifications: true,
    propertyAlerts: true,
    maintenanceUpdates: true,
    paymentReminders: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleNotificationToggle = (key: keyof NotificationPreferences) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const tabs = [
    { 
      id: 'profile',
      label: 'Profile',
      icon: User,
      description: 'Manage your personal information and preferences'
    },
    { 
      id: 'security',
      label: 'Security',
      icon: Lock,
      description: 'Update your password and security settings'
    },
    { 
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive notifications'
    }
  ];

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-light mb-8 text-black dark:text-white tracking-tight">Settings</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* New Navigation Cards */}
        <div className="lg:w-80 space-y-4">
          {tabs.map(({ id, label, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group
                ${activeTab === id 
                  ? 'bg-black text-white border-transparent dark:bg-white dark:text-black transform scale-[1.02]'
                  : 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${
                    activeTab === id
                      ? 'text-white dark:text-black'
                      : 'text-gray-400 group-hover:text-black dark:group-hover:text-white'
                  }`} />
                  <span className={`font-medium ${
                    activeTab === id
                      ? 'text-white dark:text-black'
                      : 'text-black dark:text-white'
                  }`}>{label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeTab === id
                    ? 'text-white dark:text-black transform translate-x-1'
                    : 'text-gray-400 group-hover:text-black dark:group-hover:text-white'
                }`} />
              </div>
              <p className={`mt-1 text-sm ${
                activeTab === id
                  ? 'text-gray-100 dark:text-gray-900'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {description}
              </p>
            </button>
          ))}
        </div>

        {/* Content - Same as before */}
        <div className="flex-1 max-w-3xl">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-medium text-black dark:text-white mb-6">Profile Information</h3>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <img
                      src={profile.avatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-black dark:ring-white ring-offset-2"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-90 transition-opacity">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black dark:text-white">Profile Photo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-medium text-black dark:text-white mb-6">Security Settings</h3>
              
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-black dark:text-white mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Protect your account with 2FA
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary text-sm"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Preferences */}
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-medium text-black dark:text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  {
                    key: 'emailNotifications',
                    label: 'Email Notifications',
                    description: 'Receive notifications via email'
                  },
                  {
                    key: 'propertyAlerts',
                    label: 'Property Alerts',
                    description: 'Get notified about property updates and changes'
                  },
                  {
                    key: 'maintenanceUpdates',
                    label: 'Maintenance Updates',
                    description: 'Receive updates about maintenance requests'
                  },
                  {
                    key: 'paymentReminders',
                    label: 'Payment Reminders',
                    description: 'Get reminded about upcoming payments'
                  }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-black dark:text-white">{label}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationPrefs[key as keyof NotificationPreferences]}
                        onChange={() => handleNotificationToggle(key as keyof NotificationPreferences)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;