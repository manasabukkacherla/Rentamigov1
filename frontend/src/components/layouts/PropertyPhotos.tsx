import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Video } from "lucide-react";
import { PreviewModal } from "./Previewmodal";

export interface PhotoData {
  bedrooms: { [key: string]: string | null };
  bathrooms: { [key: string]: string | null };
  balconies: { [key: string]: string | null };
  extraRooms: { [key: string]: string | null };
  coverImage: string | null;
  exteriorView: string | null;
  livingRoom: string | null;
  kitchen: string | null;
  diningRoom: string | null;
  utilityArea: string | null;
  others: string | null;
  propertyVideo: string | null;
  [key: string]: string | null | { [key: string]: string | null };
}

interface PropertyPhotosProps {
  propertyId: string; // Property ID comes from parent
  photoData: PhotoData;
  setPhotoData: React.Dispatch<React.SetStateAction<PhotoData>>;
  featuresData?: {
    bedrooms: string;
    bathrooms: string;
    balconies: string;
    extraRooms: string[];
  };
}

export function PropertyPhotos({
  photoData,
  setPhotoData,
  featuresData,
  propertyId, // Fetch propertyId from parent
}: PropertyPhotosProps) {
  const [previewData, setPreviewData] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const uploadToS3 = async (
    fileName: string,
    base64Data: string,
    fieldName: string
  ): Promise<string | null> => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.rentamigo.in/api/photos/upload-photos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId, // Use the propertyId from parent
            fileName,
            base64Data,
            fieldName,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload photos");
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange =
    (field: keyof PhotoData, subField?: string) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const maxSize = 2; // Default max size is 2MB
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File size should not exceed ${maxSize}MB`);
          return;
        }

        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const base64Data = reader.result as string;

            // Concatenate `field` and `subField` safely and cast to string
            const fieldName = subField
              ? `${String(field)}.${subField}`
              : String(field); // Handle nested fields
            const url = await uploadToS3(file.name, base64Data, fieldName);

            if (url) {
              setPhotoData((prev) => {
                if (
                  subField &&
                  typeof prev[field] === "object" &&
                  prev[field] !== null
                ) {
                  return {
                    ...prev,
                    [field]: {
                      ...(prev[field] as { [key: string]: string | null }),
                      [subField]: url,
                    },
                  };
                }
                return { ...prev, [field]: url };
              });
            }
          };
        } catch (error) {
          console.error("Error processing file:", error);
        }
      }
    };

  const handlePreview = (
    field: keyof PhotoData,
    subField?: string,
    label?: string
  ) => {
    const fileUrl =
      subField &&
      typeof photoData[field] === "object" &&
      photoData[field] !== null
        ? (photoData[field] as { [key: string]: string | null })[subField]
        : (photoData[field] as string | null);

    if (fileUrl) {
      setPreviewData({ url: fileUrl, title: label || "Preview" });
    } else {
      alert("Please upload an image first.");
    }
  };

  const closePreview = () => setPreviewData(null);

  const handleSaveProperty = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/empdashboard");
  };

  const dynamicFields = useMemo(() => {
    const fields: {
      group: string;
      id: keyof PhotoData;
      subField?: string;
      label: string;
    }[] = [
      { group: "General", id: "coverImage", label: "Cover Image" },
      { group: "General", id: "exteriorView", label: "Exterior View" },
      { group: "General", id: "livingRoom", label: "Living Room" },
      { group: "General", id: "kitchen", label: "Kitchen" },
      { group: "General", id: "diningRoom", label: "Dining Room" },
      { group: "General", id: "utilityArea", label: "Utility Area" },
      { group: "General", id: "others", label: "Others" },
      { group: "General", id: "propertyVideo", label: "Property Video" },
    ];

    for (let i = 1; i <= parseInt(featuresData?.bedrooms || "0", 10); i++) {
      fields.push({
        group: "Bedrooms",
        id: "bedrooms",
        subField: `bedroom${i}`,
        label: `Bedroom ${i}`,
      });
    }
    for (let i = 1; i <= parseInt(featuresData?.bathrooms || "0", 10); i++) {
      fields.push({
        group: "Bathrooms",
        id: "bathrooms",
        subField: `bathroom${i}`,
        label: `Bathroom ${i}`,
      });
    }
    for (let i = 1; i <= parseInt(featuresData?.balconies || "0", 10); i++) {
      fields.push({
        group: "Balconies",
        id: "balconies",
        subField: `balcony${i}`,
        label: `Balcony ${i}`,
      });
    }
    featuresData?.extraRooms?.forEach((room, index) => {
      fields.push({
        group: "Extra Rooms",
        id: "extraRooms",
        subField: `extraRoom${index + 1}`,
        label: room,
      });
    });

    return fields;
  }, [featuresData]);

  return (
    <div className="space-y-8">
      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Fields Rendering */}
      {Object.entries(
        dynamicFields.reduce(
          (
            acc: Record<
              string,
              { id: keyof PhotoData; subField?: string; label: string }[]
            >,
            { group, id, subField, label }
          ) => {
            if (!acc[group]) acc[group] = [];
            acc[group].push({ id, subField, label });
            return acc;
          },
          {} // Initial accumulator is an object with string keys
        )
      ).map(([group, fields]) => (
        <div key={group}>
          <h3 className="text-lg font-semibold">{group}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map(({ id, subField, label }) => (
              <div key={`${id}-${subField || ""}`} className="space-y-2">
                <label className="text-sm font-medium">{label}</label>
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  onChange={(e) => handleFileChange(id, subField)(e)}
                />
                {subField
                  ? photoData[id] &&
                    typeof photoData[id] === "object" &&
                    photoData[id] !== null &&
                    (photoData[id] as Record<string, string | null>)[
                      subField
                    ] && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-green-600">
                          ✓ Uploaded
                        </span>
                        <button
                          onClick={() => handlePreview(id, subField, label)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Preview
                        </button>
                      </div>
                    )
                  : photoData[id] && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-green-600">
                          ✓ Uploaded
                        </span>
                        <button
                          onClick={() => handlePreview(id, undefined, label)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Preview
                        </button>
                      </div>
                    )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save Property Button */}
      <button
        onClick={handleSaveProperty}
        disabled={!Object.values(photoData).some((val) => val !== null)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Property
      </button>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Success</h3>
            <p>Property submitted successfully!</p>
            <button
              onClick={closeSuccessModal}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewData && (
        <PreviewModal
          url={previewData.url}
          title={previewData.title}
          onClose={closePreview}
        />
      )}
    </div>
  );
}
