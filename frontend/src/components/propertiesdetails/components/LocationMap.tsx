import type React from "react"
import { MapPin, Navigation, Car, Clock } from "lucide-react"

export const LocationMap: React.FC = () => {
  const landmarks = [
    { name: "Electronic City Metro Station", distance: "0.8 km", time: "5 mins" },
    { name: "Infosys Campus", distance: "1.2 km", time: "7 mins" },
    { name: "Wipro Campus", distance: "2.5 km", time: "12 mins" },
    { name: "Forum Mall", distance: "3.0 km", time: "15 mins" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Location</h2>

      <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965966906644!2d77.64163427473439!3d12.838572987455667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b2ef7f1c6f3%3A0x6c06e8c7dc1ac0e!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        ></iframe>

        <div className="absolute bottom-4 right-4">
          <button className="bg-white px-4 py-2 rounded-lg shadow-md text-gray-800 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Get Directions
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Property Address</h3>
              <p className="text-gray-600">123 Electronic City Phase 1, Bengaluru, Karnataka 560100</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-2 rounded-full">
              <Car className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Commute</h3>
              <p className="text-gray-600">Easy access to Hosur Road, Elevated Expressway, and NICE Road</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-3">Nearby Landmarks</h3>
          <div className="space-y-3">
            {landmarks.map((landmark, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-800">{landmark.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-sm">{landmark.distance}</span>
                  <div className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 text-gray-700" />
                    <span className="text-xs font-medium">{landmark.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

