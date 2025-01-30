import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Loginhome() {
  const [isLogin, setIsLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // ✅ Function to handle successful login
  const handleLoginSuccess = (email: string) => {
    console.log("User logged in successfully:", email);
    setUserEmail(email);
    // You can redirect the user or update the app state here
  };

  return (
    <div className="min-h-screen relative bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Main content */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg rounded-2xl transform -rotate-2"></div>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg rounded-2xl transform rotate-2"></div>
        {isLogin ? (

          <><Login onSwitchToSignup={() => setIsLogin(false)} onLoginSuccess={function (email: string): void {
            throw new Error('Function not implemented.');
          } } /><Login onSwitchToSignup={() => setIsLogin(false)} onLoginSuccess={handleLoginSuccess} /></>

        ) : (
          <Signup onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default Loginhome;
