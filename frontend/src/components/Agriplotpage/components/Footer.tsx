import React from 'react';
import { Leaf, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-400 mr-2" />
              <h2 className="text-2xl font-serif font-bold">AgriVista</h2>
            </div>
            <p className="text-gray-300 max-w-xs">
              Comprehensive agricultural information and resources for farmers, gardeners, and agricultural enthusiasts.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#crops" className="text-gray-300 hover:text-white transition-colors">Crops</a></li>
                <li><a href="#livestock" className="text-gray-300 hover:text-white transition-colors">Livestock</a></li>
                <li><a href="#sustainable-practices" className="text-gray-300 hover:text-white transition-colors">Sustainable Practices</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Downloadable Guides</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Planning Templates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Video Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Agricultural News</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-center text-gray-300 mb-2">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@agrivista.com" className="hover:text-white transition-colors">info@agrivista.com</a>
              </div>
              <p className="text-gray-300">
                Subscribe to our newsletter for agricultural updates and new resources.
              </p>
              <form className="mt-4">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-4 py-2 rounded-l-md w-full bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;