import React from "react";


interface Image {
  url: string;
  alt: string;
}

interface HeroGridProps {
  images: Image[];
}

const HeroGrid: React.FC<HeroGridProps> = ({ images }) => {
  const scrollToVerification = () => {
    const element = document.getElementById("verification-form");
    element?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative w-full min-h-screen">
      {/* Mobile Background Image */}
      <div className="md:hidden w-full h-screen">
        <img
          src={images[0]?.url || "/placeholder.svg?height=800&width=400"}
          alt={images[0]?.alt || "Property view"}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Image Grid */}
      <div className=" hidden md:grid  grid-cols-12 grid-rows-2 gap-4 w-full h-screen p-4">
        {/* Large left image */}
        <div className="col-span-4 row-span-2 relative">
          <img
            src={images[0]?.url || "/placeholder.svg?height=800&width=400"}
            alt={images[0]?.alt || "Property view"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Middle top image */}
        <div className="col-span-4 row-span-1 relative">
          <img
            src={images[1]?.url || "/placeholder.svg?height=400&width=400"}
            alt={images[1]?.alt || "Property interior"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Right top image */}
        <div className="col-span-4 row-span-1 relative">
          <img
            src={images[2]?.url || "/placeholder.svg?height=400&width=400"}
            alt={images[2]?.alt || "Property bedroom"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Middle bottom left image */}
        <div className="col-span-2 row-span-1 relative">
          <img
            src={images[3]?.url || "/placeholder.svg?height=400&width=200"}
            alt={images[3]?.alt || "Property detail"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Middle bottom centers image */}
        <div className="col-span-3 row-span-1 relative">
          <img
            src={images[4]?.url || "/placeholder.svg?height=400&width=300"}
            alt={images[4]?.alt || "Property feature"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Middle bottom right image */}
        <div className="col-span-3 row-span-1 relative">
          <img
            src={images[5]?.url || "/placeholder.svg?height=400&width=300"}
            alt={images[5]?.alt || "Property amenity"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-bold text-center px-4 mb-8">
          Unlock the power of your{" "}
          <span className="inline-block bg-black text-red-600 px-4 py-1 rounded-lg">
            property
          </span>
        </h1>
        <button
          onClick={scrollToVerification}
          className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition-colors"
        >
          List your property
        </button>
      </div>

      {/* Chatbot Button */}
      
    </section>
  );
};

export default HeroGrid;