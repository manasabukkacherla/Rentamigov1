import React from 'react';
import { Users, BedDouble, ArrowUpRight } from 'lucide-react';

const OccupancyAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Occupancy Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Overall Occupancy</h2>
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">85%</p>
          <p className="text-sm text-gray-500 mt-2">Current occupancy rate</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Available Beds</h2>
            <BedDouble className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">45</p>
          <p className="text-sm text-gray-500 mt-2">Across all PGs</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Monthly Growth</h2>
            <ArrowUpRight className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">+5.2%</p>
          <p className="text-sm text-gray-500 mt-2">vs last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Room Type Distribution</h2>
          <div className="space-y-4">
            {[
              { type: "Single AC", percentage: 30, color: "bg-blue-500" },
              { type: "Single Non-AC", percentage: 20, color: "bg-green-500" },
              { type: "Double AC", percentage: 35, color: "bg-purple-500" },
              { type: "Double Non-AC", percentage: 15, color: "bg-yellow-500" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
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
          <h2 className="text-lg font-medium text-gray-800 mb-4">Occupancy Trends</h2>
          <div className="space-y-4">
            {[
              { month: "January", occupancy: 82 },
              { month: "February", occupancy: 84 },
              { month: "March", occupancy: 85 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <span className="font-medium text-gray-700">{item.month}</span>
                <div className="flex items-center">
                  <span className="text-gray-600">{item.occupancy}%</span>
                  <Users className="h-4 w-4 text-blue-500 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">PG-wise Occupancy</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">PG Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Beds</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Occupied</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Available</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Occupancy Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Sunshine PG",
                  total: 50,
                  occupied: 45,
                  available: 5,
                  rate: "90%"
                },
                {
                  name: "Green Valley",
                  total: 40,
                  occupied: 32,
                  available: 8,
                  rate: "80%"
                },
                {
                  name: "City Living",
                  total: 60,
                  occupied: 54,
                  available: 6,
                  rate: "90%"
                }
              ].map((pg, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{pg.name}</td>
                  <td className="py-3 px-4">{pg.total}</td>
                  <td className="py-3 px-4">{pg.occupied}</td>
                  <td className="py-3 px-4">{pg.available}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: pg.rate }}
                        ></div>
                      </div>
                      <span>{pg.rate}</span>
                    </div>
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

export default OccupancyAnalysis;