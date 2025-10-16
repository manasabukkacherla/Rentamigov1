import React, { Component, ErrorInfo, ReactNode } from "react";

// Typing the ErrorBoundary component to accept `children` prop
interface ErrorBoundaryProps {
  children: ReactNode; // Accepts any valid React element(s)
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children; // This is where we render the wrapped children
  }
}

export default ErrorBoundary;
