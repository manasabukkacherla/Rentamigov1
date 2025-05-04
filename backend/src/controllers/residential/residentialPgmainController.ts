import { Request, Response } from 'express';
import PgMain from '../../models/residential/Pgmain';

/**
 * Generate a unique property ID for PGs
 */
const generatePropertyId = async (): Promise<string> => {
  try {
    // Prefix for PG property ID
    const prefix = "RA-REPG";
    // Find the PG with the highest property ID number
    const highestPg = await PgMain.findOne({
      propertyId: { $regex: `^${prefix}\\d+$` }
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
}

export const createPg = async (req: Request, res: Response) => {
  try {
    // Generate propertyId for the new PG
    const propertyId = await generatePropertyId();
    console.log('Received PG data:', JSON.stringify(req.body, null, 2));
    
    // Ensure required fields have default values if missing
    const body = req.body;
    
    // Ensure metadata is properly structured
    const pgData = {
      ...body,
      propertyId,
      pgDetails: {
        name: body.pgDetails?.name || '',
        accommodationType: body.pgDetails?.accommodationType || 'both boys and girls',
        address: body.pgDetails?.address || '',
        ...body.pgDetails
      },
      location: {
        latitude: body.location?.latitude || 0,
        longitude: body.location?.longitude || 0,
        ...body.location
      },
      roomConfiguration: {
        totalRooms: body.roomConfiguration?.totalRooms || 0,
        sharingTypes: body.roomConfiguration?.sharingTypes || [],
        ...body.roomConfiguration
      },
      foodServices: {
        available: body.foodServices?.available === true,
        ...body.foodServices
      },
      pricing: {
        rent: body.pricing?.rent || 0,
        ...body.pricing
      },
      metadata: {
        ...body.metadata,
        createdAt: body.metadata?.createdAt || new Date().toISOString(),
      },
    };
    
    const pg = new PgMain(pgData);
    await pg.save();
    console.log('PG listing created successfully');
    res.status(201).json({ success: true, data: pg });
  } catch (err) {
    console.error('Error creating PG listing:', err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: errorMsg });
  }
};

export const getAllPgs = async (req: Request, res: Response) => {
  try {
    const pgs = await PgMain.find();
    res.json({ success: true, data: pgs });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
};

export const getPgById = async (req: Request, res: Response) => {
  try {
    const pg = await PgMain.findById(req.params.id);
    if (!pg) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: pg });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
};

export const updatePgById = async (req: Request, res: Response) => {
  try {
    const pg = await PgMain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pg) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: pg });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(400).json({ success: false, error: errorMsg });
  }
};

export const deletePgById = async (req: Request, res: Response) => {
  try {
    const pg = await PgMain.findByIdAndDelete(req.params.id);
    if (!pg) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: pg });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
};
