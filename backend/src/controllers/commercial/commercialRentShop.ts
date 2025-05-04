import { Request, Response } from 'express';
import CommercialRentShop from '../../models/commercial/commercialrentshop';
import User from '../../models/signup';
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
    const userId = formData.metadata.userId;
    const user = await User.findById(userId);

    if(!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    const userName = user.username;

    const shopData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        userName: userName,
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

