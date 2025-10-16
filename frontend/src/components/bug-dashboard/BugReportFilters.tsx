"use client"

import { Search, Filter, AlertCircle, Calendar, X, Bug } from "lucide-react"

interface BugReportFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  dateFilter: { start?: string; end?: string }
  setDateFilter: (filter: { start?: string; end?: string }) => void
  clearFilters: () => void
  errorcodefilter: string
  setErrorcodefilter: (errorcodefilter: string) => void
}

const BugReportFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  clearFilters,
  errorcodefilter,
  setErrorcodefilter
}: BugReportFiltersProps) => {
  const hasActiveFilters =
    searchQuery || 
    statusFilter !== "all" || 
    categoryFilter !== "all" || 
    errorcodefilter !== "all" || 
    dateFilter.start || 
    dateFilter.end

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Filters</h3>
          </div>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              <X className="w-4 h-4 mr-1" />
              Clear all filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search bug reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Bug className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Categories</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Functionality">Functionality</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
              <option value="Data">Data</option>
              <option value="Integration">Integration</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Error Code Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AlertCircle className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={errorcodefilter}
              onChange={(e) => setErrorcodefilter(e.target.value)}
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Errorcodes</option>
              <option value="ERR123">ERR123</option>
              <option value="ERR124">ERR124</option>
              <option value="ERR125">ERR125</option>
              <option value="ERR126">ERR126</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={dateFilter.start || ""}
                onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                className="pl-9 pr-2 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Start date"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={dateFilter.end || ""}
                onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                className="pl-9 pr-2 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="End date"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BugReportFilters

