import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  PenSquare,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAuthDropdown = () => setIsAuthDropdownOpen(!isAuthDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsAuthDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-black">
              Rentamigo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center"
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>

            <Link
              to="/create"
              className="ml-3 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center"
            >
              <PenSquare className="h-5 w-5 mr-1" />
              Create a blog
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="ml-3 px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md flex items-center"
              >
                <User className="h-5 w-5 mr-1" />
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  onClick={toggleAuthDropdown}
                  className="flex items-center px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 rounded-md"
                >
                  <User className="h-5 w-5 mr-1" />
                  {user?.username || "Account"}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-3 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md flex items-center"
              >
                <LogIn className="h-5 w-5 mr-1" />
                Login/Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
