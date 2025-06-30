import { Request, Response } from 'express';
import CommercialSellRetailStore from '../../models/commercial/CommercialSellRetailStore';
import mongoose from 'mongoose';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    name?: string;
    email?: string;
  };
}

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMSERS";
    
    const highestShop = await CommercialSellRetailStore.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1;
    
    if (highestShop) {
      const match = highestShop?.propertyId?.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    const existingWithExactId = await CommercialSellRetailStore.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialSellRetailStore.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSERS${timestamp}`;
  }
};

export const createCommercialSellRetailStore = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();

    // Prepare metadata
    const metadata = {
      ...formData.metadata,
      createdBy: formData.metadata.createdBy,
      createdAt: new Date(),
    };

    // Construct the data object according to the Mongoose schema
    const shopData = {
      ...formData,
      propertyId,
      metadata,
    };

    const shop = new CommercialSellRetailStore(shopData);
    await shop.save();

    res.status(201).json({
      success: true,
      message: 'Commercial sell retail store listing created successfully',
      data: {
        _id: shop._id,
        propertyId: shop.propertyId,
      },
    });
  } catch (error: any) {
    console.error('Error creating commercial sell retail store:', error);
    // Mongoose validation errors are helpful to send back to the client
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to create commercial sell retail store',
      details: error.message,
    });
  }
};

export const getAllCommercialSellRetailStores = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for filtering
    const { city, state, minPrice, maxPrice, minArea, maxArea } = req.query;
    
    // Build filter object
    const filter: any = {
      'metadata.status': { $ne: 'deleted' }
    };
    
    // Add location filters if provided
    if (city) filter['basicInformation.address.city'] = city;
    if (state) filter['basicInformation.address.state'] = state;
    
    // Add price range filter if provided
    if (minPrice || maxPrice) {
      filter['priceDetails.price'] = {};
      if (minPrice) filter['priceDetails.price'].$gte = Number(minPrice);
      if (maxPrice) filter['priceDetails.price'].$lte = Number(maxPrice);
    }
    
    // Add area range filter if provided
    if (minArea || maxArea) {
      filter['propertyDetails.area.totalArea'] = {};
      if (minArea) filter['propertyDetails.area.totalArea'].$gte = Number(minArea);
      if (maxArea) filter['propertyDetails.area.totalArea'].$lte = Number(maxArea);
    }

    const shops = await CommercialSellRetailStore.find(filter)
      .sort({ 'metadata.createdAt': -1 });

    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve commercial sell retail store listings',
      details: error.message
    });
  }
};

export const getCommercialSellRetailStoreById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const shop = await CommercialSellRetailStore.findOne({ propertyId });

    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial sell retail store listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: shop
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve commercial sell retail store listing',
      details: error.message
    });
  }
};

export const updateCommercialSellRetailStore = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Find the shop to update
    const shop = await CommercialSellRetailStore.findOne({
      $or: [
        { propertyId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
      ],
      'metadata.status': { $ne: 'deleted' }
    });
    
    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial sell retail store listing not found'
      });
    }
    
    // Check if user has permission to update this listing
    // if (req.user && req.user._id && shop.metadata.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     error: 'You do not have permission to update this listing'
    //   });
    // }
    
    // Update the shop with new data
    // Don't allow changing propertyId or metadata.userId
    delete updateData.propertyId;
    if (updateData.metadata) {
      delete updateData.metadata.createdBy;
      // Update modified time
      updateData.metadata.updatedAt = new Date();
    }
    
    const updatedShop = await CommercialSellRetailStore.findByIdAndUpdate(
      shop._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Commercial sell retail store listing updated successfully',
      data: updatedShop
    });
  } catch (error: any) {
    console.error('Error updating commercial sell retail store:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update commercial sell retail store listing',
      details: error.message
    });
  }
};

export const deleteCommercialSellRetailStore = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Find the shop to delete
    const shop = await CommercialSellRetailStore.findOne({
      $or: [
        { propertyId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
      ],
      'metadata.status': { $ne: 'deleted' }
    });
    
    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial sell retail store listing not found'
      });
    }
    
    // Check if user has permission to delete this listing
    // if (req.user && req.user._id && shop.metadata.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({
    //     success: false,
    //     error: 'You do not have permission to delete this listing'
    //   });
    // }
    
    // Soft delete - update status to 'deleted'
    const deletedShop = await CommercialSellRetailStore.findByIdAndUpdate(
      shop._id,
      { $set: { 'metadata.status': 'deleted' } },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Commercial sell retail store listing deleted successfully',
      data: deletedShop
    });
  } catch (error: any) {
    console.error('Error deleting commercial sell retail store:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete commercial sell retail store listing',
      details: error.message
    });
  }
};


