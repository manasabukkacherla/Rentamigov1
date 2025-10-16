import React, { useState, useEffect } from 'react';
import { MenuIcon, X, Leaf } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-green-700 mr-2" />
          <h1 className={`text-2xl font-serif font-bold ${isScrolled ? 'text-green-800' : 'text-white'}`}>
            AgriVista
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Crops', 'Livestock', 'Sustainable Practices', 'Plot Management', 'Resources'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`font-medium transition-colors duration-200 ${
                isScrolled ? 'text-gray-700 hover:text-green-700' : 'text-white hover:text-green-100'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
          ) : (
            <MenuIcon className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {['Home', 'Crops', 'Livestock', 'Sustainable Practices', 'Plot Management', 'Resources'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;