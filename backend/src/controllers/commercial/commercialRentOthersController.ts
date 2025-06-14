import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialRentOthers from '../../models/commercial/CommercialRentOthers';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial other property ID
    const prefix = "RA-COMREOT";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialRentOthers.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestProperty) {
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
    const existingWithExactId = await CommercialRentOthers.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialRentOthers.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMREOT${timestamp}`;
  }
};

export const createCommercialRentOthers = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prefer authenticated user if available
    const userId = formData.metaData.createdBy;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User is not authenticated or user ID is missing in request.'
      });
    }

    // Create the data object with property ID and metadata
    const otherPropertyData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
        createdBy: userId,
        createdAt: new Date()
      }
    };
    
    // Create new commercial other property listing
    const otherProperty = new CommercialRentOthers(otherPropertyData);
    await otherProperty.save();

    res.status(201).json({
      success: true,
      message: 'Commercial rent others listing created successfully',
      data: otherProperty
    });
  } catch (error) {
    console.error('Error creating commercial rent others listing:', error);
    res.status(500).json({ error: 'Failed to create commercial rent others listing' });
  }
}; 


// Get all commercial Rent others properties
export const getAllCommercialRentOthers = async (req: Request, res: Response) => {
  try {
    const RentProperties = await CommercialRentOthers.find().sort({ 'metaData.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      count: RentProperties.length,
      data: RentProperties
    });
  } catch (error: any) {
    console.error('Error fetching commercial Rent others properties:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch commercial Rent others properties',
      error: error
    });
  }
};

// Get a single commercial Rent others property by ID
export const getCommercialRentOthersById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    
    const RentProperty = await CommercialRentOthers.findOne({ propertyId });
    
    if (!RentProperty) {
      return res.status(404).json({
        success: false,
        message: 'Commercial Rent others property not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: RentProperty
    });
  } catch (error: any) {
    console.error('Error fetching commercial Rent others property by ID:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch commercial Rent others property',
      error: error
    });
  }
};

// Update a commercial Rent others property
export const updateCommercialRentOthers = async (req: Request, res: Response) => {
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

   
    const existingDoc = await CommercialRentOthers.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialRentOthers.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "rent others updated successfully.",
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

// Delete a commercial Rent others property
export const deleteCommercialRentOthers = async (req: Request, res: Response) => {
  try {
    const data = await CommercialRentOthers.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'rent others listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'rent others listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting rent others:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete rent others listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};