import React, { useState } from 'react';
import { Building2, LayoutGrid, Sofa, Compass } from 'lucide-react';
import { SelectField } from './SelectField';
import Headerr from '../landingpages/headerr';
import './PropertyPage.css';

export interface FormData {
  propertyType: string;
  propertyConfiguration: string;
  furnishingStatus: string;
  facing: string;
}

interface PropertyFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Standalone Building', label: 'Standalone Building' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Row House', label: 'Row House' },
];

const PROPERTY_CONFIGURATIONS = [
  { value: 'Studio Room (1 RK)', label: 'Studio Room (1 RK)' },
  { value: '1 BHK', label: '1 BHK' },
  { value: '2 BHK', label: '2 BHK' },
  { value: '3 BHK', label: '3 BHK' },
  { value: '3+ BHK', label: '3+ BHK' },
];

const FURNISHING_STATUS = [
  { value: 'Unfurnished', label: 'Unfurnished' },
  { value: 'Semi Furnished', label: 'Semi Furnished' },
  { value: 'Fully Furnished', label: 'Fully Furnished' },
];

const FACING_OPTIONS = [
  { value: 'North', label: 'North' },
  { value: 'East', label: 'East' },
  { value: 'South', label: 'South' },
  { value: 'West', label: 'West' },
  { value: 'North-East', label: 'North-East' },
  { value: 'South-East', label: 'South-East' },
  { value: 'North-West', label: 'North-West' },
  { value: 'South-West', label: 'South-West' },
];

export function PropertyForm({ formData, setFormData }: PropertyFormProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div>
      <Headerr />
      <div className="steps-container">
        {[
          "Property Details",
          "Property Location",
          "Property Features",
          "Commercials",
          "Available From",
          "Property Photos",
        ].map((step, index) => (
          <div key={index} className={`step-circle`}>{index + 1}</div>
        ))}
      </div>
      {!showPreview && (
        <div className="card-container">
          <div className="card">
            <h3 className="card-title">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Property Type"
                icon={Building2}
                value={formData.propertyType}
                onChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
                options={PROPERTY_TYPES}
              />

              <SelectField
                label="Property Configuration"
                icon={LayoutGrid}
                value={formData.propertyConfiguration}
                onChange={(value) => setFormData((prev) => ({ ...prev, propertyConfiguration: value }))}
                options={PROPERTY_CONFIGURATIONS}
              />

              <SelectField
                label="Furnishing Status"
                icon={Sofa}
                value={formData.furnishingStatus}
                onChange={(value) => setFormData((prev) => ({ ...prev, furnishingStatus: value }))}
                options={FURNISHING_STATUS}
              />

              <SelectField
                label="Facing"
                icon={Compass}
                value={formData.facing}
                onChange={(value) => setFormData((prev) => ({ ...prev, facing: value }))}
                options={FACING_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}
      {showPreview && (
        <div className="card-container">
          <div className="card">
            <h3>Property Details</h3>
            <p><strong>Property Type:</strong> {formData.propertyType || 'Not selected'}</p>
            <p><strong>Configuration:</strong> {formData.propertyConfiguration || 'Not selected'}</p>
            <p><strong>Furnishing Status:</strong> {formData.furnishingStatus || 'Not selected'}</p>
            <p><strong>Facing:</strong> {formData.facing || 'Not selected'}</p>
          </div>
        </div>
      )}
      <footer className="footer">
        <button className="preview-button" onClick={handlePreviewClick}>{showPreview ? 'Back' : 'Preview'}</button>
        {!showPreview && <button className="next-button">Next</button>}
      </footer>
    </div>
  );
}
