import React, { useState, useEffect } from 'react';
import OtherFeatures from './OtherFeatures';
import Restrictions from './Restrictions';

interface OtherFeaturesAndRestrictionsProps {
  value?: {
    otherFeatures: string[];
    restrictions: string[];
  };
  onChange?: (val: { otherFeatures: string[]; restrictions: string[] }) => void;
}

const OtherFeaturesAndRestrictions: React.FC<OtherFeaturesAndRestrictionsProps> = ({ value, onChange }) => {
  const [visitorPolicies, setVisitorPolicies] = useState<string[]>([]);

  return (
    <div className="space-y-8">
      <OtherFeatures
        selectedFeatures={value?.otherFeatures || []}
        onFeaturesChange={(features) => onChange?.({ otherFeatures: features, restrictions: value?.restrictions || [] })}
        visitorPolicies={visitorPolicies}
        onVisitorPoliciesChange={setVisitorPolicies}
      />
      <Restrictions
        selectedRestrictions={value?.restrictions || []}
        onRestrictionsChange={(restrictions) => onChange?.({ otherFeatures: value?.otherFeatures || [], restrictions })}
      />
    </div>
  );
};

export default OtherFeaturesAndRestrictions;
