"use client"

import { useState, useEffect } from "react"
import { BugIcon, X, BarChart2, ChevronLeft, Download, RefreshCw } from "lucide-react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import BugReportFilters from "./BugReportFilters"
import BugReportDetails from "./BugReportDetails"
import BugReportList from "./BugReportList"
import BugReportStats from "./BugReportStats"

export interface BugReport {
  id?: string
  title: string
  description: string
  stepsToReproduce?: string
  email: string
  severity: string
  category: string
  imageUrl?: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: string
  updatedAt?: string
  assignedTo?: string
  comments?: Array<{
    author: string
    text: string
    timestamp: string
  }>
}

const BugDashboard = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([])
  const [filteredReports, setFilteredReports] = useState<BugReport[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<{ start?: string; end?: string }>({})
  const [selectedReport, setSelectedReport] = useState<BugReport | null>(null)
  const [sortField, setSortField] = useState<"createdAt" | "severity">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "stats">("list")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchBugReports()
  }, [])

  const fetchBugReports = () => {
    setIsRefreshing(true)

    // In a real application, you would fetch this data from your backend
    setTimeout(() => {
      try {
        const storedReports = JSON.parse(localStorage.getItem("bugReports") || "[]")

        // Add unique IDs if they don't exist
        const reportsWithIds = storedReports.map((report: BugReport, index: number) => ({
          ...report,
          id: report.id || `bug-${index}-${Date.now()}`,
        }))

        setBugReports(reportsWithIds)
        setFilteredReports(reportsWithIds)
        setIsRefreshing(false)
      } catch (error) {
        console.error("Error fetching bug reports:", error)
        toast.error("Failed to load bug reports")
        setIsRefreshing(false)
      }
    }, 600) // Simulate network delay
  }

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

    // Apply date filter
    if (dateFilter.start) {
      const startDate = new Date(dateFilter.start).getTime()
      result = result.filter((report) => new Date(report.createdAt).getTime() >= startDate)
    }

    if (dateFilter.end) {
      const endDate = new Date(dateFilter.end).getTime()
      result = result.filter((report) => new Date(report.createdAt).getTime() <= endDate)
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
  }, [bugReports, searchQuery, statusFilter, severityFilter, dateFilter, sortField, sortDirection])

  const handleStatusChange = (report: BugReport, newStatus: "pending" | "in-progress" | "resolved") => {
    const updatedReports = bugReports.map((r) => {
      if (r.id === report.id) {
        return {
          ...r,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        }
      }
      return r
    })

    setBugReports(updatedReports)
    localStorage.setItem("bugReports", JSON.stringify(updatedReports))

    if (selectedReport && selectedReport.id === report.id) {
      setSelectedReport({ ...selectedReport, status: newStatus, updatedAt: new Date().toISOString() })
    }

    toast.success(`Bug status updated to ${newStatus.replace("-", " ")}`)
  }

  const handleAddComment = (reportId: string | undefined, comment: string) => {
    if (!reportId) return

    const updatedReports = bugReports.map((r) => {
      if (r.id === reportId) {
        const newComment = {
          author: "Admin",
          text: comment,
          timestamp: new Date().toISOString(),
        }

        return {
          ...r,
          comments: [...(r.comments || []), newComment],
          updatedAt: new Date().toISOString(),
        }
      }
      return r
    })

    setBugReports(updatedReports)
    localStorage.setItem("bugReports", JSON.stringify(updatedReports))

    if (selectedReport && selectedReport.id === reportId) {
      const newComment = {
        author: "Admin",
        text: comment,
        timestamp: new Date().toISOString(),
      }

      setSelectedReport({
        ...selectedReport,
        comments: [...(selectedReport.comments || []), newComment],
        updatedAt: new Date().toISOString(),
      })
    }

    toast.success("Comment added successfully")
  }

  const toggleSort = (field: "createdAt" | "severity") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const handleExportReports = () => {
    try {
      const dataToExport = filteredReports.map((report) => ({
        ID: report.id,
        Title: report.title,
        Description: report.description,
        Status: report.status,
        Severity: report.severity,
        Category: report.category,
        ReportedBy: report.email,
        ReportedOn: new Date(report.createdAt).toLocaleString(),
        LastUpdated: report.updatedAt ? new Date(report.updatedAt).toLocaleString() : "N/A",
      }))

      const jsonString = JSON.stringify(dataToExport, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `bug-reports-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success("Bug reports exported successfully")
    } catch (error) {
      console.error("Error exporting bug reports:", error)
      toast.error("Failed to export bug reports")
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setSeverityFilter("all")
    setDateFilter({})
    toast.info("Filters cleared")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* <Link to="/" className="flex items-center text-gray-700 hover:text-black">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back to Home</span>
              </Link> */}
              <h1 className="ml-8 text-xl font-bold text-gray-900 flex items-center">
                <BugIcon className="w-6 h-6 mr-2 text-red-500" />
                Bug Management Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewMode(viewMode === "list" ? "stats" : "list")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                title={viewMode === "list" ? "View Statistics" : "View List"}
              >
                {viewMode === "list" ? <BarChart2 className="w-5 h-5" /> : <BugIcon className="w-5 h-5" />}
              </button>
              <button
                onClick={handleExportReports}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                title="Export Reports"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={fetchBugReports}
                className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md ${isRefreshing ? "animate-spin" : ""}`}
                title="Refresh"
                disabled={isRefreshing}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === "list" ? (
          <div className="space-y-6">
            <BugReportFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              severityFilter={severityFilter}
              setSeverityFilter={setSeverityFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              clearFilters={clearFilters}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BugReportList
                filteredReports={filteredReports}
                selectedReport={selectedReport}
                setSelectedReport={setSelectedReport}
                toggleSort={toggleSort}
              />

              <BugReportDetails
                selectedReport={selectedReport}
                handleStatusChange={handleStatusChange}
                handleAddComment={handleAddComment}
                setImageModalOpen={setImageModalOpen}
              />
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
        ) : (
          <BugReportStats bugReports={bugReports} />
        )}
      </main>
    </div>
  )
}

export default BugDashboard

