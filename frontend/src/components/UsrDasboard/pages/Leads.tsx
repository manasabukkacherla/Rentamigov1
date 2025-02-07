import React, { useState } from 'react';
import { LeadsTable } from '../LeadsTable';
import { Lead } from '../types';

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    propertyName: 'Luxury Villa with Pool',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    date: '2024-03-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    propertyName: 'Modern City Apartment',
    email: 'jane@example.com',
    phone: '+91 98765 43211',
    date: '2024-03-14',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    propertyName: 'Seaside Condo',
    email: 'mike@example.com',
    phone: '+91 98765 43212',
    date: '2024-03-13',
  },
];

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Property', 'Email', 'Phone', 'Date'],
      ...leads.map(lead => [
        lead.name,
        lead.propertyName,
        lead.email,
        lead.phone,
        lead.date
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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4 md:mb-6">Leads</h1>
      <LeadsTable 
        leads={filteredLeads} 
        onExport={handleExport}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}