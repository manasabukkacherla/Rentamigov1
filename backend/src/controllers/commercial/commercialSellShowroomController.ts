import { Request, Response } from 'express';
import CommercialShowroom from '../../models/commercial/CommercialsellShowroom';
import PropertySelection from '../../models/PropertySelection';

// Generate property ID with format RA-COMSESR-XXXX
const generatePropertyId = async (): Promise<string> => {
  const prefix = "RA-COMSESR";
  try {
    const highestShowroom = await CommercialShowroom.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1;
    
    if (highestShowroom) {
      const match = highestShowroom.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    const existingWithExactId = await CommercialShowroom.findOne({ propertyId });
    
    if (existingWithExactId) {
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      const forcedExisting = await CommercialShowroom.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}${timestamp}`;
  }
};

// Create a new commercial showroom listing
export const createShowroom = async (req: Request, res: Response) => {
  try {
    const showroomData = req.body;
    console.log(showroomData)
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // // Add metadata
    showroomData.metadata = {
      createdBy: showroomData.metadata.createdBy,
      createdAt: new Date(),
    };
    
    // // Add property ID
    showroomData.propertyId = propertyId;

    // // Create new showroom listing
    const showroom = new CommercialShowroom(showroomData);
    await showroom.save();

    res.status(201).json({
      success: true,
      message: 'Commercial showroom listing created successfully',
      data: showroom
    });
  } catch (error) {
    console.error('Error creating commercial showroom:', error);
    res.status(500).json({ error: 'Failed to create commercial showroom listing' });
  }
};

// Get all commercial showroom listings
export const getAllShowrooms = async (req: Request, res: Response) => {
  try {
    const showrooms = await CommercialShowroom.find()
      .sort({ 'metadata.createdAt': -1 });

    res.status(200).json({
      success: true,
      count: showrooms.length,
      data: showrooms
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching commercial showroom listings',
      error: error.message
    });
  }
};

// Get single commercial showroom listing
export const getShowroom = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const showroom = await CommercialShowroom.findOne({ propertyId });

    if (!showroom) {
      return res.status(404).json({
        success: false,
        message: 'Commercial showroom listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: showroom
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching commercial showroom listing',
      error: error.message
    });
  }
};

// Update commercial showroom listing
export const updateShowroom = async (req: Request, res: Response) => {
  try {
    const showroom = await CommercialShowroom.findById(req.params.id);
    const userId = req.body.userId; 

    if (showroom?.metadata?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    if (!showroom) {
      return res.status(404).json({
        success: false,
        message: 'Commercial showroom listing not found'
      });
    }

    // Update metadata
    req.body.metadata = {
      ...showroom.metadata,
      updatedAt: new Date()
    };

    const updatedShowroom = await CommercialShowroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Commercial showroom listing updated successfully',
      data: updatedShowroom
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating commercial showroom listing',
      error: error.message
    });
  }
};

// Delete commercial showroom listing
export const deleteShowroom = async (req: Request, res: Response) => {
  try {
    const showroom = await CommercialShowroom.findById(req.params.id);
    const userId = req.body.userId;

    if (!showroom) {
      return res.status(404).json({
        success: false,
        message: 'Commercial showroom listing not found'
      });
    }

    if (showroom?.metadata?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }
    await showroom.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Commercial showroom listing deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting commercial showroom listing',
      error: error.message
    });
  }
};

// Search commercial showroom listings
export const searchShowrooms = async (req: Request, res: Response) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      showroomType,
      furnishingStatus
    } = req.query;

    const query: any = {};

    if (city) query['basicInformation.address.city'] = city;
    if (showroomType) query['basicInformation.showroomType'] = showroomType;
    if (furnishingStatus) query['propertyDetails.furnishingStatus'] = furnishingStatus;

    if (minPrice || maxPrice) {
      query['pricingDetails.price'] = {};
      if (minPrice) query['pricingDetails.price'].$gte = Number(minPrice);
      if (maxPrice) query['pricingDetails.price'].$lte = Number(maxPrice);
    }

    if (minArea || maxArea) {
      query['propertyDetails.area.superBuiltUpArea'] = {};
      if (minArea) query['propertyDetails.area.superBuiltUpArea'].$gte = Number(minArea);
      if (maxArea) query['propertyDetails.area.superBuiltUpArea'].$lte = Number(maxArea);
    }

    const showrooms = await CommercialShowroom.find(query)
      .sort({ 'metadata.createdAt': -1 });

    res.status(200).json({
      success: true,
      count: showrooms.length,
      data: showrooms
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error searching commercial showroom listings',
      error: error.message
    });
  }
}; 