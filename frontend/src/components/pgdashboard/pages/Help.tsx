import React from 'react';
import { HelpCircle, Book, Phone, Mail, MessageCircle } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Help & FAQ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Book className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-800">Documentation</h2>
          </div>
          <div className="space-y-4">
            <a href="#" className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-800">Getting Started Guide</h3>
              <p className="text-sm text-gray-600 mt-1">Learn the basics of managing your PG dashboard</p>
            </a>
            <a href="#" className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-800">Feature Documentation</h3>
              <p className="text-sm text-gray-600 mt-1">Detailed guides for all dashboard features</p>
            </a>
            <a href="#" className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
              <h3 className="font-medium text-gray-800">API Documentation</h3>
              <p className="text-sm text-gray-600 mt-1">Technical documentation for developers</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-800">Contact Support</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 border border-gray-100 rounded-lg">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800">Phone Support</h3>
                <p className="text-sm text-gray-600">+91 1234567890</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-100 rounded-lg">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800">Email Support</h3>
                <p className="text-sm text-gray-600">support@pgdashboard.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <HelpCircle className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-medium text-gray-800">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              question: "How do I add a new PG listing?",
              answer: "To add a new PG listing, click on the 'Add New PG' button in the top navigation bar. Fill in all the required information about your PG including basic details, room information, and amenities. Don't forget to upload clear photos of your property."
            },
            {
              question: "How can I manage room bookings?",
              answer: "You can manage room bookings through the 'Occupancy Analysis' section. Here you can view current occupancy, manage check-ins/check-outs, and handle booking requests. The system automatically updates availability when bookings are confirmed."
            },
            {
              question: "How do I generate reports?",
              answer: "Reports can be generated from various sections of the dashboard. Each section (Revenue, Occupancy, etc.) has an export option. Select your desired date range and export format (PDF/Excel) to generate detailed reports."
            },
            {
              question: "How can I handle maintenance requests?",
              answer: "Maintenance requests can be managed through the Security & Compliance section. You can view, assign, and track the status of maintenance tickets. Set priority levels and get notifications when tasks are completed."
            }
          ].map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <h3 className="font-medium text-gray-800">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">+</span>
              </summary>
              <p className="mt-4 px-4 text-gray-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg shadow-sm p-6">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-4">Our support team is available 24/7 to assist you</p>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;