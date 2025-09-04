"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { RandomUser } from "../types/user";

interface UserContextType {
  user: RandomUser | null;
  setUser: (user: RandomUser | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<RandomUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut) {
      setIsLoading(false);
      return;
    }

    // Load user data from localStorage on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserState(parsedUser);
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, [isLoggingOut]);

  const setUser = useCallback(
    (userData: RandomUser | null) => {
      if (isLoggingOut) return;
      try {
        setUserState(userData);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        throw new Error("Failed to save user data");
      }
    },
    [isLoggingOut]
  );

  const logout = useCallback(() => {
    if (isLoggingOut) return;
    // Set logout flag to prevent re-adding user
    setIsLoggingOut(true);

    localStorage.removeItem("user");
    setUserState(null);

    setTimeout(() => {
      setIsLoggingOut(false);
    }, 100);
  }, []);

  const value = {
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center"
        role="main"
        aria-label="Loading user data"
      >
        <div className="text-center space-y-6" role="status" aria-live="polite">
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
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">Loading...</p>
            <div className="flex justify-center space-x-1" aria-hidden="true">
              <div
                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
