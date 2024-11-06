"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "Stock Update",
    description: "Added 150 units of Product XYZ",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    type: "Order",
    description: "New order #1234 received",
    timestamp: "15 minutes ago",
  },
  {
    id: 3,
    type: "Alert",
    description: "Low stock alert for Product ABC",
    timestamp: "1 hour ago",
  },
  {
    id: 4,
    type: "Transfer",
    description: "Stock transfer completed between Warehouse A and B",
    timestamp: "2 hours ago",
  },
  {
    id: 5,
    type: "System",
    description: "Daily inventory reconciliation completed",
    timestamp: "3 hours ago",
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 rounded-md border p-4"
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.type}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}