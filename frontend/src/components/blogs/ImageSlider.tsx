import React, { useEffect, useState } from 'react';
import { Blog } from '../Blogs/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  blogs: Blog[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!blogs.length) return null;

  return (
    <div className="relative w-full h-[600px] group">
      {/* Image and Content */}
      <div
        className="w-full h-full bg-center bg-cover duration-500"
        style={{
          backgroundImage: `url(${blogs[currentIndex]?.imageUrl || '/fallback-image.jpg'})`,
        }}
      >
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
          <h2 className="text-white text-3xl font-bold mb-2">
            {blogs[currentIndex]?.title}
          </h2>
          <p className="text-white text-lg mb-4 line-clamp-2">
            {blogs[currentIndex]?.content}
          </p>
          <div className="flex items-center text-white mb-2">
            <span className="mr-4">
              By {blogs[currentIndex]?.author?.name || 'Unknown'}
            </span>
            <span className="mr-4">
              • {new Date(blogs[currentIndex]?.createdAt).toLocaleDateString()}
            </span>
            <span>
              • {blogs[currentIndex]?.rating?.toFixed(1) || 'N/A'} ★
            </span>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-md w-fit hover:bg-gray-100 transition">
            Read More
          </button>
        </div>
      </div>

      {/* Left Arrow */}
      <div
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60"
        onClick={goToPrevious}
        role="button"
      >
        <ChevronLeft size={30} />
      </div>

      {/* Right Arrow */}
      <div
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer hover:bg-black/60"
        onClick={goToNext}
        role="button"
      >
        <ChevronRight size={30} />
      </div>

      {/* Dots/Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {blogs.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            role="button"
            className={`cursor-pointer h-3 w-3 rounded-full ${
              slideIndex === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
