import { useState, useEffect } from 'react';
import { Property, PropertyStatus } from '../../../components/allpropertiespage/types';
import axios from 'axios';
import { Search, Plus, Filter, Check, AlertCircle, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';





const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const navigate = useNavigate();
const handlePropertyClick = (propertyId: string) => {
  navigate(`/detailprop/${propertyId}`);
};
  const statusIcons = {
    Available: <Check className="w-4 h-4" />,
    Rented: <AlertCircle className="w-4 h-4" />,
    'Under Maintenance': <Wrench className="w-4 h-4" />,
  };

  const statusClasses = {
    Available: 'bg-gray-900 text-white',
    Rented: 'bg-gray-200 text-gray-900',
    'Under Maintenance': 'bg-gray-500 text-white',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{property.title}</h3>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses[property.status]}`}>
          {statusIcons[property.status]}
          <span className="ml-1.5">{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
        </span>
      </div>
      
      <div className="space-y-2 mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{property.type}</p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button className="btn btn-secondary text-sm">Edit</button>
        <button className="btn btn-primary text-sm" 
        key={property.id}
        onClick={() => handlePropertyClick(property.propertyId)}>View Details</button>
      </div>
    </div>
  );
};

export const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'Available' | 'Rented' | 'Under Maintenance'>('all');

  const filterOptions = ['all', 'Available', 'Rented', 'Under Maintenance'] as const;

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
          ...(data?.data?.residentialRent?.builderFloor || []),
          ...(data?.data?.residentialRent?.independent || []),
          
          ...(data?.data?.residentialSale?.apartment || []),
          ...(data?.data?.residentialSale?.builderFloor || []),
          ...(data?.data?.residentialSale?.independentHouse || []),
          ...(data?.data?.residentialSale?.plot || []),
          
          ...(data?.data?.residentialLease?.apartment || []),
          ...(data?.data?.residentialLease?.builderFloor || []),
          ...(data?.data?.residentialLease?.independentHouse || [])
        ];

        setProperties(allProperties.filter(Boolean)); // Filter out any null/undefined values
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center py-8">No properties found</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">Properties</h2>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="flex text-align w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === option
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties
          .filter((property) => filter === 'all' || property.status === filter)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </div>
    </div>
  );
};

export default Properties;