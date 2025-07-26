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
  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Delete this property?')) return;
    
    try {
      const property = properties.find(p => p.propertyId === id);
      if (!property) return;

      const categoryCode = property.propertyId.slice(3, 6);
      const listingCode = property.propertyId.slice(6, 8);
      const typeCode = property.propertyId.slice(8, 10);

      const category = categoryCode === 'COM' ? 'commercial' : 'residential';
      const listing = listingCode === 'RE' ? 'rent' : 
                      listingCode === 'SA' ? 'sale' : 
                      'lease';

      let type: string;
      switch(typeCode) {
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

      await axios.delete(`/api/${category}/${listing}/${type}/${id}`);
      toast.success('Property deleted successfully');
      // Refresh properties list
      fetchProperties();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete property');
    }
  }, [properties]);

  const handleEdit = useCallback((id: string) => {
    const property = properties.find(p => p.propertyId === id);
    if (property) {
      setSelectedProperty(property);
      setEditModalOpen(true);
    }
  }, [properties]);

  const handleUpdateProperty = async (propertyId: string, updatedData: Partial<Property>) => {
    try {
      const property = properties.find(p => p.propertyId === propertyId);
      if (!property) return;

      const categoryCode = property.propertyId.slice(3, 6);
      const listingCode = property.propertyId.slice(6, 8);
      const typeCode = property.propertyId.slice(8, 10);

      const category = categoryCode === 'COM' ? 'commercial' : 'residential';
      const listing = listingCode === 'RE' ? 'rent' : 
                      listingCode === 'SA' ? 'sale' : 
                      'lease';

      let type: string;
      switch(typeCode) {
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

      await axios.put(`/api/${category}/${listing}/${type}/${propertyId}`, updatedData);
      toast.success('Property updated successfully');
      setEditModalOpen(false);
      setSelectedProperty(null);
      // Refresh properties list
      fetchProperties();
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update property');
    }
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/allproperties/all');
        const data = response.data;
        
        // Extract properties from all sections
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

    fetchProperties();
  }, []);

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.status === filter);

  const handlePropertyClick = (propertyname:string,propertyId: string) => {
    if(propertyname=='PL' || propertyname=='AG'){
      navigate(`/agriplot/${propertyId}`);
    }
    else{
      navigate(`/detailprop/${propertyId}`);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

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
                <td>
                  <button 
                    className="btn btn-secondary btn-sm hover:scale-105 transition-transform"
                    onClick={() => handlePropertyClick(property.propertyId.slice(8,10),property.propertyId)}
                  >
                    View Details
                  </button>
                </td>
                <td className="px-3 py-2 flex gap-2">
                  <button onClick={() => handleEdit(property.propertyId)}>
                    <Edit2 className="text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(property.propertyId)}>
                    <Trash className="text-red-600" />
                  </button>
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