"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Commercial Rent Models
const CommercialRentAgriculture_1 = __importDefault(require("../models/commercial/CommercialRentAgriculture"));
const CommercialRentCoveredSpace_1 = __importDefault(require("../models/commercial/CommercialRentCoveredSpace"));
const CommercialRentOfficeSpace_1 = __importDefault(require("../models/commercial/CommercialRentOfficeSpace"));
const CommercialRentOthers_1 = __importDefault(require("../models/commercial/CommercialRentOthers"));
const CommercialRentRetailStore_1 = __importDefault(require("../models/commercial/CommercialRentRetailStore"));
const CommercialRentShed_1 = __importDefault(require("../models/commercial/CommercialRentShed"));
const CommercialRentWarehouse_1 = __importDefault(require("../models/commercial/CommercialRentWarehouse"));
const commercialRentPlot_1 = __importDefault(require("../models/commercial/commercialRentPlot"));
const commercialrentshop_1 = __importDefault(require("../models/commercial/commercialrentshop"));
const commercialRentShowroom_1 = require("../models/commercial/commercialRentShowroom");
// Commercial Sell Models
const CommercialSellAgriculture_1 = __importDefault(require("../models/commercial/CommercialSellAgriculture"));
const CommercialSellCoveredSpace_1 = __importDefault(require("../models/commercial/CommercialSellCoveredSpace"));
const CommercialSellOfficeSpace_1 = __importDefault(require("../models/commercial/CommercialSellOfficeSpace"));
const CommercialSellOthers_1 = __importDefault(require("../models/commercial/CommercialSellOthers"));
const CommercialSellRetailStore_1 = __importDefault(require("../models/commercial/CommercialSellRetailStore"));
const CommercialSellShed_1 = __importDefault(require("../models/commercial/CommercialSellShed"));
const CommercialSellWarehouse_1 = __importDefault(require("../models/commercial/CommercialSellWarehouse"));
const commercialsellplot_1 = __importDefault(require("../models/commercial/commercialsellplot"));
const CommercialsellShowroom_1 = __importDefault(require("../models/commercial/CommercialsellShowroom"));
const CommercialsellShop_1 = __importDefault(require("../models/commercial/CommercialsellShop"));
// Commercial Lease Models
const CommercialLeaseAgriculture_1 = __importDefault(require("../models/commercial/CommercialLeaseAgriculture"));
const CommercialLeaseOthers_1 = __importDefault(require("../models/commercial/CommercialLeaseOthers"));
const CommercialLeaseRetail_1 = __importDefault(require("../models/commercial/CommercialLeaseRetail"));
const CommercialLeaseShop_1 = __importDefault(require("../models/commercial/CommercialLeaseShop"));
const commercialLeasePlot_1 = __importDefault(require("../models/commercial/commercialLeasePlot"));
const CommercialLeaseShowroom_1 = __importDefault(require("../models/commercial/CommercialLeaseShowroom"));
const CommercialLeaseCoveredSpace_1 = __importDefault(require("../models/commercial/CommercialLeaseCoveredSpace"));
const CommercialLeaseOfficeSpace_1 = __importDefault(require("../models/commercial/CommercialLeaseOfficeSpace"));
const CommercialLeaseWarehouse_1 = __importDefault(require("../models/commercial/CommercialLeaseWarehouse"));
const CommercialLeaseShed_1 = require("../models/commercial/CommercialLeaseShed");
// Residential Rent Models
const residentialRentApartment_1 = __importDefault(require("../models/residential/residentialRentApartment"));
const residentialRentBuilderFloor_1 = __importDefault(require("../models/residential/residentialRentBuilderFloor"));
const residentialRentIndependent_1 = __importDefault(require("../models/residential/residentialRentIndependent"));
// Residential Sale Models
const residentialSaleApartment_1 = __importDefault(require("../models/residential/residentialSaleApartment"));
const residentialSaleBuilderFloor_1 = __importDefault(require("../models/residential/residentialSaleBuilderFloor"));
const saleIndependentHouse_1 = __importDefault(require("../models/residential/saleIndependentHouse"));
const salePlot_1 = __importDefault(require("../models/residential/salePlot"));
// Residential Lease Models
const residentialLeaseAppartment_1 = __importDefault(require("../models/residential/residentialLeaseAppartment"));
const residentialLeaseBuilderFloor_1 = __importDefault(require("../models/residential/residentialLeaseBuilderFloor"));
const residentialLeaseIndependentHouse_1 = __importDefault(require("../models/residential/residentialLeaseIndependentHouse"));
// Normalizer helper to pick only needed fields
const normalizeProperty = (item) => ({
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
const router = express_1.default.Router();
router.get('/all', async (req, res) => {
    // const { page = 1, limit = 10 } = req.query; // Pagination params
    // const skip = (page - 1) * limit;
    try {
        // const filter='_id basicInformation.title metadata.propertyType metadata.propertyName propertyDetails.area.totalArea propertyDetails.bathrooms propertyDetails.bedrooms media.photos.exterior'
        const results = await Promise.allSettled([
            // Commercial Rent
            CommercialRentAgriculture_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rent.expectedRent Agriculturelanddetails.totalArea media.photos.exterior metaData.createdAt availability.type metaData.intent propertyDetails.furnishingStatus'),
            CommercialRentCoveredSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialRentOfficeSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialRentOthers_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metaData.createdBy metaData.propertyName metaData.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metaData.createdAt metadata.status metaData.intent propertyDetails.furnishingStatus'),
            CommercialRentRetailStore_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialRentShed_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.propertySize media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialRentWarehouse_1.default.find().select('_id propertyId basicInformation.title basicInformation.propertyName basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.intent rentalTerms.rentDetails.expectedRent availability.type propertyDetails.furnishingStatus propertyDetails.bathrooms propertyDetails.area.totalArea media.photos.exterior'),
            commercialRentPlot_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            commercialrentshop_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentalTerms.rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            commercialRentShowroom_1.CommercialRentShowroom.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType rentDetails.expectedRent propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            // Commercial Sell
            CommercialSellAgriculture_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType price.expectedPrice Agriculturelanddetails.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellCoveredSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellOfficeSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellOthers_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metaData.createdBy metaData.propertyName metaData.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metaData.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellRetailStore_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType priceDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellShed_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialSellWarehouse_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            commercialsellplot_1.default.find().select('_id propertyId basicInformation.title basicInformation.address basicInformation.city basicInformation.state  metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice plotDetails.totalArea media.photos.plot metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialsellShop_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            CommercialsellShowroom_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType pricingDetails.propertyPrice propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.propertyType metadata.intent propertyDetails.furnishingStatus'),
            // // Commercial Lease
            CommercialLeaseAgriculture_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount Agriculturelanddetails.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseOthers_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseRetail_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseShop_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            commercialLeasePlot_1.default.find().select('_id propertyId plotDetails.totalPlotArea basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseShowroom_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseCoveredSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseOfficeSpace_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseShed_1.CommercialLeaseShed.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            CommercialLeaseWarehouse_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyName metadata.propertyType leaseTerms.leaseDetails.leaseAmount.amount propertyDetails.area.totalArea media.photos.exterior metadata.createdAt metadata.status metadata.intent propertyDetails.furnishingStatus'),
            // Residential Rent
            residentialRentApartment_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            residentialRentBuilderFloor_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            residentialRentIndependent_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            residentialSaleApartment_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft priceDetails.propertyPrice media.photos.exterior propertyDetails.furnishingStatus'),
            residentialSaleBuilderFloor_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            saleIndependentHouse_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft priceDetails.propertyPrice media.photos.exterior propertyDetails.furnishingStatus'),
            salePlot_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            residentialLeaseAppartment_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.superBuiltUpAreaSqft leaseTerms.leaseDetails.leaseAmount.amount media.photos.exterior propertyDetails.furnishingStatus'),
            residentialLeaseBuilderFloor_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt propertyDetails.builtUpAreaSqft rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus'),
            residentialLeaseIndependentHouse_1.default.find().select('_id propertyId basicInformation.title basicInformation.address metadata.createdBy metadata.propertyType metadata.propertyName metadata.createdAt rentalTerms.rentDetails.expectedRent media.photos.exterior propertyDetails.furnishingStatus')
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
        rentCoveredSpace, rentOfficeSpace, rentOthers, rentRetailStore, rentShed, rentWarehouse, rentPlot, rentShop, rentShowroom, 
        // sellAgriculture,
        sellCoveredSpace, sellOfficeSpace, sellOthers, sellRetailStore, sellShed, sellWarehouse, sellPlot, sellShop, sellShowroom, leaseAgriculture, leaseOthers, leaseRetailStore, leaseShop, leasePlot, leaseShowroom, leaseCoveredSpace, leaseOfficeSpace, leaseWarehouse, leaseShed, resRentApartment, resRentBuilderFloor, resRentIndependent, resSaleApartment, resSaleBuilderFloor, resSaleIndependentHouse, resSalePlot, resLeaseApartment, resLeaseBuilderFloor, resLeaseIndependentHouse] = results.map(r => (r.status === 'fulfilled' ? r.value.map(normalizeProperty) : []));
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
    }
    catch (err) {
        console.error('Unhandled error in all properties route:', err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Server error', error: err });
        }
    }
});
exports.default = router;
