import express, { Request, Response } from "express";
import OwnerIntrstPropertyModel from "../models/owner-intrst"; // Adjust the path as necessary

const ownerIntrstrouter = express.Router();

// Route to create a new property
ownerIntrstrouter.post(
  "/owner-intrst-form",
  async (req: Request, res: Response) => {
    try {
      const property = new OwnerIntrstPropertyModel(req.body);
      await property.save();
      res.status(201).send(property);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Route to get all properties
ownerIntrstrouter.get(
  "/owner-intrst-form",
  async (req: Request, res: Response) => {
    try {
      const properties = await OwnerIntrstPropertyModel.find();
      res.status(200).send(properties);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default ownerIntrstrouter;
