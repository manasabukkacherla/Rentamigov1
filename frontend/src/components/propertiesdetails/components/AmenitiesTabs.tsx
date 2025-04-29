import React, { useState, useEffect } from "react";
import type { PropertyDetails } from "../types";
import {
  AirVent, Bed, Utensils, Flame, Tv, Box, Refrigerator, Sofa, Microwave, 
  Gamepad, WashingMachine, Camera, PlayCircle, Building2, Dumbbell, Bath,
  FileWarning, School, Tent, Calculator, BatteryCharging, Shield, Target,
  AlertTriangle, CheckCircle, Sparkles, Wifi, Coffee, Palette,
} from "lucide-react";

interface AmenitiesTabsProps {
  details: PropertyDetails;
}

const amenityIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Air Conditioner": AirVent,
  Bed: Bed,
  "Dining Table": Utensils,
  "Gas Connection": Flame,
  TV: Tv,
  Wardrobe: Box,
  Refrigerator: Refrigerator,
  Sofa: Sofa,
  Microwave: Microwave,
  "Play Station": Gamepad,
  "Washing Machine": WashingMachine,
  CCTV: Camera,
  "Children Play Area": PlayCircle,
  "Club House": Building2,
  Gym: Dumbbell,
  Jacuzzi: Bath,
  "Jogging Track": FileWarning,
  "Kids Pool": School,
  "Lawn Tennis Court": Tent,
  Lift: Calculator,
  "Power Backup": BatteryCharging,
  Security: Shield,
  "Squash Court": Target,
  WiFi: Wifi,
  "Coffee Shop": Coffee,
  "Community Hall": Palette,
};

const tabs = [
  { id: "flat", label: "Flat Amenities", icon: Home },
  { id: "society", label: "Society Amenities", icon: Building2 },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "restrictions", label: "Restrictions", icon: AlertTriangle },
] as const;

type TabType = (typeof tabs)[number]["id"];

export const AmenitiesTabs: React.FC<AmenitiesTabsProps> = ({ details }) => {
  const [activeTab, setActiveTab] = useState<TabType>("flat");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const AmenityCard = ({ icon: Icon, label }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }) => (
    <div className="flex flex-col items-center p-2 sm:p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-2">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <span className="text-center text-xs sm:text-sm font-medium text-gray-800 mt-1">{label}</span>
    </div>
  );

  const getTabContent = () => {
    switch (activeTab) {
      case "flat":
        return (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-0">
            {details.flatAmenities.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Box} label={amenity} />
            ))}
          </div>
        );
      case "society":
        return (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-0">
            {details.societyAmenities.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Building2} label={amenity} />
            ))}
          </div>
        );
      case "features":
        return (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-0">
            {details.features.map((feature) => (
              <AmenityCard key={feature} icon={CheckCircle} label={feature} />
            ))}
          </div>
        );
      case "restrictions":
        return (
          <div className="space-y-0">
            {details.restrictions.map((restriction) => (
              <div key={restriction} className="flex items-center gap-0 p-0.5 bg-red-50 rounded">
                <div className="flex-shrink-0 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-1.5 h-1.5 text-red-500" />
                </div>
                <span className="text-[8px] font-medium text-red-700 ml-0.5">{restriction}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Amenities & Details</h2>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-0 px-1 py-0.5 rounded transition-all duration-200 ${
                activeTab === tab.id ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-2 h-2" />
              <span className="font-medium text-[8px] ml-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[100px] px-2 sm:px-4">{getTabContent()}</div>
    </div>
  );
};

function Home(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
