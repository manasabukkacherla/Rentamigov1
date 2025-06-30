import { Request, Response } from 'express';
import CommercialRentAgriculture from '../../models/commercial/CommercialRentAgriculture';
import _ from 'lodash';
import User  from '../../models/signup';

// Helper function to generate Property ID
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMREAG";
    const highestShop = await CommercialRentAgriculture.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });

    let nextNumber = 1;

    if (highestShop) {
      const match = highestShop.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existingWithExactId = await CommercialRentAgriculture.findOne({ propertyId });

    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

      const forcedExisting = await CommercialRentAgriculture.findOne({ propertyId: forcedPropertyId });
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

// Create Commercial Rent Agriculture
export const createCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    // Prefer authenticated user if available
    const userId = formData.metadata?.createdBy;

   

    // Ensure powerSupply is explicitly set from the request body
    // if (typeof formData.powerSupply !== 'boolean') {
    //   return res.status(400).json({ success: false, message: 'powerSupply is required and must be boolean' });
    // }

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
      metadata: {
        ...formData.metadata,
        createdBy: formData.metadata.createdBy,  // Use the extracted userId
        createdAt: new Date()
      }
    };

    // Create new agriculture listing
    const agriculture = new CommercialRentAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      success: true,
      message: 'Commercial rent agriculture listing created successfully',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial rent agriculture:', error);
    res.status(500).json({ error: 'Failed to create commercial rent agriculture listing' });
  }
};

// Get all Commercial Rent Agriculture
export const getAllCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialRentAgriculture.find().sort({ 'metadata.createdAt': -1 });

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
export const getCommercialRentAgricultureById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialRentAgriculture.findOne({ propertyId });

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
export const updateCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id; 
    const incomingData = req.body?.data;
    if (!incomingData) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update.",
      });
    }

    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => {
        if (key === "_id" || key === "__v") return undefined;
        return value;
      })
    );

   
    const existingDoc = await CommercialRentAgriculture.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialRentAgriculture.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "rent Agriculture updated successfully.",
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

// Delete Commercial Rent Agriculture
export const deleteCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const data = await CommercialRentAgriculture.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'rent Agriculture listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'rent Agriculture listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting rent Agriculture:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete rent Agriculture listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};