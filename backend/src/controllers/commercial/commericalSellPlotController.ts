import { Request, Response } from 'express';
import SellPlot from '../../models/commercial/commercialsellplot';
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
        const prefix = "RA-COMSEPL";
        const highestPlot = await SellPlot.findOne({
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

        const existingWithExactId = await SellPlot.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await SellPlot.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMSEPL${timestamp}`;
    }
};

const transformPlotData = (formData: any) => {
    // Create a transformed plot object that matches our schema
    const transformedData: any = {};

    // Basic Information
    if (formData.basicInformation) {
        transformedData.basicInformation = {
            title: formData.basicInformation.propertyName,
            plotType: Array.isArray(formData.basicInformation.plotType)
                ? formData.basicInformation.plotType[0]
                : formData.basicInformation.plotType || 'Commercial',
            address: formData.basicInformation.address.street,
            landmark: formData.basicInformation.landmark,
            city: formData.basicInformation.address.city,
            state: formData.basicInformation.address.state,
            zipCode: formData.basicInformation.address.zipCode,
            latitude: parseFloat(formData.basicInformation.coordinates.latitude) || 0,
            longitude: parseFloat(formData.basicInformation.coordinates.longitude) || 0,
            isCornerProperty: formData.basicInformation.isCornerProperty
        };
    }

    // Plot Details
    if (formData.plotDetails) {
        // Ensure totalArea is always set with a valid number
        const totalArea = formData.plotDetails.totalArea || formData.plotDetails.plotArea || 0;

        // Ensure zoningType is set with a valid string value
        const zoningType = formData.plotDetails.zoningType ||
            formData.plotDetails.landUseZoning ||
            'commercial';

        transformedData.plotDetails = {
            totalArea: totalArea,
            lengthOfPlot: formData.plotDetails.lengthOfPlot || 0,
            widthOfPlot: formData.plotDetails.widthOfPlot || 0,
            plotFacing: formData.plotDetails.plotFacing || '',
            roadWidth: formData.plotDetails.roadWidth || 0,
            zoningType: zoningType,
            floorAreaRatio: formData.plotDetails.floorAreaRatio || 0,
            landmarkProximity: formData.plotDetails.landmarkProximity || [],
            approvals: formData.plotDetails.approvals || [],
            infrastructure: {
                boundaryWall: Boolean(formData.plotDetails.boundaryWall),
                waterConnection: false,
                electricityConnection: false
            },
            security: {
                securityRoom: false
            },
            previousConstruction: false
        };
    } else {
        // If plotDetails is missing, create a minimal object with required fields
        transformedData.plotDetails = {
            totalArea: 0,
            zoningType: 'commercial',
            infrastructure: {
                boundaryWall: false,
                waterConnection: false,
                electricityConnection: false
            },
            security: {
                securityRoom: false
            },
            previousConstruction: false
        };
    }

    // Property Details
    if (formData.propertyDetails) {
        transformedData.propertyDetails = {
            area: {
                totalArea: formData.propertyDetails.area.totalArea || 0,
                carpetArea: formData.propertyDetails.area.carpetArea || 0,
                builtUpArea: formData.propertyDetails.area.builtUpArea || 0
            },
            zoning: formData.plotDetails?.zoningType || formData.plotDetails?.landUseZoning || 'Commercial',
            facingDirection: formData.propertyDetails.facingDirection || '',
            waterAvailability: formData.propertyDetails.waterAvailability || '',
            ownershipType: formData.propertyDetails.ownershipType || '',
            propertyCondition: formData.propertyDetails.propertyCondition || '',
            permissibleFAR: formData.plotDetails?.floorAreaRatio || 0,
            permissibleHeight: 0,
            groundCoverage: 0,
            setback: {
                front: 0,
                rear: 0,
                sides: 0
            }
        };
    } else {
        // Create default property details if missing
        transformedData.propertyDetails = {
            area: {
                totalArea: 0,
                carpetArea: 0,
                builtUpArea: 0
            },
            zoning: 'Commercial',
            permissibleFAR: 0,
            permissibleHeight: 0,
            groundCoverage: 0,
            setback: {
                front: 0,
                rear: 0,
                sides: 0
            }
        };
    }

    // Pricing Details
    if (formData.pricingDetails) {
        transformedData.pricingDetails = {
            propertyPrice: formData.pricingDetails.propertyPrice || 0,
            priceType: formData.pricingDetails.priceType || 'fixed',
            area: formData.pricingDetails.area || 0,
            totalPrice: formData.pricingDetails.totalPrice || 0,
            pricePerSqFt: formData.pricingDetails.pricePerSqft || 0
        };
    } else {
        transformedData.pricingDetails = {
            propertyPrice: 0,
            priceType: 'fixed',
            area: 0,
            totalPrice: 0,
            pricePerSqFt: 0
        };
    }

    // Registration - this is missing in many cases, so ensure it's always defined
    const registrationType =
        (formData.registration?.type ||
            formData.registration?.chargesType ||
            'inclusive');

    transformedData.registration = {
        type: registrationType,
        registrationCharges: formData.registration?.registrationAmount || 0,
        stampDutyCharges: formData.registration?.stampDutyAmount || 0
    };

    // Brokerage
    if (formData.brokerage) {
        transformedData.brokerage = {
            required: formData.brokerage.required || 'no',
            amount: formData.brokerage.amount || 0
        };
    }

    // Availability
    if (formData.availability) {
        transformedData.availability = {
            availableFrom: formData.availability.availableFrom,
            availabilityStatus: formData.availability.availableImmediately ? 'immediate' : 'later',
            possessionDate: formData.availability.availableFrom ? new Date(formData.availability.availableFrom).toISOString() : new Date().toISOString(),
            availableImmediately: formData.availability.availableImmediately,
            leaseDuration: formData.availability.leaseDuration || '',
            noticePeriod: formData.availability.noticePeriod || '',
            petsAllowed: Boolean(formData.availability.petsAllowed),
            operatingHours: formData.availability.operatingHours || { restricted: false, restrictions: '' },
            bookingAmount: 0
        };
    } else {
        transformedData.availability = {
            availabilityStatus: 'later',
            possessionDate: new Date().toISOString(),
            bookingAmount: 0
        };
    }

    // Contact Information
    if (formData.contactInformation) {
        transformedData.contactInformation = {
            name: formData.contactInformation.name,
            email: formData.contactInformation.email,
            phone: formData.contactInformation.phone,
            alternatePhone: formData.contactInformation.alternatePhone || '',
            bestTimeToContact: formData.contactInformation.bestTimeToContact || ''
        };
    } else {
        transformedData.contactInformation = {
            name: 'Not provided',
            email: 'info@rentamigo.com',
            phone: '0000000000'
        };
    }

    // Media
    if (formData.media) {
        transformedData.media = {
            photos: {
                plot: [
                    ...(formData.media.photos?.exterior || []),
                    ...(formData.media.photos?.interior || [])
                ],
                surroundings: [
                    ...(formData.media.photos?.landscape || []),
                    ...(formData.media.photos?.adjacent || []),
                    ...(formData.media.photos?.aerialView || [])
                ],
                documents: formData.media.documents || [],
                floorPlans: formData.media.photos?.floorPlan || []
            },
            videoTour: formData.media.videoTour
        };
    } else {
        transformedData.media = {
            photos: {
                plot: [],
                surroundings: [],
                documents: []
            }
        };
    }

    // Metadata
    if (formData.metadata) {
        transformedData.metadata = {
            createdBy: formData.metadata.createdBy,
            createdAt: formData.metadata.createdAt || new Date()
        };
    }

    console.log("Transformed data:", JSON.stringify(transformedData, null, 2));
    return transformedData;
};

// Create a new commercial plot listing
export const createPlot = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Received plot data:', JSON.stringify(formData, null, 2));

        // Validate required fields
        if (!formData.basicInformation || !formData.basicInformation.propertyName) {
            return res.status(400).json({
                success: false,
                error: 'Property name is required'
            });
        }

        // Explicitly check for critical required fields in the request
        const criticalFields = [
            {
                path: 'plotDetails.zoningType',
                value: formData.plotDetails?.zoningType || formData.plotDetails?.landUseZoning
            },
            {
                path: 'plotDetails.totalArea',
                value: formData.plotDetails?.totalArea || formData.plotDetails?.plotArea
            },
            {
                path: 'registration.type',
                value: formData.registration?.type || formData.registration?.chargesType
            }
        ];

        // Log which fields might be missing for debugging
        const missingFields = criticalFields.filter(field => !field.value);
        if (missingFields.length > 0) {
            console.warn("Warning: Missing critical fields in request:",
                missingFields.map(f => `${f.path} is missing`).join(', '));
        }

        // Transform frontend data to match backend schema
        console.log("Transforming data to match schema...");
        const transformedData = transformPlotData(formData);

        // Generate property ID
        const propertyId = await generatePropertyId();
        console.log("Generated property ID:", propertyId);

        // Create the complete plot data
        const plotData = {
            propertyId,
            ...transformedData
        };

        // Validate the complete data against our schema before trying to save
        console.log("Pre-validating data...");
        const validationPlot = new SellPlot(plotData);

        try {
            await validationPlot.validate();
            console.log("Validation passed! Saving plot...");
        } catch (validationError: any) {
            console.error("Validation failed:", validationError);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: validationError.errors,
                message: validationError.message
            });
        }

        // Create and save the plot
        const newPlot = new SellPlot(plotData);
        const savedPlot = await newPlot.save();
        console.log("Plot saved successfully with ID:", savedPlot._id);

        // Return populated plot data with user information
        const populatedPlot = await SellPlot.findById(savedPlot._id)
            .populate('metadata.createdBy', 'name email')
            .select('-__v');

        res.status(201).json({
            success: true,
            message: 'Commercial plot listing created successfully',
            data: populatedPlot
        });
    } catch (error: any) {
        console.error('Error creating plot:', error);

        // Check if this is a MongoDB validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
                message: error.message
            });
        }

        // Handle other errors
        res.status(400).json({
            success: false,
            error: 'Failed to create plot',
            message: error.message
        });
    }
};

// Get all commercial plots
export const getAllPlots = async (req: Request, res: Response) => {
    try {
        const plots = await SellPlot.find()
            .populate('metadata.createdBy', 'name email')
            .select('-__v')
            .sort({ 'metadata.createdAt': -1 });

        res.status(200).json({
            success: true,
            count: plots.length,
            data: plots
        });
    } catch (error) {
        console.error('Error fetching plots:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve plots',
            message: (error as Error).message
        });
    }
};

// Get a specific commercial plot by ID
export const getPlotById = async (req: Request, res: Response) => {
    try {
        const plot = await SellPlot.findById(req.params.id)
            .populate('metadata.createdBy', 'name email')
            .select('-__v');

        if (!plot) {
            return res.status(404).json({
                success: false,
                error: 'Plot not found'
            });
        }

        res.status(200).json({
            success: true,
            data: plot
        });
    } catch (error) {
        console.error('Error fetching plot:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve plot',
            message: (error as Error).message
        });
    }
};


