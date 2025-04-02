"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  GraduationCap,
  Heart,
  Train,
  Bus,
  ShoppingBag,
  Coffee,
  Utensils,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const nearbyCategories = [
  {
    title: "Hospitals",
    icon: Heart,
    color: "bg-red-50 text-red-600",
    iconBg: "bg-red-100",
    places: [
      { name: "City Hospital", distance: "0.5 km", rating: 4.2 },
      { name: "Apollo Clinic", distance: "1.2 km", rating: 4.5 },
      { name: "Fortis Healthcare", distance: "2.3 km", rating: 4.7 },
    ],
  },
  {
    title: "Educational Institutes",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
    places: [
      { name: "Delhi Public School", distance: "1.0 km", rating: 4.4 },
      { name: "Engineering College", distance: "2.5 km", rating: 4.1 },
      { name: "St. Mary's School", distance: "1.8 km", rating: 4.6 },
    ],
  },
  {
    title: "Metro Stations",
    icon: Train,
    color: "bg-purple-50 text-purple-600",
    iconBg: "bg-purple-100",
    places: [
      { name: "Electronic City Metro", distance: "0.8 km", rating: 4.3 },
      { name: "Tech Park Metro", distance: "1.5 km", rating: 4.0 },
      { name: "Central Metro Station", distance: "3.2 km", rating: 4.5 },
    ],
  },
  {
    title: "Bus Stands",
    icon: Bus,
    color: "bg-green-50 text-green-600",
    iconBg: "bg-green-100",
    places: [
      { name: "EC Phase 1 Bus Stop", distance: "0.3 km", rating: 3.8 },
      { name: "Main Bus Terminal", distance: "1.0 km", rating: 4.0 },
      { name: "City Bus Station", distance: "2.1 km", rating: 3.9 },
    ],
  },
  {
    title: "Shopping Centers",
    icon: ShoppingBag,
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
    places: [
      { name: "City Mall", distance: "1.2 km", rating: 4.4 },
      { name: "Central Shopping Plaza", distance: "2.0 km", rating: 4.2 },
      { name: "Retail Park", distance: "2.8 km", rating: 4.1 },
    ],
  },
  {
    title: "Cafes",
    icon: Coffee,
    color: "bg-brown-50 text-amber-800",
    iconBg: "bg-amber-100",
    places: [
      { name: "Starbucks", distance: "0.7 km", rating: 4.3 },
      { name: "Café Coffee Day", distance: "1.1 km", rating: 4.0 },
      { name: "Barista", distance: "1.5 km", rating: 4.2 },
    ],
  },
  {
    title: "Restaurants",
    icon: Utensils,
    color: "bg-orange-50 text-orange-600",
    iconBg: "bg-orange-100",
    places: [
      { name: "The Spice Garden", distance: "0.9 km", rating: 4.5 },
      { name: "Royal Cuisine", distance: "1.3 km", rating: 4.3 },
      { name: "Food Plaza", distance: "1.8 km", rating: 4.1 },
    ],
  },
  {
    title: "Banks",
    icon: Landmark,
    color: "bg-indigo-50 text-indigo-600",
    iconBg: "bg-indigo-100",
    places: [
      { name: "HDFC Bank", distance: "0.6 km", rating: 4.2 },
      { name: "ICICI Bank", distance: "1.0 km", rating: 4.0 },
      { name: "State Bank of India", distance: "1.4 km", rating: 4.1 },
    ],
  },
]

export const NearbyPlaces: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(nearbyCategories[0].title)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const activeCategoryData = nearbyCategories.find((category) => category.title === activeCategory)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">Nearby Places</h2>

      {/* Category Tabs - Horizontal Scrollable */}
      <div className="relative mb-6">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-2 py-2 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {nearbyCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.title}
                onClick={() => setActiveCategory(category.title)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category.title
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Places Grid - Boxed Layout */}
      {activeCategoryData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCategoryData.places.map((place, index) => {
            const Icon = activeCategoryData.icon
            return (
              <div
                key={place.name}
                className={`${activeCategoryData.color} p-4 rounded-xl transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${activeCategoryData.iconBg} p-2 rounded-full`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{place.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{place.distance}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium px-1.5 py-0.5 bg-white rounded-md">{place.rating}</span>
                        <svg
                          className="w-3 h-3 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-5 text-center">
        <button className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2">
          View all nearby places
        </button>
      </div>
    </div>
  )
}
















// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import {
//   GraduationCap,
//   Heart,
//   Train,
//   Bus,
//   ShoppingBag,
//   Coffee,
//   Utensils,
//   Landmark,
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   X,
// } from "lucide-react"

// const nearbyCategories = [
//   {
//     title: "Hospitals",
//     icon: Heart,
//     color: "bg-red-50 text-red-600",
//     iconBg: "bg-red-100",
//     places: [
//       { name: "City Hospital", distance: "0.5 km", rating: 4.2 },
//       { name: "Apollo Clinic", distance: "1.2 km", rating: 4.5 },
//       { name: "Fortis Healthcare", distance: "2.3 km", rating: 4.7 },
//       { name: "Medicare Center", distance: "3.1 km", rating: 4.0 },
//       { name: "Community Health Clinic", distance: "1.7 km", rating: 3.9 },
//     ],
//   },
//   {
//     title: "Educational Institutes",
//     icon: GraduationCap,
//     color: "bg-blue-50 text-blue-600",
//     iconBg: "bg-blue-100",
//     places: [
//       { name: "Delhi Public School", distance: "1.0 km", rating: 4.4 },
//       { name: "Engineering College", distance: "2.5 km", rating: 4.1 },
//       { name: "St. Mary's School", distance: "1.8 km", rating: 4.6 },
//       { name: "International School", distance: "3.5 km", rating: 4.8 },
//       { name: "Community College", distance: "2.2 km", rating: 4.0 },
//     ],
//   },
//   {
//     title: "Metro Stations",
//     icon: Train,
//     color: "bg-purple-50 text-purple-600",
//     iconBg: "bg-purple-100",
//     places: [
//       { name: "Electronic City Metro", distance: "0.8 km", rating: 4.3 },
//       { name: "Tech Park Metro", distance: "1.5 km", rating: 4.0 },
//       { name: "Central Metro Station", distance: "3.2 km", rating: 4.5 },
//       { name: "North Junction Metro", distance: "4.1 km", rating: 4.2 },
//       { name: "South Gate Metro", distance: "2.7 km", rating: 3.8 },
//     ],
//   },
//   {
//     title: "Bus Stands",
//     icon: Bus,
//     color: "bg-green-50 text-green-600",
//     iconBg: "bg-green-100",
//     places: [
//       { name: "EC Phase 1 Bus Stop", distance: "0.3 km", rating: 3.8 },
//       { name: "Main Bus Terminal", distance: "1.0 km", rating: 4.0 },
//       { name: "City Bus Station", distance: "2.1 km", rating: 3.9 },
//       { name: "Express Bus Terminal", distance: "2.8 km", rating: 4.1 },
//       { name: "Local Bus Stop", distance: "0.5 km", rating: 3.5 },
//     ],
//   },
//   {
//     title: "Shopping Centers",
//     icon: ShoppingBag,
//     color: "bg-amber-50 text-amber-600",
//     iconBg: "bg-amber-100",
//     places: [
//       { name: "City Mall", distance: "1.2 km", rating: 4.4 },
//       { name: "Central Shopping Plaza", distance: "2.0 km", rating: 4.2 },
//       { name: "Retail Park", distance: "2.8 km", rating: 4.1 },
//       { name: "Fashion Outlet Mall", distance: "3.5 km", rating: 4.6 },
//       { name: "Neighborhood Market", distance: "0.7 km", rating: 3.9 },
//     ],
//   },
//   {
//     title: "Cafes",
//     icon: Coffee,
//     color: "bg-brown-50 text-amber-800",
//     iconBg: "bg-amber-100",
//     places: [
//       { name: "Starbucks", distance: "0.7 km", rating: 4.3 },
//       { name: "Café Coffee Day", distance: "1.1 km", rating: 4.0 },
//       { name: "Barista", distance: "1.5 km", rating: 4.2 },
//       { name: "The Coffee House", distance: "2.0 km", rating: 4.5 },
//       { name: "Brew & Bites", distance: "0.9 km", rating: 4.1 },
//     ],
//   },
//   {
//     title: "Restaurants",
//     icon: Utensils,
//     color: "bg-orange-50 text-orange-600",
//     iconBg: "bg-orange-100",
//     places: [
//       { name: "The Spice Garden", distance: "0.9 km", rating: 4.5 },
//       { name: "Royal Cuisine", distance: "1.3 km", rating: 4.3 },
//       { name: "Food Plaza", distance: "1.8 km", rating: 4.1 },
//       { name: "Gourmet Kitchen", distance: "2.2 km", rating: 4.7 },
//       { name: "Family Restaurant", distance: "1.0 km", rating: 4.0 },
//     ],
//   },
//   {
//     title: "Banks",
//     icon: Landmark,
//     color: "bg-indigo-50 text-indigo-600",
//     iconBg: "bg-indigo-100",
//     places: [
//       { name: "HDFC Bank", distance: "0.6 km", rating: 4.2 },
//       { name: "ICICI Bank", distance: "1.0 km", rating: 4.0 },
//       { name: "State Bank of India", distance: "1.4 km", rating: 4.1 },
//       { name: "Axis Bank", distance: "1.8 km", rating: 4.0 },
//       { name: "Federal Bank", distance: "2.2 km", rating: 3.9 },
//     ],
//   },
// ]

// export const NearbyPlaces: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState(nearbyCategories[0].title)
//   const [showAllPlaces, setShowAllPlaces] = useState(false)
//   const scrollContainerRef = useRef<HTMLDivElement>(null)

//   const activeCategoryData = nearbyCategories.find((category) => category.title === activeCategory)

//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
//     }
//   }

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
//     }
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-5">Nearby Places</h2>

//       {/* Category Tabs - Horizontal Scrollable */}
//       <div className="relative mb-6">
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
//           aria-label="Scroll left"
//         >
//           <ChevronLeft className="w-4 h-4 text-gray-700" />
//         </button>

//         <div
//           ref={scrollContainerRef}
//           className="flex overflow-x-auto gap-2 py-2 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//         >
//           {nearbyCategories.map((category) => {
//             const Icon = category.icon
//             return (
//               <button
//                 key={category.title}
//                 onClick={() => setActiveCategory(category.title)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
//                   activeCategory === category.title
//                     ? "bg-gray-900 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{category.title}</span>
//               </button>
//             )
//           })}
//         </div>

//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1.5 hover:bg-gray-50 transition-colors"
//           aria-label="Scroll right"
//         >
//           <ChevronRight className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {!showAllPlaces ? (
//         <>
//           {/* Places Grid - Boxed Layout */}
//           {activeCategoryData && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {activeCategoryData.places.slice(0, 3).map((place, index) => {
//                 const Icon = activeCategoryData.icon
//                 return (
//                   <div
//                     key={place.name}
//                     className={`${activeCategoryData.color} p-4 rounded-xl transition-transform hover:scale-[1.02]`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className={`${activeCategoryData.iconBg} p-2 rounded-full`}>
//                         <Icon className="w-5 h-5" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900 mb-1">{place.name}</h3>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">{place.distance}</span>
//                           <div className="flex items-center gap-1">
//                             <span className="text-xs font-medium px-1.5 py-0.5 bg-white rounded-md">
//                               {place.rating}
//                             </span>
//                             <svg
//                               className="w-3 h-3 text-yellow-500 fill-current"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}

//           <div className="mt-5 text-center">
//             <button
//               className="text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
//               onClick={() => setShowAllPlaces(true)}
//             >
//               View all nearby places
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="relative">
//           <button
//             onClick={() => setShowAllPlaces(false)}
//             className="absolute right-0 top-0 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//             aria-label="Close all places view"
//           >
//             <X className="w-4 h-4 text-gray-700" />
//           </button>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
//             {/* Categories list - left side */}
//             <div className="bg-gray-50 p-4 rounded-xl h-full">
//               <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
//               <div className="space-y-2">
//                 {nearbyCategories.map((category) => {
//                   const Icon = category.icon
//                   return (
//                     <button
//                       key={category.title}
//                       onClick={() => setActiveCategory(category.title)}
//                       className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left transition-colors ${
//                         activeCategory === category.title
//                           ? "bg-gray-900 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       <Icon className="w-4 h-4 flex-shrink-0" />
//                       <span className="text-sm font-medium">{category.title}</span>
//                     </button>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* Places grid - right side */}
//             <div className="lg:col-span-3">
//               <h3 className="font-medium text-gray-900 mb-4">{activeCategory}</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//                 {activeCategoryData?.places.map((place) => (
//                   <div
//                     key={place.name}
//                     className={`${activeCategoryData.color} p-4 rounded-xl transition-transform hover:scale-[1.02]`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className={`${activeCategoryData.iconBg} p-2 rounded-full`}>
//                         <MapPin className="w-5 h-5" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-900 mb-1">{place.name}</h3>
//                         <div className="flex justify-between items-center">
//                           <span className="text-sm text-gray-600">{place.distance}</span>
//                           <div className="flex items-center gap-1">
//                             <span className="text-xs font-medium px-1.5 py-0.5 bg-white rounded-md">
//                               {place.rating}
//                             </span>
//                             <svg
//                               className="w-3 h-3 text-yellow-500 fill-current"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }














// import React from 'react';
// import { Building2, GraduationCap, Heart, Train, Bus, Car } from 'lucide-react';

// const nearbyCategories = [
//   {
//     title: 'Hospitals',
//     icon: Heart,
//     places: [
//       { name: 'City Hospital', distance: '0.5 km' },
//       { name: 'Apollo Clinic', distance: '1.2 km' },
//     ],
//   },
//   {
//     title: 'Educational Institutes',
//     icon: GraduationCap,
//     places: [
//       { name: 'Delhi Public School', distance: '1.0 km' },
//       { name: 'Engineering College', distance: '2.5 km' },
//     ],
//   },
//   {
//     title: 'Metro Stations',
//     icon: Train,
//     places: [
//       { name: 'Electronic City Metro', distance: '0.8 km' },
//       { name: 'Tech Park Metro', distance: '1.5 km' },
//     ],
//   },
//   {
//     title: 'Bus Stands',
//     icon: Bus,
//     places: [
//       { name: 'EC Phase 1 Bus Stop', distance: '0.3 km' },
//       { name: 'Main Bus Terminal', distance: '1.0 km' },
//     ],
//   },
//   {
//     title: 'Railway Stations',
//     icon: Train,
//     places: [
//       { name: 'Electronic City Station', distance: '2.0 km' },
//       { name: 'Central Station', distance: '5.0 km' },
//     ],
//   },
// ];

// export const NearbyPlaces: React.FC = () => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6">Nearby Places</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {nearbyCategories.map((category) => {
//           const Icon = category.icon;
//           return (
//             <div key={category.title} className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Icon className="w-5 h-5 text-gray-900" />
//                 <h3 className="font-semibold text-gray-900">{category.title}</h3>
//               </div>
//               <div className="space-y-2">
//                 {category.places.map((place) => (
//                   <div key={place.name} className="flex justify-between items-center text-sm">
//                     <span className="text-gray-600">{place.name}</span>
//                     <span className="text-gray-500">{place.distance}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };