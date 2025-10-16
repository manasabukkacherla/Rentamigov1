"use client"

import type React from "react"
import { useState } from "react"
import { Heart, GraduationCap, Train, ShoppingBag, Utensils, Briefcase } from "lucide-react"

interface NearbyCategory {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  places: { name: string; distance: string }[]
}

export const NearbyPlaces: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const nearbyCategories: NearbyCategory[] = [
    {
      title: "Hospitals",
      icon: Heart,
      places: [
        { name: "City Hospital", distance: "0.5 km" },
        { name: "Apollo Clinic", distance: "1.2 km" },
        { name: "Fortis Healthcare", distance: "2.3 km" },
      ],
    },
    {
      title: "Education",
      icon: GraduationCap,
      places: [
        { name: "Delhi Public School", distance: "1.0 km" },
        { name: "Engineering College", distance: "2.5 km" },
        { name: "International School", distance: "3.2 km" },
      ],
    },
    {
      title: "Transit",
      icon: Train,
      places: [
        { name: "Electronic City Metro", distance: "0.8 km" },
        { name: "Tech Park Metro", distance: "1.5 km" },
        { name: "Central Bus Terminal", distance: "2.0 km" },
      ],
    },
    {
      title: "Shopping",
      icon: ShoppingBag,
      places: [
        { name: "Forum Mall", distance: "1.8 km" },
        { name: "Central Shopping Center", distance: "2.2 km" },
        { name: "Neighborhood Market", distance: "0.5 km" },
      ],
    },
    {
      title: "Dining",
      icon: Utensils,
      places: [
        { name: "Spice Garden Restaurant", distance: "0.7 km" },
        { name: "Cafe Coffee Day", distance: "0.9 km" },
        { name: "Food Street", distance: "1.5 km" },
      ],
    },
    {
      title: "Workspace",
      icon: Briefcase,
      places: [
        { name: "Infosys Campus", distance: "1.2 km" },
        { name: "Wipro Office", distance: "2.0 km" },
        { name: "Tech Park", distance: "1.7 km" },
      ],
    },
  ]

  const filteredCategories =
    activeCategory === "all" ? nearbyCategories : nearbyCategories.filter((cat) => cat.title === activeCategory)

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Nearby Places</h2>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 flex-wrap hide-scrollbar">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeCategory === "all" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Categories
        </button>

        {nearbyCategories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.title}
              onClick={() => setActiveCategory(category.title)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.title
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.title}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCategories.map((category) => {
          const Icon = category.icon
          return (
            <div key={category.title} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4 text-gray-700" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{category.title}</h3>
              </div>

              <div className="space-y-2">
                {category.places.map((place, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white rounded-md">
                    <span className="text-gray-800 text-sm">{place.name}</span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded-md">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

