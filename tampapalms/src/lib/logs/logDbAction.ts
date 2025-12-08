import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import config from "../../../../config.json";

const EVENT_TYPES = [
  "CONTACT_FORM_SUBMISSION",
  "ACCESSIBILITY_ICON_CLICK",
  "ACCESSIBILITY_SETTING_CHANGE",
  "ERROR",
  "404_ERROR",
  "FORM_PROCESSING_FAILED",
  "SESSION_START",
  "SESSION_END",
] as const;

type AllowedEventType = (typeof EVENT_TYPES)[number];
type LegacyApiVerb = "GET" | "POST" | "DELETE" | "PATCH";
type EventTypeInput = AllowedEventType | LegacyApiVerb;

type LogMetadata = Record<string, unknown> & {
  eventType?: AllowedEventType;
  eventTypeOverride?: AllowedEventType;
  statusCode?: number;
};

const isAllowedEventType = (value: unknown): value is AllowedEventType => {
  return typeof value === "string" && EVENT_TYPES.includes(value as AllowedEventType);
};

const deriveEventType = (
  providedType: EventTypeInput,
  resultError: PostgrestError | null,
  metadata: LogMetadata
): AllowedEventType => {
  const override = metadata.eventTypeOverride ?? metadata.eventType;
  if (isAllowedEventType(override)) {
    return override;
  }

  if (resultError) {
    // Explicit 404 detection
    if (
      resultError.code === "PGRST116" ||
      metadata.statusCode === 404 ||
      `${metadata.operation ?? ""}`.toLowerCase().includes("not_found")
    ) {
      return "404_ERROR";
    }

    if (providedType === "POST") {
      return "FORM_PROCESSING_FAILED";
    }

    return "ERROR";
  }

  if (isAllowedEventType(providedType)) {
    return providedType;
  }

  switch (providedType) {
    case "GET":
      return "SESSION_START";
    case "POST": {
      const op = `${metadata.operation ?? ""}`.toLowerCase();
      if (op.includes("contact")) {
        return "CONTACT_FORM_SUBMISSION";
      }
      return "SESSION_START";
    }
    case "DELETE":
      return "SESSION_END";
    case "PATCH":
      return "ACCESSIBILITY_SETTING_CHANGE";
    default:
      return "SESSION_START";
  }
};

const LOGGING_ENABLED =
  typeof config?.features?.loggingEnabled === "boolean"
    ? config.features.loggingEnabled
    : true;

/**
 * Executes a database query and logs the action to the logs table
 * @param supabase The Supabase client instance (serverClient)
 * @param queryPromise The promise returned by a Supabase query
 * @param eventType The specific event type or legacy HTTP verb
 * @param userIdentifier A string identifying the user (email, id or anonymous)
 * @param metadata Extra details about the operation (request body, query parameter)
 * @returns The result of the original supabase query
 */

export async function logDbAction<T>(
    supabase: SupabaseClient,
    queryPromise: Promise<{ data: T | null; error: PostgrestError | null}>,
    eventType: EventTypeInput,
    userIdentifier: string,
    metadata: LogMetadata = {},
): Promise<{ data: T | null; error: PostgrestError | null}> {

    if (!LOGGING_ENABLED) {
      return queryPromise;
    }
    
    // Execute the main DB query
    const result = await queryPromise;
    const resolvedEventType = deriveEventType(eventType, result.error, metadata);

    // Prepare log entry
    const logEntry = {
        timestamp: new Date().toISOString(),
        event_type: resolvedEventType,
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
      } catch (logCatchError) {
        console.error("Catch error during log insertion:", logCatchError);
      }
    })();

    // Return the result of the original query
    return result;
}
