import { Request, Response } from 'express';
import CommercialLeaseShop from '../../models/commercial/CommercialLeaseShop';
import _ from 'lodash';
// import { validateCommercialShop } from '../validators/commercialShopValidator';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMLESH";
    
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
        createdBy: formData.metadata?.createdBy,
        createdAt: new Date()
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
    const propertyId = req.params.propertyId;
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
  
     
      const existingDoc = await CommercialLeaseShop.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialLeaseShop.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Lease shop updated successfully.",
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

export const deleteCommercialLeaseShop = async (req: Request, res: Response) => {
  try {
    const data = await CommercialLeaseShop.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'Lease shop listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Lease shop listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting lease shop:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete lease shop listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};
