import React from 'react';
import { Blog } from '../types';
import BlogCard from './BlogCard';

interface TopicPicksProps {
  blogs: Blog[];
}

const TopicPicks: React.FC<TopicPicksProps> = ({ blogs }) => {
  // Sort blogs by rating (highest first)
  const sortedBlogs = [...blogs].sort((a, b) => b.rating - a.rating);
  
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Topic Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicPicks;