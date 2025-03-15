import { ArrowRight } from 'lucide-react';

interface PropertyNameProps {
  propertyName: string;
  onPropertyNameChange: (name: string) => void;
}

const PropertyName = ({ propertyName, onPropertyNameChange }: PropertyNameProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Name</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Details</span>
      </div>

      <div className="max-w-xl">
        <input
          type="text"
          value={propertyName}
          onChange={(e) => onPropertyNameChange(e.target.value)}
          placeholder="Enter your property name"
          className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
        />
      </div>
    </div>
  );
};

export default PropertyName;