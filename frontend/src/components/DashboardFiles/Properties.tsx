import React, { useState, Fragment } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useNavigate } from 'react-router-dom';
interface Property {
  id: number;
  image: string;
  title: string;
  address: string;
  price: string;
  status: 'Occupied' | 'Available' | 'Maintenance';
}

const initialProperties: Property[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "Modern Apartment",
    address: "123 Main St, Suite 4B",
    price: "$2,500/month",
    status: "Occupied"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    title: "Luxury Condo",
    address: "456 Park Ave, Unit 12",
    price: "$3,200/month",
    status: "Available"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    title: "Family Home",
    address: "789 Oak Rd",
    price: "$4,000/month",
    status: "Maintenance"
  }
];

export function Properties() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleStatusChange = (propertyId: number, newStatus: Property['status']) => {
    setProperties(properties.map(property =>
      property.id === propertyId
        ? { ...property, status: newStatus }
        : property
    ));
  };

  const confirmDelete = () => {
    if (selectedProperty) {
      setProperties(properties.filter(p => p.id !== selectedProperty.id));
      setIsDeleteModalOpen(false);
      setSelectedProperty(null);
    }
  };

  const handleSaveEdit = () => {
    if (selectedProperty) {
      setProperties(properties.map(p => 
        p.id === selectedProperty.id 
          ? { ...p, ...editForm }
          : p
      ));
      setIsEditModalOpen(false);
      setSelectedProperty(null);
    }
  };
  const navigate = useNavigate(); // Initialize navigation
  return (
    <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4 lg:p-6">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Properties</h2>
            <button
            onClick={() => navigate('/property-listing-form')} // Navigate to the form page
            className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Property
          </button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="p-2 sm:p-4 lg:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-3 sm:p-4">
                  {/* Property Info */}
                  <div className="flex-grow space-y-2">
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-1">
                      {property.address}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600 text-sm sm:text-base">
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
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Status Dropdown */}
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusChange(property.id, e.target.value as Property['status'])}
                        className="w-full sm:w-auto text-xs sm:text-sm px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleEdit(property)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="whitespace-nowrap">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(property)}
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="whitespace-nowrap">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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