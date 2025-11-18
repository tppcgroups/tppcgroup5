import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";

// Define the interface for the data received from the client
interface UnsubscribeData {
  email: string;
}

export async function DELETE(request: Request) {
  // get supabase server
  const supabase = supabaseServer();

  try {
    const { email }: UnsubscribeData = await request.json();
    // Check if user exists
    const { data: userData, error: fetchUserError } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

    if (fetchUserError && fetchUserError.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      return NextResponse.json({ error: "Unable to find user to delete"}, {status: 400});
    }

    if (userData) {
        let userID = userData.user_id;
        // user exists delete user
        const { error: deleteUserError } = await supabase
            .from("users")
            .delete()
            .eq("user_id", userID);

        if (deleteUserError) {
            return NextResponse.json({ error: "Database error: failed to delete user."}, {status: 500});
        }

        // No error user successfully deleted
        return NextResponse.json({ success: true, message: "User successfully deleted"}, {status: 200});
    }
  } catch (error) {
    console.error("Internal server error during deletion:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
