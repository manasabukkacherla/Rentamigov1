import React, { useState, useEffect, useCallback } from "react";
import { X, Home, Clock, CheckCircle } from "lucide-react";
import { PropertyCard } from "../PropertyCard";
import { Property } from "../types";
import { LoadingOverlay } from "../LoadingOverlay";
import axios from "axios";

const initialProperties: Property[] = [
  {
    id: "1",
    name: "Luxury Villa with Pool",
    rent: 45000,
    status: "Available",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800",
  },
  {
    id: "2",
    name: "Modern City Apartment",
    rent: 25000,
    status: "Rented",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
  },
];

const statusConfig = {
  Available: {
    icon: Home,
    color: "bg-green-100 text-green-800 border-green-200",
    description: "Ready to rent",
  },
  Rented: {
    icon: CheckCircle,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Currently occupied",
  },
  Pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    description: "Under process",
  },
};

export function Properties() {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filter] = useState<"Available" | "Rented" | "Pending" | "All">("All");
  const [searchTerm] = useState("");

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (!storedUser) {
          console.warn("No user found in session.");
          setIsLoading(false);
          return;
        }

        const userData = JSON.parse(storedUser);
        const userId = userData.id;

        const [propertiesRes, imagesRes, commercialsRes] = await Promise.all([
          axios.get("/api/properties/property/user", { params: { userId } }),
          axios.get("/api/photos/upload-photos", { params: { userId } }),
          axios.get("/api/properties/property-commercials/user", { params: { userId } }),
        ]);

        const userProperties = propertiesRes.data;
        const propertyImages = imagesRes.data;
        const propertyCommercials = commercialsRes.data;

        const finalProperties = userProperties
          .map((property: any) => {
            const image = propertyImages.find(
              (img: any) => img.property._id === property._id
            );
            const commercial = propertyCommercials.find(
              (com: any) => com.property._id === property._id
            );

            return {
              id: property.id,
              name: property.propertyName,
              rent: commercial?.monthlyRent || 0,
              status: property.status || "Available",
              imageUrl: image?.photos?.coverImage || "https://via.placeholder.com/300",
              createdAt: new Date(property.createdAt) || new Date(0),
            };
          })
          .sort((a: { createdAt: Date }, b: { createdAt: Date }) => b.createdAt.getTime() - a.createdAt.getTime());

        setProperties(finalProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProperties();
  }, []);

  const fetchAllProperties = useCallback(async () => {
    try {
      const response = await axios.get("/api/allproperties/all");
      const grouped = response.data?.data || response.data || {};
  
      const flattenGrouped = (grouped: Record<string, any>) => {
        const all: any[] = [];
        for (const groupKey in grouped) {
          const category = grouped[groupKey];
          if (typeof category === "object" && category !== null) {
            for (const subType in category) {
              const items = category[subType];
              if (Array.isArray(items)) {
                all.push(...items);
              }
            }
          }
        }
        return all;
      };
  
      const flattened = flattenGrouped(grouped);
      const allProps = flattened.map((property: any) => ({
        id: property._id || property.id,
        name: property.propertyName || property.name || property.title || "Unknown Property",
        rent: property.monthlyRent || property.rent || 0,
        status: property.status || "Available",
        imageUrl:
          property.coverImage ||
          property.imageUrl ||
          (Array.isArray(property.images) ? property.images[0] : undefined) ||
          "https://via.placeholder.com/300",
      }));
  
      return allProps;
    } catch (error) {
      console.error("Error in fetchAllProperties:", error);
      return [];
    }
  }, []);
  

  useEffect(() => {
    if (showAllProperties) {
      fetchAllProperties();
    }
  }, [showAllProperties, fetchAllProperties]);

  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      try {
        const properties = await fetchAllProperties();
        if (isMounted) {
          setAllProperties(properties);
        }
      } catch (error) {
        console.error("Failed to load properties:", error);
        if (isMounted) {
          setAllProperties([]);
        }
      }
    };

    if (showAllProperties) {
      loadProperties();
    }

    return () => {
      isMounted = false;
    };
  }, [showAllProperties, fetchAllProperties]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await axios.delete(`/api/properties/property/${id}`);
      setProperties((prevProperties) =>
        prevProperties.filter((p) => p.id !== id)
      );
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property. Please try again.");
    }
  };

  /** ✅ Handle Status Update */
  const handleStatusUpdate = (id: string) => {
    const property = properties.find((p) => p.id === id);
    if (property) {
      setSelectedPropertyId(id);
      setShowStatusModal(true);
    }
  };

  /** ✅ Handle Status Change */
  const handleStatusChange = async (newStatus: Property["status"]) => {
    if (!selectedProperty) return;

    try {
      await axios.patch(`/api/properties/property/${selectedProperty.id}`, {
        status: newStatus,
      });

      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === selectedProperty.id
            ? { ...property, status: newStatus }
            : property
        )
      );

      setShowStatusModal(false);
      setSelectedPropertyId(null);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update property status. Please try again.");
    }
  };

  const selectedProperty = selectedPropertyId
    ? properties.find((p) => p.id === selectedPropertyId)
    : null;

  const displayProperties = showAllProperties ? allProperties : properties;

  return (
    <div className="relative min-h-screen bg-gray-50">
      {isLoading && <LoadingOverlay />}
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {showAllProperties ? 'All Properties' : 'My Properties'}
            </h1>
            <p className="text-gray-500">
              {showAllProperties 
                ? 'Browse all available properties' 
                : 'Manage your property listings and view their status'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAllProperties(!showAllProperties)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {showAllProperties ? 'Show My Properties' : 'Show All Properties'}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProperties
            .filter((property) => filter === "All" || property.status === filter)
            .filter(
              (property) =>
                property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.rent.toString().includes(searchTerm)
            )
            .map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onDelete={handleDelete}
                onEdit={() => {}} // Empty handler since we're not using edit functionality
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
        </div>

        {/* Status Update Modal */}
        {showStatusModal && selectedProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black">
                  Update Property Status
                </h2>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
                </button>
              </div>

              <p className="text-sm text-black/60 mb-4">
                Select a new status for{" "}
                <span className="font-medium text-black">
                  {selectedProperty.name}
                </span>
              </p>

              <div className="space-y-2">
                {Object.entries(statusConfig).map(([statusKey, config]) => {
                  const StatusIcon = config.icon;
                  const isSelected = selectedProperty.status === statusKey;
                  return (
                    <button
                      key={statusKey}
                      onClick={() => handleStatusChange(statusKey as keyof typeof statusConfig)}
                      className={`w-full flex items-center p-3 rounded-lg border-2 transition-all
                        ${
                          isSelected
                            ? `${config.color} border-current`
                            : "border-black/10 hover:border-black/20"
                        }
                      `}
                    >
                      <StatusIcon
                        className={`w-5 h-5 mr-3 ${
                          isSelected ? "text-current" : "text-black/40"
                        }`}
                      />
                      <div className="text-left">
                        <p className={`font-medium ${isSelected ? "text-current" : "text-black"}`}>
                          {statusKey}
                        </p>
                        <p className={`text-xs ${isSelected ? "text-current/70" : "text-black/60"}`}>
                          {config.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-2 bg-black/5 text-black text-sm rounded-lg hover:bg-black/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
