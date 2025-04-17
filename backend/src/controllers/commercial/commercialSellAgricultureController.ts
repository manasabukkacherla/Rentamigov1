import { Request, Response } from 'express';
import CommercialSellAgriculture from '../../models/commercial/CommercialSellAgriculture';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial sell agriculture property ID
    const prefix = "RA-COMSEAG";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialSellAgriculture.findOne({
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
    const existingWithExactId = await CommercialSellAgriculture.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialSellAgriculture.findOne({ propertyId: forcedPropertyId });
      
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
    return `SA-COMSAG${timestamp}`;
  }
};

export const createCommercialSellAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prepare agriculture data with property ID and metadata
    const agricultureData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
      }
    };
    
    // Create new agriculture listing
    const agriculture = new CommercialSellAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      message: 'Commercial sell agriculture listing created successfully',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial sell agriculture:', error);
    res.status(500).json({ error: 'Failed to create commercial sell agriculture listing' });
  }
};

export const getAllCommercialSellAgriculture = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialSellAgriculture.find().sort({ 'metaData.createdAt': -1 });
    
    res.status(200).json({
      message: 'Commercial sell agriculture listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial sell agriculture listings:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell agriculture listings' });
  }
};

export const getCommercialSellAgricultureById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialSellAgriculture.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ error: 'Commercial sell agriculture property not found' });
    }
    
    res.status(200).json({
      message: 'Commercial sell agriculture property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell agriculture property:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell agriculture property' });
  }
}; 