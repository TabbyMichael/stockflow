"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { useAuth } from "@/lib/firebase/auth-context";

export function DashboardContent() {
  const { user } = useAuth();
  
  // Get display name, email prefix, or "there" as fallback and capitalize
  const displayName = (user?.displayName || user?.email?.split('@')[0] || "there")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Morning, {displayName}!
        </h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
          <Button>Export</Button>
        </div>
      </div>
      <StatsCards />
    </div>
  );
} 