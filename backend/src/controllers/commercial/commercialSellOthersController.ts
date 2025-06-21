import { Request, Response } from 'express';
import CommercialSellOthers from '../../models/commercial/CommercialSellOthers';
import _ from 'lodash';

// Generate property ID with format RA-COMSEOT-XXXX
const generatePropertyId = async (): Promise<string> => {
  const prefix = "RA-COMSEOT";
  try {
    const highestProperty = await CommercialSellOthers.findOne({
      'basicInformation.propertyId': { $regex: `^${prefix}\\d+$` }
    }).sort({ 'basicInformation.propertyId': -1 });
    
    let nextNumber = 1;
    
    if (highestProperty) {
      const match = highestProperty.propertyId?.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    const existingWithExactId = await CommercialSellOthers.findOne({ propertyId });
    
    if (existingWithExactId) {
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialSellOthers.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}${timestamp}`;
  }
};

// Create a new commercial sell others property
export const createCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();

    // Correctly map frontend 'metadata' to backend 'metaData'
    const otherPropertyData = {
      ...formData,
      propertyId,
      metaData: {
        ...formData.metadata,
        createdBy: formData.metadata.createdBy,
        createdAt: new Date(),
      },
    };

    // Remove the original metadata field to avoid confusion
   

    const otherProperty = new CommercialSellOthers(otherPropertyData);
    await otherProperty.save();

    res.status(201).json({
      success: true,
      message: 'Commercial sell others property created successfully',
      data: otherProperty,
    });
  } catch (error: any) {
    console.error('Error creating commercial sell others listing:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create commercial sell others listing',
      error: error,
    });
  }
};

// Get all commercial sell others listings
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

// Get commercial sell others listing by ID
export const getCommercialSellOthersById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialSellOthers.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ error: 'Commercial sell others property not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial sell others property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell others property:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell others property' });
  }
};

// Update commercial sell others property
export const updateCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    // @ts-ignore
    const userId = req.user?._id; // Get user ID from authenticated session
    const incomingData = req.body?.data;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
    }

    if (!incomingData) {
      return res.status(400).json({
        success: false,
        message: 'No data provided for update.',
      });
    }

    const existingDoc = await CommercialSellOthers.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Authorization check
    if (existingDoc.metaData?.createdBy?.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this property.',
      });
    }

    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => {
        if (key === '_id' || key === '__v') return undefined;
        return value;
      })
    );

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialSellOthers.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Sell others updated successfully.',
      data: updatedDoc,
    });
  } catch (error: any) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown update error',
    });
  }
};

// Delete commercial sell others property
export const deleteCommercialSellOthers = async (req: Request, res: Response) => {
  try {
    const documentId = req.params.id;
    // @ts-ignore
    const userId = req.user?._id; // Get user ID from authenticated session

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not logged in.' });
    }

    const docToDelete = await CommercialSellOthers.findById(documentId);

    if (!docToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Sell others listing not found',
      });
    }

    // Authorization check
    if (docToDelete.metaData?.createdBy?.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this property.',
      });
    }

    await CommercialSellOthers.findByIdAndDelete(documentId);

    res.status(200).json({
      success: true,
      message: 'Sell others listing deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Sell others:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete Sell others listing',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
