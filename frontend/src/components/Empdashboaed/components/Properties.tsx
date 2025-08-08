import { useState, useEffect, useCallback } from 'react';
import { Property, PropertyStatus } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Check, AlertCircle, Wrench, Trash, Edit2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const statusIcons = {
  Available: <Check className="w-4 h-4" />,
  Rented: <AlertCircle className="w-4 h-4" />,
  'Under Maintenance': <Wrench className="w-4 h-4" />,
};

const statusClasses = {
  Available: 'bg-green-100 text-green-800',
  Rented: 'bg-yellow-100 text-yellow-800',
  'Under Maintenance': 'bg-red-100 text-red-800',
};

export const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'Available' | 'Rented' | 'Under Maintenance'>('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate();

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/allproperties/all');
      const data = response.data;
      
      const allProperties = [
        ...(data?.data?.commercialRent?.apartment || []),
        ...(data?.data?.commercialRent?.coveredSpace || []),
        ...(data?.data?.commercialRent?.officeSpace || []),
        ...(data?.data?.commercialRent?.others || []),
        ...(data?.data?.commercialRent?.retailStore || []),
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
        ...(data?.data?.residentialLease?.villa || [])
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

  // ✅ Updated handleDelete: calls backend and refreshes
  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Delete this property?')) return;

    const property = properties.find(p => p.propertyId === id);
    if (!property) {
      toast.error('Property not found');
      return;
    }

    const [_, typeCode] = id.split('-');
    const category = typeCode.substring(0, 3); // COM or RES
    const listingType = typeCode.substring(3, 5); // RE, SA or LE
    const propertyType = typeCode.substring(5, 7); // PL, AG, etc.

    const typeMap: Record<string, string> = {
      'PL': 'plots',
      'AG': 'agriculture',
      'CS': 'covered-space',
      'OS': 'office-space',
      'RS': 'retail-store',
      'SH': 'shops',
      'SR': 'showrooms',
      'SD': 'sheds',
      'WH': 'warehouses',
      'OT': 'others',
      'AP': 'apartments',
      'IH': 'independent-houses',
      'BF': 'builder-floors',
      'SS': 'shared-spaces'
    };

    const ptSlug = typeMap[propertyType] || 'others';
    const categorySlug = category === 'COM' ? 'commercial' : 'residential';
    const listingSlug = listingType === 'RE' ? 'rent' : listingType === 'SA' ? 'sell' : 'lease';

    try {
      const response = await axios.delete(`/api/${categorySlug}/${listingSlug}/${ptSlug}/${property.id}`);
      console.log('Delete response:', response.data);

      if (response.data.success) {
        toast.success('Property deleted successfully');
        fetchProperties();
      } else {
        toast.error(response.data.message || 'Failed to delete property');
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      const errMsg = err.response?.data?.message || (err.response?.status === 404 ? 'Property not found' : 'Failed to delete property');
      toast.error(errMsg);
    }
  }, [properties]);

const handleEdit = (propertyId: string) => {
  navigate(`/updatepropertyform/${propertyId}`);
};


  const handleUpdateProperty = async (propertyId: string, updatedData: any) => {
    // ✅ Keep your existing update logic exactly as is here
    /** ... */
  };

  const filteredProperties = filter === 'all' ? properties : properties.filter(p => p.status === filter);

  const handlePropertyClick = (propertyname: string, propertyId: string) => {
    if (propertyname === 'PL' || propertyname === 'AG') {
      navigate(`/agriplot/${propertyId}`);
    } else {
      navigate(`/detailprop/${propertyId}`);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;



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
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-900">Property ID</th>
              <th className="text-left font-bold text-gray-900">Title</th>
              <th className="text-left font-bold text-gray-900">Type</th>
              <th className="text-left font-bold text-gray-900">Location</th>
              <th className="text-left font-bold text-gray-900">Status</th>
              <th className="text-left font-bold text-gray-900">Price</th>
              <th className="text-left font-bold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.propertyId} className="hover">
                <td className="font-mono text-sm">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {property.propertyId}
                  </span>
                </td>
                <td className="font-medium">{property.title}</td>
                <td className="font-medium">{property.type}</td>
                <td>{property.location}</td>
                <td>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusClasses[property.status]}`}>
                    {statusIcons[property.status]}
                    <span className="ml-2">{property.status}</span>
                  </span>
                </td>
                <td>{property.price || 'N/A'}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-secondary btn-sm hover:scale-105 transition-transform"
                      onClick={() => handlePropertyClick(property.propertyId.slice(8,10),property.propertyId)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-outline btn-sm hover:scale-105 transition-transform"
                      onClick={() => handleEdit(property.propertyId)}
                    >
                      <Edit2 className="text-blue-600" />
                    </button>
                    <button 
                      className="btn btn-error btn-sm hover:scale-105 transition-transform"
                      onClick={() => handleDelete(property.propertyId)}
                    >
                      <Trash className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Property Modal */}
      {editModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Property</h2>
              <button onClick={() => { setEditModalOpen(false); setSelectedProperty(null); }}>
                <X className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const updatedData = Object.fromEntries(formData.entries());
              handleUpdateProperty(selectedProperty.propertyId, updatedData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedProperty.title}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={selectedProperty.location}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={selectedProperty.price}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedProperty.status}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => { setEditModalOpen(false); setSelectedProperty(null); }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
