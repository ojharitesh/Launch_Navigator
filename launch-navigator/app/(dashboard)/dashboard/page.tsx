"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { createClient } from "@/lib/supabase";
import { formatDate, getDaysUntilText, isWithinDays } from "@/lib/utils";
import type { DashboardStats, Inspection, License, Profile, UserTask, BusinessType } from "@/types";
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

// Helper functions for business type customization
const getBusinessTypeInsights = (businessType: BusinessType): string[] => {
  const insights: Record<BusinessType, string[]> = {
    restaurant: [
      'Food handler permits and health department certifications required',
      'Plan for regular health inspections and compliance checks',
      'Liquor licenses may be needed depending on menu',
      'Equipment and facility standards vary by state',
    ],
    retail: [
      'Sales tax permits required for your state',
      'Product liability insurance strongly recommended',
      'Zoning compliance for retail locations',
      'Employee wage and hour regulations apply',
    ],
    construction: [
      'Contractor licensing often required at state/local level',
      'Workers compensation insurance is typically mandatory',
      'Building permits needed for each project',
      'Safety certifications and compliance documentation essential',
    ],
    healthcare: [
      'Professional licensing varies by practitioner type',
      'HIPAA compliance and data security critical',
      'Malpractice insurance required',
      'State board requirements and continuing education',
    ],
    manufacturing: [
      'Environmental permits and compliance checks',
      'OSHA safety regulations and reporting requirements',
      'Product liability and equipment insurance',
      'Regular facility inspections and certifications',
    ],
    technology: [
      'Data privacy and security policies required',
      'IP protection and patent considerations',
      'Client agreements and SLAs important',
      'Cyber liability insurance recommended',
    ],
    consulting: [
      'Professional liability insurance recommended',
      'Client agreements and clear service terms',
      'Industry certifications may be valued',
      'Tax planning for independent contractors',
    ],
    fitness: [
      'Liability waivers and insurance critical',
      'Health department permits for facilities',
      'Staff certifications and qualifications',
      'ADA compliance and accessibility requirements',
    ],
    salon: [
      'Cosmetology board licenses required',
      'Health and safety certifications mandatory',
      'Equipment and facility standards',
      'Chemical handling and disposal regulations',
    ],
    auto_repair: [
      'ASE certifications valued by customers',
      'Environmental compliance for fluid disposal',
      'Equipment safety and maintenance standards',
      'Liability insurance for customer vehicles',
    ],
    general: [
      'State and local business registration',
      'Tax identification and filing requirements',
      'General liability insurance recommended',
      'Ongoing compliance and annual renewals',
    ],
  };
  return insights[businessType] || insights.general;
};

const getInspectionFrequencyText = (businessType?: BusinessType): string => {
  const frequencies: Record<BusinessType, string> = {
    restaurant: 'Quarterly health inspections',
    retail: 'Annual safety checks',
    construction: 'Project-based inspections',
    healthcare: 'Regular compliance audits',
    manufacturing: 'Quarterly safety audits',
    technology: 'Annual security reviews',
    consulting: 'As-needed compliance',
    fitness: 'Annual facility inspections',
    salon: 'Bi-annual health inspections',
    auto_repair: 'Annual equipment inspections',
    general: 'Annual compliance reviews',
  };
  return frequencies[businessType || 'general'];
};

const getComplianceScore = (completed: number, total: number): number => {
  return Math.round((completed / (total || 1)) * 100);
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    profile: Profile | null;
    tasks: UserTask[];
    licenses: License[];
    inspections: Inspection[];
    stats: DashboardStats;
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
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        const profile = profileData as Profile | null;

        const fetchUserTasks = async () => {
          return await supabase
            .from("user_tasks")
            .select(
              `
              *,
              task:tasks(*)
            `
            )
            .eq("user_id", user.id)
            .order("order", { foreignTable: "task", ascending: true });
        };

        // Fetch user tasks with task details (auto-assign if missing)
        let { data: userTasksData } = await fetchUserTasks();

        if ((userTasksData?.length || 0) === 0 && profile?.state && profile?.business_type) {
          const { data: tasksToAssign, error: tasksToAssignError } = await supabase
            .from("tasks")
            .select("id,state,business_type")
            .or(`state.eq.${profile.state},state.eq.general`)
            .or(`business_type.eq.${profile.business_type},business_type.eq.general`);

          if (tasksToAssignError) {
            console.error("Error fetching tasks to assign:", tasksToAssignError);
          } else if (tasksToAssign && tasksToAssign.length > 0) {
            const { error: assignError } = await supabase
              .from("user_tasks")
              .upsert(
                tasksToAssign.map((t: { id: string }) => ({
                  user_id: user.id,
                  task_id: t.id,
                  completed: false,
                })),
                { onConflict: "user_id,task_id" }
              );

            if (assignError) {
              console.error("Error assigning tasks:", assignError);
            } else {
              ({ data: userTasksData } = await fetchUserTasks());
            }
          }
        }

        let userTasks = (userTasksData || []) as UserTask[];

        // If the database has no assigned tasks (or tasks table isn't seeded yet),
        // fall back to showing a generated checklist from the seed endpoint so the dashboard isn't all zeros.
        if (userTasks.length === 0 && profile?.state && profile?.business_type) {
          try {
            const res = await fetch(
              `/api/tasks?state=${encodeURIComponent(profile.state)}&business_type=${encodeURIComponent(profile.business_type)}`
            );
            const json = await res.json();
            const tasksFromApi = (json?.tasks || []) as any[];

            if (Array.isArray(tasksFromApi) && tasksFromApi.length > 0) {
              userTasks = tasksFromApi.map((t, idx) => {
                const tempId = `seed-${profile.state}-${profile.business_type}-${t.category || "task"}-${t.order ?? idx}-${idx}`;
                return {
                  id: tempId,
                  user_id: user.id,
                  task_id: tempId,
                  completed: false,
                  completed_at: null,
                  task: {
                    id: tempId,
                    title: t.title,
                    description: t.description,
                    state: t.state,
                    business_type: t.business_type,
                    cost_estimate: t.cost_estimate,
                    timeline_estimate: t.timeline_estimate,
                    required_documents: t.required_documents || [],
                    official_link: t.official_link ?? null,
                    category: t.category,
                    order: t.order ?? idx,
                  },
                } satisfies UserTask;
              });
            }
          } catch (e) {
            console.error("Error loading fallback tasks:", e);
          }
        }

        // Filter tasks to show those relevant for user's state and business type
        // Accepts tasks that are specifically for user's selections OR marked as general
        const filteredTasks = userTasks.filter((userTask) => {
          const task = userTask.task as any;
          if (!task) return false;

          // Task matches if it's for the user's state OR it's marked general
          const stateMatch = task.state === profile?.state || task.state === 'general';

          // Task matches if it's for the user's business type OR it's marked general
          const businessTypeMatch = task.business_type === profile?.business_type || task.business_type === 'general';

          return stateMatch && businessTypeMatch;
        });

        // Fetch licenses
        const { data: licensesData } = await supabase
          .from("licenses")
          .select("*")
          .eq("user_id", user.id)
          .order("expiration_date", { ascending: true });

        const licenses = (licensesData || []) as License[];

        // Fetch inspections
        const { data: inspectionsData } = await supabase
          .from("inspections")
          .select("*")
          .eq("user_id", user.id);

        const inspections = (inspectionsData || []) as Inspection[];

        // Calculate upcoming license expirations
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        const upcomingLicenses = licenses.filter(
          (license) => new Date(license.expiration_date) <= thirtyDaysFromNow
        );

        // Calculate upcoming inspections
        const upcomingInspectionList = inspections.filter(
          (inspection) =>
            inspection.next_inspection_estimate &&
            new Date(inspection.next_inspection_estimate) <= thirtyDaysFromNow
        );

        setData({
          profile,
          tasks: filteredTasks,
          licenses,
          inspections,
          stats: {
            totalTasks: filteredTasks.length,
            completedTasks: filteredTasks.filter((task) => task.completed).length,
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
          <div className="h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const { profile, tasks, licenses, inspections, stats } = data || {};

  // Get upcoming deadlines
  const upcomingTasks = tasks
    ?.filter((task) => !task.completed)
    .slice(0, 3);

  const upcomingLicenses = licenses?.filter((license) =>
    isWithinDays(license.expiration_date, 30)
  ).slice(0, 2);

  const upcomingInspectionsList = inspections?.filter(
    (inspection) =>
      inspection.next_inspection_estimate &&
      isWithinDays(inspection.next_inspection_estimate, 30)
  ).slice(0, 2);

  return (
    <div className="p-8">
      {/* Header with Personalization */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {profile?.name || "Entrepreneur"}!
        </h1>
        <p className="text-white/50 mt-2">
          Your {profile?.business_type?.replace('_', ' ') || "business"} setup roadmap for {profile?.city}, {profile?.state}
        </p>
      </div>

      {/* Business Type Info Banner */}
      <div className="mb-8 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-cyan-400">i</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">Customized for Your Business</h3>
            <p className="text-sm text-white/50 mt-1">
              Your roadmap is tailored for a {profile?.business_type?.replace('_', ' ')} business in {profile?.state}.
              We&apos;ve filtered requirements and tasks specific to your industry and location.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Tasks Completed"
          value={`${stats?.completedTasks || 0}/${stats?.totalTasks || 0}`}
          description={`${Math.round(((stats?.completedTasks || 0) / (stats?.totalTasks || 1)) * 100)}% setup complete`}
          icon={<ListChecks className="h-5 w-5" />}
        />
        <StatsCard
          title="Licenses"
          value={licenses?.length || 0}
          description={`Active in ${profile?.state}`}
          icon={<Shield className="h-5 w-5" />}
        />
        <StatsCard
          title="Inspections"
          value={inspections?.length || 0}
          description={`${getInspectionFrequencyText(profile?.business_type)} scheduled`}
          icon={<ClipboardCheck className="h-5 w-5" />}
        />
        <StatsCard
          title="Compliance Score"
          value={`${getComplianceScore(stats?.completedTasks || 0, stats?.totalTasks || 1)}%`}
          description={`${stats?.complianceAlerts || 0} deadlines ahead`}
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </div>

      {/* Business Type Specific Insights */}
      {profile && (
        <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <h3 className="font-semibold text-white mb-3">
            Industry Insights for {profile.business_type.replace('_', ' ')} Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getBusinessTypeInsights(profile.business_type).map((insight, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-cyan-400">✓</span>
                <p className="text-sm text-white/60">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/roadmap"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
            >
              <span className="text-sm font-medium text-white/70">
                View Roadmap
              </span>
              <ArrowRight className="h-4 w-4 text-white/30" />
            </Link>
            <Link
              href="/compliance"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
            >
              <span className="text-sm font-medium text-white/70">
                Add License
              </span>
              <ArrowRight className="h-4 w-4 text-white/30" />
            </Link>
            <Link
              href="/inspections"
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
            >
              <span className="text-sm font-medium text-white/70">
                Track Inspection
              </span>
              <ArrowRight className="h-4 w-4 text-white/30" />
            </Link>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(upcomingLicenses?.length || upcomingInspectionsList?.length) && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Upcoming Deadlines
          </h2>
          <div className="space-y-3">
            {upcomingLicenses?.map((license) => (
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

      {/* Upcoming Tasks - Customized for Business Type & State */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Your Customized Roadmap
          </h2>
          <Link
            href="/roadmap"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            View all steps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {upcomingTasks && upcomingTasks.length > 0 ? (
          <div className="space-y-3">
            {upcomingTasks.map((userTask) => (
              <div
                key={userTask.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">
                    {userTask.task?.title}
                  </h3>
                  <p className="text-sm text-white/50">
                    {userTask.task?.description?.substring(0, 80)}...
                  </p>
                  {userTask.task?.timeline_estimate && (
                    <p className="text-xs text-white/30 mt-1">
                      ⏱️ {userTask.task?.timeline_estimate}
                    </p>
                  )}
                </div>
                <Link href="/roadmap">
                  <button className="px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/10 transition-colors">
                    Continue
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/10">
            <ListChecks className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">
              Set Up Your Business
            </h3>
            <p className="text-white/50 mt-2">
              Complete the onboarding to get your personalized task list based on your business type and state
            </p>
            <a
              href="/onboarding"
              className="inline-block mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-orange-400 transition-all"
            >
              Get Started
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
