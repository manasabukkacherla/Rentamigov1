"use client"

import Navbar from "@/components/Navbar"
import CreateBlogForm from "../../../CreateBlogForm"

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CreateBlogForm />
    </div>
  )
}

