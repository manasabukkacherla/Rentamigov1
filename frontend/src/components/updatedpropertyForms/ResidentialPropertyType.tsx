import { useState } from "react";
import { Store, Building2, Warehouse, Home, Building, Users, Map, Factory, TreePine, CheckCircle2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import Apartment from './property-types/Apartment';
import IndependentHouse from './property-types/IndependentHouse';
import BuilderFloor from './property-types/BuilderFloor';
import SharedSpace from './property-types/SharedSpace';
import LeaseApartment from './property-types/LeaseApartment';
import LeaseIndependentHouse from './property-types/LeaseIndependentHouse';
import LeaseBuilderFloor from './property-types/LeaseBuilderFloor';
import SellApartment from './property-types/SellApartment';
import SellIndependentHouse from './property-types/SellIndependentHouse';
import SellBuilderFloor from './property-types/SellBuilderFloor';
import SellPlot from './property-types/SellPlot';
import LeaseAgricultureMain from "./commercialpropertytypes/LeaseAgricultureMain";
import LeaseCoveredSpaceMain from "./commercialpropertytypes/LeaseCoveredSpaceMain";
import LeaseOfficeSpaceMain from "./commercialpropertytypes/LeaseOfficeSpaceMain";
import LeaseOthersMain from "./commercialpropertytypes/LeaseOthersMain";
import LeasePropertyMain from "./commercialpropertytypes/LeasePropertyMain";
import LeaseRetailStoreMain from "./commercialpropertytypes/LeaseRetailStoreMain";
import LeaseShedMain from "./commercialpropertytypes/LeaseShedMain";
import LeaseShopMain from "./commercialpropertytypes/LeaseShopMain";
import LeaseShowroomMain from "./commercialpropertytypes/LeaseShowroomMain";
import LeaseWarehouseMain from "./commercialpropertytypes/LeaseWarehouseMain";
import RentAgriculture from "./commercialpropertytypes/RentAgriculture";
import RentCoveredSpace from "./commercialpropertytypes/RentCoveredSpace";
import RentOfficeSpace from "./commercialpropertytypes/RentOfficeSpace";
import RentOthers from "./commercialpropertytypes/RentOthers";
import RentPlot from "./commercialpropertytypes/RentPlot";
import RentRetailStoreMain from "./commercialpropertytypes/RentRetailStoreMain";
import RentShed from "./commercialpropertytypes/RentShed";
import RentShopMain from "./commercialpropertytypes/RentShopMain";
import RentShowroomMain from "./commercialpropertytypes/RentShowroomMain";
import RentWarehouse from "./commercialpropertytypes/RentWarehouse";
import SellAgricultureMain from "./commercialpropertytypes/SellAgricultureMain";
import SellCoveredSpaceMain from "./commercialpropertytypes/SellCoveredSpaceMain";
import SellOfficeSpaceMain from "./commercialpropertytypes/SellOfficeSpaceMain";
import SellOthersMain from "./commercialpropertytypes/SellOthersMain";
import SellPlotMain from "./commercialpropertytypes/SellPlotMain";
import SellRetailShopMain from "./commercialpropertytypes/SellRetailShopMain";
import SellShedMain from "./commercialpropertytypes/SellShedMain";
import SellShopMain from "./commercialpropertytypes/SellShopMain";
import SellShowroomMain from "./commercialpropertytypes/SellShowroomMain";
import SellWarehouseMain from "./commercialpropertytypes/SellWarehouseMain";

interface ResidentialPropertyTypeProps {
  listingType: string;
  selectedType: string | null;
  onSelect: (type: string) => void;
  propertyType: string;
}

const ResidentialPropertyType = ({ listingType, selectedType, onSelect, propertyType }: ResidentialPropertyTypeProps) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  //PROPERTY ID PROPS 
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getPropertyTypes = () => {
    if (propertyType === 'Commercial') {
      return [
        {
          id: 'shop',
          name: 'Shop',
          icon: Store,
          description: 'Small retail spaces for businesses'
        },
        {
          id: 'retail-store-space',
          name: 'Retail Store Space',
          icon: Building2,
          description: 'Large retail spaces for stores'
        },
        {
          id: 'showroom',
          name: 'Showroom',
          icon: Store,
          description: 'Display spaces for products'
        },
        {
          id: 'office-space',
          name: 'Office Space',
          icon: Building2,
          description: 'Professional workspace'
        },
        {
          id: 'warehouse',
          name: 'Warehouse',
          icon: Warehouse,
          description: 'Storage facilities'
        },
        {
          id: 'shed',
          name: 'Shed',
          icon: Factory,
          description: 'Industrial sheds'
        },
        {
          id: 'covered-open-space',
          name: 'Covered/Open Space',
          icon: Building,
          description: 'Versatile spaces'
        },
        {
          id: 'plot',
          name: 'Plot',
          icon: Map,
          description: 'Commercial plots'
        },
        {
          id: 'agricultural-land',
          name: 'Agricultural Land',
          icon: TreePine,
          description: 'Farming and agriculture'
        },
        {
          id: 'others',
          name: 'Others',
          icon: Building2,
          description: 'Other commercial spaces'
        }
      ];
    } else if (listingType === 'Rent') {
      return [
        {
          id: 'apartment',
          name: 'Apartment',
          icon: Building2,
          description: 'Modern living spaces in multi-story buildings'
        },
        {
          id: 'independent-house',
          name: 'Independent House',
          icon: Home,
          description: 'Standalone houses with complete privacy'
        },
        {
          id: 'builder-floor',
          name: 'Builder Floor',
          icon: Building,
          description: 'Individual floors in low-rise buildings'
        },
        {
          id: 'shared-space',
          name: 'Shared Space',
          icon: Users,
          description: 'Shared accommodations and co-living spaces'
        }
      ];
    } else if (listingType === 'Sell') {
      return [
        {
          id: 'apartment',
          name: 'Apartment',
          icon: Building2,
          description: 'Modern living spaces in multi-story buildings'
        },
        {
          id: 'independent-house',
          name: 'Independent House',
          icon: Home,
          description: 'Standalone houses with complete privacy'
        },
        {
          id: 'builder-floor',
          name: 'Builder Floor',
          icon: Building,
          description: 'Individual floors in low-rise buildings'
        },
        {
          id: 'plot',
          name: 'Plot',
          icon: Map,
          description: 'Land plots for custom construction'
        }
      ];
    } else if (listingType === 'Lease') {
      return [
        {
          id: 'apartment',
          name: 'Apartment',
          icon: Building2,
          description: 'Modern living spaces in multi-story buildings'
        },
        {
          id: 'independent-house',
          name: 'Independent House',
          icon: Home,
          description: 'Standalone houses with complete privacy'
        },
        {
          id: 'builder-floor',
          name: 'Builder Floor',
          icon: Building,
          description: 'Individual floors in low-rise buildings'
        }
      ];
    }
    return [];
  };

  const propertyTypes = getPropertyTypes();

  const getSelectedPropertyName = () => {
    const selectedProperty = propertyTypes.find(type => type.id === selectedType);
    return selectedProperty ? selectedProperty.name : '';
  };

  const renderPropertyForm = () => {
    if (propertyType === 'Commercial') {
      if (listingType === 'Rent') {
        switch (selectedType) {
          case 'shop':
            return <RentShopMain />;
          case 'retail-store-space':
            return <RentRetailStoreMain />;
          case 'showroom':
            return <RentShowroomMain />;
          case 'office-space':
            return <RentOfficeSpace />;
          case 'warehouse':
            return <RentWarehouse />;
          case 'shed':
            return <RentShed />;
          case 'covered-open-space':
            return <RentCoveredSpace />;
          case 'plot':
            return <RentPlot />;
          case 'agricultural-land':
            return <RentAgriculture />;
          case 'others':
            return <RentOthers />;
        }
      } else if (listingType === 'Sell') {
        switch (selectedType) {
          case 'shop':
            return <SellShopMain />;
          case 'retail-store-space':
            return <SellRetailShopMain />;
          case 'showroom':
            return <SellShowroomMain />;
          case 'office-space':
            return <SellOfficeSpaceMain />;
          case 'warehouse':
            return <SellWarehouseMain />;
          case 'shed':
            return <SellShedMain />;
          case 'covered-open-space':
            return <SellCoveredSpaceMain />;
          case 'plot':
            return <SellPlotMain />;
          case 'agricultural-land':
            return <SellAgricultureMain />;
          case 'others':
            return <SellOthersMain />;
        }
      } else if (listingType === 'Lease') {
        switch (selectedType) {
          case 'shop':
            return <LeaseShopMain />;
          case 'retail-store-space':
            return <LeaseRetailStoreMain />;
          case 'showroom':
            return <LeaseShowroomMain />;
          case 'office-space':
            return <LeaseOfficeSpaceMain />;
          case 'warehouse':
            return <LeaseWarehouseMain />;
          case 'shed':
            return <LeaseShedMain />;
          case 'covered-open-space':
            return <LeaseCoveredSpaceMain />;
          case 'plot':
            return <LeasePropertyMain />;
          case 'agricultural-land':
            return <LeaseAgricultureMain />;
          case 'others':
            return <LeaseOthersMain />;
        }
      }
    } else if (propertyType === 'Residential') {
      if (listingType === 'Rent') {
        switch (selectedType) {
          case 'apartment':
            return <Apartment propertyId={""} />;
          case 'independent-house':
            return <IndependentHouse propertyId={""} />;
          case 'builder-floor':
            return <BuilderFloor propertyId={""} />;
          case 'shared-space':
            return <SharedSpace propertyId={""} />;
        }
      } else if (listingType === 'Lease') {
        switch (selectedType) {
          case 'apartment':
            return <LeaseApartment propertyId={""} />;
          case 'independent-house':
            return <LeaseIndependentHouse propertyId={""} />;
          case 'builder-floor':
            return <LeaseBuilderFloor propertyId={""} />;
        }
      } else if (listingType === 'Sell') {
        switch (selectedType) {
          case 'apartment':
            return <SellApartment propertyId={""} />;
          case 'independent-house':
            return <SellIndependentHouse propertyId={""} />;
          case 'builder-floor':
            return <SellBuilderFloor propertyId={""} />;
          case 'plot':
            return <SellPlot />;
        }
      }
    }
    return null;
  };
  

  if (propertyTypes.length === 0) return null;

  const handleNextClick = async () => {
    if (!selectedType) return alert("Please select a property type.");
  
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
  
    try {
      const response = await fetch("http://localhost:8000/api/property-selection/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: propertyType,
          listingType: listingType,
          subCategory: selectedType,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        setPropertyId(data.propertyId); // ✅ Store propertyId
        setSuccessMessage("Property selection saved successfully! ✅");
  
        // 🔥 Delay rendering to ensure state updates
        setTimeout(() => {
          setShowForm(true);  // ✅ Pass propertyId
        }, 500);} else {
        setErrorMessage("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to connect to the server.");
    }
  
    setLoading(false);
  };
  if (showForm && selectedType) {
    return (
      <div>
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{propertyType}</p>
                <p className="text-xs text-white/60">Property Category</p>
              </div>
            </div>
            <div className="flex-1 mx-4 h-px bg-white/20" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{listingType}</p>
                <p className="text-xs text-white/60">Listing Type</p>
              </div>
            </div>
            <div className="flex-1 mx-4 h-px bg-white/20" />
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
                <CheckCircle2 size={20} />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{getSelectedPropertyName()}</p>
                <p className="text-xs text-white/60">Property Type</p>
              </div>
            </div>
          </div>
        </div>

        {renderPropertyForm()}
      </div>
    );
  }

  return (
    <div>
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
              <CheckCircle2 size={20} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{propertyType}</p>
              <p className="text-xs text-white/60">Property Category</p>
            </div>
          </div>
          <div className="flex-1 mx-4 h-px bg-white/20" />
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
              <CheckCircle2 size={20} />
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{listingType}</p>
              <p className="text-xs text-white/60">Listing Type</p>
            </div>
          </div>
          <div className="flex-1 mx-4 h-px bg-white/20" />
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white">
              <span>3</span>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Property Type</p>
              <p className="text-xs text-white/60">Select Category</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {propertyTypes.map(({ id, name, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`flex flex-col p-4 rounded-lg border transition-all duration-200 ${
                selectedType === id
                  ? "bg-white text-black border-white"
                  : "border-white/20 hover:border-white"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  size={20}
                  className={selectedType === id ? "text-black" : "text-white/80"}
                />
                <h4 className="font-medium">{name}</h4>
              </div>
              <p className={`text-sm ${
                selectedType === id ? "text-black/70" : "text-white/60"
              }`}>
                {description}
              </p>
            </button>
          ))}
        </div>

          {/* Success & Error Messages */}
      {successMessage && <div className="p-4 bg-green-500 text-white rounded-lg text-center">{successMessage}</div>}
      {errorMessage && <div className="p-4 bg-red-500 text-white rounded-lg text-center">{errorMessage}</div>}


      {selectedType && (
        <div className="flex justify-end">
          <button
            onClick={handleNextClick}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
          >
            {loading ? "Saving..." : "Next"}
          </button>
        </div>
      )}

      </div>
    </div>
  );
};

export default ResidentialPropertyType;






