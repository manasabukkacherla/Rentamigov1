"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { BugReport, Bugs } from "./BugDashboard"

interface BugReportStatsProps {
  bugReports: Bugs[]
}

const BugReportStats = ({ bugReports }: BugReportStatsProps) => {
  const [timeRange, setTimeRange] = useState("all")

  // Filter reports based on time range
  const getFilteredReports = () => {
    if (timeRange === "all") return bugReports

    const now = new Date()
    const cutoffDate = new Date()

    switch (timeRange) {
      case "week":
        cutoffDate.setDate(now.getDate() - 7)
        break
      case "month":
        cutoffDate.setMonth(now.getMonth() - 1)
        break
      case "quarter":
        cutoffDate.setMonth(now.getMonth() - 3)
        break
      default:
        return bugReports
    }

    return bugReports.filter((report) => new Date(report.createdAt) >= cutoffDate)
  }

  const filteredReports = getFilteredReports()

  // Status distribution data
  const statusData = [
    { name: "Pending", value: filteredReports.filter((r) => r.status === "pending").length },
    { name: "In Progress", value: filteredReports.filter((r) => r.status === "in-progress").length },
    { name: "Resolved", value: filteredReports.filter((r) => r.status === "resolved").length },
  ]

  // Severity distribution data
  // const severityData = [
  //   { name: "Critical", value: filteredReports.filter((r) => r.severity === "critical").length },
  //   { name: "High", value: filteredReports.filter((r) => r.severity === "high").length },
  //   { name: "Medium", value: filteredReports.filter((r) => r.severity === "medium").length },
  //   { name: "Low", value: filteredReports.filter((r) => r.severity === "low").length },
  // ]

  const errorCodeData = [
    { name: "ERR123", value: filteredReports.filter((r) => r.errorcode === "ERR123").length },
    { name: "ERR124", value: filteredReports.filter((r) => r.errorcode === "ERR124").length },
    { name: "ERR125", value: filteredReports.filter((r) => r.errorcode === "ERR125").length },
    { name: "ERR126", value: filteredReports.filter((r) => r.errorcode === "ERR126").length },
  ]

  // Category distribution data
  const categoryData = () => {
    const categories: Record<string, number> = {};
  
    filteredReports.forEach((report) => {
      const category = report.category || "Uncategorized"; // Default to "Uncategorized" if category is undefined or missing
      categories[category] = (categories[category] || 0) + 1;
    });
  
    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize the first letter
      value,
    }));
  };
  

  // Reports over time data
  const reportsOverTimeData = () => {
    const dateMap: Record<string, number> = {}

    // Sort reports by date
    const sortedReports = [...filteredReports].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )

    // Group by date
    sortedReports.forEach((report) => {
      const date = new Date(report.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })

      dateMap[date] = (dateMap[date] || 0) + 1
    })

    // Convert to array for chart
    return Object.entries(dateMap).map(([date, count]) => ({
      date,
      count,
    }))
  }

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
  const STATUS_COLORS = {
    Pending: "#FFBB28",
    "In Progress": "#0088FE",
    Resolved: "#00C49F",
  }
  const ERROR_COLORS = {
    ERR123: "#FF0000",
    ERR124: "#FF8042",
    ERR125: "#FFBB28",
    ERR126: "#00C49F",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-xl font-bold text-gray-900">Bug Report Statistics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="all">All Time</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{filteredReports.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-700">Pending</p>
              <p className="text-2xl font-bold text-yellow-800">
                {filteredReports.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">In Progress</p>
              <p className="text-2xl font-bold text-blue-800">
                {filteredReports.filter((r) => r.status === "in-progress").length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">Resolved</p>
              <p className="text-2xl font-bold text-green-800">
                {filteredReports.filter((r) => r.status === "resolved").length}
              </p>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Code Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorCodeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {errorCodeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ERROR_COLORS[entry.name as keyof typeof ERROR_COLORS] || COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData()} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports Over Time */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportsOverTimeData()} margin={{ top: 5, right: 30, left: 20, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} interval={0} tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BugReportStats

