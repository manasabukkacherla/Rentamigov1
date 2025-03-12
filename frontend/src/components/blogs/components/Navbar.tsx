"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  PenSquare,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Tag,
  User,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Categories for the dropdown
  const categories = [
    { name: "Lifestyle", path: "/blogs?category=Lifestyle" },
    { name: "Luxury", path: "/blogs?category=Luxury" },
    { name: "Urban", path: "/blogs?category=Urban" },
    { name: "Rural", path: "/blogs?category=Rural" },
    { name: "Suburban", path: "/blogs?category=Suburban" },
    { name: "Coastal", path: "/blogs?category=Coastal" },
    { name: "Historic", path: "/blogs?category=Historic" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsBlogsDropdownOpen(false);
      setIsUserDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleBlogsDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBlogsDropdownOpen(!isBlogsDropdownOpen);
    setIsUserDropdownOpen(false);
  };

  const toggleUserDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsBlogsDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">BlogHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-black">
              Home
            </Link>

            {/* Blogs Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                className="flex items-center text-gray-700 hover:text-black"
                onClick={toggleBlogsDropdown}
              >
                Blogs
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isBlogsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isBlogsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      to="/blogs"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsBlogsDropdownOpen(false)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      All Blogs
                    </Link>

                    <Link
                      to="/blogs/create"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsBlogsDropdownOpen(false)}
                    >
                      <PenSquare className="h-4 w-4 mr-2" />
                      Create Blog
                    </Link>

                    <div className="px-4 py-2 font-medium text-sm text-gray-500">
                      Categories
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsBlogsDropdownOpen(false)}
                        >
                          <Tag className="h-4 w-4 mr-2" />
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/editor" className="text-gray-700 hover:text-black">
              Editor
            </Link>

            <Link to="/dashboard" className="text-gray-700 hover:text-black">
              Dashboard
            </Link>
          </div>

          {/* Right side - Search and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/blogs")}
              className="p-2 text-gray-700 hover:text-black"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center" onClick={toggleUserDropdown}>
                <User className="h-8 w-8" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-100">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-700 hover:text-black">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
