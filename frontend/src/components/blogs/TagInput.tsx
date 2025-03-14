"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Tag, Plus, X } from "lucide-react"

interface TagInputProps {
  tags: string[]
  currentTag: string
  onTagChange: (value: string) => void
  onAddTag: () => void
  onRemoveTag: (tag: string) => void
  error?: string
}

const TagInput: React.FC<TagInputProps> = ({ tags, currentTag, onTagChange, onAddTag, onRemoveTag, error }) => {
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Popular tags for suggestions
  const popularTags = [
    "apartment",
    "2bhk",
    "3bhk",
    "penthouse",
    "studio",
    "house",
    "villa",
    "luxury",
    "budget",
    "family",
    "pet-friendly",
    "furnished",
    "city-living",
    "suburban",
    "modern",
    "traditional",
    "rental",
    "sale",
    "investment",
  ]

  useEffect(() => {
    // Filter suggestions based on current input
    if (currentTag.trim()) {
      const filtered = popularTags.filter(
        (tag) => tag.toLowerCase().includes(currentTag.toLowerCase()) && !tags.includes(tag),
      )
      setSuggestedTags(filtered.slice(0, 5))
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [currentTag, tags])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onAddTag()
    } else if (e.key === "," || e.key === " ") {
      if (currentTag.trim()) {
        e.preventDefault()
        onAddTag()
      }
    }
  }

  const selectSuggestion = (tag: string) => {
    onTagChange(tag)
    setShowSuggestions(false)
    setTimeout(() => {
      onAddTag()
    }, 10)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Tag className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={currentTag}
            onChange={(e) => onTagChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => currentTag.trim() && setSuggestedTags.length > 0 && setShowSuggestions(true)}
            className={`w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Add tags (e.g., apartment, luxury, pet-friendly)..."
          />

          {/* Tag suggestions */}
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {suggestedTags.map((tag) => (
                <div
                  key={tag}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => selectSuggestion(tag)}
                >
                  <Tag className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onAddTag}
          className="ml-2 inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Add
        </button>
      </div>

      {/* Tags display */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {tag}
            <button
              type="button"
              onClick={() => onRemoveTag(tag)}
              className="ml-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={`Remove ${tag} tag`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {tags.length === 0 && !error && (
        <p className="mt-2 text-sm text-gray-500">
          Add at least one tag to categorize your blog. Tags help readers find your content.
        </p>
      )}

      {/* Popular tags suggestions */}
      {tags.length === 0 && !currentTag && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Popular tags:</p>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectSuggestion(tag)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagInput

