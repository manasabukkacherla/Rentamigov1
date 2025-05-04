import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RestrictionsProps {
  res: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }
  onRestrictionsChange?: (restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }) => void;
}

const Restrictions = ({ res, onRestrictionsChange }: RestrictionsProps) => {
  const [restrictions, setRestrictions] = useState(res);

  const handleChange = (field: string, value: string) => {
    const updatedRestrictions = { ...restrictions, [field]: value };
    setRestrictions(updatedRestrictions);
    onRestrictionsChange?.(updatedRestrictions);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <h3 className="text-2xl font-semibold text-black">Restrictions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Food Preference */}
          <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
            <h4 className="text-lg font-medium mb-4 text-black">Food Preference</h4>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="foodPreference"
                  value="veg"
                  checked={restrictions.foodPreference === 'veg'}
                  onChange={(e) => handleChange('foodPreference', e.target.value)}
                  className="accent-black"
                />
                <span>Veg Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="foodPreference"
                  value="both"
                  checked={restrictions.foodPreference === 'both'}
                  onChange={(e) => handleChange('foodPreference', e.target.value)}
                  className="accent-black"
                />
                <span>Veg & Non-Veg</span>
              </label>
            </div>
          </div>
          {/* Pets */}
          <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
            <h4 className="text-lg font-medium mb-4 text-black">Pets</h4>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="petsAllowed"
                  value="allowed"
                  checked={restrictions.petsAllowed === 'allowed'}
                  onChange={(e) => handleChange('petsAllowed', e.target.value)}
                  className="accent-black"
                />
                <span>Allowed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="petsAllowed"
                  value="notAllowed"
                  checked={restrictions.petsAllowed === 'notAllowed'}
                  onChange={(e) => handleChange('petsAllowed', e.target.value)}
                  className="accent-black"
                />
                <span>Not Allowed</span>
              </label>
            </div>
          </div>
        </div>
        {/* Tenant Type */}
        <div className="bg-gray-50 p-6 rounded-lg border border-black/10">
          <h4 className="text-lg font-medium mb-4 text-black">Tenant Type</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tenantType"
                value="bachelors"
                checked={restrictions.tenantType === 'bachelors'}
                onChange={(e) => handleChange('tenantType', e.target.value)}
                className="accent-black"
              />
              <span>Bachelors</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tenantType"
                value="family"
                checked={restrictions.tenantType === 'family'}
                onChange={(e) => handleChange('tenantType', e.target.value)}
                className="accent-black"
              />
              <span>Family</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tenantType"
                value="company"
                checked={restrictions.tenantType === 'company'}
                onChange={(e) => handleChange('tenantType', e.target.value)}
                className="accent-black"
              />
              <span>Company Lease</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restrictions;