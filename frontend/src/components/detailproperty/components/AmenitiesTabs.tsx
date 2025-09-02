import React, { useState, useEffect, useRef } from 'react';
import { PropertyDetails } from '../types';
import { AirVent, Bed, Utensils, Flame, Tv, Box, Refrigerator, Sofa, Microwave, Gamepad, Shirt, WashingMachine, Camera, PlayCircle, Building2, Dumbbell, Bath, FileWarning as Running, School as Pool, Tent as Tennis, Calculator as Elevator, BatteryCharging, Shield, AlertTriangle, ChevronRight, ChevronLeft, LucideIcon, Toilet, Users, Coffee, Truck, Sun, FireExtinguisher, Monitor, Wifi, Server, Building, Car, Clock, MapPin, Wind as WindowIcon, MapPin as RoadIcon } from 'lucide-react';
import { Property } from '../App';

// Add IconWrapper component
const IconWrapper = ({ icon: Icon, className }: { icon: LucideIcon; className?: string }) => {
  return <Icon className={className} />;
};

// Add styles
const progressAnimation = `
@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = progressAnimation;
document.head.appendChild(styleSheet);

interface AmenitiesTabsProps {
  details: PropertyDetails;
  property: Property;
}

const amenityIcons: Record<string, LucideIcon> = {
  'privateWashrooms': Toilet,
  'commonWashrooms': Users,
  'pantryCafeteria': Coffee,
  'passengerLift': Elevator,
  'freightLift': Truck,
  'generator': BatteryCharging,
  'inverter': BatteryCharging,
  'solar': Sun,
  'cctv': Camera,
  'securityGuards': Shield,
  'gatedAccess': Building2,
  'fireExtinguishers': FireExtinguisher,
  'sprinklerSystem': AlertTriangle,
  'emergencyExits': AlertTriangle,
  'coveredParking': Car,
  'openParking': Building,
  'parkingSlots': Car,
  'receptionArea': Building,
  'conferenceRooms': Building,
  'centralizedAC': Monitor,
  'splitAC': Monitor,
  'wifi': Wifi,
  'serverRoom': Server,
  'naturalLighting': Sun,
  'commonAreaMaintenance': Building,
  'landscaping': Building,
  'waterSupply': Building,
  'wasteManagement': Building,
  'businessLounge': Building,
  'fitnessArea': Dumbbell,
  'visitorParking': Car,
  'emergencyServices': AlertTriangle,
  'wheelchairRamps': Building,
  'elevators': Elevator,
  'handrails': Building,
  'signageBranding': Building2,
  'airConditioning': AirVent,
  'bed': Bed,
  'kitchen': Utensils,
  'gas': Flame,
  'tv': Tv,
  'washingMachine': WashingMachine,
  'refrigerator': Refrigerator,
  'sofa': Sofa,
  'microwave': Microwave,
  'gym': Dumbbell,
  'pool': Pool,
  'tennisCourt': Tennis,
  'lawnTennisCourt': Tennis,
  'lift': Elevator,
  'powerBackup': BatteryCharging,
  'security': Shield,
  'squashCourt': AlertTriangle,
  'playStation': Gamepad,
  'childrenPlayArea': PlayCircle,
  'clubHouse': Building2,
  'jacuzzi': Bath,
  'joggingTrack': Running,
  'kidsPool': Pool,
  'window': WindowIcon,
  'road': RoadIcon,
  'clock': Clock,
  'mapPin': MapPin,
};

const tabs = [
  { id: 'flat', label: 'Flat Amenities', icon: Building2 },
  { id: 'society', label: 'Society Amenities', icon: Shield },
  { id: 'restrictions', label: 'Restrictions', icon: AlertTriangle },
  { id: 'features', label: 'Features', icon: Building }
] as const;

type TabType = typeof tabs[number]['id'];

export const AmenitiesTabs: React.FC<AmenitiesTabsProps> = ({ details, property }) => {
  const [activeTab, setActiveTab] = useState<TabType>('flat');
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!autoScrollPaused) {
      interval = setInterval(() => {
        setActiveTab(current => {
          const currentIndex = tabs.findIndex(tab => tab.id === current);
          return tabs[(currentIndex + 1) % tabs.length].id;
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoScrollPaused]);

  useEffect(() => {
    // Scroll active tab into view on mobile
    if (tabsRef.current) {
      const activeElement = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeElement) {
        const scrollLeft = activeElement.getBoundingClientRect().left + 
          tabsRef.current.scrollLeft - 
          tabsRef.current.getBoundingClientRect().left - 
          16; // Add padding offset
        tabsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeTab]);

  const handlePrevTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  const handleNextTab = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[newIndex].id);
  };

  interface Feature {
    icon: LucideIcon;
    label: string;
    value: string | boolean;
  }

  const getFeatures = (property: Property): Feature[] => {
    const features: Feature[] = [];
    
    switch (property.metadata?.propertyName) {
      case 'Shop':
        if (property.shopDetails) {
          if (property.shopDetails.frontageWidth) {
            features.push({
              icon: Building,
              label: 'Frontage Width',
              value: `${property.shopDetails.frontageWidth} ft`
            });
          }
          if (property.shopDetails.heightOfShop) {
            features.push({
              icon: Building,
              label: 'Shop Height',
              value: `${property.shopDetails.heightOfShop} ft`
            });
          }
          if (property.shopDetails.displayWindow) {
            features.push({
              icon: WindowIcon,
              label: 'Display Window',
              value: true
            });
          }
          if (property.shopDetails.attachedStorageRoom) {
            features.push({
              icon: Box,
              label: 'Storage Room',
              value: true
            });
          }
          if (property.shopDetails.averageFootTraffic) {
            features.push({
              icon: Users,
              label: 'Foot Traffic',
              value: property.shopDetails.averageFootTraffic
            });
          }
          if (property.shopDetails.customerParking) {
            features.push({
              icon: Car,
              label: 'Customer Parking',
              value: true
            });
          }
          if (property.shopDetails.previousBusiness) {
            features.push({
              icon: Building2,
              label: 'Previous Business',
              value: property.shopDetails.previousBusiness
            });
          }
        }
        break;

      case 'Retail Store':
        if (property.retailStoreDetails) {
          if (property.retailStoreDetails.location) {
            features.push({
              icon: MapPin,
              label: 'Location',
              value: property.retailStoreDetails.location
            });
          }
          if (property.retailStoreDetails.anchorStores) {
            features.push({
              icon: Building2,
              label: 'Anchor Stores',
              value: true
            });
          }
          if (property.retailStoreDetails.footfallData) {
            features.push({
              icon: Users,
              label: 'Footfall Data',
              value: property.retailStoreDetails.footfallData
            });
          }
          if (property.retailStoreDetails.signageAllowed) {
            features.push({
              icon: Building2,
              label: 'Signage Allowed',
              value: true
            });
          }
          if (property.retailStoreDetails.sharedWashrooms) {
            features.push({
              icon: Bath,
              label: 'Shared Washrooms',
              value: true
            });
          }
          if (property.retailStoreDetails.fireExit) {
            features.push({
              icon: FireExtinguisher,
              label: 'Fire Exit',
              value: true
            });
          }
        }
        break;

      case 'Showroom':
        if (property.showroomDetails) {
          if (property.showroomDetails.totalSpace) {
            features.push({
              icon: Building,
              label: 'Total Space',
              value: `${property.showroomDetails.totalSpace} sqft`
            });
          }
          if (property.showroomDetails.frontageWidth) {
            features.push({
              icon: Building,
              label: 'Frontage Width',
              value: `${property.showroomDetails.frontageWidth} ft`
            });
          }
          if (property.showroomDetails.ceilingHeight) {
            features.push({
              icon: Building,
              label: 'Ceiling Height',
              value: `${property.showroomDetails.ceilingHeight} ft`
            });
          }
          if (property.showroomDetails.glassFrontage) {
            features.push({
              icon: WindowIcon,
              label: 'Glass Frontage',
              value: true
            });
          }
          if (property.showroomDetails.lightingType) {
            features.push({
              icon: Sun,
              label: 'Lighting Type',
              value: property.showroomDetails.lightingType
            });
          }
          if (property.showroomDetails.acInstalled) {
            features.push({
              icon: AirVent,
              label: 'AC Installed',
              value: true
            });
          }
          if (property.showroomDetails.nearbyCompetitors?.present) {
            features.push({
              icon: Building2,
              label: 'Nearby Competitors',
              value: property.showroomDetails.nearbyCompetitors.brandNames
            });
          }
          if (property.showroomDetails.displayRacks) {
            features.push({
              icon: Box,
              label: 'Display Racks',
              value: true
            });
          }
        }
        break;

      case 'Office Space':
        if (property.officeDetails) {
          if (property.officeDetails.seatingCapacity) {
            features.push({
              icon: Users,
              label: 'Seating Capacity',
              value: `${property.officeDetails.seatingCapacity} persons`
            });
          }
          if (property.officeDetails.cabins?.available) {
            features.push({
              icon: Building,
              label: 'Cabins',
              value: property.officeDetails.cabins.count ? `${property.officeDetails.cabins.count} cabins` : true
            });
          }
          if (property.officeDetails.conferenceRoom) {
            features.push({
              icon: Building,
              label: 'Conference Room',
              value: true
            });
          }
          if (property.officeDetails.meetingRoom) {
            features.push({
              icon: Building,
              label: 'Meeting Room',
              value: true
            });
          }
          if (property.officeDetails.receptionArea) {
            features.push({
              icon: Building,
              label: 'Reception Area',
              value: true
            });
          }
          if (property.officeDetails.wifiSetup) {
            features.push({
              icon: Wifi,
              label: 'WiFi Setup',
              value: true
            });
          }
          if (property.officeDetails.serverRoom) {
            features.push({
              icon: Server,
              label: 'Server Room',
              value: true
            });
          }
          if (property.officeDetails.coworkingFriendly) {
            features.push({
              icon: Building,
              label: 'Coworking Friendly',
              value: true
            });
          }
        }
        break;

      case 'Warehouse':
        if (property.warehouseDetails) {
          if (property.warehouseDetails.access24x7) {
            features.push({
              icon: Clock,
              label: '24x7 Access',
              value: true
            });
          }
          if (property.warehouseDetails.ceilingHeight) {
            features.push({
              icon: Building,
              label: 'Ceiling Height',
              value: `${property.warehouseDetails.ceilingHeight} ft`
            });
          }
          if (property.warehouseDetails.totalArea) {
            features.push({
              icon: Building,
              label: 'Total Area',
              value: `${property.warehouseDetails.totalArea} sqft`
            });
          }
          if (property.warehouseDetails.docks) {
            features.push({
              icon: Truck,
              label: 'Docks',
              value: `${property.warehouseDetails.docks.count} docks (${property.warehouseDetails.docks.height} ft)`
            });
          }
          if (property.warehouseDetails.floorLoadCapacity) {
            features.push({
              icon: Building,
              label: 'Floor Load Capacity',
              value: `${property.warehouseDetails.floorLoadCapacity} kg/sqft`
            });
          }
          if (property.warehouseDetails.fireSafety) {
            features.push({
              icon: FireExtinguisher,
              label: 'Fire Safety',
              value: true
            });
          }
          if (property.warehouseDetails.securityPersonnel) {
            features.push({
              icon: Shield,
              label: 'Security Personnel',
              value: true
            });
          }
          if (property.warehouseDetails.truckParking) {
            features.push({
              icon: Car,
              label: 'Truck Parking',
              value: true
            });
          }
        }
        break;

      case 'Covered Space':
        if (property.spaceDetails) {
          if (property.spaceDetails.totalArea) {
            features.push({
              icon: Building,
              label: 'Total Area',
              value: `${property.spaceDetails.totalArea} ${property.spaceDetails.areaUnit}`
            });
          }
          if (property.spaceDetails.coveredArea) {
            features.push({
              icon: Building,
              label: 'Covered Area',
              value: `${property.spaceDetails.coveredArea} ${property.spaceDetails.areaUnit}`
            });
          }
          if (property.spaceDetails.openArea) {
            features.push({
              icon: Building,
              label: 'Open Area',
              value: `${property.spaceDetails.openArea} ${property.spaceDetails.areaUnit}`
            });
          }
          if (property.spaceDetails.roadWidth) {
            features.push({
              icon: RoadIcon,
              label: 'Road Width',
              value: `${property.spaceDetails.roadWidth} ${property.spaceDetails.roadWidthUnit}`
            });
          }
          if (property.spaceDetails.ceilingHeight) {
            features.push({
              icon: Building,
              label: 'Ceiling Height',
              value: `${property.spaceDetails.ceilingHeight} ${property.spaceDetails.ceilingHeightUnit}`
            });
          }
          if (property.spaceDetails.noOfOpenSides) {
            features.push({
              icon: Building,
              label: 'Open Sides',
              value: `${property.spaceDetails.noOfOpenSides} sides`
            });
          }
        }
        break;
      case 'Others':
        if (property.otherDetails) {
          if (property.otherDetails.propertyTypeDescription) {
            features.push({
              icon: Building,
              label: 'Property Type',
              value: property.otherDetails.propertyTypeDescription
            });
          }
          if (property.otherDetails.specialFeatures) {
            features.push({
              icon: Box,
              label: 'Special Features',
              value: property.otherDetails.specialFeatures
            });
          }
          if (property.otherDetails.usageRecommendation) {
            features.push({
              icon: Building2,
              label: 'Usage Recommendation',
              value: property.otherDetails.usageRecommendation
            });
          }
          if (property.otherDetails.additionalRequirements) {
            features.push({
              icon: AlertTriangle,
              label: 'Additional Requirements',
              value: property.otherDetails.additionalRequirements
            });
          }
        }
        break;

      default:
        // Add other property types as needed
        features.push({
          icon: Box,
          label: 'No features available',
          value: true
        });
        break;
    }

    return features;
  };


  const FeatureCard = ({ icon: Icon, label, value }: Feature) => (
    <div className="group flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="w-12 h-12 bg-white group-hover:bg-gray-50 rounded-lg flex items-center justify-center transition-colors">
        <IconWrapper icon={Icon} className="w-6 h-6 text-gray-900" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{label}</p>
        {typeof value === 'string' ? (
          <p className="text-sm text-gray-500">{value}</p>
        ) : (
          <span className="text-sm text-gray-500">✓</span>
        )}
      </div>
    </div>
  );

  const AmenityCard = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
    <div className="group flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="w-12 h-12 bg-white group-hover:bg-gray-50 rounded-lg flex items-center justify-center transition-colors">
        <IconWrapper icon={Icon} className="w-6 h-6 text-gray-900" />
      </div>
      <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{label}</span>
    </div>
  );

  // console.log(property.showroomDetails?.totalSpace)

  const getTabContent = () => {
    switch (activeTab) {
      case 'flat':
        return (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 transition-all duration-500">
            {property?.propertyDetails?.propertyAmenities === undefined && (
              <p className="text-center text-gray-500">No amenities available</p>
            )}
            {property?.propertyDetails?.propertyAmenities?.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Box} label={amenity} />
            ))}
          </div>
        );
      case 'society':
        return (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 transition-all duration-500">
            {property?.propertyDetails?.wholeSpaceAmenities === undefined && (
              <p className="text-center text-gray-500">No amenities available</p>
            )}
            {property?.propertyDetails?.wholeSpaceAmenities?.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Box} label={amenity} />
            ))}
          </div>
        );
      case 'restrictions':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-500">
            {details.restrictions.map((restriction) => (
              <div
                key={restriction}
                className="group flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white group-hover:bg-gray-50 rounded-lg flex items-center justify-center transition-colors">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{restriction}</span>
              </div>
            ))}
          </div>
        );
      case 'features':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {getFeatures(property).map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        );
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
      onMouseEnter={() => setAutoScrollPaused(true)}
      onMouseLeave={() => setAutoScrollPaused(false)}
      onTouchStart={() => setAutoScrollPaused(true)}
      onTouchEnd={() => setAutoScrollPaused(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Property Details</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevTab}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous tab"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleNextTab}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next tab"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div 
        ref={tabsRef}
        className="flex gap-3 mb-6 overflow-x-auto pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 relative flex-shrink-0 ${
                activeTab === tab.id 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconWrapper icon={Icon} className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1">
                  <div 
                    className={`h-full bg-white/30 rounded-full transition-all duration-5000 ${
                      !autoScrollPaused ? 'animate-[progress_5s_linear]' : ''
                    }`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="transition-all duration-500"
          key={activeTab}
        >
          {getTabContent()}
        </div>
      </div>
    </div>
  );
};