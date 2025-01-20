"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_1 = __importDefault(require("../models/property"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const propertyRouter = express_1.default.Router();
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || "",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true,
});
const upload = (0, multer_1.default)();
async function uploadFileToS3(file, folder) {
    const uniqueFileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `property-photos/${folder}/${uniqueFileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: ObjectCannedACL.public_read, // Add this line to make objects publicly readable
    };
    try {
        const command = new client_s3_1.PutObjectCommand(params);
        await s3.send(command);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    }
    catch (error) {
        console.error("S3 Upload Error:", error);
        throw error;
    }
}
// Create a new property listing
propertyRouter.post("/", upload.fields([
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
]), async (req, res) => {
    try {
        const files = req.files;
        const propertyData = JSON.parse(req.body.propertyData);
        // Initialize photos object
        const photos = {};
        // Upload each set of photos
        for (const [key, fileArray] of Object.entries(files)) {
            photos[key] = await Promise.all(fileArray.map((file) => uploadFileToS3(file, key)));
        }
        const newPropertyData = {
            ...propertyData,
            photos,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const property = new property_1.default(newPropertyData);
        await property.save();
        res.status(201).json(property);
        console.log("Property created:", property);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Get all properties with filtering
propertyRouter.get("/", async (req, res) => {
    try {
        const filters = { ...req.query };
        // Handle specific enum filters
        if (filters.ownerType &&
            !["Owner", "Agent", "Builder"].includes(filters.ownerType)) {
            return res.status(400).json({ error: "Invalid ownerType" });
        }
        if (filters.listingType &&
            !["Sale", "Rent/Lease", "PG/Hostel"].includes(filters.listingType)) {
            return res.status(400).json({ error: "Invalid listingType" });
        }
        const properties = await property_1.default.find(filters);
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get a specific property
propertyRouter.get("/:id", async (req, res) => {
    try {
        const property = await property_1.default.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.json(property);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update a property
propertyRouter.put("/:id", async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            updatedAt: new Date(),
        };
        const property = await property_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.json(property);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Delete a property
propertyRouter.delete("/:id", async (req, res) => {
    try {
        const property = await property_1.default.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = propertyRouter;
