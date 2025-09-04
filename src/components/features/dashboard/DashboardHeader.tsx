"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/contexts/UserContext";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          {user && (
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name.first} {user.name.last}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
