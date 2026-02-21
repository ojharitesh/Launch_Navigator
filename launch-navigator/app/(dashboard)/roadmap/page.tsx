"use client";

import { useEffect, useState } from "react";
import { TaskCard } from "@/components/roadmap/TaskCard";
import { createClient } from "@/lib/supabase";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { Filter, ListChecks, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [tasks, setTasks] = useState<any[]>([]);
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

        const { data: userTasks } = await supabase
          .from("user_tasks")
          .select(`
            *,
            task:tasks(*)
          `)
          .eq("user_id", user.id)
          .order("task.order", { ascending: true });

        setTasks(userTasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [supabase]);

  const toggleTask = async (userTaskId: string, completed: boolean) => {
    try {
      await supabase
        .from("user_tasks")
        .update({
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .eq("id", userTaskId);

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

  // Filter tasks
  const filteredTasks = tasks.filter((userTask) => {
    const task = userTask.task;
    if (!task) return false;

    // Category filter
    if (filter !== "all" && task.category !== filter) {
      return false;
    }

    // Completed filter
    if (!showCompleted && userTask.completed) {
      return false;
    }

    return true;
  });

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Roadmap</h1>
        <p className="text-slate-600 mt-2">
          Complete these tasks to start your business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress */}
          <ProgressCard
            title="Overall Progress"
            completed={completedCount}
            total={totalCount}
          />

          {/* Filters */}
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
                    filter === cat.value
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-100"
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

        {/* Task List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              {filteredTasks.length} Tasks
            </h2>
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
              <p className="text-slate-500 mt-2">
                Try adjusting your filters or add more tasks
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
