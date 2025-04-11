import React, { useState } from 'react';
import { Search, Filter, MoreVertical, AlertCircle, Ban, FileText, Clock, Shield } from 'lucide-react';
import type { User } from '../types';

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    status: 'active',
    subscriptionType: 'premium',
    subscriptionStart: '2025-01-01',
    subscriptionEnd: '2026-01-01',
    lastActive: '2025-03-15T09:00:00Z'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    status: 'suspended',
    subscriptionType: 'basic',
    subscriptionStart: '2025-02-01',
    subscriptionEnd: '2025-08-01',
    lastActive: '2025-03-14T15:30:00Z'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    status: 'blocked',
    subscriptionType: 'trial',
    subscriptionStart: '2025-03-01',
    subscriptionEnd: '2025-03-15',
    lastActive: '2025-03-10T11:15:00Z'
  }
];

const UserStatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    'active': "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
    'suspended': "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white",
    'blocked': "bg-gray-500 text-white"
  };

  const statusIcons = {
    'active': <Shield className="w-3 h-3 mr-1" />,
    'suspended': <Clock className="w-3 h-3 mr-1" />,
    'blocked': <Ban className="w-3 h-3 mr-1" />
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const SubscriptionBadge: React.FC<{ type: User['subscriptionType'] }> = ({ type }) => {
  const baseClasses = "px-2.5 py-1 rounded-full text-xs font-medium";
  const typeClasses = {
    'trial': "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white",
    'basic': "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white",
    'premium': "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
  };

  return (
    <span className={`${baseClasses} ${typeClasses[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-10">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                File Report
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                <Ban className="w-4 h-4 mr-2" />
                Block User
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <UserStatusBadge status={user.status} />
          <SubscriptionBadge type={user.subscriptionType} />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Subscription Start</span>
            <span className="text-gray-900 dark:text-white">{formatDate(user.subscriptionStart)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Subscription End</span>
            <span className="text-gray-900 dark:text-white">{formatDate(user.subscriptionEnd)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Last Active</span>
            <span className="text-gray-900 dark:text-white">{formatDate(user.lastActive)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Users: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const filterOptions = ['all', 'active', 'suspended', 'blocked'];
  const subscriptionFilters = ['all', 'trial', 'basic', 'premium'];
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    if (filter !== 'all' && user.status !== filter) return false;
    if (subscriptionFilter !== 'all' && user.subscriptionType !== subscriptionFilter) return false;
    return true;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">Users Management</h2>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === option
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {subscriptionFilters.map((option) => (
              <button
                key={option}
                onClick={() => setSubscriptionFilter(option)}
                className={`px-4 py-2 text-sm font-medium ${
                  subscriptionFilter === option
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;