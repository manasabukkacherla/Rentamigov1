"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react"

const Headerr: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isMenuOpen) {
      setActiveDropdown(null)
    }
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const navLinks = [
    {
      name: "Home",
      path: "/Homepage",
    },
    {
      name: "Properties",
      path: "/Tenanthome",
      dropdown: [
        { name: "All Properties", path: "/Tenanthome" },
        { name: "Apartments", path: "/Tenanthome?type=apartment" },
        { name: "Houses", path: "/Tenanthome?type=house" },
        { name: "Villas", path: "/Tenanthome?type=villa" },
      ],
    },
    {
      name: "For Owners",
      path: "/owner-page",
      dropdown: [
        { name: "List Property", path: "/owner-page" },
        { name: "Owner Dashboard", path: "/owner-dashboard" },
        { name: "Pricing", path: "/pricing" },
      ],
    },
    { name: "Blogs", path: "/Blogs" },
    { name: "About", path: "/Aboutus" },
    { name: "Contact", path: "/Contactus" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", path: "/Privacypolicy" },
    { name: "Terms & Conditions", path: "/Termsandconditions" },
    { name: "Tenancy Policy", path: "/Tenancypolicy" },
  ]

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  }

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3 },
    },
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center cursor-pointer z-20"
            onClick={() => navigate("/Homepage")}
          >
            <img src="./images/rentamigologou.png" alt="Rentamigo Logo" className="h-10 w-10 object-contain" />
            <span className={`text-2xl font-bold ml-1 ${scrolled || isMenuOpen ? "text-black" : "text-white"}`}>
              entamigo
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`font-medium transition-colors flex items-center ${
                        location.pathname === link.path
                          ? "text-black"
                          : scrolled
                            ? "text-gray-800 hover:text-black"
                            : "text-white hover:text-gray-200"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={dropdownVariants}
                          className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                        >
                          {link.dropdown.map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors relative ${
                      location.pathname === link.path
                        ? "text-black"
                        : scrolled
                          ? "text-gray-800 hover:text-black"
                          : "text-white hover:text-gray-200"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="desktopUnderline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Link
                to="/Login"
                className={`font-medium transition-colors flex items-center ${
                  scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-200"
                }`}
              >
                <LogIn className="mr-1 h-4 w-4" />
                Sign In
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/Signup"
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <User className="mr-1 h-4 w-4" />
                Sign Up
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden z-20 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? "text-black" : "text-white"}`} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full overflow-hidden z-10"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div key={index} variants={mobileNavItemVariants} className="py-2">
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className="font-medium text-gray-800 hover:text-black w-full text-left flex items-center justify-between"
                        >
                          {link.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={dropdownVariants}
                              className="mt-2 ml-4 space-y-1 border-l-2 border-gray-200 pl-4"
                            >
                              {link.dropdown.map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  className="block py-2 text-gray-600 hover:text-black transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={`font-medium block transition-colors ${
                          location.pathname === link.path ? "text-black font-bold" : "text-gray-800 hover:text-black"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div variants={mobileNavItemVariants} className="border-t border-gray-200 my-2 pt-2">
                  <p className="text-sm text-gray-500 mb-2">Legal</p>
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="font-medium text-gray-800 hover:text-black py-2 block transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>

                <motion.div
                  variants={mobileNavItemVariants}
                  className="flex flex-col space-y-3 pt-2 border-t border-gray-200"
                >
                  <Link
                    to="/Login"
                    className="font-medium text-black hover:text-gray-700 transition-colors flex items-center"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </Link>
                  <Link
                    to="/Signup"
                    className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Sign Up
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Headerr

