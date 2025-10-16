import React from 'react';
import { Sparkles, Chrome as Broom, Bug } from 'lucide-react';

const HygieneAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Hygiene Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Average Hygiene Score</h2>
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">4.2/5</p>
          <p className="text-sm text-gray-500 mt-2">Based on last month's inspections</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Cleaning Frequency</h2>
            <Broom className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-500 mt-2">PGs with daily cleaning</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Pest Control Status</h2>
            <Bug className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">92%</p>
          <p className="text-sm text-gray-500 mt-2">PGs with up-to-date pest control</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Hygiene Score Distribution</h2>
        <div className="space-y-4">
          {[
            { score: "5 Stars", percentage: 35, color: "bg-green-500" },
            { score: "4 Stars", percentage: 45, color: "bg-blue-500" },
            { score: "3 Stars", percentage: 15, color: "bg-yellow-500" },
            { score: "2 Stars", percentage: 4, color: "bg-orange-500" },
            { score: "1 Star", percentage: 1, color: "bg-red-500" }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.score}</span>
                <span className="text-sm font-medium text-gray-700">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${item.color} h-2.5 rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Hygiene Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">PG Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Inspection</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Sunshine PG",
                  date: "2024-03-10",
                  score: "4.8",
                  status: "Excellent"
                },
                {
                  name: "Green Valley",
                  date: "2024-03-09",
                  score: "4.2",
                  status: "Good"
                },
                {
                  name: "City Living",
                  date: "2024-03-08",
                  score: "3.9",
                  status: "Needs Improvement"
                }
              ].map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{report.name}</td>
                  <td className="py-3 px-4">{report.date}</td>
                  <td className="py-3 px-4">{report.score}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'Excellent'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'Good'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HygieneAnalysis;