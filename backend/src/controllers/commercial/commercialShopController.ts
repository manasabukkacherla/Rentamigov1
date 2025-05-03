import { Request, Response } from 'express';
import CommercialSellShop from '../../models/commercial/CommercialsellShop';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMSH";
    
    const highestShop = await CommercialSellShop.findOne({
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
    
    const existingWithExactId = await CommercialSellShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialSellShop.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSH${timestamp}`;
  }
};

export const createCommercialShop = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    
    const propertyId = await generatePropertyId();

    const shopData = {
      propertyId,
      ...formData,
      metadata: {
        ...formData.metadata,
        createdBy: req.user?._id || null,
        createdAt: new Date()
      }
    };

    // Create new shop listing
    const shop = new CommercialSellShop(shopData);
    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Commercial shop listing created successfully',
      data: shop
    });
  } catch (error: any) {
    console.error('Error creating commercial shop:', error);
    res.status(500).json({ 
      error: 'Failed to create commercial shop listing',
      details: error.message 
    });
  }
}; 