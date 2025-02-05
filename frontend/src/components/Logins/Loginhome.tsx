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
      <div className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg"
         style={{
          backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80')`,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      ></div>
        <div className="absolute inset-0 bg-white/50 backdrop-blur-lg rounded-2xl transform rotate-2"></div>
        {isLogin ? (
          
  <Login onSwitchToSignup={() => setIsLogin(false)} onLoginSuccess={handleLoginSuccess} />
) : (
  <Signup onSwitchToLogin={() => setIsLogin(true)} />
)}

      </div>
    </div>
  );
}

export default Loginhome;