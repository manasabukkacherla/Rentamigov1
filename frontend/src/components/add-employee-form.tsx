import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

interface EmployeeFormData {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
}

interface AddEmployeeFormProps {
  onClose: () => void;
  onSubmit: (employee: EmployeeFormData) => void;
}
export default function AddEmployeeForm({
  onClose,
  onSubmit,
}: AddEmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstname: "",
    lastname: "",
    email: "",
    role: "employee",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmployeeFormData> = {};

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+91\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be in the format +91XXXXXXXXXX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        // First request: Add employee
        const employeeResponse = await axios.post(
          "https://api.rentamigo.in//api/employees",
          {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            role: formData.role,
            phone: formData.phone,
          }
        );

        // Send welcome email regardless of employee response success
        const emailResponse = await axios.post(
          "https://api.rentamigo.in//api/email/send-email",
          {
            content: "rentamigo.in",
            toEmailAddress: formData.email,
            subject: `Welcome to PropAmigo - ${formData.firstname} ${formData.lastname}`,
          }
        );

        // Check both responses
        if (employeeResponse.data.success && emailResponse.data.success) {
          onSubmit(employeeResponse.data.data);
          alert("User added and welcome email sent successfully");
        } else {
          throw new Error("Failed to add employee or send email");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Submission error:", error.response?.data.message);
        alert("Error occurred while adding employee or sending email");
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.firstname && (
              <p className="mt-1 text-sm text-red-600">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.lastname && (
              <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91XXXXXXXXXX"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
