import React from "react";
import { Shield } from "lucide-react";
import PageBanner from "./Banner/BannerPage";
import Footer from "./Footer"; // Adjust the path based on your file structure
import Headerr from "./headerr";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Headerr />

      {/* Main Content */}
      <div className="flex-grow">
        <PageBanner title="Privacy Policy" Icon={Shield} />

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="space-y-8">
            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">Information We Collect</h2>
              <div className="space-y-4">
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact information</li>
                  <li>Identification documents</li>
                  <li>Employment and income details</li>
                  <li>Previous rental history</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">How We Use Your Information</h2>
              <div className="space-y-4">
                <p>Your information is used for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tenant verification and screening</li>
                  <li>Rental agreement preparation</li>
                  <li>Communication regarding property matters</li>
                  <li>Legal compliance and documentation</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">Data Security</h2>
              <div className="space-y-4">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encrypted data storage</li>
                  <li>Secure document handling</li>
                  <li>Limited access to authorized personnel</li>
                  <li>Regular security audits</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
