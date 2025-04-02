// import React, { useState } from 'react';
// import { Clock, ArrowRight, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

// interface BlogPost {
//   id: number;
//   title: string;
//   excerpt: string;
//   image: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   date: string;
//   readTime: string;
//   category: string;
//   featured?: boolean;
//   tags?: string[];
// }

// const articles: BlogPost[] = [
//   {
//     id: 1,
//     title: "The Future of Smart Homes: Integration of AI in Modern Living",
//     excerpt: "Discover how artificial intelligence is revolutionizing home automation and enhancing living experiences.",
//     image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
//     author: {
//       name: "Sarah Chen",
//       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
//     },
//     date: "Mar 15, 2024",
//     readTime: "5 min read",
//     category: "Technology",
//     featured: true,
//     tags: ["Smart Home", "AI", "IoT"]
//   },
//   {
//     id: 2,
//     title: "Sustainable Architecture: Building for Tomorrow",
//     excerpt: "Exploring eco-friendly building practices and their impact on modern real estate development.",
//     image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
//     author: {
//       name: "Michael Roberts",
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
//     },
//     date: "Mar 14, 2024",
//     readTime: "4 min read",
//     category: "Architecture",
//     tags: ["Sustainability", "Green Building", "Eco-friendly"]
//   },
//   {
//     id: 3,
//     title: "Investment Guide: Navigating the Real Estate Market in 2024",
//     excerpt: "Expert insights on market trends and investment opportunities in the current real estate landscape.",
//     image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
//     author: {
//       name: "Emily Thompson",
//       avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
//     },
//     date: "Mar 13, 2024",
//     readTime: "6 min read",
//     category: "Investment",
//     featured: true,
//     tags: ["Investment", "Market Trends", "Finance"]
//   },
//   {
//     id: 4,
//     title: "Interior Design Trends That Will Dominate 2024",
//     excerpt: "From minimalist aesthetics to bold color choices, discover the interior design trends that will shape homes this year.",
//     image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
//     author: {
//       name: "Jessica Wang",
//       avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
//     },
//     date: "Mar 10, 2024",
//     readTime: "4 min read",
//     category: "Design",
//     tags: ["Interior Design", "Home Decor", "Trends"]
//   }
// ];

// export const LatestInsights: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(0);
  
//   const categories = Array.from(new Set(articles.map(article => article.category)));
  
//   const filteredArticles = activeCategory 
//     ? articles.filter(article => article.category === activeCategory)
//     : articles;
    
//   const featuredArticle = articles.find(article => article.featured);
//   const regularArticles = filteredArticles.filter(article => article.id !== featuredArticle?.id);
  
//   const articlesPerPage = 3;
//   const totalPages = Math.ceil(regularArticles.length / articlesPerPage);
//   const displayedArticles = regularArticles.slice(
//     currentPage * articlesPerPage, 
//     (currentPage + 1) * articlesPerPage
//   );

//   return (
//     <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
//             Latest Insights
//             <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gray-900 rounded-full"></span>
//           </h2>
//           <p className="text-gray-600 mt-3">Stay updated with the latest trends in real estate</p>
//         </div>
        
//         <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
//           <button 
//             className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
//               activeCategory === null 
//                 ? 'bg-gray-900 text-white' 
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//             onClick={() => setActiveCategory(null)}
//           >
//             All
//           </button>
//           {categories.map(category => (
//             <button
//               key={category}
//               className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
//                 activeCategory === category 
//                   ? 'bg-gray-900 text-white' 
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               onClick={() => setActiveCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {featuredArticle && !activeCategory && (
//         <div className="mb-10 group">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//             <div className="relative aspect-video md:aspect-auto overflow-hidden">
//               <img
//                 src={featuredArticle.image}
//                 alt={featuredArticle.title}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
//               <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
//                 Featured
//               </div>
//             </div>
            
//             <div className="p-6 md:p-8 flex flex-col justify-between">
//               <div>
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
//                     {featuredArticle.category}
//                   </span>
//                   <div className="flex items-center text-gray-500 text-sm">
//                     <Clock className="w-4 h-4 mr-1" />
//                     {featuredArticle.readTime}
//                   </div>
//                 </div>

//                 <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
//                   {featuredArticle.title}
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {featuredArticle.excerpt}
//                 </p>
                
//                 {featuredArticle.tags && (
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {featuredArticle.tags.map(tag => (
//                       <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
//                         <Tag className="w-3 h-3" />
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                 <div className="flex items-center gap-3">
//                   <img 
//                     src={featuredArticle.author.avatar} 
//                     alt={featuredArticle.author.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900">{featuredArticle.author.name}</p>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Calendar className="w-3 h-3 mr-1" />
//                       {featuredArticle.date}
//                     </div>
//                   </div>
//                 </div>
//                 <button className="flex items-center gap-2 text-gray-900 group-hover:text-gray-600 transition-colors">
//                   <span className="text-sm font-medium">Read More</span>
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {displayedArticles.map((article) => (
//           <article
//             key={article.id}
//             className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
//           >
//             <div className="relative aspect-video overflow-hidden">
//               <img
//                 src={article.image}
//                 alt={article.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//               {article.featured && (
//                 <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
//                   Featured
//                 </div>
//               )}
//             </div>
            
//             <div className="p-6 flex flex-col flex-grow">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
//                   {article.category}
//                 </span>
//                 <div className="flex items-center text-gray-500 text-sm">
//                   <Clock className="w-4 h-4 mr-1" />
//                   {article.readTime}
//                 </div>
//               </div>

//               <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
//                 {article.title}
//               </h3>
//               <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
//                 {article.excerpt}
//               </p>

//               <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
//                 <div className="flex items-center gap-2">
//                   <img 
//                     src={article.author.avatar} 
//                     alt={article.author.name}
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-medium text-gray-900 text-sm">{article.author.name}</p>
//                     <p className="text-xs text-gray-500">{article.date}</p>
//                   </div>
//                 </div>
//                 <button className="flex items-center gap-1 text-gray-900 group-hover:text-gray-600 transition-colors">
//                   <span className="text-sm font-medium">Read</span>
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
      
//       {totalPages > 1 && (
//         <div className="flex justify-between items-center mt-8">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
//             disabled={currentPage === 0}
//             className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
//               currentPage === 0 
//                 ? 'text-gray-400 cursor-not-allowed' 
//                 : 'text-gray-900 hover:bg-gray-100'
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4" />
//             <span>Previous</span>
//           </button>
          
//           <div className="flex gap-2">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentPage(index)}
//                 className={`w-8 h-8 rounded-full ${
//                   currentPage === index 
//                     ? 'bg-gray-900 text-white' 
//                     : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
          
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
//             disabled={currentPage === totalPages - 1}
//             className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
//               currentPage === totalPages - 1 
//                 ? 'text-gray-400 cursor-not-allowed' 
//                 : 'text-gray-900 hover:bg-gray-100'
//             }`}
//           >
//             <span>Next</span>
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       )}
      
//       <div className="flex justify-center mt-10">
//         <button className="group flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg border border-gray-200">
//           <span className="font-medium">View All Articles</span>
//           <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//         </button>
//       </div>
//     </div>
//   );
// };






"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Clock, ArrowRight, Calendar, Tag, ChevronLeft, ChevronRight, Search, BookOpen } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  category: string
  featured?: boolean
  tags?: string[]
}

const articles: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Smart Homes: Integration of AI in Modern Living",
    excerpt:
      "Discover how artificial intelligence is revolutionizing home automation and enhancing living experiences.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    date: "Mar 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    featured: true,
    tags: ["Smart Home", "AI", "IoT"],
  },
  {
    id: 2,
    title: "Sustainable Architecture: Building for Tomorrow",
    excerpt: "Exploring eco-friendly building practices and their impact on modern real estate development.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    author: {
      name: "Michael Roberts",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    date: "Mar 14, 2024",
    readTime: "4 min read",
    category: "Architecture",
    tags: ["Sustainability", "Green Building", "Eco-friendly"],
  },
  {
    id: 3,
    title: "Investment Guide: Navigating the Real Estate Market in 2024",
    excerpt: "Expert insights on market trends and investment opportunities in the current real estate landscape.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    author: {
      name: "Emily Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    date: "Mar 13, 2024",
    readTime: "6 min read",
    category: "Investment",
    featured: true,
    tags: ["Investment", "Market Trends", "Finance"],
  },
  {
    id: 4,
    title: "Interior Design Trends That Will Dominate 2024",
    excerpt:
      "From minimalist aesthetics to bold color choices, discover the interior design trends that will shape homes this year.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    author: {
      name: "Jessica Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
    date: "Mar 10, 2024",
    readTime: "4 min read",
    category: "Design",
    tags: ["Interior Design", "Home Decor", "Trends"],
  },
  {
    id: 5,
    title: "The Rise of Co-living Spaces in Urban Areas",
    excerpt: "How co-living is changing the way young professionals live in expensive city centers.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    date: "Mar 8, 2024",
    readTime: "7 min read",
    category: "Lifestyle",
    tags: ["Co-living", "Urban Living", "Real Estate Trends"],
  },
  {
    id: 6,
    title: "Commercial Real Estate: Post-Pandemic Recovery and Opportunities",
    excerpt: "Analysis of how commercial properties are adapting to new work patterns and economic conditions.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
    author: {
      name: "Robert Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    date: "Mar 5, 2024",
    readTime: "8 min read",
    category: "Commercial",
    tags: ["Commercial Real Estate", "Office Space", "Retail"],
  },
]

export const LatestInsights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const featuredSliderRef = useRef<HTMLDivElement>(null)
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)

  const categories = Array.from(new Set(articles.map((article) => article.category)))

  // Filter articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesCategory = activeCategory === null || article.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Get featured articles
  const featuredArticles = articles.filter((article) => article.featured)

  // Get regular articles (non-featured or all if filtering)
  const regularArticles =
    activeCategory || searchQuery ? filteredArticles : filteredArticles.filter((article) => !article.featured)

  const articlesPerPage = 3
  const totalPages = Math.ceil(regularArticles.length / articlesPerPage)
  const displayedArticles = regularArticles.slice(currentPage * articlesPerPage, (currentPage + 1) * articlesPerPage)

  // Handle featured slider navigation
  const navigateFeatured = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentFeaturedIndex((prev) => (prev === 0 ? featuredArticles.length - 1 : prev - 1))
    } else {
      setCurrentFeaturedIndex((prev) => (prev === featuredArticles.length - 1 ? 0 : prev + 1))
    }
  }

  // Auto-rotate featured articles
  useEffect(() => {
    if (featuredArticles.length <= 1) return

    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev === featuredArticles.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredArticles.length])

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1 relative inline-block">
            Latest Insights
            <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gray-900 rounded-full"></span>
          </h2>
          <p className="text-gray-600 text-sm">Stay updated with the latest trends in real estate</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className={`bg-white border ${isSearchFocused ? "border-gray-400 ring-2 ring-gray-100" : "border-gray-200"} text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 transition-all`}
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === null ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === category ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles Slider */}
      {featuredArticles.length > 0 && !activeCategory && !searchQuery && (
        <div className="mb-10 relative">
          <div ref={featuredSliderRef} className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentFeaturedIndex * 100}%)` }}
            >
              {featuredArticles.map((article) => (
                <div key={article.id} className="w-full flex-shrink-0">
                  <div className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full">
                    <div className="relative aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg?height=400&width=600"}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                        Featured
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-900 text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                          <div className="flex items-center text-gray-500 text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                        {article.tags && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar || "/placeholder.svg?height=50&width=50"}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{article.author.name}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {article.date}
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-gray-900 group-hover:text-gray-600 transition-colors">
                          <span className="text-xs font-medium">Read More</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider controls */}
          {featuredArticles.length > 1 && (
            <>
              <button
                onClick={() => navigateFeatured("prev")}
                className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
                aria-label="Previous article"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => navigateFeatured("next")}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
                aria-label="Next article"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {featuredArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeaturedIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentFeaturedIndex === index ? "bg-gray-900 w-4" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Regular Articles Grid */}
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-[380px]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg?height=200&width=300"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {article.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-full flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-3 flex-grow">{article.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar || "/placeholder.svg?height=50&width=50"}
                      className="w-6 h-6 rounded-full object-cover"
                      alt={article.author.name}
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-xs">{article.author.name}</p>
                      <p className="text-xs text-gray-500">{article.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-gray-900 group-hover:text-gray-600 transition-colors">
                    <span className="text-xs font-medium">Read</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-1">No articles found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
              currentPage === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-7 h-7 rounded-full text-xs ${
                  currentPage === index ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm ${
              currentPage === totalPages - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <button className="group flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors bg-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md border border-gray-200 text-sm">
          <span className="font-medium">View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}


















// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Search, ChevronRight, ArrowRight, Clock, User, CalendarDays } from "lucide-react"

// const insights = [
//   {
//     id: 1,
//     title: "The Impact of Remote Work on Real Estate Trends",
//     excerpt:
//       "As remote work becomes more prevalent, we're seeing a shift in housing preferences. Learn how this trend is affecting property values in different neighborhoods.",
//     author: "Jane Smith",
//     date: "2024-02-15",
//     readTime: "5 min read",
//     category: "Market Trends",
//     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500",
//   },
//   {
//     id: 2,
//     title: "Investment Opportunities in Emerging Neighborhoods",
//     excerpt:
//       "Discover which up-and-coming areas are showing promise for real estate investors. We analyze growth patterns and development plans.",
//     author: "Michael Johnson",
//     date: "2024-02-10",
//     readTime: "7 min read",
//     category: "Investment",
//     image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=500",
//   },
//   {
//     id: 3,
//     title: "Sustainable Housing: The Future of Real Estate",
//     excerpt:
//       "Eco-friendly homes are becoming increasingly popular. Learn about sustainable building practices and how they impact property values.",
//     author: "Sarah Williams",
//     date: "2024-02-05",
//     readTime: "6 min read",
//     category: "Sustainability",
//     image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=500",
//   },
//   {
//     id: 4,
//     title: "Navigating the Mortgage Process in 2024",
//     excerpt:
//       "Interest rates are changing. Here's what you need to know about securing a mortgage in the current financial landscape.",
//     author: "David Brown",
//     date: "2024-01-28",
//     readTime: "8 min read",
//     category: "Finance",
//     image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
//   },
// ]

// const categories = ["All", "Market Trends", "Investment", "Sustainability", "Finance", "Legal"]

// export const LatestInsights: React.FC = () => {
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredInsights = insights.filter((insight) => {
//     // Filter by search query
//     if (
//       searchQuery &&
//       !insight.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !insight.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
//     ) {
//       return false
//     }

//     // Filter by category
//     if (activeCategory !== "All" && insight.category !== activeCategory) {
//       return false
//     }

//     return true
//   })

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//       <div className="p-6 border-b border-gray-100">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-1">Latest Insights</h2>
//             <p className="text-gray-600 text-sm">Stay updated with the latest real estate trends</p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {categories.slice(0, 5).map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
//                   activeCategory === category ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Search bar - positioned below the title */}
//         <div className="relative mt-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search insights..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       {filteredInsights.length > 0 ? (
//         <div className="divide-y divide-gray-100">
//           {filteredInsights.map((insight) => (
//             <div key={insight.id} className="p-6 hover:bg-gray-50 transition-colors">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/4 flex-shrink-0">
//                   <div className="aspect-[4/3] rounded-lg overflow-hidden">
//                     <img
//                       src={insight.image || "/placeholder.svg"}
//                       alt={insight.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
//                       {insight.category}
//                     </span>
//                     <div className="flex items-center gap-1 text-gray-500 text-xs">
//                       <Clock className="w-3.5 h-3.5" />
//                       <span>{insight.readTime}</span>
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{insight.title}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">{insight.excerpt}</p>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
//                         <User className="w-4 h-4 text-gray-600" />
//                       </div>
//                       <div className="text-sm">
//                         <span className="font-medium text-gray-900">{insight.author}</span>
//                         <div className="flex items-center gap-1 text-gray-500 text-xs">
//                           <CalendarDays className="w-3.5 h-3.5" />
//                           <span>
//                             {new Date(insight.date).toLocaleDateString("en-US", {
//                               year: "numeric",
//                               month: "short",
//                               day: "numeric",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium">
//                       <span>Read More</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="p-8 text-center">
//           <p className="text-gray-500">No insights match your search criteria.</p>
//         </div>
//       )}

//       <div className="p-6 bg-gray-50 border-t border-gray-100">
//         <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors group">
//           <span>View All Insights</span>
//           <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//         </button>
//       </div>
//     </div>
//   )
// }

