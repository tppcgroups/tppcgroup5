import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { PostgrestError } from "@supabase/supabase-js";
import { logDbAction } from "@/lib/logs/logDbAction";

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
  building_number: number;
  suite_number: string;
  title: string,
}

// Helper function for clearer error handling
const handleSupabaseError = (error: PostgrestError, operation: string) => {
  console.error(`Supabase ${operation} error:`, error.message);
  return NextResponse.json(
    { error: true, msg: `Server error during ${operation}: ${error.message}` },
    { status: 500 }
  );
};

function getUserIdFromRequest(request: Request): string {
    return 'unauthenticated_notify_user'; 
};


export async function GET() {
  // This GET handler is simplified to fetch all requests for demonstration
  const supabase = supabaseServer();
  const userId = 'system_request';

  const queryPromise = (async () => {
    const { data, error } = await supabase.from("notify_requests").select("*, users(email)");

    return { data, error };
  })();
  const { data, error } = await logDbAction(
    supabase, 
    queryPromise,
    'GET',
    userId,
    {
      table: 'notify_requests',
      operation: 'select_all_with_users'
    }
  );

  if (error) return handleSupabaseError(error, "fetch");

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = supabaseServer();
  const requstBody = await request.json();
  const { email, buildingId }: NotifyRequestData = requstBody;
  const initialUserId = getUserIdFromRequest(request);

  try {
    if (!email || !buildingId) {
      return NextResponse.json(
        { error: true, msg: "Email and building ID are required" },
        { status: 400 }
      );
    }

    let userId: string;

    // FIND OR CREATE USER ---

    // Check if user exists, log it
    const lookupQueryPromise = (async () => {
      const { data, error } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .single();

      return { data, error };
    })();

    // Execute query via logger
    const { data: userData, error: fetchUserError } = await logDbAction(
      supabase,
      lookupQueryPromise,
      "GET", // Logical GET operation on the users table
      initialUserId,
      { table: "users", operation: "lookup_by_email", email }
    );

    if (fetchUserError && fetchUserError.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      return handleSupabaseError(fetchUserError, "user lookup");
    }

    if (userData) {
      // User exists
      userId = userData.user_id;
    } else {
      // User does not exist, create new user

      const createQueryPromise = (async () => {
        const { data, error } = await supabase
          .from("users")
          .insert([{ email }])
          .select("user_id")
          .single();

        return { data, error };
      })();

      // Execute creation via logger
      const { data: newUser, error: createUserError } = await logDbAction(
        supabase,
        createQueryPromise,
        "POST", // Logical POST operation on the users table
        initialUserId,
        { table: "users", operation: "create_new_user", email }
      );

      if (createUserError) {
        return handleSupabaseError(createUserError, "user creation");
      }
      userId = newUser!.user_id;
    }

    // --- 2. CHECK FOR EXISTING NOTIFY REQUEST ---

    const checkQueryPromise = (async () => {
      const { data, error } = await supabase
        .from("notify_requests")
        .select("notify_request_id")
        .eq("user_id", userId)
        .eq("space_id", buildingId)
        .single();

      return { data, error };
    })();

    // Execute check via logger
    const { data: existingRequest, error: fetchRequestError } =
      await logDbAction(
        supabase,
        checkQueryPromise,
        "GET", // Logical GET operation
        userId,
        {
          table: "notify_requests",
          operation: "check_existing",
          space_id: buildingId,
        }
      );

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
    // logic to grab suite number
    const delimiter: string = "-";
    const index = buildingId.indexOf(delimiter);
    const suite_num: string = buildingId.substring(index + 1);

    // --- 3. CREATE NEW NOTIFY REQUEST ---

    const notifyInsertData: NotifyInsertData = {
      user_id: userId,
      space_id: buildingId,
      building_number: parseInt(buildingId[0]),
      suite_number: suite_num,
      title: "Space Notify Request",
    };

    // Define query promise for insertion
    const insertQueryPromise = (async () => {
      const { data, error } = await supabase
        .from("notify_requests")
        .insert([notifyInsertData])
        .select("notify_request_id")
        .single();
      return { data, error };
    })();

    // Execute insertion via logger
    const { data: newRequest, error: insertRequestError } = await logDbAction(
      supabase,
      insertQueryPromise,
      "POST", // Logical POST operation
      userId,
      {
        table: "notify_requests",
        operation: "create_new",
        space_id: buildingId,
      }
    );

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
        notify_request_id: newRequest!.notify_request_id,
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
