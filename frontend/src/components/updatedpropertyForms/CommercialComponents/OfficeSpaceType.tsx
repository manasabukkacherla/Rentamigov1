import { useState } from 'react';
import { ArrowRight, Building2, Users, Briefcase, Globe, Rocket, DoorClosed, Cpu } from 'lucide-react';

interface OfficeSpaceTypeProps {
  onOfficeTypeChange?: (type: string) => void;
}

const OfficeSpaceType = ({ onOfficeTypeChange }: OfficeSpaceTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onOfficeTypeChange?.(type);
  };

  const officeTypes = [
    { value: 'co-working', label: 'Co-Working Space' },
    { value: 'corporate', label: 'Corporate Office' },
    { value: 'business-center', label: 'Business Center' },
    { value: 'virtual', label: 'Virtual Office' },
    { value: 'startup-hub', label: 'Startup Hub' },
    { value: 'private-cabin', label: 'Private Cabin Office' },
    { value: 'it-tech', label: 'IT/Tech Office Space' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'co-working':
        return <Users size={20} className="text-white/60" />;
      case 'corporate':
        return <Building2 size={20} className="text-white/60" />;
      case 'business-center':
        return <Briefcase size={20} className="text-white/60" />;
      case 'virtual':
        return <Globe size={20} className="text-white/60" />;
      case 'startup-hub':
        return <Rocket size={20} className="text-white/60" />;
      case 'private-cabin':
        return <DoorClosed size={20} className="text-white/60" />;
      case 'it-tech':
        return <Cpu size={20} className="text-white/60" />;
      default:
        return <Building2 size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Office Space Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Office Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Office Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select an office type</option>
            {officeTypes.map(({ value, label }) => (
              <option key={value} value={value} className="bg-black">
                {label}
              </option>
            ))}
          </select>

          {selectedType && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {getIcon(selectedType)}
                <h5 className="font-medium">Overview</h5>
              </div>
              <p className="text-white/80">
                {selectedType === 'co-working' && 'Flexible workspace with shared amenities and networking opportunities.'}
                {selectedType === 'corporate' && 'Professional office space suitable for established companies and large teams.'}
                {selectedType === 'business-center' && 'Fully serviced office space with premium amenities and support services.'}
                {selectedType === 'virtual' && 'Professional business address and mail handling services without physical office space.'}
                {selectedType === 'startup-hub' && 'Dynamic workspace designed for startups with collaborative areas and mentorship opportunities.'}
                {selectedType === 'private-cabin' && 'Individual office spaces offering privacy and dedicated work environment.'}
                {selectedType === 'it-tech' && 'Specialized office space with advanced IT infrastructure and technical support.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'co-working' && (
                    <>
                      <li>• Flexible seating options</li>
                      <li>• Shared meeting rooms</li>
                      <li>• High-speed internet</li>
                      <li>• Community events</li>
                    </>
                  )}
                  {selectedType === 'corporate' && (
                    <>
                      <li>• Dedicated floor plates</li>
                      <li>• Reception services</li>
                      <li>• Employee facilities</li>
                      <li>• Secure access</li>
                    </>
                  )}
                  {selectedType === 'business-center' && (
                    <>
                      <li>• Furnished offices</li>
                      <li>• Administrative support</li>
                      <li>• Conference facilities</li>
                      <li>• Business lounge</li>
                    </>
                  )}
                  {selectedType === 'virtual' && (
                    <>
                      <li>• Business address</li>
                      <li>• Mail handling</li>
                      <li>• Call answering</li>
                      <li>• Meeting room access</li>
                    </>
                  )}
                  {selectedType === 'startup-hub' && (
                    <>
                      <li>• Incubation support</li>
                      <li>• Networking events</li>
                      <li>• Mentorship programs</li>
                      <li>• Pitch spaces</li>
                    </>
                  )}
                  {selectedType === 'private-cabin' && (
                    <>
                      <li>• Private workspace</li>
                      <li>• Dedicated storage</li>
                      <li>• Sound insulation</li>
                      <li>• Customizable setup</li>
                    </>
                  )}
                  {selectedType === 'it-tech' && (
                    <>
                      <li>• High-speed connectivity</li>
                      <li>• Server rooms</li>
                      <li>• Backup power</li>
                      <li>• Technical support</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'co-working' && (
                    <>
                      <li>• Freelancers</li>
                      <li>• Remote workers</li>
                      <li>• Small teams</li>
                      <li>• Digital nomads</li>
                    </>
                  )}
                  {selectedType === 'corporate' && (
                    <>
                      <li>• Large companies</li>
                      <li>• MNCs</li>
                      <li>• Regional offices</li>
                      <li>• Corporate headquarters</li>
                    </>
                  )}
                  {selectedType === 'business-center' && (
                    <>
                      <li>• SMEs</li>
                      <li>• Branch offices</li>
                      <li>• Project teams</li>
                      <li>• Consulting firms</li>
                    </>
                  )}
                  {selectedType === 'virtual' && (
                    <>
                      <li>• Online businesses</li>
                      <li>• Startups</li>
                      <li>• Remote companies</li>
                      <li>• International firms</li>
                    </>
                  )}
                  {selectedType === 'startup-hub' && (
                    <>
                      <li>• Tech startups</li>
                      <li>• Innovation teams</li>
                      <li>• Incubators</li>
                      <li>• Accelerators</li>
                    </>
                  )}
                  {selectedType === 'private-cabin' && (
                    <>
                      <li>• Executives</li>
                      <li>• Professionals</li>
                      <li>• Small teams</li>
                      <li>• Creative agencies</li>
                    </>
                  )}
                  {selectedType === 'it-tech' && (
                    <>
                      <li>• IT companies</li>
                      <li>• Software firms</li>
                      <li>• Tech startups</li>
                      <li>• Development teams</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeSpaceType;