"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"
import type { Bugs } from "./BugDashboard"

interface BugReportExportProps {
  bugReports: Bugs[]
  onClose: () => void
}

const BugReportExport = ({ bugReports, onClose }: BugReportExportProps) => {
  const [exportFormat, setExportFormat] = useState("json")
  const [includeFields, setIncludeFields] = useState({
    title: true,
    description: true,
    stepsToReproduce: true,
    email: true,
    severity: true,
    category: true,
    status: true,
    createdAt: true,
    updatedAt: true,
    comments: false,
  })

  const toggleField = (field: keyof typeof includeFields) => {
    setIncludeFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleExport = () => {
    try {
      // Filter reports based on selected fields
      const filteredData = bugReports.map((report) => {
        const result: Record<string, any> = {}

        Object.keys(includeFields).forEach((key) => {
          if (includeFields[key as keyof typeof includeFields] && key in report) {
            result[key] = report[key as keyof Bugs]
          }
        })

        return result
      })

      let content = ""
      let filename = `bug-reports-${new Date().toISOString().split("T")[0]}`
      let type = ""

      if (exportFormat === "json") {
        content = JSON.stringify(filteredData, null, 2)
        filename += ".json"
        type = "application/json"
      } else if (exportFormat === "csv") {
        // Create CSV header
        const headers = Object.keys(includeFields)
          .filter((key) => includeFields[key as keyof typeof includeFields])
          .join(",")

        // Create CSV rows
        const rows = filteredData.map((item) =>
          Object.values(item)
            .map((value) => {
              if (typeof value === "string") {
                // Escape quotes and wrap in quotes
                return `"${value.replace(/"/g, '""')}"`
              }
              return value
            })
            .join(","),
        )

        content = [headers, ...rows].join("\n")
        filename += ".csv"
        type = "text/csv"
      }

      // Create and download file
      const blob = new Blob([content], { type })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      onClose()
    } catch (error) {
      console.error("Error exporting bug reports:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Export Bug Reports</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="json"
                checked={exportFormat === "json"}
                onChange={() => setExportFormat("json")}
                className="mr-2"
              />
              JSON
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={exportFormat === "csv"}
                onChange={() => setExportFormat("csv")}
                className="mr-2"
              />
              CSV
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Include Fields</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(includeFields).map(([field, included]) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  checked={included}
                  onChange={() => toggleField(field as keyof typeof includeFields)}
                  className="mr-2"
                />
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export {bugReports.length} Reports
          </button>
        </div>
      </div>
    </div>
  )
}

export default BugReportExport

