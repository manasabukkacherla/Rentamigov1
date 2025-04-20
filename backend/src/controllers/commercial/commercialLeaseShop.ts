import { Request, Response } from 'express';
import CommercialLeaseShop from '../../models/commercial/CommercialLeaseShop';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMLEASH";
    
    const highestShop = await CommercialLeaseShop.findOne({
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
    
    const existingWithExactId = await CommercialLeaseShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialLeaseShop.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMLEASH${timestamp}`;
  }
};

export const createCommercialLeaseShop = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData)
    
    const propertyId = await generatePropertyId();

    // Create the shop data with propertyId at the top level
    const shopData = {
      propertyId, // Ensure this is at the top level
      basicInformation: formData.basicInformation,
      shopDetails: formData.shopDetails,
      propertyDetails: formData.propertyDetails,
      leaseTerms: formData.leaseTerms,
      contactInformation: formData.contactInformation,
      media: formData.media,
      metadata: {
        ...formData.metadata,
        // createdAt: new Date(),
        // updatedAt: new Date()
      }
    };

    // // Create new shop listing
    const shop = new CommercialLeaseShop(shopData);
    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Commercial lease shop listing created successfully',
      data: shop
    });
  } catch (error: any) {
    console.error('Error creating commercial lease shop:', error);
    res.status(500).json({ 
      error: 'Failed to create commercial lease shop listing',
      details: error.message 
    });
  }
};

