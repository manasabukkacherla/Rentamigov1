import { Request, Response } from 'express';
import CommercialRentAgriculture from '../../models/commercial/CommercialRentAgriculture';
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMREAG";
    
    const highestShop = await CommercialRentAgriculture.findOne({
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
    
    const existingWithExactId = await CommercialRentAgriculture.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialRentAgriculture.findOne({ propertyId: forcedPropertyId });
      
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

export const createCommercialRentAgriculture = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    console.log(formData);
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Add metadata
    // formData.metadata = {
    //   createdBy: formData.metadata.createdBy,
    //   createdAt: new Date()
    // };
    const agricultureData = {
      propertyId,
      ...formData,
      metaData: {
        ...formData.metaData,
      }
    };
    
    // Add property ID
    agricultureData.propertyId = propertyId;

    // Create new showroom listing
    const agriculture = new CommercialRentAgriculture(agricultureData);
    await agriculture.save();

    res.status(201).json({
      success: true,
      message: 'Commercial rent agriculture listing created successfully',
      data: agriculture
    });
  } catch (error) {
    console.error('Error creating commercial rent agriculture:', error);
    res.status(500).json({ error: 'Failed to create commercial rent agriculture listing' });
  }
}