import { Request, Response } from 'express';
import CommercialLeaseShop from '../../models/commercial/CommercialLeaseShop';
import CommercialLeaseAgriculture from '../../models/commercial/CommercialLeaseAgriculture';
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


export const getAllCommercialLeaseShop = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseShop.find().sort({ 'metadata.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease shop listings retrieved successfully',
      data: properties
    });
  } catch (error) {
    console.error('Error fetching commercial lease shop listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial lease shop listings' 
    });
  }
};

export const getCommercialLeaseShopById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseShop.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease shop property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching Commercial lease shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch Commercial lease shop property' 
    });
  }
};

  export const updateCommercialLeaseShop = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const updateData = req.body;
    
    const property = await CommercialLeaseShop.findOneAndUpdate(
      { propertyId },
      { $set: updateData },
      { new: true }
    );
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease shop property updated successfully',
      data: property
    });
  } catch (error) {
    console.error('Error updating Commercial lease shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update Commercial lease shop property' 
    });
  }
};

export const deleteCommercialLeaseShop = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.id;
    const property = await CommercialLeaseShop.findOneAndDelete({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease shop property not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease shop property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting commercial lease shop property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete commercial lease shop property' 
    });
  }
}; 

