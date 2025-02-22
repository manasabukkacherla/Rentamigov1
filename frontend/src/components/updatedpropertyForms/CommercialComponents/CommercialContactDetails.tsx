import { useState } from 'react';
import { ArrowRight, User, Phone, Mail, Clock } from 'lucide-react';

interface CommercialContactDetailsProps {
  onContactChange?: (contact: Record<string, any>) => void;
}

const CommercialContactDetails = ({ onContactChange }: CommercialContactDetailsProps) => {
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    alternatePhone: '',
    bestTimeToContact: ''
  });

  const handleChange = (field: string, value: string) => {
    const updatedContact = { ...contact, [field]: value };
    setContact(updatedContact);
    onContactChange?.(updatedContact);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Contact Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Contact Information</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          {/* Name */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <User size={20} className="text-white/60" />
              Owner/Agent Name
            </h4>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter full name"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Phone size={20} className="text-white/60" />
                Phone Number
              </h4>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter primary phone number"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Phone size={20} className="text-white/60" />
                Alternate Contact Number
              </h4>
              <input
                type="tel"
                value={contact.alternatePhone}
                onChange={(e) => handleChange('alternatePhone', e.target.value)}
                placeholder="Enter alternate phone number"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Mail size={20} className="text-white/60" />
              Email ID
            </h4>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>

          {/* Best Time to Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Clock size={20} className="text-white/60" />
              Best Time to Contact
            </h4>
            <select
              value={contact.bestTimeToContact}
              onChange={(e) => handleChange('bestTimeToContact', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white"
            >
              <option value="" disabled className="bg-black">Select preferred time</option>
              <option value="morning" className="bg-black">Morning (8 AM - 12 PM)</option>
              <option value="afternoon" className="bg-black">Afternoon (12 PM - 4 PM)</option>
              <option value="evening" className="bg-black">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialContactDetails;