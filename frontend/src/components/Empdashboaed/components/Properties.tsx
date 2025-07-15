import { useState, useEffect, useCallback } from 'react';
import { Property, PropertyStatus } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Check, AlertCircle, Wrench, Trash, Edit2 } from 'lucide-react';
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
  const navigate = useNavigate();
  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Delete this property?')) return;
    
    // Parse property ID to get category, listing, and type
    const propertyId = id;
    const categoryCode = propertyId.slice(3, 6);
    const listingCode = propertyId.slice(6, 8);
    const typeCode = propertyId.slice(8, 10);

    // Map codes to route parameters
    const category = categoryCode === 'COM' ? 'commercial' : 'residential';
    const listing = listingCode === 'RE' ? 'rent' : 
                    listingCode === 'SA' ? 'sale' : 
                    'lease';

    // Get the type based on the type code
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

    axios
      .delete(`/api/${category}/${listing}/${type}/${propertyId}`)
      .then(() => {
        toast.success('Property deleted successfully');
        setProperties(l => l.filter(x => x.propertyId !== propertyId));
      })
      .catch((error) => {
        console.error('Delete error:', error);
        toast.error(error.response?.data?.message || 'Failed to delete property');
      });
  }, []);

  const handleEdit = useCallback((id: string) => {
    // Parse property ID to get category, listing, and type
    const propertyId = id;
    const categoryCode = propertyId.slice(3, 6);
    const listingCode = propertyId.slice(6, 8);
    const typeCode = propertyId.slice(8, 10);

    // Map codes to route parameters
    const category = categoryCode === 'COM' ? 'commercial' : 'residential';
    const listing = listingCode === 'RE' ? 'rent' : 
                    listingCode === 'SA' ? 'sale' : 
                    'lease';

    // Get the type based on the type code
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

    navigate(`/properties/edit/${category}/${listing}/${type}/${propertyId}`);
  }, [navigate]);
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
    </div>
  );
};

export default Properties;