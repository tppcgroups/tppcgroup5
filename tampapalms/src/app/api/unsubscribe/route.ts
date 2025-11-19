import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { logDbAction } from "@/lib/logs/logDbAction";

const buildResponse = (message: string, status = 200) =>
  NextResponse.json({ message }, { status });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return buildResponse("Missing unsubscribe token.", 400);
  }

  const supabase = supabaseServer();

  const userLookupPromise = (async () => {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, email")
      .eq("user_id", token)
      .single();

    return { data, error };
  })();

  const { data: user, error: userError } = await userLookupPromise;

  if (userError || !user) {
    return buildResponse("Invalid unsubscribe token.", 404);
  }

  const notifyDeletionPromise = (async () => {
    const { data, error } = await supabase
      .from("notify_requests")
      .delete()
      .eq("user_id", user.user_id);
    return { data, error };
  })();

  const completedDeletionPromise = (async () => {
    const { data, error } = await supabase
      .from("completed_notify")
      .delete()
      .eq("user_id", user.user_id);
    return { data, error };
  })();

  const { error: notifyDeleteError } = await logDbAction(
    supabase,
    notifyDeletionPromise,
    "DELETE",
    user.user_id,
    {
      table: "notify_requests",
      operation: "unsubscribe_cleanup",
      email: user.email,
    }
  );

  if (notifyDeleteError) {
    console.error("Failed to remove notify requests during unsubscribe:", notifyDeleteError.message);
    return buildResponse("Unable to process unsubscribe at this time.", 500);
  }

  const { error: completedDeleteError } = await logDbAction(
    supabase,
    completedDeletionPromise,
    "DELETE",
    user.user_id,
    {
      table: "completed_notify",
      operation: "unsubscribe_cleanup",
      email: user.email,
    }
  );

  if (completedDeleteError) {
    console.error("Failed to remove completed notify entries during unsubscribe:", completedDeleteError.message);
    return buildResponse("Unsubscribe partially processed. Please try again.", 500);
  }

  return buildResponse("You have been unsubscribed successfully.");
}

export const dynamic = "force-dynamic";
