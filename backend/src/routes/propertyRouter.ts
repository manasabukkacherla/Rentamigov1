import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Property from '../models/property';
import { ObjectId } from 'mongodb';

const propertyRouter = express.Router();

// API endpoint to fetch propertyType based on special_id
propertyRouter.get('/details/:special_id', async (req: Request, res: Response) => { 
  try {
    const { special_id } = req.params;      
    const property = await Property.findOne({ _id: new ObjectId(special_id) });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const { propertyName, area, locality, address, propertyType } = property;

    res.json({
      success: true,
      propertyName,
      area,
      locality,
      address,
      propertyType,
    });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Unknown error occurred";
    
    console.error("Error fetching property details:", errorMessage);
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
});
  
  
export default propertyRouter;