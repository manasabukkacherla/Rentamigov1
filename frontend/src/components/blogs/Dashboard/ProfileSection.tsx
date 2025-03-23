"use client"

import type React from "react"
<<<<<<< HEAD
import { useState, useEffect } from "react"
=======
import { useState, useEffect, useCallback } from "react"
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Edit2,
  Save,
  X,
  Shield,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react"
<<<<<<< HEAD

interface UserProfile {
  username: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  role: "owner" | "agent" | "tenant" | "pg" | "employee" | "admin"
  joinDate: string
  avatar: string
  bio: string
=======
import axios from "axios"

interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  password: string;
  role: "owner" | "agent" | "tenant" | "pg" | "employee" | "admin";
  bio?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  linkedin?: string;
  image?: string;
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
}

interface ProfileSectionProps {
  user: UserProfile
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
<<<<<<< HEAD
  const [isEditing, setIsEditing] = useState(false)
=======
  // const [isEditing, setIsEditing] = useState(false)
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...user })
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [animateAvatar, setAnimateAvatar] = useState(false)

<<<<<<< HEAD
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }

    setTimeout(() => setAnimateAvatar(true), 500)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }
=======
  // Initialize theme based on user's preference or system setting
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
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

<<<<<<< HEAD
  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser({ ...user })
  }
=======
  // const handleSave = () => {
  //   setIsEditing(false)
  //   // Here you might want to update the profile in the backend
  // }

  // const handleCancel = () => {
  //   setIsEditing(false)
  //   setEditedUser({ ...user })
  // }
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef

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

  return (
    <div className={`${theme === "light" ? "light" : ""}`}>
      <div className="relative min-h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-500">
        {/* Theme Toggle */}
<<<<<<< HEAD
        <button
=======
        {/* <button
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
          onClick={toggleTheme}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800 transition-all hover:scale-110"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
<<<<<<< HEAD
        </button>

        {/* Edit Toggle */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-16 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800 transition-all hover:scale-110"
          aria-label={isEditing ? "Cancel editing" : "Edit profile"}
        >
          {isEditing ? <X size={18} /> : <Edit2 size={18} />}
=======
        </button> */}

        {/* Edit Toggle */}
        <button
          // onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-16 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800 transition-all hover:scale-110"
          // aria-label={isEditing ? "Cancel editing" : "Edit profile"}
          aria-label="Edit profile"
        >
          {/* {isEditing ? <X size={18} /> : <Edit2 size={18} />} */}
          <Edit2 size={18} />
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
        </button>

        {/* Left Panel - Avatar and Role */}
        <div className="absolute top-0 left-0 bottom-0 w-full sm:w-1/3 bg-gradient-to-b from-white/5 to-white/20 backdrop-blur-sm overflow-hidden">
          <div className="h-full flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-20 blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-blue-300 to-teal-300 opacity-20 blur-2xl"></div>

            {/* Avatar */}
            <div
              className={`relative mb-6 transition-all duration-1000 ease-in-out ${animateAvatar ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
<<<<<<< HEAD
                  src={user.avatar || "/placeholder.svg?height=200&width=200"}
                  alt={user.fullName}
=======
                  src={user.image || "/placeholder.svg?height=200&width=200"}
                  // alt={(userDetails)?userDetails.fullName: ""}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Role Badge */}
              <div
                className="absolute -bottom-2 -right-2 flex items-center justify-center w-16 h-16 rounded-full text-2xl shadow-lg"
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
              <h1 className="text-xl font-semibold text-black mb-1">{user.fullName}</h1>
              <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                <span>@{user.username}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span className="capitalize">{user.role}</span>
              </div>
            </div>

            {/* Join Date */}
<<<<<<< HEAD
            <div className="text-sm text-gray-500 mt-2">Member since {user.joinDate}</div>
=======
            {/* <div className="text-sm text-gray-500 mt-2">Member since {user.joinDate}</div> */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef

            {/* Bio */}
            <div className="mt-6 w-full px-4">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
                <Sparkles size={14} />
                <span>Bio</span>
              </h3>
<<<<<<< HEAD
              {isEditing ? (
                <textarea
=======
              {/* {isEditing ? ( */}
                {/* <textarea
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-black transition-all text-sm"
                  rows={3}
                  placeholder="Tell us about yourself..."
<<<<<<< HEAD
                />
              ) : (
                <p className="text-black text-sm italic">{user.bio || "No bio provided yet."}</p>
              )}
=======
                /> */}
              {/* ) : ( */}
                <p className="text-black text-sm italic">{user.bio || "No bio provided yet."}</p>
              {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
            </div>
          </div>
        </div>

        {/* Right Panel - User Information */}
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-2/3 overflow-y-auto p-6">
          <div className="space-y-10">
            {/* Overview Section */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Username</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">@{user.username}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">@{user.username}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Full Name</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="text"
                      name="fullName"
                      value={editedUser.fullName}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.fullName}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.fullName}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Role</h3>
                  <p className="text-black font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </div>

            {/* Contact Details Section */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Email</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.email}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.email}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Phone Number</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.phone}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.phone}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Address</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.address}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.address}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">City</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="text"
                      name="city"
                      value={editedUser.city}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.city}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.city}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">State</h3>
<<<<<<< HEAD
                  {isEditing ? (
=======
                  {/* {isEditing ? (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                    <input
                      type="text"
                      name="state"
                      value={editedUser.state}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-black text-sm"
                    />
<<<<<<< HEAD
                  ) : (
                    <p className="text-black font-medium">{user.state}</p>
                  )}
=======
                  ) : ( */}
                    <p className="text-black font-medium">{user.state}</p>
                  {/* )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
                </div>
              </div>
            </div>

            {/* Save Button (Only visible in edit mode) */}
<<<<<<< HEAD
            {isEditing && (
=======
            {/* {isEditing && (
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-md"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
<<<<<<< HEAD
            )}
=======
            )} */}
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
          </div>
        </div>
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default ProfileSection
=======
export default ProfileSection
>>>>>>> 681e0dd3adc6341d9f645fe91838624d95bcdaef
