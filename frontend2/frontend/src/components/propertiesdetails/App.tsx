// // "use client"

// // import { useState, useEffect } from "react"
// // import { BasicInfo } from "./components/BasicInfo"
// // import { AmenitiesTabs } from "./components/AmenitiesTabs"
// // import { PricingCard } from "./components/PricingCard"
// // import { LocationMap } from "./components/LocationMap"
// // import { NearbyPlaces } from "./components/NearbyPlaces"
// // import { SimilarProperties } from "./components/SimilarProperties"
// // import { LatestInsights } from "./components/LatestInsights"
// // import { Reviews } from "./components/Reviews"
// // import { Footer } from "./components/Footer"
// // import { propertyData } from "./data"
// // import { ChevronLeft, ChevronRight, MapPin, Heart, Share2, ArrowLeft, Phone, MessageSquare } from "lucide-react"

// // function Propertydetail() {
// //   const [currentIndex, setCurrentIndex] = useState(0)
// //   const [isFavorite, setIsFavorite] = useState(false)
// //   const [showFullGallery, setShowFullGallery] = useState(false)
// //   const [scrollPosition, setScrollPosition] = useState(0)
// //   const allMedia = [propertyData.video, ...propertyData.images.map((img: { url: any }) => img.url)]

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrollPosition(window.scrollY)
// //     }

// //     window.addEventListener("scroll", handleScroll)
// //     return () => window.removeEventListener("scroll", handleScroll)
// //   }, [])

// //   const goToNext = () => {
// //     setCurrentIndex((prev) => (prev + 1) % allMedia.length)
// //   }

// //   const goToPrevious = () => {
// //     setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
// //   }

// //   const toggleFavorite = () => {
// //     setIsFavorite(!isFavorite)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
// //       {/* Slim Navbar - Reduced Height */}
// //       <div
// //         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// //           scrollPosition > 300 ? "bg-white shadow-md py-2" : "bg-transparent py-2"
// //         }`}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
// //           <div className="flex items-center">
// //             <button
// //               onClick={() => window.history.back()}
// //               className={`p-1.5 rounded-full ${
// //                 scrollPosition > 300 ? "bg-gray-100 text-gray-800" : "bg-black/30 text-white"
// //               } hover:bg-opacity-80 transition-all`}
// //             >
// //               <ArrowLeft className="w-4 h-4" />
// //             </button>

// //             {scrollPosition > 300 && (
// //               <div className="ml-3">
// //                 <h1 className="font-semibold text-gray-900 line-clamp-1 text-sm">Prestige Lake Ridge</h1>
// //                 <p className="text-xs text-gray-500 line-clamp-1">Electronic City Phase 1, Bangalore</p>
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <button
// //               onClick={toggleFavorite}
// //               className={`p-1.5 rounded-full ${
// //                 scrollPosition > 300 ? "bg-gray-100" : "bg-black/30 text-white"
// //               } transition-all`}
// //               aria-label="Add to favorites"
// //             >
// //               <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
// //             </button>

// //             <button
// //               className={`p-1.5 rounded-full ${
// //                 scrollPosition > 300 ? "bg-gray-100 text-gray-800" : "bg-black/30 text-white"
// //               } hover:bg-opacity-80 transition-all`}
// //               aria-label="Share property"
// //             >
// //               <Share2 className="w-4 h-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 py-6 pt-16 space-y-6">
// //         {/* Property Header */}
// //         <div className="bg-white rounded-xl shadow-sm p-5">
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div>
// //               <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Prestige Lake Ridge</h1>
// //               <div className="flex items-center gap-2 text-gray-600">
// //                 <MapPin className="w-4 h-4 flex-shrink-0" />
// //                 <p className="text-sm">Electronic City Phase 1, Bangalore</p>
// //               </div>
// //             </div>
// //             <div className="flex flex-col sm:flex-row gap-3">
// //               <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-sm text-sm">
// //                 <Phone className="w-3.5 h-3.5" />
// //                 <span>Call Agent</span>
// //               </button>
// //               <button className="px-4 py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm">
// //                 <MessageSquare className="w-3.5 h-3.5" />
// //                 <span>Message</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Image Gallery */}
// //         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
// //           <div className="p-0">
// //             <div className="relative">
// //               <div className="aspect-[16/9] overflow-hidden bg-gray-100">
// //                 {allMedia[currentIndex].includes("vimeo.com") ? (
// //                   <iframe
// //                     src={allMedia[currentIndex]}
// //                     className="w-full h-full"
// //                     frameBorder="0"
// //                     allow="autoplay; fullscreen"
// //                     allowFullScreen
// //                   />
// //                 ) : (
// //                   <img
// //                     src={allMedia[currentIndex] || "/placeholder.svg?height=600&width=800"}
// //                     alt="Property"
// //                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
// //                   />
// //                 )}
// //               </div>

// //               <button
// //                 onClick={goToPrevious}
// //                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2.5 rounded-full text-white transition-all"
// //               >
// //                 <ChevronLeft className="w-5 h-5" />
// //               </button>
// //               <button
// //                 onClick={goToNext}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2.5 rounded-full text-white transition-all"
// //               >
// //                 <ChevronRight className="w-5 h-5" />
// //               </button>

// //               <button
// //                 onClick={() => setShowFullGallery(true)}
// //                 className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-lg shadow-lg font-medium hover:bg-gray-100 transition-all text-sm"
// //               >
// //                 View All Photos
// //               </button>

// //               <div className="absolute bottom-4 left-4 flex gap-1.5">
// //                 {allMedia.slice(0, 5).map((_, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={() => setCurrentIndex(idx)}
// //                     className={`w-1.5 h-1.5 rounded-full transition-all ${
// //                       idx === currentIndex ? "bg-white w-5" : "bg-white/60 hover:bg-white/80"
// //                     }`}
// //                     aria-label={`View image ${idx + 1}`}
// //                   />
// //                 ))}
// //                 {allMedia.length > 5 && (
// //                   <span className="w-1.5 h-1.5 rounded-full bg-white/60 flex items-center justify-center">
// //                     <span className="sr-only">More images</span>
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Thumbnail Preview */}
// //             <div className="hidden md:grid grid-cols-5 gap-2 p-2 bg-gray-50">
// //               {allMedia.slice(0, 5).map((media, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => setCurrentIndex(idx)}
// //                   className={`aspect-[4/3] overflow-hidden rounded-md ${
// //                     idx === currentIndex ? "ring-2 ring-gray-900" : "opacity-70 hover:opacity-100"
// //                   } transition-all`}
// //                 >
// //                   {media.includes("vimeo.com") ? (
// //                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
// //                       <span className="text-xs text-gray-500">Video</span>
// //                     </div>
// //                   ) : (
// //                     <img
// //                       src={media || "/placeholder.svg?height=150&width=200"}
// //                       alt={`Thumbnail ${idx + 1}`}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   )}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex flex-col lg:flex-row gap-6">
// //           <div className="lg:w-[65%] space-y-6">
// //             <BasicInfo details={propertyData} />
// //             <AmenitiesTabs details={propertyData} />
// //             <LocationMap />
// //             <NearbyPlaces />
// //             <SimilarProperties />
// //             <LatestInsights />
// //             <Reviews />
// //           </div>
// //           <div className="lg:w-[35%]">
// //             <div className="sticky top-16">
// //               <PricingCard />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Full Gallery Modal */}
// //       {showFullGallery && (
// //         <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
// //           <div className="min-h-screen flex flex-col">
// //             <div className="p-4 flex justify-between items-center">
// //               <button
// //                 onClick={() => setShowFullGallery(false)}
// //                 className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
// //               >
// //                 <ArrowLeft className="w-5 h-5" />
// //               </button>
// //               <span className="text-white font-medium">
// //                 {currentIndex + 1} / {allMedia.length}
// //               </span>
// //               <div className="w-9"></div> {/* Spacer for alignment */}
// //             </div>

// //             <div className="flex-grow flex items-center justify-center p-4">
// //               {allMedia[currentIndex].includes("vimeo.com") ? (
// //                 <iframe
// //                   src={allMedia[currentIndex]}
// //                   className="max-w-full max-h-[80vh] w-full"
// //                   frameBorder="0"
// //                   allow="autoplay; fullscreen"
// //                   allowFullScreen
// //                 />
// //               ) : (
// //                 <img
// //                   src={allMedia[currentIndex] || "/placeholder.svg?height=800&width=1200"}
// //                   alt="Property"
// //                   className="max-w-full max-h-[80vh] object-contain"
// //                 />
// //               )}
// //             </div>

// //             <div className="p-4">
// //               <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
// //                 {allMedia.map((media, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={() => setCurrentIndex(idx)}
// //                     className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
// //                       idx === currentIndex ? "ring-2 ring-white" : "opacity-50 hover:opacity-80"
// //                     } transition-all`}
// //                   >
// //                     {media.includes("vimeo.com") ? (
// //                       <div className="w-full h-full bg-gray-700 flex items-center justify-center">
// //                         <span className="text-xs text-gray-300">Video</span>
// //                       </div>
// //                     ) : (
// //                       <img
// //                         src={media || "/placeholder.svg?height=80&width=80"}
// //                         alt={`Thumbnail ${idx + 1}`}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </div>
// //   )
// // }

// // export default Propertydetail








// import React, { useState } from 'react';
// import { ImageGallery } from './components/ImageGallery';
// import { BasicInfo } from './components/BasicInfo';
// import { AmenitiesTabs } from './components/AmenitiesTabs';
// import { PricingCard } from './components/PricingCard';
// import { LocationMap } from './components/LocationMap';
// import { NearbyPlaces } from './components/NearbyPlaces';
// import { SimilarProperties } from './components/SimilarProperties';
// import { LatestInsights } from './components/LatestInsights';
// import { Reviews } from './components/Reviews';
// import { Footer } from './components/Footer';
// import { propertyData } from './data';
// import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// function Propertydetail() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const allMedia = [propertyData.video, ...propertyData.images.map((img: { url: any; }) => img.url)];

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % allMedia.length);
//   };

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pb-24 lg:pb-0">
//       <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
//         {/* Property Header */}
//         <div className="bg-white rounded-xl shadow-lg p-4">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">Prestige Lake Ridge</h1>
//           <div className="flex items-center gap-2 text-gray-600">
//             <MapPin className="w-5 h-5" />
//             <p>Electronic City Phase 1, Bangalore</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-grow relative group">
//                 {allMedia[currentIndex].includes('vimeo.com') ? (
//                   <iframe
//                     src={allMedia[currentIndex]}
//                     className="w-full aspect-video rounded-lg"
//                     frameBorder="0"
//                     allow="autoplay; fullscreen"
//                     allowFullScreen
//                   />
//                 ) : (
//                   <img
//                     src={allMedia[currentIndex]}
//                     alt="Property"
//                     className="w-full aspect-video rounded-lg object-cover"
//                   />
//                 )}

//                 <button
//                   onClick={goToPrevious}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button
//                   onClick={goToNext}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="hidden md:block">
//                 <ImageGallery
//                   images={propertyData.images}
//                   onImageSelect={(url) => setCurrentIndex(allMedia.indexOf(url))}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 justify-center">
//           <div className="lg:w-[65%] space-y-8">
//             <BasicInfo details={propertyData} />
//             <AmenitiesTabs details={propertyData} />
//             <LocationMap />
//             <NearbyPlaces />
//             <SimilarProperties />
//             <LatestInsights />
//             <Reviews />
//           </div>
//           <div className="lg:w-[30%]">
//             <div className="sticky top-4">
//               <PricingCard />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Propertydetail;







import React, { useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { BasicInfo } from './components/BasicInfo';
import { AmenitiesTabs } from './components/AmenitiesTabs';
import { PricingCard } from './components/PricingCard';
import { LocationMap } from './components/LocationMap';
import { NearbyPlaces } from './components/NearbyPlaces';
import { SimilarProperties } from './components/SimilarProperties';
import { LatestInsights } from './components/LatestInsights';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { propertyData } from './data';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function Propertydetail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allMedia = [propertyData.video, ...propertyData.images.map((img: { url: any; }) => img.url)];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Prestige Lake Ridge</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <p>Electronic City Phase 1, Bangalore</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative group">
                {allMedia[currentIndex].includes('vimeo.com') ? (
                  <iframe
                    src={allMedia[currentIndex]}
                    className="w-full aspect-video rounded-lg"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={allMedia[currentIndex]}
                    alt="Property"
                    className="w-full aspect-video rounded-lg object-cover"
                  />
                )}

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="hidden md:block">
                <ImageGallery
                  images={propertyData.images}
                  onImageSelect={(url) => setCurrentIndex(allMedia.indexOf(url))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="lg:w-[65%] space-y-8">
            <BasicInfo details={propertyData} />
            <AmenitiesTabs details={propertyData} />
            <LocationMap />
            <NearbyPlaces />
            <SimilarProperties />
            <LatestInsights />
            <Reviews />
          </div>
          <div className="lg:w-[30%]">
            <div className="sticky top-4">
              <PricingCard />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Propertydetail;