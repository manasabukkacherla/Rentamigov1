import React, { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Filter, Coins } from 'lucide-react';
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

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    createdBy: '',
    startDate: '',
    endDate: ''
  });
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [leadTokenMap, setLeadTokenMap] = useState<Record<string, number>>({});
  const [userTokens, setUserTokens] = useState<number>(0);
  const [viewedLeads, setViewedLeads] = useState<string[]>([]);

  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/enquiry/enquiries');

      const leadsWithId: FormData[] = response.data.data.map((lead: any) => ({
        id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        createdBy: lead.createdBy,
        propertyId: lead.propertyId,
        propertyType: lead.propertyType,
        propertyName: lead.propertyName,
        message: lead.message,
        createdAt: lead.createdAt,
      }));

      setLeads(leadsWithId);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setError('Failed to fetch leads. Please try again.');
      toast.error('Failed to fetch leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadTokens = async () => {
    try {
      const res = await axios.get('/api/lead-token');
      const tokenMap: Record<string, number> = {};
      res.data.forEach((item: any) => {
        tokenMap[item.propertyId] = item.tokenPerLead;
      });
      setLeadTokenMap(tokenMap);
    } catch (err) {
      console.error('Error fetching lead tokens:', err);
    }
  };

  const fetchUserTokens = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await axios.get(`/api/usertoken/${userId}`);
      setUserTokens(response.data.tokens);
      setViewedLeads(response.data.viewedLeads || []);
      localStorage.setItem("viewedLeads", JSON.stringify(response.data.viewedLeads || []));
    } catch (err) {
      console.error("Error fetching user tokens:", err);
    }
  };

  const handleViewLead = async (lead: FormData) => {
    const tokensRequired = leadTokenMap[lead.propertyId] || 0;

    if (viewedLeads.includes(lead.id)) {
      setSelectedLeadId(prev => (prev === lead.id ? null : lead.id));
      return;
    }

    if (userTokens >= tokensRequired) {
      try {
        const userId = sessionStorage.getItem("userId");
        const res = await axios.post("/api/usertoken/deduct", {
          userId,
          amount: tokensRequired,
          leadId: lead.id,
        });

        toast.success(`Deducted ${tokensRequired} token(s).`);
        const updatedViewed = [...viewedLeads, lead.id];
        setViewedLeads(updatedViewed);
        localStorage.setItem("viewedLeads", JSON.stringify(updatedViewed));
        setUserTokens(res.data.remaining);
        setSelectedLeadId(lead.id);
      } catch (error) {
        console.error("Token deduction error:", error);
        toast.error("Failed to deduct tokens.");
      }
    } else {
      toast.warn("Insufficient tokens to view this lead.");
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchLeadTokens();
    fetchUserTokens();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Leads (Tokens: <span className="text-green-600">{userTokens}</span>)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {isFilterVisible ? 'Hide Filters' : 'Filters'}
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
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">All Types</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={filters.createdBy}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Created by name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Tokens</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Created By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads
              .filter((lead) => {
                const matchesPropertyType = !filters.propertyType || lead.propertyType === filters.propertyType;
                const matchesCreatedBy = !filters.createdBy || lead.createdBy?.toLowerCase().includes(filters.createdBy.toLowerCase());
                const matchesDateRange =
                  (!filters.startDate || new Date(lead.createdAt) >= new Date(filters.startDate)) &&
                  (!filters.endDate || new Date(lead.createdAt) <= new Date(filters.endDate));
                return matchesPropertyType && matchesCreatedBy && matchesDateRange;
              })
              .map((lead) => {
                const isViewed = viewedLeads.includes(lead.id);
                return (
                  <React.Fragment key={lead.id}>
                    <tr className="hover:bg-gray-50">
                      {/* Token column always visible */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewLead(lead)}
                          className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium hover:bg-yellow-200"
                          title={`Click to use ${leadTokenMap[lead.propertyId] || 0} tokens to view`}
                        >
                          <Coins className="w-4 h-4" />
                          {leadTokenMap[lead.propertyId] || 0}
                        </button>
                      </td>

                      {/* All other columns blurred conditionally */}
                      {[
                        lead.name,
                        lead.email,
                        lead.phone,
                        lead.propertyName,
                        lead.propertyType,
                        lead.createdBy,
                      ].map((value, i) => (
                        <td key={i} className={`px-6 py-4 whitespace-nowrap ${!isViewed ? 'blur-sm' : ''}`}>
                          {value}
                        </td>
                      ))}

                      <td className={`px-6 py-4 whitespace-nowrap ${!isViewed ? 'blur-sm' : ''}`}>
                        {isViewed || selectedLeadId === lead.id ? (
                          <span className="text-blue-600 cursor-pointer" onClick={() => setSelectedLeadId(null)}>
                            Hide
                          </span>
                        ) : (
                          <span className="text-blue-600 cursor-pointer" onClick={() => handleViewLead(lead)}>
                            View ({leadTokenMap[lead.propertyId] || 0} tokens)
                          </span>
                        )}
                      </td>

                      <td className={`px-6 py-4 whitespace-nowrap ${!isViewed ? 'blur-sm' : ''}`}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>

                    {selectedLeadId === lead.id && (
                      <tr>
                        <td colSpan={9} className="px-6 py-4 bg-gray-50">
                          <p className="font-medium">Message:</p>
                          <p className="mt-1">{lead.message || 'No message available'}</p>
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={() => handleCall(lead.phone)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                            >
                              Call
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
