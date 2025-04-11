"use client"

import { useState, useEffect } from "react"
import { BugIcon, X, BarChart2, Download, RefreshCw } from "lucide-react"
import { toast } from "react-toastify"
import BugReportStats from "./BugReportStats"
import BugReportFilters from "./BugReportFilters"
import BugReportList from "./BugReportList"
import BugReportDetails from "./BugReportDetails"
import axios from "axios"

export interface Bugs {
  _id: string
  title: string
  description: string
  // email: string
  errorcode?: string
  category: "UI/UX" | "Functionality" | "Performance" | "Security" | "Data" | "Integration" | "Other"
  imageUrl: string
  status: string
  createdAt: Date
  updatedAt: Date
  author: User
  isAccepted?: boolean
}

interface User {
  _id: string
  email: string
}

// Sample data generator for demonstration purposes
// const generateSampleBugReports = (): BugReport[] => {
//   const categories = ["ui", "functionality", "performance", "security", "other"]
//   const severities = ["critical", "high", "medium", "low"]
//   const statuses: ("pending" | "in-progress" | "resolved")[] = ["pending", "in-progress", "resolved"]

//   // Generate additional random reports to have more data for statistics
//   for (let i = 0; i < 15; i++) {
//     const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
//     const randomCategory = categories[Math.floor(Math.random() * categories.length)]
//     const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
//     const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

//     sampleReports.push({
//       id: `bug-random-${i}`,
//       title: `Random bug report #${i + 1}`,
//       description: `This is a randomly generated bug report for testing the dashboard with more data.`,
//       email: `user${i}@example.com`,
//       severity: randomSeverity,
//       category: randomCategory,
//       status: randomStatus,
//       createdAt: randomDate.toISOString(),
//     })
//   }

//   return sampleReports
// }

const BugDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [errorcodefilter, setErrorcodefilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<{ start?: string; end?: string }>({})
  const [selectedReport, setSelectedReport] = useState<Bugs | null>(null)
  const [sortField, setSortField] = useState<"createdAt" | "status">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "stats">("list")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [bugs, setBugs] = useState<Bugs[]>([])
  const [filteredBugs, setFilteredbugs] = useState<Bugs[]>([])

  // Add a new state for tracking whether a bug is a request or accepted
  const [bugRequests, setBugRequests] = useState<Bugs[]>([])
  const [acceptedBugs, setAcceptedBugs] = useState<Bugs[]>([])
  const [activeSection, setActiveSection] = useState<"requests" | "management">("requests")

  // Update the loadBugs function to separate bugs into requests and accepted
  const loadBugs = async () => {
    setIsRefreshing(true)
    try {
      const response = await axios.get(`/api/bug/list`)
      if (response.data.success) {
        // console.log(response.data.data)
        const allBugs = response.data.data
        setBugs(allBugs)

        // Separate bugs into requests and accepted
        const requests = allBugs.filter((bug: Bugs) => bug.status === "pending" && !bug.isAccepted)
        const accepted = allBugs.filter((bug: Bugs) => bug.isAccepted || bug.status !== "pending")

        setBugRequests(requests)
        setAcceptedBugs(accepted)

        const reportsWithIds = bugs.map((bug: Bugs, index: number) => ({
          ...bug,
          id: bug._id || `bug-${index}-${Date.now()}`,
        }))

        setFilteredbugs(activeSection === "requests" ? requests : accepted)
        setIsRefreshing(false)
      }
    } catch (error) {
      toast.error("Failed to load bugs")
      console.error("Error loading bugs:", error)
    }
  }

  // Update the handleAcceptBug function to use the /accept endpoint instead of /edit
  // This will ensure the email notification is sent when a bug is accepted

  // Replace the existing handleAcceptBug function with this updated version:
  const handleAcceptBug = async (bug: Bugs) => {
    try {
      // Use the dedicated accept endpoint that includes email notification
      const response = await axios.put(`/api/bug/${bug._id}/accept`, {
        isaccepted: true,
      })

      // Also update the status to "in-progress" using the edit endpoint
      await axios.put(`/api/bug/${bug._id}/edit`, {
        status: "in-progress",
      })

      if (response.data.success) {
        // Update local state
        const updatedBugs = bugs.map((b) => {
          if (b._id === bug._id) {
            return { ...b, status: "in-progress", isAccepted: true }
          }
          return b
        })

        setBugs(updatedBugs)

        // Move the bug from requests to accepted
        const updatedRequests = bugRequests.filter((b) => b._id !== bug._id)
        const updatedAccepted = [...acceptedBugs, { ...bug, status: "in-progress" as const, isAccepted: true }]

        setBugRequests(updatedRequests)
        setAcceptedBugs(updatedAccepted)

        // Update filtered bugs based on active section
        setFilteredbugs(activeSection === "requests" ? updatedRequests : updatedAccepted)

        // If the bug was selected, update the selected bug
        if (selectedReport && selectedReport._id === bug._id) {
          setSelectedReport({ ...selectedReport, status: "in-progress", isAccepted: true })
        }

        toast.success("Bug accepted and email notification sent")
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Error accepting bug")
    }
  }

  // Update the useEffect to filter bugs based on the active section
  useEffect(() => {
    let result = activeSection === "requests" ? [...bugRequests] : [...acceptedBugs]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.author.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((report) => report.status === statusFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((report) => report.category === categoryFilter)
    }

    // Apply errorcode filter
    if (errorcodefilter !== "all") {
      result = result.filter((report) => report.errorcode === errorcodefilter)
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
        const errorcodeOrder = { ERR123: 4, ERR125: 3, ERR126: 2, ERR124: 1 }
        const aValue = errorcodeOrder[a.errorcode as keyof typeof errorcodeOrder] || 0
        const bValue = errorcodeOrder[b.errorcode as keyof typeof errorcodeOrder] || 0

        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
    })

    setFilteredbugs(result)
  }, [
    searchQuery,
    statusFilter,
    errorcodefilter,
    dateFilter,
    sortField,
    sortDirection,
    bugRequests,
    acceptedBugs,
    activeSection,
  ])

  // Update the useEffect to load bugs when the component mounts
  useEffect(() => {
    loadBugs()
  }, [])

  // Update the useEffect to update filtered bugs when the active section changes
  useEffect(() => {
    setFilteredbugs(activeSection === "requests" ? bugRequests : acceptedBugs)
    // Clear selected report when switching sections
    setSelectedReport(null)
  }, [activeSection, bugRequests, acceptedBugs])

  const handleStatusChange = async (report: Bugs, newStatus: "pending" | "in-progress" | "resolved") => {
    const updatedbugs = bugs.map((r) => {
      if (r._id === report._id) {
        return {
          ...r,
          status: newStatus,
          updatedAt: new Date(),
        }
      }
      return r
    })

    setBugs(updatedbugs)
    console.log(bugs)
    // localStorage.setItem("bugReports", JSON.stringify(updatedReports))

    if (selectedReport && selectedReport._id === report._id) {
      setSelectedReport({ ...selectedReport, status: newStatus, updatedAt: new Date() })
    }
    console.log(selectedReport)

    try {
      const response = await axios.put(`/api/bug/${report._id}/edit`, { status: newStatus })

      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Error updating bug status")
    }
    toast.success(`Bug status updated to ${newStatus.replace("-", " ")}`)
  }
  // const handleAddComment = (reportId: string | undefined, comment: string) => {
  //   if (!reportId) return

  //   const updatedReports = bugReports.map((r) => {
  //     if (r.id === reportId) {
  //       const newComment = {
  //         author: "Admin",
  //         text: comment,
  //         timestamp: new Date().toISOString(),
  //       }

  //       return {
  //         ...r,
  //         comments: [...(r.comments || []), newComment],
  //         updatedAt: new Date().toISOString(),
  //       }
  //     }
  //     return r
  //   })

  //   setBugReports(updatedReports)
  //   localStorage.setItem("bugReports", JSON.stringify(updatedReports))

  //   if (selectedReport && selectedReport._id === reportId) {
  //     const newComment = {
  //       author: "Admin",
  //       text: comment,
  //       timestamp: new Date().toISOString(),
  //     }

  //     setSelectedReport({
  //       ...selectedReport,
  //       // comments: [...(selectedReport.comments || []), newComment],
  //       updatedAt: new Date(),
  //     })
  //   }

  //   toast.success("Comment added successfully")
  // }

  const toggleSort = (field: "createdAt" | "status") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const handleExportReports = () => {
    try {
      const dataToExport = filteredBugs.map((report) => ({
        ID: report._id,
        Title: report.title,
        Description: report.description,
        Status: report.status,
        Errorcode: report.errorcode,
        Category: report.category,
        ReportedBy: report.author.email,
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
    setCategoryFilter("all")
    setErrorcodefilter("all")
    setDateFilter({})
    toast.info("Filters cleared")
  }

  // Update the return statement to include section tabs
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              <h1 className="ml-4 sm:ml-8 text-xl font-bold text-gray-900 flex items-center">
                <BugIcon className="w-6 h-6 mr-2 text-red-500" />
                Bug Dashboard
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
                onClick={loadBugs}
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
            {/* Section Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveSection("requests")}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeSection === "requests"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Bug Requests
                  {bugRequests.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {bugRequests.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveSection("management")}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeSection === "management"
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Bug Management
                  {acceptedBugs.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {acceptedBugs.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <BugReportFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
              clearFilters={clearFilters}
              errorcodefilter={errorcodefilter}
              setErrorcodefilter={setErrorcodefilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BugReportList
                filteredBugs={filteredBugs}
                selectedReport={selectedReport}
                setSelectedReport={setSelectedReport}
                toggleSort={toggleSort}
                activeSection={activeSection}
                handleAcceptBug={handleAcceptBug}
              />

              <BugReportDetails
                selectedReport={selectedReport}
                handleStatusChange={handleStatusChange}
                // handleAddComment={handleAddComment}
                setImageModalOpen={setImageModalOpen}
                activeSection={activeSection}
                handleAcceptBug={handleAcceptBug}
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
          <BugReportStats bugReports={bugs} />
        )}
      </main>
    </div>
  )
}

export default BugDashboard
