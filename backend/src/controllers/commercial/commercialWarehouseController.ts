import { Request, Response } from 'express';
import CommercialWarehouse from '../../models/commercial/CommercialSellWarehouse';
import { ICommercialWarehouse } from '../../models/commercial/CommercialSellWarehouse';

// Generate property ID with format RA-COMWARH-XXXX
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMSEWH";
    
    // Find the warehouse with the highest property ID number
    const highestWarehouse = await CommercialWarehouse.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 }).lean();
    
    let nextNumber = 1;
    
    if (highestWarehouse) {
      const match = highestWarehouse.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Verify the generated ID doesn't already exist
    const existingWithExactId = await CommercialWarehouse.findOne({ propertyId }).lean();
    if (existingWithExactId) {
      // Try the next sequential ID to avoid collisions
      const forcedNextId = `${prefix}-${(nextNumber + 1).toString().padStart(4, '0')}`;
      const forcedExisting = await CommercialWarehouse.findOne({ propertyId: forcedNextId }).lean();
      
      if (forcedExisting) {
        // If still colliding, generate a completely new ID
        return generatePropertyId();
      }
      
      return forcedNextId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    // Fallback to timestamp-based ID if there's an error
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMWARH-${timestamp}`;
  }
};

// Create a new commercial warehouse listing
export const createCommercialWarehouse = async (req: Request, res: Response) => {
  try {
    const warehouseData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();
    
    // Add metadata and property ID
    warehouseData.metadata = {
      userId: warehouseData.metadata?.userId,
      createdAt: new Date(),
    };
    
    // Add property ID to the warehouse data
    warehouseData.propertyId = propertyId;

    // Create and save warehouse with optimized approach
    const warehouse = new CommercialWarehouse(warehouseData);
    await warehouse.save();

    // Return a successful response with minimal data
    return res.status(201).json({
      success: true,
      message: 'Commercial warehouse listing created successfully',
      data: {
        propertyId: warehouse.propertyId,
        _id: warehouse._id,
        basicInformation: warehouse.basicInformation,
        metadata: warehouse.metadata
      }
    });

  } catch (error: any) {
    console.error('Error creating commercial warehouse:', error);

    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.message
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate property information',
        details: 'A property with this information already exists'
      });
    }

    // General error response
    return res.status(500).json({
      success: false,
      error: 'Failed to create commercial warehouse listing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 