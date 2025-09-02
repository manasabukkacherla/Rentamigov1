// "use client"

// import type React from "react"
// import { useRef, useEffect, useState } from "react"
// import {
//   Building2,
//   Bath,
//   Bed,
//   MapPin,
//   IndianRupee,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   ArrowRight,
//   Check,
//   Home,
//   Castle,
//   Building,
//   Bookmark,
//   BookmarkCheck,
// } from "lucide-react"

// const properties = [
//   {
//     id: 1,
//     title: "Modern Apartment with City View",
//     location: "Electronic City Phase 1, Bangalore",
//     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
//     price: "24.5",
//     beds: 3,
//     baths: 2,
//     area: "1,500",
//     type: "Apartment",
//     status: "Ready to Move",
//     featured: true,
//     rating: 4.8,
//     tags: ["Gym", "Swimming Pool", "Garden"],
//   },
//   {
//     id: 2,
//     title: "Luxury Villa with Garden",
//     location: "Whitefield, Bangalore",
//     image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
//     price: "18.2",
//     beds: 3,
//     baths: 2,
//     area: "2,200",
//     type: "Villa",
//     status: "Under Construction",
//     featured: false,
//     rating: 4.5,
//     tags: ["Garden", "Parking", "Security"],
//   },
//   {
//     id: 3,
//     title: "Spacious Condominium",
//     location: "HSR Layout, Bangalore",
//     image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
//     price: "22.4",
//     beds: 4,
//     baths: 3,
//     area: "1,800",
//     type: "Condo",
//     status: "Ready to Move",
//     featured: false,
//     rating: 4.7,
//     tags: ["Balcony", "Gym", "Parking"],
//   },
//   {
//     id: 4,
//     title: "Premium Lake View Apartment",
//     location: "Koramangala, Bangalore",
//     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
//     price: "32.8",
//     beds: 4,
//     baths: 3,
//     area: "2,100",
//     type: "Apartment",
//     status: "Ready to Move",
//     featured: true,
//     rating: 4.9,
//     tags: ["Lake View", "Gym", "Swimming Pool"],
//   },
//   {
//     id: 5,
//     title: "Garden View Penthouse",
//     location: "Indiranagar, Bangalore",
//     image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
//     price: "45.2",
//     beds: 5,
//     baths: 4,
//     area: "3,200",
//     type: "Penthouse",
//     status: "Under Construction",
//     featured: false,
//     rating: 4.6,
//     tags: ["Garden View", "Terrace", "Parking"],
//   },
// ]

// const propertyTypeIcons: Record<string, React.FC<{ className?: string }>> = {
//   Apartment: (props) => <Building2 {...props} />,
//   Villa: (props) => <Home {...props} />,
//   Condo: (props) => <Building {...props} />,
//   Penthouse: (props) => <Castle {...props} />,
// }

// export const SimilarProperties: React.FC = () => {
//   const scrollContainerRef = useRef<HTMLDivElement>(null)
//   const [autoScrollPaused, setAutoScrollPaused] = useState(false)
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [savedProperties, setSavedProperties] = useState<number[]>([])
//   const [activeFilter, setActiveFilter] = useState<string | null>(null)
//   const [isHovering, setIsHovering] = useState<number | null>(null)

//   const filters = ["All", "Apartment", "Villa", "Condo", "Penthouse"]

//   const filteredProperties =
//     activeFilter && activeFilter !== "All"
//       ? properties.filter((property) => property.type === activeFilter)
//       : properties

//   useEffect(() => {
//     let interval: NodeJS.Timeout

//     if (!autoScrollPaused && scrollContainerRef.current) {
//       interval = setInterval(() => {
//         const nextIndex = (currentIndex + 1) % filteredProperties.length
//         setCurrentIndex(nextIndex)

//         const cardWidth = scrollContainerRef.current?.offsetWidth || 0
//         scrollContainerRef.current?.scrollTo({
//           left: nextIndex * cardWidth,
//           behavior: "smooth",
//         })
//       }, 5000)
//     }

//     return () => clearInterval(interval)
//   }, [autoScrollPaused, currentIndex, filteredProperties.length])

//   const scroll = (direction: "left" | "right") => {
//     if (scrollContainerRef.current) {
//       const nextIndex =
//         direction === "left"
//           ? (currentIndex - 1 + filteredProperties.length) % filteredProperties.length
//           : (currentIndex + 1) % filteredProperties.length

//       setCurrentIndex(nextIndex)
//       const cardWidth = scrollContainerRef.current.offsetWidth
//       scrollContainerRef.current.scrollTo({
//         left: nextIndex * cardWidth,
//         behavior: "smooth",
//       })
//     }
//   }

//   const toggleSave = (id: number) => {
//     setSavedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
//   }

//   return (
//     <div
//       className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-5 overflow-hidden border border-gray-100"
//       onMouseEnter={() => setAutoScrollPaused(true)}
//       onMouseLeave={() => setAutoScrollPaused(false)}
//       onTouchStart={() => setAutoScrollPaused(true)}
//       onTouchEnd={() => setAutoScrollPaused(false)}
//     >
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2 relative inline-block">
//             Similar Properties
//             <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gray-900 rounded-full"></span>
//           </h2>
//           <p className="text-gray-600">Explore more properties in this area</p>
//         </div>

//         <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter === "All" ? null : filter)}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
//                 (filter === "All" && activeFilter === null) || filter === activeFilter
//                   ? "bg-gray-900 text-white shadow-md"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="relative">
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2.5 -ml-3 hover:bg-gray-50 transition-colors"
//           aria-label="Previous property"
//         >
//           <ChevronLeft className="w-5 h-5 text-gray-900" />
//         </button>

//         <div
//           ref={scrollContainerRef}
//           className="flex overflow-x-auto snap-x snap-mandatory gap-5 scroll-smooth pb-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//         >
//           {filteredProperties.map((property) => {
//             const TypeIcon = propertyTypeIcons[property.type] || Building2
//             const isSaved = savedProperties.includes(property.id)

//             return (
//               <div
//                 key={property.id}
//                 className="flex-none w-full snap-center sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/3-14px)] group"
//                 onMouseEnter={() => setIsHovering(property.id)}
//                 onMouseLeave={() => setIsHovering(null)}
//               >
//                 <div className="h-[420px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
//                   <div className="relative">
//                     <div className="aspect-[3/2] overflow-hidden">
//                       <img
//                         src={property.image || "/placeholder.svg"}
//                         alt={property.title}
//                         className="w-full h-full object-cover transition duration-700 transform group-hover:scale-110"
//                       />
//                     </div>

//                     <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium shadow-md rounded-lg">
//                       <TypeIcon className="w-3.5 h-3.5" />
//                       <span>{property.type}</span>
//                     </div>

//                     {property.featured && (
//                       <div className="absolute top-0 right-0 bg-gray-900 text-white py-1 px-3 text-xs font-medium shadow-md">
//                         Featured
//                       </div>
//                     )}

//                     <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
//                       <button
//                         onClick={() => toggleSave(property.id)}
//                         className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ${
//                           isSaved ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
//                         }`}
//                         aria-label={isSaved ? "Unsave property" : "Save property"}
//                       >
//                         {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
//                       </button>

//                       <div className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
//                         <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
//                         <span className="text-xs font-medium text-gray-900">{property.rating}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 flex flex-col flex-grow">
//                     <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-gray-700 transition-colors">
//                       {property.title}
//                     </h3>

//                     <div className="flex items-center gap-1 text-gray-600 text-xs mb-3">
//                       <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
//                       <span className="line-clamp-1">{property.location}</span>
//                     </div>

//                     <div className="flex items-center gap-1 text-xl font-bold text-gray-900 mb-3">
//                       <IndianRupee className="w-5 h-5" />
//                       <span>{property.price} Cr</span>
//                     </div>

//                     <div className="grid grid-cols-3 gap-2 mb-3">
//                       <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                         <div className="flex items-center justify-center gap-1 text-gray-700">
//                           <Bed className="w-3.5 h-3.5" />
//                           <span className="font-medium text-xs">{property.beds}</span>
//                         </div>
//                         <p className="text-[10px] text-gray-500 mt-0.5">Beds</p>
//                       </div>

//                       <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                         <div className="flex items-center justify-center gap-1 text-gray-700">
//                           <Bath className="w-3.5 h-3.5" />
//                           <span className="font-medium text-xs">{property.baths}</span>
//                         </div>
//                         <p className="text-[10px] text-gray-500 mt-0.5">Baths</p>
//                       </div>

//                       <div className="bg-gray-50 p-1.5 rounded-lg text-center">
//                         <div className="flex items-center justify-center gap-1 text-gray-700">
//                           <Building2 className="w-3.5 h-3.5" />
//                           <span className="font-medium text-xs">{property.area}</span>
//                         </div>
//                         <p className="text-[10px] text-gray-500 mt-0.5">Sq.ft.</p>
//                       </div>
//                     </div>

//                     {property.tags && (
//                       <div className="flex flex-wrap gap-1 mb-3">
//                         {property.tags.slice(0, 3).map((tag) => (
//                           <span
//                             key={tag}
//                             className="inline-flex items-center text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-md"
//                           >
//                             <Check className="w-2.5 h-2.5 mr-0.5 text-gray-500" />
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     <button
//                       className={`mt-auto w-full py-2 text-center text-sm font-medium rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all duration-300 ${
//                         isHovering === property.id
//                           ? "bg-gray-900 text-white"
//                           : "bg-gray-100 text-gray-900 hover:bg-gray-200"
//                       }`}
//                     >
//                       <span>View Details</span>
//                       <ArrowRight
//                         className={`w-3.5 h-3.5 transition-transform duration-300 ${
//                           isHovering === property.id ? "translate-x-1" : ""
//                         }`}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2.5 -mr-3 hover:bg-gray-50 transition-colors"
//           aria-label="Next property"
//         >
//           <ChevronRight className="w-5 h-5 text-gray-900" />
//         </button>
//       </div>

//       <div className="flex gap-1 mt-5 justify-center">
//         {filteredProperties.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setCurrentIndex(index)
//               if (scrollContainerRef.current) {
//                 const cardWidth = scrollContainerRef.current.offsetWidth
//                 scrollContainerRef.current.scrollTo({
//                   left: index * cardWidth,
//                   behavior: "smooth",
//                 })
//               }
//             }}
//             className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//               index === currentIndex ? "bg-gray-900 w-7" : "bg-gray-300 hover:bg-gray-400"
//             }`}
//             aria-label={`Go to property ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button className="group flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md">
//           <span>Browse All Properties</span>
//           <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
//         </button>
//       </div>
//     </div>
//   )
// }

import type React from "react"
import { useRef, useEffect, useState } from "react"
import {
  Building2,
  Bath,
  Bed,
  MapPin,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Check,
  Home,
  Castle,
  Building,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Modern Apartment with City View",
    location: "Electronic City Phase 1, Bangalore",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    price: "24.5",
    beds: 3,
    baths: 2,
    area: "1,500",
    type: "Apartment",
    status: "Ready to Move",
    featured: true,
    rating: 4.8,
    tags: ["Gym", "Swimming Pool", "Garden"],
  },
  {
    id: 2,
    title: "Luxury Villa with Garden",
    location: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    price: "18.2",
    beds: 3,
    baths: 2,
    area: "2,200",
    type: "Villa",
    status: "Under Construction",
    featured: false,
    rating: 4.5,
    tags: ["Garden", "Parking", "Security"],
  },
  {
    id: 3,
    title: "Spacious Condominium",
    location: "HSR Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    price: "22.4",
    beds: 4,
    baths: 3,
    area: "1,800",
    type: "Condo",
    status: "Ready to Move",
    featured: false,
    rating: 4.7,
    tags: ["Balcony", "Gym", "Parking"],
  },
  {
    id: 4,
    title: "Premium Lake View Apartment",
    location: "Koramangala, Bangalore",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    price: "32.8",
    beds: 4,
    baths: 3,
    area: "2,100",
    type: "Apartment",
    status: "Ready to Move",
    featured: true,
    rating: 4.9,
    tags: ["Lake View", "Gym", "Swimming Pool"],
  },
  {
    id: 5,
    title: "Garden View Penthouse",
    location: "Indiranagar, Bangalore",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    price: "45.2",
    beds: 5,
    baths: 4,
    area: "3,200",
    type: "Penthouse",
    status: "Under Construction",
    featured: false,
    rating: 4.6,
    tags: ["Garden View", "Terrace", "Parking"],
  },
]

const propertyTypeIcons: Record<string, React.FC<{ className?: string }>> = {
  Apartment: (props) => <Building2 {...props} />,
  Villa: (props) => <Home {...props} />,
  Condo: (props) => <Building {...props} />,
  Penthouse: (props) => <Castle {...props} />,
}

export const SimilarProperties: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [autoScrollPaused, setAutoScrollPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedProperties, setSavedProperties] = useState<number[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState<number | null>(null)

  const filters = ["All", "Apartment", "Villa", "Condo", "Penthouse"]

  const filteredProperties =
    activeFilter && activeFilter !== "All"
      ? properties.filter((property) => property.type === activeFilter)
      : properties

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!autoScrollPaused && scrollContainerRef.current) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % filteredProperties.length
        setCurrentIndex(nextIndex)

        const cardWidth = scrollContainerRef.current?.offsetWidth || 0
        scrollContainerRef.current?.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        })
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoScrollPaused, currentIndex, filteredProperties.length])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const nextIndex =
        direction === "left"
          ? (currentIndex - 1 + filteredProperties.length) % filteredProperties.length
          : (currentIndex + 1) % filteredProperties.length

      setCurrentIndex(nextIndex)
      const cardWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      })
    }
  }

  const toggleSave = (id: number) => {
    setSavedProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
  }

  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-5 overflow-hidden border border-gray-100"
      onMouseEnter={() => setAutoScrollPaused(true)}
      onMouseLeave={() => setAutoScrollPaused(false)}
      onTouchStart={() => setAutoScrollPaused(true)}
      onTouchEnd={() => setAutoScrollPaused(false)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 relative inline-block">
            Similar Properties
            <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gray-900 rounded-full"></span>
          </h2>
          <p className="text-gray-600">Explore more properties in this area</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter === "All" ? null : filter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                (filter === "All" && activeFilter === null) || filter === activeFilter
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2.5 -ml-3 hover:bg-gray-50 transition-colors"
          aria-label="Previous property"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 scroll-smooth pb-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filteredProperties.map((property) => {
            const TypeIcon = propertyTypeIcons[property.type] || Building2
            const isSaved = savedProperties.includes(property.id)

            return (
              <div
                key={property.id}
                className="flex-none w-full snap-center sm:w-[calc(100%/2-10px)] lg:w-[calc(100%/3-14px)] group"
                onMouseEnter={() => setIsHovering(property.id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="h-[520px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
                  <div className="relative h-[220px]">
                    <div className="h-full overflow-hidden">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover transition duration-700 transform group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium shadow-md rounded-lg">
                      <TypeIcon className="w-4 h-4" />
                      <span>{property.type}</span>
                    </div>

                    {property.featured && (
                      <div className="absolute top-0 right-0 bg-gray-900 text-white py-1.5 px-4 text-sm font-medium shadow-md">
                        Featured
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                      <button
                        onClick={() => toggleSave(property.id)}
                        className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                          isSaved ? "bg-gray-900 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                        aria-label={isSaved ? "Unsave property" : "Save property"}
                      >
                        {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </button>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2.5 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-5">
                      <IndianRupee className="w-6 h-6" />
                      <span>{property.price} Cr</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="bg-gray-50 p-2.5 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <Bed className="w-5 h-5" />
                          <span className="font-medium text-sm">{property.beds}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Beds</p>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <Bath className="w-5 h-5" />
                          <span className="font-medium text-sm">{property.baths}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Baths</p>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-2 text-gray-700">
                          <Building2 className="w-5 h-5" />
                          <span className="font-medium text-sm">{property.area}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Sq.ft.</p>
                      </div>
                    </div>

                    {property.tags && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {property.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-md"
                          >
                            <Check className="w-4 h-4 mr-1 text-gray-500" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      className={`mt-auto w-full py-3 text-center text-sm font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-300 ${
                        isHovering === property.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <span>View Details</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isHovering === property.id ? "translate-x-1" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2.5 -mr-3 hover:bg-gray-50 transition-colors"
          aria-label="Next property"
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      <div className="flex gap-1 mt-5 justify-center">
        {filteredProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              if (scrollContainerRef.current) {
                const cardWidth = scrollContainerRef.current.offsetWidth
                scrollContainerRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: "smooth",
                })
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gray-900 w-7" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to property ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button className="group flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md">
          <span>Browse All Properties</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}