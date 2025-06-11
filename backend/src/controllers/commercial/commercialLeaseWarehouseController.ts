import { Request, Response } from 'express';
import CommercialLeaseWarehouse from '../../models/commercial/CommercialLeaseWarehouse';
import _ from 'lodash';

// Generate property ID with format RA-COMLEWHXXXX
const generatePropertyId = async (): Promise<string> => {
    try {
        // Prefix for the commercial lease warehouse property ID
        const prefix = "RA-COMLEWH";

        // Find the warehouse with the highest property ID number
        const highestWarehouse = await CommercialLeaseWarehouse.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` }
        }).sort({ propertyId: -1 });

        let nextNumber = 1; // Default start number

        if (highestWarehouse) {
            // Extract the numeric part from the existing highest property ID
            const match = highestWarehouse.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                // Convert to number and increment by 1
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }

        // Create the property ID with the sequence number
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;

        // Check if this exact ID somehow exists (should be rare but possible with manual entries)
        const existingWithExactId = await CommercialLeaseWarehouse.findOne({ propertyId });

        if (existingWithExactId) {
            // In case of collision (e.g., if IDs were manually entered), recursively try the next number
            console.log(`Property ID ${propertyId} already exists, trying next number`);

            // Force increment the next number and try again
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;

            // Double-check this new ID
            const forcedExisting = await CommercialLeaseWarehouse.findOne({ propertyId: forcedPropertyId });

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
        return `RA-COMLEWH${timestamp}`;
    }
};

// Create a new commercial lease warehouse listing
export const createLeaseWarehouse = async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        console.log(formData);

        // Generate property ID
        const propertyId = await generatePropertyId();

        // Create the warehouse data object
        const warehouseData = {
            propertyId,
            ...formData,
            metadata: {
                ...formData.metadata,
                createdBy: req.user?._id || null,
                createdAt: new Date()
            }
        };

        // Create new warehouse listing
        const warehouse = new CommercialLeaseWarehouse(warehouseData);
        await warehouse.save();

        res.status(201).json({
            success: true,
            message: 'Commercial lease warehouse listing created successfully',
            data: warehouse
        });
    } catch (error: any) {
        console.error('Error creating commercial lease warehouse:', error);
        res.status(500).json({
            error: 'Failed to create commercial lease warehouse listing',
            details: error.message
        });
    }
};

// Get all commercial lease warehouse listings
export const getAllLeaseWarehouses = async (req: Request, res: Response) => {
    try {
        const warehouses = await CommercialLeaseWarehouse.find();

        res.status(200).json({
            success: true,
            count: warehouses.length,
            data: warehouses
        });
    } catch (error: any) {
        console.error('Error fetching commercial lease warehouses:', error);
        res.status(500).json({
            error: 'Failed to fetch commercial lease warehouse listings',
            details: error.message
        });
    }
};

// Get a single commercial lease warehouse by ID
export const getLeaseWarehouseById = async (req: Request, res: Response) => {
    try {
        const propertyId = req.params.propertyId;
        const warehouse = await CommercialLeaseWarehouse.findOne({ propertyId });

        if (!warehouse) {
            return res.status(404).json({
                success: false,
                error: 'Commercial lease warehouse not found'
            });
        }
      

        res.status(200).json({
            success: true,
            data: warehouse
        });
    } catch (error: any) {
        console.error('Error fetching commercial lease warehouse:', error);
        res.status(500).json({
            error: 'Failed to fetch commercial lease warehouse',
            details: error.message
        });
    }
};

// Update a commercial lease warehouse
export const updateLeaseWarehouse = async (req: Request, res: Response) => {
    try {
        const documentId = req.params.id; 
        const incomingData = req.body?.data;
        if (!incomingData) {
          return res.status(400).json({
            success: false,
            message: "No data provided for update.",
          });
        }
    
        const cleanedData = JSON.parse(
          JSON.stringify(incomingData, (key, value) => {
            if (key === "_id" || key === "__v") return undefined;
            return value;
          })
        );
    
       
        const existingDoc = await CommercialLeaseWarehouse.findById(documentId);
        if (!existingDoc) {
          return res.status(404).json({
            success: false,
            message: "Property not found",
          });
        }
    
        const mergedData = _.merge(existingDoc.toObject(), cleanedData);
    
        const updatedDoc = await CommercialLeaseWarehouse.findByIdAndUpdate(
          documentId,
          { $set: mergedData },
          { new: true, runValidators: true }
        );
    
        res.status(200).json({
          success: true,
          message: "Lease Warehouse updated successfully.",
          data: updatedDoc,
        });
      } catch (error: any) {
        console.error("Update error:", error);
        res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : "Unknown update error",
        });
      }
    };

// Delete a commercial lease warehouse
export const deleteLeaseWarehouse = async (req: Request, res: Response) => {
    try {
        const data = await CommercialLeaseWarehouse.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Lease Warehouse listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lease Warehouse listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting lease Warehouse:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete lease Warehouse listing',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};