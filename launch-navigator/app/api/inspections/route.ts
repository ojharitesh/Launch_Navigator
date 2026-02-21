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

    // Get user inspections
    const { data: inspections, error: error } = await supabase
      .from("inspections")
      .select("*")
      .eq("user_id", user.id)
      .order("next_inspection_estimate", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate upcoming inspections (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingInspections = inspections?.filter(
      (inspection) =>
        inspection.next_inspection_estimate &&
        new Date(inspection.next_inspection_estimate) <= thirtyDaysFromNow
    ) || [];

    return NextResponse.json({
      inspections: inspections || [],
      upcomingInspections,
    });
  } catch (error) {
    console.error("Error fetching inspections:", error);
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
    const { inspection_type, last_inspection_date, next_inspection_estimate, notes } = body;

    if (!inspection_type) {
      return NextResponse.json(
        { error: "inspection_type is required" },
        { status: 400 }
      );
    }

    const { data: inspection, error: insertError } = await supabase
      .from("inspections")
      .insert({
        id: crypto.randomUUID(),
        user_id: user.id,
        inspection_type,
        last_inspection_date: last_inspection_date || null,
        next_inspection_estimate: next_inspection_estimate || null,
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ inspection });
  } catch (error) {
    console.error("Error creating inspection:", error);
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
    const { id, inspection_type, last_inspection_date, next_inspection_estimate, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Inspection ID required" }, { status: 400 });
    }

    const { data: inspection, error: updateError } = await supabase
      .from("inspections")
      .update({
        inspection_type,
        last_inspection_date,
        next_inspection_estimate,
        notes,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ inspection });
  } catch (error) {
    console.error("Error updating inspection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inspection ID required" }, { status: 400 });
    }

    const { error: deleteError } = await supabase
      .from("inspections")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Inspection deleted successfully" });
  } catch (error) {
    console.error("Error deleting inspection:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
