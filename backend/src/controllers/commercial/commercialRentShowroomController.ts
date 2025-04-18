import { Request, Response } from 'express';
import CommercialRentShowroom from '../../models/commercial/commericalRentShowroom';

// Generate property ID with format RA-COMRSH####
const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial rent showroom property ID
        const prefix = "RA-COMRSH";

        // Find the showroom with the highest property ID number
        const highestShowroom = await CommercialRentShowroom.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1; // Default start number

        if (highestShowroom) {
            // Extract the numeric part from the existing highest property ID
            const match = highestShowroom.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await CommercialRentShowroom.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision, recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            // Double-check this new ID
            const forcedExisting = await CommercialRentShowroom.findOne({ propertyId: forcedPropertyId });

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
        return `RA-COMRSH${timestamp}`;
    }
};

// Create a new commercial rent showroom listing
export const createRentShowroom = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log('Creating commercial rent showroom with data:', JSON.stringify(formData, null, 2));

        // Check for required fields
        if (!formData.basicInformation || !formData.showroomDetails || !formData.propertyDetails) {
            return res.status(400).json({
                success: false,
                error: 'Missing required information',
                details: 'basicInformation, showroomDetails and propertyDetails are required'
            });
        }

        // Generate property ID
        const propertyId = await generatePropertyId();
        console.log('Generated property ID:', propertyId);

        // Set metadata if not provided
        if (!formData.metadata) {
            formData.metadata = {};
        }

        // Ensure createdBy is present
        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }

        // Create the showroom data object
        const showroomData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdAt: new Date()
            }
        };

        // Create new showroom listing
        const showroom = new CommercialRentShowroom(showroomData);
        await showroom.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent showroom listing created successfully',
            data: showroom
        });
    } catch (error: any) {
        console.error('Error creating commercial rent showroom:', error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message,
                errors: error.errors
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to create commercial rent showroom listing',
            details: error.message
        });
    }
};

// Get all commercial rent showroom listings
export const getAllRentShowrooms = async (req: Request, res: Response) => {
    try {
        const { limit = 10, page = 1, sort = '-createdAt', city, state, minRent, maxRent } = req.query;

        // Convert page & limit to numbers and calculate skip
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const skip = (pageNumber - 1) * limitNumber;

        // Build query filters
        const filter: any = {};

        if (city) {
            filter['basicInformation.address.city'] = { $regex: new RegExp(city as string, 'i') };
        }

        if (state) {
            filter['basicInformation.address.state'] = { $regex: new RegExp(state as string, 'i') };
        }

        if (minRent || maxRent) {
            filter['rentalDetails.expectedRent'] = {};

            if (minRent) {
                filter['rentalDetails.expectedRent'].$gte = parseInt(minRent as string, 10);
            }

            if (maxRent) {
                filter['rentalDetails.expectedRent'].$lte = parseInt(maxRent as string, 10);
            }
        }

        // Find showrooms with pagination and filters
        const showrooms = await CommercialRentShowroom.find(filter)
            .sort(sort as string)
            .skip(skip)
            .limit(limitNumber);

        // Get total count for pagination
        const total = await CommercialRentShowroom.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: showrooms.length,
            total,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(total / limitNumber)
            },
            data: showrooms
        });
    } catch (error: any) {
        console.error('Error fetching commercial rent showrooms:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial rent showroom listings',
            details: error.message
        });
    }
};

// Get a single commercial rent showroom by ID
export const getRentShowroomById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const showroom = await CommercialRentShowroom.findById(id);

        if (!showroom) {
            return res.status(404).json({
                success: false,
                error: 'Commercial rent showroom not found'
            });
        }

        res.status(200).json({
            success: true,
            data: showroom
        });
    } catch (error: any) {
        console.error('Error fetching commercial rent showroom:', error);

        // Handle invalid ObjectId error
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid ID format',
                details: error.message
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to fetch commercial rent showroom',
            details: error.message
        });
    }
};

// Update a commercial rent showroom
export const updateRentShowroom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        console.log(`Updating commercial rent showroom ${id} with data:`, JSON.stringify(updates, null, 2));

        // Find and update the document
        const showroom = await CommercialRentShowroom.findByIdAndUpdate(
            id,
            {
                ...updates,
                'metadata.updatedAt': new Date()
            },
            { new: true, runValidators: true }
        );

        if (!showroom) {
            return res.status(404).json({
                success: false,
                error: 'Commercial rent showroom not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Commercial rent showroom updated successfully',
            data: showroom
        });
    } catch (error: any) {
        console.error('Error updating commercial rent showroom:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.message,
                errors: error.errors
            });
        }

        // Handle invalid ObjectId error
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid ID format',
                details: error.message
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to update commercial rent showroom',
            details: error.message
        });
    }
};

// Delete a commercial rent showroom
export const deleteRentShowroom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(`Deleting commercial rent showroom ${id}`);

        const showroom = await CommercialRentShowroom.findByIdAndDelete(id);

        if (!showroom) {
            return res.status(404).json({
                success: false,
                error: 'Commercial rent showroom not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Commercial rent showroom deleted successfully'
        });
    } catch (error: any) {
        console.error('Error deleting commercial rent showroom:', error);

        // Handle invalid ObjectId error
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid ID format',
                details: error.message
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to delete commercial rent showroom',
            details: error.message
        });
    }
}; 