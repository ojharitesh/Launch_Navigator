"use client";

import { createClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type { UserTask, Task } from "@/types";

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchTasks = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("user_tasks")
        .select(`
          *,
          task:tasks(*)
        `)
        .eq("user_id", userId)
        .order("task.order", { ascending: true });

      if (fetchError) throw fetchError;
      setTasks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from("user_tasks")
        .update({
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .eq("id", taskId);

      if (updateError) throw updateError;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, completed, completed_at: completed ? new Date().toISOString() : null }
            : task
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    tasks,
    loading,
    error,
    toggleTask,
    completedCount,
    totalCount,
    progress,
    refetch: fetchTasks,
  };
}
