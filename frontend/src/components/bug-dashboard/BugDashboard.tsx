"use client"

import { useState, useEffect } from "react"
import { BugIcon, X, BarChart2, Download, RefreshCw, Bell } from "lucide-react"
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
  category?: string
  imageUrl: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: Date
  updatedAt: Date
  author: User
}

interface User {
  _id: string
  email: string
}

interface BugNotification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
  bugId?: string
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
  const [errorcodefilter, setErrorcodefilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<{ start?: string; end?: string }>({})
  const [selectedReport, setSelectedReport] = useState<Bugs | null>(null)
  const [sortField, setSortField] = useState<"createdAt" | "status">("createdAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "stats">("list")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [notifications, setNotifications] = useState<BugNotification[]>([
    {
      id: "notif-1",
      title: "New Bug Report",
      message: "A critical bug has been reported in the authentication system.",
      timestamp: "10 minutes ago",
      read: false,
      type: "error",
      bugId: "bug-1",
    },
    {
      id: "notif-2",
      title: "Bug Status Updated",
      message: "The payment processing bug has been marked as resolved.",
      timestamp: "1 hour ago",
      read: false,
      type: "success",
      bugId: "bug-2",
    },
    {
      id: "notif-3",
      title: "Comment Added",
      message: "A team member added a comment to the UI rendering bug.",
      timestamp: "3 hours ago",
      read: true,
      type: "info",
      bugId: "bug-3",
    },
  ])
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)

  const [bugs, setBugs] = useState<Bugs[]>([])
  const [filteredBugs, setFilteredbugs] = useState<Bugs[]>([])

  const loadBugs = async () => {
    setIsRefreshing(true)
    try {
      const response = await axios.get(`/api/bug/list`)
      if (response.data.success) {
        // console.log(response.data.data)
        setBugs(response.data.data)

        const reportsWithIds = bugs.map((bug: Bugs, index: number) => ({
          ...bug,
          id: bug._id || `bug-${index}-${Date.now()}`,
        }))

        setFilteredbugs(reportsWithIds)
        setIsRefreshing(false)
      }
    } catch (error) {
      toast.error("Failed to load bugs")
      console.error("Error loading bugs:", error)
    }
  }

  useEffect(() => {
    loadBugs()
  }, [])

  useEffect(() => {
    let result = [...bugs]

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
  }, [searchQuery, statusFilter, errorcodefilter, dateFilter, sortField, sortDirection, bugs])

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
    setErrorcodefilter("all")
    setDateFilter({})
    toast.info("Filters cleared")
  }

  const handleMarkAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === notificationId) {
        return { ...notification, read: true }
      }
      return notification
    })
    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
  }

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

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
              <div className="relative">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button onClick={handleMarkAllAsRead} className="text-xs text-gray-500 hover:text-gray-700">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No notifications</div>
                      ) : (
                        <div>
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                            >
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <span className="text-xs text-gray-500">{notification.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800 mt-2"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button
                        onClick={() => setNotificationOpen(false)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BugReportList
                filteredBugs={filteredBugs}
                selectedReport={selectedReport}
                setSelectedReport={setSelectedReport}
                toggleSort={toggleSort}
              />

              <BugReportDetails
                selectedReport={selectedReport}
                handleStatusChange={handleStatusChange}
                // handleAddComment={handleAddComment}
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
          <BugReportStats bugReports={bugs} />
        )}
      </main>
    </div>
  )
}

export default BugDashboard

