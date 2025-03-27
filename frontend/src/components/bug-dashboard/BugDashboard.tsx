"use client"

import { useState, useEffect } from "react"
import { BugIcon, X, BarChart2, ChevronLeft, Download, RefreshCw } from "lucide-react"
import { toast } from "react-toastify"
import BugReportStats from "./BugReportStats"
import BugReportFilters from "./BugReportFilters"
import BugReportList from "./BugReportList"
import { Link } from "react-router-dom"
import BugReportDetails from "./BugReportDetails"
import axios from "axios"

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

export interface Bugs {
  title: string
  description: string
  // email: string
  errorcode: string
  category: string
  imageUrl?: string
  status: "pending" | "in-progress" | "resolved"
  createdAt: Date
  author: User
}

interface User {
  _id: string;
  email: string;
}

// Sample data generator for demonstration purposes
const generateSampleBugReports = (): BugReport[] => {
  const categories = ["ui", "functionality", "performance", "security", "other"]
  const severities = ["critical", "high", "medium", "low"]
  const statuses: ("pending" | "in-progress" | "resolved")[] = ["pending", "in-progress", "resolved"]

  const sampleReports: BugReport[] = [
    {
      id: "bug-1",
      title: "Login button not working on mobile devices",
      description:
        "When attempting to log in using the mobile app, the login button becomes unresponsive after tapping it once. This happens consistently on iOS devices.",
      stepsToReproduce:
        "1. Open the mobile app\n2. Enter valid credentials\n3. Tap the login button\n4. Observe that nothing happens",
      email: "sarah.johnson@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      assignedTo: "dev.team@rentamigo.com",
      comments: [
        {
          author: "Tech Support",
          text: "Reproduced on iPhone 12. Sending to development team.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          author: "Developer",
          text: "Found the issue. It's related to a recent update to our authentication service. Working on a fix.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-2",
      title: "Property images not loading in search results",
      description:
        "Property images are showing as broken links in the search results page. This is happening for approximately 30% of listings.",
      email: "mark.wilson@example.com",
      severity: "medium",
      category: "ui",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "bug-3",
      title: "Security vulnerability in payment processing",
      description:
        "Discovered a potential security vulnerability in the payment processing flow. The credit card information is visible in the network requests.",
      stepsToReproduce:
        "1. Add property to cart\n2. Proceed to checkout\n3. Enter payment details\n4. Open browser developer tools and monitor network tab\n5. Observe that card details are sent in plaintext",
      email: "security.team@example.com",
      severity: "critical",
      category: "security",
      status: "in-progress",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      comments: [
        {
          author: "Security Team",
          text: "This is a critical issue. We need to implement proper encryption for all payment data immediately.",
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-4",
      title: "Slow loading times on property details page",
      description:
        "The property details page takes more than 10 seconds to load, especially when there are many high-resolution images.",
      email: "performance.analyst@example.com",
      severity: "medium",
      category: "performance",
      status: "resolved",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      comments: [
        {
          author: "Developer",
          text: "Implemented image lazy loading and compression to improve page load times.",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          author: "QA Team",
          text: "Verified fix. Page load time reduced to under 3 seconds.",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-5",
      title: "Incorrect pricing calculation for long-term rentals",
      description:
        "When booking a property for more than 30 days, the system is not applying the monthly discount correctly.",
      stepsToReproduce:
        "1. Search for a property\n2. Select a property with monthly discount\n3. Book for 45 days\n4. Observe that the total price does not reflect the discount",
      email: "finance@example.com",
      severity: "high",
      category: "functionality",
      status: "resolved",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    },
    {
      id: "bug-6",
      title: "Filter options not working on mobile",
      description:
        "The property filter options (price range, amenities, etc.) are not working correctly on mobile devices. Selections are not being applied to the search results.",
      email: "ui.designer@example.com",
      severity: "medium",
      category: "ui",
      status: "pending",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      imageUrl: "/placeholder.svg?height=500&width=300",
    },
    {
      id: "bug-7",
      title: "Email notifications not being sent for new messages",
      description:
        "Users are not receiving email notifications when they get new messages from property owners or other users.",
      email: "communication@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "bug-8",
      title: "Map view crashes on certain property locations",
      description:
        "The map view in property details crashes when viewing properties in certain remote locations with limited map data.",
      stepsToReproduce:
        "1. Search for properties in remote areas\n2. Select a property\n3. Navigate to the map view\n4. Observe that the app crashes",
      email: "map.specialist@example.com",
      severity: "low",
      category: "functionality",
      status: "pending",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    {
      id: "bug-9",
      title: "Accessibility issues with color contrast",
      description:
        "The text color on the booking confirmation page has poor contrast with the background, making it difficult to read for users with visual impairments.",
      email: "accessibility@example.com",
      severity: "medium",
      category: "ui",
      status: "resolved",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
      updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days ago
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "bug-10",
      title: "Search results pagination not working",
      description:
        "When searching for properties and navigating to page 2 or beyond, the same results from page 1 are shown again.",
      email: "search.team@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "bug-11",
      title: "App crashes when uploading large property images",
      description:
        "When property owners try to upload images larger than 5MB, the app crashes without any error message.",
      stepsToReproduce:
        "1. Log in as property owner\n2. Go to add property\n3. Try to upload a high-resolution image (>5MB)\n4. App crashes",
      email: "owner.support@example.com",
      severity: "high",
      category: "functionality",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "bug-12",
      title: "Date picker showing incorrect available dates",
      description: "The availability calendar is showing some dates as available even though they are already booked.",
      email: "calendar.team@example.com",
      severity: "critical",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      comments: [
        {
          author: "Product Manager",
          text: "This is causing double bookings and needs to be fixed immediately.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ]

  // Generate additional random reports to have more data for statistics
  for (let i = 0; i < 15; i++) {
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    sampleReports.push({
      id: `bug-random-${i}`,
      title: `Random bug report #${i + 1}`,
      description: `This is a randomly generated bug report for testing the dashboard with more data.`,
      email: `user${i}@example.com`,
      severity: randomSeverity,
      category: randomCategory,
      status: randomStatus,
      createdAt: randomDate.toISOString(),
    })
  }

  return sampleReports
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

  const [bugs, setBugs] = useState<Bugs[]>([]);
  
  const loadBugs = async () => {
    try {
      const response = await axios.get(`/api/bug/list`);
      if(response.data.success) {
        console.log(response.data.data)
        setBugs(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to load bugs");
      console.error("Error loading bugs:", error);
    }
  }

  useEffect(() => {
    loadBugs()
  }, [])

  useEffect(() => {
    fetchBugReports()
  }, [])

  // Modify the fetchBugReports function to use the sample data if localStorage is empty
  const fetchBugReports = () => {
    setIsRefreshing(true)

    setTimeout(() => {
      try {
        let storedReports = JSON.parse(localStorage.getItem("bugReports") || "[]")

        // If no reports exist, use sample data
        if (storedReports.length === 0) {
          storedReports = generateSampleBugReports()
          localStorage.setItem("bugReports", JSON.stringify(storedReports))
        }

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
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16">
            <div className="flex items-center mb-4 sm:mb-0">
              {/* <Link to="/" className="flex items-center text-gray-700 hover:text-black">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back to Home</span>
              </Link> */}
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

