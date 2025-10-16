// File: UpdatePropertyRouter.tsx

import { useParams } from 'react-router-dom';

// ✅ Residential
import Pgmain from './updatedpropertyForms/residentialrent/pg/Pgmain';
import Apartment from './updatedpropertyForms/property-types/Apartment';
import BuilderFloor from './updatedpropertyForms/property-types/BuilderFloor';
import IndependentHouse from './updatedpropertyForms/property-types/IndependentHouse';
import LeaseApartment from './updatedpropertyForms/property-types/LeaseApartment';
import LeaseBuilderFloor from './updatedpropertyForms/property-types/LeaseBuilderFloor';
import LeaseIndependentHouse from './updatedpropertyForms/property-types/LeaseIndependentHouse';
import SellApartment from './updatedpropertyForms/property-types/SellApartment';
import SellBuilderFloor from './updatedpropertyForms/property-types/SellBuilderFloor';
import SellIndependentHouse from './updatedpropertyForms/property-types/SellIndependentHouse';
import SellPlot from './updatedpropertyForms/property-types/SellPlot';
import SharedSpace from './updatedpropertyForms/property-types/SharedSpace';

// ✅ Commercial
import RentOfficeSpace from './updatedpropertyForms/commercialpropertytypes/RentOfficeSpace';
import RentOthers from './updatedpropertyForms/commercialpropertytypes/RentOthers';
import RentPlot from './updatedpropertyForms/commercialpropertytypes/RentPlot';
import RentRetailStoreMain from './updatedpropertyForms/commercialpropertytypes/RentRetailStoreMain';
import RentShed from './updatedpropertyForms/commercialpropertytypes/RentShed';
import RentShopMain from './updatedpropertyForms/commercialpropertytypes/RentShopMain';
import RentShowroomMain from './updatedpropertyForms/commercialpropertytypes/RentShowroomMain';
import RentWarehouse from './updatedpropertyForms/commercialpropertytypes/RentWarehouse';
import SellAgricultureMain from './updatedpropertyForms/commercialpropertytypes/SellAgricultureMain';
import SellCoveredSpaceMain from './updatedpropertyForms/commercialpropertytypes/SellCoveredSpaceMain';
import SellOfficeSpaceMain from './updatedpropertyForms/commercialpropertytypes/SellOfficeSpaceMain';
import SellOthersMain from './updatedpropertyForms/commercialpropertytypes/SellOthersMain';
import SellPlotMain from './updatedpropertyForms/commercialpropertytypes/SellPlotMain';
import SellRetailShopMain from './updatedpropertyForms/commercialpropertytypes/SellRetailShopMain';
import SellShedMain from './updatedpropertyForms/commercialpropertytypes/SellShedMain';
import SellShopMain from './updatedpropertyForms/commercialpropertytypes/SellShopMain';
import SellShowroomMain from './updatedpropertyForms/commercialpropertytypes/SellShowroomMain';
import SellWarehouseMain from './updatedpropertyForms/commercialpropertytypes/SellWarehouseMain';
import LeaseAgricultureMain from './updatedpropertyForms/commercialpropertytypes/LeaseAgricultureMain';
import LeaseCoveredSpaceMain from './updatedpropertyForms/commercialpropertytypes/LeaseCoveredSpaceMain';
import LeaseOfficeSpaceMain from './updatedpropertyForms/commercialpropertytypes/LeaseOfficeSpaceMain';
import LeaseOthersMain from './updatedpropertyForms/commercialpropertytypes/LeaseOthersMain';
import LeasePlotMain from './updatedpropertyForms/commercialpropertytypes/LeasePlotMain';
import LeaseRetailStoreMain from './updatedpropertyForms/commercialpropertytypes/LeaseRetailStoreMain';
import LeaseShedMain from './updatedpropertyForms/commercialpropertytypes/LeaseShedMain';
import LeaseShopMain from './updatedpropertyForms/commercialpropertytypes/LeaseShopMain';
import LeaseShowroomMain from './updatedpropertyForms/commercialpropertytypes/LeaseShowroomMain';
import LeaseWarehouseMain from './updatedpropertyForms/commercialpropertytypes/LeaseWarehouseMain';

const UpdatePropertyRouter = () => {
  const { propertyId } = useParams();
  if (!propertyId) return <div>Invalid Property ID</div>;

  const match = propertyId.match(/^RA-([A-Z]{3})([A-Z]{2})([A-Z]{2})\d+$/);
  if (!match) return <div>Invalid Property ID Format</div>;

  let [, category, listingType, propertyType] = match;

  // Normalize listingType to match routeKey definitions (SA for SE)
  if (listingType === 'SE') listingType = 'SA';

  const routeKey = `${category}-${listingType}-${propertyType}`;

  switch (routeKey) {
    // ✅ Residential PG
    case 'RES-LE-PG': return <Pgmain />;

    // ✅ Commercial Rent
    case 'COM-RE-OS': return <RentOfficeSpace />;
    case 'COM-RE-OT': return <RentOthers />;
    case 'COM-RE-PL': return <RentPlot />;
    case 'COM-RE-RS': return <RentRetailStoreMain />;
    case 'COM-RE-SD': return <RentShed />;
    case 'COM-RE-SH': return <RentShopMain />;
    case 'COM-RE-SR': return <RentShowroomMain />;
    case 'COM-RE-WH': return <RentWarehouse />;

    // ✅ Commercial Sell
    case 'COM-SA-AG': return <SellAgricultureMain />;
    case 'COM-SA-CS': return <SellCoveredSpaceMain />;
    case 'COM-SA-OS': return <SellOfficeSpaceMain />;
    case 'COM-SA-OT': return <SellOthersMain />;
    case 'COM-SA-PL': return <SellPlotMain />;
    case 'COM-SA-RS': return <SellRetailShopMain />;
    case 'COM-SA-SD': return <SellShedMain />;
    case 'COM-SA-SH': return <SellShopMain />;
    case 'COM-SA-SR': return <SellShowroomMain />;
    case 'COM-SA-WH': return <SellWarehouseMain />;

    // ✅ Commercial Lease
    case 'COM-LE-AG': return <LeaseAgricultureMain />;
    case 'COM-LE-CS': return <LeaseCoveredSpaceMain />;
    case 'COM-LE-OS': return <LeaseOfficeSpaceMain />;
    case 'COM-LE-OT': return <LeaseOthersMain />;
    case 'COM-LE-PL': return <LeasePlotMain />;
    case 'COM-LE-RS': return <LeaseRetailStoreMain />;
    case 'COM-LE-SD': return <LeaseShedMain />;
    case 'COM-LE-SH': return <LeaseShopMain />;
    case 'COM-LE-SR': return <LeaseShowroomMain />;
    case 'COM-LE-WH': return <LeaseWarehouseMain />;

    // ✅ Residential Rent
    case 'RES-RE-AP': return <Apartment />;
    case 'RES-RE-BF': return <BuilderFloor />;
    case 'RES-RE-IH': return <IndependentHouse />;
    case 'RES-RE-SS': return <SharedSpace />;

    // ✅ Residential Lease
    case 'RES-LE-AP': return <LeaseApartment />;
    case 'RES-LE-BF': return <LeaseBuilderFloor />;
    case 'RES-LE-IH': return <LeaseIndependentHouse />;

    // ✅ Residential Sale
    case 'RES-SA-AP': return <SellApartment />;
    case 'RES-SA-BF': return <SellBuilderFloor />;
    case 'RES-SA-IH': return <SellIndependentHouse />;
    case 'RES-SA-PL': return <SellPlot />;

    default:
      return <div>No update form defined for: {routeKey}</div>;
  }
};


export default UpdatePropertyRouter;


