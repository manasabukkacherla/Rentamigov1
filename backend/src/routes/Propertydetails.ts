import express, { Request, Response } from "express";
import Property from "../models/Propertydetails"; // Adjust the path to your Property model file
import PropertyLocation from "../models/PropertyLocation"; // Adjust the path to your PropertyLocation model file
import PropertyFeatures from "../models/Propertyfeatures"; // Adjust the path to your PropertyFeatures model file
import SocietyAmenities from "../models/Societyamenities";
const propertyRouter = express.Router();

// Route to create a new property
propertyRouter.post("/property", async (req: Request, res: Response) => {
  try {
    // Create a new property document using the request body
    const newProperty = new Property(req.body);

    // Save the property to the database
    await newProperty.save();

    // Respond with the created property
    res.status(201).send(newProperty);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
});

// Route to create a new property location
propertyRouter.post("/property-location", async (req: Request, res: Response) => {
  try {
    const {
      property,
      flatNo,
      addressLine1,
      addressLine2,
      addressLine3,
      latitude,
      longitude,
      locality,
      area,
      pinCode,
    } = req.body;

    // Validate property reference
    const propertyDoc = await Property.findById(property);
    if (!propertyDoc) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Create a new PropertyLocation document
    const propertyLocation = new PropertyLocation({
      property,
      propertyName: propertyDoc.propertyName, // Dynamically set propertyName
      flatNo,
      addressLine1,
      addressLine2,
      addressLine3,
      latitude,
      longitude,
      locality,
      area,
      pinCode,
    });

    // Save to the database
    await propertyLocation.save();

    res.status(201).send(propertyLocation);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
});

// Route to create a new property feature
propertyRouter.post("/property-features", async (req: Request, res: Response) => {
  try {
    const {
      property,
      bedrooms,
      bathrooms,
      balconies,
      extraRooms,
      floorNumber,
      totalFloors,
      superBuiltupArea,
      builtupArea,
      carpetArea,
      propertyAge,
    } = req.body;

    // Validate property reference
    const propertyDoc = await Property.findById(property);
    if (!propertyDoc) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Create a new PropertyFeatures document
    const propertyFeatures = new PropertyFeatures({
      property,
      propertyName: propertyDoc.propertyName, // Dynamically set propertyName
      bedrooms,
      bathrooms,
      balconies,
      extraRooms,
      floorNumber,
      totalFloors,
      superBuiltupArea,
      builtupArea,
      carpetArea,
      propertyAge,
    });

    // Save to the database
    await propertyFeatures.save();

    res.status(201).send(propertyFeatures);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
});
propertyRouter.post("/society-amenities", async (req: Request, res: Response) => {
    try {
      const { property, selectedAmenities, powerBackupType } = req.body;
  
      // Validate property reference
      const propertyDoc = await Property.findById(property);
      if (!propertyDoc) {
        return res.status(404).send({ error: "Property not found" });
      }
  
      // Create a new SocietyAmenities document
      const societyAmenities = new SocietyAmenities({
        property,
        propertyName: propertyDoc.propertyName, // Dynamically set propertyName
        selectedAmenities,
        powerBackupType,
      });
  
      // Save to the database
      await societyAmenities.save();
  
      res.status(201).send(societyAmenities);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: "An unknown error occurred." });
      }
    }
  });
export default propertyRouter;
