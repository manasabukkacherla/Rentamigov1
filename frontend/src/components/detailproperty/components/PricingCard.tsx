import React, { useState } from 'react';
import { IndianRupee, X, ChevronUp } from 'lucide-react';
import { EnquiryForm } from './EnquiryForm';
import { Property } from '../App';

export const PricingCard: React.FC<{property: Property; onEnquireClick?: () => void}> = ({property, onEnquireClick}) => {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showMobilePricing, setShowMobilePricing] = useState(false);
  
  const PricingContent = () => {
    if (property?.metadata?.intent === "sale" || property?.metadata?.intent === "Sale") {
      return (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-500 mb-1">Property Price</div>
            <div className="flex justify-between items-center text-gray-900">
              <span className="font-medium">Amount</span>
              <span className="text-lg">{property?.pricingDetails?.propertyPrice || property?.priceDetails?.propertyPrice || "Not specified"}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-500 mb-1">Price Type</div>
            <div className="flex justify-between items-center text-gray-900">
              <span className="font-medium">Type</span>
              <span className="text-lg">{property?.metadata?.intent || "Not specified"}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-500 mb-1">Registration Details</div>
            <div className="space-y-2 text-gray-900">
              <div className="flex justify-between items-center">
                <span>Charges Type</span>
                <span>{property?.registration?.chargestype || "Not specified"}</span>
              </div>
              {property?.registration?.chargestype === "exclusive" && (
                <>
                <div className="flex justify-between items-center">
                    <span>Registration Amount</span>
                    <span>{property?.registration?.registrationAmount || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stamp Duty Amount</span>
                    <span>{property?.registration?.stampDutyAmount || "Not specified"}</span>
                </div>
                </>
              )}
            </div>
          </div>

          {property?.pricingDetails?.totalprice ? (
          <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Price</div>
              <div className="flex justify-between items-center text-gray-900">
                <span className="font-medium">Total</span>
                <span className="text-lg">{property?.pricingDetails?.totalprice}</span>
              </div>
              </div>
          ) : property?.registration?.chargestype === "inclusive" ? (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-1">Brokerage Details</div>
              <div className="space-y-2 text-gray-900">
              <div className="flex justify-between items-center">
                  <span>Required</span>
                  <span>{property?.brokerage?.required || "Not specified"}</span>
              </div>
                {property?.brokerage?.required === "yes" && property?.brokerage?.amount && (
              <div className="flex justify-between items-center">
                    <span>Amount</span>
                    <span>{property?.brokerage?.amount}</span>
              </div>
                )}
              </div>
            </div>
          ) : null}

          <button 
            onClick={() => setShowEnquiry(true)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Enquire Now
          </button>
        </div>
      );
    }

    // For rent or lease properties
    return (
      <div className="space-y-4">
        {property?.metadata?.intent === "lease" || property?.metadata?.intent === "Lease" ? (
          property?.leaseTerms?.leaseDetails?.leaseAmount?.amount ? (
            <>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Lease Details</div>
                <div className="space-y-2 text-gray-900">
                  <div className="flex justify-between items-center">
                    <span>Lease Amount</span>
                    <span>{property?.leaseTerms?.leaseDetails?.leaseAmount?.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Type</span>
                    <span>{property?.leaseTerms?.leaseDetails?.leaseAmount?.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Duration</span>
                    <span>{property?.leaseTerms?.leaseDetails?.leaseAmount?.duration} {property?.leaseTerms?.leaseDetails?.leaseAmount?.durationUnit}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Maintenance</div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-medium">Amount</span>
                  <span className="text-lg">{property?.leaseTerms?.maintenanceAmount?.amount}</span>
                </div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-medium">Frequency</span>
                  <span className="text-lg">{property?.leaseTerms?.maintenanceAmount?.frequency}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-2">Other Charges</div>
                <div className="space-y-2 text-gray-900">
                  <div className="flex justify-between items-center">
                    <span>Water</span>
                    <span>{property?.rentalTerms?.otherCharges?.water?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.water?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Electricity</span>
                    <span>{property?.rentalTerms?.otherCharges?.electricity?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.electricity?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gas</span>
                    <span>{property?.rentalTerms?.otherCharges?.gas?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.gas?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <span>{property?.rentalTerms?.otherCharges?.others?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.others?.amount : "Inclusive"}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Monthly Maintenance</div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-medium">Amount</span>
                  <span className="text-lg">{property?.rentalTerms?.rentDetails?.rentType === "exclusive" ? property?.rentalTerms?.maintenanceAmount?.amount : "Inclusive"}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Security Deposit</div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-medium">Amount</span>
                  <span className="text-lg">{property?.rentalTerms?.securityDeposit?.amount}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-2">Other Charges</div>
                <div className="space-y-2 text-gray-900">
                  <div className="flex justify-between items-center">
                    <span>Water</span>
                    <span>{property?.rentalTerms?.otherCharges?.water?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.water?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Electricity</span>
                    <span>{property?.rentalTerms?.otherCharges?.electricity?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.electricity?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gas</span>
                    <span>{property?.rentalTerms?.otherCharges?.gas?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.gas?.amount : "Inclusive"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Others</span>
                    <span>{property?.rentalTerms?.otherCharges?.others?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.others?.amount : "Inclusive"}</span>
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-1">Monthly Maintenance</div>
              <div className="flex justify-between items-center text-gray-900">
                <span className="font-medium">Amount</span>
                <span className="text-lg">{property?.rentalTerms?.rentDetails?.rentType === "exclusive" ? property?.rentalTerms?.maintenanceAmount?.amount : "Inclusive"}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-1">Security Deposit</div>
              <div className="flex justify-between items-center text-gray-900">
                <span className="font-medium">Amount</span>
                <span className="text-lg">{property?.rentalTerms?.securityDeposit?.amount}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 mb-2">Other Charges</div>
              <div className="space-y-2 text-gray-900">
                <div className="flex justify-between items-center">
                  <span>Water</span>
                  <span>{property?.rentalTerms?.otherCharges?.water?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.water?.amount : "Inclusive"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Electricity</span>
                  <span>{property?.rentalTerms?.otherCharges?.electricity?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.electricity?.amount : "Inclusive"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Gas</span>
                  <span>{property?.rentalTerms?.otherCharges?.gas?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.gas?.amount : "Inclusive"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Others</span>
                  <span>{property?.rentalTerms?.otherCharges?.others?.type === "exclusive" ? property?.rentalTerms?.otherCharges?.others?.amount : "Inclusive"}</span>
                </div>
              </div>
            </div>
          </>
        )}

        <button 
          onClick={onEnquireClick || (() => setShowEnquiry(true))}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Enquire Now
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block bg-white rounded-lg p-4 shadow-lg sticky top-6">
        <div className="flex items-center gap-2 mb-4">
          <IndianRupee className="w-8 h-5 text-gray-900" />
          <span className="text-2xl font-bold text-gray-900">{property?.metadata?.intent === "lease" || property?.metadata?.intent === "Lease" ? property?.leaseTerms?.leaseDetails?.leaseAmount?.amount || property?.leaseTerms?.leaseDetails?.leaseAmount?.amount : property?.metadata?.intent === "rent" || property?.metadata?.intent === "Rent" ? property?.rentalTerms?.rentDetails?.expectedRent || property?.rentalTerms?.expectedRent : property?.pricingDetails?.propertyPrice || property?.priceDetails?.propertyPrice || "Not specified"}</span>
          <span className="text-gray-500">{property?.metadata?.intent === "sale" || property?.metadata?.intent === "Sale" ? "" : "/month"}</span>
        </div>
        <PricingContent />
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setShowMobilePricing(true)}
          className="flex items-center justify-between w-full bg-white px-6 py-4 border-t border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <IndianRupee className="w-8 h-5 text-gray-900" />
            <span className="text-2xl font-bold text-gray-900">{property?.metadata?.intent === "lease" || property?.metadata?.intent === "Lease" ? property?.leaseTerms?.leaseDetails?.leaseAmount?.amount || property?.leaseTerms?.leaseDetails?.leaseAmount?.amount : property?.metadata?.intent === "rent" || property?.metadata?.intent === "Rent" ? property?.rentalTerms?.rentDetails?.expectedRent || property?.rentalTerms?.expectedRent : property?.pricingDetails?.propertyPrice || property?.priceDetails?.propertyPrice || "Not specified"}</span>
            <span className="text-gray-500">{property?.metadata?.intent === "sale" || property?.metadata?.intent === "Sale" ? "" : "/month"}</span>
          </div>
          <ChevronUp className={`w-5 h-5 text-gray-600 transition-transform ${showMobilePricing ? 'rotate-180' : ''}`} />
        </button>

        {showMobilePricing && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobilePricing(false)}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pricing Details</h2>
                <button
                  onClick={() => setShowMobilePricing(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <PricingContent />
            </div>
          </div>
        )}
      </div>

      {showEnquiry && (
        <EnquiryForm 
          onClose={() => setShowEnquiry(false)} 
          property={{
            price: (property?.pricingDetails?.propertyPrice || property?.priceDetails?.propertyPrice || "Not specified")?.toString() ?? "Not specified",
            propertyId:property.propertyId,
            propertyType:property.metadata.intent,
            createdBy: property.metadata.createdBy?.toString() ?? "Not specified",
            propertyName:property.basicInformation.title
          }}
        />
      )}
    </>
  );
};