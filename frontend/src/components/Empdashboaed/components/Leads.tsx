import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdBy: string | null;
  propertyId: string;
  propertyType: string;
  propertyName: string;
  message: string;
  createdAt: string;
}

interface LeadsProps {}

const Leads: React.FC<LeadsProps> = () => {
  const [leads, setLeads] = useState<Array<FormData>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '' as string,
    createdBy: '' as string,
    startDate: '' as string,
    endDate: '' as string
  });

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleMessage = (message: string) => {
    setIsMessageVisible(!isMessageVisible);
    setCurrentMessage(message);
  };
const navigate = useNavigate();
  const fetchLeads = async () => {
    try {
      const response = await axios.get('/api/enquiry/enquiries');
      setLeads(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError('Failed to fetch leads. Please try again.');
      toast.error('Failed to fetch leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Leads</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button
            onClick={() => navigate('/property/add')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {isFilterVisible && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Created By</label>
              <select
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleFilterChange('createdBy', e.target.value)}
              >
                <option value="">All Users</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 p-2 border rounded-lg"
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
                <input
                  type="date"
                  className="flex-1 p-2 border rounded-lg"
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads
                .filter(lead => {
                  const matchesPropertyType = !filters.propertyType || lead.propertyType === filters.propertyType;
                  const matchesCreatedBy = !filters.createdBy || lead.createdBy === filters.createdBy;
                  const matchesDateRange = !filters.startDate || new Date(lead.createdAt) >= new Date(filters.startDate);
                  return matchesPropertyType && matchesCreatedBy && matchesDateRange;
                })
                .map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.propertyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.propertyType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleMessage(lead.message)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {isMessageVisible && currentMessage === lead.message ? 'Hide Message' : 'View Message'}
                    </button>
                    {isMessageVisible && currentMessage === lead.message && (
                      <div className="mt-2 p-3 bg-gray-50 rounded">
                        {currentMessage}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(lead.createdAt).toLocaleDateString()}</div>
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