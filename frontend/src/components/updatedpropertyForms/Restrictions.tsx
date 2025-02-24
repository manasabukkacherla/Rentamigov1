import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RestrictionsProps {
  onRestrictionsChange?: (restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }) => void;
}

const Restrictions = ({ onRestrictionsChange }: RestrictionsProps) => {
  const [restrictions, setRestrictions] = useState({
    foodPreference: '',
    petsAllowed: '',
    tenantType: '',
  });

  const handleChange = (field: string, value: string) => {
    const updatedRestrictions = { ...restrictions, [field]: value };
    setRestrictions(updatedRestrictions);
    onRestrictionsChange?.(updatedRestrictions);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Restrictions</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Preferences</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          {/* Food Preference */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-3">Food Preference</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodPreference"
                  value="veg"
                  checked={restrictions.foodPreference === 'veg'}
                  onChange={(e) => handleChange('foodPreference', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Veg Only</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="foodPreference"
                  value="both"
                  checked={restrictions.foodPreference === 'both'}
                  onChange={(e) => handleChange('foodPreference', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Veg & Non-Veg</span>
              </label>
            </div>
          </div>

          {/* Pets */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-3">Pets</h4>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="petsAllowed"
                  value="allowed"
                  checked={restrictions.petsAllowed === 'allowed'}
                  onChange={(e) => handleChange('petsAllowed', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Allowed</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="petsAllowed"
                  value="notAllowed"
                  checked={restrictions.petsAllowed === 'notAllowed'}
                  onChange={(e) => handleChange('petsAllowed', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Not Allowed</span>
              </label>
            </div>
          </div>

          {/* Tenant Type */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-3">Tenant Type</h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tenantType"
                  value="bachelors"
                  checked={restrictions.tenantType === 'bachelors'}
                  onChange={(e) => handleChange('tenantType', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Bachelors</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tenantType"
                  value="family"
                  checked={restrictions.tenantType === 'family'}
                  onChange={(e) => handleChange('tenantType', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Family</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="tenantType"
                  value="company"
                  checked={restrictions.tenantType === 'company'}
                  onChange={(e) => handleChange('tenantType', e.target.value)}
                  className="text-white border-white/20 bg-transparent focus:ring-white focus:ring-offset-0"
                />
                <span className="text-white/80">Company Lease</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restrictions;