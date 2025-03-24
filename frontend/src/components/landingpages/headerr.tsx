"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const Headerr: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/Homepage")
  const navigate = useNavigate()

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

  // Set active link based on current path
  useEffect(() => {
    const path = window.location.pathname
    setActiveLink(path)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", path: "/Homepage" },
    { name: "Properties", path: "/Tenanthome" },
    { name: "For Owners", path: "/owner-page" },
    { name: "Blogs", path: "/Blogs" },
    { name: "About", path: "/Aboutus" },
    { name: "Contact", path: "/Contactus" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", path: "/Privacypolicy" },
    { name: "Terms & Conditions", path: "/Termsandconditions" },
    { name: "Tenancy Policy", path: "/Tenancypolicy" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-black py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/Homepage")}>
            <img src="./images/rentamigologou.png" alt="Rentamigo Logo" className="h-10 w-10 object-contain" />
            <span className={`text-2xl font-bold ml-1 ${scrolled ? "text-black" : "text-white"}`}>entamigo</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`font-medium transition-colors relative no-underline px-3 py-2 rounded-md ${
                      activeLink === link.path
                        ? scrolled
                          ? "text-white bg-black"
                          : "text-black bg-white"
                        : scrolled
                          ? "text-gray-800 hover:bg-gray-100"
                          : "text-white hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveLink(link.path)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/Login"
              className={`font-medium transition-colors no-underline px-4 py-2 rounded-md ${
                scrolled ? "text-white bg-black hover:bg-gray-800" : "text-black bg-white hover:bg-gray-200"
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${scrolled ? "text-black" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${scrolled ? "text-black" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className={`font-medium py-2 px-3 block transition-colors no-underline rounded-md ${
                      activeLink === link.path ? "bg-black text-white" : "text-gray-800 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveLink(link.path)
                      setIsMenuOpen(false)
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 my-2 pt-2">
                  <p className="text-sm text-gray-500 mb-2 px-3">Legal</p>
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="font-medium text-gray-800 hover:bg-gray-100 py-2 px-3 block transition-colors no-underline rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <Link
                    to="/Login"
                    className="font-medium bg-black text-white hover:bg-gray-800 transition-colors no-underline py-2 px-3 block rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Headerr


