import { Request, Response } from 'express';
import _ from 'lodash';
import CommercialRentRetailStore from '../../models/commercial/CommercialRentRetailStore';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMRERS";
    
    const highestShop = await CommercialRentRetailStore.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1;
    
    if (highestShop) {
      const match = highestShop.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    const existingWithExactId = await CommercialRentRetailStore.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialRentRetailStore.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSESH${timestamp}`;
  }
};

export const createCommercialRentRetailStore = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData)
    
    const propertyId = await generatePropertyId();

    const shopData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        // status: 'draft',
        createdBy: req.user?._id || formData?.metadata?.createdBy || null,
        createdAt: new Date(),
        // updatedAt: new Date(),
        // isVerified: false
      }
    };

    // // Create new shop listing
    const shop = new CommercialRentRetailStore(shopData);
    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Commercial rent retail store listing created successfully',
      data: shop
    });
  } catch (error: any) {
    console.error('Error creating commercial rent retail store:', error);
    res.status(500).json({ 
      error: 'Failed to create commercial rent retail store',
      details: error.message 
    });
  }
};

export const getAllCommercialRentRetail = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialRentRetailStore.find().sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent retail listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial Rent retail listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial Rent retail listings' 
    });
  }
};

export const getCommercialRentRetailById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialRentRetailStore.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent retail property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial Rent retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial Rent retail property' 
    });
  }
};

export const updateCommercialRentRetail = async (req: Request, res: Response) => {
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

   
    const existingDoc = await CommercialRentRetailStore.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialRentRetailStore.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "rent retail store updated successfully.",
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

export const deleteCommercialRentRetail = async (req: Request, res: Response) => {
  try {
    const data = await CommercialRentRetailStore.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'rent retail store listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'rent retail store listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting rent retail store:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete rent retail store listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};