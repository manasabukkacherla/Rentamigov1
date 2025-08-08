"use strict";
// import express from 'express';
// import pLimit from 'p-limit';
// // import * as Models from '../models/allModels';
// import { normalizeProperty } from '../utils/normalizeProperty';
// import * as Models from '../models/allModels';
// type PropertyCategory = 'commercialRent' | 'commercialSale' | 'commercialLease' | 'residentialRent' | 'residentialSale' | 'residentialLease';
// type PropertyType = keyof typeof Models.CommercialRentShed | keyof typeof Models.commercialSale | keyof typeof Models.commercialLease | keyof typeof Models.residentialRent | keyof typeof Models.residentialSale | keyof typeof Models.residentialLease;
// // Property code types
// type CategoryCode = 'residential' | 'commercial' | 'other';
// type ListingCode = 'rent' | 'sell' | 'lease' | 'pg/co-living';
// type SubCategoryCode = 'shops' | 'retail-store' | 'showrooms' | 'office-space' | 'warehouses' | 'sheds' | 'covered-space' | 'plots' | 'agriculture' | 'others' | 'apartment' | 'independenthouse' | 'builderfloor' | 'shared-space';
// // Property ID structure
// type PropertyId = {
//   categoryCode: string;
//   listingCode: string;
//   typeCode: string;
//   fullId: string;
// };
// const router = express.Router();
// const limit = pLimit(5); // Max 5 concurrent queries
// interface PropertyModel {
//   find(): Promise<any[]>;
// }
// type ModelMap = Record<PropertyCategory, Record<PropertyType, PropertyModel>>;
// const modelMap: ModelMap = {
//   commercialRent: {
//     coveredSpace: Models.CommercialRentCoveredSpace,
//     officeSpace: Models.CommercialRentOfficeSpace,
//     others: Models.CommercialRentOthers,
//     retailStore: Models.CommercialRentRetailStore,
//     shed: Models.CommercialRentShed,
//     warehouse: Models.CommercialRentWarehouse,
//     plot: Models.CommercialRentPlot,
//     shop: Models.CommercialRentShop,
//     showroom: Models.CommercialRentShowroom,
//   },
//   commercialSale: {
//     coveredSpace: Models.CommercialSellCoveredSpace,
//     officeSpace: Models.CommercialSellOfficeSpace,
//     others: Models.CommercialSellOthers,
//     retailStore: Models.CommercialSellRetailStore,
//     shed: Models.CommercialSellShed,
//     warehouse: Models.CommercialSellWarehouse,
//     plot: Models.CommercialPlot,
//     shop: Models.CommercialSellShop,
//     showroom: Models.CommercialSellShowroom,
//   },
//   commercialLease: {
//     agriculture: Models.CommercialLeaseAgriculture,
//     others: Models.CommercialLeaseOthers,
//     retailStore: Models.CommercialLeaseRetailStore,
//     shop: Models.CommercialLeaseShop,
//     plot: Models.CommercialLeasePlot,
//     showroom: Models.CommercialLeaseShowroom,
//     coveredSpace: Models.CommercialLeaseCoveredSpace,
//     officeSpace: Models.CommercialLeaseOfficeSpace,
//     warehouse: Models.CommercialLeaseWarehouse,
//     shed: Models.CommercialLeaseShed,
//   },
//   residentialRent: {
//     apartment: Models.ResidentialRentApartment,
//     builderFloor: Models.ResidentialRentBuilderFloor,
//     independent: Models.ResidentialRentIndependent,
//   },
//   residentialSale: {
//     apartment: Models.ResidentialSaleApartment,
//     builderFloor: Models.ResidentialSaleBuilderFloor,
//     independentHouse: Models.SaleIndependentHouse,
//     plot: Models.SalePlot,
//   },
//   residentialLease: {
//     apartment: Models.ResidentialLeaseApartment,
//     builderFloor: Models.ResidentialLeaseBuilderFloor,
//     independentHouse: Models.ResidentialLeaseIndependentHouse,
//   }
// };
// const categoryCodes: Record<CategoryCode, string> = {
//   residential: "RES",
//   commercial: "COM",
//   other: "OT",
// } as const;
// const listingCodes: Record<ListingCode, string> = {
//   rent: "RE",
//   sell: "SE",
//   lease: "LE",
//   "pg/co-living": "PG",
// } as const;
// // Normalize Property Type Mapping
// const subCategoryCodes: Record<SubCategoryCode, string> = {
//   shops: "SH",
//   "retail-store": "RS",
//   showrooms: "SR",
//   "office-space": "OS",
//   warehouses: "WH",
//   sheds: "SD",
//   "covered-space": "CS",
//   plots: "PL",
//   agriculture: "AG",
//   others: "OT",
//   apartment: "AP",
//   "independenthouse": "IH",
//   "builderfloor": "BF",
//   "shared-space": "SS",
// } as const;
// interface ParsedProperty {
//   propertyId: string;
//   categoryCode: string;
//   listingCode: string;
//   typeCode: string;
// }
// const parsePropertyId = (propertyId: string): ParsedProperty | null => {
//   if (!propertyId || propertyId.length < 10) {
//     console.log("Invalid property ID format");
//     return null;
//   }
//   const categoryCode = propertyId.slice(3, 6);
//   const listingCode = propertyId.slice(6, 8);
//   const typeCode = propertyId.slice(8, 10);
//   const category = Object.entries(categoryCodes)
//     .find(([_, code]) => code === categoryCode)?.[0] as CategoryCode || '';
//   const listing = Object.entries(listingCodes)
//     .find(([_, code]) => code === listingCode)?.[0] as ListingCode || '';
//   const type = Object.entries(subCategoryCodes)
//     .find(([_, code]) => code === typeCode)?.[0] as SubCategoryCode || '';
//   return {
//     propertyId,
//     categoryCode,
//     listingCode,
//     typeCode
//   };
// };
// router.get('/all', async (req, res) => {
//   const page = parseInt(req.query.page as string) || 1;
//   const limitPerType = parseInt(req.query.limit as string) || 12;
//   const skip = (page - 1) * limitPerType;
//   try {
//     const results: Record<PropertyCategory, Record<PropertyType, any>> = {} as Record<PropertyCategory, Record<PropertyType, any>>;
//     for (const category in modelMap) {
//       if (Object.prototype.hasOwnProperty.call(modelMap, category)) {
//         results[category as PropertyCategory] = {};
//         const types = modelMap[category as PropertyCategory];
//         const tasks = Object.entries(types).map(([type, model]) =>
//           limit(async () => {
//             try {
//               const docs = await model.find().sort({ createdAt: -1 }).skip(skip).limit(limitPerType).lean();
//               // Type guard for propertyId
//               const validDocs = docs.filter((doc: any) => doc?.propertyId);
//               const parsedDocs = validDocs.map((property: any) => {
//                 const parsedPropertyId = parsePropertyId(property.propertyId);
//                 if (!parsedPropertyId) {
//                   console.log("Failed to parse property ID for property:", property.propertyId);
//                   return null;
//                 }
//                 return { ...property, ...parsedPropertyId };
//               }).filter((doc: any): doc is object => doc !== null);
//               results[category as PropertyCategory][type as PropertyType] = parsedDocs.map(normalizeProperty);
//             } catch (err) {
//               console.error(`Error fetching ${category}/${type}:`, err);
//               results[category as PropertyCategory][type as PropertyType] = [];
//             }
//           })
//         );
//         await Promise.all(tasks);
//       }
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Properties fetched successfully',
//       page,
//       limit: limitPerType,
//       data: results
//     });
//   } catch (err) {
//     console.error('Error fetching properties:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error',
//       error: err instanceof Error ? err.message : 'Unknown error'
//     });
//   }
// });
// export default router;
