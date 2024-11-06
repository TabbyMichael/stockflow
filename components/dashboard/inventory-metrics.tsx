"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const inventoryData = [
  {
    category: "Electronics",
    inStock: 342,
    lowStock: 50,
    outOfStock: 4
  },
  {
    category: "Clothing",
    inStock: 491,
    lowStock: 65,
    outOfStock: 12
  },
  {
    category: "Food",
    inStock: 282,
    lowStock: 35,
    outOfStock: 7
  },
  {
    category: "Books",
    inStock: 123,
    lowStock: 25,
    outOfStock: 2
  }
];

export function InventoryMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Stock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={inventoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inStock" name="In Stock" fill="#22c55e" />
                <Bar dataKey="lowStock" name="Low Stock" fill="#eab308" />
                <Bar dataKey="outOfStock" name="Out of Stock" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Warehouse Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Warehouse A", "Warehouse B", "Warehouse C"].map((warehouse) => (
                <div key={warehouse} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{warehouse}</p>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${Math.random() * 100}%` 
                        }} 
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: "Critical", count: 3, color: "text-red-500" },
                { level: "Warning", count: 7, color: "text-yellow-500" },
                { level: "Info", count: 12, color: "text-blue-500" }
              ].map((alert) => (
                <div key={alert.level} className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${alert.color}`}>
                    {alert.level}
                  </span>
                  <span className="text-sm font-medium">{alert.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 