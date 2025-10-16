import React from "react";
import { Building2 } from "lucide-react";
import PageBanner from "./Banner/BannerPage";
import Footer from "./Footer"; // Adjust the path based on your file structure
import Headerr from "./headerr";

function AboutUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Headerr />

      {/* Main Content */}
      <div className="flex-grow">
        <PageBanner title="About Us" Icon={Building2} />

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="space-y-12">
            <div>
              <p className="text-lg mb-6">
                <span className="font-semibold">Amigo</span> is a Spanish word
                which means "Friend". Propamigo is a group of friends who help
                you with your property rental requirements.
              </p>
              <p className="text-lg mb-6">
                Propamigo aims to bridge the gap that exists between a lessor
                and lessee of a residential property. Its founders Samit
                Bhattacharya and Vikranth Naik while working for several years
                in the industry realized that there is a common need that
                exists commonly among both these parties, the need for an easy
                common platform which will provide a standardized methodology
                for the end-to-end process.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="font-['NeuroPolXFree'] text-3xl mb-6">
                Our Key Objectives
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">COMFORT GUARANTEED</h3>
                  <p>
                    All the Propamigo homes shall be equipped with the preset
                    standard amenities that are promised on its platform. We
                    ensure that there is absolutely no deviation to these so
                    that any user who takes up a Propamigo home can move-in
                    without even giving a second thought about all the basic
                    amenities that are required to start residing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">VALUE FOR MONEY</h3>
                  <p>
                    We do a data-driven analysis to arrive at a particular rent
                    that should be apt for the given property. This way we
                    ensure that the tenant pays the right rent for what he is
                    getting. This also ensures a lesser turnaround time to find
                    a tenant for a property.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">PEACE OF MIND</h3>
                  <p>
                    We screen all the tenants prior to move-in to any of the
                    Propamigo properties to ensure that there aren't any
                    problems post move-in. Also, we do have the home completely
                    ready for the tenant prior to the scheduled move-in date so
                    as to ensure there is no scope of delay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUs;
