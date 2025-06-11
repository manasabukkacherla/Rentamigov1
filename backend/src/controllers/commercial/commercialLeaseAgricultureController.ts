import { Request, Response } from 'express';
import CommercialLeaseAgriculture from '../../models/commercial/CommercialLeaseAgriculture';
import _ from 'lodash';
import User  from '../../models/signup';

// Helper function to generate Property ID
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMLEAG";
    const highestShop = await CommercialLeaseAgriculture.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });

    let nextNumber = 1;

    if (highestShop) {
      const match = highestShop.propertyId?.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existingWithExactId = await CommercialLeaseAgriculture.findOne({ propertyId });

    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

      const forcedExisting = await CommercialLeaseAgriculture.findOne({ propertyId: forcedPropertyId });
      if (forcedExisting) {
        return generatePropertyId();
      }

      return forcedPropertyId;
    }

    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSESH${timestamp}`;
  }
};

// Create Commercial Lease Agriculture
export const createCommercialLeaseAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    // Prefer authenticated user if available
    let userId: string | undefined = undefined;
    let user: any = undefined;
    if (req.user && (req.user as any)._id) {
      userId = (req.user as any)._id;
      user = req.user;
    } else if (formData.metaData && formData.metaData.userId) {
      userId = formData.metaData.userId;
      // Optionally: fetch user from DB if needed
    } else if (formData.metadata && formData.metadata.userId) {
      userId = formData.metadata.userId;
      // Optionally: fetch user from DB if needed
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User is not authenticated or user ID is missing in request.'
      });
    }

    // Generate property ID
    const propertyId = await generatePropertyId();
    if (!propertyId) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate property ID.'
      });
    }
    
    console.log(propertyId);

    // Add metadata with userId and user (like Sell controller)
    const agricultureData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
       // createdBy: req.user?._id || null,
        createdAt: new Date()
      }
    };

    // Create new agriculture lease listing
    const agriculture = new CommercialLeaseAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      success: true,
      message: 'Agricultural land lease listing created successfully!',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial lease agriculture:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create agricultural land lease listing',
      error: error instanceof Error ? error.message : error
    });
  }
};

// Get all Commercial Rent Agriculture
export const getAllCommercialLeaseAgriculture = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseAgriculture.find({}).sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Agricultural land Rent listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching agricultural land Rent listings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agricultural land Rent listings'
    });
  }
};

// Get Commercial Rent Agriculture by ID
export const getCommercialLeaseAgricultureById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialLeaseAgriculture.findOne({ propertyId });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Agricultural land Rent property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agricultural land Rent property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching agricultural land Rent property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch agricultural land Rent property'
    });
  }
};

// Update Commercial Rent Agriculture
export const updateCommercialLeaseAgriculture = async (req: Request, res: Response) => {
 
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
    const existingDoc = await CommercialLeaseAgriculture.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    const updatedDoc = await CommercialLeaseAgriculture.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Lease Agriculture updated successfully.",
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



export const deleteCommercialLeaseAgriculture = async (req: Request, res: Response) => {
    try {
        const leaseAgriculture = await CommercialLeaseAgriculture.findByIdAndDelete(req.params.id);

        if (!leaseAgriculture) {
            return res.status(404).json({
                success: false,
                message: 'Lease Agriculture listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lease Agriculture listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lease Agriculture:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease Agriculture listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
