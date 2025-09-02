import React, { useEffect, useState } from "react";
import {
  Building2,
  Home,
  Store,
  DollarSign,
  Clock,
  Phone,
  Calendar,
  ArrowRight,
  User,
  Briefcase,
  Edit2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { DashboardStats, Lead } from "../types";

interface DashboardProps {
  stats: DashboardStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const navigate = useNavigate();

  const LeadStatusBadge: React.FC<{ status: Lead["status"] }> = ({ status }) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const statusClasses = {
      new: "bg-black text-white dark:bg-white dark:text-black",
      contacted: "bg-gray-200 text-black dark:bg-gray-700 dark:text-white",
      "viewing-scheduled":
        "bg-gray-300 text-black dark:bg-gray-600 dark:text-white",
      negotiating: "bg-gray-400 text-white dark:bg-gray-500 dark:text-white",
      converted: "bg-black text-white dark:bg-white dark:text-black",
      lost: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    };

    return (
      <span className={`${baseClasses} ${statusClasses[status]}`}>
        {status
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    );
  };

  const [employee, setEmployee] = useState({
    name: "Loading...",
    role: "Loading...",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = sessionStorage.getItem("user");
      if (!user) {
        console.error("User data not found in session. Please log in again.");
        return;
      }

      try {
        const userData = JSON.parse(user);
        if (!userData || !userData.id) {
          console.error("Invalid user data in session");
          return;
        }

        // Determine which API endpoint to use based on user role
        const apiUrl = userData.role === 'employee' 
          ? `/api/employee/${userData.id}`
          : `/api/user/${userData.id}`;

        try {
          const response = await fetch(apiUrl, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            // Try to get the error message from the response
            const errorText = await response.text();
            console.error("API Error:", errorText);
            return;
          }

          const data = await response.json();
          
          if (data.success) {
            // The backend returns user data in the 'user' property
            const userData = data.user || data.data;
            setEmployee({
              name: userData.name || userData.name || "User",
              role: userData.role || userData.role || "Unknown Role",
              avatar: userData.avatar || userData.avatar ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            });
          } else {
            console.error("API Error:", data);
            // If the response is unsuccessful, use stored user data
            setEmployee({
              name: userData.name || "User",
              role: userData.role || "Unknown Role",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            });
          }
        } catch (error) {
          console.error("❌ Error fetching user details:", error);
          // If any error occurs, use stored user data as fallback
          setEmployee({
            name: userData.name || "User",
            role: userData.role || "Unknown Role",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);

  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting = "Good Morning";
  if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17) {
    greeting = "Good Evening";
  }

  const maxValue = Math.max(
    ...stats.revenueHistory.flatMap((item) => [
      item.rental,
      item.maintenance,
      item.deposits,
    ])
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const barWidth = 20; // Width of each bar in the group
  const barGap = 2; // Gap between bars in a group
  const groupGap = 10; // Gap between groups
  const totalBarsInGroup = 3; // Number of bars in each group (rental, maintenance, deposits)
  const groupWidth =
    barWidth * totalBarsInGroup + barGap * (totalBarsInGroup - 1);
  const chartWidth = 100; // SVG viewBox width

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center space-x-4">
          <img
            src={employee.avatar}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-black dark:border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-light text-black dark:text-white">
              {greeting}, {employee.name}
            </h2>
            <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{employee.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <h2 className="text-3xl font-light mb-8 text-black dark:text-white tracking-tight">
        Property Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Building2,
            label: "Total Properties",
            value: stats.totalProperties,
          },
          {
            icon: Home,
            label: "Active Properties",
            value: stats.activeProperties,
          },
          {
            icon: Store,
            label: "Rented Properties",
            value: stats.rentedProperties,
          },
          {
            icon: DollarSign,
            label: "Monthly Revenue",
            value: `$${stats.monthlyRevenue.toLocaleString()}`,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-white dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
              <Icon className="w-8 h-8 text-black dark:text-white opacity-75" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {label}
                </p>
                <p className="text-2xl font-semibold text-black dark:text-white mt-1">
                  {value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Property Distribution */}
        <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-medium mb-6 text-black dark:text-white">
            Property Distribution
          </h3>
          <div className="space-y-6">
            {stats.propertyTypes.map((type, index) => (
              <div key={type.type} className="relative">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-sm font-medium text-black dark:text-white">
                    {type.type}
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {type.count}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${(type.count / stats.totalProperties) * 100}%`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                    className="h-full rounded-full transition-all duration-1000 ease-out animate-slide-in bg-black dark:bg-white"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Revenue Trends
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black dark:bg-white rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Rental
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Maintenance
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Deposits
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-80">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-600 dark:text-gray-400">
              {[
                maxValue,
                maxValue * 0.75,
                maxValue * 0.5,
                maxValue * 0.25,
                0,
              ].map((value) => (
                <span
                  key={value}
                  className="transform -translate-y-1/2 w-16 text-right pr-4"
                >
                  {formatCurrency(value)}
                </span>
              ))}
            </div>

            {/* Chart area */}
            <div className="ml-20 h-full relative pb-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border-t border-gray-100 dark:border-gray-800 w-full"
                  ></div>
                ))}
              </div>

              {/* SVG for bar chart */}
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {stats.revenueHistory.map((item, groupIndex) => {
                  const groupX =
                    groupIndex * (groupWidth + groupGap) +
                    (chartWidth -
                      stats.revenueHistory.length * (groupWidth + groupGap)) /
                      2;
                  return (
                    <g key={groupIndex}>
                      {/* Rental bar */}
                      <rect
                        x={groupX}
                        y={100 - (item.rental / maxValue) * 100}
                        width={barWidth}
                        height={(item.rental / maxValue) * 100}
                        className="fill-black dark:fill-white"
                      />
                      {/* Maintenance bar */}
                      <rect
                        x={groupX + barWidth + barGap}
                        y={100 - (item.maintenance / maxValue) * 100}
                        width={barWidth}
                        height={(item.maintenance / maxValue) * 100}
                        className="fill-gray-600 dark:fill-gray-400"
                      />
                      {/* Deposits bar */}
                      <rect
                        x={groupX + (barWidth + barGap) * 2}
                        y={100 - (item.deposits / maxValue) * 100}
                        width={barWidth}
                        height={(item.deposits / maxValue) * 100}
                        className="fill-gray-400 dark:fill-gray-600"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                {stats.revenueHistory.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {item.month}
                    </div>
                    <div className="text-xs font-medium text-black dark:text-white mt-1">
                      {formatCurrency(
                        item.rental + item.maintenance + item.deposits
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white dark:bg-black p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Active Leads
            </h3>
            <button className="btn btn-secondary flex items-center space-x-2">
              <span>View All Leads</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Property
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {stats.leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-sm font-medium text-black dark:text-white">
                          {lead.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {lead.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-black dark:text-white">
                        {lead.propertyInterest}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <LeadStatusBadge status={lead.status} />
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-sm font-medium ${
                          lead.priority === "high"
                            ? "text-black dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {lead.priority.charAt(0).toUpperCase() +
                          lead.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                          <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          onClick={() => navigate(`/enquiryput/${lead.id}`)}
                        >
                          <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;