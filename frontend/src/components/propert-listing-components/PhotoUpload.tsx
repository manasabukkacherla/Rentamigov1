import React from "react";
import { theme } from "../../theme";

// Define the photo categories
const photoCategories = [
  "exteriorView",
  "livingRoom",
  "kitchen",
  "diningRoom",
  "bedroom1",
  "bedroom2",
  "bedroom3",
  "bedroom4",
] as const;

// Define types
type PhotoCategory = (typeof photoCategories)[number];

interface Photos {
  [key: string]: File[];
}

interface PhotoUploadData {
  photos: Photos;
}

interface PhotoUploadProps {
  onUpload: (category: PhotoCategory, file: File) => void;
  data: PhotoUploadData;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload, data }) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Photo Upload</h2>
    {photoCategories.map((category) => (
      <div key={category} style={styles.category}>
        <h3 style={styles.subheading}>{category}</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files[0]) {
              onUpload(category, files[0]);
            }
          }}
          style={styles.fileInput}
        />
        {data.photos?.[category]?.map((photo: File, index: number) => (
          <div key={index} style={styles.photoPreview}>
            <img
              src={URL.createObjectURL(photo)}
              alt={`${category} ${index + 1}`}
              style={styles.previewImage}
            />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const styles = {
  section: {
    marginBottom: theme.spacing.large,
  },
  heading: {
    fontSize: theme.fontSizes.large,
    marginBottom: theme.spacing.medium,
  },
  subheading: {
    fontSize: theme.fontSizes.medium,
    marginBottom: theme.spacing.small,
  },
  category: {
    marginBottom: theme.spacing.medium,
  },
  fileInput: {
    marginBottom: theme.spacing.small,
  },
  photoPreview: {
    marginTop: theme.spacing.small,
  },
  previewImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover" as const,
  },
};

export default PhotoUpload;
