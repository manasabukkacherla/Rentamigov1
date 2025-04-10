import { Request, Response } from 'express';
import CommercialShop from '../../models/commercial/CommercialsellShop';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

// Generate property ID with format RA-COMSESHXXXX
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial shop property ID
    const prefix = "RA-COMSESH";
    
    // Find the shop with the highest property ID number
    const highestShop = await CommercialShop.findOne({
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
    const existingWithExactId = await CommercialShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialShop.findOne({ propertyId: forcedPropertyId });
      
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

// Create a new commercial shop listing
export const createCommercialShop = async (req: Request, res: Response) => {
  try {
    const shopData = req.body;
    

    // Generate property ID
    const propertyId = await generatePropertyId();

    // Add metadata and property ID
    shopData.metadata = {
      // createdBy: req.user._id,
      createdBy: shopData.metadata.createdBy,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false
    };
    
    // Add property ID to the shop data
    shopData.propertyId = propertyId;

    // Create new shop listing
    const shop = new CommercialShop(shopData);
    await shop.save();

    res.status(201).json({
      message: 'Commercial shop listing created successfully',
      data: shop
    });
  } catch (error) {
    console.error('Error creating commercial shop:', error);
    res.status(500).json({ error: 'Failed to create commercial shop listing' });
  }
};

