"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Store,
  Menu,
  Sun,
  Moon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Sales Orders",
    icon: Store,
    href: "/dashboard/sales",
  },
  {
    title: "Products",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/dashboard/customers",
  },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className={cn(
      "relative border-r bg-background flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="h-4 w-4" />
        </Button>
        {!isCollapsed && (
          <span className="font-semibold text-lg ml-2">StockFlow</span>
        )}
      </div>

      <nav className="p-2 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {mounted && (
        <div className="absolute bottom-16 w-full px-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4 mr-2" />
                {!isCollapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 mr-2" />
                {!isCollapsed && <span>Dark Mode</span>}
              </>
            )}
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 w-full px-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted",
            pathname === "/dashboard/settings" && "bg-muted"
          )}
        >
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
} 