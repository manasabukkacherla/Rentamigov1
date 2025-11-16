import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ResidentialRentIndependentHouse from '../../models/residential/residentialRentIndependent';

// 🔹 Generate unique property ID
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = "RA-RESREIH";
    const lastProperty = await ResidentialRentIndependentHouse.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` },
    }).sort({ propertyId: -1 });

    let nextNumber = 1;
    if (lastProperty) {
      const match = lastProperty.propertyId.match(/(\d+)$/);
      if (match) nextNumber = parseInt(match[1]) + 1;
    }

    const newId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    return newId;
  } catch (error) {
    console.error("Error generating property ID:", error);
    return `RA-RESREIH${Date.now().toString().slice(-6)}`;
  }
};

// 🔹 Create
export const createRentIndependentHouse = async (req: Request, res: Response) => {
  try {
    const propertyId = await generatePropertyId();
    const data = {
      ...req.body,
      propertyId,
      metadata: {
        ...req.body.metadata,
        createdAt: new Date(),
      },
    };

    // Initialize media if not present
    data.media ||= {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: [],
      },
      documents: [],
      videoTour: '',
      mediaItems: [],
    };

    const newHouse = new ResidentialRentIndependentHouse(data);
    await newHouse.save();

    res.status(201).json({
      success: true,
      message: "Independent house created successfully",
      data: newHouse,
    });
  } catch (error) {
    console.error("Error creating house:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create independent house",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// 🔹 Get All
export const getAllRentIndependentHouses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filters: any = {};
    if (req.query.city) filters['basicInformation.address.city'] = req.query.city;
    if (req.query.state) filters['basicInformation.address.state'] = req.query.state;
    if (req.query.bedrooms) filters['propertyDetails.bedrooms'] = parseInt(req.query.bedrooms as string);

    if (req.query.minPrice || req.query.maxPrice) {
      filters['rentalTerms.rentDetails.expectedRent'] = {};
      if (req.query.minPrice)
        filters['rentalTerms.rentDetails.expectedRent'].$gte = parseInt(req.query.minPrice as string);
      if (req.query.maxPrice)
        filters['rentalTerms.rentDetails.expectedRent'].$lte = parseInt(req.query.maxPrice as string);
    }

    const houses = await ResidentialRentIndependentHouse.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialRentIndependentHouse.countDocuments(filters);

    res.status(200).json({
      success: true,
      data: houses,
      pagination: {
        current: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching houses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch independent houses",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// 🔹 Get by ID or propertyId
export const getRentIndependentHouseById = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const house = await ResidentialRentIndependentHouse.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(propertyId) ? propertyId : null },
        { propertyId },
      ],
    });

    if (!house) {
      return res.status(404).json({
        success: false,
        message: "Independent House not found",
      });
    }

    res.status(200).json({ success: true, data: house });
  } catch (error) {
    console.error("Error fetching house:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch independent house",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// 🔹 Update
export const updateRentIndependentHouse = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Find the existing house first
    const house = await ResidentialRentIndependentHouse.findOne({ propertyId });
    if (!house) {
      return res.status(404).json({
        success: false,
        message: 'Independent House not found',
      });
    }

    // Safely merge metadata
    const updatedData = {
      ...req.body,
      metadata: {
        ...house.metadata,
        updatedAt: new Date(),
      },
    };

    // Perform the update
    const updatedHouse = await ResidentialRentIndependentHouse.findOneAndUpdate(
      { propertyId },
      { $set: updatedData },
      { new: true } // Return updated document
    );

    res.status(200).json({
      success: true,
      message: 'Independent House updated successfully',
      data: updatedHouse,
    });
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update independent house',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// 🔹 Delete
export const deleteRentIndependentHouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const house = await ResidentialRentIndependentHouse.findOneAndDelete({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null },
        { propertyId: id },
      ],
    });

    if (!house) {
      return res.status(404).json({
        success: false,
        message: "Independent House not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Independent House deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting house:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete independent house",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// 🔹 Get houses by user
export const getUserIndependentHouses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const houses = await ResidentialRentIndependentHouse.find({
      'metadata.createdBy': userId,
    })
      .skip(skip)
      .limit(limit)
      .sort({ 'metadata.createdAt': -1 });

    const total = await ResidentialRentIndependentHouse.countDocuments({
      'metadata.createdBy': userId,
    });

    res.status(200).json({
      success: true,
      data: houses,
      pagination: {
        current: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    console.error("Error fetching user's houses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user independent houses",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
