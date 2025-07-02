import { Request, Response } from 'express';
import LeasePlot from '../../models/commercial/commercialLeasePlot';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    user: {
        _id: string;
        name?: string;
        email?: string;
    };
}

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMLEPL";
        const highestPlot = await LeasePlot.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1;

        if (highestPlot) {
            const match = highestPlot.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        const existingWithExactId = await LeasePlot.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await LeasePlot.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMLEPL${timestamp}`;
    }
};

const transformPlotData = (formData: any) => {
    // Create a transformed plot object that matches our schema
    const transformedData: any = {};

    // Basic Information
    if (formData.basicInformation) {
        transformedData.basicInformation = {
            title: formData.basicInformation.title ?? '',
            plotType: Array.isArray(formData.basicInformation.plotType)
                ? formData.basicInformation.plotType
                : (formData.basicInformation.plotType != null ? [formData.basicInformation.plotType] : []),
            address: {
                street: formData.basicInformation.address?.street ?? '',
                city: formData.basicInformation.address?.city ?? '',
                state: formData.basicInformation.address?.state ?? '',
                zipCode: formData.basicInformation.address?.zipCode ?? '',
                _id: formData.basicInformation.address?._id ?? ''
            },
            landmark: formData.basicInformation.landmark ?? '',
            location: {
                latitude: formData.basicInformation.location?.latitude ?? '',
                longitude: formData.basicInformation.location?.longitude ?? '',
                _id: formData.basicInformation.location?._id ?? ''
            },
            isCornerProperty: formData.basicInformation.isCornerProperty ?? false
        };
    }

    // Property Details
    

    // Plot Details
    if (formData.plotDetails) {
        transformedData.plotDetails = {
            totalPlotArea: formData.plotDetails.totalPlotArea ?? 0,
            zoningType: formData.plotDetails.zoningType ?? 'commercial',
            boundaryWall: formData.plotDetails.boundaryWall ?? false,
            waterSewer: formData.plotDetails.waterSewer ?? false,
            electricity: formData.plotDetails.electricity ?? false,
            roadAccess: formData.plotDetails.roadAccess ?? '',
            securityRoom: formData.plotDetails.securityRoom ?? false,
            previousConstruction: formData.plotDetails.previousConstruction ?? ''
        };
    }

    // Helper to treat '', null, or undefined as missing
    const defaultIfEmpty = (value: any, def: any) => (value === undefined || value === null || value === '' ? def : value);

    // Lease Details
    if (formData.leaseTerms) {
        transformedData.leaseTerms = {
            leaseAmount: {
                amount: formData.leaseTerms.leaseAmount?.amount ?? 0,
                duration: formData.leaseTerms.leaseAmount?.duration ?? 0,
                durationType: formData.leaseTerms.leaseAmount?.durationType ?? "month",

                amountType: formData.leaseTerms.leaseAmount?.amountType ?? "fixed",
            },
            leaseTenure: {
                minimumTenure: formData.leaseTerms.leaseTenure?.minimumTenure ?? "",
                minimumUnit: formData.leaseTerms.leaseTenure?.minimumUnit ?? "",
                maximumTenure: formData.leaseTerms.leaseTenure?.maximumTenure ?? "",
                maximumUnit: formData.leaseTerms.leaseTenure?.maximumUnit ?? "",
                lockInPeriod: formData.leaseTerms.leaseTenure?.lockInPeriod ?? "",
                lockInUnit: formData.leaseTerms.leaseTenure?.lockInUnit ?? "",
                noticePeriod: formData.leaseTerms.leaseTenure?.noticePeriod ?? "",
                noticePeriodUnit: formData.leaseTerms.leaseTenure?.noticePeriodUnit ?? ""
            }
        }
    }
        
        
    

    // Brokerage
    

    // Availability
    if (formData.availability) {
        transformedData.availability = {
            availableFrom: formData.availability.availableFrom ?? new Date(),
            availableImmediately: formData.availability.availableImmediately ?? false,
            availabilityStatus: formData.availability.availabilityStatus ?? 'later',
            leaseDuration: formData.availability.leaseDuration ?? '',
            noticePeriod: formData.availability.noticePeriod ?? '',
            isPetsAllowed: formData.availability.isPetsAllowed ?? false,
            operatingHours: formData.availability.operatingHours ?? false
        };
    }

    // Contact Information
    if (formData.contactInformation) {
        transformedData.contactInformation = {
            name: formData.contactInformation.name ?? '',
            email: formData.contactInformation.email ?? '',
            phone: formData.contactInformation.phone ?? '',
            alternatePhone: formData.contactInformation.alternatePhone ?? '',
            bestTimeToContact: formData.contactInformation.bestTimeToContact ?? ''
        };
    }

    // Media
    if (formData.media) {
        transformedData.media = {
            photos: {
                exterior: Array.isArray(formData.media.photos?.exterior)
                    ? formData.media.photos.exterior
                    : [],
            },
            videoTour: formData.media.videoTour ?? '',
            documents: Array.isArray(formData.media.documents)
                ? formData.media.documents
                : []
        };
    }

    // Metadata
    if (formData.metadata) {
        transformedData.metadata = {
            createdBy: formData.metadata.createdBy ?? null,
            createdAt: formData.metadata.createdAt ?? new Date(),
            userName: formData.metadata.userName ?? ''
        };
    }

    console.log("Transformed data:", JSON.stringify(transformedData, null, 2));
    return transformedData;
};

// Create a new commercial lease plot listing
export const createLeasePlot = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Received lease plot data:', formData);

        // Validate required fields
        if (!formData.basicInformation || !formData.basicInformation.title) {
            return res.status(400).json({
                success: false,
                error: 'Property name is required'
            });
        }

        // Transform frontend data to match backend schema
        const transformedData = transformPlotData(formData);

        // Generate property ID
        const propertyId = await generatePropertyId();
        console.log("Property ID:", propertyId);
        // Create the complete plot data
        const plotData = {
            propertyId,
            ...transformedData
        };

        // Create and save the plot
        const newLeasePlot = new LeasePlot(plotData);
        const savedLeasePlot = await newLeasePlot.save();

        // Return populated plot data with user information
        const populatedLeasePlot = await LeasePlot.findById(savedLeasePlot._id)
            .populate('metadata.createdBy', 'name email')
            .select('-__v');

        res.status(201).json({
            success: true,
            message: 'Commercial plot lease listing created successfully',
            data: populatedLeasePlot
        });
    } catch (error) {
        console.error('Error creating lease plot:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to create lease plot',
            message: (error as Error).message
        });
    }
};

// Get all commercial lease plots
export const getAllLeasePlots = async (req: Request, res: Response) => {
    try {
        const leasePlots = await LeasePlot.find()
            .populate('metadata.createdBy', 'name email')
            .select('-__v')
            .sort({ 'metadata.createdAt': -1 });

        res.status(200).json({
            success: true,
            count: leasePlots.length,
            data: leasePlots
        });
    } catch (error) {
        console.error('Error fetching lease plots:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve lease plots',
            message: (error as Error).message
        });
    }
};

// Get a specific commercial lease plot by ID
export const getLeasePlotById = async (req: Request, res: Response) => {
    try {
        const propertyId = req.params.propertyId;
        const leasePlot = await LeasePlot.findOne({ propertyId })
           .populate('metadata.createdBy', 'name email')
           .select('-__v');
             if (!leasePlot) {
            return res.status(404).json({
                success: false,
                error: 'Lease plot not found'
            });
        }

        res.status(200).json({
            success: true,
            data: leasePlot
        });
    } catch (error) {
        console.error('Error fetching lease plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve lease plot',
            message: (error as Error).message
        });
    }
}; 




  export const updatePlotById = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id;
      const updateData = req.body;
      
      const leasePlots= await LeasePlot.findOneAndUpdate(
        { propertyId },
        { $set: updateData },
        { new: true }
      );
      
      if (!leasePlots) {
        return res.status(404).json({ 
          success: false,
          error: 'lease plot property not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'lease plot property updated successfully',
        data: leasePlots
      });
    } catch (error) {
      console.error('Error updating lease plot property:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to update lease plot property' 
      });
    }
  };
  
  export const deleteLeasePlotById = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id;
      const leasePlots = await LeasePlot.findOneAndDelete({ propertyId });
      
      if (!leasePlots) {
        return res.status(404).json({ 
          success: false,
          error: 'lease plot property not found' 
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'lease plot property deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting lease plot property:', error);
      res.status(500).json({ 
        success: false,
        error: 'Failed to delete lease plot property' 
      });
    }
  }; 