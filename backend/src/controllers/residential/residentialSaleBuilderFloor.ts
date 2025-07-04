import { Request, Response } from 'express';
import ResidentialSaleBuilderFloor from '../../models/residential/residentialSaleBuilderFloor';


const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-RESSEBF";

        const highestShowroom = await ResidentialSaleBuilderFloor.findOne({
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

        const existingWithExactId = await ResidentialSaleBuilderFloor.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await ResidentialSaleBuilderFloor.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-RESSEBF${timestamp}`;
    }
};

// Create a new apartment listing
export const createSaleBuilderFloor = async (req: Request, res: Response) => {
  try {
    const propertyId = await generatePropertyId();
    const builderFloorData = {
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    };

    const builderFloor = new ResidentialSaleBuilderFloor(builderFloorData);
    await builderFloor.save();

    res.status(201).json({
      success: true,
      message: 'Builder Floor listing created successfully',
      data: builderFloor
    });
  } catch (error) {
    console.error('Error creating builder floor listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create builder floor listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getAllSaleBuilderFloors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Build filter object based on query parameters
    const filters: any = {};
    
    if (req.query.city) filters['basicInformation.address.city'] = req.query.city;
    if (req.query.state) filters['basicInformation.address.state'] = req.query.state;
    if (req.query.minPrice) filters.price = { $gte: parseInt(req.query.minPrice as string) };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: parseInt(req.query.maxPrice as string) };
    if (req.query.bedrooms) filters['propertyDetails.bedrooms'] = parseInt(req.query.bedrooms as string);
    if (req.query.propertyType) filters.propertyType = req.query.propertyType;

    const builderFloors = await ResidentialSaleBuilderFloor.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleBuilderFloor.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: builderFloors,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching builder floors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch builder floors',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getSaleBuilderFloorById = async (req: Request, res: Response) => {
  try {
    const builderFloor = await ResidentialSaleBuilderFloor.findOne({propertyId: req.params.propertyId});
    
    if (!builderFloor) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: builderFloor
    });
  } catch (error) {
    console.error('Error fetching builder floor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch builder floor',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const updateSaleBuilderFloor = async (req: Request, res: Response) => {
  try {
    const builderFloor = await ResidentialSaleBuilderFloor.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!builderFloor) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor not found'
      });
    }

    if (builderFloor.metadata?.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    const updatedBuilderFloor = await ResidentialSaleBuilderFloor.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        metadata: {
          ...builderFloor.metadata,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Builder Floor listing updated successfully',
      data: updatedBuilderFloor
    });
  } catch (error) {
    console.error('Error updating builder floor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update builder floor',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const deleteSaleBuilderFloor = async (req: Request, res: Response) => {
  try {
    const builderFloor = await ResidentialSaleBuilderFloor.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!builderFloor) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor not found'
      });
    }

    if (builderFloor.metadata?.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await builderFloor.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Builder Floor listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete builder floor',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Get apartments by user
export const getUserBuilderFloors = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const userId = req.body.userId;

    const builderFloors = await ResidentialSaleBuilderFloor.find({
      'metadata.createdBy': userId
    })
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleBuilderFloor.countDocuments({
      'metadata.createdBy': userId
    });

    res.status(200).json({
      success: true,
      data: builderFloors,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching user builder floors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user builder floors',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};
