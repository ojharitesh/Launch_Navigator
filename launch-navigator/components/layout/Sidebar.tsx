"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
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
        className="fixed top-4 left-4 z-50 p-2 bg-zinc-900 border border-white/10 text-white rounded-lg hover:bg-zinc-800 md:hidden"
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "flex flex-col h-screen bg-zinc-950 border-r border-white/10 text-white fixed left-0 top-0 transition-all duration-300 z-40",
          collapsed ? "w-0 -translate-x-full md:w-20 md:translate-x-0" : "w-72"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-2 py-5 border-b border-white/10",
          collapsed ? "px-3 justify-center" : "px-6"
        )}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
            <svg fill="currentColor" viewBox="0 0 100 100" className="size-5 text-white">
              <path d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z" />
            </svg>
          </div>
          {!collapsed && <span className="text-lg font-bold">BizMap</span>}
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-zinc-800 border border-white/10 rounded-full p-1 hover:bg-zinc-700 transition"
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/90",
                  collapsed && "md:justify-center"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-cyan-400" : "")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className={cn("border-t border-white/10", collapsed ? "px-2 py-4" : "px-3 py-4")}>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:bg-white/5 hover:text-white/90 transition-all duration-200",
              collapsed && "md:justify-center"
            )}
            onClick={signOut}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
