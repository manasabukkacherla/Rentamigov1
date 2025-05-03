import { Request, Response } from 'express';
import CommercialLeaseAgriculture from '../../models/commercial/CommercialLeaseAgriculture';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial lease agriculture property ID
    const prefix = "RA-COMLEAAG";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialLeaseAgriculture.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestProperty && highestProperty.propertyId) {
      // Extract the numeric part from the existing highest property ID
      const match = highestProperty.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        // Convert to number and increment by 1
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    // Create the property ID with the sequence number
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Check if this exact ID somehow exists (should be rare but possible with manual entries)
    const existingWithExactId = await CommercialLeaseAgriculture.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialLeaseAgriculture.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        // If still colliding, recursively generate a new ID
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    // Fallback to timestamp-based ID if there's an error
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMLEAAG${timestamp}`;
  }
};

export const createCommercialLeaseAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prepare agriculture data with property ID and metadata
    const agricultureData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        createdBy: req.user?._id || null,
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
    console.error('Error creating agricultural land lease listing:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create agricultural land lease listing. Please try again.' 
    });
  }
};

export const getAllCommercialLeaseAgriculture = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseAgriculture.find({}).sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Agricultural land lease listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching agricultural land lease listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch agricultural land lease listings' 
    });
  }
};

export const getCommercialLeaseAgricultureById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseAgriculture.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Agricultural land lease property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Agricultural land lease property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching agricultural land lease property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch agricultural land lease property' 
    });
  }
};

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
