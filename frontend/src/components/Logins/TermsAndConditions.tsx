import React from 'react';
import { X } from 'lucide-react';

interface TermsAndConditionsProps {
  onClose: () => void;
}

function TermsAndConditions({ onClose }: TermsAndConditionsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h3>
            <p className="text-gray-600 mb-6">
              Welcome to our property management platform. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Definitions</h3>
            <p className="text-gray-600 mb-6">
              "Service" refers to the property management platform provided by our company.
              "User" refers to any individual or entity that accesses or uses our Service.
              "Content" refers to all information, data, and materials available on our platform.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h3>
            <p className="text-gray-600 mb-6">
              Users are responsible for maintaining the confidentiality of their account credentials.
              Users must provide accurate and complete information when creating an account.
              Users are responsible for all activities that occur under their account.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Privacy Policy</h3>
            <p className="text-gray-600 mb-6">
              Our Privacy Policy describes how we collect, use, and protect your personal information.
              By using our Service, you consent to our collection and use of your data as described in the Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Property Listings</h3>
            <p className="text-gray-600 mb-6">
              Property owners and agents must provide accurate information about their listings.
              Users must obtain necessary permissions before posting any property-related content.
              We reserve the right to remove any listing that violates our policies.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Prohibited Activities</h3>
            <p className="text-gray-600 mb-6">
              Users may not engage in any fraudulent or illegal activities.
              Users may not attempt to gain unauthorized access to our systems.
              Users may not interfere with other users' use of the Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h3>
            <p className="text-gray-600 mb-6">
              We are not liable for any indirect, incidental, or consequential damages.
              Our total liability shall not exceed the amount paid by you for using our Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h3>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time.
              Users will be notified of any significant changes.
              Continued use of the Service constitutes acceptance of modified terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">9. Contact Information</h3>
            <p className="text-gray-600">
              For questions about these Terms and Conditions, please contact us at:
              support@propertymanagement.com
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}


export default TermsAndConditions;