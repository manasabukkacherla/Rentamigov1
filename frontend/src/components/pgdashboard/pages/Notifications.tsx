import React from 'react';
import { Bell, Building2, Users, IndianRupee, Calendar, Shield } from 'lucide-react';

const Notifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
            Mark All as Read
          </button>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg">
            <option>All Notifications</option>
            <option>Unread</option>
            <option>Leads</option>
            <option>Payments</option>
            <option>System</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">All Notifications</h3>
              <p className="text-2xl font-semibold mt-1">48</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Unread</h3>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Today</h3>
              <p className="text-2xl font-semibold mt-1">8</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">This Week</h3>
              <p className="text-2xl font-semibold mt-1">32</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {[
            {
              icon: Users,
              color: "text-blue-500",
              bg: "bg-blue-100",
              title: "New Lead: John Doe interested in Sunshine PG",
              time: "2 minutes ago",
              type: "lead"
            },
            {
              icon: IndianRupee,
              color: "text-green-500",
              bg: "bg-green-100",
              title: "Payment Received: ₹12,000 from Room 204",
              time: "1 hour ago",
              type: "payment"
            },
            {
              icon: Building2,
              color: "text-purple-500",
              bg: "bg-purple-100",
              title: "New PG Listed: Green Valley PG in HSR Layout",
              time: "2 hours ago",
              type: "system"
            },
            {
              icon: Calendar,
              color: "text-orange-500",
              bg: "bg-orange-100",
              title: "Tenant Contract Expiring: Room 302 in 7 days",
              time: "3 hours ago",
              type: "alert"
            },
            {
              icon: Shield,
              color: "text-red-500",
              bg: "bg-red-100",
              title: "Security Alert: Unauthorized access attempt",
              time: "5 hours ago",
              type: "security"
            }
          ].map((notification, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`${notification.bg} p-2 rounded-full`}>
                  <notification.icon className={`h-5 w-5 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      notification.type === 'lead' ? 'bg-blue-50 text-blue-700' :
                      notification.type === 'payment' ? 'bg-green-50 text-green-700' :
                      notification.type === 'system' ? 'bg-purple-50 text-purple-700' :
                      notification.type === 'alert' ? 'bg-orange-50 text-orange-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button className="w-full py-2 text-center text-sm text-gray-600 hover:text-gray-900">
            Load More Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;