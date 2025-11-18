import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { PostgrestError } from "@supabase/supabase-js";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { logDbAction } from "@/lib/logDbAction";

// Define the interface for the data received from the client
interface CompletedNotifyPayload {
  notify_request_id: string; // The UUID generated when the request was saved
  user_email: string; // The email used to find the user_id
  buildingId: string; // The ID of the building/suite (space_id)
  building_number: number;
  suite_number: string;
  title: string;
}

// Helper function for clearer error handling
const handleSupabaseError = (error: PostgrestError, operation: string) => {
  console.error(`Supabase ${operation} error:`, error.message);
  return NextResponse.json(
    { error: true, msg: `Server error during ${operation}: ${error.message}` },
    { status: 500 }
  );
};

export async function POST(request: Request) {
  const supabase = supabaseServer();

  try {
    const {
      notify_request_id,
      user_email,
      buildingId,
    }: CompletedNotifyPayload = await request.json();

    if (!notify_request_id || !user_email || !buildingId) {
      return NextResponse.json(
        {
          error: true,
          msg: "Missing required fields (request ID, email, or building ID)",
        },
        { status: 400 }
      );
    }

    // --- 1. GET USER ID FROM EMAIL ---

    // We need the user_id for the completed_notify foreign key
    const { data: userData, error: fetchUserError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", user_email)
      .single();

    if (fetchUserError) {
      // Note: If the error code is PGRST116 (No rows found), we can't log the completion.
      if (fetchUserError.code === "PGRST116") {
        console.warn(
          `User not found for email: ${user_email}. Cannot log completion.`
        );
        return NextResponse.json(
          { warning: true, msg: "User record not found, logging skipped." },
          { status: 200 }
        );
      }
      return handleSupabaseError(fetchUserError, "user lookup for completion");
    }

    const userId = userData.user_id;

    // grab the created_at time stamp from notify request
    let requestTimestamp: Timestamp | null = null;

    const { data: requestData, error: fetchRequestError } = await supabase
      .from("notify_requests")
      .select("created_at")
      .eq("notify_request_id", notify_request_id)
      .single()

    if (fetchRequestError) {
      console.error(`Failed to fetch notify request (ID: ${notify_request_id}:`, fetchRequestError.message);
    } else {
      requestTimestamp = requestData.created_at;
    }

    // --- 2. INSERT COMPLETED NOTIFY LOG ---

    const delimiter: string = "-";
    const index = buildingId.indexOf(delimiter);
    const suite_num: string = buildingId.substring(index + 1);

    const insertData = {
      user_id: userId,
      notify_request_id: notify_request_id,
      space_id: buildingId,
      building_number: parseInt(buildingId[0]),
      suite_number: suite_num,
      title: "Space Notify Request",
      created_at: requestTimestamp,
    };

    // define the query promise for logging
    const queryPromise = (async () => {
      const { data, error } = await supabase
        .from("completed_notify")
        .insert([insertData]);

      return { data, error }
    })();

    const { error: insertError } = await logDbAction(
      supabase,
      queryPromise,
      'POST',
      userId,
      {
        table: 'completed_notify',
        request_id: notify_request_id,
        space_id: buildingId,
      }
    )

    if (insertError) {
      return handleSupabaseError(insertError, "completion log insertion");
    }

    return NextResponse.json(
      { success: true, msg: "Notification completion logged successfully." },
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
