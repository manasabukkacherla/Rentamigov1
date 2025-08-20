import React from 'react';

export function LogoutAnimation() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-wave">👋</div>
        <h2 className="text-2xl font-bold text-black animate-fade-up">See you again!</h2>
        <p className="text-black/60 animate-fade-up animation-delay-200">Thanks for using PropAmigo</p>
      </div>
    </div>
  );
}