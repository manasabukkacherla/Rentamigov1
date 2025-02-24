import React from 'react';
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import RentOffice from '../Commercial/Offfice/Rentoffice';
import SellOffice from '../Commercial/Offfice/Selloffice';
import RentRetail from '../Commercial/Retailshop/RentRetail';
import SellRetail from '../Commercial/Retailshop/SellRetail';
import { AdditionalDetails } from './AdditionalDetails';
import { BHKSelector } from './BHKSelector';
import { DateSelector } from './DateSelector';
import { FurnishingStatusSelector } from './FurnishingStatusSelector';
import { ListingTypeSelector } from './ListingTypeSelector';
import { MonthlyRentInput } from './MonthlyRentInput';
import { ParkingCountSelector } from './ParkingCountSelector';
import { PropertyAgeSelector } from './PropertyAgeSelector';
import { PropertyCategorySelector } from './PropertyCategorySelector';
import { PropertyTypeSelector } from './PropertyTypeSelector';
import { RoomCountSelector } from './RoomCountSelector';
import { TenantPreferenceSelector } from './TenantPreferenceSelector';
import RentShowroom from '../Commercial/Showroom/Rentshowroom';
import SellShowroom from '../Commercial/Showroom/SaleShowroom';
import RentWarehouse from '../Commercial/Warehouse/Rentwarehouse';
import SellWarehouse from '../Commercial/Warehouse/Sellwarehouse';
import RentPlot from '../Commercial/Plot/Rentplot';
import SellPlot from '../Commercial/Plot/Sellplot';
import RentOther from '../Commercial/Others/Rentothers';
import SellOthers from '../Commercial/Others/Sellothers';

type PropertyFormProps = {
  propertyType: string;
  listingType: string;
  propertyCategory: string;
  transactionType: string;
  onPropertyTypeChange: (type: string) => void;
  onListingTypeChange: (type: string) => void;
  onPropertyCategoryChange: (category: string) => void;
  onTransactionTypeChange: (type: string) => void;
};

export function PropertyForm({
  propertyType,
  listingType,
  propertyCategory,
  transactionType,
  onPropertyTypeChange,
  onListingTypeChange,
  onPropertyCategoryChange,
  onTransactionTypeChange,
}: PropertyFormProps) {
  const [step, setStep] = React.useState(1);
  const [constructionStatus, setConstructionStatus] = React.useState('');
  const [propertyAge, setPropertyAge] = React.useState('');
  const [bhk, setBhk] = React.useState('');
  const [bathrooms, setBathrooms] = React.useState(1);
  const [balconies, setBalconies] = React.useState(0);
  const [furnishingStatus, setFurnishingStatus] = React.useState('');
  const [tenantPreference, setTenantPreference] = React.useState('');
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>([]);
  const [coveredParking, setCoveredParking] = React.useState(0);
  const [openParking, setOpenParking] = React.useState(0);
  const [availableFrom, setAvailableFrom] = React.useState('');
  const [monthlyRent, setMonthlyRent] = React.useState('');
  const [showAdditionalDetails, setShowAdditionalDetails] = React.useState(false);
  const [additionalDetails, setAdditionalDetails] = React.useState({
    parkingCharges: '',
    paintingCharges: '',
    facing: '',
    servantRoom: '',
    reraId: '',
    propertyDescription: '',
    address: '',
  });

  const handlePropertyTypeChange = (type: string) => {
    onPropertyTypeChange(type);
    onPropertyCategoryChange('');
    setStep(1);
  };

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleAdditionalDetailsChange = (field: string, value: string) => {
    setAdditionalDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleNext = () => {
    if (propertyType === "commercial") {
      if (step === 1) {
        setStep(2);
      }
      return;
    }
    setStep(prev => prev + 1);
  };

  const getStepTitle = () => {
    if (propertyType === "commercial" && step === 2) {
      const category = propertyCategory.toLowerCase();
      if (category === "office") {
        return listingType === "rent" ? "Rent Office Details" : "Sell Office Details";
      } else if (category === "retail") {
        return listingType === "rent" ? "Rent Retail Shop Details" : "Sell Retail Shop Details";
      }
      return "Commercial Property Details";
    }
  
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Property Configuration";
      case 3:
        return "Additional Details";
      default:
        return "";
    }
  };

  const getMaxSteps = () => {
    return propertyType === "commercial" ? 2 : 3;
  };

  const renderCommercialComponent = () => {
    const category = propertyCategory.toLowerCase();
    if (category === "office") {
      return listingType === "rent" ? <RentOffice /> : <SellOffice />;
    } else if (category === "retail shop") {
      return listingType === "rent" ? <RentRetail /> : <SellRetail />;
    }
    else if (category === "showroom") {
      return listingType === "rent" ? <RentShowroom /> : <SellShowroom />;}
      else if (category === "warehouse") {
        return listingType === "rent" ? <RentWarehouse /> : <SellWarehouse />;}
        else if (category === "plot") {
          return listingType === "rent" ? <RentPlot /> : <SellPlot />;}
          else if (category === "others") {
            return listingType === "rent" ? <RentOther /> : <SellOthers />;}
    return null;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <PropertyTypeSelector selected={propertyType} onSelect={handlePropertyTypeChange} />
            <ListingTypeSelector selected={listingType} onSelect={onListingTypeChange} hidePGColiving={propertyType === "commercial"} />
            <PropertyCategorySelector selected={propertyCategory} onSelect={onPropertyCategoryChange} propertyType={propertyType} />
            {propertyType !== "commercial" && <PropertyAgeSelector selected={propertyAge} onSelect={setPropertyAge} />}
          </div>
        );
  
      case 2:
        if (propertyType === "commercial") {
          return renderCommercialComponent();
        }
        
        return (
          <div className="space-y-8">
            {propertyType === 'residential' && (
              <>
                <BHKSelector selected={bhk} onSelect={setBhk} />
                <RoomCountSelector label="Bathroom" selected={bathrooms} onSelect={setBathrooms} maxCount={4} />
                <RoomCountSelector label="Balcony" selected={balconies} onSelect={setBalconies} maxCount={4} />
                <FurnishingStatusSelector selected={furnishingStatus} onSelect={setFurnishingStatus} selectedAmenities={selectedAmenities} onToggleAmenity={handleToggleAmenity} />
                {listingType === 'rent' && <TenantPreferenceSelector selected={tenantPreference} onSelect={setTenantPreference} />}
              </>
            )}
          </div>
        );
  
      case 3:
        if (propertyType === "commercial") return null;
        
        return (
          <div className="space-y-8">
            <ParkingCountSelector label="Covered Parking" selected={coveredParking} onSelect={setCoveredParking} />
            <ParkingCountSelector label="Open Parking" selected={openParking} onSelect={setOpenParking} />
            {listingType === 'rent' && (
              <>
                <DateSelector label="Available From" selected={availableFrom} onSelect={setAvailableFrom} />
                <MonthlyRentInput value={monthlyRent} onChange={setMonthlyRent} />
              </>
            )}
          </div>
        );
    }
  };

  const maxSteps = getMaxSteps();

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 sm:px-8 py-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">{getStepTitle()}</h2>
            <div className="flex items-center mt-4 gap-2">
              {Array.from({ length: maxSteps }, (_, i) => i + 1).map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-12 sm:w-16 bg-white' : 'w-6 sm:w-8 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-8">
            <div className="space-y-6">
              {renderStep()}
            </div>

            {/* Additional Details Button */}
            {step === 3 && !showAdditionalDetails && propertyType !== "commercial" && (
              <button
                onClick={() => setShowAdditionalDetails(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 mt-8 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Additional Details
              </button>
            )}

            {showAdditionalDetails && propertyType !== "commercial" && (
              <AdditionalDetails
                onClose={() => setShowAdditionalDetails(false)}
                values={additionalDetails}
                onChange={handleAdditionalDetailsChange}
              />
            )}

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              {step < maxSteps && (
                <button 
                  onClick={handleNext} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  {step === maxSteps ? "Submit" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {step === maxSteps && (
                <button 
                  onClick={() => console.log('Form submitted')} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                  Submit
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}