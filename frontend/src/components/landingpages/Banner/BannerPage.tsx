import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageBannerProps {
  title: string;
  Icon: LucideIcon;
}

function PageBanner({ title, Icon }: PageBannerProps) {
  return (
    <div className="bg-black text-white py-20 relative">
      <div className="container mx-auto px-6">
        <h1 className="font-['NeuroPolXFree'] text-5xl text-center mb-4">{title}</h1>
        <Icon className="w-12 h-12 mx-auto mt-4" />
      </div>
    </div>
  );
}

export default PageBanner;