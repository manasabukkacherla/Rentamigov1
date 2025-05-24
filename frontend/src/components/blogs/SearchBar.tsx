import { Search, Tag, X } from 'lucide-react';
import React, { useState } from 'react'

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
  }

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchQuery, 
    setSearchQuery, 
    selectedTags, 
    setSelectedTags 
  }) => {

    const [isTagsOpen, setIsTagsOpen] = useState(false);
  
  const popularTags = [
    "apartment", "2bhk", "3bhk", "penthouse", "studio", 
    "house", "villa", "luxury", "budget", "family", 
    "pet-friendly", "furnished", "city living", "suburban"
  ];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  return (
    <div className="bg-white py-6 shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
        <div className="relative max-w-3xl mx-auto">
        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-black transition">
        <div className="pl-4">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for blogs by title or content..."
              className="w-full py-3 px-4 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 transition"
              onClick={() => setIsTagsOpen(!isTagsOpen)}
            >
              <div className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                <span>Tags</span>
              </div>
            </button>
        </div>

        {selectedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center bg-gray-100 text-black px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-black hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

{isTagsOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-30">
              <h3 className="text-lg font-semibold mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedTags.includes(tag)
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
    </div>
  )
}

export default SearchBar