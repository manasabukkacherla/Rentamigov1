import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-lg text-gray-600">{subtitle}</p>
      <div className="w-24 h-1 bg-green-700 mx-auto mt-4"></div>
    </div>
  );
};

export default SectionTitle;