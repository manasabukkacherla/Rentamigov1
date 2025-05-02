import { Request, Response } from 'express';
import CommercialRentCoveredSpace from '../../models/commercial/CommercialRentCoveredSpace';


interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    name?: string;
    email?: string;
  };
}

// Helper function to generate a unique property ID
const generatePropertyId = async (): Promise<string> => {
  try {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const propertyId = `RA-COMRECS-${timestamp}-${randomNum}`;

    // Check if this ID already exists
    const existingProperty = await CommercialRentCoveredSpace.findOne({ propertyId });
    if (existingProperty) {
      // If ID exists, try again recursively
      return generatePropertyId();
    }

    return propertyId;
  } catch (error) {
    // If there's an error, return a timestamp-based ID as fallback
    return `RA-COMRECS-${Date.now()}`;
  }
};

// Create a new commercial rent covered space listing
export const createCommercialRentCoveredSpace = async (req: Request, res: Response) => {
  try {
    // Log the incoming request body
    console.log('Received form data:', req.body);

    // Generate a unique property ID
    const propertyId = await generatePropertyId();

    // Create a new commercial rent covered space document
    const newCoveredSpace = new CommercialRentCoveredSpace({
      propertyId,
      ...req.body
    });

    // Save the document to the database
    const savedCoveredSpace = await newCoveredSpace.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Commercial covered space listing created successfully',
      data: savedCoveredSpace
    });

  } catch (error: any) {
    // Log the error for debugging
    console.error('Error creating commercial covered space listing:', error);

    // Send error response
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create commercial covered space listing',
      details: error.errors ? Object.values(error.errors).map((err: any) => err.message) : []
    });
  }
}; 

// GET ALL with pagination and filters
export const getAllCommercialRentCoveredSpaces = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};

    if (city) query['basicInformation.address.city'] = city;
    if (minPrice) query['RentTerms.RentDetails.RentAmount.amount'] = { $gte: parseInt(minPrice as string, 10) };
    if (maxPrice) {
      query['RentTerms.RentDetails.RentAmount.amount'] = {
        ...(query['RentTerms.RentDetails.RentAmount.amount'] || {}),
        $lte: parseInt(maxPrice as string, 10)
      };
    }

    if (minArea) query['coveredSpaceDetails.totalArea'] = { $gte: parseInt(minArea as string, 10) };
    if (maxArea) {
      query['coveredSpaceDetails.totalArea'] = {
        ...(query['coveredSpaceDetails.totalArea'] || {}),
        $lte: parseInt(maxArea as string, 10)
      };
    }

    let sortQuery: any = { 'metadata.createdAt': -1 };
    if (sort === 'price-asc') sortQuery = { 'RentTerms.RentDetails.RentAmount.amount': 1 };
    if (sort === 'price-desc') sortQuery = { 'RentTerms.RentDetails.RentAmount.amount': -1 };
    if (sort === 'area-asc') sortQuery = { 'coveredSpaceDetails.totalArea': 1 };
    if (sort === 'area-desc') sortQuery = { 'coveredSpaceDetails.totalArea': -1 };

    const coveredSpaces = await CommercialRentCoveredSpace.find(query)
      .populate('metadata.userId', 'name email')
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await CommercialRentCoveredSpace.countDocuments(query);

    res.status(200).json({
      success: true,
      count: coveredSpaces.length,
      data: coveredSpaces,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Get failed', message: (error as Error).message });
  }
};

// GET BY ID
export const getCommercialRentCoveredSpaceById = async (req: Request, res: Response) => {
  try {
    const coveredSpace = await CommercialRentCoveredSpace.findById(req.params.id)
      .populate('metadata.userId', 'name email');

    if (!coveredSpace) return res.status(404).json({ success: false, error: 'Not found' });

    res.status(200).json({ success: true, data: coveredSpace });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Get by ID failed', message: (error as Error).message });
  }
};

// UPDATE
export const updateCommercialRentCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const coveredSpace = await CommercialRentCoveredSpace.findById(req.params.id);
    if (!coveredSpace) return res.status(404).json({ success: false, error: 'Not found' });

    if (req.user && coveredSpace.metadata.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const updatedData = {
      ...req.body,
      metadata: {
        ...coveredSpace.metadata,
        updatedAt: new Date()
      }
    };

    const updated = await CommercialRentCoveredSpace.findByIdAndUpdate(req.params.id, updatedData, {
      new: true, runValidators: true
    });

    res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Update failed', message: (error as Error).message });
  }
};

// DELETE
export const deleteCommercialRentCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const coveredSpace = await CommercialRentCoveredSpace.findById(req.params.id);
    if (!coveredSpace) return res.status(404).json({ success: false, error: 'Not found' });

    if (req.user && coveredSpace.metadata.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    await CommercialRentCoveredSpace.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Delete failed', message: (error as Error).message });
  }
};


