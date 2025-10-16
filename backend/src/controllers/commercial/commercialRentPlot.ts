import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialRentPlot from '../../models/commercial/commercialRentPlot';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMREPL";

        const highestShowroom = await CommercialRentPlot.findOne({
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

        const existingWithExactId = await CommercialRentPlot.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialRentPlot.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMRSH${timestamp}`;
    }
};

export const createCommercialRentPlot = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const propertyId = await generatePropertyId();

        if (!formData.metadata) {
            formData.metadata = {};
        }

        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }

        const plotData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: formData.metadata.createdBy,
                createdAt: new Date()
            }
        };

        const plot = new CommercialRentPlot(plotData);
        await plot.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent plot listing created successfully',
            data: plot
        });
    } catch (error: any) {
        console.error('Error creating commercial rent plot:', error);

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
            error: 'Failed to create commercial rent plot listing',
            details: error.message
        });
    }
};

// Get all commercial Rent plots
export const getAllRentPlots = async (req: Request, res: Response) => {
    try {
        const RentPlots = await CommercialRentPlot.find()
            .populate('metadata.createdBy', 'name email')
            .select('-__v')
            .sort({ 'metadata.createdAt': -1 });

        res.status(200).json({
            success: true,
            count: RentPlots.length,
            data: RentPlots
        });
    } catch (error) {
        console.error('Error fetching Rent plots:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve Rent plots',
            message: (error as Error).message
        });
    }
};

// Get a specific commercial Rent plot by ID
export const getRentPlotById = async (req: Request, res: Response) => {
    try {
        const propertyId = req.params.propertyId;
        const RentPlot = await CommercialRentPlot.findOne({propertyId})
            .populate('metadata.createdBy', 'name email')
            .select('-__v');

        if (!RentPlot) {
            return res.status(404).json({
                success: false,
                error: 'Rent plot not found'
            });
        }

        res.status(200).json({
            success: true,
            data: RentPlot
        });
    } catch (error) {
        console.error('Error fetching Rent plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve Rent plot',
            message: (error as Error).message
        });
    }
}; 




  export const updatePlotById = async (req: Request, res: Response) => {
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
    
       
        const existingDoc = await CommercialRentPlot.findById(documentId);
        if (!existingDoc) {
          return res.status(404).json({
            success: false,
            message: "Property not found",
          });
        }
    
        const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    
        const updatedDoc = await CommercialRentPlot.findByIdAndUpdate(
          documentId,
          { $set: mergedData },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: "rent plot updated successfully.",
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
  
  export const deleteRentPlotById = async (req: Request, res: Response) => {
    try {
        const data = await CommercialRentPlot.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'rent plot listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'rent plot listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting rent plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete rent plot listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};