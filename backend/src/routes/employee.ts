import express, { Request, Response } from "express";
import Employee from "../models/employee";

const employeeRouter = express.Router();

// CREATE - Post a new employee
employeeRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, role, phone, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !role || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: firstname, lastname, email, role, phone, and password.",
      });
    }

    const employee = new Employee({ firstname, lastname, email, role, phone, password });
    const savedEmployee = await employee.save();
    res.status(201).json({ success: true, data: savedEmployee });
  } catch (error: any) {
    console.error("Error creating employee:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// READ - Get all employees
employeeRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error: any) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// READ - Get employee by ID
employeeRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error: any) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE - Update employee by ID
employeeRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error: any) {
    console.error("Error updating employee:", error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE - Delete employee by ID
employeeRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default employeeRouter;
