import { Request, Response } from 'express';
import CommercialRentPlot from '../../models/commercial/commercialRentPlot';

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMREPL";

        const highestShowroom = await CommercialRentPlot.findOne({
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

        const existingWithExactId = await CommercialRentPlot.findOne({ propertyId });

        if (existingWithExactId) {
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            const forcedExisting = await CommercialRentPlot.findOne({ propertyId: forcedPropertyId });

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

export const createCommercialRentPlot = async (req: Request, res: Response) => {
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

        const plotData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdAt: new Date()
            }
        };

        const plot = new CommercialRentPlot(plotData);
        await plot.save();

        res.status(201).json({
            success: true,
            message: 'Commercial rent plot listing created successfully',
            data: plot
        });
    } catch (error: any) {
        console.error('Error creating commercial rent plot:', error);

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
            error: 'Failed to create commercial rent plot listing',
            details: error.message
        });
    }
};