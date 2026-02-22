"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { createClient } from "@/lib/supabase";
import { formatDate, getDaysUntilText, isWithinDays } from "@/lib/utils";
import {
  ListChecks,
  Shield,
  ClipboardCheck,
  Calendar,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: any;
    tasks: any[];
    licenses: any[];
    inspections: any[];
    stats: {
      totalTasks: number;
      completedTasks: number;
      upcomingDeadlines: number;
      complianceAlerts: number;
    };
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // Fetch user tasks with task details
        const { data: userTasks } = await supabase
          .from("user_tasks")
          .select(`
            *,
            task:tasks(*)
          `)
          .eq("user_id", user.id)
          .order("task.order", { ascending: true });

        // Fetch licenses
        const { data: licenses } = await supabase
          .from("licenses")
          .select("*")
          .eq("user_id", user.id)
          .order("expiration_date", { ascending: true });

        // Fetch inspections
        const { data: inspections } = await supabase
          .from("inspections")
          .select("*")
          .eq("user_id", user.id);

        // Calculate upcoming license expirations
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        const upcomingLicenses = licenses?.filter(
          (l) => new Date(l.expiration_date) <= thirtyDaysFromNow
        ) || [];

        // Calculate upcoming inspections
        const upcomingInspectionList = inspections?.filter(
          (i) =>
            i.next_inspection_estimate &&
            new Date(i.next_inspection_estimate) <= thirtyDaysFromNow
        ) || [];

        setData({
          profile,
          tasks: userTasks || [],
          licenses: licenses || [],
          inspections: inspections || [],
          stats: {
            totalTasks: userTasks?.length || 0,
            completedTasks: userTasks?.filter((t) => t.completed).length || 0,
            upcomingDeadlines: upcomingLicenses.length,
            complianceAlerts: upcomingLicenses.length + upcomingInspectionList.length,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { profile, tasks, licenses, inspections, stats } = data || {};

  // Get upcoming deadlines
  const upcomingTasks = tasks
    ?.filter((t) => !t.completed)
    .slice(0, 3);

  const upcomingLicenses = licenses?.filter((l) =>
    isWithinDays(l.expiration_date, 30)
  ).slice(0, 2);

  const upcomingInspectionsList = inspections?.filter(
    (i) => i.next_inspection_estimate && isWithinDays(i.next_inspection_estimate, 30)
  ).slice(0, 2);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {profile?.name || "Entrepreneur"}!
        </h1>
        <p className="text-slate-600 mt-2">
          Running a {profile?.business_type || "business"} in {profile?.city}, {profile?.state}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Tasks Completed"
          value={`${stats?.completedTasks || 0}/${stats?.totalTasks || 0}`}
          description="Business setup tasks"
          icon={<ListChecks className="h-5 w-5" />}
        />
        <StatsCard
          title="Licenses"
          value={licenses?.length || 0}
          description="Active licenses"
          icon={<Shield className="h-5 w-5" />}
        />
        <StatsCard
          title="Inspections"
          value={inspections?.length || 0}
          description="Tracked inspections"
          icon={<ClipboardCheck className="h-5 w-5" />}
        />
        <StatsCard
          title="Alerts"
          value={stats?.complianceAlerts || 0}
          description="Due within 30 days"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </div>

      {/* Progress & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ProgressCard
            title="Business Setup Progress"
            completed={stats?.completedTasks || 0}
            total={stats?.totalTasks || 0}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/roadmap"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">
                View Roadmap
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/compliance"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">
                Add License
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link
              href="/inspections"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">
                Track Inspection
              </span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(upcomingLicenses?.length || upcomingInspectionsList?.length) && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-3">
            {upcomingLicenses?.map((license: any) => (
              <AlertCard
                key={license.id}
                title={`${license.license_name} Expiring`}
                description={`Expires on ${formatDate(license.expiration_date)} (${getDaysUntilText(license.expiration_date)})`}
                severity="warning"
                action={{
                  label: "View Details",
                  href: "/compliance",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Next Steps
          </h2>
          <Link
            href="/roadmap"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {upcomingTasks && upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map((userTask: any) => (
              <div
                key={userTask.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200"
              >
                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-900">
                    {userTask.task?.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {userTask.task?.description?.substring(0, 80)}...
                  </p>
                </div>
                <Link href="/roadmap">
                  <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Continue
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <ListChecks className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">
              Set Up Your Business
            </h3>
            <p className="text-slate-500 mt-2">
              Complete the onboarding to get your personalized task list
            </p>
            <a
              href="/onboarding"
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
