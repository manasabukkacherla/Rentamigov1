import { Request, Response } from 'express';
import PgMain from '../models/residential/Pgmain';

export const createPg = async (req: Request, res: Response) => {
  try {
    const pg = new PgMain(req.body);
    await pg.save();
    res.status(201).json({ success: true, data: pg });
  } catch (err) {
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
