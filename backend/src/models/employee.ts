import { Schema, model, models, Document } from 'mongoose';

// Define the interface for Employee document
interface IEmployee extends Document {
  name: string;
  email: string;
  role: 'manager' | 'employee';
  phone: string;
  password: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mongoose schema
const EmployeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    role: {
      type: String,
      enum: ['manager', 'employee'],
      required: [true, 'Role is required'],
      lowercase: true, // Ensure lowercase storage
    },
    phone: {
      type: String,
      match: [/^\+91\d{10}$/, 'Phone number must be in the format +91XXXXXXXXXX'],
      required: [true, 'Phone number is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Check if the model exists, otherwise create a new one
const Employee = models.Employee || model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
