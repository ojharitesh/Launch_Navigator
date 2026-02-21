import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import { seedTasks } from "@/data/seed-tasks";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const businessType = searchParams.get("business_type");

    // First, try to fetch tasks from database
    let query = supabase.from("tasks").select("*");

    if (state && state !== "general") {
      query = query.or(`state.eq.${state},state.eq.general`);
    } else {
      query = query.eq("state", "general");
    }

    if (businessType) {
      query = query.or(`business_type.eq.${businessType},business_type.eq.general`);
    }

    const { data: dbTasks, error: dbError } = await query.order("order", { ascending: true });

    // If no tasks in database, use seed data filtered by state and business type
    if (!dbTasks || dbTasks.length === 0) {
      const filteredTasks = seedTasks.filter((task) => {
        const stateMatch = state && state !== "general"
          ? task.state === state || task.state === "general"
          : task.state === "general";
        const typeMatch = businessType
          ? task.business_type === businessType || task.business_type === "general"
          : task.business_type === "general";
        return stateMatch && typeMatch;
      });

      return NextResponse.json({ tasks: filteredTasks, source: "seed" });
    }

    return NextResponse.json({ tasks: dbTasks, source: "database" });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Seed tasks endpoint (for development)
export async function POST() {
  try {
    const supabase = await createClient();

    // Insert seed tasks
    const tasksToInsert = seedTasks.map((task) => ({
      ...task,
      id: crypto.randomUUID(),
    }));

    const { error } = await supabase.from("tasks").upsert(tasksToInsert, {
      onConflict: "id",
    });

    if (error) {
      console.error("Error seeding tasks:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Tasks seeded successfully", count: tasksToInsert.length });
  } catch (error) {
    console.error("Error seeding tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
