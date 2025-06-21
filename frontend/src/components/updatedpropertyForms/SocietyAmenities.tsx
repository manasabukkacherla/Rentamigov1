import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Car,
  Dumbbell,
  Users,
  Heart,
  Building,
  Leaf,
  Home,
} from 'lucide-react';

interface SocietyAmenitiesType  {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[];
  smarthometechnology: string[];
  otheritems: string[];
}

interface SocietyAmenitiesProps {
  amenities: SocietyAmenitiesType ;
  onChange: (updated: SocietyAmenitiesType ) => void;
}

const SocietyAmenities = ({ amenities, onChange }: SocietyAmenitiesProps) => {
  const [categoryAmenities, setCategoryAmenities] = useState<SocietyAmenitiesType >(amenities);

  useEffect(() => {
    setCategoryAmenities(amenities); // Sync from parent on prop change
  }, [amenities]);

  const handleAmenityChange = (
    category: keyof SocietyAmenitiesType ,
    amenity: string,
    checked: boolean
  ) => {
    const currentItems = categoryAmenities[category] || [];
    const updatedItems = checked
      ? [...currentItems, amenity]
      : currentItems.filter((item) => item !== amenity);

    const updatedState = {
      ...categoryAmenities,
      [category]: updatedItems,
    };

    setCategoryAmenities(updatedState);
    onChange(updatedState);
  };

  const amenitiesCategories: {
    key: keyof SocietyAmenitiesType ;
    title: string;
    icon: React.ElementType;
    items: string[];
  }[] = [
    {
      key: 'powerutility',
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
        'Smart Metering for Electricity & Water',
      ],
    },
    {
      key: 'parkingtranspotation',
      title: 'Parking & Transportation',
      icon: Car,
      items: [
        'Covered Car Parking (Basement / Stilt)',
        'Visitor Parking',
        'Electric Vehicle (EV) Charging Stations',
        'Cycle / Bicycle Parking',
        'Dedicated Two-Wheeler Parking',
        'Valet Parking',
      ],
    },
    {
      key: 'recreationalsportsfacilities',
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
        'Mini Golf Course',
      ],
    },
    {
      key: 'childrenfamilyamenities',
      title: "Children's & Family Amenities",
      icon: Users,
      items: [
        'Kids Play Area / Park',
        'Creche / Daycare Center',
        'Nursery & Primary School',
        'Party Hall / Banquet Hall',
        'Library / Reading Room',
      ],
    },
    {
      key: 'healthwellnessfacilities',
      title: 'Health & Wellness Facilities',
      icon: Heart,
      items: [
        'Medical Room / Clinic',
        'Pharmacy / Chemist Store',
        'Sauna / Steam Room',
        'Spa & Wellness Center',
        'Jacuzzi / Hot Tub',
      ],
    },
    {
      key: 'shoppingconviencestores',
      title: 'Shopping & Convenience Stores',
      icon: Building,
      items: [
        'Grocery Store / Supermarket',
        'ATM & Banking Facilities',
        'Salon & Beauty Parlor',
        'Cafeteria / Coffee Shop',
        'Laundry & Dry Cleaning Services',
      ],
    },
    {
      key: 'ecofriendlysustainable',
      title: 'Eco-Friendly & Sustainable Features',
      icon: Leaf,
      items: [
        'Landscaped Gardens & Green Zones',
        'Walking Trails & Nature Parks',
        'Organic Farming / Community Garden',
        'Butterfly Garden / Herbal Garden',
        'Air Purifying Plants in Common Areas',
        'Zero-Waste Management',
      ],
    },
    {
      key: 'communityculturalspaces',
      title: 'Community & Cultural Spaces',
      icon: Users,
      items: [
        'Community Hall / Multipurpose Hall',
        'Senior Citizens Sitting Area',
        'Co-Working Space / Business Lounge',
        'Dedicated Pet Park / Pet Zone',
        'Music / Dance Room',
      ],
    },
    {
      key: 'smarthometechnology',
      title: 'Smart Home & Technology Features',
      icon: Home,
      items: [
        'Home Automation (Lighting & AC Control)',
        'Smart Door Locks',
        'High-Speed Wi-Fi in Common Areas',
        'Digital Notice Board / App Updates',
        'Automated Car Wash Station',
      ],
    },
    {
      key: 'otheritems',
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
        'Visitor Management System',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-semibold text-black">Society Amenities</h3>
        <ArrowRight className="opacity-40 text-black" size={20} />
        <span className="text-sm opacity-70 text-black">Select Available Features</span>
      </div>

      <div className="space-y-6">
        {amenitiesCategories.map(({ key, title, icon: Icon, items }) => (
          <div
            key={key}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/5 rounded-lg">
                <Icon size={24} className="text-black" />
              </div>
              <h4 className="text-lg font-medium text-black">{title}</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 p-3 hover:bg-black/5 rounded-lg transition-colors duration-200 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={categoryAmenities[key]?.includes(amenity) || false}
                    onChange={(e) => handleAmenityChange(key, amenity, e.target.checked)}
                    className="w-5 h-5 rounded border-black/20 bg-white focus:ring-black text-black transition-colors duration-200"
                  />
                  <span className="text-black/80 text-sm group-hover:text-black transition-colors duration-200">
                    {amenity}
                  </span>
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
