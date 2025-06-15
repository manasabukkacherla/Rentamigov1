import { Request, Response } from 'express';
import ResidentialSaleIndependentHouse from '../../models/residential/saleIndependentHouse';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RS-RESSEIH";

        const highestShowroom = await ResidentialSaleIndependentHouse.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1;

        if (highestShowroom) {
            const match = highestShowroom.propertyId?.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        const existingWithExactId = await ResidentialSaleIndependentHouse.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await ResidentialSaleIndependentHouse.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-RESSEIH${timestamp}`;
    }
};

// Create a new apartment listing
export const createSaleIndependentHouse = async (req: Request, res: Response) => {
  try {
    const propertyId = await generatePropertyId();
    const apartmentData = {
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    };

    const apartment = new ResidentialSaleIndependentHouse(apartmentData);
    await apartment.save();

    res.status(201).json({
      success: true,
      message: 'Apartment listing created successfully',
      data: apartment
    });
  } catch (error) {
    console.error('Error creating independent house listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create independent house listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getAllSaleIndependentHouse = async (req: Request, res: Response) => {
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

    const apartments = await ResidentialSaleIndependentHouse.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleIndependentHouse.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: apartments,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch apartments',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getSaleIndependentHouseById = async (req: Request, res: Response) => {
  try {
    const apartment = await ResidentialSaleIndependentHouse.findOne({propertyId: req.params.propertyId});
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: apartment
    });
  } catch (error) {
    console.error('Error fetching independent house:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch independent house',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const updateSaleIndependentHouse = async (req: Request, res: Response) => {
  try {
    const apartment = await ResidentialSaleIndependentHouse.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found'
      });
    }

    if (apartment?.metadata?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    const updatedsaleIndependentHouse = await ResidentialSaleIndependentHouse.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        metadata: {
          ...apartment.metadata,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Apartment listing updated successfully',
      data: updatedsaleIndependentHouse
    });
  } catch (error) {
    console.error('Error updating apartment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update apartment',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const deleteSaleIndependentHouse = async (req: Request, res: Response) => {
  try {
    const residentialSaleIndependentHouse = await ResidentialSaleIndependentHouse.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!residentialSaleIndependentHouse ) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found'
      });
    }

    if (residentialSaleIndependentHouse?.metadata?.createdBy?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await residentialSaleIndependentHouse.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Independent House listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting independent house:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete independent house',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};


export const getUserIndependentHouses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const residentialSaleIndependentHouses = await ResidentialSaleIndependentHouse.find({
      'metadata.createdBy': req.user?._id
    })
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleIndependentHouse.countDocuments({
      'metadata.createdBy': req.user?._id
    });

    res.status(200).json({
      success: true,
      data: residentialSaleIndependentHouses,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching user apartments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user apartments',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};
