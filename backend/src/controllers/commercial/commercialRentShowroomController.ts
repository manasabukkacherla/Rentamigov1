import { Request, Response } from 'express';
import _ from 'lodash';
import { CommercialRentShowroom } from '../../models/commercial/commercialRentShowroom';

// Generate property ID with format RA-COMRSH####
const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial rent showroom property ID
        const prefix = "RA-COMRESR";

        // Find the showroom with the highest property ID number
        const highestShowroom = await CommercialRentShowroom.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1; // Default start number

        if (highestShowroom) {
            // Extract the numeric part from the existing highest property ID
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await CommercialRentShowroom.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            // Double-check this new ID
            const forcedExisting = await CommercialRentShowroom.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                // If still colliding, recursively generate a new ID
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        // Fallback to timestamp-based ID if there's an error
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMRESH${timestamp}`;
    }
};

// Create a new commercial rent showroom listing
export const createRentShowroom = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Creating commercial rent showroom with data:', JSON.stringify(formData, null, 2));

        // Check for required fields
        if (!formData.basicInformation || !formData.showroomDetails || !formData.propertyDetails) {
            return res.status(400).json({
                success: false,
                error: 'Missing required information',
                details: 'basicInformation, showroomDetails and propertyDetails are required'
            });
        }

        // Generate property ID
        const propertyId = await generatePropertyId();
        console.log('Generated property ID:', propertyId);

        // Set metadata if not provided
        if (!formData.metadata) {
            formData.metadata = {};
        }

        // Ensure createdBy is present
        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }

        // Create the showroom data object
        const showroomData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };

        // Create new showroom listing
        const showroom = new CommercialRentShowroom(showroomData);
        await showroom.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent showroom listing created successfully',
            data: showroom
        });
    } catch (error: any) {
        console.error('Error creating commercial rent showroom:', error);

        // Check for validation errors
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
            error: 'Failed to create commercial rent showroom listing',
            details: error.message
        });
    }
};

export const getAllCommercialRentShowroom = async (req: Request, res: Response) => {
    try {
      const properties = await CommercialRentShowroom.find().sort({ 'metadata.createdAt': -1 });
      
      res.status(200).json({
        success: true,
        message: 'Commercial Rent showroom listings retrieved successfully',
        data: properties
      });
    } catch (error) {
      console.error('Error fetching commercial Rent showroom listings:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch commercial Rent showroom listings' 
      });
    }
  };
  
  export const getCommercialRentShowroomById = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.propertyId;
      const property = await CommercialRentShowroom.findOne({ propertyId });
      
      if (!property) {
        return res.status(404).json({ 
          success: false,
          error: 'Commercial Rent showroom property not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Commercial Rent showroom property retrieved successfully',
        data: property
      });
    } catch (error) {
      console.error('Error fetching commercial Rent showroom property:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to fetch commercial Rent showroom property' 
      });
    }
  };
  
  export const updateCommercialRentShowroom = async (req: Request, res: Response) => {
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
  
     
      const existingDoc = await CommercialRentShowroom.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialRentShowroom.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Commercial RentShowroom updated successfully.",
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
  
  export const deleteCommercialRentShowroom = async (req: Request, res: Response) => {
    try {
      const data = await CommercialRentShowroom.findByIdAndDelete(req.params.id);

      if (!data) {
          return res.status(404).json({
              success: false,
              message: 'Commercial RentShowroom listing not found'
          });
      }

      res.status(200).json({
          success: true,
          message: 'Commercial RentShowroom listing deleted successfully'
      });
  } catch (error) {
      console.error('Error deleting Commercial RentShowroom:', error);
      res.status(500).json({
          success: false,
          error: 'Failed to delete Commercial RentShowroom listing',
          message: error instanceof Error ? error.message : 'Unknown error'
      });
  }
};