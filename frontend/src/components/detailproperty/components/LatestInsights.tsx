import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Author {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  image?: string;
  // Add other author fields as needed
}

interface Blogs {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    media: {
        coverImage: string;
        images?: string[];
    };
    tags: string[];
    category: string;
    readTime: number;
    author: Author | string; // Handle both string ID and populated author object
    likes: number;
    views: number;
    shares: number;
    comments: string[];
    reviews: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const LatestInsights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [myBlogs, setMyBlogs] = useState<Blogs[]>([]);
  const [randomBlog, setRandomBlog] = useState<Blogs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRandomBlog = () => {
    if (myBlogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * myBlogs.length);
      setRandomBlog(myBlogs[randomIndex]);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/api/blog/');
        const data = response.data.data;
        setMyBlogs(data);
        handleRandomBlog();
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(myBlogs.map(article => article.category)));
  
  const filteredArticles = activeCategory 
    ? myBlogs.filter(article => article.category === activeCategory)
    : myBlogs;
    
  const featuredArticle = randomBlog;
  console.log(featuredArticle);
  const articlesPerPage = 3;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const displayedArticles = filteredArticles.slice(
    currentPage * articlesPerPage, 
    (currentPage + 1) * articlesPerPage
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
            Latest Insights
            <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-gray-900 rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-3">Stay updated with the latest trends in real estate</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button 
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {featuredArticle && !activeCategory && (
        <div className="mb-10 group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="relative aspect-video md:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.media.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                Featured
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {featuredArticle.readTime} min read
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredArticle.excerpt}
                </p>
                
                {featuredArticle.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  {typeof featuredArticle.author !== 'string' && featuredArticle.author?.image ? (
                    <img 
                      src={featuredArticle.author.image} 
                      alt={featuredArticle.author.fullName || 'Author'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {typeof featuredArticle.author === 'string' ? 'Author' : (featuredArticle.author?.fullName || 'Unknown Author')}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(featuredArticle.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-gray-900 group-hover:text-gray-600 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedArticles.map((article) => (
          <article
            key={article._id}
            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={article.media.coverImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {randomBlog && randomBlog._id === article._id && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gray-900 text-white text-sm font-medium rounded-full">
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readTime} min read
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                <div className="flex items-center gap-2">
                  {typeof article.author !== 'string' && article.author?.image ? (
                    <img 
                      src={article.author.image} 
                      alt={typeof article.author === 'string' ? 'Author' : (article.author.fullName || 'Author')}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {typeof article.author === 'string' ? 'Author' : (article.author?.fullName || 'Unknown Author')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-gray-900 group-hover:text-gray-600 transition-colors">
                  <span className="text-sm font-medium">Read</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              currentPage === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === index 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
              currentPage === totalPages - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="flex justify-center mt-10">
        <button onClick={() => navigate('/blogs')} className="group flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg border border-gray-200">
          <span className="font-medium">View All Articles</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};