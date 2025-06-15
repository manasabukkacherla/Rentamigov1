import express from 'express';
// Commercial Rent Models
import CommercialRentAgriculture from '../models/commercial/CommercialRentAgriculture';
import CommercialRentCoveredSpace from '../models/commercial/CommercialRentCoveredSpace';
import CommercialRentOfficeSpace from '../models/commercial/CommercialRentOfficeSpace';
import CommercialRentOthers from '../models/commercial/CommercialRentOthers';
import CommercialRentRetailStore from '../models/commercial/CommercialRentRetailStore';
import CommercialRentShed from '../models/commercial/CommercialRentShed';
import CommercialRentWarehouse from '../models/commercial/CommercialRentWarehouse';
import CommercialRentPlot from '../models/commercial/commercialRentPlot';
import CommercialRentShop from '../models/commercial/commercialrentshop';
import { CommercialRentShowroom } from '../models/commercial/commercialRentShowroom';

// Commercial Sell Models
import CommercialSellAgriculture from '../models/commercial/CommercialSellAgriculture';
import CommercialSellCoveredSpace from '../models/commercial/CommercialSellCoveredSpace';
import CommercialSellOfficeSpace from '../models/commercial/CommercialSellOfficeSpace';
import CommercialSellOthers from '../models/commercial/CommercialSellOthers';
import CommercialSellRetailStore from '../models/commercial/CommercialSellRetailStore';
import CommercialSellShed from '../models/commercial/CommercialSellShed';
import CommercialSellWarehouse from '../models/commercial/CommercialSellWarehouse';
import CommercialPlot from '../models/commercial/commercialsellplot';
import CommercialSellShowroom from '../models/commercial/CommercialsellShowroom';
import CommercialSellShop from '../models/commercial/CommercialsellShop';

// Commercial Lease Models
import CommercialLeaseAgriculture from '../models/commercial/CommercialLeaseAgriculture';
import CommercialLeaseOthers from '../models/commercial/CommercialLeaseOthers';
import CommercialLeaseRetailStore from '../models/commercial/CommercialLeaseRetail';
import CommercialLeaseShop from '../models/commercial/CommercialLeaseShop';
import CommercialLeasePlot from '../models/commercial/commercialLeasePlot';
import CommercialLeaseShowroom from '../models/commercial/CommercialLeaseShowroom';
import CommercialLeaseCoveredSpace from '../models/commercial/CommercialLeaseCoveredSpace';
import CommercialLeaseOfficeSpace from '../models/commercial/CommercialLeaseOfficeSpace';
import CommercialLeaseWarehouse from '../models/commercial/CommercialLeaseWarehouse';
import { CommercialLeaseShed } from '../models/commercial/CommercialLeaseShed';

// Residential Rent Models
import ResidentialRentApartment from '../models/residential/residentialRentApartment';
import ResidentialRentBuilderFloor from '../models/residential/residentialRentBuilderFloor';
import ResidentialRentIndependent from '../models/residential/residentialRentIndependent';

// Residential Sale Models
import ResidentialSaleApartment from '../models/residential/residentialSaleApartment';
import ResidentialSaleBuilderFloor from '../models/residential/residentialSaleBuilderFloor';
import SaleIndependentHouse from '../models/residential/saleIndependentHouse';
import SalePlot from '../models/residential/salePlot';

// Residential Lease Models
import ResidentialLeaseApartment from '../models/residential/residentialLeaseAppartment';
import ResidentialLeaseBuilderFloor from '../models/residential/residentialLeaseBuilderFloor';
import ResidentialLeaseIndependentHouse from '../models/residential/residentialLeaseIndependentHouse';

// Normalizer helper to pick only needed fields
const normalizeProperty = (item: any) => ({
  id: item._id?.toString() || item.propertyId || '',
  title: item.basicInformation?.title || item.basicInformation?.propertyName || item.pgDetails?.name || 'Unnamed Property',
  type: item.metadata?.propertyType || '',
  propertyName: item.metadata?.propertyName || '',
  area: item.propertySize || item.propertyDetails.area.totalArea || 0,
  bathrooms: item.propertyDetails?.washrooms || item.propertyDetails?.bathrooms || 0,
  bedrooms: item.propertyDetails?.bedrooms || 0,
  exteriorImage: item.media?.photos.exterior || '',
});

const router = express.Router();

router.get('/all', async (req: any, res: any) => {
  const { page = 1, limit = 10 } = req.query; // Pagination params
  const skip = (page - 1) * limit;

  try {
    const results = await Promise.allSettled([
      // Commercial Rent
      CommercialRentAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName item.propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentPlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialRentShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

      // Commercial Sell
      CommercialSellAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialPlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialSellShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

      // Commercial Lease
      CommercialLeaseAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeasePlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      CommercialLeaseWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

      // Residential Rent
      ResidentialRentApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      ResidentialRentBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      ResidentialRentIndependent.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

      // Residential Sale
      ResidentialSaleApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      ResidentialSaleBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      SaleIndependentHouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      SalePlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

      // Residential Lease
      ResidentialLeaseApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      ResidentialLeaseBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
      ResidentialLeaseIndependentHouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
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
