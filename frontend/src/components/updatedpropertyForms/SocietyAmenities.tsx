import { useState } from 'react';
import { ArrowRight, Shield, Zap, Car, Dumbbell, Users, Heart, Building, Leaf, Home } from 'lucide-react';

interface SocietyAmenitiesProps {
  onAmenitiesChange?: (amenities: Record<string, boolean>) => void;
}

const SocietyAmenities = ({ onAmenitiesChange }: SocietyAmenitiesProps) => {
  const amenitiesCategories = [
    {
      title: 'Security & Safety Amenities',
      icon: Shield,
      items: [
        '24/7 Security with CCTV Surveillance',
        'Gated Entry with Boom Barriers',
        'Intercom Facility',
        'Biometric Access / Smart Card Entry',
        'Fire Safety Systems (Smoke Detectors, Fire Extinguishers, Sprinklers)',
        'Earthquake-Resistant Construction',
        'Video Door Phone',
        'Security Personnel / Guard Patrol',
        'Visitor Management System'
      ]
    },
    {
      title: 'Power & Utilities',
      icon: Zap,
      items: [
        '24/7 Power Backup',
        'High-Speed Elevators & Service Lifts',
        'Water Supply (Borewell + Municipal)',
        'Rainwater Harvesting System',
        'Solar Panels for Common Areas',
        'Sewage Treatment Plant (STP)',
        'Garbage Disposal & Waste Management',
        'Smart Metering for Electricity & Water'
      ]
    },
    {
      title: 'Parking & Transportation',
      icon: Car,
      items: [
        'Covered Car Parking (Basement / Stilt)',
        'Visitor Parking',
        'Electric Vehicle (EV) Charging Stations',
        'Cycle / Bicycle Parking',
        'Dedicated Two-Wheeler Parking',
        'Valet Parking'
      ]
    },
    {
      title: 'Recreational & Sports Facilities',
      icon: Dumbbell,
      items: [
        'Clubhouse with Lounge Area',
        'Swimming Pool & Kids Pool',
        'Gymnasium / Fitness Center',
        'Indoor Sports (Table Tennis, Billiards, Chess, Carrom)',
        'Outdoor Sports (Tennis, Basketball, Badminton Courts)',
        'Cricket Practice Net',
        'Jogging / Cycling Track',
        'Yoga & Meditation Zone',
        'Skating Rink',
        'Amphitheater / Open-Air Cinema',
        'Mini Golf Course'
      ]
    },
    {
      title: "Children's & Family Amenities",
      icon: Users,
      items: [
        'Kids Play Area / Park',
        'Creche / Daycare Center',
        'Nursery & Primary School',
        'Party Hall / Banquet Hall',
        'Library / Reading Room'
      ]
    },
    {
      title: 'Health & Wellness Facilities',
      icon: Heart,
      items: [
        'Medical Room / Clinic',
        'Pharmacy / Chemist Store',
        'Sauna / Steam Room',
        'Spa & Wellness Center',
        'Jacuzzi / Hot Tub'
      ]
    },
    {
      title: 'Shopping & Convenience Stores',
      icon: Building,
      items: [
        'Grocery Store / Supermarket',
        'ATM & Banking Facilities',
        'Salon & Beauty Parlor',
        'Cafeteria / Coffee Shop',
        'Laundry & Dry Cleaning Services'
      ]
    },
    {
      title: 'Eco-Friendly & Sustainable Features',
      icon: Leaf,
      items: [
        'Landscaped Gardens & Green Zones',
        'Walking Trails & Nature Parks',
        'Organic Farming / Community Garden',
        'Butterfly Garden / Herbal Garden',
        'Air Purifying Plants in Common Areas',
        'Zero-Waste Management'
      ]
    },
    {
      title: 'Community & Cultural Spaces',
      icon: Users,
      items: [
        'Community Hall / Multipurpose Hall',
        'Senior Citizens Sitting Area',
        'Co-Working Space / Business Lounge',
        'Dedicated Pet Park / Pet Zone',
        'Music / Dance Room'
      ]
    },
    {
      title: 'Smart Home & Technology Features',
      icon: Home,
      items: [
        'Home Automation (Lighting & AC Control)',
        'Smart Door Locks',
        'High-Speed Wi-Fi in Common Areas',
        'Digital Notice Board / App Updates',
        'Automated Car Wash Station'
      ]
    }
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = { ...selectedAmenities, [amenity]: checked };
    setSelectedAmenities(updatedAmenities);
    onAmenitiesChange?.(updatedAmenities);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Society Amenities</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Available Features</span>
      </div>

      <div className="space-y-8">
        {amenitiesCategories.map(({ title, icon: Icon, items }) => (
          <div key={title} className="bg-white/5 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={24} className="text-white/60" />
              <h4 className="text-lg font-medium">{title}</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={selectedAmenities[amenity] || false}
                    onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                    className="rounded border-white/20 bg-transparent focus:ring-white text-white"
                  />
                  <span className="text-white/80 text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocietyAmenities;