import { useState } from 'react';
import { ArrowRight, User, Phone, Mail, Clock } from 'lucide-react';

interface CommercialContactProps {
  onContactChange?: (contact: Record<string, any>) => void;
}

const CommercialContact = ({ onContactChange }: CommercialContactProps) => {
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
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <User className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          {/* Name */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <User size={20} className="text-black" />
              Owner/Agent Name
            </h4>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter full name"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Phone size={20} className="text-black" />
                Phone Number
              </h4>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter primary phone number"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-black">
                <Phone size={20} className="text-black" />
                Alternate Contact Number
              </h4>
              <input
                type="tel"
                value={contact.alternatePhone}
                onChange={(e) => handleChange('alternatePhone', e.target.value)}
                placeholder="Enter alternate phone number"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Mail size={20} className="text-black" />
              Email ID
            </h4>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
            />
          </div>

          {/* Best Time to Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center gap-2 text-black">
              <Clock size={20} className="text-black" />
              Best Time to Contact
            </h4>
            <select
              value={contact.bestTimeToContact}
              onChange={(e) => handleChange('bestTimeToContact', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
            >
              <option value="" disabled className="text-black bg-white">Select preferred time</option>
              <option value="morning" className="text-black bg-white">Morning (8 AM - 12 PM)</option>
              <option value="afternoon" className="text-black bg-white">Afternoon (12 PM - 4 PM)</option>
              <option value="evening" className="text-black bg-white">Evening (4 PM - 8 PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialContact;