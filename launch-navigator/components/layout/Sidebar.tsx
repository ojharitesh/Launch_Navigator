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
  Moon,
  Sun,
  Rocket,
} from "lucide-react";
import { useState } from "react";
import type { DashboardTheme } from "@/hooks/useDashboardTheme";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Roadmap", href: "/roadmap", icon: ListChecks },
  { name: "Compliance", href: "/compliance", icon: Shield },
  { name: "Inspections", href: "/inspections", icon: ClipboardCheck },
  { name: "POS Comparison", href: "/pos-comparison", icon: ShoppingCart },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  theme: DashboardTheme;
  onToggleTheme: () => void;
}

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const isDark = theme === "dark";

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 border rounded-lg md:hidden transition-colors",
          isDark
            ? "bg-zinc-900 border-white/10 text-white hover:bg-zinc-800"
            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        )}
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 z-40",
          isDark ? "bg-zinc-950 border-r border-white/10 text-white" : "bg-white border-r border-slate-200 text-slate-900",
          collapsed ? "w-0 -translate-x-full md:w-20 md:translate-x-0" : "w-72"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center gap-2 py-5 border-b",
          isDark ? "border-white/10" : "border-slate-200",
          collapsed ? "px-3 justify-center" : "px-6"
        )}>
          <div className={cn(
            "h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border flex items-center justify-center flex-shrink-0",
            isDark ? "border-white/10" : "border-slate-200"
          )}>
            <Rocket className={cn("size-5", isDark ? "text-cyan-400" : "text-cyan-600")} />
          </div>
          {!collapsed && <span className="text-lg font-bold">BizMap</span>}
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden md:flex absolute -right-3 top-20 border rounded-full p-1 transition",
            isDark
              ? "bg-zinc-800 border-white/10 hover:bg-zinc-700"
              : "bg-white border-slate-200 hover:bg-slate-100"
          )}
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
                    ? isDark
                      ? "bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-white/10 text-white"
                      : "bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border border-slate-200 text-slate-900"
                    : isDark
                      ? "text-white/50 hover:bg-white/5 hover:text-white/90"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
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
        <div className={cn("border-t", isDark ? "border-white/10" : "border-slate-200", collapsed ? "px-2 py-4" : "px-3 py-4")}>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isDark ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              collapsed && "md:justify-center"
            )}
            onClick={onToggleTheme}
            title={collapsed ? (isDark ? "Switch to light mode" : "Switch to dark mode") : undefined}
          >
            {isDark ? <Sun className="h-5 w-5 flex-shrink-0" /> : <Moon className="h-5 w-5 flex-shrink-0" />}
            {!collapsed && <span>{isDark ? "Light mode" : "Dark mode"}</span>}
          </button>

          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isDark ? "text-white/50 hover:bg-white/5 hover:text-white/90" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
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
          className={cn(
            "fixed inset-0 backdrop-blur-sm z-30 md:hidden",
            isDark ? "bg-black/60" : "bg-slate-900/20"
          )}
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
