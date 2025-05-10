import { Request, Response } from 'express';
import CommercialSellShed from '../../models/commercial/CommercialSellShed';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial sell shed property ID
    const prefix = "RA-COMSESD";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialSellShed.findOne({
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
    const existingWithExactId = await CommercialSellShed.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialSellShed.findOne({ propertyId: forcedPropertyId });
      
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
    return `SD-COMSESD${timestamp}`;
  }
};

export const createCommercialSellShed = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prepare shed data with property ID and metadata
    const shedData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
        createdBy: req.user?._id || null,
        createdAt: new Date()
        }
    };
    
    // Create new shed listing
    const shed = new CommercialSellShed(shedData);
    await shed.save();

    res.status(201).json({
      message: 'Commercial sell shed listing created successfully',
      data: shed
    });
  } catch (error) {
    console.error('Error creating commercial sell shed:', error);
    res.status(500).json({ error: 'Failed to create commercial sell shed listing' });
  }
};

export const getAllSellShed = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialSellShed.find().sort({ 'metaData.createdAt': -1 });
    
    res.status(200).json({
      message: 'Commercial sell shed listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial sell shed listings:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell shed listings' });
  }
};

export const getSellShedById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialSellShed.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ error: 'Commercial sell shed property not found' });
    }
    
    res.status(200).json({
      message: 'Commercial sell shed property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell shed property:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell shed property' });
  }
};

export const updateSellShed = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;
    
    // Find and update the property
    const updatedProperty = await CommercialSellShed.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedProperty) {
      return res.status(404).json({ error: 'Commercial sell shed property not found' });
    }
    
    res.status(200).json({
      message: 'Commercial sell shed property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    console.error('Error updating commercial sell shed property:', error);
    res.status(500).json({ error: 'Failed to update commercial sell shed property' });
  }
};

export const deleteSellShed = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    
    // Find and delete the property
    const deletedProperty = await CommercialSellShed.findOneAndDelete({ propertyId });
    
    if (!deletedProperty) {
      return res.status(404).json({ error: 'Commercial sell shed property not found' });
    }
    
    res.status(200).json({
      message: 'Commercial sell shed property deleted successfully',
      data: deletedProperty
    });
  } catch (error) {
    console.error('Error deleting commercial sell shed property:', error);
    res.status(500).json({ error: 'Failed to delete commercial sell shed property' });
  }
}; 