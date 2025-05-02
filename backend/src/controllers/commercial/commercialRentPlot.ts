import { Request, Response } from 'express';
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

        if (!formData.metadata.userId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.userId is required'
            });
        }

        const plotData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
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
            .populate('metadata.userId', 'name email')
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
        const RentPlot = await CommercialRentPlot.findById(req.params.id)
            .populate('metadata.userId', 'name email')
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
      const propertyId = req.params.id;
      const updateData = req.body;
      
      const RentPlots= await CommercialRentPlot.findOneAndUpdate(
        { propertyId },
        { $set: updateData },
        { new: true }
      );
      
      if (!RentPlots) {
        return res.status(404).json({ 
          success: false,
          error: 'Rent plot property not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Rent plot property updated successfully',
        data: RentPlots
      });
    } catch (error) {
      console.error('Error updating Rent plot property:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to update Rent plot property' 
      });
    }
  };
  
  export const deleteRentPlotById = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id;
      const RentPlots = await CommercialRentPlot.findOneAndDelete({ propertyId });
      
      if (!RentPlots) {
        return res.status(404).json({ 
          success: false,
          error: 'Rent plot property not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Rent plot property deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting Rent plot property:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to delete Rent plot property' 
      });
    }
  }; 