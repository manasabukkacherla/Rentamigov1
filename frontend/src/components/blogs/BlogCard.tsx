import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>By {blog.author.name}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center">
              <ThumbsDown className="h-4 w-4 mr-1" />
              <span>{blog.dislikes}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{blog.comments.length}</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{blog.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;