"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, LayoutDashboard, Building2, Users, Bell, ClipboardList, IndianRupee, Star, Settings as SettingsIcon } from "lucide-react"

// Components
import Sidebar from './components/Sidebar'

// Pages
import DashboardOverview from './pages/DashboardOverview'
import PGListings from './pages/PGListings'
import Leads from './pages/Leads'
import Notifications from './pages/Notifications'
import Plans from './pages/Plans'
import RevenueAnalytics from './pages/RevenueAnalytics'
import ReviewsRatings from './pages/ReviewsRatings'
import Settings from './pages/Settings'

interface PgappProps {
  defaultSection?: string
}

function Pgapp({ defaultSection = "overview" }: PgappProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(defaultSection)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const path = location.pathname.split("/").pop()
    if (path && path !== "pgdash") {
      setActiveSection(path)
    } else {
      setActiveSection("overview")
    }
  }, [location.pathname])

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, path: "/pgdash/overview" },
    { id: "listings", label: "PG Listings", icon: Building2, path: "/pgdash/listings" },
    { id: "leads", label: "Leads", icon: Users, path: "/pgdash/leads" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/pgdash/notifications" },
    { id: "plans", label: "Plans", icon: ClipboardList, path: "/pgdash/plans" },
    { id: "revenue", label: "Revenue Analytics", icon: IndianRupee, path: "/pgdash/revenue" },
    { id: "reviews", label: "Reviews & Ratings", icon: Star, path: "/pgdash/reviews" },
    { id: "settings", label: "Settings", icon: SettingsIcon, path: "/pgdash/settings" },
  ]

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    navigate(`/pgdash/${section}`)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "listings":
        return <PGListings />
      case "leads":
        return <Leads />
      case "notifications":
        return <Notifications />
      case "plans":
        return <Plans />
      case "revenue":
        return <RevenueAnalytics />
      case "reviews":
        return <ReviewsRatings />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 z-40 transition-transform duration-300">
          <Sidebar
            menuItems={menuItems}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col
          ${isSidebarOpen ? "ml-80" : "ml-0"}
          transition-all duration-300
        `}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="text-xl font-semibold text-gray-800 ml-4">PG Dashboard</h1>

          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            Add New PG
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Pgapp
