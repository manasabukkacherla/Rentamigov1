import { Request, Response } from 'express';
import LeaseBuilderFloor from '../../models/residential/residentialLeaseBuilderFloor';
import _ from 'lodash';

// Generate Property ID for Lease Builder Floor
const generatePropertyId = async (): Promise<string> => {
  try {
      const prefix = "RA-RESLEBF";
  
      const highestbf = await LeaseBuilderFloor.findOne({
          propertyId: { $regex: `^${prefix}\\d+$` }
      }).sort({ propertyId: -1 });
  
      let nextNumber = 1;
  
      if (highestbf && highestbf.propertyId) {
          const match = highestbf.propertyId.match(/(\d+)$/);
          if (match && match[1]) {
              nextNumber = parseInt(match[1], 10) + 1;
          }
      }
  
      const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  
      const existingWithExactId = await LeaseBuilderFloor.findOne({ propertyId });
  
      if (existingWithExactId) {
          console.log(`Property ID ${propertyId} already exists, trying next number`);
  
          const forcedNextNumber = nextNumber + 1;
          const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
  
          const forcedExisting = await LeaseBuilderFloor.findOne({ propertyId: forcedPropertyId });
  
          if (forcedExisting) {
              return generatePropertyId();
          }
  
          return forcedPropertyId;
      }
  
      return propertyId;
  } catch (error) {
      console.error('Error generating property ID:', error);
      const timestamp = Date.now().toString().slice(-8);
      return `RA-RESLEBF${timestamp}`;
  }
};

// Create a new lease builder floor listing
export const createLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    console.log('Incoming request body:', req.body);
    const propertyId = await generatePropertyId();
    console.log('Property ID:', propertyId);
    const builderFloorData = {
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    };

    const builderFloor = new LeaseBuilderFloor(builderFloorData);
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

// Get all lease builder floor listings
export const getAllLeaseBuilderFloors = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const sortOptions: { [key: string]: 1 | -1 } = {
      [sortBy as string]: sortOrder === 'asc' ? 1 : -1
    };

    const properties = await LeaseBuilderFloor.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await LeaseBuilderFloor.countDocuments();

    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching builder floor listings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch builder floor listings',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Get a single lease builder floor listing by ID
export const getLeaseBuilderFloorById = async (req: Request, res: Response) => {
  try {
    const property = await LeaseBuilderFloor.findOne({ propertyId: req.params.propertyId });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor listing not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error fetching builder floor listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch builder floor listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Update a lease builder floor listing
export const updateLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const property = await LeaseBuilderFloor.findOne({ propertyId: id });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor listing not found'
      });
    }

    // Merge existing data with updates
    const updatedData = _.merge({}, property.toObject(), updates);

    // Update the document
    const updatedProperty = await LeaseBuilderFloor.findOneAndUpdate(
      { propertyId: id },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Builder Floor listing updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    console.error('Error updating builder floor listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update builder floor listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Delete a lease builder floor listing
export const deleteLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await LeaseBuilderFloor.findOne({ propertyId: id });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Builder Floor listing not found'
      });
    }

    await LeaseBuilderFloor.findOneAndDelete({ propertyId: id });

    res.status(200).json({
      success: true,
      message: 'Builder Floor listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting builder floor listing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete builder floor listing',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

// Search lease builder floor listings
export const searchLeaseBuilderFloors = async (req: Request, res: Response) => {
  try {
    const {
      city,
      minRent,
      maxRent,
      bedrooms,
      propertySize,
      availability,
      page = 1,
      limit = 10
    } = req.query;

    const query: any = {};

    if (city) query['basicInformation.address.city'] = new RegExp(city as string, 'i');
    if (minRent) query['leaseDetails.monthlyRent'] = { $gte: Number(minRent) };
    if (maxRent) query['leaseDetails.monthlyRent'] = { ...query['leaseDetails.monthlyRent'], $lte: Number(maxRent) };
    if (bedrooms) query['propertyDetails.bedrooms'] = Number(bedrooms);
    if (propertySize) query['propertyDetails.propertysize'] = { $gte: Number(propertySize) };
    if (availability) query['availability.type'] = availability;

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await LeaseBuilderFloor.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ 'metadata.createdAt': -1 });

    const total = await LeaseBuilderFloor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error searching builder floor listings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search builder floor listings',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};