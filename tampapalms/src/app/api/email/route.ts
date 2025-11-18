import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import React from "react";

// Assuming this path for the Supabase server client (needed for logging)
import { supabaseServer } from "@/lib/supabase/serverClient";
import { EmailTemplate } from "@/app/components/email/EmailTemplate";

// This function runs asynchronously to log the email event without blocking the main API response.
const logEmailAction = (
  recipient: string,
  subject: string,
  success: boolean,
  errorDetails?: any
) => {
  const supabase = supabaseServer(); // Initialize client for server-side logging

  // Non-blocking async function to insert the log
  (async () => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event_type: "EMAIL_SENT",
      user_identifier: recipient, // Use recipient email as identifier
      metadata: {
        success: success,
        subject: subject,
        error_message: success
          ? null
          : errorDetails?.message || JSON.stringify(errorDetails),
        service: "Nodemailer",
      },
    };

    try {
      const { error: logError } = await supabase.from("logs").insert(logEntry);

      if (logError) {
        console.error(
          "Failed to insert email log entry (DB Error):",
          logError.message
        );
      }
    } catch (logCatchError) {
      console.error("Catch error during email log insertion:", logCatchError);
    }
  })();
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: true,
});

export async function POST(request: Request) {
  let recipient: string = "";
  let subject: string = "";

  try {
    const body = await request.json();
    const {
      recipient: reqRecipient,
      subject: reqSubject,
      buildingId,
      marketingEmail,
      subscribeUrl,
      logoUrl,
    } = body;

    recipient = reqRecipient;
    subject = reqSubject;

    if (!recipient || !subject) {
      return NextResponse.json(
        { error: "Recipient and subject are required" },
        { status: 400 }
      );
    }

    const { renderToString } = await import("react-dom/server");
    const htmlContent = renderToString(
      React.createElement(EmailTemplate, {
        recipientEmail: recipient,
        buildingId,
        marketingEmail:
          marketingEmail ||
          process.env.MARKETING_EMAIL ||
          process.env.EMAIL_USER,
        subscribeUrl,
        logoUrl: logoUrl || process.env.MARKETING_LOGO_URL,
      })
    );

    if (
      !htmlContent ||
      typeof htmlContent !== "string" ||
      htmlContent.trim().length === 0
    ) {
      console.error("htmlContent is missing or empty!");
      // If content is missing, we log it as an error before returning the response
      logEmailAction(recipient, subject, false, {
        message: "Missing or empty email content",
      });
      return NextResponse.json(
        { message: "Missing email content" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: recipient,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    // Log the successful email send 
    logEmailAction(recipient, subject, true);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    // Log the failed email send 
    logEmailAction(recipient, subject, false, error);

    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
