import express, { Request, Response } from 'express';
import Employee from '../models/employee';
import bcrypt from 'bcrypt';
import transporter from "../utils/emailservice";

const Employeerouter = express.Router();

// ✅ Utility function to validate email format (name@rentamigo.in)
const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@rentamigo\.in$/;
  return emailRegex.test(email);
};

/**
 * 🔹 POST: Create a new Employee
 */
Employeerouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, role, phone, password, status } = req.body;

    // ✅ Step 1: Validate required fields
    if (!name || !email || !role || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // ✅ Step 2: Validate email format (Allow any domain)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // ✅ Step 3: Check if email or phone already exists
    const existingEmployee = await Employee.findOne({ $or: [{ email }, { phone }] });
    if (existingEmployee) {
      return res.status(400).json({ success: false, message: 'Email or phone already in use' });
    }

    // ✅ Step 4: Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 5: Create new employee record
    const newEmployee = new Employee({
      name,
      email: email.toLowerCase(),
      role: role.toLowerCase(),
      phone,
      password: hashedPassword,
      status: status || 'active', // Default to active
    });

    const savedEmployee = await newEmployee.save();
    console.log('✅ New Employee Created:', savedEmployee);

    // ✅ Step 6: Send Welcome Email (Do NOT fail API if email fails)
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to: email, // ✅ Send to any email address
        subject: 'Welcome to Rentamigo!',
        html: `
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created on <strong>Rentamigo</strong>.</p>
          <ul>
            <li><strong>Role:</strong> ${role}</li>
            <li><strong>Status:</strong> ${status}</li>
          </ul>
          <p>You can now log in using the email <strong>${email}</strong>.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Rentamigo Team</strong></p>
        `,
      };

      console.log('➡️ Sending Welcome Email to:', email);

      const result = await transporter.sendMail(mailOptions);

      console.log('✅ Employee Email Sent:', result);
    } catch (error) {
      console.error('❌ Error Sending Employee Email:', error);
      // Continue even if email sending fails
    }

    // ✅ Step 7: Return Success Response
    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: savedEmployee,
    });
  } catch (error: any) {
    console.error('❌ Error creating employee:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
});







/**
 * 🔹 GET: Fetch all employees
 */
Employeerouter.get('/', async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find().select('-password'); // Exclude password from response
    res.status(200).json({ success: true, data: employees });
  } catch (error: any) {
    console.error('❌ Error fetching employees:', error);
    res.status(500).json({ success: false, message: 'Error fetching employees' });
  }
});

/**
 * 🔹 GET: Fetch an Employee by ID
 */
Employeerouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
    }

    const employee = await Employee.findById(id).select('-password'); // Exclude password
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, data: employee });
  } catch (error: any) {
    console.error('❌ Error fetching employee:', error);
    res.status(500).json({ success: false, message: 'Error fetching employee' });
  }
});

/**
 * 🔹 PUT: Update an Employee (Name, Phone, Role, Status)
 */
Employeerouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, role, status } = req.body;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
    }

    const updateData: Partial<{ name: string; phone: string; role: string; status: string }> = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (role) updateData.role = role.toLowerCase();
    if (status) updateData.status = status;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, message: 'Employee updated successfully', data: updatedEmployee });
  } catch (error: any) {
    console.error('❌ Error updating employee:', error);
    res.status(500).json({ success: false, message: 'Error updating employee' });
  }
});

/**
 * 🔹 DELETE: Remove an Employee
 */
Employeerouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: 'Invalid employee ID format' });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (error: any) {
    console.error('❌ Error deleting employee:', error);
    res.status(500).json({ success: false, message: 'Error deleting employee' });
  }
});

export default Employeerouter;
