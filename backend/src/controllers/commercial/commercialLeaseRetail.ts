import { Request, Response } from 'express';
import CommercialLeaseRetail from '../../models/commercial/CommercialLeaseRetail';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial lease retail property ID
    const prefix = "RA-COMLERS";

    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialLeaseRetail.findOne({
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
    const existingWithExactId = await CommercialLeaseRetail.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialLeaseRetail.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMLERS${timestamp}`;
  }
};

export const createCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prepare retail data with property ID and metadata
    const retailData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
      }
    };
    
    // Create new retail lease listing
    const retail = new CommercialLeaseRetail(retailData);
    await retail.save();

    res.status(201).json({
      success: true,
      message: 'Commercial lease retail listing created successfully!',
      data: retail
    });
  } catch (error) {
    console.error('Error creating commercial lease retail listing:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create commercial lease retail listing. Please try again.' 
    });
  }
};

export const getAllCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseRetail.find().sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial lease retail listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial lease retail listings' 
    });
  }
};

export const getCommercialLeaseRetailById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseRetail.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial lease retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial lease retail property' 
    });
  }
};

export const updateCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;
    
    const property = await CommercialLeaseRetail.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true }
    );
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Error updating commercial lease retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update commercial lease retail property' 
    });
  }
};

export const deleteCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseRetail.findOneAndDelete({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting commercial lease retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete commercial lease retail property' 
    });
  }
}; 