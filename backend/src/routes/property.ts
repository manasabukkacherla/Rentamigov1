import express, { Request, Response } from "express";
import { Property } from "../models/property";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { IProperty } from "../models/property";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";

dotenv.config();

const propertyRouter = express.Router();

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

// Configure Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// S3 Upload Function
async function uploadFileToS3(file: Express.Multer.File, folder: string) {
  const uniqueFileName = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `property-photos/${folder}/${uniqueFileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    return fileUrl;
  } catch (error) {
    throw new Error(`S3 Upload Error: ${error}`);
  }
}

// Multer Upload Handler
const handleMulterUpload = upload.fields([
  { name: "cardPhoto", maxCount: 10 },
  { name: "exteriorView", maxCount: 10 },
  { name: "livingRoom", maxCount: 10 },
  { name: "kitchen", maxCount: 10 },
  { name: "diningRoom", maxCount: 10 },
  { name: "bedroom1", maxCount: 10 },
  { name: "bedroom2", maxCount: 10 },
  { name: "bedroom3", maxCount: 10 },
  { name: "bedroom4", maxCount: 10 },
  { name: "bathroom1", maxCount: 10 },
  { name: "bathroom2", maxCount: 10 },
  { name: "bathroom3", maxCount: 10 },
  { name: "bathroom4", maxCount: 10 },
  { name: "balcony1", maxCount: 10 },
  { name: "balcony2", maxCount: 10 },
  { name: "balcony3", maxCount: 10 },
  { name: "balcony4", maxCount: 10 },
  { name: "studyRoom", maxCount: 10 },
  { name: "pujaRoom", maxCount: 10 },
  { name: "theaterRoom", maxCount: 10 },
  { name: "gymRoom", maxCount: 10 },
  { name: "utilityArea", maxCount: 10 },
  { name: "others", maxCount: 10 },
]);

// Helper Function: Get Amenities
//

// Routes
propertyRouter.post(
  "/",
  handleMulterUpload,
  async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const propertyData: Partial<IProperty> = JSON.parse(
        req.body.propertyData
      );
      const photos: Record<string, string[]> = {};

      for (const [key, fileArray] of Object.entries(files)) {
        photos[key] = await Promise.all(
          fileArray.map((file) => uploadFileToS3(file, key))
        );
      }

      const newPropertyData: IProperty = {
        ...propertyData,
        photos,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as IProperty;

      const property = new Property(newPropertyData);
      await property.save();

      res.status(201).json(property);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

propertyRouter.get("/", async (req: Request, res: Response) => {
  try {
    const filters = { ...req.query };
    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

propertyRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    // Add any missing fields explicitly if needed
    res.json({
      propertyName: property.propertyName,
      locality: property.locality,
      city: property.city,
      rentPrice: property.monthlyRent,
      maintenanceAmount: property.maintenanceAmount,
      securityDeposit: property.securityDeposit,
      propertyDescription: property.propertyDescription,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
propertyRouter.get('/:id/com', async (req, res) => {
  try {
      const { id } = req.params;
      const propertyDetails = await Property.findById(id).select('monthlyRent maintenanceAmount securityDeposit -_id'); // Select only required fields

      if (!propertyDetails) {
          return res.status(404).json({ message: 'Property not found' });
      }

      res.status(200).json(propertyDetails);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
propertyRouter.get("/:id/photos", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).select("photos");
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property.photos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//Property details and amenities
propertyRouter.get(
  "/details/:special_id",
  async (req: Request, res: Response) => {
    try {
      const { special_id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(special_id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await Property.findById(special_id);

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      const { flatAmenities, societyAmenities } = getAmenities(property);
      const { propertyName, area, locality, address, propertyType } = property;

      res.json({
        success: true,
        propertyName,
        area,
        locality,
        address,
        propertyType,
        flatAmenities,
        societyAmenities,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

propertyRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(property);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

propertyRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

propertyRouter.get("/:id/description", async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id).select(
      "propertyDescription"
    );

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json({
      propertyDescription: property.propertyDescription || "",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default propertyRouter;
function getAmenities(property: any): { flatAmenities: any; societyAmenities: any; } {
  throw new Error("Function not implemented.");
}

