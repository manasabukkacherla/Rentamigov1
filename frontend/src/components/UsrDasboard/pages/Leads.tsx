import React, { useState } from 'react';
import { LeadsTable } from '../LeadsTable';
import { Lead } from '../types';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    propertyName: 'Luxury Villa with Pool',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    date: '2024-03-15',
    flatNo: 'A-101',
    status: 'New'
  },
  {
    id: '2',
    name: 'Jane Smith',
    propertyName: 'Modern City Apartment',
    email: 'jane@example.com',
    phone: '+91 98765 43211',
    date: '2024-03-14',
    flatNo: 'B-202',
    status: 'Interested'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    propertyName: 'Seaside Condo',
    email: 'mike@example.com',
    phone: '+91 98765 43212',
    date: '2024-03-13',
    flatNo: 'C-303',
    status: 'Contacted'
  },
];

type ReportType = 'agent' | 'fraud' | 'other';

interface ReportedLead {
  leadId: string;
  type: ReportType;
  description: string;
  timestamp: string;
}

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('agent');
  const [reportDescription, setReportDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportedLeads, setReportedLeads] = useState<ReportedLead[]>([]);

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Property', 'Flat No', 'Email', 'Phone', 'Date', 'Status'],
      ...leads.map(lead => [
        lead.name,
        lead.propertyName,
        lead.flatNo,
        lead.email,
        lead.phone,
        lead.date,
        lead.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const handleSendMessage = (lead: Lead) => {
    window.location.href = `mailto:${lead.email}?subject=Regarding your interest in ${lead.propertyName}`;
  };

  const handleReportLead = () => {
    setShowReportModal(true);
  };

  const handleSubmitReport = () => {
    if (selectedLead && reportDescription.trim()) {
      const newReport: ReportedLead = {
        leadId: selectedLead.id,
        type: reportType,
        description: reportDescription,
        timestamp: new Date().toISOString()
      };
      
      setReportedLeads([...reportedLeads, newReport]);
      setShowReportModal(false);
      setShowSuccessModal(true);
      
      // Reset form
      setReportType('agent');
      setReportDescription('');
      
      // Mark the lead as reported in the table
      setLeads(leads.map(lead => 
        lead.id === selectedLead.id 
          ? { ...lead, status: 'Not Interested' }
          : lead
      ));

      // Close success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        setShowDetailsModal(false);
      }, 3000);
    }
  };

  const isLeadReported = (leadId: string) => {
    return reportedLeads.some(report => report.leadId === leadId);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.flatNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 md:mb-6">Leads</h1>
      <LeadsTable 
        leads={filteredLeads} 
        onExport={handleExport}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onViewDetails={handleViewDetails}
        onStatusChange={handleStatusChange}
        reportedLeads={reportedLeads.map(r => r.leadId)}
      />

      {/* Lead Details Modal */}
      {showDetailsModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-black">{selectedLead.name}</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Lead Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-black/60">Property</p>
                  <p className="font-medium">{selectedLead.propertyName}</p>
                </div>
                <div>
                  <p className="text-sm text-black/60">Flat No</p>
                  <p className="font-medium">{selectedLead.flatNo}</p>
                </div>
                <div>
                  <p className="text-sm text-black/60">Email</p>
                  <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-black/60">Phone</p>
                  <a href={`tel:${selectedLead.phone}`} className="text-blue-600 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-black/60">Date</p>
                  <p className="font-medium">{selectedLead.date}</p>
                </div>
                <div>
                  <p className="text-sm text-black/60">Status</p>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                    className="mt-1 block w-full px-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    disabled={isLeadReported(selectedLead.id)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visited">Visited</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="RNR">RNR (Ringing No Response)</option>
                    <option value="Call Back">Call Back</option>
                    <option value="No Requirement">No Requirement</option>
                    <option value="Different Requirement">Different Requirement</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-black/10">
                <button
                  onClick={() => handleSendMessage(selectedLead)}
                  className="flex-1 px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors"
                  disabled={isLeadReported(selectedLead.id)}
                >
                  Send Message
                </button>
                <button
                  onClick={handleReportLead}
                  className="flex-1 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  disabled={isLeadReported(selectedLead.id)}
                >
                  Report Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-black">Report Lead</h2>
                <p className="text-sm text-black/60 mt-1">Report inappropriate or suspicious lead behavior</p>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-2 hover:bg-black/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black/70 mb-2">Report Type</label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-black/10 rounded-lg cursor-pointer hover:bg-black/5">
                    <input
                      type="radio"
                      name="reportType"
                      value="agent"
                      checked={reportType === 'agent'}
                      onChange={(e) => setReportType(e.target.value as ReportType)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-black">Report Agent</p>
                      <p className="text-xs text-black/60">Report an agent for unprofessional behavior</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-black/10 rounded-lg cursor-pointer hover:bg-black/5">
                    <input
                      type="radio"
                      name="reportType"
                      value="fraud"
                      checked={reportType === 'fraud'}
                      onChange={(e) => setReportType(e.target.value as ReportType)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-black">Report Fraud</p>
                      <p className="text-xs text-black/60">Report suspicious or fraudulent activity</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-black/10 rounded-lg cursor-pointer hover:bg-black/5">
                    <input
                      type="radio"
                      name="reportType"
                      value="other"
                      checked={reportType === 'other'}
                      onChange={(e) => setReportType(e.target.value as ReportType)}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium text-black">Other</p>
                      <p className="text-xs text-black/60">Report for other reasons</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black/70 mb-2">Description</label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Please provide details about the issue..."
                  className="w-full px-3 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[100px]"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitReport}
                  className="flex-1 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  disabled={!reportDescription.trim()}
                >
                  Submit Report
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-2 bg-black/5 text-black text-sm rounded-lg hover:bg-black/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 text-center max-w-sm w-full animate-fade-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Report Submitted</h3>
            <p className="text-black/60 mb-4">
              Thank you for your report. Our admin team will review it and take appropriate action.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}