"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Clock, ExternalLink, Send } from "lucide-react"
import type { BugReport } from "./BugDashboard"

interface BugReportDetailsProps {
  selectedReport: BugReport | null
  handleStatusChange: (report: BugReport, newStatus: "pending" | "in-progress" | "resolved") => void
  handleAddComment: (reportId: string | undefined, comment: string) => void
  setImageModalOpen: (isOpen: boolean) => void
}

const BugReportDetails = ({
  selectedReport,
  handleStatusChange,
  handleAddComment,
  setImageModalOpen,
}: BugReportDetailsProps) => {
  const [comment, setComment] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const submitComment = () => {
    if (!comment.trim()) return
    handleAddComment(selectedReport?.id, comment)
    setComment("")
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
      {selectedReport ? (
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(selectedReport.severity)}`}>
                {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Reported by: {selectedReport.email} • {formatDate(selectedReport.createdAt)}
            </div>
            {selectedReport.updatedAt && selectedReport.updatedAt !== selectedReport.createdAt && (
              <div className="mt-1 text-xs text-gray-400">Last updated: {formatDate(selectedReport.updatedAt)}</div>
            )}
          </div>

          <div className="p-6 flex-grow overflow-auto">
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
              <div className="text-gray-800 whitespace-pre-wrap">{selectedReport.description}</div>
            </div>

            {/* {selectedReport.stepsToReproduce && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Steps to Reproduce</h4>
                <div className="text-gray-800 whitespace-pre-wrap">{selectedReport.stepsToReproduce}</div>
              </div>
            )} */}

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="text-gray-800 capitalize">{selectedReport.category}</div>
            </div>

            {selectedReport.imageUrl && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Screenshot</h4>
                <div className="mt-2 border border-gray-200 rounded-md overflow-hidden relative">
                  <img
                    src={selectedReport.imageUrl || "/placeholder.svg"}
                    alt="Bug screenshot"
                    className="max-w-full h-auto cursor-pointer"
                    onClick={() => setImageModalOpen(true)}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                    onClick={() => setImageModalOpen(true)}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Comments Section */}
            {selectedReport.comments && selectedReport.comments.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
                <div className="space-y-3">
                  {selectedReport.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
              />
              <button
                onClick={submitComment}
                disabled={!comment.trim()}
                className={`p-2 rounded-md ${
                  comment.trim()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange(selectedReport, "pending")}
                className={`px-3 py-2 text-sm rounded-md flex items-center ${
                  selectedReport.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                Pending
              </button>
              <button
                onClick={() => handleStatusChange(selectedReport, "in-progress")}
                className={`px-3 py-2 text-sm rounded-md flex items-center ${
                  selectedReport.status === "in-progress"
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange(selectedReport, "resolved")}
                className={`px-3 py-2 text-sm rounded-md flex items-center ${
                  selectedReport.status === "resolved"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Resolved
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bug report selected</h3>
          <p className="text-gray-500 max-w-md">
            Select a bug report from the list to view its details and manage its status.
          </p>
        </div>
      )}
    </div>
  )
}

export default BugReportDetails

