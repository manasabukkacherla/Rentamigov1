// import express from 'express';

// // Commercial Rent Models
// import ICommercialRentAgriculture from '../../../../backend/src/models/commercial/CommercialRentAgriculture';
// import ICommercialRentCoveredSpace from '../../../../backend/src/models/commercial/CommercialRentCoveredSpace';
// import ICommercialRentOfficeSpace from '../../../../backend/src/models/commercial/CommercialRentOfficeSpace';
// import ICommercialRentOthers from '../../../../backend/src/models/commercial/CommercialRentOthers';
// import ICommercialRentRetailStore from '../../../../backend/src/models/commercial/CommercialRentRetailStore';
// import ICommercialRentShed from '../../../../backend/src/models/commercial/CommercialRentShed';
// import ICommercialRentWarehouse from '../../../../backend/src/models/commercial/CommercialRentWarehouse';
// import ICommercialRentPlot from '../../../../backend/src/models/commercial/commercialRentPlot';
// import ICommercialRentShop from '../../../../backend/src/models/commercial/commercialrentshop';
// import { CommercialRentShowroom } from '../../../../backend/src/models/commercial/commercialRentShowroom';

// // Commercial Sell Models
// import ICommercialSellAgriculture from '../../../../backend/src/models/commercial/CommercialSellAgriculture';
// import ICommercialSellCoveredSpace from '../../../../backend/src/models/commercial/CommercialSellCoveredSpace';
// import ICommercialSellOfficeSpace from '../../../../backend/src/models/commercial/CommercialSellOfficeSpace';
// import ICommercialSellOthers from '../../../../backend/src/models/commercial/CommercialSellOthers';
// import ICommercialSellRetailStore from '../../../../backend/src/models/commercial/CommercialSellRetailStore';
// import ICommercialSellShed from '../../../../backend/src/models/commercial/CommercialSellShed';
// import ICommercialSellWarehouse from '../../../../backend/src/models/commercial/CommercialSellWarehouse';
// import ICommercialPlot from '../../../../backend/src/models/commercial/commercialsellplot';
// import ICommercialSellShowroom from '../../../../backend/src/models/commercial/CommercialsellShowroom';
// import ICommercialSellShop from '../../../../backend/src/models/commercial/CommercialsellShop';

// // Commercial Lease Models
// import ICommercialLeaseAgriculture from '../../../../backend/src/models/commercial/CommercialLeaseAgriculture';
// import ICommercialLeaseOthers from '../../../../backend/src/models/commercial/CommercialLeaseOthers';
// import ICommercialLeaseRetailStore from '../../../../backend/src/models/commercial/CommercialLeaseRetail';
// import ICommercialLeaseShop from '../../../../backend/src/models/commercial/CommercialLeaseShop';
// import ICommercialLeasePlot from '../../../../backend/src/models/commercial/commercialLeasePlot';
// import ICommercialLeaseShowroom from '../../../../backend/src/models/commercial/CommercialLeaseShowroom';
// import CommercialLeaseCoveredSpace from '../../../../backend/src/models/commercial/CommercialLeaseCoveredSpace';
// import CommercialLeaseOfficeSpace from '../../../../backend/src/models/commercial/CommercialLeaseOfficeSpace';
// import CommercialLeaseWarehouse from '../../../../backend/src/models/commercial/CommercialLeaseWarehouse';
// import { CommercialLeaseShed } from '../../../../backend/src/models/commercial/CommercialLeaseShed';

// // Residential Rent Models
// import IResidentialRentApartment from '../../../../backend/src/models/residential/residentialRentApartment';
// import IResidentialRentBuilderFloor from '../../../../backend/src/models/residential/residentialRentBuilderFloor';
// import IResidentialRentIndependent from '../../../../backend/src/models/residential/residentialRentIndependent';

// // Residential Sale Models
// import IResidentialSaleApartment from '../../../../backend/src/models/residential/residentialSaleApartment';
// import IResidentialSaleBuilderFloor from '../../../../backend/src/models/residential/residentialSaleBuilderFloor';
// import ISaleIndependentHouse from '../../../../backend/src/models/residential/saleIndependentHouse';
// import ISalePlot from '../../../../backend/src/models/residential/salePlot';

// // Residential Lease Models
// import IResidentialLeaseApartment from '../../../../backend/src/models/residential/residentialLeaseAppartment';
// import IResidentialLeaseBuilderFloor from '../../../../backend/src/models/residential/residentialLeaseBuilderFloor';
// import IResidentialLeaseIndependentHouse from '../../../../backend/src/models/residential/residentialLeaseIndependentHouse';

// // Normalizer helper to pick only needed fields
// const normalizeProperty = (item: any) => ({
//   id: item._id?.toString() || item.propertyId || '',
//   title: item.basicInformation?.title || item.basicInformation?.propertyName || item.pgDetails?.name || 'Unnamed Property',
//   type: item.metadata?.propertyType || '',
//   propertyName: item.metadata?.propertyName || '',
//   area: item.propertySize || '',
//   bathrooms: item.propertyDetails?.washrooms || item.propertyDetails?.bathrooms || 0,
//   bedrooms: item.propertyDetails?.bedrooms || 0,
//   exteriorImage: item.media?.photos.exterior || '',
// });

// const router = express.Router();

// router.get('/all', async (req: any, res: any) => {
//   const { page = 1, limit = 10 } = req.query; // Pagination params
//   const skip = (page - 1) * limit;

//   try {
//     const results = await Promise.allSettled([
//       // Commercial Rent
//       ICommercialRentAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentPlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialRentShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Commercial Sell
//       ICommercialSellAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialPlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Commercial Lease
//       ICommercialLeaseAgriculture.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseOthers.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseRetailStore.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseShop.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeasePlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseShowroom.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseCoveredSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseOfficeSpace.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseWarehouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseShed.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Rent
//       IResidentialRentApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialRentBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialRentIndependent.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Sale
//       IResidentialSaleApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialSaleBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ISaleIndependentHouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ISalePlot.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Lease
//       IResidentialLeaseApartment.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialLeaseBuilderFloor.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialLeaseIndependentHouse.find().skip(skip).limit(limit).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//     ]);

//     // Check for any rejected promise
//     const failed = results.find(r => r.status === 'rejected');
//     if (failed) {
//       console.error('Fetch error:', failed.reason);
//       return res.status(500).json({
//         success: false,
//         message: 'Error fetching some property data',
//         error: failed.reason
//       });
//     }

//     // Destructure and normalize results
//     const [
//       rentAgriculture,
//       rentCoveredSpace,
//       rentOfficeSpace,
//       rentOthers,
//       rentRetailStore,
//       rentShed,
//       rentWarehouse,
//       rentPlot,
//       rentShop,
//       rentShowroom,

//       sellAgriculture,
//       sellCoveredSpace,
//       sellOfficeSpace,
//       sellOthers,
//       sellRetailStore,
//       sellShed,
//       sellWarehouse,
//       sellPlot,
//       sellShop,
//       sellShowroom,

//       leaseAgriculture,
//       leaseOthers,
//       leaseRetailStore,
//       leaseShop,
//       leasePlot,
//       leaseShowroom,
//       leaseCoveredSpace,
//       leaseOfficeSpace,
//       leaseWarehouse,
//       leaseShed,

//       resRentApartment,
//       resRentBuilderFloor,
//       resRentIndependent,

//       resSaleApartment,
//       resSaleBuilderFloor,
//       resSaleIndependentHouse,
//       resSalePlot,

//       resLeaseApartment,
//       resLeaseBuilderFloor,
//       resLeaseIndependentHouse
//     ] = results.map(r => (r.status === 'fulfilled' ? r.value.map(normalizeProperty) : []));

//     return res.status(200).json({
//       success: true,
//       message: 'All properties fetched successfully',
//       data: {
//         commercialRent: {
//           agriculture: rentAgriculture,
//           coveredSpace: rentCoveredSpace,
//           officeSpace: rentOfficeSpace,
//           others: rentOthers,
//           retailStore: rentRetailStore,
//           shed: rentShed,
//           warehouse: rentWarehouse,
//           plot: rentPlot,
//           shop: rentShop,
//           showroom: rentShowroom
//         },
//         commercialSale: {
//           agriculture: sellAgriculture,
//           coveredSpace: sellCoveredSpace,
//           officeSpace: sellOfficeSpace,
//           others: sellOthers,
//           retailStore: sellRetailStore,
//           shed: sellShed,
//           warehouse: sellWarehouse,
//           plot: sellPlot,
//           shop: sellShop,
//           showroom: sellShowroom
//         },
//         commercialLease: {
//           agriculture: leaseAgriculture,
//           others: leaseOthers,
//           retailStore: leaseRetailStore,
//           shop: leaseShop,
//           plot: leasePlot,
//           showroom: leaseShowroom,
//           coveredSpace: leaseCoveredSpace,
//           officeSpace: leaseOfficeSpace,
//           warehouse: leaseWarehouse,
//           shed: leaseShed
//         },
//         residentialRent: {
//           apartment: resRentApartment,
//           builderFloor: resRentBuilderFloor,
//           independent: resRentIndependent
//         },
//         residentialSale: {
//           apartment: resSaleApartment,
//           builderFloor: resSaleBuilderFloor,
//           independentHouse: resSaleIndependentHouse,
//           plot: resSalePlot
//         },
//         residentialLease: {
//           apartment: resLeaseApartment,
//           builderFloor: resLeaseBuilderFloor,
//           independentHouse: resLeaseIndependentHouse
//         }
//       }
//     });
//   } catch (err) {
//     console.error('Unhandled error in all properties route:', err);
//     if (!res.headersSent) {
//       res.status(500).json({ success: false, message: 'Server error', error: err });
//     }
//   }
// });

// export default router;
