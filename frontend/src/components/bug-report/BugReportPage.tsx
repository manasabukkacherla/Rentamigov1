"use client"

import { useEffect } from "react"
import BugReportForm from "./BugReportForm"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Headerr from "../landingpages/headerr"
import Footer from "../landingpages/Footer"

const BugReportPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Set page title
    document.title = "Report a Bug - Propamigo"

    return () => {
      // Reset title when component unmounts
      document.title = "Propamigo"
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Headerr />

      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>

          <BugReportForm />

          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Need immediate assistance?</h3>
            <p className="text-gray-600">
              For urgent issues, please contact our support team directly at{" "}
              <a href="mailto:support@rentamigo.com" className="text-black font-medium hover:underline">
                support@rentamigo.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BugReportPage

