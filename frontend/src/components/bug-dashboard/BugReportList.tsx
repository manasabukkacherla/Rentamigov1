"use client"

import { BugIcon, ArrowUpDown } from "lucide-react"
import type { BugReport, Bugs } from "./BugDashboard"

interface BugReportListProps {
  filteredReports: BugReport[]
  selectedReport: BugReport | null
  setSelectedReport: (report: BugReport) => void
  toggleSort: (field: "createdAt" | "severity") => void
}

const BugReportList = ({ filteredReports, selectedReport, setSelectedReport, toggleSort }: BugReportListProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
      case "in-progress":
        return <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      case "resolved":
        return <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Reports</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleSort("createdAt")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            Date
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </button>
          <button
            onClick={() => toggleSort("severity")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 ml-2"
          >
            Severity
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedReport && selectedReport.id === report.id ? "bg-gray-50 border-l-4 border-black" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 line-clamp-1">{report.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(report.severity)}`}>
                  {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-2 line-clamp-2">{report.description}</div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(report.status)}
                  <span className="capitalize">{report.status.replace("-", " ")}</span>
                </div>
                <span>{formatDate(report.createdAt)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BugIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bug reports</h3>
            <p className="mt-1 text-sm text-gray-500">No bug reports match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BugReportList

