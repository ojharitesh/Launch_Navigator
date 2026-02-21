import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user tasks with task details
    const { data: userTasks, error: error } = await supabase
      .from("user_tasks")
      .select(`
        *,
        task:tasks(*)
      `)
      .eq("user_id", user.id)
      .order("task.order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ userTasks: userTasks || [] });
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { taskIds } = body;

    if (!taskIds || !Array.isArray(taskIds)) {
      return NextResponse.json({ error: "taskIds array required" }, { status: 400 });
    }

    // Create user tasks for each task ID
    const userTasksToInsert = taskIds.map((taskId: string) => ({
      id: crypto.randomUUID(),
      user_id: user.id,
      task_id: taskId,
      completed: false,
    }));

    const { error: insertError } = await supabase
      .from("user_tasks")
      .upsert(userTasksToInsert, { onConflict: "user_id,task_id" });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Tasks assigned successfully" });
  } catch (error) {
    console.error("Error assigning user tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userTaskId, completed } = body;

    if (!userTaskId) {
      return NextResponse.json({ error: "userTaskId required" }, { status: 400 });
    }

    // Update the user task
    const { error: updateError } = await supabase
      .from("user_tasks")
      .update({
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      })
      .eq("id", userTaskId)
      .eq("user_id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating user task:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
