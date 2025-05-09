import { Request, Response } from 'express';
import LeaseApartment from '../../models/residential/residentialLeaseAppartment';
import _ from 'lodash';

// Generate Property ID for Lease Apartment
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-RESLEAP";
    const highest = await LeaseApartment.findOne({
      propertyId: { $regex: `^${prefix}\d+$` },
    }).sort({ propertyId: -1 });

    let nextNumber = 1;
    if (highest) {
      const match = highest.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existing = await LeaseApartment.findOne({ propertyId });
    if (existing) {
      return generatePropertyId();
    }
    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-RESLEAP${timestamp}`;
  }
};

// Create Lease Apartment
export const createLeaseApartment = async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    const propertyId = await generatePropertyId();
    console.log(formData);
    const property = new LeaseApartment({
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
      message: 'Lease Apartment created successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error creating lease apartment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lease apartment',
    });
  }
};

// Get All Lease Apartments
export const getAllLeaseApartments = async (req: Request, res: Response) => {
  try {
    const properties = await LeaseApartment.find({}).sort({ 'metadata.createdAt': -1 });
    res.status(200).json({
      success: true,
      message: 'Fetched all lease apartments successfully',
      data: properties,
    });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease apartments',
    });
  }
};

// Get Lease Apartment by Property ID
export const getLeaseApartmentById = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const property = await LeaseApartment.findOne({ propertyId: id });

    if (!property) {
      return res.status(404).json({
        success: false,
        error: 'Lease Apartment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lease Apartment fetched successfully',
      data: property,
    });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lease apartment',
    });
  }
};

// Update Lease Apartment
export const updateLeaseApartment = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const incomingData = req.body?.data;

    if (!incomingData) {
      return res.status(400).json({ success: false, message: 'No data provided for update' });
    }

    const cleanedData = JSON.parse(
      JSON.stringify(incomingData, (key, value) => (['_id', '__v'].includes(key) ? undefined : value))
    );

    const existing = await LeaseApartment.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const merged = _.merge(existing.toObject(), cleanedData);

    const updated = await LeaseApartment.findByIdAndUpdate(id, { $set: merged }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update lease apartment' });
  }
};

// Delete Lease Apartment
export const deleteLeaseApartment = async (req: Request, res: Response) => {
  try {
    const deleted = await LeaseApartment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lease apartment' });
  }
};
