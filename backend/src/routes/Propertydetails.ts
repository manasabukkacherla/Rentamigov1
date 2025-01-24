import express, { Request, Response } from "express";
import Property from "../models/Propertydetails"; // Adjust the path to your Property model file
import PropertyLocation from "../models/PropertyLocation"; // Adjust the path to your PropertyLocation model file
import PropertyFeatures from "../models/Propertyfeatures"; // Adjust the path to your PropertyFeatures model file
import SocietyAmenities from "../models/Societyamenities";
import FlatAmenities from "../models/Flatamenities";
import PropertyRestrictions from "../models/Propertyrestrictions";
import PropertyCommercials from "../models/Propertycommercials";
import PropertyAvailability from "../models/PropertyAvailability";
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
//Routes get all property details
propertyRouter.get("/property", async (req: Request, res: Response) => {
  try {
    // Retrieve all properties from the database
    const properties = await Property.find();

    // Respond with the list of properties
    res.status(200).send(properties);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
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
//Routes get all property locations
propertyRouter.get("/property-location", async (req: Request, res: Response) => {
  try {
    // Retrieve all property locations from the database
    const propertyLocations = await PropertyLocation.find().populate("property", "propertyName");

    // Respond with the list of property locations
    res.status(200).send(propertyLocations);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
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
//Routes get all property features
propertyRouter.get("/property-features", async (req: Request, res: Response) => {
  try {
    const { property, _id } = req.query;

    // Build query based on optional filters
    const query: any = {};
    if (property) query.property = property;
    if (_id) query._id = _id;

    // Fetch property features from the database
    const propertyFeatures = await PropertyFeatures.find(query)
      .populate("property", "propertyName") // Populates propertyName from the Property model
      .exec();

    if (!propertyFeatures.length) {
      return res.status(404).send({ error: "No property features found" });
    }

    res.status(200).send(propertyFeatures);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});

// route to post society-amenities
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
  //Routes get all property features
  propertyRouter.get("/society-amenities", async (req: Request, res: Response) => {
    try {
      const { property, _id } = req.query;
  
      // Build the query based on optional filters
      const query: any = {};
      if (property) query.property = property;
      if (_id) query._id = _id;
  
      // Fetch society amenities from the database
      const societyAmenities = await SocietyAmenities.find(query)
        .populate("property", "propertyName") // Populates propertyName from the Property model
        .exec();
  
      if (!societyAmenities.length) {
        return res.status(404).send({ error: "No society amenities found" });
      }
  
      res.status(200).send(societyAmenities);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An unknown error occurred." });
      }
    }
  });

  // Route to create new flat amenities
propertyRouter.post("/flat-amenities", async (req: Request, res: Response) => {
    try {
      const { property, selectedAmenities } = req.body;
  
      // Validate property reference
      const propertyDoc = await Property.findById(property);
      if (!propertyDoc) {
        return res.status(404).send({ error: "Property not found" });
      }
  
      // Create a new FlatAmenities document
      const flatAmenities = new FlatAmenities({
        property,
        propertyName: propertyDoc.propertyName, // Dynamically set propertyName
        selectedAmenities,
      });
  
      // Save to the database
      await flatAmenities.save();
  
      res.status(201).send(flatAmenities);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: "An unknown error occurred." });
      }
    }
  });
   //Routes get all flat amenities
   propertyRouter.get("/flat-amenities", async (req: Request, res: Response) => {
    try {
      const { property, _id } = req.query;
  
      // Build query based on optional filters
      const query: any = {};
      if (property) query.property = property;
      if (_id) query._id = _id;
  
      // Fetch flat amenities from the database
      const flatAmenities = await FlatAmenities.find(query)
        .populate("property", "propertyName") // Populates propertyName from the Property model
        .exec();
  
      if (!flatAmenities.length) {
        return res.status(404).send({ error: "No flat amenities found" });
      }
  
      res.status(200).send(flatAmenities);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An unknown error occurred." });
      }
    }
  });

  //property restrictions post api
  propertyRouter.post("/property-restrictions", async (req: Request, res: Response) => {
    try {
      const {
        property,
        bachelorTenants,
        nonVegTenants,
        tenantWithPets,
        propertyOverlooking,
        carParking,
        carParkingCount,
        twoWheelerParking,
        twoWheelerParkingCount,
        flooringType,
      } = req.body;
  
      // Validate property reference
      const propertyDoc = await Property.findById(property);
      if (!propertyDoc) {
        return res.status(404).send({ error: "Property not found" });
      }
  
      // Create a new PropertyRestrictions document
      const propertyRestrictions = new PropertyRestrictions({
        property,
        propertyName: propertyDoc.propertyName, // Dynamically set propertyName
        bachelorTenants,
        nonVegTenants,
        tenantWithPets,
        propertyOverlooking,
        carParking,
        carParkingCount,
        twoWheelerParking,
        twoWheelerParkingCount,
        flooringType,
      });
  
      // Save to the database
      await propertyRestrictions.save();
  
      res.status(201).send(propertyRestrictions);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: "An unknown error occurred." });
      }
    }
  });
  //routes for  get property restrictions
  propertyRouter.get("/property-restrictions", async (req: Request, res: Response) => {
    try {
      const { property, _id } = req.query;
  
      // Build query based on optional filters
      const query: any = {};
      if (property) query.property = property;
      if (_id) query._id = _id;
  
      // Fetch property restrictions from the database
      const propertyRestrictions = await PropertyRestrictions.find(query)
        .populate("property", "propertyName") // Populates propertyName from the Property model
        .exec();
  
      if (!propertyRestrictions.length) {
        return res.status(404).send({ error: "No property restrictions found" });
      }
  
      res.status(200).send(propertyRestrictions);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An unknown error occurred." });
      }
    }
  });
  //Property commercials post api 
  propertyRouter.post("/property-commercials", async (req: Request, res: Response) => {
    try {
      const { property, monthlyRent, maintenance, maintenanceAmount, securityDeposit } = req.body;
  
      // Validate property reference
      const propertyDoc = await Property.findById(property);
      if (!propertyDoc) {
        return res.status(404).send({ error: "Property not found" });
      }
  
      // Create a new PropertyCommercials document
      const propertyCommercials = new PropertyCommercials({
        property,
        propertyName: propertyDoc.propertyName, // Dynamically set propertyName
        monthlyRent,
        maintenance,
        maintenanceAmount,
        securityDeposit,
      });
  
      // Save to the database
      await propertyCommercials.save();
  
      res.status(201).send(propertyCommercials);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: "An unknown error occurred." });
      }
    }
  });
//route to get the propertycommercials
propertyRouter.get("/property-commercials", async (req: Request, res: Response) => {
  try {
    const { property, _id } = req.query;

    // Build query based on optional filters
    const query: any = {};
    if (property) query.property = property;
    if (_id) query._id = _id;

    // Fetch property commercials from the database
    const propertyCommercials = await PropertyCommercials.find(query)
      .populate("property", "propertyName") // Populate propertyName from the Property model
      .exec();

    if (!propertyCommercials.length) {
      return res.status(404).send({ error: "No property commercials found" });
    }

    res.status(200).send(propertyCommercials);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
  // Route to create new property availability
propertyRouter.post("/property-availability", async (req: Request, res: Response) => {
  try {
    const { property, availableFrom } = req.body;

    // Validate property reference
    const propertyDoc = await Property.findById(property);
    if (!propertyDoc) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Create a new PropertyAvailability document
    const propertyAvailability = new PropertyAvailability({
      property,
      propertyName: propertyDoc.propertyName, // Dynamically set propertyName
      availableFrom,
    });

    // Save to the database
    await propertyAvailability.save();

    res.status(201).send(propertyAvailability);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
});
//route to get the propertyavailability

propertyRouter.get("/property-availability", async (req: Request, res: Response) => {
  try {
    const { property, _id } = req.query;

    // Build query filters dynamically
    const query: any = {};
    if (property) query.property = property; // Filter by property ID
    if (_id) query._id = _id; // Filter by specific availability document ID

    // Fetch property availability data
    const propertyAvailability = await PropertyAvailability.find(query)
      .populate("property", "propertyName") // Populates propertyName from the Property model
      .exec();

    // If no records found
    if (!propertyAvailability.length) {
      return res.status(404).send({ error: "No property availability records found" });
    }

    // Respond with the data
    res.status(200).send(propertyAvailability);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
export default propertyRouter;