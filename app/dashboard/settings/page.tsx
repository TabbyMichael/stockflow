"use client";

import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Building, 
  CreditCard, 
  Bell, 
  Lock, 
  Mail, 
  User, 
  Shield, 
  Warehouse,
  Globe,
  Printer,
  Database,
  Badge
} from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details and business information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="StockFlow Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID/VAT Number</Label>
                    <Input id="taxId" placeholder="XX-XXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" placeholder="contact@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" placeholder="123 Business St." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warehouse Settings</CardTitle>
                <CardDescription>
                  Configure your warehouse and inventory preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Warehouse</Label>
                  <Select defaultValue="warehouse-a">
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                      <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                      <SelectItem value="warehouse-c">Warehouse C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Stock Level Alerts</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="stock-alerts" />
                    <Label htmlFor="stock-alerts">Enable low stock notifications</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-muted-foreground">$29/month</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Payment Method</h4>
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/24</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your recent billing history and download invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Mar 1, 2024", amount: "$29.00", status: "Paid" },
                    { date: "Feb 1, 2024", amount: "$29.00", status: "Paid" },
                    { date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
                  ].map((invoice) => (
                    <div key={invoice.date} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{invoice.date}</p>
                        <p className="text-sm text-muted-foreground">{invoice.amount}</p>
                      </div>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Low Stock Alerts", description: "Get notified when products are running low" },
                  { title: "Order Updates", description: "Receive updates about order status changes" },
                  { title: "Price Changes", description: "Be notified about significant price changes" },
                  { title: "System Updates", description: "Get important system and maintenance notifications" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between space-x-2">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences and access controls.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Protect your account with 2FA</p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Button variant="outline" className="w-full">Change Password</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Active Sessions</Label>
                    <div className="space-y-2">
                      {[
                        { device: "Windows PC - Chrome", location: "New York, USA", active: true },
                        { device: "iPhone 12 - Safari", location: "Los Angeles, USA", active: false },
                      ].map((session) => (
                        <div key={session.device} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">{session.device}</p>
                            <p className="text-xs text-muted-foreground">{session.location}</p>
                          </div>
                          {session.active ? (
                            <div className="text-sm text-muted-foreground border rounded-md px-2 py-1">Current Session</div>
                          ) : (
                            <Button variant="ghost" size="sm">Revoke</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your integrated services and APIs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    name: "Shipping Provider API",
                    icon: Globe,
                    status: "Connected",
                    description: "Integration with shipping carriers"
                  },
                  {
                    name: "Payment Gateway",
                    icon: CreditCard,
                    status: "Connected",
                    description: "Payment processing integration"
                  },
                  {
                    name: "Label Printer",
                    icon: Printer,
                    status: "Not Connected",
                    description: "Shipping label printer integration"
                  },
                  {
                    name: "Accounting Software",
                    icon: Database,
                    status: "Connected",
                    description: "Financial system integration"
                  },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <integration.icon className="h-8 w-8 p-1.5 bg-muted rounded-lg" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{integration.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <Button variant={integration.status === "Connected" ? "outline" : "default"}>
                      {integration.status === "Connected" ? "Manage" : "Connect"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
} 