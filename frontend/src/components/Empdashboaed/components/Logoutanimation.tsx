import React, { useEffect } from 'react';
import { Waves as Wave } from 'lucide-react';

interface LogoutAnimationProps {
  onAnimationComplete: () => void;
}

const LogoutAnimation: React.FC<LogoutAnimationProps> = ({ onAnimationComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[100] animate-fadeIn">
      <div className="text-center">
        <Wave className="w-16 h-16 mx-auto mb-4 text-black animate-wave" />
        <h2 className="text-3xl font-semibold text-black mb-2 animate-slideUp">
          Goodbye!
        </h2>
        <p className="text-gray-600 animate-slideUp animation-delay-200">
          See you again soon!
        </p>
      </div>
    </div>
  );
};

export default LogoutAnimation;