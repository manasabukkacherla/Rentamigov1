import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1800")'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight">
          Cultivating Knowledge for a Sustainable Future
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Discover comprehensive information on modern agricultural practices, 
          crop management, and sustainable farming techniques.
        </p>
        <a
          href="#crops"
          className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Explore Agricultural Topics
        </a>
      </div>
      <a 
        href="#crops" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-8 w-8" />
      </a>
    </section>
  );
};

export default Hero;