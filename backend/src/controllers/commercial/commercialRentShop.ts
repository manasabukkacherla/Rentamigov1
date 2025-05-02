import { Request, Response } from 'express';
import CommercialRentShop from '../../models/commercial/commercialrentshop';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMRESH";
    
    const highestShop = await CommercialRentShop.findOne({
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
    
    const existingWithExactId = await CommercialRentShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialRentShop.findOne({ propertyId: forcedPropertyId });
      
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

export const createCommercialRentShop = async (req: Request, res: Response) => {
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
    const shop = new CommercialRentShop(shopData);
    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Commercial rent shop listing created successfully',
      data: shop
    });
  } catch (error: any) {
    console.error('Error creating commercial rent shop:', error);
    res.status(500).json({ 
      error: 'Failed to create commercial rent shop listing',
      details: error.message 
    });
  }
};


export const getAllCommercialRentShop = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialRentShop.find().sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent shop listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial Rent shop listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial Rent shop listings' 
    });
  }
};

export const getCommercialRentShopById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialRentShop.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent shop property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching Commercial Rent shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch Commercial Rent shop property' 
    });
  }
};

  export const updateCommercialRentShop = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;
    
    const property = await CommercialRentShop.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true }
    );
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent shop property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Error updating Commercial Rent shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update Commercial Rent shop property' 
    });
  }
};

export const deleteCommercialRentShop = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialRentShop.findOneAndDelete({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial Rent shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial Rent shop property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting commercial Rent shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete commercial Rent shop property' 
    });
  }
}; 

