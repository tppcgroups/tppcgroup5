import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRoleClient";
import { logDbAction } from "@/lib/logs/logDbAction";

const ALLOWED_EVENT_TYPES = new Set([
  "ACCESSIBILITY_ICON_CLICK",
  "ACCESSIBILITY_SETTING_CHANGE",
]);

type AccessibilityEventPayload = {
  eventType?: string;
  metadata?: Record<string, unknown>;
  userIdentifier?: string;
};

export async function POST(request: Request) {
  let payload: AccessibilityEventPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const {
    eventType,
    metadata = {},
    userIdentifier = "anonymous_accessibility_user",
  } = payload;

  if (!eventType || !ALLOWED_EVENT_TYPES.has(eventType)) {
    return NextResponse.json(
      { error: "Invalid accessibility event type" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServiceRoleClient();

  try {
    await logDbAction<null>(
      supabase,
      Promise.resolve({ data: null, error: null }),
      eventType as
        | "ACCESSIBILITY_ICON_CLICK"
        | "ACCESSIBILITY_SETTING_CHANGE",
      userIdentifier,
      {
        table: "accessibility_widget",
        operation: eventType,
        eventTypeOverride: eventType as
          | "ACCESSIBILITY_ICON_CLICK"
          | "ACCESSIBILITY_SETTING_CHANGE",
        ...metadata,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Accessibility event logging failed:", error);
    return NextResponse.json(
      { error: "Unable to log accessibility event" },
      { status: 500 }
    );
  }
}
