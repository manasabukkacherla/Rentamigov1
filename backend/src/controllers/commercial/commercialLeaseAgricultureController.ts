import { Request, Response } from 'express';
import CommercialLeaseAgriculture from '../../models/commercial/CommercialLeaseAgriculture';
import User  from '../../models/signup';


// Helper function to generate Property ID
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMLEAAG";
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

    // Add metadata with userId and user (like Sell controller)
    const agricultureData = {
      ...formData,
      propertyId, // Ensure propertyId is at the root level
      metadata: { // Use 'metadata' to match schema
        ...(formData.metaData || formData.metadata),
        userId: userId, // Always assign the resolved userId
       // user: user, // Attach user object if available
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
    const properties = await CommercialLeaseAgriculture.find().sort({ 'metadata.createdAt': -1 });

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
    const propertyId = req.params.id;
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
    const propertyId = req.params.id;
    const updateData = req.body;

    const property = await CommercialLeaseAgriculture.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Agricultural land Rent property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agricultural land Rent property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Error updating agricultural land Rent property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update agricultural land Rent property'
    });
  }
};

// Delete Commercial Rent Agriculture
export const deleteCommercialLeaseAgriculture = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseAgriculture.findOneAndDelete({ propertyId });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Agricultural land Rent property not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Agricultural land Rent property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting agricultural land Rent property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete agricultural land Rent property'
    });
  }
};
