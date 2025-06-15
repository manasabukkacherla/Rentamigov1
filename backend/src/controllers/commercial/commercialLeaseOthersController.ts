import { Request, Response } from 'express';
import CommercialLeaseOthers from '../../models/commercial/CommercialLeaseOthers';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial lease others property ID
    const prefix = "RA-COMLEOT";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialLeaseOthers.findOne({
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
    const existingWithExactId = await CommercialLeaseOthers.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialLeaseOthers.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-COMLEOT${timestamp}`;
  }
};

// Create a new commercial lease others property
export const createCommercialLeaseOthers = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Create the data object with property ID and metadata
    const leasePropertyData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
        createdBy: req.user?._id || null,
        createdAt: new Date()
      }
    };
    
    // Create new commercial lease property listing
    const leaseProperty = new CommercialLeaseOthers(leasePropertyData);
    await leaseProperty.save();

    res.status(201).json({
      success: true,
      message: 'Commercial lease others property created successfully',
      data: leaseProperty
    });
  } catch (error: any) {
    console.error('Error creating commercial lease others listing:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create commercial lease others listing',
      error: error
    });
  }
};

// Get all commercial lease others properties
export const getAllCommercialLeaseOthers = async (req: Request, res: Response) => {
  try {
    const leaseProperties = await CommercialLeaseOthers.find({}).sort({ 'metaData.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      count: leaseProperties.length,
      data: leaseProperties
    });
  } catch (error: any) {
    console.error('Error fetching commercial lease others properties:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch commercial lease others properties',
      error: error
    });
  }
};

// Get a single commercial lease others property by ID
export const getCommercialLeaseOthersById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    
    const leaseProperty = await CommercialLeaseOthers.findOne({ propertyId });
    
    if (!leaseProperty) {
      return res.status(404).json({
        success: false,
        message: 'Commercial lease others property not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: leaseProperty
    });
  } catch (error: any) {
    console.error('Error fetching commercial lease others property by ID:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch commercial lease others property',
      error: error
    });
  }
};

// Update a commercial lease others property
export const updateCommercialLeaseOthers = async (req: Request, res: Response) => {
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
  
     
      const existingDoc = await CommercialLeaseOthers.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialLeaseOthers.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Lease others updated successfully.",
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
  
  
// Delete a commercial lease others property
export const deleteCommercialLeaseOthers = async (req: Request, res: Response) => {
        try {
          const data = await CommercialLeaseOthers.findByIdAndDelete(req.params.id);
  
          if (!data) {
              return res.status(404).json({
                  success: false,
                  message: 'Lease others listing not found'
              });
          }
  
          res.status(200).json({
              success: true,
              message: 'Lease others listing deleted successfully'
          });
      } catch (error) {
          console.error('Error deleting lease others:', error);
          res.status(500).json({
              success: false,
              error: 'Failed to delete lease others listing',
              message: error instanceof Error ? error.message : 'Unknown error'
          });
      }
  };
  