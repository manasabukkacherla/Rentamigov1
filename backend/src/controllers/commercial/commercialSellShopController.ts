import { Request, Response } from 'express';
import mongoose from 'mongoose';
import CommercialsellShop from '../../models/commercial/CommercialsellShop';

// Custom request type with authenticated user
interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Generate a unique property ID for commercial shops
 */
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for commercial sell shop property ID
    const prefix = "RA-COMSESH";
    
    // Find the shop with the highest property ID number
    const highestShop = await CommercialsellShop.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestShop && highestShop.propertyId) {
      // Extract the numeric part from the existing highest property ID
      const match = highestShop.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        // Convert to number and increment by 1
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    // Create the property ID with the sequence number
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Check if this exact ID somehow exists (should be rare but possible with manual entries)
    const existingWithExactId = await CommercialsellShop.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialsellShop.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        // If still colliding, recursively generate a new ID
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    // Fallback to timestamp-based ID if there's an error
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMSESH${timestamp}`;
  }
};

/**
 * Create a new commercial shop listing for sale
 * POST /api/commercial/sell/shops
 * Public/Private - Will use authenticated user if available
 */
export const createCommercialSellShop = async (req: AuthenticatedRequest, res: Response) => {
  try {
    console.log('Creating commercial sell shop listing...');
    console.log('Request body structure:', Object.keys(req.body));
    
    // Check for media files
    if (req.body.media) {
      console.log('Media files found in request');
      console.log('Media types:', Object.keys(req.body.media));
      
      // Log photo categories
      if (req.body.media.photos) {
        console.log('Photo categories:', Object.keys(req.body.media.photos));
        
        // Check the first few characters of each file type
        Object.entries(req.body.media.photos).forEach(([category, files]) => {
          if (Array.isArray(files) && files.length > 0) {
            console.log(`${category} photos found:`, files.length);
            // Check if the first file is a base64 string
            const firstFile = files[0] as string;
            if (typeof firstFile === 'string' && firstFile.startsWith('data:')) {
              console.log(`${category} first photo format: Base64 string starting with:`, firstFile.substring(0, 30));
            } else {
              console.log(`${category} first photo format:`, typeof firstFile);
            }
          }
        });
      }
    }
    
    const shopData = req.body;
    
    // Generate property ID
    const propertyId = await generatePropertyId();
    console.log('Generated property ID:', propertyId);
    
    // Set the propertyId
    shopData.propertyId = propertyId;
    
    // Set the createdBy field if user is authenticated
    if (req.user && req.user._id) {
      shopData.metadata = {
        ...shopData.metadata,
        createdBy: req.user._id,
        status: 'active'
      };
    }
    
    // Ensure metadata has a status even if user is not authenticated
    if (!shopData.metadata) {
      shopData.metadata = { status: 'active', createdAt: new Date() };
    } else if (!shopData.metadata.status) {
      shopData.metadata.status = 'active';
    }
    
    console.log('Creating shop with ID:', shopData.propertyId);
    
    // Create new shop
    const shop = await CommercialsellShop.create(shopData);
    
    console.log('Shop created successfully:', shop.propertyId);
    
    res.status(201).json({
      success: true,
      data: shop,
      message: 'Commercial shop listing created successfully'
    });
  } catch (error: any) {
    console.error('Error creating commercial sell shop:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: { [key: string]: string } = {};
      
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        validationErrors
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A shop with this property ID already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create commercial shop listing',
      details: error.message
    });
  }
};

/**
 * Get all commercial shop listings for sale
 * GET /api/commercial/sell/shops
 * Public
 */
export const getAllCommercialSellShops = async (req: Request, res: Response) => {
  try {
    // Extract query parameters for filtering
    const { 
      minPrice, 
      maxPrice, 
      city, 
      state, 
      shopType,
      minArea,
      maxArea
    } = req.query;
    
    // Build filter object
    const filter: any = { 'metadata.status': { $ne: 'deleted' } };
    
    // Apply price filters
    if (minPrice || maxPrice) {
      filter['pricingDetails.propertyPrice'] = {};
      if (minPrice) filter['pricingDetails.propertyPrice'].$gte = Number(minPrice);
      if (maxPrice) filter['pricingDetails.propertyPrice'].$lte = Number(maxPrice);
    }
    
    // Apply location filters
    if (city) filter['basicInformation.address.city'] = new RegExp(city as string, 'i');
    if (state) filter['basicInformation.address.state'] = new RegExp(state as string, 'i');
    
    // Apply shop type filter
    if (shopType) filter['basicInformation.shopType'] = { $in: [shopType] };
    
    // Apply area filters
    if (minArea || maxArea) {
      filter['propertyDetails.area.totalArea'] = {};
      if (minArea) filter['propertyDetails.area.totalArea'].$gte = Number(minArea);
      if (maxArea) filter['propertyDetails.area.totalArea'].$lte = Number(maxArea);
    }
    
    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Execute query with pagination
    const shops = await CommercialsellShop.find(filter)
      .sort({ 'metadata.createdAt': -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination info
    const total = await CommercialsellShop.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: shops.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: shops
    });
  } catch (error: any) {
    console.error('Error fetching commercial sell shops:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve commercial shop listings',
      details: error.message
    });
  }
};

/**
 * Get a single commercial shop listing by ID
 * GET /api/commercial/sell/shops/:id
 * Public
 */
export const getCommercialSellShopById = async (req: Request, res: Response) => {
  try {
    const shop = await CommercialsellShop.findOne({
      $or: [
        { propertyId: req.params.id },
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null }
      ],
      'metadata.status': { $ne: 'deleted' }
    });

    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shop listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: shop
    });
  } catch (error: any) {
    console.error('Error retrieving commercial sell shop:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve commercial shop listing',
      details: error.message
    });
  }
};

/**
 * Update a commercial shop listing
 * PUT /api/commercial/sell/shops/:id
 * Private - only listing creator can update
 */
export const updateCommercialSellShop = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Find the shop first to check ownership
    const shop = await CommercialsellShop.findOne({
      $or: [
        { propertyId: req.params.id },
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null }
      ],
      'metadata.status': { $ne: 'deleted' }
    });
    
    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shop listing not found'
      });
    }
    
    // Check if user has permission to update this listing
    if (req.user && req.user._id && shop.metadata?.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to update this listing'
      });
    }
    
    // Update the shop
    const updatedShop = await CommercialsellShop.findByIdAndUpdate(
      shop._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedShop,
      message: 'Commercial shop listing updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating commercial sell shop:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: { [key: string]: string } = {};
      
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update commercial shop listing',
      details: error.message
    });
  }
};

/**
 * Delete a commercial shop listing (soft delete)
 * DELETE /api/commercial/sell/shops/:id
 * Private - only listing creator can delete
 */
export const deleteCommercialSellShop = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Find the shop to delete
    const shop = await CommercialsellShop.findOne({
      $or: [
        { propertyId: id },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
      ],
      'metadata.status': { $ne: 'deleted' }
    });
    
    if (!shop) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shop listing not found'
      });
    }
    
    // Check if user has permission to delete this listing
      if (req.user && req.user._id && shop.metadata?.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to delete this listing'
      });
    }
    
    // Soft delete - update status to 'deleted'
    const deletedShop = await CommercialsellShop.findByIdAndUpdate(
      shop._id,
      { $set: { 'metadata.status': 'deleted' } },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Commercial shop listing deleted successfully',
      data: deletedShop
    });
  } catch (error: any) {
    console.error('Error deleting commercial sell shop:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete commercial shop listing',
      details: error.message
    });
  }
}; 