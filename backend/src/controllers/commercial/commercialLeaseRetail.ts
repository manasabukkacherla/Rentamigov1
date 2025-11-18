import { Request, Response } from 'express';
import CommercialLeaseRetail from '../../models/commercial/CommercialLeaseRetail';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-COMLERS";
    const highestRetail = await CommercialLeaseRetail.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
    }).sort({ propertyId: -1 });
    
    let nextNumber = 1;
    
    if (highestRetail) {
      const match = highestRetail.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    
    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existingWithExactId = await CommercialLeaseRetail.findOne({ propertyId });
    
    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      const forcedExisting = await CommercialLeaseRetail.findOne({ propertyId: forcedPropertyId });
      
      if (forcedExisting) {
        return generatePropertyId();
      }
      
      return forcedPropertyId;
    }
    
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-COMLERS${timestamp}`;
  }
};

// Helper function to transform frontend data to backend schema
const transformFrontendToBackend = (frontendData: any) => {
  const transformed = {
    ...frontendData,
    // Move retailStoreDetails from propertyDetails to root level
    retailStoreDetails: frontendData.propertyDetails?.retailStoreDetails || {},
    // Keep propertyDetails but remove retailStoreDetails from it
    propertyDetails: {
      ...frontendData.propertyDetails,
      retailStoreDetails: undefined
    }
  };

  // Remove undefined fields
  if (transformed.propertyDetails) {
    delete transformed.propertyDetails.retailStoreDetails;
  }

  return transformed;
};

// Helper function to transform backend data to frontend schema
const transformBackendToFrontend = (backendData: any) => {
  return {
    ...backendData,
    // Move retailStoreDetails from root to propertyDetails
    propertyDetails: {
      ...backendData.propertyDetails,
      retailStoreDetails: backendData.retailStoreDetails || {}
    },
    // Remove root level retailStoreDetails for frontend
    retailStoreDetails: undefined
  };
};

export const createCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    
    console.log('Received data for creation:', JSON.stringify(formData, null, 2));
    
    // Transform frontend data to backend schema
    const transformedData = transformFrontendToBackend(formData);
    
    // Generate property ID
    const propertyId = await generatePropertyId();

    // Prepare retail data with property ID and metadata
    const retailData = {
      propertyId,
      ...transformedData,
      metadata: {
        ...transformedData.metadata,
        createdBy: transformedData.metadata?.createdBy,
        createdAt: new Date()
      }
    };

    console.log('Transformed data for saving:', JSON.stringify(retailData, null, 2));
    
    // Create new retail lease listing
    const retail = new CommercialLeaseRetail(retailData);
    await retail.save();

    // Transform back to frontend schema for response
    const frontendResponse = transformBackendToFrontend(retail.toObject());

    res.status(201).json({
      success: true,
      message: 'Commercial lease retail listing created successfully!',
      data: frontendResponse
    });
  } catch (error) {
    console.error('Error creating commercial lease retail listing:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create commercial lease retail listing. Please try again.' 
    });
  }
};

export const getAllCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const properties = await CommercialLeaseRetail.find({})
      .populate('metadata.createdBy', 'name email')
      .sort({ 'metadata.createdAt': -1 });
    
    // Transform each property to frontend schema
    const transformedProperties = properties.map(property => 
      transformBackendToFrontend(property.toObject())
    );
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail listings retrieved successfully',
      data: transformedProperties
    });
  } catch (error) {
    console.error('Error fetching commercial lease retail listings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial lease retail listings' 
    });
  }
};

export const getCommercialLeaseRetailById = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    
    if (!propertyId) {
      return res.status(400).json({ 
        success: false,
        error: 'Property ID is required' 
      });
    }

    const property = await CommercialLeaseRetail.findOne({ propertyId })
      .populate('metadata.createdBy', 'name email');
   
    if (!property) {
      return res.status(404).json({ 
        success: false,
        error: 'Commercial lease retail property not found' 
      });
    }

    // Transform to frontend schema
    const frontendProperty = transformBackendToFrontend(property.toObject());
    
    res.status(200).json({
      success: true,
      message: 'Commercial lease retail property retrieved successfully',
      data: frontendProperty
    });
  } catch (error) {
    console.error('Error fetching commercial lease retail property:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch commercial lease retail property' 
    });
  }
};

export const updateCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const incomingData = req.body;

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    if (!incomingData || Object.keys(incomingData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update.",
      });
    }

    console.log('Received update data:', JSON.stringify(incomingData, null, 2));

    // Transform frontend data to backend schema
    const transformedData = transformFrontendToBackend(incomingData);

    // Remove immutable fields and mongoose internal fields
    const { _id, __v, propertyId: reqPropertyId, ...cleanedData } = transformedData;

    // Ensure metadata is properly handled
    if (cleanedData.metadata) {
      cleanedData.metadata = {
        ...cleanedData.metadata,
        createdBy: cleanedData.metadata.createdBy,
        createdAt: cleanedData.metadata.createdAt || new Date()
      };
    }

    console.log('Transformed update data:', JSON.stringify(cleanedData, null, 2));

    const updatedDoc = await CommercialLeaseRetail.findOneAndUpdate(
      { propertyId },
      { $set: cleanedData },
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    ).populate('metadata.createdBy', 'name email');

    if (!updatedDoc) {
      return res.status(404).json({
        success: false,
        message: "Property not found with the provided ID",
      });
    }

    // Transform back to frontend schema for response
    const frontendResponse = transformBackendToFrontend(updatedDoc.toObject());

    res.status(200).json({
      success: true,
      message: "Lease retail updated successfully.",
      data: frontendResponse,
    });

  } catch (error: any) {
    console.error("Update error:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown update error",
    });
  }
};

export const deleteCommercialLeaseRetail = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      });
    }

    const data = await CommercialLeaseRetail.findOneAndDelete({ propertyId });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Lease retail listing not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease retail listing deleted successfully',
      data: {
        propertyId: data.propertyId,
        title: data.basicInformation?.title
      }
    });
  } catch (error) {
    console.error('Error deleting lease retail:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lease retail listing',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCommercialLeaseRetailByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const properties = await CommercialLeaseRetail.find({ 
      'metadata.createdBy': userId 
    })
    .populate('metadata.createdBy', 'name email')
    .sort({ 'metadata.createdAt': -1 });

    // Transform to frontend schema
    const transformedProperties = properties.map(property => 
      transformBackendToFrontend(property.toObject())
    );

    res.status(200).json({
      success: true,
      message: 'Commercial lease retail listings retrieved successfully',
      data: transformedProperties
    });
  } catch (error) {
    console.error('Error fetching commercial lease retail listings by user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch commercial lease retail listings'
    });
  }
};