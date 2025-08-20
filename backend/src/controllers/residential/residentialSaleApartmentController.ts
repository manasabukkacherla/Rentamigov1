import { Request, Response } from 'express';
import ResidentialSaleApartment from '../../models/residential/saleApartment';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-RESSEAP";

        const highestShowroom = await ResidentialSaleApartment.findOne({
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

        const existingWithExactId = await ResidentialSaleApartment.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await ResidentialSaleApartment.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-RESSEAP${timestamp}`;
    }
};

// Create a new apartment listing
export const createSaleApartment = async (req: Request, res: Response) => {
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

    const apartment = new ResidentialSaleApartment(apartmentData);
    await apartment.save();

    res.status(201).json({
      success: true,
      message: 'Apartment listing created successfully',
      data: apartment
    });
  } catch (error) {
    console.error('Error creating apartment listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create apartment listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const getAllSaleApartments = async (req: Request, res: Response) => {
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

    const apartments = await ResidentialSaleApartment.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleApartment.countDocuments(filters);

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

export const getSaleApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await ResidentialSaleApartment.findOne({propertyId: req.params.propertyId});
    
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
    console.error('Error fetching apartment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch apartment',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

export const updateSaleApartment = async (req: Request, res: Response) => {
  try {
    const apartment = await ResidentialSaleApartment.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found'
      });
    }

    if (apartment.metadata.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    const updatedApartment = await ResidentialSaleApartment.findByIdAndUpdate(
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
      data: updatedApartment
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

export const deleteSaleApartment = async (req: Request, res: Response) => {
  try {
    const apartment = await ResidentialSaleApartment.findById(req.params.id);
    const userId = req.body.userId;
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Apartment not found'
      });
    }

    if (apartment.metadata.createdBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this listing'
      });
    }

    await apartment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Apartment listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete apartment',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Get apartments by user
export const getUserApartments = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const userId = req.body.userId;

    const apartments = await ResidentialSaleApartment.find({
      'metadata.createdBy': userId
    })
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialSaleApartment.countDocuments({
      'metadata.createdBy': userId
    });

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
    console.error('Error fetching user apartments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user apartments',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};
