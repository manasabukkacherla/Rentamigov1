"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Edit2, Save, X, Sun, Moon, Sparkles } from "lucide-react"

interface UserProfile {
  username: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  password: string
  role: "owner" | "agent" | "tenant" | "pg" | "employee" | "admin"
  bio?: string
  twitter?: string
  instagram?: string
  website?: string
  linkedin?: string
  image?: string
}

interface ProfileSectionProps {
  user: UserProfile
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...user })
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [animateAvatar, setAnimateAvatar] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
    setTimeout(() => setAnimateAvatar(true), 500)
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }, [theme])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getRoleColor = (role: UserProfile["role"]) => {
    const colors = {
      owner: "#8B5CF6",
      agent: "#3B82F6",
      tenant: "#10B981",
      pg: "#F59E0B",
      employee: "#EC4899",
      admin: "#EF4444",
    }
    return colors[role] || "#6B7280"
  }

  const getRoleEmoji = (role: UserProfile["role"]) => {
    const emojis = {
      owner: "🏠",
      agent: "🔑",
      tenant: "👥",
      pg: "☕",
      employee: "💼",
      admin: "🛡️",
    }
    return emojis[role] || "👤"
  }

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user profile
      // For example: await axios.put(`/api/users/${user._id}`, editedUser);

      // For now, we'll just toggle the editing state
      setIsEditing(false)
      // You would typically update the user state here with the response from the API
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  return (
    <div className={`${theme === "light" ? "light" : ""}`}>
      <div className="relative min-h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-500">
        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800 transition-all hover:scale-110"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button> */}

        {/* Edit Toggle */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-16 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800 transition-all hover:scale-110"
          aria-label={isEditing ? "Cancel editing" : "Edit profile"}
        >
          <Edit2 size={18} />
        </button>

        {/* Responsive Layout */}
        <div className="flex flex-col sm:flex-row h-full">
          {/* Left Panel - Avatar and Role */}
          <div className="w-full sm:w-1/3 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-sm overflow-hidden p-6">
            <div className="flex flex-col items-center justify-center h-full relative">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-20 blur-2xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 blur-2xl"></div>

              {/* Avatar */}
              <div
                className={`relative mb-6 transition-all duration-1000 ease-in-out ${animateAvatar ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
              >
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={user.image || "/placeholder.svg?height=200&width=200"}
                    // alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Role Badge */}
                <div
                  className="absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full text-xl sm:text-2xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${getRoleColor(user.role)}80, ${getRoleColor(user.role)})`,
                    border: `2px solid #FFFFFF`,
                  }}
                >
                  {getRoleEmoji(user.role)}
                </div>
              </div>

              {/* Username and Role */}
              <div className="text-center mb-6">
                <h1 className="text-lg sm:text-xl font-semibold text-black mb-1">{user.fullName}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-600 text-xs sm:text-sm">
                  <span>@{user.username}</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  <span className="capitalize">{user.role}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4 sm:mt-6 w-full px-2 sm:px-4">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                  <Sparkles size={14} />
                  <span>Bio</span>
                </h3>
                  <p className="text-black text-sm italic">{user.bio || "No bio provided yet."}</p>
              </div>
            </div>
          </div>

          {/* Right Panel - User Information */}
          <div className="w-full sm:w-2/3 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-6 sm:space-y-10">
              {/* Overview Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Overview</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Username</h3>
                      <p className="text-black font-medium">@{user.username}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Full Name</h3>
                      <p className="text-black font-medium">{user.fullName}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Role</h3>
                    <p className="text-black font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Contact Details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Email</h3>
                    <p className="text-black font-medium truncate break-all">{user.email}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Phone Number</h3>
                    <p className="text-black font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Location</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Address</h3>
                      <p className="text-black font-medium">{user.address}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">City</h3>
                      <p className="text-black font-medium">{user.city}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">State</h3>
                      <p className="text-black font-medium">{user.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection

