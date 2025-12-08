import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { renderConfirmationEmail, renderInternalNotificationEmail } from "@/lib/email/contactEmails";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRoleClient";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import { logDbAction } from "@/lib/logs/logDbAction";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string | boolean | null;
  company?: string | null;
  ["phone-number"]?: string;
  interest?: string | null;
};

const MAX_MESSAGE_LENGTH = 4000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: true,
});

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseConsent(value: ContactPayload["consent"]): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return ["true", "yes", "1", "on"].includes(value.toLowerCase());
  }
  return false;
}

function getEmailConfig() {
  const from = process.env.EMAIL_USER;
  const internal = "jrsussner@gmail.com";
  // What we will be using for internal
  // const internal = "marketing@tampapalmscenter.com"
  if (!from || !internal) {
    throw new Error("Email env vars are not fully configured.");
  }
  return { from, internal };
}


// Helper function to find or create a user by email
async function findOrCreateUser(
  supabase: SupabaseClient,
  email: string
): Promise<{ user_id: string | null; error: PostgrestError | null}> {
  const { data: userData, error: findError } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", email)
    .maybeSingle();

  if (findError) {
    console.error("Supabase user search failed:", findError);
    return { user_id: null, error: findError};
  }

  if (userData) {
    // user found in db
    return { user_id: userData.user_id, error: null};
  }

  // no user found, create new one
  const { data: insertData, error: insertError } = await supabase
    .from("users")
    .insert({ email })
    .select("user_id")
    .single();

  if (insertError) {
    // could fail due to db bugs or race condition
    console.warn("supabase user creation attempt failed. Trying search again:", insertError);

    // retry: first checking if the user now exists for race conditions
    const { data: retryData, error: retryError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (retryError) {
      // error on retry
      console.error("Supabase user creation retry failed:", retryError);
      return { user_id: null, error: retryError };
    }

    // user found after retry
    return { user_id: retryData.user_id, error: null};
  }

  // User successfully created
  return { user_id: insertData.user_id, error: null };
}
export async function POST(req: Request) {
  let payload: ContactPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = normalizeString(payload.name);
  const email = normalizeString(payload.email).toLowerCase();
  const subject = normalizeString(payload.subject);
  const message = normalizeString(payload.message);
  const phoneNumber = normalizeString(payload["phone-number"]);
  const company = normalizeString(payload.company);
  const consent = parseConsent(payload.consent);
  const interest = normalizeString(payload.interest);

  if (company) {
    return NextResponse.json({ success: true });
  }
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Please provide more detail in your message." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }

  const supabase = getSupabaseServiceRoleClient();
  let recordId: string | null = null;
  let userId: string | null = null;

  // find or create user
  try {
    const { user_id, error } = await findOrCreateUser(supabase, email);

    if (error || !user_id) {
      console.error("Failed to find or create user:", error);
      return NextResponse.json({ error: "unable to process user data right now."}, {status: 500})
    }
    userId = user_id;
  } catch (error) {
    console.error("Contact API User processing error:", error);
    return NextResponse.json({ error: "Unable to process user data right now."}, {status: 500})
  }

  try {
    const insertQueryPromise = (async () => {
      const { data, error } = await supabase
        .from("contact_us")
        .insert({
          user_id: userId,
          email,
          subject: subject || null,
          message,
          phone_number: phoneNumber || null,
        })
        .select("contact_us_id")
        .single();

      return { data, error };
    })();

    const { data, error } = await logDbAction(
      supabase,
      insertQueryPromise,
      "CONTACT_FORM_SUBMISSION",
      userId ?? "contact_form_user",
      {
        table: "contact_us",
        operation: "contact_form_submission",
        eventTypeOverride: "CONTACT_FORM_SUBMISSION",
        email,
        subject: subject || null,
        message,
        phone_number: phoneNumber || null,
        metadata: {
          consent,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
          interest: interest || null,
        },
      }
    );

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
    }
    recordId = data?.contact_us_id ?? null;
  } catch (error) {
    console.error("Contact API Supabase error:", error);
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 500 });
  }

  try {
    const { from, internal } = getEmailConfig();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      new URL(req.url).origin;
    const unsubscribeLink = `${siteUrl}/api/unsubscribe?token=${userId}`;
    const internalRecipient =
      (interest || "").toLowerCase() === "soar" ? "marketing@soarco-working.com" : internal;
    const confirmationHtml = renderConfirmationEmail({
      name,
      email,
      subject,
      message,
      phoneNumber,
      unsubscribeLink,
    });
    const internalHtml = renderInternalNotificationEmail({
      name,
      email,
      subject,
      message,
      phoneNumber,
      recordId,
      unsubscribeLink,
      interest,
    });

    await Promise.all([
      transporter.sendMail({
        from,
        to: email,
        subject: "We received your inquiry",
        html: confirmationHtml,
      }),
      transporter.sendMail({
        from,
        to: internalRecipient,
        subject: recordId ? `New contact inquiry (#${recordId})` : "New contact inquiry",
        html: internalHtml,
      }),
    ]);
  } catch (error) {
    console.error("Failed to send notification emails:", error);
  }

  return NextResponse.json({ success: true });
}
