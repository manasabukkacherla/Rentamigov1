import React from "react";
import { FileText } from "lucide-react";
import PageBanner from "./Banner/BannerPage";
import Headerr from "./headerr"; // Adjust the path based on your file structure
import Footer from "./Footer"; // Adjust the path based on your file structure

function TenancyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Headerr />

      {/* Page Content */}
      <div className="flex-grow">
        <PageBanner title="Tenancy Policy" Icon={FileText} />

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="space-y-8">
            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">General Terms</h2>
              <div className="space-y-4">
                <p>1. The minimum lease term is 11 months.</p>
                <p>2. A security deposit equivalent to 2-3 months' rent is required.</p>
                <p>3. Rent must be paid by the 5th of each month.</p>
                <p>4. Maintenance charges are included in the rent.</p>
              </div>
            </section>

            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">Tenant Responsibilities</h2>
              <div className="space-y-4">
                <p>1. Maintain the property in good condition.</p>
                <p>2. Report any maintenance issues promptly.</p>
                <p>3. No structural modifications without written permission.</p>
                <p>4. Follow society rules and regulations.</p>
              </div>
            </section>

            <section>
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">Notice Period</h2>
              <div className="space-y-4">
                <p>1. Two months' notice required for vacation.</p>
                <p>2. Property inspection will be conducted before handover.</p>
                <p>
                  3. Security deposit will be returned within 7 working days
                  after successful handover.
                </p>
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

export default TenancyPolicy;
