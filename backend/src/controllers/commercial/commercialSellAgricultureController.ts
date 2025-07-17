import { Request, Response } from 'express';
import CommercialSellAgriculture from '../../models/commercial/CommercialSellAgriculture';
import User from '../../models/signup';
import _ from 'lodash';
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the commercial sell agriculture property ID
    const prefix = "RA-COMSEAG";
    
    // Find the property with the highest property ID number
    const highestProperty = await CommercialSellAgriculture.findOne({
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
    return `SA-COMSEAG${timestamp}`;
  }
};

export const createCommercialSellAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Robustly ensure userId is always set for metadata
    let userId: string | undefined = undefined;
    let user: any = undefined;
    if (req.user && (req.user as any)._id) {
      userId = (req.user as any)._id;
      user = req.user;
    } else if (formData.metadata && formData.metadata.userId) {
      userId = formData.metadata.userId;
    } else if (formData.metadata && formData.metadata.userId) {
      userId = formData.metadata.userId;
    }

    if (!userId) {
      // Fallback: try createdBy (as seen in your sample data)
      if (formData.metadata && formData.metadata.createdBy) {
        userId = formData.metadata.createdBy;
      } else if (formData.metadata && formData.metadata.createdBy) {
        userId = formData.metadata.createdBy;
      }
    }

    // if (!userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'User is not authenticated or user ID is missing in request.'
    //   });
    // }

    // Prepare agriculture data with property ID and metadata
    const agricultureData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        createdBy: formData.metadata.createdBy,
        createdAt: new Date()
      }
    };

    const agriculture = new CommercialSellAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      success: true,
      message: 'Commercial sell agriculture listing created successfully',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial sell agriculture:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create commercial sell agriculture listing',
      error: error instanceof Error ? error.message : error
    });
  }
};

export const getAllCommercialSellAgriculture = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialSellAgriculture.find().sort({ 'metadata.createdAt': -1 });
    
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
    const propertyId = req.params.propertyId;
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

export const updateCommercialSellAgriculture = async (req: Request, res: Response) => {
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
  
     
      const existingDoc = await CommercialSellAgriculture.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialSellAgriculture.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "SellAgriculture updated successfully.",
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
  
export const deleteCommercialSellAgriculture = async (req: Request, res: Response) => {
        try {
          const data = await CommercialSellAgriculture.findByIdAndDelete(req.params.id);
  
          if (!data) {
              return res.status(404).json({
                  success: false,
                  message: 'SellAgriculture listing not found'
              });
          }
  
          res.status(200).json({
              success: true,
              message: 'SellAgriculture listing deleted successfully'
          });
      } catch (error) {
          console.error('Error deleting SellAgriculture:', error);
          res.status(500).json({
              success: false,
              error: 'Failed to delete SellAgriculture listing',
              message: error instanceof Error ? error.message : 'Unknown error'
          });
      }
  };
  