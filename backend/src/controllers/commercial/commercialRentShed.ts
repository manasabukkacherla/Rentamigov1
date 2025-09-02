import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialRentShed from '../../models/commercial/CommercialRentShed';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMRESD";

        const highestShowroom = await CommercialRentShed.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1;

        if (highestShowroom) {
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        const existingWithExactId = await CommercialRentShed.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialRentShed.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMRESD${timestamp}`;
    }
};

export const createCommercialRentShed = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const propertyId = await generatePropertyId();

        if (!formData.metadata) {
            formData.metadata = {};
        }

        // Robustly set metadata.createdBy and createdAt
        formData.metadata = formData.metadata || {};
        formData.metadata.createdBy = req.user?._id || formData.metadata.createdBy || null;
        formData.metadata.createdAt = formData.metadata.createdAt || new Date();

        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }

        const showroomData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata
            }
        };

        // Debug: log the payload being saved
        console.log('Saving CommercialRentShed:', JSON.stringify(showroomData, null, 2));

        const showroom = new CommercialRentShed(showroomData);
        await showroom.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent showroom listing created successfully',
            data: showroom
        });
    } catch (error: any) {
        console.error('Error creating commercial rent shed:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message,
                errors: error.errors
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create commercial rent shed listing',
            details: error.message
        });
    }
};

export const getSheds = async (req: Request, res: Response) => {
    try {
        const sheds = await CommercialRentShed.find();
        res.status(200).json({
            success: true,
            count: sheds.length,
            data: sheds
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getShedById = async (req: Request, res: Response) => {
    try {
        const propertyId = req.params.propertyId;
        const shed = await CommercialRentShed.findOne({ propertyId });
        if (!shed) {
            return res.status(404).json({
                success: false,
                error: 'Commercial RentShed listing not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: shed
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const updateShed = async (req: Request, res: Response) => {
    try {
        const documentId = req.params.id; 
        const incomingData = req.body?.data;
        if (!incomingData) {
          return res.status(400).json({
            success: false,
            message: "No data provided for update.",
          });
        }
    
        const cleanedData = JSON.parse(
          JSON.stringify(incomingData, (key, value) => {
            if (key === "_id" || key === "__v") return undefined;
            return value;
          })
        );
    
       
        const existingDoc = await CommercialRentShed.findById(documentId);
        if (!existingDoc) {
          return res.status(404).json({
            success: false,
            message: "Property not found",
          });
        }
    
        const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    
        const updatedDoc = await CommercialRentShed.findByIdAndUpdate(
          documentId,
          { $set: mergedData },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: "Commercial RentShed updated successfully.",
          data: updatedDoc,
        });
      } catch (error: any) {
        console.error("Update error:", error);
        res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown update error",
        });
      }
    };

export const deleteShed = async (req: Request, res: Response) => {
    try {
        const data = await CommercialRentShed.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Commercial RentShed listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Commercial RentShed listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting Commercial RentShed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete Commercial RentShed listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Advanced Filters
// export const getShedsByFilters = async (req: Request, res: Response) => {
//     try {
//         const {
//             city,
//             minAmount,
//             maxAmount,
//             minArea,
//             maxArea,
//             shedType,
//             furnishingStatus,
//             availability
//         } = req.query;

//         const filters: Record<string, any> = {};

//         // Apply filters if provided
//         if (city) filters['basicInformation.address.city'] = city;
//         if (shedType) filters['basicInformation.shedType'] = { $in: [shedType] };
//         if (furnishingStatus) filters['propertyDetails.furnishingStatus'] = furnishingStatus;

//         if (minAmount || maxAmount) {
//             filters['IRentalTerms.rentDetails.expectedRent'] = {};
//             if (minAmount) filters['IRentalTerms.rentDetails.expectedRent'].$gte = Number(minAmount);
//             if (maxAmount) filters['IRentalTerms.rentDetails.expectedRent'].$lte = Number(maxAmount);
//         }

//         if (minArea || maxArea) {
//             filters['shedDetails.totalArea'] = {};
//             if (minArea) filters['shedDetails.totalArea'].$gte = Number(minArea);
//             if (maxArea) filters['shedDetails.totalArea'].$lte = Number(maxArea);
//         }

//         if (availability === 'immediate') {
//             filters['RentalTerms.availability.type'] = 'immediate';
//         }

//         // Find sheds with applied filters
//         const sheds = await CommercialRentShed.find(filters);

//         res.status(200).json({
//             success: true,
//             count: sheds.length,
//             data: sheds
//         });
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// }; 