import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { PostgrestError } from "@supabase/supabase-js";

// Define the interface for the data received from the client
interface NotifyRequestData {
  email: string;
  buildingId: string;
  // We can infer more details about the building here if needed,
  // but for now, we'll keep it simple to match the component input.
}

// Define the shape for the notify request data being saved
interface NotifyInsertData {
  user_id: string;
  space_id: string; // Using space_id to align with the database column (mapped from buildingId)
}

// Helper function for clearer error handling
const handleSupabaseError = (error: PostgrestError, operation: string) => {
  console.error(`Supabase ${operation} error:`, error.message);
  return NextResponse.json(
    { error: true, msg: `Server error during ${operation}: ${error.message}` },
    { status: 500 }
  );
};

export async function GET() {
  // This GET handler is simplified to fetch all requests for demonstration
  // In a real app, you would secure this or filter by user/admin role.
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("notify_requests")
    .select("*, users(email)");

  if (error) return handleSupabaseError(error, "fetch");

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = supabaseServer();

  try {
    const { email, buildingId }: NotifyRequestData = await request.json();

    if (!email || !buildingId) {
      return NextResponse.json(
        { error: true, msg: "Email and building ID are required" },
        { status: 400 }
      );
    }

    let userId: string;

    // --- 1. FIND OR CREATE USER ---

    // Check if user exists
    const { data: userData, error: fetchUserError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (fetchUserError && fetchUserError.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      return handleSupabaseError(fetchUserError, "user lookup");
    }

    if (userData) {
      // User exists
      userId = userData.user_id;
    } else {
      // User does not exist, create new user
      const { data: newUser, error: createUserError } = await supabase
        .from("users")
        .insert([{ email }])
        .select("user_id")
        .single();

      if (createUserError) {
        return handleSupabaseError(createUserError, "user creation");
      }
      userId = newUser.user_id;
    }

    // --- 2. CHECK FOR EXISTING NOTIFY REQUEST ---

    const { data: existingRequest, error: fetchRequestError } = await supabase
      .from("notify_requests")
      .select("notify_request_id")
      .eq("user_id", userId)
      .eq("space_id", buildingId)
      .single();

    if (fetchRequestError && fetchRequestError.code !== "PGRST116") {
      return handleSupabaseError(fetchRequestError, "notify request check");
    }

    if (existingRequest) {
      console.log(
        "Notify request already exists for this email and building_id."
      );
      return NextResponse.json(
        {
          warning: true,
          msg: "You are already on the notification list for this suite.",
        },
        { status: 200 }
      );
    }

    // --- 3. CREATE NEW NOTIFY REQUEST ---

    const notifyInsertData: NotifyInsertData = {
      user_id: userId,
      space_id: buildingId,
    };

    const { data: newRequest, error: insertRequestError } = await supabase
      .from("notify_requests")
      .insert([notifyInsertData])
      .select("notify_request_id")
      .single();

    if (insertRequestError) {
      return handleSupabaseError(
        insertRequestError,
        "notify request insertion"
      );
    }

    // The notify_request_id is returned to the client to be used for the completed_notify log
    return NextResponse.json(
      {
        success: true,
        msg: "Notification request saved successfully.",
        notify_request_id: newRequest.notify_request_id,
        email: email, // Send email back for logging
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Post handler internal error:", error);
    return NextResponse.json(
      { error: true, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
