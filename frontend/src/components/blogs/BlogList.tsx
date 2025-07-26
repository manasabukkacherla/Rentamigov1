import React, { useEffect, useRef, useState } from 'react'
import BlogCardS from './BlogCardS';

interface Blog {
  _id: string,
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
  author: User;
  likes: number;
  views: number;
  shares: 0;
  comments: Comment[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  userHasLiked: boolean;
}

interface Comment {
  _id: string;
  author: User;
  comment: string;
  createdAt: string;
  likes: string[];
}

interface User {
  _id: string;
  fullName: string;
}

interface Review {
  _id: string;
  author: User;
  comment: string;
  rating: number;
  createdAt: string;
  likes: string[];
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || blogs.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= blogs.length - 2 ? 0 : nextIndex; // Ensure the slider wraps around
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, blogs.length]);

  console.log(blogs)

  // Pause auto-slide on hover
  const handleMouseEnter = () => setAutoSlide(false);
  const handleMouseLeave = () => setAutoSlide(true);

  // Manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? 0 : nextIndex; // Prevent going below 0
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= blogs.length - 2 ? blogs.length - 3 : nextIndex; // Prevent going beyond the last slide
    });
  };

  // Update slider position
  useEffect(() => {
    if (sliderRef.current && blogs.length > 3) {
      const cardWidth = sliderRef.current.offsetWidth / 3;
      sliderRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex, blogs.length]);

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-medium text-gray-600">No blogs found matching your criteria</h3>
        <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  // For small number of blogs, use regular grid
  if (blogs.length <= 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <BlogCardS key={blog._id} blog={blog} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ width: `${blogs.length * 33.33}%` }}
      >
        {blogs.map(blog => (
          <div key={blog._id} className="w-1/3 px-4">
            <BlogCardS blog={blog} />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow-md z-10 hover:bg-opacity-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentIndex < blogs.length - 3 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-3 rounded-full shadow-md z-10 hover:bg-opacity-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BlogList;