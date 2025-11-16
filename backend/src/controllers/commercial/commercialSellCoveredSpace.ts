import { Request, Response } from 'express';
import _ from 'lodash';
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
    console.log('Received form data:', JSON.stringify(req.body, null, 2));

    // Generate a unique property ID
    const propertyId = await generatePropertyId();

    // Transform the incoming data to match schema
    const transformData = (body: any) => {
      const transformed = { ...body };
      
      // Ensure waterAvailability is an array
      if (transformed.propertyDetails?.waterAvailability && !Array.isArray(transformed.propertyDetails.waterAvailability)) {
        transformed.propertyDetails.waterAvailability = [transformed.propertyDetails.waterAvailability];
      }

      // Convert string numbers to actual numbers
      if (transformed.spaceDetails) {
        transformed.spaceDetails.totalArea = Number(transformed.spaceDetails.totalArea) || 0;
        transformed.spaceDetails.coveredArea = Number(transformed.spaceDetails.coveredArea) || 0;
        transformed.spaceDetails.openArea = Number(transformed.spaceDetails.openArea) || 0;
        
        // Handle roadWidth conversion
        if (transformed.spaceDetails.roadWidth && typeof transformed.spaceDetails.roadWidth !== 'object') {
          transformed.spaceDetails.roadWidth = {
            value: Number(transformed.spaceDetails.roadWidth) || 0,
            unit: 'feet'
          };
        }
        
        // Handle ceilingHeight conversion
        if (transformed.spaceDetails.ceilingHeight && typeof transformed.spaceDetails.ceilingHeight !== 'object') {
          transformed.spaceDetails.ceilingHeight = {
            value: Number(transformed.spaceDetails.ceilingHeight) || 0,
            unit: 'feet'
          };
        }
        
        // Handle openSides
        if (transformed.spaceDetails.openSides !== undefined) {
          transformed.spaceDetails.noOfOpenSides = String(transformed.spaceDetails.openSides);
          delete transformed.spaceDetails.openSides;
        }
      }

      // Convert area fields to numbers
      if (transformed.propertyDetails?.area) {
        transformed.propertyDetails.area.totalArea = Number(transformed.propertyDetails.area.totalArea) || 0;
        transformed.propertyDetails.area.builtUpArea = Number(transformed.propertyDetails.area.builtUpArea) || 0;
        transformed.propertyDetails.area.carpetArea = Number(transformed.propertyDetails.area.carpetArea) || 0;
      }

      // Convert floor numbers
      if (transformed.propertyDetails?.floor) {
        transformed.propertyDetails.floor.floorNumber = Number(transformed.propertyDetails.floor.floorNumber) || 0;
        transformed.propertyDetails.floor.totalFloors = Number(transformed.propertyDetails.floor.totalFloors) || 0;
      }

      // Convert electricity supply
      if (transformed.propertyDetails?.electricitySupply) {
        transformed.propertyDetails.electricitySupply.powerLoad = Number(transformed.propertyDetails.electricitySupply.powerLoad) || 0;
      }

      return transformed;
    };

    const transformedData = transformData(req.body);

    // Create new document
    const newCoveredSpace = new CommercialSellCoveredSpace({
      propertyId,
      ...transformedData,
      metadata: {
        createdBy: req.body.metadata?.createdBy || null,
        createdAt: new Date(),
        propertyType: 'Commercial',
        intent: 'Sell',
        propertyName: 'Covered Space',
        status: 'Available'
      }
    });

    console.log('Saving document:', JSON.stringify(newCoveredSpace, null, 2));

    // Save to database
    const savedCoveredSpace = await newCoveredSpace.save();

    res.status(201).json({
      success: true,
      message: 'Commercial covered space sale listing created successfully',
      data: savedCoveredSpace
    });

  } catch (error: any) {
    console.error('Error creating commercial covered space sale listing:', error);
    console.error('Error details:', error.stack);
    
    // More detailed error information
    let details: string[] = [];
    if (error.errors) {
      details = Object.values(error.errors).map((err: any) => `${err.path}: ${err.message}`);
    } else if (error.code === 11000) {
      details = ['Duplicate property ID'];
    } else if (error.message) {
      details = [error.message];
    }
    
    res.status(400).json({
      success: false,
      error: 'Failed to create commercial covered space sale listing',
      details,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


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

export const getCommercialSellCoveredSpaceById = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId;
    console.log('Fetching property with ID:', propertyId);
    
    const property = await CommercialSellCoveredSpace.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial sell covered space property not found' 
      });
    }
    
    console.log('Property found:', property.propertyId);
    return res.status(200).json({
      success: true,
      message: 'Commercial sell covered space property retrieved successfully',
      data: property
    });
    
  } catch (error: any) {
    console.error('Error fetching commercial sell covered space property:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial sell covered space property',
      details: error.message 
    });
  }
};
export const updateCommercialSellCoveredSpace = async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.propertyId; 
      const incomingData = req.body;
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
  
     
      const existingDoc = await CommercialSellCoveredSpace.findOne({propertyId});
      if (!existingDoc) {
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      const mergedData = _.merge(existingDoc.toObject(), cleanedData);
  
      const updatedDoc = await CommercialSellCoveredSpace.findOneAndUpdate(
        {propertyId},
        { $set: mergedData },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Sell Covered space updated successfully.",
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
  
export const deleteCommercialSellCoveredSpace = async (req: Request, res: Response) => {
        try {
          const data = await CommercialSellCoveredSpace.findByIdAndDelete(req.params.id);
  
          if (!data) {
              return res.status(404).json({
                  success: false,
                  message: 'Sell covered space listing not found'
              });
          }
  
          res.status(200).json({
              success: true,
              message: 'Sell covered space listing deleted successfully'
          });
      } catch (error) {
          console.error('Error deleting Sell covered space:', error);
          res.status(500).json({
              success: false,
              error: 'Failed to delete Sell covered space listing',
              message: error instanceof Error ? error.message : 'Unknown error'
          });
      }
  };