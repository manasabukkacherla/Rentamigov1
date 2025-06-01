import express from 'express';

// Commercial Rent Models
import ICommercialRentAgriculture from '../models/commercial/CommercialRentAgriculture';
import ICommercialRentCoveredSpace from '../models/commercial/CommercialRentCoveredSpace';
import ICommercialRentOfficeSpace from '../models/commercial/CommercialRentOfficeSpace';
import ICommercialRentOthers from '../models/commercial/CommercialRentOthers';
import ICommercialRentRetailStore from '../models/commercial/CommercialRentRetailStore';
import ICommercialRentShed from '../models/commercial/CommercialRentShed';
import ICommercialRentWarehouse from '../models/commercial/CommercialRentWarehouse';
import ICommercialRentPlot from '../models/commercial/commercialRentPlot';
import ICommercialRentShop from '../models/commercial/commercialrentshop';
import { CommercialRentShowroom } from '../models/commercial/commercialRentShowroom';


// Commercial Sell Models
import ICommercialSellAgriculture from '../models/commercial/CommercialSellAgriculture';
import ICommercialSellCoveredSpace from '../models/commercial/CommercialSellCoveredSpace';
import ICommercialSellOfficeSpace from '../models/commercial/CommercialSellOfficeSpace';
import ICommercialSellOthers from '../models/commercial/CommercialSellOthers';
import ICommercialSellRetailStore from '../models/commercial/CommercialSellRetailStore';
import ICommercialSellShed from '../models/commercial/CommercialSellShed';
import ICommercialSellWarehouse from '../models/commercial/CommercialSellWarehouse';
import ICommercialPlot from '../models/commercial/commercialsellplot';
import ICommercialSellShowroom from '../models/commercial/CommercialsellShowroom';
import ICommercialSellShop from '../models/commercial/CommercialsellShop';

// Commercial Lease Models
import ICommercialLeaseAgriculture from '../models/commercial/CommercialLeaseAgriculture';
import ICommercialLeaseOthers from '../models/commercial/CommercialLeaseOthers';
import ICommercialLeaseRetailStore from '../models/commercial/CommercialLeaseRetail';
import ICommercialLeaseShop from '../models/commercial/CommercialLeaseShop';
import ICommercialLeasePlot from '../models/commercial/commercialLeasePlot';
import ICommercialLeaseShowroom from '../models/commercial/CommercialLeaseShowroom';
import CommercialLeaseCoveredSpace from '../models/commercial/CommercialLeaseCoveredSpace';
import CommercialLeaseOfficeSpace from '../models/commercial/CommercialLeaseOfficeSpace';
import CommercialLeaseWarehouse from '../models/commercial/CommercialLeaseWarehouse';
import { CommercialLeaseShed } from '../models/commercial/CommercialLeaseShed';



// Residential Rent Models
import IResidentialRentApartment from '../models/residential/residentialRentApartment';
import IResidentialRentBuilderFloor from '../models/residential/residentialRentBuilderFloor';
import IResidentialRentIndependent from '../models/residential/residentialRentIndependent';
// Residential Sale Models
import IResidentialSaleApartment from '../models/residential/residentialSaleApartment';
import IResidentialSaleBuilderFloor from '../models/residential/residentialSaleBuilderFloor';
import ISaleIndependentHouse from '../models/residential/saleIndependentHouse';
import ISalePlot from '../models/residential/salePlot';
// Residential Lease Models
import IResidentialLeaseApartment from '../models/residential/residentialLeaseAppartment';
import IResidentialLeaseBuilderFloor from '../models/residential/residentialLeaseBuilderFloor';
import IResidentialLeaseIndependentHouse from '../models/residential/residentialLeaseIndependentHouse';
import { error } from 'console';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    // Commercial Rent Properties
    const commercialRentProperties = {
      agriculture: await ICommercialRentAgriculture.find().limit(10),
      coveredSpace: await ICommercialRentCoveredSpace.find().limit(10),
      officeSpace: await ICommercialRentOfficeSpace.find().limit(10),
      others: await ICommercialRentOthers.find().limit(10),
      retailStore: await ICommercialRentRetailStore.find().limit(10),
      shed: await ICommercialRentShed.find().limit(10),
      warehouse: await ICommercialRentWarehouse.find().limit(10),
      plot: await ICommercialRentPlot.find().limit(10),
      shop: await ICommercialRentShop.find().limit(10),
      showroom: await CommercialRentShowroom.find().limit(10)
    };

    // Residential Rent Properties
    const residentialRentProperties = {
      apartment: await IResidentialRentApartment.find().limit(10),
      builderFloor: await IResidentialRentBuilderFloor.find().limit(10),
      independent: await IResidentialRentIndependent.find().limit(10)
    };

    // Commercial Sale Properties
    const commercialSaleProperties = {
      agriculture: await ICommercialSellAgriculture.find().limit(10),
      coveredSpace: await ICommercialSellCoveredSpace.find().limit(10),
      officeSpace: await ICommercialSellOfficeSpace.find().limit(10),
      others: await ICommercialSellOthers.find().limit(10),
      retailStore: await ICommercialSellRetailStore.find().limit(10),
      shed: await ICommercialSellShed.find().limit(10),
      warehouse: await ICommercialSellWarehouse.find().limit(10),
      plot: await ICommercialPlot.find().limit(10),
      shop: await ICommercialSellShop.find().limit(10),
      showroom: await ICommercialSellShowroom.find().limit(10)
    };

    // Residential Sale Properties
    const residentialSaleProperties = {
      apartment: await IResidentialSaleApartment.find().limit(10),
      builderFloor: await IResidentialSaleBuilderFloor.find().limit(10),
      independentHouse: await ISaleIndependentHouse.find().limit(10),
      plot: await ISalePlot.find().limit(10)
    };

    // Commercial Lease Properties
    const commercialLeaseProperties = {
      agriculture: await ICommercialLeaseAgriculture.find().limit(10),
      others: await ICommercialLeaseOthers.find().limit(10),
      retailStore: await ICommercialLeaseRetailStore.find().limit(10),
      shop: await ICommercialLeaseShop.find().limit(10),
      showroom: await ICommercialLeaseShowroom.find().limit(10),
      coveredSpace: await CommercialLeaseCoveredSpace.find().limit(10),
      officeSpace: await CommercialLeaseOfficeSpace.find().limit(10),
      warehouse: await CommercialLeaseWarehouse.find().limit(10),
      plot: await ICommercialLeasePlot.find().limit(10),
      shed: await CommercialLeaseShed.find().limit(10)
    };

    // Residential Lease Properties
    const residentialLeaseProperties = {
      apartment: await IResidentialLeaseApartment.find().limit(10),
      builderFloor: await IResidentialLeaseBuilderFloor.find().limit(10),
      independentHouse: await IResidentialLeaseIndependentHouse.find().limit(10)
    };

    res.status(200).json({
      success: true,
      message: 'All properties fetched successfully',
      data: {
      commercialRent: commercialRentProperties,
      residentialRent: residentialRentProperties,
      commercialSale: commercialSaleProperties,
      residentialSale: residentialSaleProperties,
      commercialLease: commercialLeaseProperties,
      residentialLease: residentialLeaseProperties
    }
  });
  } catch (error:any) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
