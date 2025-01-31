import React, { useState, Fragment } from 'react';
import { Pencil, Trash2, X, Search, Filter } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import type { Property } from './CommonDashboard';

interface PropertiesProps {
  properties: Property[];
  onUpdateProperty: (property: Property) => void;
  onDeleteProperty: (id: number) => void;
  onStatusChange: (id: number, status: Property['status']) => void;
}

export function Properties({ 
  properties, 
  onUpdateProperty, 
  onDeleteProperty, 
  onStatusChange 
}: PropertiesProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Property['status'] | ''>('');
  const [editForm, setEditForm] = useState({
    title: '',
    address: '',
    price: '',
    status: 'Available' as Property['status']
  });

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setEditForm({
      title: property.title,
      address: property.address,
      price: property.price,
      status: property.status
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (property: Property) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProperty) {
      onDeleteProperty(selectedProperty.id);
      setIsDeleteModalOpen(false);
      setSelectedProperty(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedProperty) {
      const updatedProperty = {
        ...selectedProperty,
        ...editForm
      };
      onUpdateProperty(updatedProperty);
      setIsEditModalOpen(false);
      setSelectedProperty(null);
    }
  };

  // Filter properties based on search term and status
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? property.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4 lg:p-6">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Properties</h2>
              <div className="flex flex-1 gap-2 max-w-md">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Property['status'] | '')}
                    className="appearance-none pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                  >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  <Filter className={`absolute left-3 top-2.5 h-4 w-4 ${
                    statusFilter ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <div className="absolute right-3 top-2.5 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto text-xs sm:text-sm lg:text-base px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add New Property
            </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="p-2 sm:p-4 lg:p-6">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredProperties.map((property) => (
                <div 
                  key={property.id} 
                  className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-3 sm:p-4">
                    {/* Property Info */}
                    <div className="flex-grow space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">
                        {property.address}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600 text-sm sm:text-base group-hover:text-blue-700">
                          {property.price}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.status === 'Occupied' 
                            ? 'bg-green-100 text-green-800'
                            : property.status === 'Available'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {/* Status Dropdown */}
                        <select
                          value={property.status}
                          onChange={(e) => onStatusChange(property.id, e.target.value as Property['status'])}
                          className="w-full text-xs sm:text-sm px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-blue-300 transition-colors"
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-105"
                          >
                            <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(property)}
                            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 text-xs sm:text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-105"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsEditModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <Dialog.Title className="text-lg sm:text-xl font-bold">
                        Edit Property
                      </Dialog.Title>
                      <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Property['status'] })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="w-full sm:w-auto px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDeleteModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-red-100 rounded-full">
                        <Trash2 className="h-6 w-6 text-red-600" />
                      </div>
                      <Dialog.Title className="mt-4 text-lg font-semibold">
                        Delete Property
                      </Dialog.Title>
                      <Dialog.Description className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete this property? This action cannot be undone.
                      </Dialog.Description>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="w-full sm:w-auto px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Property
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}