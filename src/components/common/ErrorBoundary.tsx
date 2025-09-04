"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4"
          role="main"
          aria-label="Error page"
        >
          <Card
            className="w-full max-w-md shadow-strong scale-in"
            role="alert"
            aria-labelledby="error-title"
            aria-describedby="error-description"
          >
            <CardHeader className="text-center space-y-3 pb-6">
              <div
                className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <svg
                  className="w-8 h-8 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <CardTitle
                id="error-title"
                className="text-xl font-bold text-destructive"
              >
                Something went wrong
              </CardTitle>
              <p
                id="error-description"
                className="text-muted-foreground text-sm leading-relaxed"
              >
                An unexpected error occurred. Please try refreshing the page or
                contact support if the problem persists.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error details for developers */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-sm border border-border rounded-lg overflow-hidden">
                  <summary
                    className="cursor-pointer p-3 bg-muted/50 hover:bg-muted transition-colors duration-200 font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    aria-label="Toggle error details for developers"
                  >
                    Error Details (Development)
                  </summary>
                  <pre
                    className="p-3 bg-muted/30 text-xs overflow-auto max-h-32 border-t border-border"
                    aria-label="Error stack trace"
                  >
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex-1 btn-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label="Try to recover from error"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1 btn-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  aria-label="Refresh the page"
                >
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
