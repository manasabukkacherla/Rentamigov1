import { Request, Response } from 'express';
import CommercialShed from '../../models/commercial/CommercialSellShed';
import { ICommercialSellShed } from '../../models/commercial/CommercialSellShed';

// Generate property ID with format RA-COMSHED-XXXX
const generatePropertyId = async (): Promise<string> => {
  try {
      // Prefix for the commercial sell office space property ID
      const prefix = "RA-COMSESD";

      // Find the office space with the highest property ID number
      const highestOfficeSpace = await CommercialShed.findOne({
          propertyId: { $regex: `^${prefix}\\d+$` }
      }).sort({ propertyId: -1 });

      let nextNumber = 1; // Default start number

      if (highestOfficeSpace) {
          // Extract the numeric part from the existing highest property ID
          const match = highestOfficeSpace.propertyId?.match(/(\d+)$/);
          if (match && match[1]) {
              // Convert to number and increment by 1
              nextNumber = parseInt(match[1], 10) + 1;
          }
      }

      // Create the property ID with the sequence number
      const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

      // Check if this exact ID somehow exists
      const existingWithExactId = await CommercialShed.findOne({ propertyId });

      if (existingWithExactId) {
          // In case of collision, recursively try the next number
          console.log(`Property ID ${propertyId} already exists, trying next number`);

          const forcedNextNumber = nextNumber + 1;
          const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

          const forcedExisting = await CommercialShed.findOne({ propertyId: forcedPropertyId });

          if (forcedExisting) {
              return generatePropertyId();
          }

          return forcedPropertyId;
      }

      return propertyId;
  } catch (error) {
      console.error('Error generating property ID:', error);
      const timestamp = Date.now().toString().slice(-8);
      return `RA-COMSESD${timestamp}`;
  }
};

// Create a new commercial shed listing
export const createCommercialShed = async (req: Request, res: Response) => {
  try {
    const shedData = req.body;
    
    // Basic validation - ensure required fields exist
    if (!shedData.basicInformation?.title) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: property name'
      });
    }
    
    if (!shedData.shedDetails?.totalArea) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: property area'
      });
    }

    // Generate property ID
    const propertyId = await generatePropertyId();
    
    // Add metadata and property ID
    shedData.metaData = {
      createdBy: shedData.metaData?.createdBy, 
      createdAt: new Date(),
      // status: 'pending',
      // isVerified: false,
      // isActive: true,
      // views: 0,
      // inquiries: 0,
      // favoriteCount: 0
    };
    
    // Add property ID to the shed data
    shedData.propertyId = propertyId;

    // Create and save shed with optimized approach
    const shed = new CommercialShed(shedData);
    await shed.save();

    // Return a successful response with minimal data
    return res.status(201).json({
      success: true,
      message: 'Commercial shed listing created successfully',
      data: {
        propertyId: shed.propertyId,
        _id: shed._id,
        metaData: shed.metaData
      }
    });

  } catch (error: any) {
    console.error('Error creating commercial shed:', error);

    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.message
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate property information',
        details: 'A property with this information already exists'
      });
    }

    // General error response
    return res.status(500).json({
      success: false,
      error: 'Failed to create commercial shed listing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all commercial sheds with pagination and filtering
export const getAllCommercialSheds = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;
    
    // Build filter query
    const query: any = {};
    
    if (city) {
      query['address.city'] = city;
    }
    
    if (minPrice) {
      query['pricingDetails.propertyPrice'] = { $gte: parseInt(minPrice as string, 10) };
    }
    
    if (maxPrice) {
      query['pricingDetails.propertyPrice'] = { 
        ...query['pricingDetails.propertyPrice'] || {},
        $lte: parseInt(maxPrice as string, 10) 
      };
    }
    
    if (minArea) {
      query['shedDetails.totalArea'] = { $gte: parseInt(minArea as string, 10) };
    }
    
    if (maxArea) {
      query['shedDetails.totalArea'] = { 
        ...query['shedDetails.totalArea'] || {},
        $lte: parseInt(maxArea as string, 10) 
      };
    }
    
    // Build sort query
    let sortQuery: any = { 'metaData.createdAt': -1 }; // Default sorting
    
    if (sort === 'price-asc') {
      sortQuery = { 'pricingDetails.propertyPrice': 1 };
    } else if (sort === 'price-desc') {
      sortQuery = { 'pricingDetails.propertyPrice': -1 };
    } else if (sort === 'area-asc') {
      sortQuery = { 'shedDetails.totalArea': 1 };
    } else if (sort === 'area-desc') {
      sortQuery = { 'shedDetails.totalArea': -1 };
    }
    
    // Execute query with projection for list view
    const sheds = await CommercialShed.find(query)
      .select('propertyId basicInformation.title shedDetails.totalArea pricingDetails.propertyPrice media.photos.exterior metaData')
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum)
      .lean();
    
    // Get total count for pagination
    const total = await CommercialShed.countDocuments(query);
    
    return res.status(200).json({
      success: true,
      data: sheds,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
    
  } catch (error) {
    console.error('Error fetching commercial sheds:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch commercial sheds'
    });
  }
};

// Get a single commercial shed by ID
export const getCommercialShedById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    
    const shed = await CommercialShed.findOne({propertyId})
    
    if (!shed) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shed not found'
      });
    }
    
    // Update view count
    await CommercialShed.updateOne(
      
      { $inc: { 'metaData.views': 1 } }
    );
    
    return res.status(200).json({
      success: true,
      data: shed
    });
    
  } catch (error) {
    console.error('Error fetching commercial shed:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch commercial shed'
    });
  }
};

// Update a commercial shed
export const updateCommercialShed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Try to find by MongoDB _id or propertyId
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { propertyId: id };
    
    // Update metadata
    updateData.metaData = {
      ...updateData.metaData,
      updatedAt: new Date()
    };

    const shed = await CommercialShed.findById(req.params.id);
    const userId = req.body.userId;
    if (shed?.metaData?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }
    
    const updatedShed = await CommercialShed.findOneAndUpdate(
      query,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedShed) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shed not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Commercial shed updated successfully',
      data: updatedShed
    });
    
  } catch (error: any) {
    console.error('Error updating commercial shed:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Failed to update commercial shed'
    });
  }
};

// Delete a commercial shed
export const deleteCommercialShed = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Try to find by MongoDB _id or propertyId
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { propertyId: id };
    
    const deletedShed = await CommercialShed.findOneAndDelete(query);
    const userId = req.body.userId;

    if (deletedShed?.metaData?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }
    
    if (!deletedShed) {
      return res.status(404).json({
        success: false,
        error: 'Commercial shed not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Commercial shed deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting commercial shed:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete commercial shed'
    });
  }
};
