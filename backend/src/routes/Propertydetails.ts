import express, { Request, Response } from "express";
import Property from "../models/Propertydetails"; // Adjust the path to your Property model file
import PropertyLocation from "../models/PropertyLocation"; // Adjust the path to your PropertyLocation model file
import PropertyFeatures from "../models/Propertyfeatures"; // Adjust the path to your PropertyFeatures model file
import SocietyAmenities from "../models/Societyamenities";
import FlatAmenities from "../models/Flatamenities";
import PropertyRestrictions from "../models/Propertyrestrictions";
import PropertyCommercials from "../models/Propertycommercials";
import PropertyAvailability from "../models/PropertyAvailability";
import PhotoUpload from "../models/PropertyPhotos";

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
// Route to get a specific property by ID
propertyRouter.get("/propertyds/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Respond with the property details
    res.status(200).send(property);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
    }
  }
});
// Route to get all properties
propertyRouter.get("/allproperties", async (req: Request, res: Response) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find();

    // Respond with the list of properties
    res.status(200).send(properties);
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
//Route to put the property details
propertyRouter.put("/property/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property ID
    if (!id) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Find the property by ID and update it with the request body
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate inputs
    );

    // If no property found, return 404
    if (!updatedProperty) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Respond with the updated property
    res.status(200).send(updatedProperty);
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

//Get function based on property id 
propertyRouter.get("/:propertyId/locations", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!propertyId) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Fetch all locations associated with the given property ID
    const locations = await PropertyLocation.find({ property: propertyId });

    // If no locations are found
    if (locations.length === 0) {
      return res.status(404).send({ error: "No locations found for this property" });
    }

    // Respond with the list of locations
    res.status(200).send(locations);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
//get function based on location id 
propertyRouter.get("/property-location/:locationId", async (req: Request, res: Response) => {
  try {
    const { locationId } = req.params;

    // Validate locationId
    if (!locationId) {
      return res.status(400).json({ error: "Location ID is required" });
    }

    // Fetch the location document by its ID
    const location = await PropertyLocation.findById(locationId);

    // If no location is found
    if (!location) {
      return res.status(404).json({ error: "Property location not found" });
    }

    // Respond with the location document
    res.status(200).json(location);
  } catch (error) {
    // Handle unexpected errors
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "An unknown error occurred." });
  }
});

//ge
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
//route to put the property location
propertyRouter.put("/property-location/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property location ID
    if (!id) {
      return res.status(400).send({ error: "Property location ID is required" });
    }

    // Find and update the property location by ID
    const updatedPropertyLocation = await PropertyLocation.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no property location is found, return 404
    if (!updatedPropertyLocation) {
      return res.status(404).send({ error: "Property location not found" });
    }

    // Respond with the updated property location
    res.status(200).send(updatedPropertyLocation);
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

//Route get details with property id
propertyRouter.get("/:propertyId/features", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!propertyId) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Find features associated with the given property ID
    const features = await PropertyFeatures.find({ property: propertyId });

    // If no features are found
    if (!features || features.length === 0) {
      return res.status(404).send({ error: "No features found for this property" });
    }

    // Return the features
    res.status(200).send(features);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
propertyRouter.get("/property-features/:featuresId", async (req: Request, res: Response) => {
  try {
    const { featuresId } = req.params;

    // Validate featuresId
    if (!featuresId) {
      return res.status(400).json({ error: "Features ID is required" });
    }

    // Find the features document by ID
    const features = await PropertyFeatures.findById(featuresId);

    // If the features document is not found
    if (!features) {
      return res.status(404).json({ error: "Features not found" });
    }

    // Return the features document
    res.status(200).json(features);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: "An unknown error occurred." });
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
//route to put the propert features
propertyRouter.put("/property-features/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property features ID
    if (!id) {
      return res.status(400).send({ error: "Property features ID is required" });
    }

    // Find and update the property features by ID
    const updatedPropertyFeatures = await PropertyFeatures.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no property features are found, return 404
    if (!updatedPropertyFeatures) {
      return res.status(404).send({ error: "Property features not found" });
    }

    // Respond with the updated property features
    res.status(200).send(updatedPropertyFeatures);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
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

//Get with property id as for society amenities 
propertyRouter.get("/:propertyId/society-amenities", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!propertyId) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Find society amenities associated with the given property ID
    const amenities = await SocietyAmenities.find({ property: propertyId });

    // If no amenities are found
    if (!amenities || amenities.length === 0) {
      return res.status(404).send({ error: "No amenities found for this property" });
    }

    // Return the amenities
    res.status(200).send(amenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
//get function with society maeneties id 
propertyRouter.get("/society-amenities/:amenitiesId", async (req: Request, res: Response) => {
  try {
    const { amenitiesId } = req.params;

    // Validate amenitiesId
    if (!amenitiesId) {
      return res.status(400).send({ error: "Amenities ID is required" });
    }

    // Find the amenities document by ID
    const amenities = await SocietyAmenities.findById(amenitiesId);

    // If the amenities document is not found
    if (!amenities) {
      return res.status(404).send({ error: "Amenities not found" });
    }

    // Return the amenities document
    res.status(200).send(amenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
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
//route to put the society amenities
propertyRouter.put("/society-amenities/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the society amenities ID
    if (!id) {
      return res.status(400).send({ error: "Society amenities ID is required" });
    }

    // Find and update the society amenities by ID
    const updatedSocietyAmenities = await SocietyAmenities.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no society amenities are found, return 404
    if (!updatedSocietyAmenities) {
      return res.status(404).send({ error: "Society amenities not found" });
    }

    // Respond with the updated society amenities
    res.status(200).send(updatedSocietyAmenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
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

//Get function with property id 
propertyRouter.get("/:propertyId/flat-amenities", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!propertyId) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Find flat amenities associated with the given property ID
    const amenities = await FlatAmenities.find({ property: propertyId });

    // If no amenities are found
    if (!amenities || amenities.length === 0) {
      return res.status(404).send({ error: "No flat amenities found for this property" });
    }

    // Return the amenities
    res.status(200).send(amenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
//get amenities by amenties id 
propertyRouter.get("/flat-amenities/:amenitiesId", async (req: Request, res: Response) => {
  try {
    const { amenitiesId } = req.params;

    // Validate amenitiesId
    if (!amenitiesId) {
      return res.status(400).send({ error: "Amenities ID is required" });
    }

    // Find the flat amenities document by ID
    const amenities = await FlatAmenities.findById(amenitiesId);

    // If the amenities document is not found
    if (!amenities) {
      return res.status(404).send({ error: "Flat amenities not found" });
    }

    // Return the amenities document
    res.status(200).send(amenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
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

//route to put the flatamenities
propertyRouter.put("/flat-amenities/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the flat amenities ID
    if (!id) {
      return res.status(400).send({ error: "Flat amenities ID is required" });
    }

    // Find and update the flat amenities by ID
    const updatedFlatAmenities = await FlatAmenities.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no flat amenities are found, return 404
    if (!updatedFlatAmenities) {
      return res.status(404).send({ error: "Flat amenities not found" });
    }

    // Respond with the updated flat amenities
    res.status(200).send(updatedFlatAmenities);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
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

  //Get function of  restriction with property id 
  propertyRouter.get("/:propertyId/restrictions", async (req: Request, res: Response) => {
    try {
      const { propertyId } = req.params;
  
      // Validate propertyId
      if (!propertyId) {
        return res.status(400).json({ error: "Property ID is required" });
      }
  
      // Find property restrictions associated with the given property ID
      const restrictions = await PropertyRestrictions.find({ property: propertyId });
  
      // If no restrictions are found
      if (!restrictions || restrictions.length === 0) {
        return res.status(404).json({ error: "No restrictions found for this property" });
      }
  
      // Return the restrictions
      res.status(200).json(restrictions);
    } catch (error) {
      // Handle unexpected errors
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "An unknown error occurred." });
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

//get function with rescrtions id   
propertyRouter.get("/property-restrictions/:restrictionsId", async (req: Request, res: Response) => {
  try {
    const { restrictionsId } = req.params;

    // Validate restrictionsId
    if (!restrictionsId) {
      return res.status(400).send({ error: "Restrictions ID is required" });
    }

    // Find the restrictions document by ID
    const restrictions = await PropertyRestrictions.findById(restrictionsId);

    // If the restrictions document is not found
    if (!restrictions) {
      return res.status(404).send({ error: "Restrictions not found" });
    }

    // Return the restrictions document
    res.status(200).send(restrictions);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
//route to put the property restrictions
propertyRouter.put("/property-restrictions/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property restrictions ID
    if (!id) {
      return res.status(400).send({ error: "Property restrictions ID is required" });
    }

    // Find and update the property restrictions by ID
    const updatedPropertyRestrictions = await PropertyRestrictions.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no property restrictions are found, return 404
    if (!updatedPropertyRestrictions) {
      return res.status(404).send({ error: "Property restrictions not found" });
    }

    // Respond with the updated property restrictions
    res.status(200).send(updatedPropertyRestrictions);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
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


  //Rpute to get commercials with property id 
  propertyRouter.get("/:propertyId/commercials", async (req: Request, res: Response) => {
    try {
      const { propertyId } = req.params;
  
      // Validate propertyId
      if (!propertyId) {
        return res.status(400).send({ error: "Property ID is required" });
      }
  
      // Find property commercials associated with the given property ID
      const commercials = await PropertyCommercials.find({ property: propertyId });
  
      // If no commercials are found
      if (!commercials || commercials.length === 0) {
        return res.status(404).send({ error: "No commercials found for this property" });
      }
  
      // Return the commercials
      res.status(200).send(commercials);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An unknown error occurred." });
      }
    }
  });
  propertyRouter.get("/property-commercials/:commercialsId", async (req: Request, res: Response) => {
    try {
      const { commercialsId } = req.params;
  
      // Validate commercialsId
      if (!commercialsId) {
        return res.status(400).send({ error: "Commercials ID is required" });
      }
  
      // Find the commercials document by ID
      const commercials = await PropertyCommercials.findById(commercialsId);
  
      // If the commercials document is not found
      if (!commercials) {
        return res.status(404).send({ error: "Commercials not found" });
      }
  
      // Return the commercials document
      res.status(200).send(commercials);
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An unknown error occurred." });
      }
    }
  });
    

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
//route to put the propertycommercials
propertyRouter.put("/property-commercials/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property commercials ID
    if (!id) {
      return res.status(400).send({ error: "Property commercials ID is required" });
    }

    // Find and update the property commercials by ID
    const updatedPropertyCommercials = await PropertyCommercials.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no property commercials are found, return 404
    if (!updatedPropertyCommercials) {
      return res.status(404).send({ error: "Property commercials not found" });
    }

    // Respond with the updated property commercials
    res.status(200).send(updatedPropertyCommercials);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: "An unknown error occurred." });
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

//Get function with property id for availlability 
propertyRouter.get("/:propertyId/availability", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    // Validate propertyId
    if (!propertyId) {
      return res.status(400).send({ error: "Property ID is required" });
    }

    // Find property availability associated with the given property ID
    const availability = await PropertyAvailability.find({ property: propertyId });

    // If no availability records are found
    if (!availability || availability.length === 0) {
      return res.status(404).send({ error: "No availability records found for this property" });
    }

    // Return the availability records
    res.status(200).send(availability);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});
//Get api for the availabilty with their id 
propertyRouter.get("/property-availability/:availabilityId", async (req: Request, res: Response) => {
  try {
    const { availabilityId } = req.params;

    // Validate availabilityId
    if (!availabilityId) {
      return res.status(400).send({ error: "Availability ID is required" });
    }

    // Find the availability document by ID
    const availability = await PropertyAvailability.findById(availabilityId);

    // If the availability document is not found
    if (!availability) {
      return res.status(404).send({ error: "Availability not found" });
    }

    // Return the availability document
    res.status(200).send(availability);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
    }
  }
});

//get api for the all property details 
propertyRouter.get("/property-details/:propertyId", async (req: Request, res: Response) => {
  const { propertyId } = req.params;

  try {
    // Validate if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).send({ error: "Property not found" });
    }

    // Fetch related details from all collections
    const propertyLocation = await PropertyLocation.findOne({ property: propertyId });
    const propertyFeatures = await PropertyFeatures.findOne({ property: propertyId });
    const societyAmenities = await SocietyAmenities.findOne({ property: propertyId });
    const flatAmenities = await FlatAmenities.findOne({ property: propertyId });
    const propertyRestrictions = await PropertyRestrictions.findOne({ property: propertyId });
    const propertyCommercials = await PropertyCommercials.findOne({ property: propertyId });
    const propertyAvailability = await PropertyAvailability.findOne({ property: propertyId });
    const propertyPhotos = await PhotoUpload.findOne({ property: propertyId }); // Fetch property photos

    // Combine all details into a single object
    const propertyDetails = {
      property,
      propertyLocation,
      propertyFeatures,
      societyAmenities,
      flatAmenities,
      propertyRestrictions,
      propertyCommercials,
      propertyAvailability,
      propertyPhotos, // Include photos in the response
    };

    res.status(200).send(propertyDetails);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An unknown error occurred." });
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
//route to put the propertyavailability
propertyRouter.put("/property-availability/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate the property availability ID
    if (!id) {
      return res.status(400).send({ error: "Property availability ID is required" });
    }

    // Find and update the property availability by ID
    const updatedPropertyAvailability = await PropertyAvailability.findByIdAndUpdate(
      id,
      req.body, // Updates from the request body
      { new: true, runValidators: true } // Return the updated document and validate fields
    ).populate("property", "propertyName"); // Populate propertyName from the Property model

    // If no property availability is found, return 404
    if (!updatedPropertyAvailability) {
      return res.status(404).send({ error: "Property availability not found" });
    }

    // Respond with the updated property availability
    res.status(200).send(updatedPropertyAvailability);
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