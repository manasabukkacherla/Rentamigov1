"use client"

import { useState, useEffect } from "react"
import { BugIcon, Search, Filter, AlertCircle, CheckCircle, Clock, ArrowUpDown, ExternalLink, X } from "lucide-react"

interface BugReport {
  title: string
  description: string
  stepsToReproduce?: string
  email: string
  severity: string
  category: string
  imageUrl?: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: string
}

const BugReports = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([])
  const [filteredReports, setFilteredReports] = useState<BugReport[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null)
  const [sortField, setSortField] = useState<"createdAt" | "severity">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [imageModalOpen, setImageModalOpen] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const storedReports = JSON.parse(localStorage.getItem("bugReports") || "[]")
    setBugReports(storedReports)
    setFilteredReports(storedReports)
  }, [])

  useEffect(() => {
    let result = [...bugReports]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((report) => report.status === statusFilter)
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      result = result.filter((report) => report.severity === severityFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
        const aValue = severityOrder[a.severity as keyof typeof severityOrder] || 0
        const bValue = severityOrder[b.severity as keyof typeof severityOrder] || 0

        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
    })

    setFilteredReports(result)
  }, [bugReports, searchQuery, statusFilter, severityFilter, sortField, sortDirection])

  const handleStatusChange = (report: BugReport, newStatus: "pending" | "in-progress" | "resolved") => {
    const updatedReports = bugReports.map((r) => {
      if (r.title === report.title && r.createdAt === report.createdAt) {
        return { ...r, status: newStatus }
      }
      return r
    })

    setBugReports(updatedReports)
    localStorage.setItem("bugReports", JSON.stringify(updatedReports))

    if (selectedReport && selectedReport.title === report.title && selectedReport.createdAt === report.createdAt) {
      setSelectedReport({ ...selectedReport, status: newStatus })
    }
  }

  const toggleSort = (field: "createdAt" | "severity") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

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
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Bug Reports</h2>
        <div className="text-sm text-gray-500">
          {filteredReports.length} {filteredReports.length === 1 ? "report" : "reports"} found
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search bug reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AlertCircle className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bug Reports List */}
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
              filteredReports.map((report, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedReport(report)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedReport &&
                    selectedReport.title === report.title &&
                    selectedReport.createdAt === report.createdAt
                      ? "bg-gray-50 border-l-4 border-black"
                      : ""
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
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{report.status.replace("-", " ")}</span>
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

        {/* Bug Report Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          {selectedReport ? (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(selectedReport.severity)}`}>
                    {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Reported by: {selectedReport.email} • {formatDate(selectedReport.createdAt)}
                </div>
              </div>

              <div className="p-6 flex-grow overflow-auto">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <div className="text-gray-800 whitespace-pre-wrap">{selectedReport.description}</div>
                </div>

                {selectedReport.stepsToReproduce && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Steps to Reproduce</h4>
                    <div className="text-gray-800 whitespace-pre-wrap">{selectedReport.stepsToReproduce}</div>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                  <div className="text-gray-800 capitalize">{selectedReport.category}</div>
                </div>

                {selectedReport.imageUrl && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Screenshot</h4>
                    <div className="mt-2 border border-gray-200 rounded-md overflow-hidden relative">
                      <img
                        src={selectedReport.imageUrl || "/placeholder.svg"}
                        alt="Bug screenshot"
                        className="max-w-full h-auto cursor-pointer"
                        onClick={() => setImageModalOpen(true)}
                      />
                      <button
                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                        onClick={() => setImageModalOpen(true)}
                      >
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(selectedReport, "pending")}
                    className={`px-3 py-2 text-sm rounded-md flex items-center ${
                      selectedReport.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReport, "in-progress")}
                    className={`px-3 py-2 text-sm rounded-md flex items-center ${
                      selectedReport.status === "in-progress"
                        ? "bg-blue-100 text-blue-800 border border-blue-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReport, "resolved")}
                    className={`px-3 py-2 text-sm rounded-md flex items-center ${
                      selectedReport.status === "resolved"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Resolved
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <BugIcon className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bug report selected</h3>
              <p className="text-gray-500 max-w-md">
                Select a bug report from the list to view its details and manage its status.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {imageModalOpen && selectedReport?.imageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setImageModalOpen(false)}
        >
          <div className="max-w-4xl max-h-screen p-4">
            <img
              src={selectedReport.imageUrl || "/placeholder.svg"}
              alt="Bug screenshot full size"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
              onClick={() => setImageModalOpen(false)}
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BugReports

