import { Request, Response } from 'express';
import CommercialSellOfficeSpace from '../../models/commercial/CommercialSellOfficeSpace';

/**
 * Generates a unique property ID for sell office space
 */
const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial sell office space property ID
        const prefix = "RA-COMSEOS";

        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialSellOfficeSpace.findOne({
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
        const existingWithExactId = await CommercialSellOfficeSpace.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialSellOfficeSpace.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMSEOS${timestamp}`;
    }
};

/**
 * Create a new sell office space listing
 */
export const createSellOfficeSpace = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);

        // Generate property ID
        const propertyId = await generatePropertyId();

        // Prepare office space data with all required fields
        const officeSpaceData = {
            propertyId,
            basicInformation: {
                title: formData.basicInformation?.title || "Office Space for Sale",
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
                waterAvailability: formData.propertyDetails?.waterAvailability || [],
                propertyAge: parseInt(formData.propertyDetails?.propertyAge) || 0,
                propertyCondition: formData.propertyDetails?.propertyCondition || "new"
            },
            price: {
                expectedPrice: parseInt(formData.price?.expectedPrice) || 0,
                isNegotiable: formData.price?.isNegotiable || false
            },
            registrationCharges: {
                included: formData.registrationCharges?.included || false,
                amount: parseInt(formData.registrationCharges?.amount) || 0,
                stampDuty: parseInt(formData.registrationCharges?.stampDuty) || 0
            },
            brokerage: {
                required: formData.brokerage?.required || "no",
                amount: parseInt(formData.brokerage?.amount) || 0
            },
            availability: {
                type: formData.availability?.type || "immediate",
                date: formData.availability?.date || null
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

        console.log('Prepared sell office space data:', officeSpaceData);

        // Create new sell office space listing
        const officeSpace = new CommercialSellOfficeSpace(officeSpaceData);
        await officeSpace.save();

        console.log('Sell office space saved successfully:', officeSpace);

        res.status(201).json({
            success: true,
            message: 'Sell office space listing created successfully',
            data: officeSpace
        });
    } catch (error) {
        console.error('Error creating sell office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create sell office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

