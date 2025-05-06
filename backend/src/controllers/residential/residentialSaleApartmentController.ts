import { Request, Response } from 'express';
import ResidentialSaleApartment from '../../models/residential/residentialSaleApartment';

// Generate Property ID for Residential Sale Apartment
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for the residential sale apartment property ID
    const prefix = "RA-RESSA";
    
    // Find the property with the highest property ID number
    const highestProperty = await ResidentialSaleApartment.findOne({
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
    const existingWithExactId = await ResidentialSaleApartment.findOne({ propertyId });
    
    if (existingWithExactId) {
      // In case of collision (e.g., if IDs were manually entered), recursively try the next number
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      
      // Force increment the next number and try again
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      
      // Double-check this new ID
      const forcedExisting = await ResidentialSaleApartment.findOne({ propertyId: forcedPropertyId });
      
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
    return `RA-RESSA${timestamp}`;
  }
};

// Create a new Residential Sale Apartment
export const createResidentialSaleApartment = async (req: Request, res: Response) => {
  try {
    const apartment = new ResidentialSaleApartment(req.body);
    
    // Generate property ID
    const propertyId = await generatePropertyId();
    
    // Set the generated property ID to the apartment data
    apartment.propertyId = propertyId;

    // Save the new apartment
    const savedApartment = await apartment.save();

    res.status(201).json({
      success: true,
      message: 'Residential sale apartment created successfully',
      data: savedApartment
    });
  } catch (error: any) {
    console.error('Error creating residential sale apartment:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create residential sale apartment',
      error: error
    });
  }
};

// Get all Residential Sale Apartments
export const getAllResidentialSaleApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await ResidentialSaleApartment.find();
    res.status(200).json({
      success: true,
      count: apartments.length,
      data: apartments
    });
  } catch (error: any) {
    console.error('Error fetching residential sale apartments:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch residential sale apartments',
      error: error
    });
  }
};

// Get a single Residential Sale Apartment by ID
export const getResidentialSaleApartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const apartment = await ResidentialSaleApartment.findOne({ propertyId: id });
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Residential sale apartment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: apartment
    });
  } catch (error: any) {
    console.error('Error fetching residential sale apartment by ID:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch residential sale apartment',
      error: error
    });
  }
};

// Update a Residential Sale Apartment by ID
export const updateResidentialSaleApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const apartment = await ResidentialSaleApartment.findOneAndUpdate(
      { propertyId: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Residential sale apartment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Residential sale apartment updated successfully',
      data: apartment
    });
  } catch (error: any) {
    console.error('Error updating residential sale apartment:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update residential sale apartment',
      error: error
    });
  }
};

// Delete a Residential Sale Apartment by ID
export const deleteResidentialSaleApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const apartment = await ResidentialSaleApartment.findOneAndDelete({ propertyId: id });
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        message: 'Residential sale apartment not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Residential sale apartment deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting residential sale apartment:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete residential sale apartment',
      error: error
    });
  }
};
