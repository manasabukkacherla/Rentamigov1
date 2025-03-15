"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Globe, Twitter, Instagram, Linkedin, Edit } from "lucide-react"

interface User {
  name: string
  email: string
  joinDate: string
  bio: string
  avatar: string
  location: string
  website: string
  socialLinks: {
    twitter: string
    instagram: string
    linkedin: string
  }
}

interface ProfileSectionProps {
  user: User
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBio, setEditedBio] = useState(user.bio)

  const handleSaveBio = () => {
    // In a real app, you would save this to the backend
    setIsEditing(false)
    // For now we're just updating the local state
    // user.bio = editedBio;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-gray-800 to-black"></div>
      <div className="px-6 py-4 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-4 gap-4">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">Member since {user.joinDate}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleSaveBio}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Save Bio
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-4">{user.bio}</p>
        )}

        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            <a href={`https://${user.website}`} className="hover:text-black transition">
              {user.website}
            </a>
          </div>
          <div className="flex items-center">
            <Twitter className="h-4 w-4 mr-1" />
            <a
              href={`https://twitter.com/${user.socialLinks.twitter.replace("@", "")}`}
              className="hover:text-black transition"
            >
              {user.socialLinks.twitter}
            </a>
          </div>
          <div className="flex items-center">
            <Instagram className="h-4 w-4 mr-1" />
            <a
              href={`https://instagram.com/${user.socialLinks.instagram.replace("@", "")}`}
              className="hover:text-black transition"
            >
              {user.socialLinks.instagram}
            </a>
          </div>
          <div className="flex items-center">
            <Linkedin className="h-4 w-4 mr-1" />
            <a href={`https://linkedin.com/in/${user.socialLinks.linkedin}`} className="hover:text-black transition">
              {user.socialLinks.linkedin}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection

