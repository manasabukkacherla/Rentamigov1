import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeadsTable } from "../LeadsTable";
import { Lead } from "../types";
import { CheckCircle, X } from "lucide-react";

type ReportType = 'agent' | 'fraud' | 'other';

interface ReportedLead {
  leadId: string;
  type: ReportType;
  description: string;
  timestamp: string;
}

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('agent');
  const [reportDescription, setReportDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportedLeads, setReportedLeads] = useState<string[]>([]);


  // 🔹 Fetch leads from the backend
  useEffect(() => {
    console.log("Fetching leadss...");
    const fetchLeads = async () => {
      try {
        const userId = sessionStorage.getItem("userId"); // Get userId from session storage
        if (!userId) {
          console.error("❌ No user ID found in session storage.");
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/leads/glead`, {
          params: { userId }, // Send userId as a query parameter
        });

        console.log("Fetched Leads:", response.data); // Debug API Response

        const formattedLeads = response.data.map((lead: any) => ({
          id: lead._id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          propertyName: lead.propertyName,
          flatNo: lead.flatNo,
          status: lead.status,
          createdAt: lead.createdAt
            ? new Date(lead.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A",
        }));

        setLeads(formattedLeads);
      } catch (error) {
        console.error("❌ Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  // 🔹 Handle Export as CSV
  const handleExport = () => {
    const csvContent = [
      ["Name", "Property", "Flat No", "Email", "Phone", "Status"],
      ...leads.map((lead) => [
        lead.name,
        lead.propertyName,
        lead.flatNo,
        lead.email,
        lead.phone,
        lead.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // 🔹 Handle Viewing Lead Details
  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
  };

  // 🔹 Handle Status Change & Update Backend
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/leads/update-status/${leadId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );
        console.log("✅ Status updated successfully!");
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  // 🔹 Send Email
  const handleSendMessage = (lead: Lead) => {
    window.location.href = `mailto:${lead.email}?subject=Regarding your interest in ${lead.propertyName}`;
  };
  const handleSubmitReport = async () => {
    if (selectedLead && reportDescription.trim()) {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
          console.error("❌ No user ID found in session storage.");
          return;
        }

        const newReport = {
          leadId: selectedLead.id,
          name: selectedLead.name,
          number: selectedLead.phone,
          userId: userId,
          type: reportType,
          description: reportDescription,
        };

        // Send data to backend
        const response = await axios.post("http://localhost:8000/api/Report/reports", newReport);

        if (response.status === 201) {
          setReportedLeads([...reportedLeads, selectedLead.id]); // Store only the lead ID
          setShowReportModal(false);
          setShowSuccessModal(true);
          setReportType("agent");
          setReportDescription("");

          setLeads(leads.map(lead =>
            lead.id === selectedLead.id ? { ...lead, status: "Not Interested" } : lead
          ));

          setTimeout(() => {
            setShowSuccessModal(false);
            setShowDetailsModal(false);
          }, 3000);
        }
      } catch (error) {
        console.error("❌ Error submitting report:", error);
      }
    }
  };
  const handleReportLead = () => {
    setShowReportModal(true);
  };
  const isLeadReported = (leadId: string) => {
    return reportedLeads.includes(leadId); // ✅ Check if leadId exists in the reportedLeads array
  };
  

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.flatNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-black mb-4">Leads</h1>
      <LeadsTable
        leads={filteredLeads}
        onExport={handleExport}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onViewDetails={handleViewDetails}
        onStatusChange={handleStatusChange}
        reportedLeads={reportedLeads}      />

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
                  <p className="font-medium">{selectedLead.createdAt}</p>
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
                      <p className="font-medium text-black">Report as Agent</p>
                      <p className="text-xs text-black/60">Reporting User as agent </p>
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