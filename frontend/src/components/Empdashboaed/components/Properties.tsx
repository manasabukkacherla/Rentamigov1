import { useState, useEffect } from 'react';
import { Property } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Check, AlertCircle, Wrench, Edit2, Trash2, Plus, Search, X, Filter } from 'lucide-react';
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
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'agent' | 'Rentamigo'>('all');
  const [assignForm, setAssignForm] = useState({ status: 'active', tokenPerLead: '', verified: false });
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  // Filter properties based on the status filter and search term
  const filteredProperties = properties.filter((property) => {
    const matchesStatus = filter === 'all' || property.status === filter;
    const matchesSearch = property.propertyId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black tracking-tight">Properties</h1>
              <p className="text-gray-600 mt-2">Manage and organize your property portfolio</p>
            </div>
            
            <button 
              onClick={() => navigate('/updatepropertyform')}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Property ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Title</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Location</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Owner</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Posted</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProperties.map((property, index) => (
                  <tr key={property.propertyId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm font-mono">
                        {property.propertyId}
                      </code>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">{property.title}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{property.type}</td>
                    <td className="py-4 px-6 text-gray-600">{property.location}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusClasses[property.status]}`}>
                        {statusIcons[property.status]}
                        <span className="ml-2">{property.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{property.price || '0'}</td>
                    <td className="py-4 px-6 text-gray-600">{property.metadata?.createdBy || 'Unknown'}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {property.postedDate ? new Date(property.postedDate).toLocaleDateString() : new Date().toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleEdit(property.propertyId)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 text-gray-600 hover:text-black"
                          title="Edit Property"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.propertyId)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-150 text-gray-600 hover:text-red-600"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAssignClick(property)}
                          className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-150 flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Assign</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No properties found</div>
                <div className="text-gray-500">Try adjusting your search or filter criteria</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {isAssignModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Assign Lead Tokens</h3>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property ID</label>
                <input
                  type="text"
                  value={selectedProperty.propertyId}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 font-mono text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  value={selectedProperty.propertyName || selectedProperty.title}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={assignForm.status}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Per Lead</label>
                <input
                  type="number"
                  value={assignForm.tokenPerLead}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, tokenPerLead: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter tokens"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="verified"
                  checked={assignForm.verified}
                  onChange={(e) => setAssignForm(prev => ({ ...prev, verified: e.target.checked }))}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                />
                <label htmlFor="verified" className="ml-3 text-sm font-medium text-gray-700">
                  Verified
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAssign}
                disabled={!assignForm.tokenPerLead}
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}