import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import React from 'react';

import { EmailTemplate } from '@/app/components/email/EmailTemplate';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMPT_PORT) === 467,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { recipient, subject } = body;

        const { renderToString } = await import('react-dom/server');
        const htmlContent = renderToString(
            React.createElement(EmailTemplate)
        )

        console.log("Received HTML Content:", htmlContent);

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