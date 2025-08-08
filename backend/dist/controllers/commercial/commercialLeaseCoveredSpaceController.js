"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommercialLeaseCoveredSpace = exports.updateCommercialLeaseCoveredSpace = exports.getCommercialLeaseCoveredSpaceById = exports.getAllCommercialLeaseCoveredSpaces = exports.createCommercialLeaseCoveredSpace = void 0;
const lodash_1 = __importDefault(require("lodash"));
const CommercialLeaseCoveredSpace_1 = __importDefault(require("../../models/commercial/CommercialLeaseCoveredSpace"));
// Generate unique propertyId
const generatePropertyId = async () => {
    const prefix = "RA-COMLECS";
    const latest = await CommercialLeaseCoveredSpace_1.default.findOne({
        propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    let next = 1;
    if (latest) {
        const match = latest.propertyId.match(/(\d+)$/);
        if (match)
            next = parseInt(match[1], 10) + 1;
    }
    const id = `${prefix}${next.toString().padStart(4, '0')}`;
    const exists = await CommercialLeaseCoveredSpace_1.default.findOne({ propertyId: id });
    if (exists)
        return generatePropertyId(); // recursive if duplicate
    return id;
};
// CREATE
const createCommercialLeaseCoveredSpace = async (req, res) => {
    try {
        const propertyId = await generatePropertyId();
        const coveredSpace = new CommercialLeaseCoveredSpace_1.default({
            ...req.body,
            propertyId,
            metadata: {
                ...req.body.metadata,
                createdBy: req.user?._id || null,
                createdAt: new Date()
            }
        });
        // await coveredSpace.save();
        res.status(201).json({ success: true, message: "Created successfully", data: coveredSpace });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Create failed', message: error.message });
    }
};
exports.createCommercialLeaseCoveredSpace = createCommercialLeaseCoveredSpace;
// GET ALL with pagination and filters
// export const getAllCommercialLeaseCoveredSpaces = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
//     const pageNum = parseInt(page as string, 10);
//     const limitNum = parseInt(limit as string, 10);
//     const skip = (pageNum - 1) * limitNum;
//     const query: any = {};
//     if (city) query['basicInformation.address.city'] = city;
//     if (minPrice) query['leaseTerms.leaseDetails.leaseAmount.amount'] = { $gte: parseInt(minPrice as string, 10) };
//     if (maxPrice) {
//       query['leaseTerms.leaseDetails.leaseAmount.amount'] = {
//         ...(query['leaseTerms.leaseDetails.leaseAmount.amount'] || {}),
//         $lte: parseInt(maxPrice as string, 10)
//       };
//     }
//     if (minArea) query['coveredSpaceDetails.totalArea'] = { $gte: parseInt(minArea as string, 10) };
//     if (maxArea) {
//       query['coveredSpaceDetails.totalArea'] = {
//         ...(query['coveredSpaceDetails.totalArea'] || {}),
//         $lte: parseInt(maxArea as string, 10)
//       };
//     }
//     let sortQuery: any = { 'metadata.createdAt': -1 };
//     if (sort === 'price-asc') sortQuery = { 'leaseTerms.leaseDetails.leaseAmount.amount': 1 };
//     if (sort === 'price-desc') sortQuery = { 'leaseTerms.leaseDetails.leaseAmount.amount': -1 };
//     if (sort === 'area-asc') sortQuery = { 'coveredSpaceDetails.totalArea': 1 };
//     if (sort === 'area-desc') sortQuery = { 'coveredSpaceDetails.totalArea': -1 };
//     const coveredSpaces = await CommercialLeaseCoveredSpace.find(query)
//       .populate('metadata.userId', 'name email')
//       .sort(sortQuery)
//       .skip(skip)
//       .limit(limitNum)
//       .lean();
//     const total = await CommercialLeaseCoveredSpace.countDocuments(query);
//     res.status(200).json({
//       success: true,
//       count: coveredSpaces.length,
//       data: coveredSpaces,
//       pagination: {
//         total,
//         page: pageNum,
//         limit: limitNum,
//         pages: Math.ceil(total / limitNum)
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Get failed', message: (error as Error).message });
//   }
// };
const getAllCommercialLeaseCoveredSpaces = async (req, res) => {
    try {
        const leaseProperties = await CommercialLeaseCoveredSpace_1.default.find({}).sort({ 'metaData.createdAt': -1 });
        res.status(200).json({
            success: true,
            count: leaseProperties.length,
            data: leaseProperties
        });
    }
    catch (error) {
        console.error('Error fetching commercial lease covered space properties:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch commercial lease covered space properties',
            error: error
        });
    }
};
exports.getAllCommercialLeaseCoveredSpaces = getAllCommercialLeaseCoveredSpaces;
// GET BY ID
const getCommercialLeaseCoveredSpaceById = async (req, res) => {
    try {
        const coveredSpace = await CommercialLeaseCoveredSpace_1.default.findOne({ propertyId: req.params.propertyId })
            .populate('metadata.createdBy', 'name email');
        if (!coveredSpace)
            return res.status(404).json({ success: false, error: 'Not found' });
        res.status(200).json({ success: true, data: coveredSpace });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Get by ID failed', message: error.message });
    }
};
exports.getCommercialLeaseCoveredSpaceById = getCommercialLeaseCoveredSpaceById;
const updateCommercialLeaseCoveredSpace = async (req, res) => {
    try {
        const documentId = req.params.id;
        const incomingData = req.body?.data;
        if (!incomingData) {
            return res.status(400).json({
                success: false,
                message: "No data provided for update.",
            });
        }
        const cleanedData = JSON.parse(JSON.stringify(incomingData, (key, value) => {
            if (key === "_id" || key === "__v")
                return undefined;
            return value;
        }));
        const existingDoc = await CommercialLeaseCoveredSpace_1.default.findById(documentId);
        if (!existingDoc) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }
        const mergedData = lodash_1.default.merge(existingDoc.toObject(), cleanedData);
        const updatedDoc = await CommercialLeaseCoveredSpace_1.default.findByIdAndUpdate(documentId, { $set: mergedData }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Lease covered space updated successfully.",
            data: updatedDoc,
        });
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown update error",
        });
    }
};
exports.updateCommercialLeaseCoveredSpace = updateCommercialLeaseCoveredSpace;
const deleteCommercialLeaseCoveredSpace = async (req, res) => {
    try {
        const data = await CommercialLeaseCoveredSpace_1.default.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Lease covered space listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Lease covered space listing deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting lease covered space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease covered space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteCommercialLeaseCoveredSpace = deleteCommercialLeaseCoveredSpace;
// import { Request, Response } from 'express';
// import CommercialLeaseCoveredSpace, { ICommercialLeaseCoveredSpace } from '../../models/commercial/CommericalLeaseCoveredSpace';
// import mongoose,{Types} from 'mongoose';
// // Extend Express Request to include user
// interface AuthenticatedRequest extends Request {
//     user?: {
//         _id: string;
//         name?: string;
//         email?: string;
//     };
// }
// // Helper function to generate unique property ID
// const generatePropertyId = async (): Promise<string> => {
//     try {
//         const prefix = "RA-COMSH";
//         const highestCoveredSpace = await CommercialLeaseCoveredSpace.findOne({
//             propertyId: { $regex: `^${prefix}\\d+$` }
//         }).sort({ propertyId: -1 });
//         let nextNumber = 1;
//         if (highestCoveredSpace) {
//             const match = highestCoveredSpace.propertyId.match(/(\d+)$/);
//             if (match && match[1]) {
//                 nextNumber = parseInt(match[1], 10) + 1;
//             }
//         }
//         const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
//         const existingWithExactId = await CommercialLeaseCoveredSpace.findOne({ propertyId });
//         if (existingWithExactId) {
//             console.log(`Property ID ${propertyId} already exists, trying next number`);
//             const forcedNextNumber = nextNumber + 1;
//             const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
//             const forcedExisting = await CommercialLeaseCoveredSpace.findOne({ propertyId: forcedPropertyId });
//             if (forcedExisting) {
//                 return generatePropertyId();
//             }
//             return forcedPropertyId;
//         }
//         return propertyId;
//     } catch (error) {
//         console.error('Error generating property ID:', error);
//         const timestamp = Date.now().toString().slice(-8);
//         return `RA-COMSH${timestamp}`;
//     }
// };
// // Create a new commercial lease covered space
// export const createCommercialLeaseCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const formData = req.body;
//         // Generate property ID
//         const propertyId = await generatePropertyId();
//         // Prepare property data with property ID and metadata
//         const propertyData = {
//             propertyId,
//             ...formData,
//             metadata: {
//                 ...formData.metadata,
//                 userId: req.user?._id || null,
//                 createdAt: new Date()
//             }
//         };
//         // Create new property listing
//         const coveredSpace = new CommercialLeaseCoveredSpace(propertyData);
//         await coveredSpace.save();
//         res.status(201).json({
//             success: true,
//             message: 'Commercial lease covered space listed successfully',
//             data: coveredSpace
//         });
//     } catch (error) {
//         console.error('Error creating commercial lease covered space:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to create commercial lease covered space listing',
//             message: (error as Error).message
//         });
//     }
// };
// // Get all commercial lease covered spaces
// export const getAllCommercialLeaseCoveredSpaces = async (req: Request, res: Response) => {
//     try {
//         const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
//         const pageNum = parseInt(page as string, 10);
//         const limitNum = parseInt(limit as string, 10);
//         const skip = (pageNum - 1) * limitNum;
//         // Build filter query
//         const query: any = {};
//         if (city) {
//             query['basicInformation.address.city'] = city;
//         }
//         if (minPrice) {
//             query['leaseTerms.leaseDetails.leaseAmount.amount'] = { $gte: parseInt(minPrice as string, 10) };
//         }
//         if (maxPrice) {
//             query['leaseTerms.leaseDetails.leaseAmount.amount'] = {
//                 ...query['leaseTerms.leaseDetails.leaseAmount.amount'] || {},
//                 $lte: parseInt(maxPrice as string, 10)
//             };
//         }
//         if (minArea) {
//             query['coveredSpaceDetails.totalArea'] = { $gte: parseInt(minArea as string, 10) };
//         }
//         if (maxArea) {
//             query['coveredSpaceDetails.totalArea'] = {
//                 ...query['coveredSpaceDetails.totalArea'] || {},
//                 $lte: parseInt(maxArea as string, 10)
//             };
//         }
//         // Build sort query
//         let sortQuery: any = { 'metadata.createdAt': -1 }; // Default sorting
//         if (sort === 'price-asc') {
//             sortQuery = { 'leaseTerms.leaseDetails.leaseAmount.amount': 1 };
//         } else if (sort === 'price-desc') {
//             sortQuery = { 'leaseTerms.leaseDetails.leaseAmount.amount': -1 };
//         } else if (sort === 'area-asc') {
//             sortQuery = { 'coveredSpaceDetails.totalArea': 1 };
//         } else if (sort === 'area-desc') {
//             sortQuery = { 'coveredSpaceDetails.totalArea': -1 };
//         }
//         // Execute query with pagination
//         const coveredSpaces = await CommercialLeaseCoveredSpace.find(query)
//             .populate('metadata.userId', 'name email')
//             .sort(sortQuery)
//             .skip(skip)
//             .limit(limitNum)
//             .lean();
//         // Get total count for pagination
//         const total = await CommercialLeaseCoveredSpace.countDocuments(query);
//         res.status(200).json({
//             success: true,
//             count: coveredSpaces.length,
//             data: coveredSpaces,
//             pagination: {
//                 total,
//                 page: pageNum,
//                 limit: limitNum,
//                 pages: Math.ceil(total / limitNum)
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching commercial lease covered spaces:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to retrieve commercial lease covered spaces',
//             message: (error as Error).message
//         });
//     }
// };
// // Get a specific commercial lease covered space by ID
// export const getCommercialLeaseCoveredSpaceById = async (req: Request, res: Response) => {
//     try {
//         const coveredSpace = await CommercialLeaseCoveredSpace.findById(req.params.id)
//             .populate('metadata.userId', 'name email');
//         if (!coveredSpace) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Commercial lease covered space not found'
//             });
//         }
//         // Increment view count
//         // coveredSpace.metadata.views += 1;
//         // await coveredSpace.save();
//         res.status(200).json({
//             success: true,
//             data: coveredSpace
//         });
//     } catch (error) {
//         console.error('Error fetching commercial lease covered space:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to retrieve commercial lease covered space',
//             message: (error as Error).message
//         });
//     }
// };
// // Update a commercial lease covered space
// export const updateCommercialLeaseCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const coveredSpace = await CommercialLeaseCoveredSpace.findById(req.params.id);
//         if (!coveredSpace) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Commercial lease covered space not found'
//             });
//         }
//         // Check if user is authorized to update (only creator or admin)
//         // if (req.user && coveredSpace.metadata.userId &&
//         //     req.user._id !== coveredSpace.metadata.userId.toString()) {
//             if (
//                 req.user &&
//                 coveredSpace.metadata.userId &&
//                 coveredSpace.metadata.userId.toString() !== req.user._id.toString()
//               ) {
//                 return res.status(403).json({
//                   success: false,
//                   error: 'Not authorized to perform this action'
//                 });
//               }
//         // Update with new data
//         // const updatedData = {
//         //     ...req.body,
//         //     metadata: {
//         //         ...(coveredSpace.metadata as any).toObject ? (coveredSpace.metadata as any).toObject() : coveredSpace.metadata,
//         //         ...req.body.metadata,
//         //         updatedAt: new Date()
//         //     }
//         // };
//         const updatedData = {
//             ...req.body,
//             metadata: {
//               ...coveredSpace.metadata,
//               updatedAt: new Date()
//             }
//           };
//         const updatedCoveredSpace = await CommercialLeaseCoveredSpace.findByIdAndUpdate(
//             req.params.id,
//             updatedData,
//             { new: true, runValidators: true }
//         );
//         res.status(200).json({
//             success: true,
//             message: 'Commercial lease covered space updated successfully',
//             data: updatedCoveredSpace
//         });
//     } catch (error) {
//         console.error('Error updating commercial lease covered space:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to update commercial lease covered space',
//             message: (error as Error).message
//         });
//     }
// };
// // Delete a commercial lease covered space
// export const deleteCommercialLeaseCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
//     try {
//         const coveredSpace = await CommercialLeaseCoveredSpace.findById(req.params.id);
//         if (!coveredSpace) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'Commercial lease covered space not found'
//             });
//         }
//         // Check if user is authorized to delete (only creator or admin)
//         if (req.user && coveredSpace.metadata.userId &&
//             req.user._id !== coveredSpace.metadata.userId.toString()) {
//             return res.status(403).json({
//                 success: false,
//                 error: 'Not authorized to delete this property'
//             });
//         }
//         await CommercialLeaseCoveredSpace.findByIdAndDelete(req.params.id);
//         res.status(200).json({
//             success: true,
//             message: 'Commercial lease covered space deleted successfully'
//         });
//     } catch (error) {
//         console.error('Error deleting commercial lease covered space:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to delete commercial lease covered space',
//             message: (error as Error).message
//         });
//     }
// }; 
