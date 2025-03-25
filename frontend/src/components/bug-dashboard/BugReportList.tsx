"use client"

import { BugIcon, ArrowUpDown } from "lucide-react"
import type { BugReport } from "./BugDashboard"

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

  filteredReports =  [
    {
      id: "1",
      title: "Login page crash",
      description: "The login page crashes when the user enters incorrect credentials multiple times.",
      stepsToReproduce: "1. Open the login page.\n2. Enter incorrect credentials.\n3. Repeat 3 times.\n4. Observe the crash.",
      email: "user1@example.com",
      severity: "High",
      category: "UI/UX",
      imageUrl: "https://example.com/crash-screenshot.png",
      status: "pending",
      createdAt: "2025-03-20T10:15:00Z",
      updatedAt: "2025-03-21T08:45:00Z",
      assignedTo: "developer1",
      comments: [
        {
          author: "developer1",
          text: "Looking into this issue.",
          timestamp: "2025-03-21T09:00:00Z"
        },
        {
          author: "user1",
          text: "Thank you for checking.",
          timestamp: "2025-03-21T09:15:00Z"
        }
      ]
    },
    {
      id: "2",
      title: "Profile picture not uploading",
      description: "Users are unable to upload profile pictures due to a server-side error.",
      stepsToReproduce: "1. Go to profile settings.\n2. Attempt to upload a profile picture.\n3. Observe the error message.",
      email: "user2@example.com",
      severity: "Medium",
      category: "Backend",
      imageUrl: "https://example.com/upload-error.png",
      status: "in-progress",
      createdAt: "2025-03-19T14:30:00Z",
      updatedAt: "2025-03-21T10:20:00Z",
      assignedTo: "developer2",
      comments: [
        {
          author: "developer2",
          text: "Identified the issue with the file size limit.",
          timestamp: "2025-03-21T10:30:00Z"
        }
      ]
    }
  ];

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">Reports</h3>
        <button
          onClick={() => toggleSort("createdAt")}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          Date
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </button>
      </div>

      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
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

