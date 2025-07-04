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
  const [statuses, setStatuses] = useState<Record<string, string>>({});

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

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get("/api/conversation/employee-status");
        const map: Record<string, string> = {};
        response.data.forEach((entry: { employeeId: string; status: string }) => {
          map[entry.employeeId] = entry.status;
        });
        setStatuses(map);
      } catch {
        console.warn("Could not fetch employee statuses.");
      }
    };

    fetchStatuses();

    const interval = setInterval(fetchStatuses, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const handleStartChat = (employee: Employee) => {
    window.location.href = `/chat/${employee._id}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 border-b pb-4 border-gray-200">Meet Our Support Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="relative bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-6 flex flex-col justify-between"
          >
            {/* Top-right Status Badge */}
            <span
              className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                statuses[employee._id] === "active"
                  ? "bg-yellow-100 text-yellow-800"
                  : statuses[employee._id] === "pending"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {statuses[employee._id] === "active"
                ? "Busy"
                : statuses[employee._id] === "pending"
                ? "Pending"
                : "Free"}
            </span>

            <div>
              <h3 className="text-xl font-semibold mb-1">
                {employee.firstname} {employee.lastname}
              </h3>
              <p className="text-sm text-gray-600 capitalize mb-4">{employee.role}</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium text-gray-900">Email:</span> {employee.email}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Phone:</span> {employee.phone}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleStartChat(employee)}
              className="mt-6 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Chat</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindEmployee;