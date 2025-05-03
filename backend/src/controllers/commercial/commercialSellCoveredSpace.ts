import { Request, Response } from 'express';
import CommercialSellCoveredSpace from '../../models/commercial/CommercialSellCoveredSpace';

// Helper function to generate a unique property ID
const generatePropertyId = async (): Promise<string> => {
  // Prefix for the commercial sell covered space property ID
  const prefix = "RA-COMSECS";
  
  try {
    // Find the property with the highest property ID number
    const highestProperty = await CommercialSellCoveredSpace.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1; // Default start number
    
    if (highestProperty && highestProperty.propertyId) {
      // Extract the numeric part from the existing highest property ID
      const match = highestProperty.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        // Convert to number and increment by 1
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    // Create the property ID with the sequence number
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    
    // Check if this exact ID somehow exists (should be rare but possible with manual entries)
    const existingWithExactId = await CommercialSellCoveredSpace.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await CommercialSellCoveredSpace.findOne({ propertyId: forcedPropertyId });
      
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
    return `${prefix}${timestamp}`;
  }
};

// Create a new commercial sell covered space listing
export const createCommercialSellCoveredSpace = async (req: Request, res: Response) => {
  try {
    // Log the incoming request body
    console.log('Received form data:', req.body);

    // Generate a unique property ID
    const propertyId = await generatePropertyId();

    // Create a new commercial sell covered space document
    const newCoveredSpace = new CommercialSellCoveredSpace({
      propertyId,
        ...req.body,
      metadata: {
        ...req.body.metadata,
        createdBy: req.user?._id || null,
        createdAt: new Date()
      }
    });

    // Save the document to the database
    const savedCoveredSpace = await newCoveredSpace.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Commercial covered space sale listing created successfully',
      data: savedCoveredSpace
    });

  } catch (error: any) {
    // Log the error for debugging
    console.error('Error creating commercial covered space sale listing:', error);

    // Send error response
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create commercial covered space sale listing',
      details: error.errors ? Object.values(error.errors).map((err: any) => err.message) : []
    });
  }
};

// Get all commercial sell covered space listings
export const getAllCommercialSellCoveredSpaces = async (req: Request, res: Response) => {
  try {
    const coveredSpaces = await CommercialSellCoveredSpace.find({});
    
    res.status(200).json({
      success: true,
      count: coveredSpaces.length,
      data: coveredSpaces
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch commercial covered space sale listings'
    });
  }
};

