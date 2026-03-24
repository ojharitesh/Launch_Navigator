"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { createClient } from "@/lib/supabase";
import { useDashboardTheme } from "@/hooks/useDashboardTheme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { theme, toggleTheme, mounted } = useDashboardTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to check auth state:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [supabase, router]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === "dark" ? "dark theme-dark" : "theme-light"}>
      <div className="min-h-screen flex bg-slate-100 text-slate-900 dark:bg-black dark:text-white transition-colors">
        <Sidebar theme={theme} onToggleTheme={toggleTheme} />
        <main className="flex-1 overflow-auto ml-0 md:ml-72">{children}</main>
      </div>
    </div>
  );
}
