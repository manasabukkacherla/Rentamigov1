"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePgMain = exports.getPgByPropertyId = exports.getAllPgs = exports.updatePgMain = exports.createPg = void 0;
const Pgmain_1 = __importDefault(require("../../models/residential/Pgmain"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Generate a unique property ID for PGs
 */
const generatePropertyId = async () => {
    try {
        const prefix = 'RA-REPG';
        const highestPg = await Pgmain_1.default.findOne({
            propertyId: { $regex: `^${prefix}\\d+$` },
        }).sort({ propertyId: -1 });
        let nextNumber = 1;
        if (highestPg && highestPg.propertyId) {
            const match = highestPg.propertyId.match(/(\d+)$/);
            if (match && match[1]) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const propertyId = `${prefix}${nextNumber.toString().padStart(4, '0')}`;
        const existingWithExactId = await Pgmain_1.default.findOne({ propertyId });
        if (existingWithExactId) {
            const forcedNextNumber = nextNumber + 1;
            const forcedPropertyId = `${prefix}${forcedNextNumber.toString().padStart(4, '0')}`;
            const forcedExisting = await Pgmain_1.default.findOne({ propertyId: forcedPropertyId });
            if (forcedExisting) {
                return generatePropertyId();
            }
            return forcedPropertyId;
        }
        return propertyId;
    }
    catch (error) {
        console.error('Error generating property ID:', error);
        const timestamp = Date.now().toString().slice(-8);
        return `RA-PGMAIN${timestamp}`;
    }
};
/**
 * Create a new PG listing
 */
const createPg = async (req, res) => {
    try {
        const { body } = req;
        // Validate userId - Ensure it's a valid ObjectId format
        if (!mongoose_1.default.Types.ObjectId.isValid(body.metadata.userId)) {
            return res.status(400).json({ success: false, error: 'Invalid userId format' });
        }
        // Generate propertyId for the new PG
        const propertyId = await generatePropertyId();
        // Ensure required fields have default values if missing
        const pgData = {
            ...body,
            propertyId,
            pgDetails: {
                name: body.pgDetails?.name || '',
                accommodationType: body.pgDetails?.accommodationType || 'both boys and girls',
                address: body.pgDetails?.address || '',
                ...body.pgDetails,
            },
            metadata: {
                userId: new mongoose_1.default.Types.ObjectId(body.metadata.userId), // Ensure userId is passed as ObjectId
                userName: body.metadata?.userName || 'Not Specified',
                createdAt: body.metadata?.createdAt || new Date().toISOString(),
            },
        };
        // Create and save PG
        const pg = new Pgmain_1.default(pgData);
        await pg.save();
        return res.status(201).json({ success: true, data: pg });
    }
    catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        return res.status(400).json({ success: false, error: errorMsg });
    }
};
exports.createPg = createPg;
const updatePgMain = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const updatedPg = await Pgmain_1.default.findOneAndUpdate({ propertyId: req.params.propertyId }, // ✅ match by custom field
        req.body, { new: true });
        if (!updatedPg) {
            return res.status(404).json({ success: false, message: "PG not found" });
        }
        res.status(200).json({ success: true, data: updatedPg });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to update PG", error });
    }
};
exports.updatePgMain = updatePgMain;
/**
 * Get all PGs
 */
const getAllPgs = async (req, res) => {
    try {
        const pgs = await Pgmain_1.default.find();
        res.json({ success: true, data: pgs });
    }
    catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        res.status(500).json({ success: false, error: errorMsg });
    }
};
exports.getAllPgs = getAllPgs;
/**
 * Get PG by ID
 */
const getPgByPropertyId = async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Find PG by the propertyId string
        const pg = await Pgmain_1.default.findOne({ propertyId });
        if (!pg) {
            return res.status(404).json({ success: false, error: 'PG not found' });
        }
        res.json({ success: true, data: pg });
    }
    catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        res.status(500).json({ success: false, error: errorMsg });
    }
};
exports.getPgByPropertyId = getPgByPropertyId;
/**
 * Update PG by propertyId (used in PATCH route)
 */
/**
 * Update PG by ID
 */
/**
 * Delete PG by ID
 */
const deletePgMain = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const deleted = await Pgmain_1.default.findOneAndDelete({ propertyId });
        if (!deleted) {
            return res.status(404).json({ success: false, error: "PG not found" });
        }
        return res.status(200).json({ success: true, message: "PG deleted successfully" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete PG';
        return res.status(500).json({ success: false, error: message });
    }
};
exports.deletePgMain = deletePgMain;
