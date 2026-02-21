"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import {
  Rocket,
  LayoutDashboard,
  ListChecks,
  Shield,
  ClipboardCheck,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Roadmap", href: "/roadmap", icon: ListChecks },
  { name: "Compliance", href: "/compliance", icon: Shield },
  { name: "Inspections", href: "/inspections", icon: ClipboardCheck },
  { name: "POS Comparison", href: "/pos-comparison", icon: ShoppingCart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 md:hidden"
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "flex flex-col h-screen bg-slate-900 text-white fixed left-0 top-0 transition-all duration-300 z-40",
          collapsed ? "w-0 md:w-20" : "w-72"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-2 py-5 border-b border-slate-800",
          collapsed ? "px-3 justify-center" : "px-6"
        )}>
          <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          {!collapsed && <span className="text-lg font-bold">LaunchNavigator</span>}
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-slate-700 rounded-full p-1 hover:bg-slate-600"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Navigation */}
        <nav className={cn("flex-1 py-4 space-y-1 overflow-y-auto", collapsed ? "px-2" : "px-3")}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  collapsed && "md:justify-center"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className={cn("border-t border-slate-800", collapsed ? "px-2 py-4" : "px-3 py-4")}>
          <Button
            variant="ghost"
            className={cn(
              "w-full text-slate-300 hover:bg-slate-800 hover:text-white",
              collapsed && "md:justify-center"
            )}
            onClick={signOut}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Sign out</span>}
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
