import { Request, Response } from 'express';
import CommercialSellOthers from '../../models/commercial/CommercialSellOthers';
import _ from 'lodash';

// Generate property ID with format RA-COMSEOT-XXXX
const generatePropertyId = async (): Promise<string> => {
  const prefix = "RA-COMSEOT";
  try {
    const highestProperty = await CommercialSellOthers.findOne({
      'propertyId': { $regex: `^${prefix}\\d+$` }
    }).sort({ 'propertyId': -1 });
    
    let nextNumber = 1;
    
    if (highestProperty && highestProperty.propertyId) {
      const match = highestProperty.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    const existingWithExactId = await CommercialSellOthers.findOne({ propertyId });
    
    if (existingWithExactId) {
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialSellOthers.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}${timestamp}`;
  }
};

// Create a new commercial sell others property
export const createCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();

    // Use the createdBy from metadata (sent by frontend) for new properties
    const otherPropertyData = {
      ...formData,
      propertyId,
      metaData: {
        createdBy: formData.metadata?.createdBy, // Use the ID sent from frontend
        createdAt: new Date(),
        propertyType: 'Commercial',
        propertyName: 'Other',
        intent: 'Sell',
        status: 'Available',
      },
    };

    // Remove the original metadata field to avoid duplication
    delete otherPropertyData.metadata;

    const otherProperty = new CommercialSellOthers(otherPropertyData);
    await otherProperty.save();

    res.status(201).json({
      success: true,
      message: 'Commercial sell others property created successfully',
      data: otherProperty,
    });
  } catch (error: any) {
    console.error('Error creating commercial sell others listing:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create commercial sell others listing',
      error: error,
    });
  }
};

// Get all commercial sell others listings
export const getAllCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const others = await CommercialSellOthers.find({});
    
    res.status(200).json({
      success: true,
      count: others.length,
      data: others
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch commercial others sale listings'
    });
  }
};

// Get commercial sell others listing by ID
export const getCommercialSellOthersById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialSellOthers.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial sell others property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial sell others property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell others property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial sell others property' 
    });
  }
};
// Update commercial sell others property - FIXED
export const updateCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const incomingData = req.body;

    console.log("📥 Incoming update data:", JSON.stringify(incomingData, null, 2));

    if (!incomingData || Object.keys(incomingData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No data provided for update.',
      });
    }

    // Find existing document
    const existingDoc = await CommercialSellOthers.findOne({ propertyId });
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // AUTHORIZATION: Compare with the createdBy from the document
    const frontendUserId = incomingData.metadata?.createdBy;
    
    if (!frontendUserId) {
      return res.status(401).json({ 
        success: false, 
        message: 'User ID not provided in request.' 
      });
    }

    const existingCreatedBy = existingDoc.metaData?.createdBy?.toString();
    
    if (existingCreatedBy !== frontendUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this property.',
      });
    }

    // TRANSFORM DATA: Convert frontend structure to backend schema
    const transformedData = transformFrontendToBackend(incomingData);
    
    console.log("🔄 Transformed data:", JSON.stringify(transformedData, null, 2));

    // Clean the data - remove internal fields
    const cleanedData = JSON.parse(
      JSON.stringify(transformedData, (key, value) => {
        if (key === '_id' || key === '__v' || key === 'metadata') return undefined;
        return value;
      })
    );

    // Update the document
    const updatedDoc = await CommercialSellOthers.findOneAndUpdate(
      { propertyId },
      { $set: cleanedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Commercial sell others property updated successfully.',
      data: updatedDoc,
    });
  } catch (error: any) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown update error',
    });
  }
};

// Helper function to transform frontend data to backend schema
const transformFrontendToBackend = (frontendData: any) => {
  return {
    basicInformation: {
      title: frontendData.basicInformation?.title || '',
      type: frontendData.basicInformation?.plotType || [], // Map plotType to type
      address: frontendData.basicInformation?.address || {},
      landmark: frontendData.basicInformation?.landmark || '',
      location: { // Map coordinates to location
        latitude: frontendData.basicInformation?.coordinates?.latitude || '',
        longitude: frontendData.basicInformation?.coordinates?.longitude || ''
      },
      isCornerProperty: frontendData.basicInformation?.isCornerProperty || false
    },
    propertyDetails: {
      area: frontendData.propertyDetails?.area || {},
      floor: frontendData.propertyDetails?.floor || {},
      otherDetails: { // Provide default values for required fields
        propertyTypeDescription: frontendData.propertyDetails?.propertyTypeDescription || '',
        specialFeatures: frontendData.propertyDetails?.specialFeatures || '',
        usageRecommendation: frontendData.propertyDetails?.usageRecommendation || '',
        additionalRequirements: frontendData.propertyDetails?.additionalRequirements || ''
      },
      facingDirection: frontendData.propertyDetails?.facingDirection || '',
      furnishingStatus: frontendData.propertyDetails?.furnishingStatus || '',
      propertyAmenities: frontendData.propertyDetails?.propertyAmenities || [],
      wholeSpaceAmenities: Array.isArray(frontendData.propertyDetails?.wholeSpaceAmenities) 
        ? frontendData.propertyDetails.wholeSpaceAmenities 
        : [frontendData.propertyDetails?.wholeSpaceAmenities || ''],
      waterAvailability: frontendData.propertyDetails?.waterAvailability || '',
      propertyAge: frontendData.propertyDetails?.propertyAge || '',
      propertyCondition: frontendData.propertyDetails?.propertyCondition || '',
      electricitySupply: frontendData.propertyDetails?.electricitySupply || {
        powerLoad: 0,
        backup: false
      }
    },
    pricingDetails: { // Map leaseDetails to pricingDetails
      propertyPrice: frontendData.leaseDetails?.leaseAmount || 0,
      pricetype: frontendData.leaseDetails?.leaseduration?.amountType || 'fixed'
    },
    registration: {
      chargestype: 'inclusive', // Default value
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: { // Transform brokerage data
      required: frontendData.brokerage?.required ? 'yes' : 'no',
      amount: frontendData.brokerage?.amount || 0
    },
    availability: { // Transform availability data
      type: frontendData.availability?.availableImmediately ? 'immediate' : 'specific',
      date: frontendData.availability?.availableFrom,
      preferredLeaseDuration: frontendData.availability?.leaseDuration || '',
      noticePeriod: frontendData.availability?.noticePeriod || ''
    },
    petsAllowed: frontendData.availability?.isPetsAllowed || false,
    operatingHoursRestrictions: frontendData.availability?.operatingHours || false,
    contactDetails: { // Map contactInformation to contactDetails
      name: frontendData.contactInformation?.name || '',
      email: frontendData.contactInformation?.email || '',
      phone: frontendData.contactInformation?.phone || '',
      alternatePhone: frontendData.contactInformation?.alternatePhone || '',
      bestTimeToContact: frontendData.contactInformation?.bestTimeToContact || ''
    },
    media: { // Transform media data
      photos: {
        exterior: frontendData.media?.photos?.exterior || [],
        interior: frontendData.media?.photos?.interior || [],
        floorPlan: frontendData.media?.photos?.floorPlan || [],
        washrooms: frontendData.media?.photos?.washroom || [], // Map washroom to washrooms
        lifts: frontendData.media?.photos?.lift || [], // Map lift to lifts
        emergencyExits: frontendData.media?.photos?.emergencyExit || [], // Map emergencyExit to emergencyExits
        others: [] // Default empty array
      },
      videoTour: frontendData.media?.videoTour || '',
      documents: frontendData.media?.documents || []
    },
    metaData: {
      createdBy: frontendData.metadata?.createdBy,
      createdAt: frontendData.metadata?.createdAt || new Date(),
      propertyType: 'Commercial',
      intent: 'Sell',
      propertyName: 'Other',
      status: 'active'
    }
  };
};

// Delete commercial sell others property
export const deleteCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const incomingData = req.body;

    if (!incomingData) {
      return res.status(400).json({
        success: false,
        message: 'No data provided for authorization.',
      });
    }

    const docToDelete = await CommercialSellOthers.findOne({ propertyId });

    if (!docToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Commercial sell others listing not found',
      });
    }

    // FIXED AUTHORIZATION: Use the same logic as update
    const frontendUserId = incomingData.metadata?.createdBy;
    
    if (!frontendUserId) {
      return res.status(401).json({ 
        success: false, 
        message: 'User ID not provided in request.' 
      });
    }

    const existingCreatedBy = docToDelete.metaData?.createdBy?.toString();
    
    if (existingCreatedBy !== frontendUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this property.',
      });
    }

    await CommercialSellOthers.findOneAndDelete({ propertyId });

    res.status(200).json({
      success: true,
      message: 'Commercial sell others listing deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting commercial sell others:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete commercial sell others listing',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};