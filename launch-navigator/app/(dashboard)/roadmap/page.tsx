"use client";

import { useEffect, useState } from "react";
import { TaskCard } from "@/components/roadmap/TaskCard";
import { createClient } from "@/lib/supabase";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { Filter, ListChecks, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Profile, UserTask } from "@/types";

const categories = [
  { value: "all", label: "All Tasks" },
  { value: "registration", label: "Registration" },
  { value: "legal", label: "Legal" },
  { value: "permits", label: "Permits" },
  { value: "insurance", label: "Insurance" },
  { value: "tax", label: "Tax" },
  { value: "compliance", label: "Compliance" },
  { value: "operations", label: "Operations" },
];

export default function RoadmapPage() {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

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

        setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [supabase]);

  const toggleTask = async (userTaskId: string, completed: boolean) => {
    // Avoid writing updates for fallback seed tasks that don't exist in DB.
    if (userTaskId.startsWith("seed-")) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === userTaskId
            ? { ...t, completed, completed_at: completed ? new Date().toISOString() : null }
            : t
        )
      );
      return;
    }

    try {
      const { error } = await supabase
        .from("user_tasks")
        .update({
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .eq("id", userTaskId);

      if (error) {
        console.error("Error updating task:", error);
        return;
      }

      setTasks((prev) =>
        prev.map((t) =>
          t.id === userTaskId
            ? { ...t, completed, completed_at: completed ? new Date().toISOString() : null }
            : t
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter(
    (userTask): userTask is UserTask & { task: NonNullable<UserTask["task"]> } => {
      const task = userTask.task;
      if (!task) return false;

      if (filter !== "all" && task.category !== filter) {
        return false;
      }

      if (!showCompleted && userTask.completed) {
        return false;
      }

      return true;
    }
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-slate-600">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Roadmap</h1>
        <p className="text-slate-600 mt-2">Complete these tasks to start your business</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <ProgressCard title="Overall Progress" completed={completedCount} total={totalCount} />

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-slate-500" />
              <h3 className="font-medium text-slate-900">Filter</h3>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    filter === cat.value ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <hr className="my-4" />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-600">Show completed</span>
            </label>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">{filteredTasks.length} Tasks</h2>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((userTask) => (
                <TaskCard
                  key={userTask.id}
                  task={userTask.task}
                  completed={userTask.completed}
                  onToggle={(completed) => toggleTask(userTask.id, completed)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
              <ListChecks className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No tasks found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or add more tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
