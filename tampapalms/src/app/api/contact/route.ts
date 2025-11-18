import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { renderConfirmationEmail, renderInternalNotificationEmail } from "@/lib/email/contactEmails";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRoleClient";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string | boolean | null;
  company?: string | null;
  ["phone-number"]?: string;
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
  const from = process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER;
  const internal = process.env.EMAIL_INTERNAL_NOTIFICATIONS;
  if (!from || !internal) {
    throw new Error("Email env vars are not fully configured.");
  }
  return { from, internal };
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

  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        subject: subject || null,
        message,
        phone_number: phoneNumber || null,
        metadata: {
          consent,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
        },
      })
      .select("contact_us_id")
      .single();

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
    const confirmationHtml = renderConfirmationEmail({
      name,
      email,
      subject,
      message,
      phoneNumber,
    });
    const internalHtml = renderInternalNotificationEmail({
      name,
      email,
      subject,
      message,
      phoneNumber,
      recordId,
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
        to: internal,
        subject: recordId ? `New contact inquiry (#${recordId})` : "New contact inquiry",
        html: internalHtml,
      }),
    ]);
  } catch (error) {
    console.error("Failed to send notification emails:", error);
  }

  return NextResponse.json({ success: true });
}
