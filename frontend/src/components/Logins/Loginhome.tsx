import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Loginhome() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen relative bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Main content */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg rounded-2xl transform -rotate-2"></div>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg rounded-2xl transform rotate-2"></div>
        {isLogin ? (
          <Login onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <Signup onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default Loginhome;