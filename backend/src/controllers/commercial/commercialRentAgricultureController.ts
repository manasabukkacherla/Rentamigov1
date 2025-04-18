import { Request, Response } from 'express';
import CommercialRentAgriculture from '../../models/commercial/CommercialRentAgriculture';
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial shop property ID
    const prefix = "RA-COMREAG";
    
    // Find the shop with the highest property ID number
    const highestShop = await CommercialRentAgriculture.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestShop) {
      // Extract the numeric part from the existing highest property ID
      const match = highestShop.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        // Convert to number and increment by 1
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    // Create the property ID with the sequence number
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Check if this exact ID somehow exists (should be rare but possible with manual entries)
    const existingWithExactId = await CommercialRentAgriculture.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialRentAgriculture.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMSESH${timestamp}`;
  }
};

export const createCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Add metadata
    // formData.metadata = {
    //   createdBy: formData.metadata.createdBy,
    //   createdAt: new Date()
    // };
    const agricultureData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
      }
    };
    
    // Add property ID
    agricultureData.propertyId = propertyId;

    // Create new showroom listing
    const agriculture = new CommercialRentAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      message: 'Commercial rent agriculture listing created successfully',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial rent agriculture:', error);
    res.status(500).json({ error: 'Failed to create commercial rent agriculture listing' });
  }
}