"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, DollarSign, Users, Package, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeText: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeText, icon }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">{changeText}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Gross Sales"
        value="$22,892"
        change={26}
        changeText="+1.42k today"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Average Sales"
        value="$8,283"
        change={23}
        changeText="+0.34k today"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="New Sales"
        value="$1,853"
        change={-2.4}
        changeText="+0.45 today"
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Gross Profits"
        value="$5,239"
        change={14.4}
        changeText="+0.5k today"
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
} 