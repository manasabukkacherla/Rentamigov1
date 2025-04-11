import { Request, Response } from 'express';
import SellPlot from '../models/commercial/commercialsellplot';
import { ICommercialPlot } from '../models/commercial/commercialsellplot';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
    user: {
        _id: string;
    };
}

export const createPlot = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const plotData: ICommercialPlot = req.body;
        const newPlot = new SellPlot({
            ...plotData,
            metadata: {
                createdBy: req.user._id,
                createdAt: new Date()
            }
        });
        await newPlot.save();
        res.status(201).json(newPlot);
    } catch (error) {
        console.error('Error creating plot:', error);
        res.status(400).json({
            error: 'Failed to create plot',
            details: (error as Error).message
        });
    }
};

export const getAllPlots = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { city, state, minPrice, maxPrice, minArea, maxArea } = req.query;
        const query: any = {};

        if (city) query['basicInformation.city'] = city;
        if (state) query['basicInformation.state'] = state;
        if (minPrice || maxPrice) {
            query['pricingDetails.propertyPrice'] = {};
            if (minPrice) query['pricingDetails.propertyPrice'].$gte = Number(minPrice);
            if (maxPrice) query['pricingDetails.propertyPrice'].$lte = Number(maxPrice);
        }
        if (minArea || maxArea) {
            query['plotDetails.totalArea'] = {};
            if (minArea) query['plotDetails.totalArea'].$gte = Number(minArea);
            if (maxArea) query['plotDetails.totalArea'].$lte = Number(maxArea);
        }

        const plots = await SellPlot.find(query)
            .sort({ 'metadata.createdAt': -1 })
            .populate('metadata.createdBy', 'name email');

        res.status(200).json(plots);
    } catch (error) {
        console.error('Error fetching plots:', error);
        res.status(500).json({
            error: 'Failed to fetch plots',
            details: (error as Error).message
        });
    }
};

export const getPlotById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const plot = await SellPlot.findById(req.params.id)
            .populate('metadata.createdBy', 'name email');

        if (!plot) {
            return res.status(404).json({ error: 'Plot not found' });
        }
        res.status(200).json(plot);
    } catch (error) {
        console.error('Error fetching plot:', error);
        res.status(500).json({
            error: 'Failed to fetch plot',
            details: (error as Error).message
        });
    }
};

export const updatePlot = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const plotId = req.params.id;
        const updateData = req.body;

        // Remove metadata from update data if present
        delete updateData.metadata;

        const updatedPlot = await SellPlot.findByIdAndUpdate(
            plotId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate('metadata.createdBy', 'name email');

        if (!updatedPlot) {
            return res.status(404).json({ error: 'Plot not found' });
        }
        res.status(200).json(updatedPlot);
    } catch (error) {
        console.error('Error updating plot:', error);
        res.status(400).json({
            error: 'Failed to update plot',
            details: (error as Error).message
        });
    }
};

export const deletePlot = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const plot = await SellPlot.findById(req.params.id);

        if (!plot) {
            return res.status(404).json({ error: 'Plot not found' });
        }

        // Check if user is authorized to delete (optional)
        if (plot.metadata.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this plot' });
        }

        await plot.deleteOne();
        res.status(200).json({ message: 'Plot deleted successfully' });
    } catch (error) {
        console.error('Error deleting plot:', error);
        res.status(500).json({
            error: 'Failed to delete plot',
            details: (error as Error).message
        });
    }
};