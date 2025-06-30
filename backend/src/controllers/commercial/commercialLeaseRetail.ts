import { Request, Response } from 'express';
import CommercialLeaseRetail from '../../models/commercial/CommercialLeaseRetail';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial lease retail property ID
    const prefix = "RA-COMLERS";
    
    // Find the retail store with the highest property ID number
    const highestRetail = await CommercialLeaseRetail.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
      if (highestRetail) {
      // Extract the numeric part from the existing highest property ID
      const match = highestRetail.propertyId.match(/(\d+)$/);
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
        createdBy: formData.metadata?.createdBy,
        createdAt: new Date()
      }
    };
    
    // Create new retail lease listing
    const retail = new CommercialLeaseRetail(retailData);
    await retail.save();

    // Send success response
    if (!res.headersSent) {
      res.status(201).json({
        success: true,
        message: 'Commercial lease retail listing created successfully!',
        data: retail
      });
    }
  } catch (error) {
    console.error('Error creating commercial lease retail listing:', error);

    // Send error response, if not already sent
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false,
        error: 'Failed to create commercial lease retail listing. Please try again.' 
      });
    }
  }
};

export const getAllCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseRetail.find({}).sort({ 'metadata.createdAt': -1 });
    
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
    const propertyId = req.params.propertyId;
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

   
    const existingDoc = await CommercialLeaseRetail.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialLeaseRetail.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Lease retail updated successfully.",
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

export const deleteCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const data = await CommercialLeaseRetail.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'Lease retail listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Lease retail listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting lease retail:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete lease  retail listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};
