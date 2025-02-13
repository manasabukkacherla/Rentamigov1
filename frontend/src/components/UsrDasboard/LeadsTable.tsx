import React from "react";
import { Lead } from "./types";
import {
  Download,
  Search,
  Mail,
  Phone,
  Calendar,
  Building,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface LeadsTableProps {
  leads: Lead[];
  onExport: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onViewDetails: (lead: Lead) => void;
  onStatusChange: (leadId: string, status: Lead["status"]) => void;
  reportedLeads: string[];
}

const getStatusColor = (status: Lead["status"]) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800";
    case "Contacted":
      return "bg-yellow-100 text-yellow-800";
    case "Interested":
      return "bg-green-100 text-green-800";
    case "Not Interested":
      return "bg-red-100 text-red-800";
    case "Converted":
      return "bg-purple-100 text-purple-800";
    case "Visited":
      return "bg-indigo-100 text-indigo-800";
    case "RNR":
      return "bg-orange-100 text-orange-800";
    case "Call Back":
      return "bg-cyan-100 text-cyan-800";
    case "No Requirement":
      return "bg-slate-100 text-slate-800";
    case "Different Requirement":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function LeadsTable({
  leads,
  onExport,
  searchTerm,
  onSearchChange,
  onViewDetails,
  reportedLeads,
}: LeadsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-black/10">
      {/* Search and Export Header */}
      <div className="p-2 sm:p-4 border-b border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black placeholder:text-black/30"
          />
        </div>
        <button
          onClick={onExport}
          className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-lg hover:bg-black/80 transition-colors text-sm whitespace-nowrap"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden divide-y divide-black/10">
        {leads.map((lead) => {
          const isReported = reportedLeads.includes(lead.id);

          return (
            <div
              key={lead.id}
              className={`p-3 space-y-2 ${isReported ? "bg-red-50" : ""}`}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-black flex items-center gap-2">
                  {lead.name}
                  {isReported && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center text-sm text-black/70">
                  <Building className="w-4 h-4 mr-2 text-black" />
                  {lead.propertyName} • {lead.flatNo}
                </div>
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center text-sm text-black/70 hover:text-black"
                >
                  <Mail className="w-4 h-4 mr-2 text-black" />
                  {lead.email}
                </a>
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center text-sm text-black/70 hover:text-black"
                >
                  <Phone className="w-4 h-4 mr-2 text-black" />
                  {lead.phone}
                </a>
                <div className="flex items-center text-sm text-black/70">
                  <Calendar className="w-4 h-4 mr-2 text-black" />
                  {lead.date}
                </div>
              </div>

              <button
                onClick={() => onViewDetails(lead)}
                className="w-full mt-2 px-4 py-2 bg-black/5 text-black text-sm rounded-lg hover:bg-black/10 transition-colors flex items-center justify-center"
                disabled={isReported}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-black/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Lead Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Property
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Flat No
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-black/60 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black/10">
            {leads.map((lead) => {
              const isReported = reportedLeads.includes(lead.id);

              function onStatusChange(_id: string, _arg1: string): void {
                throw new Error("Function not implemented.");
              }

              return (
                <tr
                  key={lead.id}
                  className={`hover:bg-black/5 transition-colors ${
                    isReported ? "bg-red-50" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    <div className="flex items-center gap-2">
                      {lead.name}
                      {isReported && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    {lead.propertyName}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    {lead.flatNo}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:text-blue-600"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    <a
                      href={`tel:${lead.phone}`}
                      className="hover:text-blue-600"
                    >
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        onStatusChange(
                          lead.id,
                          e.target.value as Lead["status"]
                        )
                      }
                      className={`px-2 py-1 rounded-full text-xs border-0 ${getStatusColor(
                        lead.status
                      )}`}
                      disabled={isReported}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Visited">Visited</option>
                      <option value="Interested">Interested</option>
                      <option value="Not Interested">Not Interested</option>
                      <option value="RNR">RNR</option>
                      <option value="Call Back">Call Back</option>
                      <option value="No Requirement">No Requirement</option>
                      <option value="Different Requirement">
                        Different Requirement
                      </option>
                      <option value="Converted">Converted</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                    {lead.createdAt ? lead.createdAt : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-center">
                    <button
                      onClick={() => onViewDetails(lead)}
                      className="inline-flex items-center px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isReported}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
