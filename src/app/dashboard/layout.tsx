"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
