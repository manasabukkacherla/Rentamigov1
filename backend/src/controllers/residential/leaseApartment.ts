import { Request, Response } from 'express';
import LeaseApartment from '../../models/residential/residentialLeaseAppartment';
import _, { property } from 'lodash';

const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-RESLEAP";

    const highestShowroom = await LeaseApartment.findOne({
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

    const existingWithExactId = await LeaseApartment.findOne({ propertyId });

    if (existingWithExactId) {
      console.log(`Property ID ${propertyId} already exists, trying next number`);

      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

      const forcedExisting = await LeaseApartment.findOne({ propertyId: forcedPropertyId });

      if (forcedExisting) {
        return generatePropertyId();
      }

      return forcedPropertyId;
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
    // Log the incoming request body
    console.log('Incoming request body:', req.body);

    const formData = req.body;
    const propertyId = await generatePropertyId();
    console.log('Property ID:', propertyId);

    // Create new property with the generated ID and metadata
    const propertyData = JSON.parse(JSON.stringify({
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date()
      }
    }));
    console.log('Property data before save:', JSON.stringify(propertyData, null, 2));

    const property = new LeaseApartment(propertyData);

    await property.save()

    res.status(201).json({
      success: true,
      message: 'Lease Apartment created successfully',
      propertyId: property.propertyId,
      data: property
    });
  } catch (error: any) {
    console.error('Error creating lease apartment:', error);

    // Send more detailed error information
    res.status(500).json({
      success: false,
      error: 'Failed to create lease apartment',
      details: error.message,
      validationErrors: error.errors
    });
  }
};

// Get All Lease Apartments
export const getAllLeaseApartments = async (req: Request, res: Response) => {
  try {
    const properties = await LeaseApartment.find({})
      .sort({ 'metadata.createdAt': -1 })
      .lean() // Use lean() for better performance
      .exec();

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
    const propertyId = req.params.propertyId;
    const property = await LeaseApartment.findOne({ propertyId })
      .lean()
      .exec();

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
      lean: true // Use lean() for better performance
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
    const deleted = await LeaseApartment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete lease apartment' });
  }
};