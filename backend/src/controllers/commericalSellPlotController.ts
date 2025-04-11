import { Request, Response } from 'express';
import SellPlot from '../models/commercial/commercialSellPlot';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    user: {
        _id: string;
        name?: string;
        email?: string;
    };
}

const generatePropertyId = async (): Promise<string> => {
    try {
        const prefix = "RA-COMSEPL";
        const highestPlot = await SellPlot.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1;

        if (highestPlot) {
            const match = highestPlot.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }


        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        const existingWithExactId = await SellPlot.findOne({ propertyId });

        if (existingWithExactId) {

            console.log(`Property ID ${propertyId} already exists, trying next number`);
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await SellPlot.findOne({ propertyId: forcedPropertyId });

            if (forcedExisting) {
                return generatePropertyId();
            }

            return forcedPropertyId;
        }

        return propertyId;
    } catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-COMSESH${timestamp}`;
    }
};


export const createPlot = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const plotData = req.body;

        const propertyId = await generatePropertyId();
        const newPlot = new SellPlot({
            propertyId,
            ...plotData,
            metadata: {
                createdBy: plotData.metadata.createdBy,
                createdAt: new Date(),

            }
        });

        const savedPlot = await newPlot.save();
        const populatedPlot = await SellPlot.findById(savedPlot._id)
            .populate('metadata.createdBy', 'name email')
            .select('-__v');

        res.status(201).json({
            success: true,
            data: populatedPlot
        });
    } catch (error) {
        console.error('Error creating plot:', error);
        res.status(400).json({
            success: false,
            error: 'Failed to create plot',
            message: (error as Error).message
        });
    }
};



