"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const salesData = [
  { month: "Jan", sales: 65000, orders: 320 },
  { month: "Feb", sales: 72000, orders: 356 },
  { month: "Mar", sales: 68000, orders: 345 },
  { month: "Apr", sales: 85000, orders: 410 },
  { month: "May", sales: 92000, orders: 455 },
  { month: "Jun", sales: 88000, orders: 432 },
];

export function SalesOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Sales
                            </span>
                            <span className="font-bold text-muted-foreground">
                              ${payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Orders
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                strokeWidth={2}
                stroke="#2563eb"
                activeDot={{
                  r: 6,
                  style: { fill: "#2563eb" },
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                strokeWidth={2}
                stroke="#16a34a"
                activeDot={{
                  r: 6,
                  style: { fill: "#16a34a" },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Product A", sales: 1234, growth: "+12.3%" },
              { name: "Product B", sales: 1089, growth: "+10.1%" },
              { name: "Product C", sales: 956, growth: "+8.2%" },
              { name: "Product D", sales: 821, growth: "+6.1%" },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.sales} sales
                  </p>
                </div>
                <div className="text-sm text-green-500 font-medium">
                  {product.growth}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 