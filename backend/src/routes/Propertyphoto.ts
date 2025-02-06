import express from "express";
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import PhotoUpload from "../models/PropertyPhotos"; // Adjust the path to your schema file
import Property from "../models/Propertydetails"; // Adjust the path to your Property schema file

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const photosRouter = express.Router();

/**
 * Uploads a file to AWS S3.
 * @param fileKey - The key (path) to store the file in the S3 bucket (e.g., "uploads/example.jpg").
 * @param fileBuffer - The file content as a Buffer.
 * @param fileType - The MIME type of the file (e.g., "image/jpeg").
 * @returns The public URL of the uploaded file.
 */
const uploadToS3 = async (
  fileKey: string,
  fileBuffer: Buffer,
  fileType: string
): Promise<string> => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const params = {
    Bucket: bucketName,
    Key: `uploads/properties/${fileKey}`, // Store files in the 'uploads/properties' folder
    Body: fileBuffer,
    ContentType: fileType,
    ACL: "public-read" as ObjectCannedACL,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);

    console.log("File uploaded successfully:", fileKey);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/properties/${fileKey}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3.");
  }
};

// POST API to upload photos
photosRouter.post("/upload-photos", async (req, res) => {
  try {
    // Extract user fields correctly
    let { propertyId, fileName, base64Data, fieldName, user, userId, username, fullName, role } = req.body;

    // If user object is provided, extract fields from it
    if (user) {
      userId = user.id;
      username = user.username;
      fullName = user.fullName || "Unknown";
      role = user.role;
    }

    // Validate required fields
    const requiredFields = ["propertyId", "userId", "username", "role", "fileName", "base64Data", "fieldName"];
    const missingFields = requiredFields.filter((field) => !eval(field));

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Fetch property details
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Validate Base64 data format
    const base64Pattern = /^data:(image|video)\/(\w+);base64,/;
    const fileTypeMatch = base64Data.match(base64Pattern);
    if (!fileTypeMatch) {
      return res.status(400).json({ error: "Invalid file format" });
    }
    const fileType = fileTypeMatch[2];

    // Convert Base64 to Buffer
    const fileBuffer = Buffer.from(base64Data.replace(base64Pattern, ""), "base64");

    // Define S3 file key
    const fileKey = `${propertyId}/${Date.now()}-${fileName}`;
    const fileUrl = await uploadToS3(fileKey, fileBuffer, `${fileTypeMatch[1]}/${fileType}`);

    if (!fileUrl) {
      return res.status(500).json({ error: "Failed to upload file to S3" });
    }

    // Prepare nested update field for MongoDB
    const updateField = { [`photos.${fieldName}`]: fileUrl };

    console.log("Update Field:", updateField); // Debugging log

    // Update or create PhotoUpload document in the database
    const updatedPhotoUpload = await PhotoUpload.findOneAndUpdate(
      { property: propertyId },
      {
        $set: updateField,
        $setOnInsert: {
          userId,
          username,
          role,
          propertyName: property.propertyName,
          property: propertyId,
          fullName,
        },
      },
      { new: true, upsert: true }
    );

    console.log("Updated PhotoUpload:", updatedPhotoUpload); // Debugging log

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
      photoUpload: updatedPhotoUpload,
    });
  } catch (error) {
    console.error("Error in /upload-photos:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



//Get api through userid or usernmae 
photosRouter.get("/upload-photos", async (req, res) => {
  try {
    const { userId, username } = req.query;

    // Validate at least one filter is provided
    if (!userId && !username) {
      return res.status(400).json({ error: "Please provide a userId or username to filter data." });
    }

    // Build query conditions dynamically
    const query: any = {};
    if (userId) query.userId = userId;
    if (username) query.username = username;

    // Fetch photo uploads based on query
    const photoUploads = await PhotoUpload.find(query).populate("property", "propertyName");

    if (photoUploads.length === 0) {
      return res.status(404).json({ message: "No photo uploads found for the given criteria." });
    }

    res.status(200).json(photoUploads);
  } catch (error) {
    console.error("Error in /upload-photos GET:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//GET api for photos 
photosRouter.get("/:propertyId/photos", async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      if (!propertyId) {
        return res.status(400).json({ error: "Property ID is required" });
      }
  
      // Fetch photos for the property from the database
      const photoData = await PhotoUpload.findOne({ property: propertyId });
  
      if (!photoData) {
        return res.status(404).json({ error: "No photos found for this property" });
      }
  
      // Return the photos data
      return res.status(200).json({
        message: "Photos fetched successfully",
        photos: photoData.photos,
      });
    } catch (error) {
      console.error("Error fetching photos:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
export default photosRouter;
