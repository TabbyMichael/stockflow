"use client";

import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

// Updated analytics data
const dailyData = [
  { date: "Nov 1", sessions: 2500, goal: 1200 },
  { date: "Nov 2", sessions: 2600, goal: 1300 },
  { date: "Nov 3", sessions: 2400, goal: 1100 },
  { date: "Nov 4", sessions: 1900, goal: 1400 },
  { date: "Nov 5", sessions: 2300, goal: 1250 },
  { date: "Nov 6", sessions: 2800, goal: 1500 },
  { date: "Nov 7", sessions: 2600, goal: 1300 },
  // ... add more data points
];

const trafficSourceData = [
  { name: "Organic Search", value: 50, color: "#8884d8" },
  { name: "Direct", value: 18, color: "#82ca9d" },
  { name: "Social", value: 15, color: "#ffc658" },
  { name: "Paid Search", value: 7, color: "#ff8042" },
  { name: "Email", value: 5, color: "#0088fe" },
  { name: "Referral", value: 5, color: "#00C49F" }
];

// Add custom tooltip styles
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: pld.color }}
            />
            <span className="text-sm font-medium">{pld.name}:</span>
            <span className="text-sm text-muted-foreground">
              {pld.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Web Analytics</h2>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67,730</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              2.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">51,790</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              1.7% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47%</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDown className="mr-1 h-4 w-4" />
              15% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Goal Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7%</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="mr-1 h-4 w-4" />
              0.4% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sessions & Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart 
                data={dailyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="goalsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dx={-10}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dx={10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="sessions"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#sessionsGradient)"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="goal"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  fill="url(#goalsGradient)"
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`hsl(var(--chart-${index + 1}))`}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                      className="transition-all duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: payload[0].payload.color }}
                            />
                            <span className="text-sm font-medium">
                              {payload[0].name}
                            </span>
                          </div>
                          <p className="text-2xl font-bold mt-1">
                            {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {trafficSourceData.map((source, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 group cursor-pointer transition-colors hover:text-foreground"
                >
                  <div 
                    className="w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground truncate">
                    {source.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        {[
          { title: "Goal Completion", value: "109", color: "1" },
          { title: "Goal Value", value: "$352", color: "2" },
          { title: "Goal Conversion Rate", value: "3.7%", color: "3" }
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{item.value}</div>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={dailyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={`hsl(var(--chart-${item.color}))`} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={`hsl(var(--chart-${item.color}))`} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={index === 0 ? "goal" : "sessions"}
                    stroke={`hsl(var(--chart-${item.color}))`}
                    strokeWidth={2}
                    fill={`url(#gradient${index})`}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'hsl(var(--muted))' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
} 