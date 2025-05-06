import { Request, Response } from 'express';
import LeaseBuilderFloor from '../../models/residential/leaseBuilderFloor';
import _ from 'lodash';

// Generate Property ID for Lease Builder Floor
const generatePropertyId = async (): Promise<string> => {
  try {
    const propertyPrefix = "RA-RESLEBF";
    const highest = await LeaseBuilderFloor.findOne({
      propertyId: { $regex: `^${propertyPrefix}\\d+$` },
    }).sort({ propertyId: -1 });

    let nextNumber = 1;
    if (highest) {
      const match = highest.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${propertyPrefix}${nextNumber.toString().padStart(4, '0')}`;
    const existing = await LeaseBuilderFloor.findOne({ propertyId });
    if (existing) {
      return generatePropertyId();
    }
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-RESLEBF${timestamp}`;
  }
};

// Create Lease Builder Floor
export const createLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();
    console.log(formData);
    const property = new LeaseBuilderFloor({
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    });

    await property.save();
    res.status(201).json({
      success: true,
      message: 'Lease Builder Floor created successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error creating lease builder floor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lease builder floor',
    });
  }
};

// Get All Lease Builder Floors
export const getAllLeaseBuilderFloors = async (req: Request, res: Response) => {
  try {
    const properties = await LeaseBuilderFloor.find({}).sort({ 'metadata.createdAt': -1 });
    res.status(200).json({
      success: true,
      message: 'Fetched all lease builder floors successfully',
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching builder floors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease builder floors',
    });
  }
};

// Get Lease Builder Floor by Property ID
export const getLeaseBuilderFloorById = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const property = await LeaseBuilderFloor.findOne({ propertyId: id });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Lease Builder Floor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease Builder Floor fetched successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error fetching builder floor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease builder floor',
    });
  }
};

// Update Lease Builder Floor
export const updateLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const incomingData = req.body?.data;

    if (!incomingData) {
      return res.status(400).json({ success: false, message: 'No data provided for update' });
    }

    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => (['id', '_v'].includes(key) ? undefined : value))
    );

    const existing = await LeaseBuilderFloor.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const merged = _.merge(existing.toObject(), cleanedData);

    const updated = await LeaseBuilderFloor.findByIdAndUpdate(id, { $set: merged }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update lease builder floor' });
  }
};

// Delete Lease Builder Floor
export const deleteLeaseBuilderFloor = async (req: Request, res: Response) => {
  try {
    const deleted = await LeaseBuilderFloor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lease builder floor' });
  }
};