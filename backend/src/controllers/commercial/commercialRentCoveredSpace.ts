import { Request, Response } from 'express';
import CommercialRentCoveredSpace from '../../models/commercial/CommercialRentCoveredSpace';

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