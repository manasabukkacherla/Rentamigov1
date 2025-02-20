import express from "express";
import mongoose from "mongoose";
import PlotProperty from "../models/PlotProperty";

const plotPropertyRouter = express.Router();

// 🔹 Create a new Plot Property
plotPropertyRouter.post("/add", async (req, res) => {
  try {
    const { userId, zoneType, plotArea, ownership } = req.body;

    if (!userId || !zoneType || !plotArea || !ownership) {
      return res.status(400).json({ error: "User ID, zone type, plot area, and ownership are required" });
    }

    const newPlotProperty = new PlotProperty({
      userId,
      zoneType,
      plotArea,
      ownership,
    });

    await newPlotProperty.save();
    res.status(201).json({ message: "Plot property added successfully", plotProperty: newPlotProperty });
  } catch (error) {
    console.error("❌ Error adding Plot Property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Plot Property by User ID
plotPropertyRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const plotProperties = await PlotProperty.find({ userId });
    res.status(200).json(plotProperties);
  } catch (error) {
    console.error("❌ Error fetching Plot Property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Plot Property by ID
plotPropertyRouter.get("/:plotId", async (req, res) => {
  try {
    const { plotId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(plotId)) {
      return res.status(400).json({ error: "Invalid Plot Property ID format" });
    }

    const plotProperty = await PlotProperty.findById(plotId);
    if (!plotProperty) {
      return res.status(404).json({ error: "Plot property not found" });
    }

    res.status(200).json(plotProperty);
  } catch (error) {
    console.error("❌ Error fetching Plot Property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Plot Property by ID
plotPropertyRouter.put("/:plotId", async (req, res) => {
  try {
    const { plotId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(plotId)) {
      return res.status(400).json({ error: "Invalid Plot Property ID format" });
    }

    const updatedPlot = await PlotProperty.findByIdAndUpdate(plotId, updateData, { new: true });

    if (!updatedPlot) {
      return res.status(404).json({ error: "Plot property not found" });
    }

    res.status(200).json({ message: "Plot property updated successfully", updatedPlot });
  } catch (error) {
    console.error("❌ Error updating Plot Property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Plot Property by ID
plotPropertyRouter.delete("/:plotId", async (req, res) => {
  try {
    const { plotId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(plotId)) {
      return res.status(400).json({ error: "Invalid Plot Property ID format" });
    }

    const deletedPlot = await PlotProperty.findByIdAndDelete(plotId);

    if (!deletedPlot) {
      return res.status(404).json({ error: "Plot property not found" });
    }

    res.status(200).json({ message: "Plot property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Plot Property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default plotPropertyRouter;
