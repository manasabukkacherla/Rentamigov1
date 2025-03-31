"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { BugIcon, Upload, X, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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

const BugReportForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("ui")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorcode, setErrorcode] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB")
        return
      }

      setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("submitted")

    if (!title || !description ) {
      toast.error("Please fill all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would upload the image to a server
      // and get back a URL to store with the bug report
      let imageUrl = ""
      if (image) {
        // Simulate image upload
        imageUrl = imagePreview || ""
      }

      const user = sessionStorage.getItem("user")
      if(user) {
        const userId = JSON.parse(user).id;
        const bugReport = {
          title,
          description,
          // email,
          errorcode,
          category,
          imageUrl,
          status: "pending",
          createdAt: new Date().toISOString(),
          author: userId
        }

        console.log(bugReport)
        const response = await axios.post(`api/bug/create`, bugReport)
        console.log(response)
        if(response.data.success) {
          toast.success("Bug reported successfully!")
        } else {
          toast.error("Something went wrong!!")
        }
  
        // In a real application, you would send this data to your backend
        // console.log("Bug report submitted:", bugReport)
  
        // // For demo purposes, store in localStorage
        // const existingReports = JSON.parse(localStorage.getItem("bugReports") || "[]")
        // existingReports.push(bugReport)
        // localStorage.setItem("bugReports", JSON.stringify(existingReports))
  
        // toast.success("Bug report submitted successfully!")
  
        // Reset form
        setTitle("")
        setDescription("")
        setErrorcode("")
        setCategory("ui")
        removeImage()
      } else {
        toast.error("Login first!!")
        navigate("/login")
      }
    } catch (error) {
      console.error("Error submitting bug report:", error)
      toast.error("All fields must be filled!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <BugIcon className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Report a Bug</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Found an issue with our platform? Please fill out the form below to report it. Your feedback helps us improve
        the experience for everyone.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Bug Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Brief description of the issue"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="We'll contact you if we need more information"
            required
          />
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="ui">User Interface</option>
              <option value="functionality">Functionality</option>
              <option value="performance">Performance</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="low">Low - Minor issue</option>
              <option value="medium">Medium - Affects functionality but has workaround</option>
              <option value="high">High - Severely impacts usage</option>
              <option value="critical">Critical - Complete blocker</option>
            </select>
          </div>

          <div>
            <label htmlFor="error-code" className="block text-sm font-medium text-gray-700 mb-1">
              Error Code
            </label>
            <input
            type="text"
            id="errorcode"
            value={errorcode}
            onChange={(e) => setErrorcode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter Error Code"
            required
          />
          </div>
        </div> */}

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Please describe the issue in detail"
            required
          />
        </div>

        {/* <div>
          <label htmlFor="stepsToReproduce" className="block text-sm font-medium text-gray-700 mb-1">
            Steps to Reproduce
          </label>
          <textarea
            id="stepsToReproduce"
            value={stepsToReproduce}
            onChange={(e) => setStepsToReproduce(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="1. Go to page X\n2. Click on Y\n3. Observe the issue"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Screenshot</label>

          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            </div>
          ) : (
            <div className="relative">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Bug screenshot preview"
                className="max-h-64 rounded-md mx-auto border border-gray-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              Please do not include any sensitive personal information in your bug report.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Bug Report"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BugReportForm