"use strict";
// import express from "express";
// import Lead from "../models/lead";
// import PropertyEnquiry from "../models/propertenquiry";
// import PropertyLocation from "../models/PropertyLocation";
// import mongoose from "mongoose";
// const leadsRouter = express.Router();
// // 🔹 Fetch & Store Leads Dynamically
// leadsRouter.post("/sync-leads", async (req, res) => {
//   try {
//     // Fetch all Property Enquiries
//     const enquiries = await PropertyEnquiry.find();
//     if (!enquiries.length) {
//       return res.status(404).json({ error: "No property enquiries found." });
//     }
//     // Process each enquiry
//     for (const enquiry of enquiries) {
//       const { _id, name, email, contactNumber, propertyId, propertyName, userId, username, fullName, role } = enquiry;
//       // Fetch Property Location for flatNo
//       const propertyLocation = await PropertyLocation.findOne({ property: propertyId });
//       // Check if the lead already exists
//       const existingLead = await Lead.findOne({ propertyId, email });
//       if (!existingLead) {
//         // Create new lead entry
//         const newLead = new Lead({
//           userId,
//           username,
//           fullName,
//           role,
//           name,
//           email,
//           phone: contactNumber,
//           propertyId,
//           propertyName,
//           flatNo: propertyLocation ? propertyLocation.flatNo : "N/A",
//           status: "New", // Default Status
//         });
//         await newLead.save();
//       }
//     }
//     res.status(200).json({ message: "Leads synchronized successfully." });
//   } catch (error) {
//     console.error("Error syncing leads:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });
// // 🔹 Fetch Leads by user id 
// leadsRouter.get("/glead", async (req, res) => {
//   try {
//     const userId = req.query.userId; // Get userId from query params
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required." });
//     }
//     const leads = await Lead.find({ userId }); // Filter leads by userId
//     res.status(200).json(leads);
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });
// leadsRouter.get("/", async (req, res) => {
//   try {
//     const leads = await Lead.find({}, "name email phone propertyName flatNo status createdAt updatedAt");
//     res.status(200).json(leads);
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });
// // 🔹 Update Lead Status
// leadsRouter.put("/update-status/:leadId", async (req, res) => {
//     try {
//         const { leadId } = req.params;
//         const { status } = req.body;
//         // ✅ Validate ObjectId format
//         if (!mongoose.Types.ObjectId.isValid(leadId)) {
//             return res.status(400).json({ error: "Invalid Lead ID format" });
//         }
//         if (!status) {
//             return res.status(400).json({ error: "Status is required" });
//         }
//         // ✅ Fetch the current lead before updating
//         const existingLead = await Lead.findById(leadId);
//         if (!existingLead) {
//             return res.status(404).json({ error: "Lead not found." });
//         }
//         // ✅ Update only status while keeping createdAt unchanged
//         const updatedLead = await Lead.findByIdAndUpdate(
//             leadId,
//             { status }, // ✅ Only update status
//             { new: true } // ✅ Ensures we return the updated document
//         );
//         if (!updatedLead) {
//             return res.status(404).json({ error: "Lead not found." });
//         }
//         // ✅ Explicitly set createdAt from the existing lead before sending response
//         updatedLead.createdAt = existingLead.createdAt; // Preserve original creation date
//         res.status(200).json({ message: "Lead status updated successfully.", updatedLead });
//     } catch (error) {
//         console.error("Error updating lead status:", error);
//         res.status(500).json({ error: "Internal server error." });
//     }
// });
// export default leadsRouter;
