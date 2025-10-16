import { Request, Response } from 'express';
import LeaseIndependentHouse from '../../models/residential/residentialLeaseIndependentHouse';
import _ from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
      const prefix = "RA-RESLEIH";
  
      const highestShowroom = await LeaseIndependentHouse.findOne({
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
  
      const existingWithExactId = await LeaseIndependentHouse.findOne({ propertyId });
  
      if (existingWithExactId) {
        console.log(`Property ID ${propertyId} already exists, trying next number`);
  
        const forcedNextNumber = nextNumber + 1;
        const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
  
        const forcedExisting = await LeaseIndependentHouse.findOne({ propertyId: forcedPropertyId });
  
        if (forcedExisting) {
          return generatePropertyId();
        }
  
        return forcedPropertyId;
      }
  
      return propertyId;
    } catch (error) {
      console.error('Error generating property ID:', error);
      const timestamp = Date.now().toString().slice(-8);
      return `RA-RESLEIH${timestamp}`;
    }
};

export const createLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();
    console.log("formData", formData);
    console.log("propertyId", propertyId);
    const propertyData = JSON.parse(JSON.stringify({
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    }));
    const property = new LeaseIndependentHouse(propertyData);

    console.log("propertyData", propertyData);

    await property.save();
    res.status(201).json({
      success: true,
      message: 'Lease Independent House created successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error creating lease independent house:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lease independent house',
    });
  }
};

export const getAllLeaseIndependentHouses = async (req: Request, res: Response) => {
  try {
    const properties = await LeaseIndependentHouse.find({}).sort({ 'metadata.createdAt': -1 });
    res.status(200).json({
      success: true,
      message: 'Fetched all independent house leases successfully',
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch independent house leases',
    });
  }
};

export const getLeaseIndependentHouseById = async (req: Request, res: Response) => {
  try {
    const propertyId  = req.params.propertyId;
    const property = await LeaseIndependentHouse.findOne({ propertyId });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Lease Independent House not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease Independent House fetched successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error fetching house:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease independent house',
    });
  }
};

export const updateLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    const id  = req.params._id;
    const incomingData = req.body?.data;

    if (!incomingData) {
      return res.status(400).json({ success: false, message: 'No data provided for update' });
    }

    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => (['_id', '__v'].includes(key) ? undefined : value))
    );

    const existing = await LeaseIndependentHouse.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const merged = _.merge(existing.toObject(), cleanedData);

    const updated = await LeaseIndependentHouse.findByIdAndUpdate(id, { $set: merged }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update lease independent house' });
  }
};

export const deleteLeaseIndependentHouse = async (req: Request, res: Response) => {
  try {
    const deleted = await LeaseIndependentHouse.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lease independent house' });
  }
};
