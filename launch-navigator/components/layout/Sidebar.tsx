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
} from "lucide-react";

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

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-800">
        <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold">LaunchNavigator</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
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
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
