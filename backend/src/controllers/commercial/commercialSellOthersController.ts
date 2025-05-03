import { Request, Response } from 'express';
import CommercialSellOthers from '../../models/commercial/CommercialSellOthers';
import _ from 'lodash';

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
        createdBy: req.user?._id || null,
        createdAt: new Date()
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


export const getAllCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const others = await CommercialSellOthers.find({});
    
    res.status(200).json({
      success: true,
      count: others.length,
      data: others
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch commercial others sale listings'
    });
  }
};

export const getCommercialSellOthersById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialSellOthers.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ error: 'Commercial sell others property not found' });
    }
    
    res.status(200).json({
      message: 'Commercial sell others property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell others property:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell others property' });
  }
}; 

export const updateCommercialSellOthers = async (req: Request, res: Response) => {
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
  
     
      const existingDoc = await CommercialSellOthers.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialSellOthers.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Sell others updated successfully.",
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
  
export const deleteCommercialSellOthers = async (req: Request, res: Response) => {
        try {
          const data = await CommercialSellOthers.findByIdAndDelete(req.params.id);
  
          if (!data) {
              return res.status(404).json({
                  success: false,
                  message: 'Sell others listing not found'
              });
          }
  
          res.status(200).json({
              success: true,
              message: 'Sell others listing deleted successfully'
          });
      } catch (error) {
          console.error('Error deleting Sell others:', error);
          res.status(500).json({
              success: false,
              error: 'Failed to delete Sell others listing',
              message: error instanceof Error ? error.message : 'Unknown error'
          });
      }
  };