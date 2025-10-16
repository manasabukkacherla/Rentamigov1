import React from 'react';
import { Building2, Users, ArrowUpRight, Download, Bell, Plus, IndianRupee } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome back, User! 👋</h1>
          <p className="text-gray-600 mt-1">Your Role: PG Owner</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Show Random Notification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-4">
            <Plus className="h-5 w-5" />
            <span className="font-medium">Add New PG</span>
          </div>
          <ArrowUpRight className="h-5 w-5" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-4">
            <Download className="h-5 w-5" />
            <span className="font-medium">Export Tenant Data</span>
          </div>
          <ArrowUpRight className="h-5 w-5" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5" />
            <span className="font-medium">View Notifications</span>
          </div>
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total PGs</h3>
              <p className="text-2xl font-semibold mt-1">24</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </div>
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Total Tenants</h3>
              <p className="text-2xl font-semibold mt-1">156</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
            </div>
            <Users className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Vacant Rooms</h3>
              <p className="text-2xl font-semibold mt-1">8</p>
              <p className="text-xs text-gray-600 mt-1">Across all PGs</p>
            </div>
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-600">Monthly Revenue</h3>
              <p className="text-2xl font-semibold mt-1">₹2.4L</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% from last month</p>
            </div>
            <IndianRupee className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                title: 'New PG listed: Sunshine PG in Koramangala',
                time: '2 hours ago',
                icon: Building2
              },
              {
                title: 'New tenant inquiry for Green Valley PG',
                time: '3 hours ago',
                icon: Users
              },
              {
                title: 'Room booking confirmed at City Living PG',
                time: '5 hours ago',
                icon: Building2
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="bg-gray-100 p-2 rounded-full">
                  <activity.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Occupancy Overview</h2>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeDasharray="75, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm text-gray-500">Occupancy</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold">8</p>
              <p className="text-sm text-gray-600">Vacant Rooms</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold">156</p>
              <p className="text-sm text-gray-600">Total Rooms</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold">42</p>
              <p className="text-sm text-gray-600">New Inquiries</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold">28</p>
              <p className="text-sm text-gray-600">Move-ins This Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;