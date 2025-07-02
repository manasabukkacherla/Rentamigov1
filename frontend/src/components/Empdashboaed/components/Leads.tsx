import React,{useState} from 'react';
import { Phone, Calendar, Clock, Search, Plus, Filter } from 'lucide-react';
// import type { Lead } from '@/types';
import { Property } from '../types';

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface LeadsProps {
  leads: Array<FormData>;
  // property?: Property;
}

const LeadStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return "bg-blue-100 text-blue-800";
      case 'contacted':
        return "bg-green-100 text-green-800";
      case 'viewing-scheduled':
        return "bg-yellow-100 text-yellow-800";
      case 'negotiating':
        return "bg-purple-100 text-purple-800";
      case 'converted':
        return "bg-purple-100 text-purple-800";
      case 'lost':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`${baseClasses} ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Leads: React.FC<LeadsProps> = ({ leads }) => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">Leads Management</h2>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </div>
        <button className="btn btn-secondary flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Property</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Priority</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">{lead.propertyInterest}</div>
                  </td>
                  <td className="py-4 px-6">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-medium ${
                      lead.priority === 'high' 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">{lead.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Phone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Clock className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;