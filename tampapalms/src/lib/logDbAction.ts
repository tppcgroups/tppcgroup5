import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

/**
 * Executes a database query and logs the action to the logs table
 * @param supabase The Supabase client instance (serverClient)
 * @param queryPromise The promise returned by a Supabase query
 * @param eventType The type of api call (get, post, delete)
 * @param userIdentifier A string identifying the user (email, id or anonymous)
 * @param metadata Extra details about the operation (request body, query parameter)
 * @returns The result of the original supabase query
 */

export async function logDbAction<T>(
    supabase: SupabaseClient,
    queryPromise: Promise<{ data: T | null; error: any}>,
    eventType: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    userIdentifier: string,
    metadata: Record<string, any> = {},
): Promise<{ data: T | null; error: any}> {
    
    // Execute the main DB query
    const result = await queryPromise;

    // Prepare log entry
    const logEntry = {
        timestamp: new Date().toISOString(),
        event_type: eventType,
        user_identifier: userIdentifier,
        // Add original query details and error status to metadata
        metadata: {
            table: metadata.table || 'unknown',
            success: !result.error,
            original_error: result.error ? result.error.message : null, 
            ...metadata,
        },
    };

    // Log the event, using a non-awaited async function to ensure loggin run in background
    (async () => {
      try {
        const { error: logError } = await supabase
          .from("logs")
          .insert(logEntry);
        if (logError) {
          console.error("Failed to insert log entry:", logError.message);
        }
      } catch (logCatchError: any) {
        console.error("Catch error during log insertion:", logCatchError);
      }
    })();

    // Return the result of the original query
    return result;
}