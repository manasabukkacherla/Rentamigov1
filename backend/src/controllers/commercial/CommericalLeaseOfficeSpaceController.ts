import { Request, Response } from 'express';
import CommercialLeaseOfficeSpace from '../../models/commercial/CommercialLeaseOfficeSpace';
import _ from "lodash"; // install via: npm i lodash

// Generate a unique property ID for new office space listings
const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial lease office space property ID
        const prefix = "RA-COMLEOS";

        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialLeaseOfficeSpace.findOne({
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
        const existingWithExactId = await CommercialLeaseOfficeSpace.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialLeaseOfficeSpace.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMLEOS${timestamp}`;
    }
};

// Create a new commercial lease office space listing
export const createLeaseOfficeSpace = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Received form data:', formData);

        // Generate property ID
        const propertyId = await generatePropertyId();

        let cabinsDetails = undefined;
        if (formData.officeSpaceDetails?.cabins === 'Available') {
          cabinsDetails = {
            count: parseInt(formData.officeSpaceDetails?.cabinsDetails?.count) || 0,
            sizes: typeof formData.officeSpaceDetails?.cabinsDetails?.sizes === 'string'
              ? formData.officeSpaceDetails?.cabinsDetails?.sizes.split(',').map((s: string) => s.trim())
              : formData.officeSpaceDetails?.cabinsDetails?.sizes || [],
            description: formData.officeSpaceDetails?.cabinsDetails?.description || ''
          };
        }

        // Prepare lease office space data with all required fields
        const leaseOfficeSpaceData = {
            propertyId,
            basicInformation: {
                title: formData.basicInformation?.title || "Lease Office Space",
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
            officeSpaceDetails: {
                seatingcapacity: parseInt(formData.officeSpaceDetails?.seatingcapacity) || 0,
                cabins: formData.officeSpaceDetails?.cabins || 'Not Available',
                meetingrooms: formData.officeSpaceDetails?.meetingrooms || 'Not Available',
                conferenceRooms: formData.officeSpaceDetails?.conferenceRooms || 'Not Available',
                receptionarea: formData.officeSpaceDetails?.receptionarea || 'Not Available',
                wifi: formData.officeSpaceDetails?.wifi || 'Not Available',
                serverroom: formData.officeSpaceDetails?.serverroom || 'Not Available',
                coworkingfriendly: formData.officeSpaceDetails?.coworkingfriendly || 'Not Available',
                ...(cabinsDetails && { cabinsDetails })
            },
            propertyDetails: {
                area: {
                    totalArea: parseInt(formData.propertyDetails?.area?.totalArea) || 0,
                    builtUpArea: parseInt(formData.propertyDetails?.area?.builtUpArea) || 0,
                    carpetArea: parseInt(formData.propertyDetails?.area?.carpetArea) || 0
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
                propertyAge: formData.propertyDetails?.propertyAge || "",
                propertyCondition: formData.propertyDetails?.propertyCondition || ""
            },
            leaseTerms: {
                leaseDetails: {
                    leaseAmount: {
                        amount: parseInt(formData.leaseTerms?.leaseDetails?.leaseAmount?.amount) || 0,
                        type: formData.leaseTerms?.leaseDetails?.leaseAmount?.type || "Fixed",
                        duration: parseInt(formData.leaseTerms?.leaseDetails?.leaseAmount?.duration) || 0,
                        durationUnit: formData.leaseTerms?.leaseDetails?.leaseAmount?.durationUnit || "months"
                    }
                },
                tenureDetails: {
                    minimumTenure: parseInt(formData.leaseTerms?.tenureDetails?.minimumTenure) || 0,
                    minimumUnit: formData.leaseTerms?.tenureDetails?.minimumUnit || "months",
                    maximumTenure: parseInt(formData.leaseTerms?.tenureDetails?.maximumTenure) || 0,
                    maximumUnit: formData.leaseTerms?.tenureDetails?.maximumUnit || "years",
                    lockInPeriod: parseInt(formData.leaseTerms?.tenureDetails?.lockInPeriod) || 0,
                    lockInUnit: formData.leaseTerms?.tenureDetails?.lockInUnit || "months",
                    noticePeriod: parseInt(formData.leaseTerms?.tenureDetails?.noticePeriod) || 0,
                    noticePeriodUnit: formData.leaseTerms?.tenureDetails?.noticePeriodUnit || "months"
                },
                maintenanceAmount: {
                    amount: parseInt(formData.leaseTerms?.maintenanceAmount?.amount) || 0,
                    frequency: formData.leaseTerms?.maintenanceAmount?.frequency || "Monthly"
                },
                otherCharges: {
                    electricityCharges: {
                        type: formData.leaseTerms?.otherCharges?.electricityCharges?.type || "inclusive",
                        amount: parseInt(formData.leaseTerms?.otherCharges?.electricityCharges?.amount) || 0
                    },
                    waterCharges: {
                        type: formData.leaseTerms?.otherCharges?.waterCharges?.type || "inclusive",
                        amount: parseInt(formData.leaseTerms?.otherCharges?.waterCharges?.amount) || 0
                    },
                    gasCharges: {
                        type: formData.leaseTerms?.otherCharges?.gasCharges?.type || "inclusive",
                        amount: parseInt(formData.leaseTerms?.otherCharges?.gasCharges?.amount) || 0
                    },
                    otherCharges: {
                        type: formData.leaseTerms?.otherCharges?.otherCharges?.type || "inclusive",
                        amount: parseInt(formData.leaseTerms?.otherCharges?.otherCharges?.amount) || 0
                    }
                },
                brokerage: {
                    required: formData.leaseTerms?.brokerage?.required || "no",
                    amount: parseInt(formData.leaseTerms?.brokerage?.amount) || 0
                },
                availability: {
                    availableFrom: formData.leaseTerms?.availability?.availableFrom || new Date(),
                    availableImmediately: formData.leaseTerms?.availability?.availableImmediately || true,
                    leaseDuration: formData.leaseTerms?.availability?.leaseDuration || "",
                    noticePeriod: formData.leaseTerms?.availability?.noticePeriod || "",
                    petsAllowed: formData.leaseTerms?.availability?.petsAllowed || false,
                    operatingHours: formData.leaseTerms?.availability?.operatingHours || false
                }
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
                createdAt: new Date(),
                // status: 'active',
                // views: 0,
                // favorites: 0,
                // isVerified: false
            }
        };

        console.log('Prepared lease office space data:', leaseOfficeSpaceData);

        // Create new lease office space listing
        const leaseOfficeSpace = new CommercialLeaseOfficeSpace(leaseOfficeSpaceData);
        await leaseOfficeSpace.save();

        console.log('Lease office space saved successfully:', leaseOfficeSpace);

        res.status(201).json({
            success: true,
            message: 'Lease office space listing created successfully',
            data: leaseOfficeSpace
        });
    } catch (error) {
        console.error('Error creating lease office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create lease office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get all lease office space listings
export const getLeaseOfficeSpaces = async (req: Request, res: Response) => {
    try {
        const leaseOfficeSpaces = await CommercialLeaseOfficeSpace.find({}).sort({ 'metadata.createdAt': -1 });

        res.status(200).json({
            success: true,
            count: leaseOfficeSpaces.length,
            data: leaseOfficeSpaces
        });
    } catch (error) {
        console.error('Error fetching lease office spaces:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch lease office space listings',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Get single lease office space listing
export const getLeaseOfficeSpaceById = async (req: Request, res: Response) => {
  try {
   const propertyId = req.params.propertyId;
 

    const leaseOfficeSpace = await CommercialLeaseOfficeSpace.findOne({propertyId});

    if (!leaseOfficeSpace) {
      return res.status(404).json({
        success: false,
        message: "Lease office space listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: leaseOfficeSpace,
    });
  } catch (error) {
    console.error("Error fetching lease office space by ID:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch lease office space listing",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateLeaseOfficeSpace = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id; // This is the _id of the document

    // Validate request body
    const incomingData = req.body?.data;
    if (!incomingData) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update.",
      });
    }

    // Step 1: Clean the incoming data (remove all _id and __v fields)
    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => {
        if (key === "_id" || key === "__v") return undefined;
        return value;
      })
    );

    // Step 2: Fetch existing document using _id
    const existingDoc = await CommercialLeaseOfficeSpace.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Step 3: Deep merge the existing document with cleaned incoming data
    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    // Step 4: Perform the update
    const updatedDoc = await CommercialLeaseOfficeSpace.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Lease office space updated successfully.",
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

// Delete a lease office space listing
export const deleteLeaseOfficeSpace = async (req: Request, res: Response) => {
    try {
        const leaseOfficeSpace = await CommercialLeaseOfficeSpace.findByIdAndDelete(req.params.id);

        if (!leaseOfficeSpace) {
            return res.status(404).json({
                success: false,
                message: 'Lease office space listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lease office space listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lease office space:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease office space listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// // Search lease office spaces based on criteria
// export const searchLeaseOfficeSpaces = async (req: Request, res: Response) => {
//     try {
//         const {
//             city,
//             state,
//             minPrice,
//             maxPrice,
//             seatingCapacity,
//             hasCabins,
//             hasMeetingRooms,
//             hasConferenceRooms
//         } = req.query;

//         // Build the query object
//         const query: any = {};

//         // Location filters
//         if (city) query['basicInformation.address.city'] = { $regex: city, $options: 'i' };
//         if (state) query['basicInformation.address.state'] = { $regex: state, $options: 'i' };

//         // Price range filter
//         if (minPrice || maxPrice) {
//             query['leaseTerms.leaseDetails.leaseAmount.amount'] = {};
//             if (minPrice) query['leaseTerms.leaseDetails.leaseAmount.amount'].$gte = parseInt(minPrice as string);
//             if (maxPrice) query['leaseTerms.leaseDetails.leaseAmount.amount'].$lte = parseInt(maxPrice as string);
//         }

//         // Seating capacity filter
//         if (seatingCapacity) {
//             query['officeSpaceDetails.seatingcapacity'] = { $gte: parseInt(seatingCapacity as string) };
//         }

//         // Facility filters
//         if (hasCabins === 'true') query['officeSpaceDetails.cabins'] = 'Available';
//         if (hasMeetingRooms === 'true') query['officeSpaceDetails.meetingrooms'] = 'Available';
//         if (hasConferenceRooms === 'true') query['officeSpaceDetails.conferenceRooms'] = 'Available';

//         // Execute the query
//         const leaseOfficeSpaces = await CommercialLeaseOfficeSpace.find(query)
//             .sort({ 'metadata.createdAt': -1 });

//         res.status(200).json({
//             success: true,
//             count: leaseOfficeSpaces.length,
//             data: leaseOfficeSpaces
//         });
//     } catch (error) {
//         console.error('Error searching lease office spaces:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to search lease office space listings',
//             message: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// }; 


// Update a lease office space listing
// export const updateLeaseOfficeSpace = async (req: Request, res: Response) => {
//     try {
//         const formData = req.body;
//         console.log('Received update data:', formData);

//         // Handle cabins details if cabins are available
//         let cabinsDetails = undefined;
//         if (formData.officeSpaceDetails?.cabins === 'Available') {
//             cabinsDetails = {
//                 count: parseInt(formData.officeSpaceDetails?.cabinsDetails?.count) || 0,
//                 sizes: formData.officeSpaceDetails?.cabinsDetails?.sizes || [],
//                 description: formData.officeSpaceDetails?.cabinsDetails?.description || ''
//             };

//             // Add cabinsDetails to the formData if it exists
//             if (formData.officeSpaceDetails) {
//                 formData.officeSpaceDetails.cabinsDetails = cabinsDetails;
//             }
//         } else if (formData.officeSpaceDetails) {
//             // Remove cabinsDetails if cabins are not available
//             delete formData.officeSpaceDetails.cabinsDetails;
//         }

//         // Update the document with the new data
//         const updatedLeaseOfficeSpace = await CommercialLeaseOfficeSpace.findByIdAndUpdate(
//             req.params.id,
//             { $set: formData },
//             { new: true, runValidators: true }
//         );

//         if (!updatedLeaseOfficeSpace) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Lease office space listing not found'
//             });
//         }

//         console.log('Lease office space updated successfully:', updatedLeaseOfficeSpace);

//         res.status(200).json({
//             success: true,
//             message: 'Lease office space listing updated successfully',
//             data: updatedLeaseOfficeSpace
//         });
//     } catch (error) {
//         console.error('Error updating lease office space:', error);
//         res.status(500).json({
//             success: false,
//             error: 'Failed to update lease office space listing',
//             message: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// };