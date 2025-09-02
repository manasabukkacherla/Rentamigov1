import { Request, Response } from 'express';
import CommercialSellShop from '../../models/commercial/CommercialsellShop';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMSESH";
    
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
    return `RA-COMSESH${timestamp}`;
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
        createdBy: formData.metadata.createdBy,
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



export const getAllCommercialSellShop = async (req: Request, res: Response) => {
  try {
    const shop = await CommercialSellShop.find({});
    
    res.status(200).json({
      success: true,
      count: shop.length,
      data:shop
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch commercial shop sale listings'
    });
  }
};

export const getCommercialSellShopById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await CommercialSellShop.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ error: 'Commercial sell shop property not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Commercial sell shop property retrieved successfully',
      data: property
    });
  } catch (error) {
    console.error('Error fetching commercial sell shop property:', error);
    res.status(500).json({ error: 'Failed to fetch commercial sell shop property' });
  }
}; 

export const updateCommercialSellShop = async (req: Request, res: Response) => {
    try {
      const documentId = req.params.id; 
      const incomingData = req.body?.data;
    const userId = req.body.userId;
    
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
  
     
      const existingDoc = await CommercialSellShop.findById(documentId);
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }

      if (existingDoc.metadata?.createdBy?.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this listing'
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialSellShop.findByIdAndUpdate(
        documentId,
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Sell shop updated successfully.",
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
  
export const deleteCommercialSellShop = async (req: Request, res: Response) => {
        try {
          const data = await CommercialSellShop.findByIdAndDelete(req.params.id);
          const userId = req.body.userId;

          if (data?.metadata?.createdBy?.toString() !== userId) {
            return res.status(403).json({
              success: false,
              message: 'Not authorized to delete this listing'
            });
          }
  
          if (!data) {
              return res.status(404).json({
                  success: false,
                  message: 'Sell shop listing not found'
              });
          }
  
          res.status(200).json({
              success: true,
              message: 'Sell shop listing deleted successfully'
          });
      } catch (error) {
          console.error('Error deleting Sell shop:', error);
          res.status(500).json({
              success: false,
              error: 'Failed to delete Sell shop listing',
              message: error instanceof Error ? error.message : 'Unknown error'
          });
      }
  };