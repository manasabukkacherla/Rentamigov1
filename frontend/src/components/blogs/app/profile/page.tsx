"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { User, Mail, Phone, MapPin, Camera } from "lucide-react"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Content creator and blogger with a passion for technology and travel.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full">
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{user.email}</span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{user.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{user.location}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Bio</h2>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

