import React, { useState } from 'react';
import { Search, Eye, FileText, X, Phone, Mail, User, Calendar, MapPin, MessageCircle } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status?: string;
  source?: string;
  location?: string;
  createdAt?: string;
  lastContact?: string;
  notes?: string;
}

// Company contact information
const COMPANY_PHONE = '+1234567890'; // Replace with your actual company phone number

// Sample data - in a real app, this would come from an API
const leadsData: Lead[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '+1 (555) 123-4567',
    status: 'New',
    source: 'Website',
    location: 'New York, NY',
    createdAt: '2024-03-15',
    lastContact: '2024-03-20',
    notes: 'Interested in 2-bedroom apartments in downtown area'
  },
  { 
    id: 2, 
    name: 'Emma Wilson', 
    email: 'emma.wilson@example.com', 
    phone: '+1 (555) 234-5678',
    status: 'Follow Up',
    source: 'Referral',
    location: 'Boston, MA',
    createdAt: '2024-03-14',
    lastContact: '2024-03-19',
    notes: 'Looking for pet-friendly properties'
  },
];

export function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const filteredLeads = leadsData.filter(lead =>
    Object.values(lead).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleReportLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsReportModalOpen(true);
  };

  const handleWhatsAppRedirect = () => {
    // Remove any non-numeric characters from the company phone number
    const cleanPhone = COMPANY_PHONE.replace(/\D/g, '');
    // Open WhatsApp with the company phone number
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold">Leads</h2>
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table for larger screens */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <tr 
                  key={lead.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReportLead(lead)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Generate Report"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile screens */}
        <div className="sm:hidden divide-y divide-gray-200">
          {filteredLeads.map((lead, index) => (
            <div key={lead.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{lead.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">#{index + 1}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewLead(lead)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleReportLead(lead)}
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Generate Report"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-500">
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  {lead.email}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  {lead.phone}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
              <span className="font-medium">8</span> results
            </p>
            <nav className="flex justify-center sm:justify-end">
              <ul className="flex gap-1">
                <li>
                  <button className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                </li>
                <li>
                  <button className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold">Lead Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-5 w-5" />
                    <span className="font-medium">Name</span>
                  </div>
                  <p className="text-gray-900">{selectedLead.name}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">Email</span>
                  </div>
                  <p className="text-gray-900">{selectedLead.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Phone</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="text-gray-900">{selectedLead.phone}</p>
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="flex items-center justify-center gap-1.5 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Contact Us
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-900">{selectedLead.location}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Created At</span>
                  </div>
                  <p className="text-gray-900">{selectedLead.createdAt}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Last Contact</span>
                  </div>
                  <p className="text-gray-900">{selectedLead.lastContact}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-600">Notes</h4>
                <p className="text-gray-900">{selectedLead.notes}</p>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold">Generate Report</h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Lead Information Report</span>
                  <span className="text-sm text-gray-500">#{selectedLead.id}</span>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Report Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="detailed">Detailed Report</option>
                    <option value="summary">Summary Report</option>
                    <option value="activity">Activity Report</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Include Sections
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Contact Information</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Activity History</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                      <span>Notes & Comments</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Generating report for:', selectedLead);
                  setIsReportModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}