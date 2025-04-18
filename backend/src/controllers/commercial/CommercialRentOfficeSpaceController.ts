import { Request, Response } from 'express';
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
            basicInformation: {
                title: formData.basicInformation?.title || "Office Space",
                officeType: formData.basicInformation?.officeType || ["commercial"],
                address: {
                    street: formData.basicInformation?.address?.street || "",
                    city: formData.basicInformation?.address?.city || "",
                    state: formData.basicInformation?.address?.state || "",
                    zipCode: formData.basicInformation?.address?.zipCode || ""
                },
                landmark: formData.basicInformation?.landmark || "",
                location: {
                    latitude: formData.basicInformation?.location?.latitude || 0,
                    longitude: formData.basicInformation?.location?.longitude || 0
                },
                isCornerProperty: formData.basicInformation?.isCornerProperty || false
            },
            officeDetails: {
                seatingCapacity: parseInt(formData.officeDetails?.seatingCapacity) || 0,
                cabins: {
                    available: formData.officeDetails?.cabins?.available || false,
                    count: parseInt(formData.officeDetails?.cabins?.count) || 0
                },
                conferenceRoom: formData.officeDetails?.conferenceRoom || false,
                meetingRoom: formData.officeDetails?.meetingRoom || false,
                receptionArea: formData.officeDetails?.receptionArea || false,
                wifiSetup: formData.officeDetails?.wifiSetup || false,
                serverRoom: formData.officeDetails?.serverRoom || false,
                coworkingFriendly: formData.officeDetails?.coworkingFriendly || false
            },
            propertyDetails: {
                area: {
                    totalArea: parseInt(formData.propertyDetails?.area?.totalArea) || 0,
                    carpetArea: parseInt(formData.propertyDetails?.area?.carpetArea) || 0,
                    builtUpArea: parseInt(formData.propertyDetails?.area?.builtUpArea) || 0
                },
                floor: {
                    floorNumber: parseInt(formData.propertyDetails?.floor?.floorNumber) || 0,
                    totalFloors: parseInt(formData.propertyDetails?.floor?.totalFloors) || 0
                },
                facingDirection: formData.propertyDetails?.facingDirection || "",
                furnishingStatus: formData.propertyDetails?.furnishingStatus || "",
                propertyAmenities: formData.propertyDetails?.propertyAmenities || [],
                wholeSpaceAmenities: formData.propertyDetails?.wholeSpaceAmenities || [],
                electricitySupply: {
                    powerLoad: parseInt(formData.propertyDetails?.electricitySupply?.powerLoad) || 0,
                    backup: formData.propertyDetails?.electricitySupply?.backup || false
                },
                waterAvailability: formData.propertyDetails?.waterAvailability || "",
                propertyAge: parseInt(formData.propertyDetails?.propertyAge) || 0,
                propertyCondition: formData.propertyDetails?.propertyCondition || "new"
            },
            rentalTerms: {
                rentDetails: {
                    expectedRent: parseInt(formData.rentalTerms?.rentDetails?.expectedRent) || 0,
                    isNegotiable: formData.rentalTerms?.rentDetails?.isNegotiable || false,
                    rentType: formData.rentalTerms?.rentDetails?.rentType || "inclusive"
                },
                securityDeposit: {
                    amount: parseInt(formData.rentalTerms?.securityDeposit?.amount) || 0
                },
                maintenanceAmount: {
                    amount: parseInt(formData.rentalTerms?.maintenanceAmount?.amount) || 0,
                    frequency: formData.rentalTerms?.maintenanceAmount?.frequency || "monthly"
                },
                otherCharges: {
                    water: {
                        amount: parseInt(formData.rentalTerms?.otherCharges?.water?.amount) || 0,
                        type: formData.rentalTerms?.otherCharges?.water?.type || "inclusive"
                    },
                    electricity: {
                        amount: parseInt(formData.rentalTerms?.otherCharges?.electricity?.amount) || 0,
                        type: formData.rentalTerms?.otherCharges?.electricity?.type || "inclusive"
                    },
                    gas: {
                        amount: parseInt(formData.rentalTerms?.otherCharges?.gas?.amount) || 0,
                        type: formData.rentalTerms?.otherCharges?.gas?.type || "inclusive"
                    },
                    others: {
                        amount: parseInt(formData.rentalTerms?.otherCharges?.others?.amount) || 0,
                        type: formData.rentalTerms?.otherCharges?.others?.type || "inclusive"
                    }
                },
                brokerage: {
                    required: formData.rentalTerms?.brokerage?.required || "no",
                    amount: parseInt(formData.rentalTerms?.brokerage?.amount) || 0
                },
                availability: {
                    type: formData.rentalTerms?.availability?.type || "immediate",
                    date: formData.rentalTerms?.availability?.date || null
                }
            },
            availability: {
                availableFrom: formData.availability?.availableFrom || null,
                availableImmediately: formData.availability?.availableImmediately || true
            },
            contactInformation: {
                name: formData.contactInformation?.name || "",
                email: formData.contactInformation?.email || "",
                phone: formData.contactInformation?.phone || "",
                alternatePhone: formData.contactInformation?.alternatePhone || "",
                bestTimeToContact: formData.contactInformation?.bestTimeToContact || ""
            },
            media: {
                photos: {
                    exterior: formData.media?.photos?.exterior || [],
                    interior: formData.media?.photos?.interior || [],
                    floorPlan: formData.media?.photos?.floorPlan || [],
                    washrooms: formData.media?.photos?.washrooms || [],
                    lifts: formData.media?.photos?.lifts || [],
                    emergencyExits: formData.media?.photos?.emergencyExits || []
                },
                videoTour: formData.media?.videoTour || "",
                documents: formData.media?.documents || []
            },
            metadata: {
                createdBy: req.user?._id || null,
                createdAt: new Date()
            }
        };

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
        const officeSpace = await CommercialOfficeSpace.findById(req.params.id);

        if (!officeSpace) {
            return res.status(404).json({
                success: false,
                message: 'Office space listing not found'
            });
        }

        res.status(200).json({
            success: true,
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
        const officeSpace = await CommercialOfficeSpace.findById(req.params.id);

        if (!officeSpace) {
            return res.status(404).json({
                success: false,
                message: 'Office space listing not found'
            });
        }

        // Update metadata
        req.body.metadata = {
            ...officeSpace.metadata,
            updatedAt: new Date()
        };

        const updatedOfficeSpace = await CommercialOfficeSpace.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Office space listing updated successfully',
            data: updatedOfficeSpace
        });
    } catch (error) {
        console.error('Error updating office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Delete office space listing
export const deleteOfficeSpace = async (req: Request, res: Response) => {
    try {
        const officeSpace = await CommercialOfficeSpace.findById(req.params.id);

        if (!officeSpace) {
            return res.status(404).json({
                success: false,
                message: 'Office space listing not found'
            });
        }

        await officeSpace.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Office space listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
