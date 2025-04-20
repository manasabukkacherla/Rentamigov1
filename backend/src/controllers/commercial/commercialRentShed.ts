import { Request, Response } from 'express';
import CommercialRentShed from '../../models/commercial/CommercialRentShed';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMRSD";

        const highestShowroom = await CommercialRentShed.findOne({
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

        const existingWithExactId = await CommercialRentShed.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialRentShed.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMRSH${timestamp}`;
    }
};

export const createCommercialRentShed = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const propertyId = await generatePropertyId();

        if (!formData.metadata) {
            formData.metadata = {};
        }

        if (!formData.metadata.createdBy) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field',
                details: 'metadata.createdBy is required'
            });
        }

        const showroomData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdAt: new Date()
            }
        };

        const showroom = new CommercialRentShed(showroomData);
        await showroom.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent showroom listing created successfully',
            data: showroom
        });
    } catch (error: any) {
        console.error('Error creating commercial rent shed:', error);

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
            error: 'Failed to create commercial rent shed listing',
            details: error.message
        });
    }
};