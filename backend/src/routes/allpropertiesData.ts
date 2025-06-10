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

const router = express.Router();

// Normalizer helper to pick only needed fields
const normalizeProperty = (item: any) => ({
  id: item._id?.toString() || item.propertyId || '',
  title: item.basicInformation?.title || item.title || item.pgDetails?.name || 'Unnamed Property',
  propertyName: item.metadata?.propertyName || '',
  exteriorImage: item.media?.photos.exterior || ''
});

// ✅ Fetch all properties (limited results for each), select only needed fields, normalize before sending response
router.get('/', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      // Commercial Rent
      ICommercialRentAgriculture.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentCoveredSpace.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentOfficeSpace.find().limit(10).select('_id basicInformation.title metadata.propertyName'),
      ICommercialRentOthers.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentRetailStore.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentShed.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentWarehouse.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentPlot.find().limit(10).select('_id basicInformation.title'),
      ICommercialRentShop.find().limit(10).select('_id basicInformation.title'),
      CommercialRentShowroom.find().limit(10).select('_id basicInformation.title'),

      // Commercial Sell
      ICommercialSellAgriculture.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellCoveredSpace.find().limit(10).select('_id basicInformation.title'),
       ICommercialSellOfficeSpace.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellOthers.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellRetailStore.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellShed.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellWarehouse.find().limit(10).select('_id basicInformation.title'),
      ICommercialPlot.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellShop.find().limit(10).select('_id basicInformation.title'),
      ICommercialSellShowroom.find().limit(10).select('_id basicInformation.title'),

      // Commercial Lease
      ICommercialLeaseAgriculture.find().limit(10).select('_id basicInformation.title'),
      ICommercialLeaseOthers.find().limit(10).select('_id basicInformation.title'),
      ICommercialLeaseRetailStore.find().limit(10).select('_id basicInformation.title'),
      ICommercialLeaseShop.find().limit(10).select('_id basicInformation.title'),
      ICommercialLeasePlot.find().limit(10).select('_id basicInformation.title'),
      ICommercialLeaseShowroom.find().limit(10).select('_id basicInformation.title'),
      CommercialLeaseCoveredSpace.find().limit(10).select('_id basicInformation.title'),
      CommercialLeaseOfficeSpace.find().limit(10).select('_id basicInformation.title'),
      CommercialLeaseWarehouse.find().limit(10).select('_id basicInformation.title'),
      CommercialLeaseShed.find().limit(10).select('_id basicInformation.title'),

      // Residential Rent
      IResidentialRentApartment.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      IResidentialRentBuilderFloor.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      IResidentialRentIndependent.find().limit(10).select('_id basicInformation.title media.photos.exterior'),

      // Residential Sale
      IResidentialSaleApartment.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      IResidentialSaleBuilderFloor.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      ISaleIndependentHouse.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      ISalePlot.find().limit(10).select('_id basicInformation.title media.photos.exterior'),

      // Residential Lease
      IResidentialLeaseApartment.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      IResidentialLeaseBuilderFloor.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
      IResidentialLeaseIndependentHouse.find().limit(10).select('_id basicInformation.title media.photos.exterior'),
    ]);

    // Check for any rejected promise
    const failed = results.find(r => r.status === 'rejected');
    if (failed) {
      console.error('Fetch error:', failed.reason);
      return res.status(500).json({
        success: false,
        message: 'Error fetching some property data',
        error: failed.reason
      });
    }

    // Destructure and normalize results
    const [
      rentAgriculture,
      rentCoveredSpace,
      rentOfficeSpace,
      rentOthers,
      rentRetailStore,
      rentShed,
      rentWarehouse,
      rentPlot,
      rentShop,
      rentShowroom,

      sellAgriculture,
      sellCoveredSpace,
      sellOfficeSpace,
      sellOthers,
      sellRetailStore,
      sellShed,
      sellWarehouse,
      sellPlot,
      sellShop,
      sellShowroom,

      leaseAgriculture,
      leaseOthers,
      leaseRetailStore,
      leaseShop,
      leasePlot,
      leaseShowroom,
      leaseCoveredSpace,
      leaseOfficeSpace,
      leaseWarehouse,
      leaseShed,

      resRentApartment,
      resRentBuilderFloor,
      resRentIndependent,

      resSaleApartment,
      resSaleBuilderFloor,
      resSaleIndependentHouse,
      resSalePlot,

      resLeaseApartment,
      resLeaseBuilderFloor,
      resLeaseIndependentHouse
    ] = results.map(r => (r.status === 'fulfilled' ? r.value.map(normalizeProperty) : []));

    return res.status(200).json({
      success: true,
      message: 'All properties fetched successfully',
      data: {
        commercialRent: {
          agriculture: rentAgriculture,
          coveredSpace: rentCoveredSpace,
          officeSpace: rentOfficeSpace,
          others: rentOthers,
          retailStore: rentRetailStore,
          shed: rentShed,
          warehouse: rentWarehouse,
          plot: rentPlot,
          shop: rentShop,
          showroom: rentShowroom
        },
        commercialSale: {
          agriculture: sellAgriculture,
          coveredSpace: sellCoveredSpace,
          officeSpace: sellOfficeSpace,
          others: sellOthers,
          retailStore: sellRetailStore,
          shed: sellShed,
          warehouse: sellWarehouse,
          plot: sellPlot,
          shop: sellShop,
          showroom: sellShowroom
        },
        commercialLease: {
          agriculture: leaseAgriculture,
          others: leaseOthers,
          retailStore: leaseRetailStore,
          shop: leaseShop,
          plot: leasePlot,
          showroom: leaseShowroom,
          coveredSpace: leaseCoveredSpace,
          officeSpace: leaseOfficeSpace,
          warehouse: leaseWarehouse,
          shed: leaseShed
        },
        residentialRent: {
          apartment: resRentApartment,
          builderFloor: resRentBuilderFloor,
          independent: resRentIndependent
        },
        residentialSale: {
          apartment: resSaleApartment,
          builderFloor: resSaleBuilderFloor,
          independentHouse: resSaleIndependentHouse,
          plot: resSalePlot
        },
        residentialLease: {
          apartment: resLeaseApartment,
          builderFloor: resLeaseBuilderFloor,
          independentHouse: resLeaseIndependentHouse
        }
      }
    });
  } catch (err) {
    console.error('Unhandled error in all properties route:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error', error: err });
    }
  }
});

export default router;
