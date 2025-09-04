"use client";

import { config } from "@/config";
import { useUser } from "@/lib/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4"
      role="main"
      aria-label="Welcome page"
    >
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="relative">
            <h1
              className="text-3xl font-bold mb-4 gradient-text"
              id="welcome-title"
            >
              Welcome to {config.app.name}
            </h1>
            <div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-75"
              aria-hidden="true"
            ></div>
          </div>
          <p
            className="text-muted-foreground text-lg leading-relaxed"
            aria-describedby="welcome-title"
          >
            {config.app.description}
          </p>
          <div className="text-sm text-muted-foreground">
            Version {config.app.version}
          </div>
        </div>

        <div
          className="flex justify-center"
          role="status"
          aria-label="Loading indicator"
          aria-live="polite"
        >
          <div className="relative">
            <div
              className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
              aria-hidden="true"
            ></div>
            <div
              className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"
              aria-hidden="true"
            ></div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground" aria-live="polite">
          Redirecting...
        </div>
      </div>
    </div>
  );
}
