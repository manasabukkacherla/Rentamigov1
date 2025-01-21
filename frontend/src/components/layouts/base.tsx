import React, { useState } from 'react';
import './PropertyPage.css';
import Headerr from '../landingpages/headerr';
const PropertyPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(1);

  const steps = [
    'Property Details',
    'Property Location',
    'Property Features',
    'Commercials',
    'Available From',
    'Property Photos',
  ];

  const handleStepClick = (step: number) => {
    setSelectedStep(step);
  };

  const handleNext = () => {
    if (selectedStep < steps.length) {
      setSelectedStep(selectedStep + 1);
    }
  };

  return (
    <div className="property-page">
      <header className="header">
        <button className="preview-button">Preview</button>
        <Headerr />
        
      </header>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-circle ${selectedStep === index + 1 ? 'active' : ''}`}
            onClick={() => handleStepClick(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="content">
        <h2>{steps[selectedStep - 1]}</h2>
        <p>Content for {steps[selectedStep - 1]} goes here.</p>
      </div>
      <footer className="footer">
        <button className="next-button" onClick={handleNext} disabled={selectedStep === steps.length}>
          Next
        </button>
      </footer>
    </div>
  );
};

export default PropertyPage;
