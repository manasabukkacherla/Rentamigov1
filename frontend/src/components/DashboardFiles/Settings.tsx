import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Crown, Lock, Eye, EyeOff } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  userType: 'admin' | 'tenant' | 'pg' | 'owner' | 'agent' | 'employee';
  phone: string;
  city: string;
  state: string;
  address: string;
  membership: 'silver' | 'gold' | 'platinum';
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Property Manager',
    userType: 'admin',
    phone: '+1 (555) 123-4567',
    city: 'New York',
    state: 'NY',
    address: '123 Business Avenue, Suite 456',
    membership: 'silver'
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const membershipColors = {
    silver: 'bg-gray-100 text-gray-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-purple-100 text-purple-800'
  };

  const userTypes = [
    { value: 'admin', label: 'Administrator' },
    { value: 'tenant', label: 'Tenant' },
    { value: 'pg', label: 'PG' },
    { value: 'owner', label: 'Property Owner' },
    { value: 'agent', label: 'Real Estate Agent' },
    { value: 'employee', label: 'Employee' }
  ];

  const handleMembershipUpdate = (newMembership: 'silver' | 'gold' | 'platinum') => {
    setProfile(prev => ({ ...prev, membership: newMembership }));
    setIsEditing(false);
  };

  const handlePasswordChange = (field: keyof PasswordForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm(prev => ({ ...prev, [field]: e.target.value }));
    setPasswordError('');
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = () => {
    // Password validation
    if (!passwordForm.currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    // Here you would typically make an API call to update the password
    console.log('Updating password...');
    
    // Reset form after successful update
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    // Show success message or handle response
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Profile Settings</h2>
          <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${membershipColors[profile.membership]}`}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold capitalize">{profile.membership} Member</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span className="font-medium">Full Name</span>
              </div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email</span>
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Building className="h-5 w-5" />
                <span className="font-medium">Role</span>
              </div>
              <input
                type="text"
                value={profile.role}
                onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span className="font-medium">User Type</span>
              </div>
              <select
                value={profile.userType}
                onChange={(e) => setProfile(prev => ({ ...prev, userType: e.target.value as UserProfile['userType'] }))}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {userTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <span className="font-medium">Phone</span>
              </div>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-medium">Change Password</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <span className="text-sm text-gray-600">Current Password</span>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange('currentPassword')}
                    className="w-full pl-3 pr-10 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-600">New Password</span>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange('newPassword')}
                    className="w-full pl-3 pr-10 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-600">Confirm New Password</span>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    className="w-full pl-3 pr-10 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-red-600">{passwordError}</p>
                </div>
              )}

              <div className="sm:col-span-2">
                <button
                  onClick={handleUpdatePassword}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Address Information</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <span className="text-sm text-gray-600">City</span>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm text-gray-600">State</span>
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <span className="text-sm text-gray-600">Address</span>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Membership Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Membership Status</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {['silver', 'gold', 'platinum'].map((membership) => (
                    <button
                      key={membership}
                      onClick={() => handleMembershipUpdate(membership as 'silver' | 'gold' | 'platinum')}
                      className={`p-3 sm:p-4 rounded-lg border ${
                        profile.membership === membership
                          ? `${membershipColors[membership as keyof typeof membershipColors]} border-2`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base font-semibold capitalize">{membership}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Update Membership
              </button>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="border-t pt-6">
            <button
              onClick={() => console.log('Saving changes...', profile)}
              className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}