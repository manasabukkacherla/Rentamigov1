import React, { useState, useEffect } from 'react';
import { Filter, Plus, Edit2, Trash } from 'lucide-react';
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

  const navigate = useNavigate();

  // 1) Fetch all leads
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

  const handleFilterChange = (k: keyof typeof filters, v: string) => {
    setFilters(f => ({ ...f, [k]: v }));
  };

  const toggleMessage = (id: string) =>
    setShowMsgFor(prev => (prev === id ? null : id));

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    axios
      .delete(`/api/enquiry/enquirydel/${id}`)
      .then(() => {
        toast.success('Deleted');
        setLeads(l => l.filter(x => x.id !== id));
      })
      .catch(() => toast.error('Delete failed'));
  };

  // const handleEdit = (id: string) =>
  //   navigate(`/leads/edit/${id}`);

  const handleEdit = (id: string) => {
    -    navigate(`/enquiryput/${id}`);
    +    navigate(`/leads/edit/${id}`);
       };

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // 2) Apply filters
  const filtered = leads.filter(l => {
    const dt = new Date(l.createdAt);
    return (
      (!filters.propertyType || l.propertyType === filters.propertyType) &&
      (!filters.createdBy || l.createdBy === filters.createdBy) &&
      (!filters.startDate || dt >= new Date(filters.startDate)) &&
      (!filters.endDate || dt <= new Date(filters.endDate))
    );
  });

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
            onClick={() => navigate('/leads/add')}
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
            {['Name','Email','Phone','Property','Type','By','Message','Date','Actions'].map(col => (
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
    </div>
  );
};

export default Leads;
