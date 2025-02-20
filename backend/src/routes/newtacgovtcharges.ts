import express from "express";
import mongoose from "mongoose";
import TaxGovtCharges from "../models/taxGovtCharges";

const taxGovtChargesRouter = express.Router();

// 🔹 Create or Update Tax & Govt Charges for a User
taxGovtChargesRouter.post("/add", async (req, res) => {
  try {
    const { userId, isIncluded } = req.body;

    if (!userId || typeof isIncluded !== "boolean") {
      return res.status(400).json({ error: "User ID and isIncluded (true/false) are required" });
    }

    const existingEntry = await TaxGovtCharges.findOne({ userId });

    if (existingEntry) {
      existingEntry.isIncluded = isIncluded;
      await existingEntry.save();
      return res.status(200).json({ message: "Updated successfully", taxGovtCharges: existingEntry });
    }

    const newEntry = new TaxGovtCharges({ userId, isIncluded });
    await newEntry.save();
    res.status(201).json({ message: "Added successfully", taxGovtCharges: newEntry });
  } catch (error) {
    console.error("❌ Error saving tax & govt charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Tax & Govt Charges by User ID
taxGovtChargesRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const taxGovtCharges = await TaxGovtCharges.findOne({ userId });

    if (!taxGovtCharges) {
      return res.status(404).json({ error: "No tax & govt charges found for this user" });
    }

    res.status(200).json(taxGovtCharges);
  } catch (error) {
    console.error("❌ Error fetching tax & govt charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Tax & Govt Charges by User ID
taxGovtChargesRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedEntry = await TaxGovtCharges.findOneAndDelete({ userId });

    if (!deletedEntry) {
      return res.status(404).json({ error: "No tax & govt charges found for this user" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting tax & govt charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default taxGovtChargesRouter;
