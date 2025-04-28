import React, { useState } from 'react';
import { MapPin, Phone, Mail, X, User, MessageSquare, ChevronLeft, ChevronRight, Navigation, ChevronDown } from 'lucide-react';

const plotDetails = {
  title: "Prestige Lake Ridge",
  location: "Electronic City Phase 1, Bangalore",
  address: "123 Electronic City Phase 1, Bengaluru, Karnataka 560100",
  rating: "4.8",
  reviews: "62 reviews",
  totalArea: "25 Acres",
  price: "₹2.5 Cr",
  landType: "Agricultural Land",
  soilType: "Alluvial Soil",
  waterSource: "Borewell + Canal",
  availabilityDate: "Immediate",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9857!2d77.6547!3d12.8452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzQyLjciTiA3N8KwMzknMTYuOCJF!5e0!3m2!1sen!2sin!4v1629789845",
  images: [
    "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/2765876/pexels-photo-2765876.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/10885912/pexels-photo-10885912.jpeg?auto=compress&cs=tinysrgb&w=1800"
  ],
  features: [
    "Irrigation System Available",
    "Legal Clearance Available",
    "Power Supply Available",
    "Road Access"
  ]
};

const priceBreakdown = [
  { label: "Base Price", value: "₹2.5 Cr" },
  { label: "Registration Fee", value: "₹2,50,000" },
  { label: "Stamp Duty", value: "₹12,50,000" },
  { label: "Availability", value: "Immediate" }
];

const PlotManagement: React.FC = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPriceCard, setShowPriceCard] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const selectedImage = plotDetails.images[selectedImageIndex];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? plotDetails.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === plotDetails.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8">
      <div className="mx-auto px-2 max-w-[1600px]">
        {/* Property Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">{plotDetails.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{plotDetails.location}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-black">★ {plotDetails.rating}</span>
              <span className="text-sm text-gray-600 ml-1">({plotDetails.reviews})</span>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Plot Gallery</h2>
            {/* Mobile Image Gallery */}
            <div className="block lg:hidden">
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden group mb-4">
                <img 
                  src={selectedImage} 
                  alt="Selected plot view"
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevImage}
                    className="bg-black/50 hover:bg-black text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-black/50 hover:bg-black text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedImageIndex + 1} / {plotDetails.images.length}
                </div>
              </div>
              
              {/* Mobile Thumbnail Scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {plotDetails.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImageIndex === index ? 'ring-2 ring-black' : 'hover:opacity-90'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Plot view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Image Gallery */}
            <div className="hidden lg:flex gap-4">
              {/* Main Image */}
              <div className="w-2/3">
                <div className="relative h-[450px] rounded-lg overflow-hidden group">
                  <img 
                    src={selectedImage} 
                    alt="Selected plot view"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
  onClick={handlePrevImage}
  className="bg-black hover:bg-gray-900 text-white rounded-full p-2 transition-colors"
>
  <ChevronLeft className="h-7 w-6" />
</button>


<button
  onClick={handleNextImage}
  className="bg-black hover:bg-gray-900 text-white rounded-full p-2 transition-colors"
>
  <ChevronRight className="h-7 w-6" />
</button>


                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {selectedImageIndex + 1} / {plotDetails.images.length}
                  </div>
                </div>
              </div>
              
              {/* Side Image Stacks */}
              <div className="w-1/3 flex gap-4">
                {/* First Stack */}
                <div className="w-1/2 space-y-4">
                  {plotDetails.images.slice(0, 3).map((image, index) => (
                    <div 
                      key={index}
                      className={`relative h-[140px] rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedImageIndex === index ? 'ring-2 ring-black' : 'hover:opacity-90'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Plot view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {/* Second Stack */}
                <div className="w-1/2 space-y-4">
                  {plotDetails.images.slice(3, 6).map((image, index) => (
                    <div 
                      key={index + 3}
                      className={`relative h-[140px] rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedImageIndex === index + 3 ? 'ring-2 ring-black' : 'hover:opacity-90'
                      }`}
                      onClick={() => setSelectedImageIndex(index + 3)}
                    >
                      <img 
                        src={image} 
                        alt={`Plot view ${index + 4}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Address and Map Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Address Section */}
              <div className="md:w-1/2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-gray-400 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Property Address</h2>
                    <p className="text-gray-600">{plotDetails.address}</p>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="md:w-1/2 h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src={plotDetails.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Area</h3>
                    <p className="text-lg font-semibold text-black">{plotDetails.totalArea}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-lg font-semibold text-black">{plotDetails.price}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Land Type</h3>
                    <p className="text-lg font-semibold text-black">{plotDetails.landType}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Soil Type</h3>
                    <p className="text-lg font-semibold text-black">{plotDetails.soilType}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">Water Source</h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{plotDetails.waterSource}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-black">Features</h2>
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      {showAllFeatures ? 'Show Less' : 'View All Features'}
                      <ChevronDown className={`h-5 w-5 transition-transform ${showAllFeatures ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ${showAllFeatures ? '' : 'max-h-[120px] overflow-hidden'}`}>
                    {plotDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="h-2 w-2 bg-black rounded-full mr-3"></div>
                        <span className="text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {!showAllFeatures && (
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card - Sticky on Desktop, Modal on Mobile */}
          <div className="lg:col-span-1">
            {/* Desktop View */}
            <div className="hidden lg:block sticky top-4">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black mb-6">Price Details</h3>
                  <div className="space-y-4">
                    {priceBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-black">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowEnquiryForm(true)}
                    className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg mt-6"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile View - Fixed Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
              <button
                onClick={() => setShowPriceCard(true)}
                className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-between px-4"
              >
                <span>View Price Details</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${showPriceCard ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mobile Price Details Modal */}
            {showPriceCard && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-black">Price Details</h3>
                      <button
                        onClick={() => setShowPriceCard(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {priceBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-semibold text-black">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowPriceCard(false);
                        setShowEnquiryForm(true);
                      }}
                      className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg mt-6"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full relative animate-slide-up">
            <button
              onClick={() => setShowEnquiryForm(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-black">Enquire Now</h3>
              <p className="text-gray-600 text-sm mt-1">
                Fill in your details to get more information about this property.
              </p>
            </div>

            <form className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    rows={4}
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlotManagement;