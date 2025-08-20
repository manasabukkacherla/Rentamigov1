import { useEffect, useState } from "react";
import axios from "axios";
import {
  Edit2,
  Trash2,
  ToggleRight,
  Home,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Property } from "./types";

interface PropertyCardProps {
  property: Property;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string) => void;
  onEdit?: (id: string) => void; // Made optional
}

export function PropertyCard({
  property,
  onDelete,
  onStatusUpdate,
  onEdit,
}: PropertyCardProps) {
  const [coverImageUrl, setCoverImageUrl] = useState<string>(
    "https://via.placeholder.com/300"
  ); // Default placeholder
  const [monthlyRent, setMonthlyRent] = useState<number>(property.rent); // Default to provided rent

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (!storedUser) {
          console.warn("No user found in session.");
          return;
        }

        const userData = JSON.parse(storedUser);
        const userId = userData.id;

        // Fetch property images
        const imagesResponse = await axios.get("/api/photos/upload-photos", {
          params: { userId },
        });

        const image = imagesResponse.data.find(
          (img: any) => img.property._id === property.id
        );
        if (image?.photos?.coverImage) {
          setCoverImageUrl(image.photos.coverImage);
        }

        // Fetch property commercials (Rent)
        const commercialsResponse = await axios.get(
          "/api/properties/property-commercials/user",
          {
            params: { userId },
          }
        );

        const commercial = commercialsResponse.data.find(
          (com: any) => com.property._id === property.id
        );
        if (commercial?.monthlyRent) {
          setMonthlyRent(commercial.monthlyRent);
        }

        // Fetch all properties
        const allPropertiesResponse = await axios.get("/api/allproperties/all");
        console.log("All properties:", allPropertiesResponse.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [property.id]);

  const statusConfig = {
    Available: {
      color: "bg-green-100 text-green-800",
      icon: Home,
      description: "Ready to rent",
    },
    Rented: {
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle,
      description: "Currently occupied",
    },
    Pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      description: "Under process",
    },
  };

  const StatusIcon = statusConfig[property.status]?.icon || Home;

  // Base64 encoded 1x1 transparent pixel as final fallback
  const transparentPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const [imgSrc, setImgSrc] = useState(coverImageUrl || transparentPixel);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      // Only try the fallback once to prevent infinite loops
      setHasError(true);
      setImgSrc(transparentPixel);
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-black/10">
      {/* ✅ Display Cover Image */}
      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={property.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className="p-2 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2">
        <h3 className="text-sm sm:text-base font-semibold text-black line-clamp-1">
          {property.name}
        </h3>
        <p className="text-xs sm:text-sm text-black/60">
          ₹{monthlyRent ? monthlyRent.toLocaleString() : "N/A"}/month
        </p>

        {/* Status Badge with Icon and Description */}
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            statusConfig[property.status]?.color || "bg-gray-100 text-gray-800"
          }`}
        >
          <StatusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{property.status}</span>
          <span className="hidden sm:inline text-[10px] opacity-75">
            • {statusConfig[property.status]?.description || "Unknown Status"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-1 pt-1.5 sm:pt-2">
          {/* Edit Button */}
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(property.id)}
                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Edit property"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Edit property
            </div>
          </div>

          {/* Delete Button */}
          <div className="group relative">
            <button
              onClick={() => onDelete(property.id)}
              className="p-1.5 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete property"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Delete property
            </div>
          </div>

          {/* Status Update Button */}
          <div className="group relative">
            <button
              onClick={() => onStatusUpdate(property.id)}
              className="p-1.5 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Change property status"
            >
              <ToggleRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="absolute bottom-full right-0 mb-1 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
              Update status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
