import React from 'react';
import { Home, Mail, Phone, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const HomeFooter: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Gamification Section */}
        {/* <div className="mb-12 bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <Award className="h-8 w-8 text-white mr-2" />
            <h3 className="text-2xl font-bold">Reader Leaderboard</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-black rounded-full mb-3">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-bold mb-1">Jessica T.</h4>
              <p className="text-gray-300 text-sm mb-2">Reading Streak: 42 days</p>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((badge) => (
                  <span key={badge} className="inline-block w-6 h-6 bg-white rounded-full"></span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full mb-3">
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h4 className="font-bold mb-1">Michael R.</h4>
              <p className="text-gray-300 text-sm mb-2">Reading Streak: 36 days</p>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4].map((badge) => (
                  <span key={badge} className="inline-block w-6 h-6 bg-white rounded-full"></span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full mb-3">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="font-bold mb-1">David K.</h4>
              <p className="text-gray-300 text-sm mb-2">Reading Streak: 29 days</p>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3].map((badge) => (
                  <span key={badge} className="inline-block w-6 h-6 bg-white rounded-full"></span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center text-white hover:text-gray-300">
              <Users className="h-4 w-4 mr-1" />
              <span>View Full Leaderboard</span>
            </a>
          </div>
        </div> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">Propamigo</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for rental insights, tips, and stories to help you find the perfect place to call home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Apartment Living</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Rental Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Interior Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Neighborhood Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Legal Advice</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">contact@rentamigo.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white w-full"
                />
                <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Propamigo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;