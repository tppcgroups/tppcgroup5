import React from "react";

type AvailabilityNotificationEmailProps = {
  recipientEmail: string;
  buildingId: string;
  buildingLabel?: string;
  streetAddress?: string | null;
  price?: string | null;
  marketingEmail?: string;
  subscribeUrl?: string;
  logoUrl?: string;
  unsubscribeLink?: string;
};

export function AvailabilityNotificationEmail({
  recipientEmail,
  buildingId,
  buildingLabel,
  streetAddress,
  price,
  marketingEmail,
  subscribeUrl,
  logoUrl,
  unsubscribeLink,
}: AvailabilityNotificationEmailProps) {
  return (
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{ fontFamily: "Helvetica, Arial, sans-serif", backgroundColor: "#f5f1eb", padding: "24px" }}
    >
      <tbody>
        <tr>
          <td>
            <table
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 15px 40px rgba(20,15,10,0.1)" }}
            >
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "#1f1a16", padding: "28px", color: "#ffffff" }}>
                    <img
                      src={logoUrl || "https://tampapalmscenter.com/logo.png"}
                      alt="Tampa Palms Professional Center"
                      style={{ width: "160px", display: "block", marginBottom: "16px" }}
                    />
                    <p style={{ letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "12px", margin: 0 }}>Availability Update</p>
                    <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "12px 0 0" }}>A Suite Just Opened Up</h1>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "32px" }}>
                    <p style={{ fontSize: "16px", color: "#1f1a16", margin: "0 0 16px" }}>
                      Hi {recipientEmail},
                    </p>
                    <p style={{ fontSize: "16px", color: "#4a4034", margin: "0 0 16px" }}>
                      Great news—{buildingLabel || buildingId} is now available and you’re first in line. We saved your spot when you requested notifications, so you can move quickly before the suite is gone again.
                    </p>
                    {streetAddress && (
                      <p style={{ fontSize: "15px", color: "#4a4034", margin: "0 0 12px" }}>
                        <strong>Address:</strong> {streetAddress}
                      </p>
                    )}
                    {price && (
                      <p style={{ fontSize: "15px", color: "#4a4034", margin: "0 0 12px" }}>
                        <strong>Lease Details:</strong> {price}
                      </p>
                    )}
                    <p style={{ fontSize: "15px", color: "#4a4034", margin: "0 0 24px" }}>
                      Reply to this email or contact our leasing team to schedule a tour or start paperwork.
                    </p>
                    <a
                      href={`https://tampapalmscenter.com/pages/Availability?spaceId=${encodeURIComponent(buildingId)}`}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#1f1a16",
                        color: "#ffffff",
                        textDecoration: "none",
                        padding: "14px 26px",
                        borderRadius: "999px",
                        fontWeight: 600,
                      }}
                    >
                      View Suite Details
                    </a>
                    <p style={{ fontSize: "14px", color: "#7a6754", margin: "24px 0 0" }}>
                      This notification was sent because you asked to be alerted when {buildingLabel || "a suite"} became available.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f9f6f1", padding: "20px", textAlign: "center", color: "#7a6754", fontSize: "13px" }}>
                    <p style={{ margin: 0 }}>
                      Questions? Email us at <a href={`mailto:${marketingEmail || "leasing@tampapalmscenter.com"}`} style={{ color: "#4a4034" }}>{marketingEmail || "leasing@tampapalmscenter.com"}</a>
                    </p>
                    <p style={{ margin: "8px 0 0" }}>
                      {unsubscribeLink ? (
                        <a href={unsubscribeLink} style={{ color: "#4a4034" }}>Unsubscribe instantly</a>
                      ) : subscribeUrl ? (
                        <a href={subscribeUrl} style={{ color: "#4a4034" }}>Manage notification preferences</a>
                      ) : (
                        <span>Manage notification preferences anytime.</span>
                      )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
