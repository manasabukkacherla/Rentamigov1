import { Request, Response } from 'express';
import CommercialRentCoveredSpace from '../../models/commercial/CommercialRentCoveredSpace';
import _ = require('lodash');

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
        // Prefix for the commercial office space property ID
        const prefix = "RA-COMRECS";

        // Find the office space with the highest property ID number
        const highestOfficeSpace = await CommercialRentCoveredSpace.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1; // Default start number

        if (highestOfficeSpace) {
            // Extract the numeric part from the existing highest property ID
            const match = highestOfficeSpace.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        // Check if this exact ID somehow exists
        const existingWithExactId = await CommercialRentCoveredSpace.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialRentCoveredSpace.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMRECS${timestamp}`;
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
      ...req.body,
      metadata: {
        ...req.body.metadata,
        createdBy: req.body.metadata.createdBy,
        createdAt: new Date()
      }
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
// export const getAllCommercialRentCoveredSpaces = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, limit = 10, city, minPrice, maxPrice, minArea, maxArea, sort } = req.query;
//     const pageNum = parseInt(page as string, 10);
//     const limitNum = parseInt(limit as string, 10);
//     const skip = (pageNum - 1) * limitNum;

//     const query: any = {};

//     if (city) query['basicInformation.address.city'] = city;
//     if (minPrice) query['RentTerms.RentDetails.RentAmount.amount'] = { $gte: parseInt(minPrice as string, 10) };
//     if (maxPrice) {
//       query['RentTerms.RentDetails.RentAmount.amount'] = {
//         ...(query['RentTerms.RentDetails.RentAmount.amount'] || {}),
//         $lte: parseInt(maxPrice as string, 10)
//       };
//     }

//     if (minArea) query['coveredSpaceDetails.totalArea'] = { $gte: parseInt(minArea as string, 10) };
//     if (maxArea) {
//       query['coveredSpaceDetails.totalArea'] = {
//         ...(query['coveredSpaceDetails.totalArea'] || {}),
//         $lte: parseInt(maxArea as string, 10)
//       };
//     }

//     let sortQuery: any = { 'metadata.createdAt': -1 };
//     if (sort === 'price-asc') sortQuery = { 'RentalTerms.rentDetails.expectedRent': 1 };
//     if (sort === 'price-desc') sortQuery = { 'RentTerms.RentDetails.RentAmount.amount': -1 };
//     if (sort === 'area-asc') sortQuery = { 'coveredSpaceDetails.totalArea': 1 };
//     if (sort === 'area-desc') sortQuery = { 'coveredSpaceDetails.totalArea': -1 };

//     const coveredSpaces = await CommercialRentCoveredSpace.find(query)
//       .populate('metadata.userId', 'name email')
//       .sort(sortQuery)
//       .skip(skip)
//       .limit(limitNum)
//       .lean();

//     const total = await CommercialRentCoveredSpace.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: coveredSpaces.length,
//       data: coveredSpaces,
//       pagination: {
//         total,
//         page: pageNum,
//         limit: limitNum,
//         pages: Math.ceil(total / limitNum)
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Get failed', message: (error as Error).message });
//   }
// };
export const getAllCommercialRentCoveredSpaces= async (req: Request, res: Response) => {
  try {
    const Properties = await CommercialRentCoveredSpace.find().sort({ 'metaData.createdAt': -1 });
    
    res.status(200).json({
      success: true,
      count: Properties.length,
      data: Properties
    });
  } catch (error: any) {
    console.error('Error fetching commercial rent covered space properties:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch commercial rent covered space properties',
      error: error
    });
  }
};
// GET BY ID
export const getCommercialRentCoveredSpaceById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    const coveredSpace = await CommercialRentCoveredSpace.findOne({propertyId})
      .populate('metadata.createdBy', 'name email');

    if (!coveredSpace) return res.status(404).json({ success: false, error: 'Not found' });

    res.status(200).json({ success: true, data: coveredSpace });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Get by ID failed', message: (error as Error).message });
  }
};

// UPDATE
export const updateCommercialRentCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
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

   
    const existingDoc = await CommercialRentCoveredSpace.findById(documentId);
    if (!existingDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const mergedData = _.merge(existingDoc.toObject(), cleanedData);

    const updatedDoc = await CommercialRentCoveredSpace.findByIdAndUpdate(
      documentId,
      { $set: mergedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "rent covered space updated successfully.",
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

// DELETE
export const deleteCommercialRentCoveredSpace = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = await CommercialRentCoveredSpace.findByIdAndDelete(req.params.id);

    if (!data) {
        return res.status(404).json({
            success: false,
            message: 'rent covered space listing not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'rent covered space listing deleted successfully'
    });
} catch (error) {
    console.error('Error deleting rent covered space:', error);
    res.status(500).json({
        success: false,
        error: 'Failed to delete rent covered space listing',
        message: error instanceof Error ? error.message : 'Unknown error'
    });
}
};