import { Store, Building2, Warehouse, Home, Building, Users, Map, Factory, TreePine } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import RentShopMain from './CommercialPropertyTypes/RentShopMain';
import RentRetailStoreMain from './CommercialPropertyTypes/RentRetailStoreMain';
import RentShowroomMain from './CommercialPropertyTypes/RentShowroomMain';
import RentOfficeSpace from './CommercialPropertyTypes/RentOfficeSpace';
import RentWarehouse from './CommercialPropertyTypes/RentWarehouse';
import RentShed from './CommercialPropertyTypes/RentShed';
import RentCoveredSpace from './CommercialPropertyTypes/RentCoveredSpace';
import RentPlot from './CommercialPropertyTypes/RentPlot';
import RentAgriculture from './CommercialPropertyTypes/RentAgriculture';
import RentOthers from './CommercialPropertyTypes/RentOthers';
import SellShopMain from './CommercialPropertyTypes/SellShopMain';
import SellRetailShopMain from './CommercialPropertyTypes/SellRetailShopMain';
import SellShowroomMain from './CommercialPropertyTypes/SellShowroomMain';
import SellOfficeSpaceMain from './CommercialPropertyTypes/SellOfficeSpaceMain';
import SellWarehouseMain from './CommercialPropertyTypes/SellWarehouseMain';
import SellShedMain from './CommercialPropertyTypes/SellShedMain';
import SellCoveredSpaceMain from './CommercialPropertyTypes/SellCoveredSpaceMain';
import SellPlotMain from './CommercialPropertyTypes/SellPlotMain';
import SellAgricultureMain from './CommercialPropertyTypes/SellAgricultureMain';
import SellOthersMain from './CommercialPropertyTypes/SellOthersMain';
import LeaseShopMain from './CommercialPropertyTypes/LeaseShopMain';
import LeaseRetailStoreMain from './CommercialPropertyTypes/LeaseRetailStoreMain';
import LeaseShowroomMain from './CommercialPropertyTypes/LeaseShowroomMain';
import LeaseOfficeSpaceMain from './CommercialPropertyTypes/LeaseOfficeSpaceMain';
import LeaseWarehouseMain from './CommercialPropertyTypes/LeaseWarehouseMain';
import LeaseShedMain from './CommercialPropertyTypes/LeaseShedMain';
import LeaseCoveredSpaceMain from './CommercialPropertyTypes/LeaseCoveredSpaceMain';
import LeasePropertyMain from './CommercialPropertyTypes/LeasePropertyMain';
import LeaseAgricultureMain from './CommercialPropertyTypes/LeaseAgricultureMain';
import LeaseOthersMain from './CommercialPropertyTypes/LeaseOthersMain';
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

interface ResidentialPropertyTypeProps {
  listingType: string;
  selectedType: string | null;
  onSelect: (type: string) => void;
  propertyType: string;
}

const ResidentialPropertyType = ({ listingType, selectedType, onSelect, propertyType }: ResidentialPropertyTypeProps) => {
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

  // Check if we should display specific components
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
          return <Apartment />;
        case 'independent-house':
          return <IndependentHouse />;
        case 'builder-floor':
          return <BuilderFloor />;
        case 'shared-space':
          return <SharedSpace />;
      }
    } else if (listingType === 'Lease') {
      switch (selectedType) {
        case 'apartment':
          return <LeaseApartment />;
        case 'independent-house':
          return <LeaseIndependentHouse />;
        case 'builder-floor':
          return <LeaseBuilderFloor />;
      }
    } else if (listingType === 'Sell') {
      switch (selectedType) {
        case 'apartment':
          return <SellApartment />;
        case 'independent-house':
          return <SellIndependentHouse />;
        case 'builder-floor':
          return <SellBuilderFloor />;
        case 'plot':
          return <SellPlot />;
      }
    }
  }

  if (propertyTypes.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Type</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Select Category</span>
      </div>

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
    </div>
  );
};

export default ResidentialPropertyType;