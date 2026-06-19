import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <AlertTriangle size={64} className="text-[#B8974E] mx-auto mb-6 opacity-80" />
            <h1 className="font-poppins text-2xl font-bold text-[#1C1917] mb-4">Something went wrong.</h1>
            <p className="font-inter text-[#78716C] mb-8 text-sm">
              We've encountered an unexpected error. Please try refreshing the page or navigating back to safety.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary"
              style={{ padding: "12px 32px" }}
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
