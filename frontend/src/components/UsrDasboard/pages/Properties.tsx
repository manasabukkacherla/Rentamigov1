import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "../types/index";
import { PropertyCard } from "../components/PropertyCard";
import { LoadingOverlay } from "../LoadingOverlay";
import axios from "axios";
import Allproperties from "@/components/allpropertiespage/App";

// Type guard to check if the error is an AxiosError
interface AxiosError {
  isAxiosError: boolean;
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function isAxiosError(error: unknown): error is AxiosError {
  return error !== null && 
         typeof error === 'object' && 
         'isAxiosError' in error && 
         (error as { isAxiosError: unknown }).isAxiosError === true;
}

export function Properties() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<"Available" | "Rented" | "Pending" | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [intentFilter, setIntentFilter] = useState<string>("All");
  const [newProperty, setNewProperty] = useState<Property []>([]);
  
  // Memoized filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = !searchTerm || 
        (property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         property.location?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = filter === 'All' || property.status === filter;
      const matchesType = typeFilter === 'All' || property.type === typeFilter;
      const matchesIntent = intentFilter === 'All' || property.intent === intentFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesIntent;
    });
  }, [properties, searchTerm, filter, typeFilter, intentFilter]);

  // Fetch all properties on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchAllProperties = async () => {
      try {
        // Get user data and token from session storage
        const storedUser = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");
        
        if (!storedUser) {
          throw new Error("No user found in session");
        }
        
        const userData = JSON.parse(storedUser);
        const userId = userData.id;
        if (!userId) {
          throw new Error("User ID not found in session");
        }
        
        const apiUrl = "/api/allproperties/all";
        
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        };
        
        // First, get all properties
        const response = await axios.get(apiUrl, { headers });
        
        // Flatten the grouped properties
        const flattenGrouped = (grouped: Record<string, any>) => {
          const all: any[] = [];
          for (const groupKey in grouped) {
            const category = grouped[groupKey];

            for (const subType in category) {
              const items = category[subType];
              if (Array.isArray(items)) {
                all.push(...items);
              }
            }
          }
          return all;
        };
        
        const allProperties = flattenGrouped(response.data?.data || {});
        
        // Map properties to the expected format
        const finalProperties = allProperties.map((property: any) => ({
          id: property.id || `property-${Math.random().toString(36).substr(2, 9)}`,
          title: property.title || property.propertyName || 'Untitled Property',
          name: property.propertyName || '',
          status: property.status || 'Available',
          price: property.price || property.rent || 0,
          rent: property.rent || property.price || 0,
          type: property.type || 'Unknown',
          intent: property.intent || 'Sell',
          location: property.location || 'Location not specified',
          area: property.area || 0,
          furnishing: property.furnishing || 'Unspecified',
          imageUrl: property.image || property.imageUrl || 'https://via.placeholder.com/300',
          propertyId: property.propertyId || property.id,
          listingType: property.listingType || 'Standard',
          postedDate: property.postedDate || new Date().toISOString(),
        createdBy: property.userId || property.createdBy
        }));
        
        if (isMounted) {
          setProperties(finalProperties);
          setIsLoading(false);
        }
  
      } catch (error: unknown) {
        console.error("Error fetching user properties:", error);
        if (isMounted) {
          setProperties([]);
          setIsLoading(false);
          
          let errorMessage = 'Failed to load properties';
          
          if (isAxiosError(error)) {
            errorMessage = error.response 
              ? `Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`
              : error.message || 'Network error occurred';
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          alert(`Error: ${errorMessage}`);
        }
      }
    };

    fetchAllProperties();
    
    return () => {
      isMounted = false;
    };
  }, []);

    useEffect(() => {
      const user = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("token");
      console.log(properties);
      properties.filter((property: any) => {
        if(property.createdBy === user){
          setNewProperty(prev => [...prev, property]);
        }
      })
    }, [properties]);

  
  console.log(newProperty);
  
  // Handle property deletion
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`/api/properties/${id}`);
        setProperties(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property. Please try again.");
      }
    }
  }, []);

  // Handle property edit
 const handleEdit = (propertyId: string) => {
  navigate(`/updatepropertyform/${propertyId}`);
};

  // Handle status update
  const handleStatusUpdate = (id: string) => {
    // In a real app, you would open a modal here
    console.log("Update status for property:", id);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const handlePropertyClick = (propertyname:string,propertyId: string) => {
    if(propertyname!='PL' && propertyname!='AG'){
      navigate(`/detailprop/${propertyId}`);
    }
    else{
      navigate(`/agriplot/${propertyId}`);
    }
    
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <button
          onClick={() => navigate("/updatePropertyform")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Property
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search properties..."
            className="flex-1 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
          <select
            className="p-2 border rounded-md"
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
          >
            <option value="All">All Intents</option>
            <option value="Sell">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {newProperty.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProperty.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
              onEdit={() =>handleEdit(property.propertyId)}
              onStatusUpdate={() => handleStatusUpdate(property.id)}
              onClick={() => handlePropertyClick(property.propertyId.slice(8,10),property.propertyId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found. Add a new property to get started.</p>
        </div>
      )}
    </div>
  );
}