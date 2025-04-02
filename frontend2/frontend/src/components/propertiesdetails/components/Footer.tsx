import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600">
              We are a leading real estate company providing premium properties across India. Our focus is on quality and customer satisfaction.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Properties', 'Services', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>123 Business Avenue, Electronic City, Bangalore</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>contact@realestate.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Real Estate Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};






// // original
// 
// import React from 'react';
// import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white">
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
//             <p className="text-gray-600">
//               We are a leading real estate company providing premium properties across India. Our focus is on quality and customer satisfaction.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {['Home', 'Properties', 'Services', 'About Us', 'Contact'].map((link) => (
//                 <li key={link}>
//                   <a href="#" className="text-gray-600 hover:text-gray-900 transition">
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
//             <div className="space-y-3">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <MapPin className="w-5 h-5" />
//                 <span>123 Business Avenue, Electronic City, Bangalore</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Phone className="w-5 h-5" />
//                 <span>+91 98765 43210</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Mail className="w-5 h-5" />
//                 <span>contact@realestate.com</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
//             <div className="flex gap-4">
//               {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
//                 >
//                   <Icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
//           <p>&copy; {new Date().getFullYear()} Real Estate Company. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };





// import type React from "react"
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   ArrowRight,
//   Clock,
//   Calendar,
// } from "lucide-react"

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-white border-t border-gray-100">
//       <div className="max-w-7xl mx-auto">
//         {/* Newsletter Section */}
//         <div className="px-6 py-12 border-b border-gray-100">
//           <div className="max-w-3xl mx-auto text-center">
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">Stay Updated with Real Estate Trends</h3>
//             <p className="text-gray-600 mb-6">
//               Subscribe to our newsletter for the latest property listings, market insights, and exclusive offers.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
//               />
//               <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
//                 Subscribe
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12">
//           {/* Company Info */}
//           <div>
//             <div className="mb-4">
//               <h3 className="text-lg font-bold text-gray-900 mb-1">Real Estate Co.</h3>
//               <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
//             </div>
//             <p className="text-gray-600 mb-6">
//               We are a leading real estate company providing premium properties across India. Our focus is on quality
//               and customer satisfaction since 2005.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { icon: Facebook, href: "#" },
//                 { icon: Twitter, href: "#" },
//                 { icon: Instagram, href: "#" },
//                 { icon: Linkedin, href: "#" },
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
//                   aria-label={`Visit our ${social.icon.name} page`}
//                 >
//                   <social.icon className="w-4 h-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <div className="mb-5">
//               <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Links</h3>
//               <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
//             </div>
//             <ul className="space-y-3">
//               {[
//                 { name: "Home", href: "#" },
//                 { name: "Properties", href: "#" },
//                 { name: "Services", href: "#" },
//                 { name: "About Us", href: "#" },
//                 { name: "Contact", href: "#" },
//                 { name: "Blog", href: "#" },
//               ].map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 group"
//                   >
//                     <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
//                     <span>{link.name}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <div className="mb-5">
//               <h3 className="text-lg font-bold text-gray-900 mb-1">Contact Info</h3>
//               <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-start gap-3 text-gray-600">
//                 <MapPin className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
//                 <span>123 Business Avenue, Electronic City, Bangalore, Karnataka - 560100</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Phone className="w-5 h-5 text-gray-900 flex-shrink-0" />
//                 <span>+91 98765 43210</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Mail className="w-5 h-5 text-gray-900 flex-shrink-0" />
//                 <span>contact@realestate.com</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Globe className="w-5 h-5 text-gray-900 flex-shrink-0" />
//                 <span>www.realestate.com</span>
//               </div>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Clock className="w-5 h-5 text-gray-900 flex-shrink-0" />
//                 <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Posts */}
//           <div>
//             <div className="mb-5">
//               <h3 className="text-lg font-bold text-gray-900 mb-1">Recent Posts</h3>
//               <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
//             </div>
//             <div className="space-y-4">
//               {[
//                 {
//                   title: "How to Choose the Perfect Neighborhood",
//                   date: "March 15, 2024",
//                   image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=150",
//                 },
//                 {
//                   title: "5 Tips for First-Time Home Buyers",
//                   date: "March 10, 2024",
//                   image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150",
//                 },
//                 {
//                   title: "Understanding Property Taxes in India",
//                   date: "March 5, 2024",
//                   image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150",
//                 },
//               ].map((post, index) => (
//                 <a key={index} href="#" className="flex gap-3 group">
//                   <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                     <img
//                       src={post.image || "/placeholder.svg"}
//                       alt={post.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
//                       {post.title}
//                     </h4>
//                     <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
//                       <Calendar className="w-3 h-3" />
//                       <span>{post.date}</span>
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-100 px-6 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-600 text-sm text-center md:text-left">
//               &copy; {new Date().getFullYear()} Real Estate Company. All rights reserved.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
//               <a href="#" className="hover:text-gray-900 transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="#" className="hover:text-gray-900 transition-colors">
//                 Terms of Service
//               </a>
//               <a href="#" className="hover:text-gray-900 transition-colors">
//                 Cookie Policy
//               </a>
//               <a href="#" className="hover:text-gray-900 transition-colors">
//                 Sitemap
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

