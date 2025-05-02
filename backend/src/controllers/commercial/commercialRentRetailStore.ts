import { Request, Response } from 'express';
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
        // createdAt: new Date(),
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
    const propertyId = req.params.id;
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
    const propertyId = req.params.id;
    const updateData = req.body;
    
    const property = await CommercialRentRetailStore.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true }
    );
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent retail property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Error updating commercial Rent retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update commercial Rent retail property' 
    });
  }
};

export const deleteCommercialRentRetail = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialRentRetailStore.findOneAndDelete({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent retail property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent retail property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting commercial Rent retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete commercial Rent retail property' 
    });
  }
}; 