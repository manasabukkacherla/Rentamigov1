import { Schema, model, models, Document } from 'mongoose';

// Define the interface for Employee document
interface IEmployee extends Document {
  firstname: string;
  lastname: string;
  email: string;
  role: 'manager' | 'employee';
  phone: string;
  password: string;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    firstname: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    role: {
      type: String,
      enum: ['manager', 'employee'],
      required: [true, 'Role is required'],
    },
    phone: {
      type: String,
      match: [/^\+91\d{10}$/, 'Phone number must be in the format +91XXXXXXXXXX'],
      required: [true, 'Phone number is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  }
);

// Check if the model exists, if not create a new one
const Employee = models.Employee || model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
