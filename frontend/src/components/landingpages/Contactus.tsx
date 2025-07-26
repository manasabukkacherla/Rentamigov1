import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import PageBanner from "./Banner/BannerPage";
import Footer from "./Footer"; // Adjust the path based on your file structure
import Headerr from "./headerr";

function ContactUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Headerr />

      {/* Main Content */}
      <div className="flex-grow">
        <PageBanner title="Contact Us" Icon={Phone} />

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-4">
                  Have questions about our rental properties or services? We're here to help!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>


 080-41554935</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>contact@rentamigo.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
                  <span>170, Bentley's GuHa, 27th Main Rd, 3rd Cross Rd, Jay Bheema Nagar, 1st Stage, BTM 1st Stage, Bengaluru,
Karnataka, 560068</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ContactUs;
