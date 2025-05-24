import React from 'react';
import { Users, Phone, Mail, MapPin, Calendar, Check, X } from 'lucide-react';

const Leads: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Leads</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
            Export Leads
          </button>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <option>All Leads</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Total Leads</h3>
              <p className="text-2xl font-semibold mt-1">156</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Converted</h3>
              <p className="text-2xl font-semibold mt-1">98</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Pending</h3>
              <p className="text-2xl font-semibold mt-1">42</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Lost</h3>
              <p className="text-2xl font-semibold mt-1">16</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PG Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  name: "John Doe",
                  phone: "+91 98765 43210",
                  email: "john@example.com",
                  pg: "Sunshine PG",
                  location: "Koramangala",
                  date: "2024-03-15",
                  status: "New"
                },
                {
                  name: "Jane Smith",
                  phone: "+91 98765 43211",
                  email: "jane@example.com",
                  pg: "Green Valley",
                  location: "HSR Layout",
                  date: "2024-03-14",
                  status: "Contacted"
                },
                {
                  name: "Mike Johnson",
                  phone: "+91 98765 43212",
                  email: "mike@example.com",
                  pg: "City Living",
                  location: "Indiranagar",
                  date: "2024-03-13",
                  status: "Converted"
                }
              ].map((lead, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 mr-1" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.pg}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lead.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {lead.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-green-600 hover:text-green-900">
                        <Check className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <X className="h-5 w-5" />
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