import { Request, Response } from 'express';
import CommercialSellOthers from '../../models/commercial/CommercialSellOthers';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial sell others property ID
    const prefix = "RA-COMSEOT";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialSellOthers.findOne({
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
    const existingWithExactId = await CommercialSellOthers.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialSellOthers.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMSEOT${timestamp}`;
  }
};

// Create a new commercial sell others property
export const createCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Create the data object with property ID and metadata
    const otherPropertyData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
      }
    };
    
    // Create new commercial other property listing
    const otherProperty = new CommercialSellOthers(otherPropertyData);
    await otherProperty.save();

    res.status(201).json({
      success: true,
      message: 'Commercial sell others property created successfully',
      data: otherProperty
    });
  } catch (error: any) {
    console.error('Error creating commercial sell others listing:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create commercial sell others listing',
      error: error
    });
  }
};

