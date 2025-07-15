import { useState, useEffect } from 'react';
import { Property, PropertyStatus } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Check, AlertCircle, Wrench, Mail, Phone, User, Edit2, Trash2 } from 'lucide-react';
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'Available' | 'Rented' | 'Under Maintenance'>('all');
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'agent' | 'rentamigo'>('all');
  const navigate = useNavigate();

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

  const handlePropertyClick = (propertyname:string,propertyId: string) => {
    if(propertyname=='PL' || propertyname=='AG'){
      navigate(`/agriplot/${propertyId}`);
    }
    else{
      navigate(`/detailprop/${propertyId}`);
    }
  };

  const handleEdit = (propertyId: string) => {
    // Parse property ID to get category, listing, and type
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
  };

  const handleDelete = (propertyId: string) => {
    if (!window.confirm('Delete this property?')) return;
    
    // Parse property ID to get category, listing, and type
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
  };

  const handleContactClick = (property: Property) => {
    setSelectedProperty(property);
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedProperty(null);
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
            <option value="rentamigo">Rentamigo</option>
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
              <th className="text-left font-bold text-gray-900">Owner</th>
              <th className="text-left font-bold text-gray-900">Posted On</th>
              
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
                <td>{property.price || '0'}</td>
                <td>{property.metadata?.postedBy?.name || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.postedDate ? new Date(property.postedDate).toLocaleDateString() : 
                   new Date().toLocaleDateString()}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-green-600 hover:text-green-900"
                    onClick={() => handleContactClick(property)}
                  >
                    <Mail className="w-4 h-4 inline-block mr-1" />
                    Contact
                  </button>
                </td>
                <td className="space-x-2">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleEdit(property.propertyId)}
                  >
                    <Edit2 className="w-4 h-4 inline-block mr-1" />
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(property.propertyId)}
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Contact Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseContactModal}
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">{selectedProperty.metadata?.contact?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">{selectedProperty.metadata?.contact?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">{selectedProperty.metadata?.contact?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}