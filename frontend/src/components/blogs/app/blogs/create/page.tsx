"use client"

import Navbar from "@/components/Navbar"
import CreateBlogForm from "@/components/CreateBlogForm"
import HomeFooter from "@/components/HomeFooter"

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CreateBlogForm />
      <HomeFooter />
    </div>
  )
}

