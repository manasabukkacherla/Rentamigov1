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
  id: item._id || item.propertyId || '',
  propertyId: item.propertyId || '',
  title: item.basicInformation?.title || item.title || item.pgDetails?.name || item.basicInformation?.propertyName,
  location: item.basicInformation?.address?.city && item.basicInformation?.address?.state ? `${item.basicInformation?.address?.city || ''}, ${item.basicInformation?.address?.state || ''}` :
    item.pgDetails?.address ||
    `${item.basicInformation?.address || ''}, ${item.basicInformation?.state || ''},${item.basicInformation?.city || ''}`,
  propertyName: item.metadata?.propertyName || item.metaData?.propertyName || '',
  type: item.metadata?.propertyType || item.metaData?.propertyType || '',
  listingType: 'Owner',
  price: item.rent?.expectedRent || item.rentalTerms?.rentDetails?.expectedRent || 
  item.rentalDetails?.expectedRent || item.pricingDetails?.propertyPrice || item.priceDetails?.propertyPrice || 
  item.price?.expectedPrice || item.leaseTerms?.leaseDetails?.leaseAmount?.amount || item.leaseAmount?.amount
   || item.leaseTerms?.leaseTerms?.leaseDetails?.leaseAmount?.amount || item.leaseTerms?.leaseAmount?.amount || 0,
  area: item.propertyDetails?.area?.totalArea || item.propertyDetails?.area?.totalArea || item.propertySize || item.propertyDetails?.totalArea ||
    item.propertyDetails?.builtUpAreaSqft || item.propertyDetails?.superBuiltUpAreaSqft ||
    item.Agriculturelanddetails?.totalArea || item.propertySize || item.propertyDetails?.builtUpAreaSqft ||
    item.propertyDetails?.superBuiltUpAreaSqft || item.plotDetails?.totalPlotArea || item.plotDetails?.totalArea || 0,
  image: item.media?.photos?.exterior?.[0] || item.media?.photos?.plot?.[0] || item.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
  postedDate: item.metadata?.createdAt instanceof Date ? item.metadata.createdAt.toISOString().slice(0, 10) : '',
  status: (item.metadata?.status || item.metaData?.status || 'Available'),
  intent: item.metadata?.intent || item.metaData?.intent || '',
  furnishing: item.propertyDetails?.furnishingStatus || 'Unfurnished',
  // userId: item.metadata?.createdBy || item.metaData?.createdBy || '',
  createdBy: item.metadata?.createdBy || item.metaData?.createdBy || '',
});

const router = express.Router();

router.get('/all', async (req: any, res: any) => {
  // const { page = 1, limit = 10 } = req.query; // Pagination params
  // const skip = (page - 1) * limit;

  try {
    // const filter='_id basicInformation.title metadata.propertyType metadata.propertyName propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'
    const results = await Promise.allSettled([
      // Commercial Rent
      CommercialRentAgriculture.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rent.expectedRent Agriculturelanddetails.totalArea media.photos.exterior metaData.createdAt availability.type metaData.intent propertyDetails.furnishingStatus'),
      CommercialRentCoveredSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentOfficeSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentOthers.find().select('_id propertyId basicInformation.title basicInformation.address metaData.createdBy metaData.propertyName metaData.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metaData.createdAt metadata.status metaData.intent propertyDetails.furnishingStatus'),
      CommercialRentRetailStore.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentShed.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.propertySize media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentWarehouse.find().select('_id propertyId basicInformation.title basicInformation.propertyName basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.intent rentalTerms.rentDetails.expectedRent availability.type propertyDetails.furnishingStatus propertyDetails.bathrooms propertyDetails.area.totalArea media.photos.exterior'),
      CommercialRentPlot.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentShop.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialRentShowroom.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),

      // Commercial Sell
      CommercialSellAgriculture.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType price.expectedPrice Agriculturelanddetails.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellCoveredSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellOfficeSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellOthers.find().select('_id propertyId basicInformation.title basicInformation.address metaData.createdBy metaData.propertyName metaData.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metaData.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellRetailStore.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType priceDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellShed.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellWarehouse.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialPlot.find().select('_id propertyId basicInformation.title basicInformation.address basicInformation.city basicInformation.state  metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice plotDetails.totalArea media.photos.plot metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellShop.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
      CommercialSellShowroom.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),

      // // Commercial Lease
      CommercialLeaseAgriculture.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount Agriculturelanddetails.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseOthers.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseRetailStore.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseShop.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeasePlot.find().select('_id propertyId plotDetails.totalPlotArea basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseShowroom.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseCoveredSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseOfficeSpace.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseShed.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
      CommercialLeaseWarehouse.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),


      // Residential Rent
      ResidentialRentApartment.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
      ResidentialRentBuilderFloor.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
      ResidentialRentIndependent.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),

      ResidentialSaleApartment.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft priceDetails.propertyPrice media.photos.exterior propertyDetails.furnishingStatus'),
      ResidentialSaleBuilderFloor.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
      SaleIndependentHouse.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft priceDetails.propertyPrice media.photos.exterior propertyDetails.furnishingStatus'),
      SalePlot.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),

      ResidentialLeaseApartment.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft leaseTerms.leaseDetails.leaseAmount.amount media.photos.exterior propertyDetails.furnishingStatus'),
      ResidentialLeaseBuilderFloor.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
      ResidentialLeaseIndependentHouse.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus')
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
      // rentAgriculture,
      rentCoveredSpace,
      rentOfficeSpace,
      rentOthers,
      rentRetailStore,
      rentShed,
      rentWarehouse,
      rentPlot,
      rentShop,
      rentShowroom,

      // sellAgriculture,
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
          // agriculture: rentAgriculture,
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
          // agriculture: sellAgriculture,
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