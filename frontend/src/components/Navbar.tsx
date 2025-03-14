"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "text-black font-medium" : "text-gray-600 hover:text-black"
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-black">
              YourBrand
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/" className={`px-3 py-2 ${isActive("/")}`}>
                Home
              </Link>
              {/* Add your other navigation links */}
              {/* <Link to="/about" className={`px-3 py-2 ${isActive('/about')}`}>
                About
              </Link>
              <Link to="/contact" className={`px-3 py-2 ${isActive('/contact')}`}>
                Contact
              </Link> */}

              {/* Blog section link */}
              <Link to="/blogs" className={`px-3 py-2 ${isActive("/blogs")}`}>
                Blogs
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md ${isActive("/") ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {/* Add your other mobile navigation links */}
            {/* <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md ${isActive('/about') ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md ${isActive('/contact') ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link> */}

            {/* Blog section link */}
            <Link
              to="/blogs"
              className={`block px-3 py-2 rounded-md ${isActive("/blogs") ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

