import express, { Request, Response } from "express";
import LeadToken from "../models/Leadtoken"; // Import your schema
const router = express.Router();

// 🔹 POST: Create new LeadToken
router.post("/", async (req: Request, res: Response) => {
  try {
    const { propertyName, propertyId, status, tokenPerLead, verified } = req.body;

    const newEntry = await LeadToken.create({
      propertyName,
      propertyId,
      status,
      tokenPerLead,
      verified,
    });

    res.status(201).json({ message: "LeadToken created successfully", data: newEntry });
  } catch (error) {
    console.error("POST /lead-token error:", error);
    res.status(500).json({ error: "Failed to create LeadToken" });
  }
});

// 🔹 GET: Get all LeadTokens
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tokens = await LeadToken.find();
    res.status(200).json(tokens);
  } catch (error) {
    console.error("GET /lead-token error:", error);
    res.status(500).json({ error: "Failed to fetch LeadTokens" });
  }
});

// 🔹 GET by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await LeadToken.findById(id);

    if (!token) return res.status(404).json({ error: "LeadToken not found" });

    res.status(200).json(token);
  } catch (error) {
    console.error("GET /lead-token/:id error:", error);
    res.status(500).json({ error: "Failed to fetch LeadToken" });
  }
});

// 🔹 PUT: Update by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await LeadToken.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ error: "LeadToken not found" });

    res.status(200).json({ message: "LeadToken updated", data: updated });
  } catch (error) {
    console.error("PUT /lead-token/:id error:", error);
    res.status(500).json({ error: "Failed to update LeadToken" });
  }
});

// 🔹 DELETE: Delete by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await LeadToken.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "LeadToken not found" });

    res.status(200).json({ message: "LeadToken deleted" });
  } catch (error) {
    console.error("DELETE /lead-token/:id error:", error);
    res.status(500).json({ error: "Failed to delete LeadToken" });
  }
});

export default router;
