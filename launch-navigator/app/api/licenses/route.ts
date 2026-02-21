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

    // Get user licenses
    const { data: licenses, error: error } = await supabase
      .from("licenses")
      .select("*")
      .eq("user_id", user.id)
      .order("expiration_date", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate upcoming expirations (within 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingExpirations = licenses?.filter(
      (license) => new Date(license.expiration_date) <= thirtyDaysFromNow
    ) || [];

    return NextResponse.json({
      licenses: licenses || [],
      upcomingExpirations,
    });
  } catch (error) {
    console.error("Error fetching licenses:", error);
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
    const { license_name, expiration_date, renewal_frequency, notes } = body;

    if (!license_name || !expiration_date) {
      return NextResponse.json(
        { error: "license_name and expiration_date are required" },
        { status: 400 }
      );
    }

    const { data: license, error: insertError } = await supabase
      .from("licenses")
      .insert({
        id: crypto.randomUUID(),
        user_id: user.id,
        license_name,
        expiration_date,
        renewal_frequency: renewal_frequency || "annual",
        notes: notes || null,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ license });
  } catch (error) {
    console.error("Error creating license:", error);
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
    const { id, license_name, expiration_date, renewal_frequency, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "License ID required" }, { status: 400 });
    }

    const { data: license, error: updateError } = await supabase
      .from("licenses")
      .update({
        license_name,
        expiration_date,
        renewal_frequency,
        notes,
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ license });
  } catch (error) {
    console.error("Error updating license:", error);
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
      return NextResponse.json({ error: "License ID required" }, { status: 400 });
    }

    const { error: deleteError } = await supabase
      .from("licenses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "License deleted successfully" });
  } catch (error) {
    console.error("Error deleting license:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
