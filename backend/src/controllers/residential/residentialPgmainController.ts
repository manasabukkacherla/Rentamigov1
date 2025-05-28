import { Request, Response } from 'express';
import PgMain from '../../models/residential/Pgmain';
import mongoose from 'mongoose';

/**
 * Generate a unique property ID for PGs
 */
const generatePropertyId = async (): Promise<string> => {
  try {
    const prefix = 'RA-REPG';
    const highestPg = await PgMain.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` },
    }).sort({ propertyId: -1 });

    let nextNumber = 1;
    if (highestPg && highestPg.propertyId) {
      const match = highestPg.propertyId.match(/(\d+)$/);
      if (match && match[1]) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
    const existingWithExactId = await PgMain.findOne({ propertyId });
    if (existingWithExactId) {
      const forcedNextNumber = nextNumber + 1;
      const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
      const forcedExisting = await PgMain.findOne({ propertyId: forcedPropertyId });
      if (forcedExisting) {
        return generatePropertyId();
      }
      return forcedPropertyId;
    }

    return propertyId;
  } catch (error) {
    console.error('Error generating property ID:', error);
    const timestamp = Date.now().toString().slice(-8);
    return `RA-PGMAIN${timestamp}`;
  }
};

/**
 * Create a new PG listing
 */
export const createPg = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    // Validate userId - Ensure it's a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(body.metadata.userId)) {
      return res.status(400).json({ success: false, error: 'Invalid userId format' });
    }

    // Generate propertyId for the new PG
    const propertyId = await generatePropertyId();

    // Ensure required fields have default values if missing
    const pgData = {
      ...body,
      propertyId,
      pgDetails: {
        name: body.pgDetails?.name || '',
        accommodationType: body.pgDetails?.accommodationType || 'both boys and girls',
        address: body.pgDetails?.address || '',
        ...body.pgDetails,
      },
      metadata: {
        userId: new mongoose.Types.ObjectId(body.metadata.userId), // Ensure userId is passed as ObjectId
        userName: body.metadata?.userName || 'Not Specified',
        createdAt: body.metadata?.createdAt || new Date().toISOString(),
      },
    };

    // Create and save PG
    const pg = new PgMain(pgData);
    await pg.save();

    return res.status(201).json({ success: true, data: pg });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(400).json({ success: false, error: errorMsg });
  }
};

export const updatePgMain = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

   const updatedPg = await PgMain.findOneAndUpdate(
  { propertyId: req.params.propertyId }, // ✅ match by custom field
  req.body,
  { new: true }
);


    if (!updatedPg) {
      return res.status(404).json({ success: false, message: "PG not found" });
    }

    res.status(200).json({ success: true, data: updatedPg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update PG", error });
  }
};

/**
 * Get all PGs
 */
export const getAllPgs = async (req: Request, res: Response) => {
  try {
    const pgs = await PgMain.find();
    res.json({ success: true, data: pgs });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
};

/**
 * Get PG by ID
 */
export const getPgByPropertyId = async (req: Request, res: Response) => {
  const { propertyId } = req.params;

  try {
    // Find PG by the propertyId string
    const pg = await PgMain.findOne({ propertyId });

    if (!pg) {
      return res.status(404).json({ success: false, error: 'PG not found' });
    }

    res.json({ success: true, data: pg });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
};

/**
 * Update PG by propertyId (used in PATCH route)
 */


/**
 * Update PG by ID
 */

/**
 * Delete PG by ID
 */
export const deletePgMain = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const deleted = await PgMain.findOneAndDelete({ propertyId });

    if (!deleted) {
      return res.status(404).json({ success: false, error: "PG not found" });
    }

    return res.status(200).json({ success: true, message: "PG deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to delete PG';
    return res.status(500).json({ success: false, error: message });
  }
};





