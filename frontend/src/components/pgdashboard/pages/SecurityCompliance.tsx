import React from 'react';
import { Shield, Camera, Bell, FileCheck } from 'lucide-react';

const SecurityCompliance: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Security & Compliance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Overall Security Score</h2>
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">92%</p>
          <p className="text-sm text-gray-500 mt-2">Compliance rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">CCTV Coverage</h2>
            <Camera className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">100%</p>
          <p className="text-sm text-gray-500 mt-2">All areas covered</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Emergency Response</h2>
            <Bell className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">less than 5min</p>
          <p className="text-sm text-gray-500 mt-2">Average response time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Security Features Status</h2>
          <div className="space-y-4">
            {[
              { feature: "CCTV Surveillance", status: "Active", color: "bg-green-100 text-green-800" },
              { feature: "Biometric Access", status: "Active", color: "bg-green-100 text-green-800" },
              { feature: "Fire Alarm System", status: "Active", color: "bg-green-100 text-green-800" },
              { feature: "Emergency Exits", status: "Review Needed", color: "bg-yellow-100 text-yellow-800" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="font-medium text-gray-700">{item.feature}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Compliance Checklist</h2>
          <div className="space-y-4">
            {[
              { item: "Fire Safety Certificate", status: "Valid", expiry: "2024-12-31" },
              { item: "Health & Safety Inspection", status: "Valid", expiry: "2024-09-30" },
              { item: "Insurance Coverage", status: "Valid", expiry: "2024-12-31" },
              { item: "Staff Background Verification", status: "Pending", expiry: "N/A" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center">
                  <FileCheck className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">{item.item}</p>
                    <p className="text-sm text-gray-500">Expires: {item.expiry}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'Valid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Security Incidents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">PG Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Incident Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2024-03-10",
                  pg: "Sunshine PG",
                  type: "Fire Alarm Test",
                  status: "Resolved",
                  action: "Scheduled Maintenance"
                },
                {
                  date: "2024-03-09",
                  pg: "Green Valley",
                  type: "Unauthorized Access",
                  status: "Resolved",
                  action: "Security Protocol Updated"
                },
                {
                  date: "2024-03-08",
                  pg: "City Living",
                  type: "CCTV Malfunction",
                  status: "In Progress",
                  action: "Technician Assigned"
                }
              ].map((incident, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{incident.date}</td>
                  <td className="py-3 px-4">{incident.pg}</td>
                  <td className="py-3 px-4">{incident.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      incident.status === 'Resolved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{incident.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityCompliance;