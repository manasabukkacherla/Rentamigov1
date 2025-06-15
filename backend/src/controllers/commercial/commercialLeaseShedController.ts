import { Request, Response } from 'express';
import { CommercialLeaseShed } from '../../models/commercial/CommercialLeaseShed';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMLESD";

        const highestShed = await CommercialLeaseShed.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1;

        if (highestShed) {
            const match = highestShed.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        const existingWithExactId = await CommercialLeaseShed.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialLeaseShed.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMLESH${timestamp}`;
    }
};

export const createShed = async (req: Request, res: Response) => {
    try {
        if (res.headersSent) return;

        const formData = req.body;
        console.log('Form Data:', formData);

        const propertyId = await generatePropertyId();

        // Validate required fields
        const requiredFields = ['basicInformation', 'shedDetails', 'propertyDetails', 'leaseTerms', 'contactInformation'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        const shedData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: req.user?.id || null,
                createdAt: new Date(),
                // status: 'active',
                // views: 0,
                // favorites: 0,
                // isVerified: false
            }
        };

        const shed = new CommercialLeaseShed(shedData);
        await shed.save();

        res.status(201).json({
            success: true,
            message: 'Shed listing created successfully',
            data: shed
        });
    } catch (error: any) {
        if (res.headersSent) {
            console.error('Error after headers sent:', error);
            return;
        }

        console.error('Error creating shed listing:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getSheds = async (req: Request, res: Response) => {
    try {
        const sheds = await CommercialLeaseShed.find();
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
        const shed = await CommercialLeaseShed.findOne({ propertyId });
        if (!shed) {
            return res.status(404).json({
                success: false,
                error: 'Shed not found'
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
    
       
        const existingDoc = await CommercialLeaseShed.findById(documentId);
        if (!existingDoc) {
          return res.status(404).json({
            success: false,
            message: "Property not found",
          });
        }
    
        const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    
        const updatedDoc = await CommercialLeaseShed.findByIdAndUpdate(
          documentId,
          { $set: mergedData },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: "Lease shed updated successfully.",
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
        const data = await CommercialLeaseShed.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Lease shed listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lease shed listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lease shed:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease shed listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Advanced Filters
// export const getShedsByFilters = async (req: Request, res: Response) => {
//     try {
//         const {
//             city,
//             minLeaseAmount,
//             maxLeaseAmount,
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

//         if (minLeaseAmount || maxLeaseAmount) {
//             filters['leaseTerms.leaseDetails.leaseAmount.amount'] = {};
//             if (minLeaseAmount) filters['leaseTerms.leaseDetails.leaseAmount.amount'].$gte = Number(minLeaseAmount);
//             if (maxLeaseAmount) filters['leaseTerms.leaseDetails.leaseAmount.amount'].$lte = Number(maxLeaseAmount);
//         }

//         if (minArea || maxArea) {
//             filters['shedDetails.totalArea'] = {};
//             if (minArea) filters['shedDetails.totalArea'].$gte = Number(minArea);
//             if (maxArea) filters['shedDetails.totalArea'].$lte = Number(maxArea);
//         }

//         if (availability === 'immediate') {
//             filters['leaseTerms.availability.availableImmediately'] = true;
//         }

//         // Find sheds with applied filters
//         const sheds = await CommercialLeaseShed.find(filters);

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