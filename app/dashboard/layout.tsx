"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useAuth } from "@/lib/firebase/auth-context";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 