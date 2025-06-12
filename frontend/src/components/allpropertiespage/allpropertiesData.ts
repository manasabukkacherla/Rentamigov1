
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
//   type:item.metadata?.propertyType || '',
//   propertyName: item.metadata?.propertyName || '',
//   // location:item.basicInformation?.address.location || '',
//   area:item.propertySize || '',
//   bathrooms:item.propertyDetails?.washrooms || item.propertyDetails?.bathrooms || 0,
//   bedrooms:item.propertyDetails?.bedrooms || 0,
//   exteriorImage: item.media?.photos.exterior || '',
// });

// // const router = express.Router();

// const getAllProperties = async () => {
//   try {
//     const results = await Promise.allSettled([
//       // Commercial Rent
//       ICommercialRentAgriculture.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentCoveredSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentOfficeSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentOthers.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentRetailStore.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentShed.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentWarehouse.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentPlot.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialRentShop.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialRentShowroom.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Commercial Sell
//       ICommercialSellAgriculture.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellCoveredSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//        ICommercialSellOfficeSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellOthers.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellRetailStore.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShed.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellWarehouse.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialPlot.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShop.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialSellShowroom.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Commercial Lease
//       ICommercialLeaseAgriculture.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseOthers.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseRetailStore.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseShop.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeasePlot.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ICommercialLeaseShowroom.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseCoveredSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseOfficeSpace.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseWarehouse.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       CommercialLeaseShed.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Rent
//       IResidentialRentApartment.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialRentBuilderFloor.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialRentIndependent.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Sale
//       IResidentialSaleApartment.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialSaleBuilderFloor.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ISaleIndependentHouse.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       ISalePlot.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),

//       // Residential Lease
//       IResidentialLeaseApartment.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialLeaseBuilderFloor.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
//       IResidentialLeaseIndependentHouse.find().limit(10).select('_id basicInformation.title metadata.propertyType metadata.propertyName propertySize propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'),
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

// // export default router;
