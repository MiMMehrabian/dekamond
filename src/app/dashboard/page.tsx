"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UserProfileCard, WelcomeCard } from "@/components/features/dashboard";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserProfileCard />
      </div>
      <WelcomeCard />
    </>
  );
}
