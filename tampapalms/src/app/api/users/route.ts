import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { logDbAction } from "@/lib/logDbAction";

// Define the interface for the data received from the client
interface UnsubscribeData {
  email: string;
}

function getUserIdFromRequest(request: Request): string {
    return 'unauthenticated_notify_user'; 
};

export async function DELETE(request: Request) {
  // get supabase server
  const supabase = supabaseServer();
  const requestBody = await request.json();
  const { email }: UnsubscribeData = requestBody;
  const initialUserId = getUserIdFromRequest(request);

  try {
    // Check if user exists

    const lookupQueryPromise = (async () => {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      return { data, error };
    })();

    const { data: userData, error: fetchUserError } = await logDbAction(
      supabase,
      lookupQueryPromise,
      "GET", // Logical DELETE operation on the users table
      initialUserId,
      { table: "users", operation: "lookup_by_email", email }
    );
    

    if (fetchUserError && fetchUserError.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      return NextResponse.json({ error: "Unable to find user to delete"}, {status: 400});
    }

    if (userData) {
        const userID = userData.user_id;
        // user exists delete user

        const deleteQueryPromise = (async () => {
          const { data, error } = await supabase
            .from("users")
            .delete()
            .eq("user_id", userID);
          
          return { data, error };
        })();

        const { data, error: deleteUserError } = await logDbAction(
          supabase,
          deleteQueryPromise,
          "DELETE",
          userID,
          { table: 'users', operation: "delete_user_by_email", email}
        );
        

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
