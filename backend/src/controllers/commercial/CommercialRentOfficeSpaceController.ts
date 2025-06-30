import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialOfficeSpace from '../../models/commercial/CommercialRentOfficeSpace';

const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial office space property ID
        const prefix = "RA-COMREOS";

        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialOfficeSpace.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1; // Default start number

        if (highestOfficeSpace) {
            // Extract the numeric part from the existing highest property ID
            const match = highestOfficeSpace.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        // Check if this exact ID somehow exists
        const existingWithExactId = await CommercialOfficeSpace.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialOfficeSpace.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMREOS${timestamp}`;
    }
};

export const createOfficeSpace = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);

        // Generate property ID
        const propertyId = await generatePropertyId();

        // Prepare office space data with all required fields
        const officeSpaceData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };

        console.log('createdBy:', formData.metadata.createdBy);

        console.log('Prepared office space data:', officeSpaceData);

        // Create new office space listing
        const officeSpace = new CommercialOfficeSpace(officeSpaceData);
        await officeSpace.save();

        console.log('Office space saved successfully:', officeSpace);

        res.status(201).json({
            success: true,
            message: 'Office space listing created successfully',
            data: officeSpace
        });
    } catch (error) {
        console.error('Error creating office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get all office space listings
export const getOfficeSpaces = async (req: Request, res: Response) => {
    try {
        const officeSpaces = await CommercialOfficeSpace.find()
            .sort({ 'metadata.createdAt': -1 });

        res.status(200).json({
            success: true,
            count: officeSpaces.length,
            data: officeSpaces
        });
    } catch (error) {
        console.error('Error fetching office spaces:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch office space listings',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get single office space listing
export const getOfficeSpaceById = async (req: Request, res: Response) => {
    try {
        const propertyId = req.params.propertyId;
        const officeSpace = await CommercialOfficeSpace.findOne({propertyId});

        if (!officeSpace) {
            return res.status(404).json({
                success: false,
                message: 'Office space listing not found'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Office space listing retrieved successfully',
            data: officeSpace
        });
    } catch (error) {
        console.error('Error fetching office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Update office space listing
export const updateOfficeSpace = async (req: Request, res: Response) => {
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
    
       
        const existingDoc = await CommercialOfficeSpace.findById(documentId);
        if (!existingDoc) {
          return res.status(404).json({
            success: false,
            message: "Property not found",
          });
        }
    
        const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    
        const updatedDoc = await CommercialOfficeSpace.findByIdAndUpdate(
          documentId,
          { $set: mergedData },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: "rent office space updated successfully.",
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

// Delete office space listing
export const deleteOfficeSpace = async (req: Request, res: Response) => {
    try {
        const data = await CommercialOfficeSpace.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'rent office space listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'rent office space listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting rent office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete rent office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};