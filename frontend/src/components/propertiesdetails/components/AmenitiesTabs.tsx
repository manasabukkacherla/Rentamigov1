"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { PropertyDetails } from "../types"
import {
  AirVent,
  Bed,
  Utensils,
  Flame,
  Tv,
  Box,
  Refrigerator,
  Sofa,
  Microwave,
  Gamepad,
  WashingMachine,
  Camera,
  PlayCircle,
  Building2,
  Dumbbell,
  Bath,
  FileWarning,
  School,
  Tent,
  Calculator,
  BatteryCharging,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Wifi,
  Coffee,
  Palette,
} from "lucide-react"

interface AmenitiesTabsProps {
  details: PropertyDetails
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
}

const tabs = [
  { id: "flat", label: "Flat Amenities", icon: Home },
  { id: "society", label: "Society Amenities", icon: Building2 },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "restrictions", label: "Restrictions", icon: AlertTriangle },
] as const

type TabType = (typeof tabs)[number]["id"]

export const AmenitiesTabs: React.FC<AmenitiesTabsProps> = ({ details }) => {
  const [activeTab, setActiveTab] = useState<TabType>("flat")
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isManual]);

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsManual(true);
  };

  const AmenityCard = ({ icon: Icon, label }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }) => (
    <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-gray-100">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <span className="text-center text-sm font-medium text-gray-800">{label}</span>
    </div>
  )

  const getTabContent = () => {
    switch (activeTab) {
      case "flat":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {details.flatAmenities.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Box} label={amenity} />
            ))}
          </div>
        )
      case "society":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {details.societyAmenities.map((amenity) => (
              <AmenityCard key={amenity} icon={amenityIcons[amenity] || Building2} label={amenity} />
            ))}
          </div>
        )
      case "features":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {details.features.map((feature) => (
              <AmenityCard key={feature} icon={CheckCircle} label={feature} />
            ))}
          </div>
        )
      case "restrictions":
        return (
          <div className="space-y-3">
            {details.restrictions.map((restriction) => (
              <div key={restriction} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm font-medium text-red-700">{restriction}</span>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities & Details</h2>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === tab.id ? "bg-gray-900 text-white shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="min-h-[300px]">{getTabContent()}</div>
    </div>
  )
}

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
  )
}

