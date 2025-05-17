import React, { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import axios from "axios";

interface Employee {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phone: string;
}

const FindEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleStartChat = (employee: Employee) => {
    // Navigate to chat interface with the selected employee
    window.location.href = `/chat/${employee._id}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {employee.firstname} {employee.lastname}
                </h3>
                <p className="text-gray-600 capitalize mt-1">{employee.role}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Email:</span> {employee.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Phone:</span> {employee.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleStartChat(employee)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindEmployee;
