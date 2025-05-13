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
            title: formData.basicInformation.title || '',
            plotType: Array.isArray(formData.basicInformation.plotType) 
                ? formData.basicInformation.plotType 
                : (formData.basicInformation.plotType ? [formData.basicInformation.plotType] : []),
            address: {
                street: formData.basicInformation.address?.street || '',
                city: formData.basicInformation.address?.city || '',
                state: formData.basicInformation.address?.state || '',
                zipCode: formData.basicInformation.address?.zipCode || ''
            },
            landmark: formData.basicInformation.landmark || '',
            coordinates: {
                latitude: parseFloat(formData.basicInformation.coordinates?.latitude) || 0,
                longitude: parseFloat(formData.basicInformation.coordinates?.longitude) || 0
            },
            isCornerProperty: Boolean(formData.basicInformation.isCornerProperty)
        };
    }

    // Property Details
    if (formData.propertyDetails) {
        transformedData.propertyDetails = {
            area: {
                totalArea: parseFloat(formData.propertyDetails.area?.totalArea) || 0,
                carpetArea: parseFloat(formData.propertyDetails.area?.carpetArea) || 0,
                builtUpArea: parseFloat(formData.propertyDetails.area?.builtUpArea) || 0
            },
            floor: {
                floorNumber: parseInt(formData.propertyDetails.floor?.floorNumber) || 0,
                totalFloors: parseInt(formData.propertyDetails.floor?.totalFloors) || 0
            },
            facingDirection: formData.propertyDetails.facingDirection || '',
            furnishingStatus: formData.propertyDetails.furnishingStatus || '',
            propertyAmenities: Array.isArray(formData.propertyDetails.propertyAmenities) 
                ? formData.propertyDetails.propertyAmenities 
                : [],
            wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities || ''
        };
    }

    // Plot Details
    if (formData.plotDetails) {
        transformedData.plotDetails = {
            totalPlotArea: parseFloat(formData.plotDetails.totalPlotArea) || 0,
            zoningType: formData.plotDetails.zoningType || "commercial",
            infrastructure: Array.isArray(formData.plotDetails.infrastructure) 
                ? formData.plotDetails.infrastructure 
                : [],
            roadAccess: formData.plotDetails.roadAccess || "",
            securityRoom: Boolean(formData.plotDetails.securityRoom),
            previousConstruction: formData.plotDetails.previousConstruction || ""
        };
    }

    // Lease Details
    if (formData.leaseDetails) {
        transformedData.leaseDetails = {
            leaseAmount: parseFloat(formData.leaseDetails.leaseAmount) || 0,
            leaseduration: {
                duration: parseInt(formData.leaseDetails.leaseduration?.duration) || 0,
                type: formData.leaseDetails.leaseduration?.type || 'month',
                amountType: formData.leaseDetails.leaseduration?.amountType || 'fixed'
            },
            leasetenure: {
                minimumTenure: {
                    duration: parseInt(formData.leaseDetails.leasetenure?.minimumTenure?.duration) || 0,
                    type: formData.leaseDetails.leasetenure?.minimumTenure?.type || 'month'
                },
                maximumTenure: {
                    duration: parseInt(formData.leaseDetails.leasetenure?.maximumTenure?.duration) || 0,
                    type: formData.leaseDetails.leasetenure?.maximumTenure?.type || 'month'
                },
                lockInPeriod: {
                    duration: parseInt(formData.leaseDetails.leasetenure?.lockInPeriod?.duration) || 0,
                    type: formData.leaseDetails.leasetenure?.lockInPeriod?.type || 'month'
                },
                noticePeriod: {
                    duration: parseInt(formData.leaseDetails.leasetenure?.noticePeriod?.duration) || 0,
                    type: formData.leaseDetails.leasetenure?.noticePeriod?.type || 'month'
                }
            },
            maintenanceCharges: {
                amount: parseFloat(formData.leaseDetails.maintenanceCharges?.amount) || 0,
                frequency: formData.leaseDetails.maintenanceCharges?.frequency || 'monthly'
            },
            otherCharges: {
                electricityCharges: {
                    type: formData.leaseDetails.otherCharges?.electricityCharges?.type || 'inclusive',
                    amount: parseFloat(formData.leaseDetails.otherCharges?.electricityCharges?.amount) || 0
                },
                waterCharges: {
                    type: formData.leaseDetails.otherCharges?.waterCharges?.type || 'inclusive',
                    amount: parseFloat(formData.leaseDetails.otherCharges?.waterCharges?.amount) || 0
                },
                gasCharges: {
                    type: formData.leaseDetails.otherCharges?.gasCharges?.type || 'inclusive',
                    amount: parseFloat(formData.leaseDetails.otherCharges?.gasCharges?.amount) || 0
                },
                otherCharges: formData.leaseDetails.otherCharges?.otherCharges || 'inclusive',
                amount: parseFloat(formData.leaseDetails.otherCharges?.amount) || 0
            }
        };
    }

    // Brokerage
    if (formData.brokerage) {
        transformedData.brokerage = {
            required: Boolean(formData.brokerage.required),
            amount: parseFloat(formData.brokerage.amount) || 0
        };
    }

    // Availability
    if (formData.availability) {
        transformedData.availability = {
            availableFrom: formData.availability.availableFrom || new Date(),
            availableImmediately: Boolean(formData.availability.availableImmediately),
            availabilityStatus: formData.availability.availabilityStatus || 'later',
            leaseDuration: formData.availability.leaseDuration || '',
            noticePeriod: formData.availability.noticePeriod || '',
            isPetsAllowed: Boolean(formData.availability.isPetsAllowed),
            operatingHours: formData.availability.operatingHours || false
            
        };
    }

    // Contact Information
    if (formData.contactInformation) {
        transformedData.contactInformation = {
            name: formData.contactInformation.name || '',
            email: formData.contactInformation.email || '',
            phone: formData.contactInformation.phone || '',
            alternatePhone: formData.contactInformation.alternatePhone || '',
            preferredContactTime: formData.contactInformation.preferredContactTime || '',
            bestTimeToContact: formData.contactInformation.bestTimeToContact || ''
        };
    }

    // Media
    if (formData.media) {
        transformedData.media = {
            photos: {
                exterior: Array.isArray(formData.media.photos?.exterior) 
                    ? formData.media.photos.exterior 
                    : [],
                interior: Array.isArray(formData.media.photos?.interior) 
                    ? formData.media.photos.interior 
                    : [],
                floorPlan: Array.isArray(formData.media.photos?.floorPlan) 
                    ? formData.media.photos.floorPlan 
                    : [],
                washroom: Array.isArray(formData.media.photos?.washroom) 
                    ? formData.media.photos.washroom 
                    : [],
                lift: Array.isArray(formData.media.photos?.lift) 
                    ? formData.media.photos.lift 
                    : [],
                emergencyExit: Array.isArray(formData.media.photos?.emergencyExit) 
                    ? formData.media.photos.emergencyExit 
                    : []
            },
            videoTour: formData.media.videoTour || '',
            documents: Array.isArray(formData.media.documents) 
                ? formData.media.documents 
                : []
        };
    }

    // Metadata
    if (formData.metadata) {
        transformedData.metadata = {
            userId: formData.metadata.userId,
            createdAt: formData.metadata.createdAt || new Date(),
            userName: formData.metadata.userName
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
            .populate('metadata.userId', 'name email')
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
            .populate('metadata.userId', 'name email')
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
        const leasePlot = await LeasePlot.findById(req.params.id)
            .populate('metadata.userId', 'name email')
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