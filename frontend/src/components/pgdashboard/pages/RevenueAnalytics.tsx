import React from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, Wallet } from 'lucide-react';

const RevenueAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Revenue Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Total Revenue</h2>
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">₹15.2L</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Revenue Growth</h2>
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">+12.5%</p>
          <p className="text-sm text-gray-500 mt-2">vs last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Average Revenue/PG</h2>
            <Wallet className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">₹63.3K</p>
          <p className="text-sm text-gray-500 mt-2">Per PG this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Revenue by Room Type</h2>
          <div className="space-y-4">
            {[
              { type: "Single AC", revenue: "₹5.2L", percentage: 35, color: "bg-blue-500" },
              { type: "Double AC", revenue: "₹4.8L", percentage: 30, color: "bg-green-500" },
              { type: "Single Non-AC", revenue: "₹3.1L", percentage: 20, color: "bg-yellow-500" },
              { type: "Double Non-AC", revenue: "₹2.1L", percentage: 15, color: "bg-purple-500" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <span className="text-sm font-medium text-gray-700">{item.revenue}</span>
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
          <h2 className="text-lg font-medium text-gray-800 mb-4">Monthly Revenue Trend</h2>
          <div className="space-y-4">
            {[
              { month: "January", revenue: "₹13.8L", growth: "+5%" },
              { month: "February", revenue: "₹14.5L", growth: "+8%" },
              { month: "March", revenue: "₹15.2L", growth: "+12%" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <span className="font-medium text-gray-700">{item.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{item.revenue}</span>
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {item.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">PG-wise Revenue</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">PG Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Occupancy Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Revenue/Bed</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Sunshine PG",
                  revenue: "₹5.8L",
                  occupancy: "95%",
                  revenuePerBed: "₹12.5K",
                  growth: "+15%"
                },
                {
                  name: "Green Valley",
                  revenue: "₹4.2L",
                  occupancy: "88%",
                  revenuePerBed: "₹11.8K",
                  growth: "+10%"
                },
                {
                  name: "City Living",
                  revenue: "₹5.2L",
                  occupancy: "92%",
                  revenuePerBed: "₹13.2K",
                  growth: "+12%"
                }
              ].map((pg, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{pg.name}</td>
                  <td className="py-3 px-4">{pg.revenue}</td>
                  <td className="py-3 px-4">{pg.occupancy}</td>
                  <td className="py-3 px-4">{pg.revenuePerBed}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 flex items-center">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      {pg.growth}
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

export default RevenueAnalytics;