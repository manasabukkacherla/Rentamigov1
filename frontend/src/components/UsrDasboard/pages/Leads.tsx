import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeadsTable } from "../LeadsTable";
import { Lead } from "../types";
import { AlertTriangle, CheckCircle, X } from "lucide-react";

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<"agent" | "fraud" | "other">("agent");
  const [reportDescription, setReportDescription] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reportedLeads, setReportedLeads] = useState<string[]>([]);

  // 🔹 Fetch leads from the backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const storedUserId = sessionStorage.getItem("userId"); // ✅ Get logged-in userId from session
        if (!storedUserId) {
          console.warn("⚠️ No userId found in sessionStorage!");
          return;
        }
  
        const response = await axios.get(`http://localhost:8000/api/leads?userId=${storedUserId}`);
  
        console.log("🔍 Fetched Leads:", response.data); // ✅ Debug API Response
  
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
  const handleStatusChange = async (leadId: string | undefined, newStatus: Lead["status"]) => {
    if (!leadId) {
        console.error("❌ Error: leadId is undefined!");
        return;
    }

    try {
        const response = await axios.put(
            `http://localhost:8000/api/leads/update-status/${leadId}`,
            { status: newStatus }
        );

        if (response.status === 200) {
            const { updatedLead } = response.data;

            setLeads((prevLeads) =>
                prevLeads.map((lead) =>
                    lead.id === leadId
                        ? {
                            ...lead,
                            status: newStatus,
                            createdAt: lead.createdAt, // ✅ Preserve createdAt
                        }
                        : lead
                )
            );
            console.log("✅ Status updated successfully!");
        } else {
            console.error("❌ Failed to update status:", response);
        }
    } catch (error) {
        console.error("❌ Error updating status:", error);
    }
};


  
  // 🔹 Send Email
  const handleSendMessage = (lead: Lead) => {
    window.location.href = `mailto:${lead.email}?subject=Regarding your interest in ${lead.propertyName}`;
  };

  // 🔹 Report a Lead
  const handleReportLead = () => {
    setShowReportModal(true);
  };

  // 🔹 Submit Lead Report
  const handleSubmitReport = () => {
    if (selectedLead && reportDescription.trim()) {
      setReportedLeads([...reportedLeads, selectedLead.id]);
      setShowReportModal(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        setShowDetailsModal(false);
      }, 3000);
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.flatNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 md:mb-6">
        Leads
      </h1>
      <LeadsTable
        leads={filteredLeads}
        onExport={handleExport}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onViewDetails={handleViewDetails}
        onStatusChange={handleStatusChange}
        reportedLeads={reportedLeads} // ✅ Fixed missing prop issue
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
            </div>

            <div className="flex gap-3 pt-4 border-t border-black/10">
              <button onClick={() => handleSendMessage(selectedLead)} className="flex-1 px-4 py-2 bg-black text-white text-sm rounded-lg">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
