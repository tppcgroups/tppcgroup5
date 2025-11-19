import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { logDbAction } from "@/lib/logs/logDbAction";

const marketingEmailAddress =
  process.env.MARKETING_EMAIL ||
  process.env.NEXT_PUBLIC_MARKETING_EMAIL ||
  process.env.EMAIL_USER ||
  "marketing@tampapalms.com";

const unsubscribeUrl =
  process.env.NOTIFY_SUBSCRIBE_URL ||
  process.env.NEXT_PUBLIC_NOTIFY_SUBSCRIBE_URL ||
  "https://tppcgroup5.vercel.app/pages/DeleteEmail";

const marketingLogoUrl =
  process.env.MARKETING_LOGO_URL || process.env.NEXT_PUBLIC_LOGO_URL || "";

type AvailableSpaceRow = {
  building_id: string;
  building_number: number | null;
  suite_number: string | null;
  availability_status: string | null;
  street_address: string | null;
  price: string | null;
};

type PendingNotifyRow = {
  notify_request_id: string;
  user_id: string;
  space_id: string;
  building_number: number | null;
  suite_number: string | null;
  title: string | null;
  created_at: string | null;
  users?: { email: string | null } | null;
};

const normalizeSpaceId = (value: string | null | undefined) =>
  value ? value.trim().toLowerCase() : null;

const isSpaceAvailable = (status: string | null | undefined) => {
  if (!status) return false;
  const normalized = status.trim().toLowerCase();
  return normalized === "available" || normalized.includes("available");
};

const describeSpace = (space: AvailableSpaceRow, fallback?: PendingNotifyRow) => {
  const buildingNum =
    space.building_number ?? fallback?.building_number ?? undefined;
  const suiteNum = space.suite_number ?? fallback?.suite_number ?? undefined;
  const buildingLabel = buildingNum ? `Building ${buildingNum}` : "A suite";
  return suiteNum ? `${buildingLabel} · Suite ${suiteNum}` : buildingLabel;
};

const sendAvailabilityEmail = async ({
  origin,
  recipient,
  buildingId,
  subject,
  buildingLabel,
  streetAddress,
  price,
  unsubscribeToken,
}: {
  origin: string;
  recipient: string;
  buildingId: string;
  subject: string;
  buildingLabel?: string;
  streetAddress?: string | null;
  price?: string | null;
  unsubscribeToken?: string;
}) => {
  const emailEndpoint = new URL("/api/email", origin).toString();
  const payload = {
    recipient,
    subject,
    buildingId,
    template: "availability-notification",
    marketingEmail: marketingEmailAddress,
    subscribeUrl: unsubscribeUrl,
    logoUrl: marketingLogoUrl,
    buildingLabel,
    streetAddress,
    price,
    unsubscribeToken,
  };

  const response = await fetch(emailEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to send availability email to ${recipient} for ${buildingId}:`,
      errorText
    );
    return false;
  }

  return true;
};

async function processNotifications(request: Request) {
  const supabase = supabaseServer();

  const pendingQuery = (async () => {
    const { data, error } = await supabase
      .from("notify_requests")
      .select(
        "notify_request_id, user_id, space_id, building_number, suite_number, title, created_at"
      )
      .returns<PendingNotifyRow[]>();

    return { data: data ?? [], error };
  })();

  const { data: pendingRequests, error: pendingError } = await pendingQuery;

  if (pendingError) {
    throw new Error(`Failed to fetch notify requests: ${pendingError.message}`);
  }

  if (!pendingRequests || pendingRequests.length === 0) {
    return NextResponse.json({
      message: "No notify requests found.",
      totalPending: 0,
      processed: 0,
    });
  }

  const userIds = Array.from(
    new Set(
      pendingRequests
        .map((request) => request.user_id)
        .filter((id): id is string => Boolean(id))
    )
  );

  const userEmailMap = new Map<string, string | null>();

  if (userIds.length > 0) {
    const { data: userRows, error: userFetchError } = await supabase
      .from("users")
      .select("user_id, email")
      .in("user_id", userIds)
      .returns<Array<{ user_id: string; email: string | null }>>();

    if (userFetchError) {
      throw new Error(`Failed to fetch user emails: ${userFetchError.message}`);
    }

    userRows?.forEach((row) => {
      if (row.user_id) {
        userEmailMap.set(row.user_id, row.email ?? null);
      }
    });
  }

  const spacesQuery = (async () => {
    const { data, error } = await supabase
      .from("buildings")
      .select(
        "building_id, building_number, suite_number, availability_status, street_address, price"
      )
      .returns<AvailableSpaceRow[]>();

    return { data: data ?? [], error };
  })();

  const { data: spaces, error: spacesError } = await spacesQuery;
  if (spacesError) {
    throw new Error(`Failed to fetch building availability: ${spacesError.message}`);
  }

  const availableSpaceMap = new Map<string, AvailableSpaceRow>();
  for (const space of spaces ?? []) {
    const normalizedId = normalizeSpaceId(space.building_id);
    if (!normalizedId) continue;
    if (isSpaceAvailable(space.availability_status)) {
      availableSpaceMap.set(normalizedId, space);
    }
  }

  if (availableSpaceMap.size === 0) {
    return NextResponse.json({
      message: "No suites are currently marked as available.",
      totalPending: pendingRequests.length,
      processed: 0,
    });
  }

  const origin = new URL(request.url).origin;

  const summary = {
    totalPending: pendingRequests.length,
    eligible: 0,
    processed: 0,
    emailFailures: [] as Array<{ notify_request_id: string; email: string; reason: string }>,
    skipped: [] as Array<{ notify_request_id: string; reason: string }>,
  };

  for (const requestRow of pendingRequests) {
    const normalizedSpaceId = normalizeSpaceId(requestRow.space_id);
    if (!normalizedSpaceId) {
      summary.skipped.push({
        notify_request_id: requestRow.notify_request_id,
        reason: "Space ID missing or invalid",
      });
      continue;
    }

    const availableSpace = availableSpaceMap.get(normalizedSpaceId);
    if (!availableSpace) {
      continue;
    }

    summary.eligible += 1;

    const recipient = userEmailMap.get(requestRow.user_id) ?? null;
    if (!recipient) {
      summary.skipped.push({
        notify_request_id: requestRow.notify_request_id,
        reason: "Missing user email",
      });
      continue;
    }

    const buildingLabel = describeSpace(availableSpace, requestRow);
    const subject = `Good news! ${buildingLabel} is now available`;
    const emailSent = await sendAvailabilityEmail({
      origin,
      recipient,
      buildingId: requestRow.space_id,
      subject,
      buildingLabel,
      streetAddress: availableSpace.street_address,
      price: availableSpace.price,
      unsubscribeToken: requestRow.user_id ?? undefined,
    });

    if (!emailSent) {
      summary.emailFailures.push({
        notify_request_id: requestRow.notify_request_id,
        email: recipient,
        reason: "Email service responded with an error",
      });
      continue;
    }

    const completionInsertPromise = (async () => {
      const { data, error } = await supabase
        .from("completed_notify")
        .insert([
          {
            user_id: requestRow.user_id,
            notify_request_id: requestRow.notify_request_id,
            space_id: requestRow.space_id,
            building_number:
              availableSpace.building_number ?? requestRow.building_number,
            suite_number:
              availableSpace.suite_number ?? requestRow.suite_number,
            title: requestRow.title ?? "Space Notify Request",
            created_at: requestRow.created_at,
          },
        ]);
      return { data, error };
    })();

    const { error: completionInsertError } = await logDbAction(
      supabase,
      completionInsertPromise,
      "POST",
      requestRow.user_id ?? "notify_user",
      {
        table: "completed_notify",
        operation: "user_notified_of_availability",
        request_id: requestRow.notify_request_id,
        space_id: requestRow.space_id,
      }
    );

    if (completionInsertError) {
      summary.emailFailures.push({
        notify_request_id: requestRow.notify_request_id,
        email: recipient,
        reason: `Failed to log completion: ${completionInsertError.message}`,
      });
      continue;
    }

    const removeRequestPromise = (async () => {
      const { data, error } = await supabase
        .from("notify_requests")
        .delete()
        .eq("notify_request_id", requestRow.notify_request_id);
      return { data, error };
    })();

    const { error: removalError } = await logDbAction(
      supabase,
      removeRequestPromise,
      "DELETE",
      requestRow.user_id ?? "notify_user",
      {
        table: "notify_requests",
        operation: "cleanup_after_notification",
        request_id: requestRow.notify_request_id,
        space_id: requestRow.space_id,
      }
    );

    if (removalError) {
      summary.emailFailures.push({
        notify_request_id: requestRow.notify_request_id,
        email: recipient,
        reason: `Failed to remove pending request: ${removalError.message}`,
      });
      continue;
    }

    summary.processed += 1;
  }

  return NextResponse.json({
    message: "Completed availability notification run.",
    ...summary,
  });
}

export async function POST(request: Request) {
  try {
    return await processNotifications(request);
  } catch (error) {
    console.error("completed-notify cron failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
