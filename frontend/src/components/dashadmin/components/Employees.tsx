import React, { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Plus,
  Edit,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import { showToast } from "./Toast";

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  status: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      role: "Property Manager",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
      password: "",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Sales Executive",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      status: "active",
      password: "",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Customer Support",
      email: "michael.b@example.com",
      phone: "+1 (555) 345-6789",
      status: "inactive",
      password: "",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: "",
    role: "",
    email: "",
    phone: "",
    password: "",
    status: "active",
  });

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      role: "",
      email: "",
      phone: "",
      password: "",
      status: "active",
    });
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    if (!employee.id) {
      console.error("❌ Employee ID is missing:", employee); // ✅ Debugging log
      showToast.error("Error: Employee ID is missing.");
      return;
    }

    console.log("✏️ Editing Employee ID:", employee.id); // ✅ Log ID to debug

    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      role: employee.role || "", // Ensure role is set
      email: employee.email,
      phone: employee.phone,
      password: "", // Keep empty to avoid overwriting
      status: employee.status,
    });
    setShowForm(true);
  };

  const handleEditSubmit = async () => {
    if (!editingEmployee || !editingEmployee.id) {
      console.error(
        "❌ Error: Employee ID is missing. Cannot send PUT request."
      );
      showToast.error("Error: Employee ID is missing.");
      return;
    }

    console.log("🔄 Updating Employee ID:", editingEmployee.id); // ✅ Log ID before sending API request

    const updatedFields: Partial<{
      name: string;
      phone: string;
      role: string;
      status: string;
    }> = {};

    if (formData.name !== editingEmployee.name)
      updatedFields.name = formData.name.trim();
    if (formData.phone !== editingEmployee.phone)
      updatedFields.phone = formData.phone.trim();
    if (formData.role !== editingEmployee.role)
      updatedFields.role = formData.role.toLowerCase();
    if (formData.status !== editingEmployee.status)
      updatedFields.status = formData.status.toLowerCase();

    if (Object.keys(updatedFields).length === 0) {
      showToast.info("No changes detected.");
      return;
    }

    console.log("🔄 PUT Request to:", `/api/employees/${editingEmployee.id}`);
    console.log("🔄 Payload Data:", updatedFields);

    try {
      const response = await fetch(`/api/employees/${editingEmployee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await response.json();
      console.log("🔄 Server Response:", data); // ✅ Log response from server

      if (data.success) {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editingEmployee.id ? { ...emp, ...updatedFields } : emp
          )
        );
        setShowForm(false);
        showToast.success("Employee updated successfully");
      } else {
        showToast.error(data.message || "Error updating employee");
      }
    } catch (error) {
      console.error("❌ Error updating employee:", error);
      showToast.error("Failed to update employee. Please try again.");
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!id) {
      console.error("❌ Error: Employee ID is missing.");
      showToast.error("Error: Employee ID is missing.");
      return;
    }

    console.log("🗑 Deleting Employee ID:", id); // ✅ Debugging log

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("🗑 Server Response:", data); // ✅ Debugging log

      if (data.success) {
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        showToast.success("Employee deleted successfully");
      } else {
        showToast.error(data.message || "Error deleting employee");
      }
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
      showToast.error("Failed to delete employee. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];

    // Check if each required field is present
    if (!formData.name) missingFields.push("Name");
    if (!formData.email) missingFields.push("Email");
    if (!formData.role) missingFields.push("Role");
    if (!formData.phone) missingFields.push("Phone");
    if (!formData.password) missingFields.push("Password");
    if (!formData.status) missingFields.push("Status");

    if (missingFields.length > 0) {
      showToast.error(`Missing fields: ${missingFields.join(", ")}`);
      return;
    }

    // Ensure fields are properly formatted
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role.toLowerCase(), // Ensure lowercase
      phone: formData.phone.trim(),
      password: formData.password.trim(),
      status: formData.status.toLowerCase(), // Ensure lowercase
    };

    console.log("Submitting Payload:", payload); // Debugging log

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setEmployees([...employees, { ...payload, id: data.data.id }]);
        setShowForm(false);
        showToast.success("Employee added successfully");
      } else {
        showToast.error(data.message || "Error adding employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      showToast.error("Failed to add employee. Please try again.");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();

        if (data.success) {
          console.log("✅ Fetched Employees:", data.data); // ✅ Debugging log

          const formattedEmployees = data.data.map((employee: any) => ({
            id: employee._id, // ✅ Convert `_id` from MongoDB to `id` in frontend
            name: employee.name,
            email: employee.email,
            role: employee.role,
            phone: employee.phone,
            status: employee.status,
          }));

          setEmployees(formattedEmployees);
        } else {
          showToast.error("Error fetching employees");
        }
      } catch (error) {
        console.error("❌ Error:", error);
        showToast.error("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="space-y-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
        <button
          onClick={handleAddEmployee}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Total Employees
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Active</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {employees.filter((emp) => emp.status === "active").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Inactive</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {employees.filter((emp) => emp.status === "inactive").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">
                          {employee.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{employee.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-500">
                      <Phone className="w-4 h-4 mr-1" />
                      {employee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="p-2 text-gray-600 hover:text-blue-600 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="relative">
                    <select
                      value={formData.role || ""} // Ensure default value is set
                      onChange={(e) => {
                        const selectedRole = e.target.value.toLowerCase(); // Convert to lowercase
                        console.log("Selected Role:", selectedRole); // Debugging log
                        setFormData((prev) => ({
                          ...prev,
                          role: selectedRole, // Ensure state updates
                        }));
                      }}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 appearance-none bg-white"
                    >
                      <option value="">Select Role</option>{" "}
                      {/* Ensure default option */}
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-[calc(50%+4px)] transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status || "active"} // Default value
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value.toLowerCase(),
                        }))
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 appearance-none bg-white"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-[calc(50%+4px)] transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingEmployee ? handleEditSubmit : handleSubmit} // Call correct function
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {editingEmployee ? "Save Changes" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
