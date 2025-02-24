import React, { useState } from 'react';
import { Sidebar } from '../Propertyforms/Sidebar/Sidebar';
import { PropertyForm } from '../Propertyforms/Resendtial/PropertyForm';
import { Menu, X } from 'lucide-react';

function Propertyy() {
  const [propertyType, setPropertyType] = useState('residential');
  const [listingType, setListingType] = useState('rent');
  const [propertyCategory, setPropertyCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center h-16 px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="ml-4">
            <h1 className="text-lg font-semibold text-gray-900">Post Property</h1>
            <p className="text-sm text-gray-500">Step 1 of 5</p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:relative lg:block transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div className="relative h-full">
          <div className="absolute top-0 right-0 pt-4 pr-4 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:overflow-y-auto">
        <PropertyForm
          propertyType={propertyType}
          listingType={listingType}
          propertyCategory={propertyCategory}
          transactionType={transactionType}
          onPropertyTypeChange={setPropertyType}
          onListingTypeChange={setListingType}
          onPropertyCategoryChange={setPropertyCategory}
          onTransactionTypeChange={setTransactionType}
        />
      </div>
    </div>
  );
}

export default Propertyy;