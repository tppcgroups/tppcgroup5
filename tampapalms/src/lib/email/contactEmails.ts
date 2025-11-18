type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  recordId?: string | null;
};

function baseWrapper(content: string) {
  return `<!doctype html>
<html>
  <body style="font-family: Inter, Arial, sans-serif; background-color: #f9f7f3; padding: 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;margin:0 auto;background-color:#ffffff;border-radius:18px;padding:32px;box-shadow:0 20px 45px rgba(31,26,22,0.15);">
      <tbody>${content}</tbody>
    </table>
  </body>
</html>`;
}

export function renderConfirmationEmail(payload: ContactEmailPayload) {
  const content = `
    <tr>
      <td>
        <p style="text-transform:uppercase;letter-spacing:0.35em;font-size:12px;color:#7a6754;margin:0;">Tampa Palms Professional Center</p>
        <h1 style="font-size:26px;margin:12px 0 0;color:#1f1a16;">We received your inquiry</h1>
        <p style="margin:20px 0 0;font-size:16px;line-height:1.6;color:#4a4034;">
          Hi ${payload.name || "there"}, thanks for reaching out. Our team has your message and will follow up within one business day.
        </p>
        <div style="margin:24px 0;padding:20px;border:1px solid #e1d9cf;border-radius:16px;background-color:#fdf8f3;">
          <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.35em;text-transform:uppercase;color:#a49382;">
            Summary
          </p>
          <p style="margin:0;font-size:15px;color:#1f1a16;"><strong>Subject:</strong> ${payload.subject || "General Inquiry"}</p>
          ${
            payload.phoneNumber
              ? `<p style="margin:8px 0 0;font-size:15px;color:#1f1a16;"><strong>Phone:</strong> ${payload.phoneNumber}</p>`
              : ""
          }
          <p style="margin:12px 0 0;font-size:15px;color:#1f1a16;white-space:pre-line;">
            <strong>Message:</strong> ${payload.message}
          </p>
        </div>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#4a4034;">
          If you need anything sooner, call 813.876.7697 or reply to this email.<br/>– Tampa Palms Professional Center
        </p>
      </td>
    </tr>
  `;
  return baseWrapper(content);
}

export function renderInternalNotificationEmail(payload: ContactEmailPayload) {
  const content = `
    <tr>
      <td>
        <p style="text-transform:uppercase;letter-spacing:0.35em;font-size:12px;color:#7a6754;margin:0;">New Inquiry Received</p>
        <h1 style="font-size:24px;margin:12px 0 0;color:#1f1a16;">${payload.subject || "General Inquiry"}</h1>
        <div style="margin:24px 0 0;">
          <p style="margin:6px 0;font-size:15px;color:#1f1a16;"><strong>Name:</strong> ${payload.name}</p>
          <p style="margin:6px 0;font-size:15px;color:#1f1a16;"><strong>Email:</strong> ${payload.email}</p>
          ${
            payload.phoneNumber
              ? `<p style="margin:6px 0;font-size:15px;color:#1f1a16;"><strong>Phone:</strong> ${payload.phoneNumber}</p>`
              : ""
          }
          ${
            payload.recordId
              ? `<p style="margin:6px 0;font-size:15px;color:#1f1a16;"><strong>Record ID:</strong> ${payload.recordId}</p>`
              : ""
          }
          <p style="margin:12px 0 0;font-size:15px;color:#1f1a16;white-space:pre-line;">
            <strong>Message:</strong> ${payload.message}
          </p>
        </div>
      </td>
    </tr>
  `;
  return baseWrapper(content);
}
