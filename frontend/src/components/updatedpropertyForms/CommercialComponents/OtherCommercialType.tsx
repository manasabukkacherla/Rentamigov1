import { useState } from 'react';
import { ArrowRight, Server, Heart, Building2, GraduationCap, Film } from 'lucide-react';

interface OtherCommercialTypeProps {
  onCommercialTypeChange?: (type: string) => void;
}

const OtherCommercialType = ({ onCommercialTypeChange }: OtherCommercialTypeProps) => {
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onCommercialTypeChange?.(type);
  };

  const commercialTypes = [
    { value: 'data-center', label: 'Data Center Space' },
    { value: 'healthcare', label: 'Healthcare/Clinic Space' },
    { value: 'hotel', label: 'Hotel/Resort Space' },
    { value: 'educational', label: 'Educational Institute' },
    { value: 'film-studio', label: 'Film Studio Space' }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'data-center':
        return <Server size={20} className="text-white/60" />;
      case 'healthcare':
        return <Heart size={20} className="text-white/60" />;
      case 'educational':
        return <GraduationCap size={20} className="text-white/60" />;
      case 'film-studio':
        return <Film size={20} className="text-white/60" />;
      default:
        return <Building2 size={20} className="text-white/60" />;
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Other Commercial Space Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Space Category</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={20} className="text-white/60" />
            <h4 className="text-lg font-medium">Select Commercial Space Type</h4>
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
          >
            <option value="" disabled className="bg-black">Select a commercial space type</option>
            {commercialTypes.map(({ value, label }) => (
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
                {selectedType === 'data-center' && 'Specialized facility designed for housing computer systems and associated components.'}
                {selectedType === 'healthcare' && 'Purpose-built space for medical facilities and healthcare services.'}
                {selectedType === 'hotel' && 'Commercial space suitable for hospitality services and accommodation.'}
                {selectedType === 'educational' && 'Facility designed for educational purposes with necessary infrastructure.'}
                {selectedType === 'film-studio' && 'Professional space equipped for film and media production.'}
              </p>
            </div>
          )}

          {selectedType && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Key Features</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'data-center' && (
                    <>
                      <li>• Power infrastructure</li>
                      <li>• Cooling systems</li>
                      <li>• Security measures</li>
                      <li>• Network connectivity</li>
                    </>
                  )}
                  {selectedType === 'healthcare' && (
                    <>
                      <li>• Medical infrastructure</li>
                      <li>• Sterilization facilities</li>
                      <li>• Patient areas</li>
                      <li>• Emergency access</li>
                    </>
                  )}
                  {selectedType === 'hotel' && (
                    <>
                      <li>• Room infrastructure</li>
                      <li>• Common facilities</li>
                      <li>• Service areas</li>
                      <li>• Parking space</li>
                    </>
                  )}
                  {selectedType === 'educational' && (
                    <>
                      <li>• Classrooms</li>
                      <li>• Laboratory spaces</li>
                      <li>• Library facility</li>
                      <li>• Recreation areas</li>
                    </>
                  )}
                  {selectedType === 'film-studio' && (
                    <>
                      <li>• Sound stages</li>
                      <li>• Production facilities</li>
                      <li>• Post-production rooms</li>
                      <li>• Equipment storage</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h5 className="font-medium mb-2">Ideal For</h5>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedType === 'data-center' && (
                    <>
                      <li>• IT companies</li>
                      <li>• Cloud providers</li>
                      <li>• Telecom operators</li>
                      <li>• Hosting services</li>
                    </>
                  )}
                  {selectedType === 'healthcare' && (
                    <>
                      <li>• Medical clinics</li>
                      <li>• Diagnostic centers</li>
                      <li>• Specialty clinics</li>
                      <li>• Healthcare providers</li>
                    </>
                  )}
                  {selectedType === 'hotel' && (
                    <>
                      <li>• Hotel chains</li>
                      <li>• Resort operators</li>
                      <li>• Boutique hotels</li>
                      <li>• Service apartments</li>
                    </>
                  )}
                  {selectedType === 'educational' && (
                    <>
                      <li>• Schools</li>
                      <li>• Colleges</li>
                      <li>• Training centers</li>
                      <li>• Coaching institutes</li>
                    </>
                  )}
                  {selectedType === 'film-studio' && (
                    <>
                      <li>• Production houses</li>
                      <li>• Media companies</li>
                      <li>• Content creators</li>
                      <li>• Broadcasting studios</li>
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

export default OtherCommercialType;