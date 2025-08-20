"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Users,
  Home,
  DollarSign,
  Bell,
  BarChart3,
  SettingsIcon,
  Menu,
  X,
  UserCircle,
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Dashboard from "./components/Dashboard"
import Properties from "./components/Properties"
import Revenue from "./components/Revenue"
import Employees from "./components/Employees"
import Analytics from "./components/Analytics"
import Notifications from "./components/Notifications"
import Settings from "./components/Settings"
import Sidebar from "./components/Sidebar"
import UserStats from "./components/UserStats"

interface AdmindashProps {
  defaultSection?: string
}

function Admindash({ defaultSection = "dashboard" }: AdmindashProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState(defaultSection)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Update active section based on URL path
  useEffect(() => {
    const path = location.pathname.split("/").pop()
    if (path && path !== "admindash") {
      setActiveSection(path)
    } else {
      setActiveSection("dashboard")
    }
  }, [location.pathname])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admindash/dashboard" },
    { id: "properties", label: "Properties", icon: Home, path: "/admindash/properties" },
    { id: "revenue", label: "Revenue", icon: DollarSign, path: "/admindash/revenue" },
    { id: "employees", label: "Employees", icon: Users, path: "/admindash/employees" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/admindash/analytics" },
    { id: "users", label: "Users", icon: UserCircle, path: "/admindash/users" },
    { id: "notifications", label: "Notifications", icon: Bell, path: "/admindash/notifications" },
    { id: "settings", label: "Settings", icon: SettingsIcon, path: "/admindash/settings" },
  ]

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    // Clear session storage
    sessionStorage.clear()

    // Show goodbye message
    toast.success("Thank you for using PropAmigo. See you soon!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })

    // Redirect after toast shows
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    navigate(`/admindash/${section}`)
    setIsMobileMenuOpen(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "properties":
        return <Properties />
      case "revenue":
        return <Revenue />
      case "employees":
        return <Employees />
      case "analytics":
        return <Analytics />
      case "users":
        return <UserStats />
      case "notifications":
        return <Notifications />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar
          menuItems={menuItems}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
        />
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">{renderContent()}</div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button onClick={confirmLogout} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admindash