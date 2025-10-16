import express from "express";
import newsocietyamenities from "../models/newsocietyamenities";

const router = express.Router();

// ✅ Get all amenities
router.get("/", async (req, res) => {
  try {
    const amenities = await newsocietyamenities.find();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching amenities" });
  }
});

// ✅ Add amenities in bulk
router.post("/bulk-add", async (req, res) => {
  try {
    const { amenities } = req.body; // Expecting an array of amenities

    if (!amenities || !Array.isArray(amenities)) {
      return res.status(400).json({ error: "Invalid amenities data" });
    }

    const insertedAmenities = await newsocietyamenities.insertMany(amenities);
    res.status(201).json(insertedAmenities);
  } catch (error) {
    res.status(500).json({ error: "Error adding amenities" });
  }
});

// ✅ Update an amenity availability
router.put("/:id", async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const amenity = await newsocietyamenities.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true }
    );

    if (!amenity) {
      return res.status(404).json({ error: "Amenity not found" });
    }

    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ error: "Error updating amenity" });
  }
});

// ✅ Delete an amenity
router.delete("/:id", async (req, res) => {
  try {
    const amenity = await newsocietyamenities.findByIdAndDelete(req.params.id);

    if (!amenity) {
      return res.status(404).json({ error: "Amenity not found" });
    }

    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting amenity" });
  }
});

export default router;
