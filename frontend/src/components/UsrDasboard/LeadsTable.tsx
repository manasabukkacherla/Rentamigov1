import React from 'react';
import { Lead } from './types';
import { Download, Search, Mail, Phone, Calendar, Building } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  onExport: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function LeadsTable({ leads, onExport, searchTerm, onSearchChange }: LeadsTableProps) {
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
            className="w-full pl-10 pr-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-black/30"
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
        {leads.map((lead) => (
          <div key={lead.id} className="p-3 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-black">{lead.name}</h3>
              <span className="text-xs text-black/60">{lead.date}</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center text-sm text-black/70">
                <Building className="w-4 h-4 mr-2 text-black" />
                {lead.propertyName}
              </div>
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center text-sm text-black/70 hover:text-red-500"
              >
                <Mail className="w-4 h-4 mr-2 text-black" />
                {lead.email}
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center text-sm text-black/70 hover:text-red-500"
              >
                <Phone className="w-4 h-4 mr-2 text-black" />
                {lead.phone}
              </a>
              <div className="flex items-center text-sm text-black/70">
                <Calendar className="w-4 h-4 mr-2 text-black" />
                {lead.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-black/5">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Lead Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Property
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-black/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-black/5 transition-colors">
                <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                  {lead.propertyName}
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                  <a href={`mailto:${lead.email}`} className="hover:text-red-500">
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                  <a href={`tel:${lead.phone}`} className="hover:text-red-500">
                    {lead.phone}
                  </a>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap text-black">
                  {lead.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}