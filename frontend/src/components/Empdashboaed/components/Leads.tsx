import React, { useState, useEffect, useCallback } from 'react';
import { Filter, Plus, Edit2, Trash, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface Lead {
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

interface EnquiryForm {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyType: string;
  propertyName: string;
  message: string;
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMsgFor, setShowMsgFor] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    propertyType: '',
    createdBy: '',
    startDate: '',
    endDate: ''
  });
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState<EnquiryForm>({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    propertyType: '',
    propertyName: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleFilterChange = useCallback((k: keyof typeof filters, v: string) => {
    setFilters(f => ({ ...f, [k]: v }));
  }, []);

  const toggleMessage = useCallback((id: string) =>
    setShowMsgFor(prev => (prev === id ? null : id)),
  []
  );

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    axios
      .delete(`/api/enquiry/enquirydel/${id}`)
      .then(() => {
        toast.success('Deleted');
        setLeads(l => l.filter(x => x.id !== id));
      })
      .catch(() => toast.error('Delete failed'));
  }, []);

  const handleEdit = useCallback((id: string) => {
    navigate(`/leads/edit/${id}`);
  }, [navigate]);

  useEffect(() => {
    axios
      .get('/api/enquiry/enquiries')
      .then(res => {
        const data: Lead[] = res.data.data.map((e: any) => ({
          id: e._id,
          name: e.name,
          email: e.email,
          phone: e.phone,
          createdBy: e.createdBy,
          propertyId: e.propertyId,
          propertyType: e.propertyType,
          propertyName: e.propertyName,
          message: e.message,
          createdAt: e.createdAt
        }));
        setLeads(data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load leads.');
        toast.error('Failed to load leads.');
      })
      .finally(() => setLoading(false));
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEnquiry = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/enquiry/enquiry', enquiryForm);
      if (response.data.success) {
        toast.success('Enquiry created successfully');
        setShowEnquiryModal(false);
        setEnquiryForm({
          name: '',
          email: '',
          phone: '',
          propertyId: '',
          propertyType: '',
          propertyName: '',
          message: ''
        });
        // Refresh leads list
        const res = await axios.get('/api/enquiry/enquiries');
        const data: Lead[] = res.data.data.map((e: any) => ({
          id: e._id,
          name: e.name,
          email: e.email,
          phone: e.phone,
          createdBy: e.createdBy,
          propertyId: e.propertyId,
          propertyType: e.propertyType,
          propertyName: e.propertyName,
          message: e.message,
          createdAt: e.createdAt
        }));
        setLeads(data);
      } else {
        toast.error(response.data.message || 'Failed to create enquiry');
      }
    } catch (error: any) {
      console.error('Error creating enquiry:', error);
      toast.error(error.response?.data?.message || 'Failed to create enquiry');
    } finally {
      setIsSubmitting(false);
    }
  }, [enquiryForm]);

  const handleInputChange = useCallback((field: keyof EnquiryForm, value: string) => {
    setEnquiryForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const filtered = leads.filter(l => {
    const dt = new Date(l.createdAt);
    return (
      (!filters.propertyType || l.propertyType === filters.propertyType) &&
      (!filters.createdBy || l.createdBy === filters.createdBy) &&
      (!filters.startDate || dt >= new Date(filters.startDate)) &&
      (!filters.endDate || dt <= new Date(filters.endDate))
    );
  });

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Leads</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(v => !v)}
            className="px-3 py-1 border rounded flex items-center gap-1"
          >
            <Filter /> Filters
          </button>
          <button
            onClick={() => setShowEnquiryModal(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1"
          >
            <Plus /> Add
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 rounded grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Type</label>
            <select
              className="w-full border p-2 rounded"
              value={filters.propertyType}
              onChange={e => handleFilterChange('propertyType', e.target.value)}
            >
              <option value="">All</option>
              <option value="rent">rent</option>
              <option value="sell">sell</option>
              <option value="lease">lease</option>
            </select>
          </div>
          <div>
            <label>By</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Created By"
              value={filters.createdBy}
              onChange={e => handleFilterChange('createdBy', e.target.value)}
            />
          </div>
          <div>
            <label>Date</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 border p-2 rounded"
                value={filters.startDate}
                onChange={e => handleFilterChange('startDate', e.target.value)}
              />
              <input
                type="date"
                className="flex-1 border p-2 rounded"
                value={filters.endDate}
                onChange={e => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {['Name','Email','Phone','PropertyId','Property Name','Type','By','Message','Date','Actions'].map(col => (
              <th key={col} className="px-3 py-2 text-sm font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-4 text-center text-gray-500">
                No leads found
              </td>
            </tr>
          ) : filtered.map(l => (
            <tr key={l.id} className="hover:bg-gray-50">
              <td className="px-3 py-2">{l.name}</td>
              <td className="px-3 py-2">{l.email}</td>
              <td className="px-3 py-2">{l.phone}</td>
              <td className="px-3 py-2">{l.propertyId}</td>
              <td className="px-3 py-2">{l.propertyName}</td>
              <td className="px-3 py-2">{l.propertyType}</td>
              <td className="px-3 py-2">{l.createdBy}</td>
              <td className="px-3 py-2">
                <button
                  onClick={() => toggleMessage(l.id)}
                  className="text-blue-600 underline"
                >
                  {showMsgFor === l.id ? 'Hide' : 'View'}
                </button>
                {showMsgFor === l.id && (
                  <div className="mt-1 p-2 bg-gray-50 rounded">{l.message}</div>
                )}
              </td>
              <td className="px-3 py-2">
                {new Date(l.createdAt).toLocaleDateString()}
              </td>
              <td className="px-3 py-2 flex gap-2">
                <button onClick={() => handleEdit(l.id)}>
                  <Edit2 className="text-blue-600" />
                </button>
                <button onClick={() => handleDelete(l.id)}>
                  <Trash className="text-red-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <div className="border-b border-gray-200 p-5">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Add New Enquiry</h3>
                <button
                  onClick={() => setShowEnquiryModal(false)}
                  className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">Fill in the details to create a new enquiry</p>
            </div>
            <form onSubmit={handleSubmitEnquiry} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={enquiryForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={enquiryForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property ID</label>
                  <input
                    type="text"
                    value={enquiryForm.propertyId}
                    onChange={(e) => handleInputChange('propertyId', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    placeholder="Enter property ID"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <select
                    value={enquiryForm.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="rent">For Rent</option>
                    <option value="sell">For Sale</option>
                    <option value="lease">For Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Name</label>
                  <input
                    type="text"
                    value={enquiryForm.propertyName}
                    onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    placeholder="Enter property name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    value={enquiryForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-opacity-50 transition-colors"
                    rows={4}
                    placeholder="Enter your message..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 inline-block mr-2" />
                      Create Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
