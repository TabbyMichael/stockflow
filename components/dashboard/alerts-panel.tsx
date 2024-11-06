"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Package, AlertTriangle, Info } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "critical",
    message: "Low stock alert: Product XYZ (5 units remaining)",
    time: "2 minutes ago",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "warning",
    message: "New order #1234 requires attention",
    time: "15 minutes ago",
    icon: Bell,
    color: "text-yellow-500",
  },
  {
    id: 3,
    type: "info",
    message: "Shipment for order #5678 has been delivered",
    time: "1 hour ago",
    icon: Package,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "info",
    message: "System maintenance scheduled for tonight",
    time: "2 hours ago",
    icon: Info,
    color: "text-blue-500",
  },
];

export function AlertsPanel() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <Icon className={`h-5 w-5 ${alert.color}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.message}
                    </p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 