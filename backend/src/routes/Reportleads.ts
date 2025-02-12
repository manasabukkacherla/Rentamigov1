import { Router } from "express";
import Report from "../models/Reportlead";

const Reportrouter = Router();

// POST: Create a new report
Reportrouter.post("/reports", async (req, res) => {
    try {
      const { leadId, name, number, userId, type, description } = req.body;
      const newReport = new Report({ leadId, name, number, userId, type, description });
      await newReport.save();
      res.status(201).json({ message: "Report created successfully", report: newReport });
    } catch (error) {
      console.error("Error creating report:", error);
  
      // ✅ Fix: Explicitly cast `error` to `Error` type
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: "Error creating report", error: errorMessage });
    }
  });
  
  Reportrouter.get("/reports", async (req, res) => {
    try {
      const reports = await Report.find();
      res.status(200).json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
  
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: "Error fetching reports", error: errorMessage });
    }
  });
  
  Reportrouter.get("/reports/:id", async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.status(200).json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
  
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ message: "Error fetching report", error: errorMessage });
    }
  });
  

export default Reportrouter;
