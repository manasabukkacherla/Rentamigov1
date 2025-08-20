import { useState, useEffect } from 'react';
import { Property } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Check, AlertCircle, Wrench, Edit2, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type StatusType = 'Available' | 'Rented' | 'Under Maintenance';

const statusIcons: Record<StatusType, React.ReactElement> = {
  Available: <Check className="w-4 h-4" />,
  Rented: <AlertCircle className="w-4 h-4" />,
  'Under Maintenance': <Wrench className="w-4 h-4" />,
};

const statusClasses: Record<StatusType, string> = {
  Available: 'bg-green-100 text-green-800',
  Rented: 'bg-yellow-100 text-yellow-800',
  'Under Maintenance': 'bg-red-100 text-red-800',
};

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'Available' | 'Rented' | 'Under Maintenance'>('all');
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'agent' | 'rentamigo'>('all');
  const [assignForm, setAssignForm] = useState({ status: 'active', tokenPerLead: '', verified: false });
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/allproperties/all', {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
});
      const data = response.data;

      const allProperties = [
        ...(data?.data?.commercialRent?.apartment || []),
        ...(data?.data?.commercialRent?.coveredSpace || []),
        ...(data?.data?.commercialRent?.officeSpace || []),
        ...(data?.data?.commercialRent?.others || []),
        ...(data?.data?.commercialRent?.retailStore || []),
          ...(data?.data?.residentialRent?.independent || []), 
        ...(data?.data?.commercialRent?.shed || []),
        ...(data?.data?.commercialRent?.warehouse || []),
        ...(data?.data?.commercialRent?.plot || []),
        ...(data?.data?.commercialRent?.shop || []),
        ...(data?.data?.commercialRent?.showroom || []),

        ...(data?.data?.commercialSale?.apartment || []),
        ...(data?.data?.commercialSale?.coveredSpace || []),
        ...(data?.data?.commercialSale?.officeSpace || []),
        ...(data?.data?.commercialSale?.others || []),
        ...(data?.data?.commercialSale?.retailStore || []),
        ...(data?.data?.commercialSale?.shed || []),
        ...(data?.data?.commercialSale?.warehouse || []),
        ...(data?.data?.commercialSale?.plot || []),
        ...(data?.data?.commercialSale?.shop || []),
        ...(data?.data?.commercialSale?.showroom || []),

        ...(data?.data?.commercialLease?.apartment || []),
        ...(data?.data?.commercialLease?.coveredSpace || []),
        ...(data?.data?.commercialLease?.officeSpace || []),
        ...(data?.data?.commercialLease?.others || []),
        ...(data?.data?.commercialLease?.retailStore || []),
        ...(data?.data?.commercialLease?.shed || []),
        ...(data?.data?.commercialLease?.warehouse || []),
        ...(data?.data?.commercialLease?.plot || []),
        ...(data?.data?.commercialLease?.shop || []),
        ...(data?.data?.commercialLease?.showroom || []),

        ...(data?.data?.residentialRent?.apartment || []),
        ...(data?.data?.residentialRent?.house || []),
        ...(data?.data?.residentialRent?.villa || []),

        ...(data?.data?.residentialSale?.apartment || []),
        ...(data?.data?.residentialSale?.house || []),
        ...(data?.data?.residentialSale?.villa || []),

        ...(data?.data?.residentialLease?.apartment || []),
        ...(data?.data?.residentialLease?.house || []),
        ...(data?.data?.residentialLease?.villa || []),
      ];

      setProperties(allProperties);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEdit = (propertyId: string) => {
    const categoryCode = propertyId.slice(3, 6);
    const listingCode = propertyId.slice(6, 8);
    const typeCode = propertyId.slice(8, 10);

    const category = categoryCode === 'COM' ? 'commercial' : 'residential';
    const listing = listingCode === 'RE' ? 'rent' : listingCode === 'SA' ? 'sale' : 'lease';

    let type: string;
    switch (typeCode) {
      case 'AP': type = 'apartment'; break;
      case 'BF': type = 'builderfloor'; break;
      case 'IH': type = 'independenthouse'; break;
      case 'AG': type = 'agriculture'; break;
      case 'CS': type = 'coveredspace'; break;
      case 'OS': type = 'officespace'; break;
      case 'RS': type = 'retailstore'; break;
      case 'SH': type = 'shop'; break;
      case 'PL': type = 'plot'; break;
      case 'WH': type = 'warehouse'; break;
      case 'SD': type = 'shed'; break;
      case 'SR': type = 'showroom'; break;
      case 'OT': type = 'others'; break;
      default: type = 'apartment'; break;
    }

    navigate(`/properties/edit/${category}/${listing}/${type}/${propertyId}`);
  };

  const handleDelete = (propertyId: string) => {
    if (!window.confirm('Delete this property?')) return;

    const categoryCode = propertyId.slice(3, 6);
    const listingCode = propertyId.slice(6, 8);
    const typeCode = propertyId.slice(8, 10);

    const category = categoryCode === 'COM' ? 'commercial' : 'residential';
    const listing = listingCode === 'RE' ? 'rent' : listingCode === 'SA' ? 'sale' : 'lease';

    let type: string;
    switch (typeCode) {
      case 'AP': type = 'apartment'; break;
      case 'BF': type = 'builderfloor'; break;
      case 'IH': type = 'independenthouse'; break;
      case 'AG': type = 'agriculture'; break;
      case 'CS': type = 'coveredspace'; break;
      case 'OS': type = 'officespace'; break;
      case 'RS': type = 'retailstore'; break;
      case 'SH': type = 'shop'; break;
      case 'PL': type = 'plot'; break;
      case 'WH': type = 'warehouse'; break;
      case 'SD': type = 'shed'; break;
      case 'SR': type = 'showroom'; break;
      case 'OT': type = 'others'; break;
      default: type = 'apartment'; break;
    }

    axios
      .delete(`/api/properties/${category}/${listing}/${type}/${propertyId}`)
      .then(() => {
        toast.success('Property deleted successfully');
        setProperties(l => l.filter(x => x.propertyId !== propertyId));
        fetchProperties();
      })
      .catch((error) => {
        console.error('Delete error:', error);
        toast.error(error.response?.data?.message || 'Failed to delete property');
      });
  };

  const handleAssignClick = (property: Property) => {
    setSelectedProperty(property);
    setAssignForm({ status: 'active', tokenPerLead: '', verified: false });
    setIsAssignModalOpen(true);
  };

  const handleSaveAssign = async () => {
    if (!selectedProperty) return;

    const payload = {
      propertyId: selectedProperty.propertyId,
      propertyName: selectedProperty.propertyName || selectedProperty.title,
      status: assignForm.status,
      tokenPerLead: Number(assignForm.tokenPerLead),
      verified: assignForm.verified,
    };

    try {
      await axios.post('/api/lead-token', payload);
      toast.success('Lead token assigned successfully');
      setIsAssignModalOpen(false);
    } catch (error) {
      console.error('Failed to assign token:', error);
      toast.error('Failed to assign token');
    }
  };

  const filteredProperties = filter === 'all'
    ? properties
    : properties.filter(p => p.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Properties</h2>
        <div className="flex items-center space-x-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="select select-bordered w-48"
          >
            <option value="all">All Properties</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'owner' | 'agent' | 'rentamigo')}
            className="select select-bordered w-48"
          >
            <option value="all">All Types</option>
            <option value="owner">Owner</option>
            <option value="agent">Agent</option>
            <option value="rentamigo">Propamigo</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Price</th>
              <th>Owner</th>
              <th>Posted On</th>
              <th>Actions</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.propertyId}>
                <td><span className="bg-gray-100 px-2 py-1 rounded">{property.propertyId}</span></td>
                <td>{property.title}</td>
                <td>{property.type}</td>
                <td>{property.location}</td>
                <td>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusClasses[property.status]}`}>
                    {statusIcons[property.status]}<span className="ml-2">{property.status}</span>
                  </span>
                </td>
                <td>{property.price || '0'}</td>
                <td>{property.metadata?.createdBy || 'Unknown'}</td>
                <td>{property.postedDate ? new Date(property.postedDate).toLocaleDateString() : new Date().toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(property.propertyId)} className="text-blue-600 hover:text-blue-900"><Edit2 className="w-5 h-5 inline-block" /></button>
                  <button onClick={() => handleDelete(property.propertyId)} className="text-red-600 hover:text-red-900 ml-2"><Trash2 className="w-5 h-5 inline-block" /></button>
                </td>
                <td>
                  <button onClick={() => handleAssignClick(property)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded flex items-center text-sm">
                    <Plus className="w-4 h-4 mr-1" /> Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAssignModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Assign Lead Tokens</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Property ID</label>
                <input type="text" value={selectedProperty.propertyId} disabled className="mt-1 w-full border rounded px-3 py-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Name</label>
                <input type="text" value={selectedProperty.propertyName || selectedProperty.title} disabled className="mt-1 w-full border rounded px-3 py-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={assignForm.status}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, status: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Token Per Lead</label>
                <input
                  type="number"
                  value={assignForm.tokenPerLead}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, tokenPerLead: e.target.value }))}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Enter tokens"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={assignForm.verified}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, verified: e.target.checked }))}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Verified</label>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAssign}
                  disabled={!assignForm.tokenPerLead}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
