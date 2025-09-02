declare global {
    interface Window {
      Razorpay: any; // Declare Razorpay as a global variable attached to the window object
    }
  }
  
  export {}; // This ensures the file is treated as a module and doesn't interfere with other types
  