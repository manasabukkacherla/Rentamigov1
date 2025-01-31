import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Eye, X, Phone, Mail, User, Calendar, MapPin, MessageCircle, Building2, Download, ChevronDown, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status?: string;
  source?: string;
  location?: string;
  createdAt?: string;
  lastContact?: string;
  notes?: string;
  propertyId: number;
  propertyName: string;
  propertyCategory: 'Apartment' | 'House' | 'Commercial' | 'Land';
}

// Sample data
const leadsData: Lead[] = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com', 
    phone: '+1 (555) 123-4567',
    status: 'New',
    source: 'Website',
    location: 'New York, NY',
    createdAt: '2024-03-15',
    lastContact: '2024-03-20',
    notes: 'Interested in 2-bedroom apartments in downtown area',
    propertyId: 101,
    propertyName: 'Modern Apartment',
    propertyCategory: 'Apartment'
  },
  { 
    id: 2, 
    name: 'Emma Wilson', 
    email: 'emma.wilson@example.com', 
    phone: '+1 (555) 234-5678',
    status: 'Follow Up',
    source: 'Referral',
    location: 'Boston, MA',
    createdAt: '2024-03-14',
    lastContact: '2024-03-19',
    notes: 'Looking for pet-friendly properties',
    propertyId: 102,
    propertyName: 'Luxury House',
    propertyCategory: 'House'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael.brown@example.com', 
    phone: '+1 (555) 345-6789',
    status: 'New',
    source: 'Website',
    location: 'Chicago, IL',
    createdAt: '2024-03-13',
    lastContact: '2024-03-18',
    notes: 'Interested in commercial properties',
    propertyId: 103,
    propertyName: 'Downtown Office',
    propertyCategory: 'Commercial'
  },
  { 
    id: 4, 
    name: 'Sarah Davis', 
    email: 'sarah.davis@example.com', 
    phone: '+1 (555) 456-7890',
    status: 'Follow Up',
    source: 'Agent',
    location: 'Los Angeles, CA',
    createdAt: '2024-03-12',
    lastContact: '2024-03-17',
    notes: 'Looking for investment properties',
    propertyId: 104,
    propertyName: 'Retail Space',
    propertyCategory: 'Commercial'
  }
];

interface ColumnDef {
  id: keyof Lead;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date';
  options?: string[];
}

interface SortConfig {
  column: keyof Lead | null;
  direction: 'asc' | 'desc' | null;
}

interface ColumnFilter {
  column: keyof Lead;
  value: string;
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith';
}

export function Leads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [openReportDropdown, setOpenReportDropdown] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    source: '',
    dateRange: 'all'
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ column: null, direction: null });
  const [activeFilterColumn, setActiveFilterColumn] = useState<keyof Lead | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const columns: ColumnDef[] = [
    { id: 'id', label: '#', sortable: true },
    { id: 'propertyId', label: 'Property ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true, filterable: true, filterType: 'text' },
    { id: 'email', label: 'Email', sortable: true, filterable: true, filterType: 'text' },
    { id: 'phone', label: 'Phone', filterable: true, filterType: 'text' },
    { id: 'propertyName', label: 'Property Name', sortable: true, filterable: true, filterType: 'text' },
    { id: 'propertyCategory', label: 'Category', sortable: true, filterable: true, filterType: 'select', 
      options: ['Apartment', 'House', 'Commercial', 'Land'] },
    { id: 'status', label: 'Status', sortable: true, filterable: true, filterType: 'select',
      options: Array.from(new Set(leadsData.map(lead => lead.status).filter(Boolean))) },
    { id: 'source', label: 'Source', sortable: true, filterable: true, filterType: 'select',
      options: Array.from(new Set(leadsData.map(lead => lead.source).filter(Boolean))) }
  ];

  const handleSort = (column: keyof Lead) => {
    setSortConfig(prev => ({
      column,
      direction: 
        prev.column === column
          ? prev.direction === 'asc'
            ? 'desc'
            : prev.direction === 'desc'
              ? null
              : 'asc'
          : 'asc'
    }));
  };

  const handleColumnFilter = (column: keyof Lead, value: string, operator: ColumnFilter['operator'] = 'contains') => {
    setColumnFilters(prev => {
      const existing = prev.find(f => f.column === column);
      if (existing) {
        if (!value) {
          return prev.filter(f => f.column !== column);
        }
        return prev.map(f => f.column === column ? { ...f, value, operator } : f);
      }
      if (!value) return prev;
      return [...prev, { column, value, operator }];
    });
  };

  const getSortIcon = (column: keyof Lead) => {
    if (sortConfig.column !== column) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" />
      : sortConfig.direction === 'desc'
        ? <ArrowDown className="h-4 w-4 text-blue-600" />
        : <ArrowUpDown className="h-4 w-4 text-gray-400" />;
  };

  const filteredLeads = useMemo(() => {
    let result = [...leadsData];

    // Apply column filters
    if (columnFilters.length > 0) {
      result = result.filter(lead => 
        columnFilters.every(filter => {
          const value = lead[filter.column]?.toString().toLowerCase() || '';
          const filterValue = filter.value.toLowerCase();
          
          switch (filter.operator) {
            case 'contains':
              return value.includes(filterValue);
            case 'equals':
              return value === filterValue;
            case 'startsWith':
              return value.startsWith(filterValue);
            case 'endsWith':
              return value.endsWith(filterValue);
            default:
              return true;
          }
        })
      );
    }

    // Apply main filters
    if (filters.category) {
      result = result.filter(lead => lead.propertyCategory === filters.category);
    }
    if (filters.status) {
      result = result.filter(lead => lead.status === filters.status);
    }
    if (filters.source) {
      result = result.filter(lead => lead.source === filters.source);
    }

    // Apply global search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(lead =>
        Object.values(lead).some(value =>
          value?.toString().toLowerCase().includes(search)
        )
      );
    }

    // Apply sorting
    if (sortConfig.column && sortConfig.direction) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.column!]?.toString().toLowerCase() || '';
        const bVal = b[sortConfig.column!]?.toString().toLowerCase() || '';

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [leadsData, columnFilters, filters, searchTerm, sortConfig]);

  const ColumnFilterDropdown = ({ column }: { column: ColumnDef }) => {
    const currentFilter = columnFilters.find(f => f.column === column.id);
    const [localValue, setLocalValue] = useState(currentFilter?.value || '');
    const [operator, setOperator] = useState<ColumnFilter['operator']>(currentFilter?.operator || 'contains');

    const handleApplyFilter = () => {
      handleColumnFilter(column.id, localValue, operator);
      setActiveFilterColumn(null);
    };

    const handleClearFilter = () => {
      handleColumnFilter(column.id, '');
      setLocalValue('');
      setActiveFilterColumn(null);
    };

    if (!column.filterable) return null;

    return (
      <div className="relative inline-block">
        <button
          onClick={() => setActiveFilterColumn(activeFilterColumn === column.id ? null : column.id)}
          className={`p-1 rounded-md transition-colors ${
            currentFilter ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
          }`}
        >
          <Filter className={`h-4 w-4 ${currentFilter ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>

        {activeFilterColumn === column.id && (
          <div className="absolute z-50 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 right-0">
            <div className="space-y-4">
              {column.filterType === 'select' ? (
                <select
                  value={localValue}
                  onChange={(e) => setLocalValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select {column.label}</option>
                  {column.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Filter Type
                    </label>
                    <select
                      value={operator}
                      onChange={(e) => setOperator(e.target.value as ColumnFilter['operator'])}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="contains">Contains</option>
                      <option value="equals">Equals</option>
                      <option value="startsWith">Starts with</option>
                      <option value="endsWith">Ends with</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Filter Value
                    </label>
                    <input
                      type="text"
                      value={localValue}
                      onChange={(e) => setLocalValue(e.target.value)}
                      placeholder={`Filter ${column.label.toLowerCase()}...`}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-between pt-2">
                <button
                  onClick={handleClearFilter}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear
                </button>
                <div className="space-x-2">
                  <button
                    onClick={() => setActiveFilterColumn(null)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyFilter}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenReportDropdown(null);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalOpen(true);
  };

  const handleDownload = () => {
    const excelData = filteredLeads.map(lead => ({
      'ID': lead.id,
      'Property ID': lead.propertyId,
      'Name': lead.name,
      'Email': lead.email,
      'Phone': lead.phone,
      'Property Name': lead.propertyName,
      'Property Category': lead.propertyCategory,
      'Status': lead.status,
      'Source': lead.source,
      'Location': lead.location,
      'Created At': lead.createdAt,
      'Last Contact': lead.lastContact,
      'Notes': lead.notes
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    
    const currentDate = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `leads-${currentDate}.xlsx`);
  };

  const getCategoryColor = (category: Lead['propertyCategory']) => {
    switch (category) {
      case 'Apartment':
        return 'bg-blue-100 text-blue-800';
      case 'House':
        return 'bg-green-100 text-green-800';
      case 'Commercial':
        return 'bg-purple-100 text-purple-800';
      case 'Land':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReportClick = (leadId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenReportDropdown(openReportDropdown === leadId ? null : leadId);
  };

  const handleReportOption = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Reporting as ${option}`);
    setOpenReportDropdown(null);
  };

  const ReportButton = ({ leadId }: { leadId: number }) => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => handleReportClick(leadId, e)}
        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 whitespace-nowrap"
      >
        Report
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
          openReportDropdown === leadId ? 'rotate-180' : ''
        }`} />
      </button>
      {openReportDropdown === leadId && (
        <div className="fixed sm:absolute z-[100] sm:right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeIn">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Report User</h3>
            <p className="text-xs text-gray-500 mt-1">Select a reason for reporting</p>
          </div>
          <div className="py-1">
            <button
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2 group"
              onClick={(e) => handleReportOption('agent', e)}
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:bg-red-500 transition-colors" />
              Report user as agent
            </button>
            <button
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2 group"
              onClick={(e) => handleReportOption('fraud', e)}
            >
              <div className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors" />
              Report user as fraud
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const FilterButton = () => (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className={`h-4 w-4 ${Object.values(filters).some(v => v) ? 'text-blue-600' : 'text-gray-500'}`} />
        <span>Filters</span>
        <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
          {Object.values(filters).filter(v => v).length || '0'}
        </span>
      </button>

      {isFilterOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Filter Leads</h3>
            <p className="text-xs text-gray-500 mt-1">Refine your leads list</p>
          </div>

          <div className="p-3 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Property Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Categories</option>
                {Array.from(new Set(leadsData.map(lead => lead.propertyCategory))).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Statuses</option>
                {Array.from(new Set(leadsData.map(lead => lead.status).filter(Boolean))).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <select
                value={filters.source}
                onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">All Sources</option>
                {Array.from(new Set(leadsData.map(lead => lead.source).filter(Boolean))).map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="flex justify-between pt-2 border-t">
              <button
                onClick={() => setFilters({ category: '', status: '', source: '', dateRange: 'all' })}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold">Leads</h2>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <FilterButton />
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="hidden xs:inline">Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {columns.map(column => (
                  <th 
                    key={column.id}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span>{column.label}</span>
                        {column.sortable && (
                          <button
                            onClick={() => handleSort(column.id)}
                            className="p-1 hover:bg-gray-100 rounded-md"
                          >
                            {getSortIcon(column.id)}
                          </button>
                        )}
                      </div>
                      <ColumnFilterDropdown column={column} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead, index) => (
                <tr 
                  key={`${lead.id}-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">#{lead.propertyId}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.propertyName}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(lead.propertyCategory)}`}>
                      {lead.propertyCategory}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-green-100 text-green-800' :
                      lead.status === 'Follow Up' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{lead.source}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewLead(lead)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <ReportButton leadId={lead.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile and tablet screens */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredLeads.map((lead, index) => (
            <div key={ `${lead.id}-${index}`} className="p-4 space-y-3 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">#{lead.propertyId}</span>
                    <h3 className="text-sm font-medium text-gray-900">{lead.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">#{lead.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewLead(lead)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <ReportButton leadId={lead.id} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    {lead.email}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    {lead.phone}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Building2 className="h-3.5 w-3.5 mr-1.5" />
                    {lead.propertyName}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(lead.propertyCategory)}`}>
                      {lead.propertyCategory}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'New' ? 'bg-green-100 text-green-800' :
                      lead.status === 'Follow Up' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}