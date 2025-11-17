import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import React from 'react';

import { EmailTemplate } from '@/app/components/email/EmailTemplate';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  requireTLS: true,
});
    

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
          recipient,
          subject,
          buildingId,
          marketingEmail,
          subscribeUrl,
          logoUrl,
        } = body;

        if (!recipient || !subject) {
          return NextResponse.json(
            { error: "Recipient and subject are required" },
            { status: 400 }
          );
        }

        const { renderToString } = await import('react-dom/server');
        const htmlContent = renderToString(
            React.createElement(EmailTemplate, {
              recipientEmail: recipient,
              buildingId,
              marketingEmail: marketingEmail || process.env.MARKETING_EMAIL || process.env.EMAIL_USER,
              subscribeUrl,
              logoUrl: logoUrl || process.env.MARKETING_LOGO_URL,
            })
        )

        if (
          !htmlContent ||
          typeof htmlContent !== "string" ||
          htmlContent.trim().length === 0
        ) {
          console.error("htmlContent is missing or empty!");
          // You might want to return an error response here instead of proceeding
          // return NextResponse.json({ message: 'Missing email content' }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: recipient,
            subject: subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error sending email" }, { status: 500 });
    }
}
