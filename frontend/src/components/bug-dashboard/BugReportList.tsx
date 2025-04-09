// "use client"

// import { BugIcon, ArrowUpDown } from "lucide-react"
// import type { Bugs } from "./BugDashboard"

// interface BugReportListProps {
//   // filteredReports: BugReport[]
//   filteredBugs: Bugs[]
//   selectedReport: Bugs | null
//   setSelectedReport: (report: Bugs) => void
//   toggleSort: (field: "createdAt" | "status") => void
// }

// const BugReportList = ({ filteredBugs, selectedReport, setSelectedReport, toggleSort }: BugReportListProps) => {
//   console.log(filteredBugs)
//   // console.log(selectedReport)
//   const getErrorcodeColor = (errorcode: string) => {
//     switch (errorcode) {
//       case "ERR123":
//         return "bg-red-100 text-red-800"
//       case "ERR124":
//         return "bg-orange-100 text-orange-800"
//       case "ERR125":
//         return "bg-yellow-100 text-yellow-800"
//       case "ERR126":
//         return "bg-green-100 text-green-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "pending":
//         return <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
//       case "in-progress":
//         return <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//       case "resolved":
//         return <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//       default:
//         return null
//     }
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <h3 className="font-medium text-gray-900">Reports</h3>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => toggleSort("createdAt")}
//             className="flex items-center text-sm text-gray-500 hover:text-gray-700"
//           >
//             Date
//             <ArrowUpDown className="ml-1 h-3 w-3" />
//           </button>
//           <button
//             onClick={() => toggleSort("status")}
//             className="flex items-center text-sm text-gray-500 hover:text-gray-700 ml-2"
//           >
//             Status
//             <ArrowUpDown className="ml-1 h-3 w-3" />
//           </button>
//         </div>
//       </div>

//       <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
//         {filteredBugs.length > 0 ? (
//           filteredBugs.map((report) => (
//             <div
//               key={report._id}
//               onClick={() => setSelectedReport(report)}
//               className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
//                 selectedReport && selectedReport._id === report._id ? "bg-gray-50 border-l-4 border-black" : ""
//               }`}
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <h4 className="font-medium text-gray-900 line-clamp-1">{report.title}</h4>
//                 {/* <span className={`text-xs px-2 py-1 rounded-full ${getErrorcodeColor(selectedReport?.errorcode || "")}`}>
//                 {selectedReport?.errorcode}
//               </span> */}
//               </div>
//               <div className="text-sm text-gray-500 mb-2 line-clamp-2">{report.description}</div>
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <div className="flex items-center space-x-1">
//                   {getStatusIcon(report.status)}
//                   <span className="capitalize">{report.status.replace("-", " ")}</span>
//                 </div>
//                 <span>{new Date(report.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-8 text-center">
//             <BugIcon className="mx-auto h-12 w-12 text-gray-400" />
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No bug reports</h3>
//             <p className="mt-1 text-sm text-gray-500">No bug reports match your current filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BugReportList

"use client"

import { BugIcon, ArrowUpDown } from "lucide-react"
import type { Bugs } from "./BugDashboard"

interface BugReportListProps {
  filteredBugs: Bugs[]
  selectedReport: Bugs | null
  setSelectedReport: (report: Bugs) => void
  toggleSort: (field: "createdAt" | "status") => void
  activeSection: "requests" | "management"
  handleAcceptBug: (bug: Bugs) => void
}

const BugReportList = ({
  filteredBugs,
  selectedReport,
  setSelectedReport,
  toggleSort,
  activeSection,
  handleAcceptBug,
}: BugReportListProps) => {
  console.log(filteredBugs)
  // console.log(selectedReport)
  const getErrorcodeColor = (errorcode: string) => {
    switch (errorcode) {
      case "ERR123":
        return "bg-red-100 text-red-800"
      case "ERR124":
        return "bg-orange-100 text-orange-800"
      case "ERR125":
        return "bg-yellow-100 text-yellow-800"
      case "ERR126":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
      case "in-progress":
        return <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      case "resolved":
        return <span className="w-2 h-2 bg-green-500 rounded-full"></span>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">
          {activeSection === "requests" ? "Bug Requests" : "Bug Management"}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleSort("createdAt")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            Date
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </button>
          <button
            onClick={() => toggleSort("status")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 ml-2"
          >
            Status
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
        {filteredBugs.length > 0 ? (
          filteredBugs.map((report) => (
            <div
              key={report._id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                selectedReport && selectedReport._id === report._id ? "bg-gray-50 border-l-4 border-black" : ""
              }`}
            >
              <div className="flex flex-col">
                <div onClick={() => setSelectedReport(report)} className="cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{report.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getErrorcodeColor(report.errorcode || "")}`}>
                      {report.errorcode || "Unknown"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 line-clamp-2">{report.description}</div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status.replace("-", " ")}</span>
                    </div>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Accept button for bug requests */}
                {activeSection === "requests" && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleAcceptBug(report)}
                      className="px-3 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    >
                      Accept Bug
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BugIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {activeSection === "requests" ? "No bug requests" : "No bugs to manage"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeSection === "requests"
                ? "There are no new bug requests at this time."
                : "No bugs match your current filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BugReportList
