import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialRentWarehouse from '../../models/commercial/CommercialRentWarehouse';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

// Generate property ID with format RA-COMSESHXXXX
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial shop property ID
    const prefix = "RA-COMREWH";
    
    // Find the shop with the highest property ID number
    const highestShop = await CommercialRentWarehouse.findOne({
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
    const existingWithExactId = await CommercialRentWarehouse.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialRentWarehouse.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMREWH${timestamp}`;
  }
};

// Create a new commercial shop listing
export const createRentWarehouse = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData)
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // // Create the shop data object
    const warehouseData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        createdBy: req.user?._id || formData?.metadata?.createdBy || null,
        // status: 'draft',
        // createdAt: new Date(),
        // updatedAt: new Date(),
        // isVerified: false
        createdAt: new Date()
      }
    };

    // // Create new shop listing
    const warehouse = new CommercialRentWarehouse(warehouseData);
    await warehouse.save();

    res.status(201).json({
      success: true,
      message: 'Commercial warehouse listing created successfully',
      data: warehouse
    });
  } catch (error: any) {
        console.error('Error creating commercial warehouse:', error);
    res.status(500).json({ 
      error: 'Failed to create commercial warehouse listing',
      details: error.message 
    });
  }
};

// Get all commercial Rent warehouse listings
export const getAllRentWarehouses = async (req: Request, res: Response) => {
  try {
      const warehouses = await CommercialRentWarehouse.find();

      res.status(200).json({
          success: true,
          count: warehouses.length,
          data: warehouses
      });
  } catch (error: any) {
      console.error('Error fetching commercial Rent warehouses:', error);
      res.status(500).json({
          error: 'Failed to fetch commercial Rent warehouse listings',
          details: error.message
      });
  }
};

// Get a single commercial Rent warehouse by ID
export const getRentWarehouseById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
      const warehouse = await CommercialRentWarehouse.findOne({propertyId});

      if (!warehouse) {
          return res.status(404).json({
              success: false,
              error: 'Commercial Rent warehouse not found'
          });
      }

      res.status(200).json({
          success: true,
          data: warehouse
      });
  } catch (error: any) {
      console.error('Error fetching commercial Rent warehouse:', error);
      res.status(500).json({
          error: 'Failed to fetch commercial Rent warehouse',
          details: error.message
      });
  }
};

// Update a commercial Rent warehouse
export const updateRentWarehouse = async (req: Request, res: Response) => {
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

   
    const existingDoc = await CommercialRentWarehouse.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialRentWarehouse.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Commercial RentWarehouse updated successfully.",
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

// Delete a commercial Rent warehouse
export const deleteRentWarehouse = async (req: Request, res: Response) => {
  try {
    const data = await CommercialRentWarehouse.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'Commercial RentWarehouse listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Commercial RentWarehouse listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting Commercial RentWarehouse:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete Commercial RentWarehouse listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};