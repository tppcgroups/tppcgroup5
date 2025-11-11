import React from 'react'

const DEFAULT_INLINE_LOGO = "tppcgroup5.vercel.app/TampaPalmsLogo.png"

type EmailTemplateProps = {
  recipientEmail?: string;
  buildingId?: string;
  marketingEmail?: string;
  subscribeUrl?: string;
  logoUrl?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  recipientEmail = "there",
  buildingId = "your requested suite",
  marketingEmail = "marketing@tampapalmscenter.com",
  subscribeUrl = "https://tampapalms.com/updates",
  logoUrl,
}) => {
  const headline = `You're on the alert list for ${buildingId}`;
  const resolvedLogo =
    logoUrl === "" ? undefined : logoUrl ?? DEFAULT_INLINE_LOGO;
  const shouldRenderLogo = Boolean(resolvedLogo);

  return (
    <div
      style={{
        margin: 0,
        padding: "24px",
        backgroundColor: "#f4f5f7",
        fontFamily: "'Inter', Arial, sans-serif",
      }}
    >
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{
          maxWidth: 640,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(15,23,42,0.12)",
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                background: "linear-gradient(135deg,#0f172a,#1e293b)",
                padding: "32px 40px",
                color: "#ffffff",
              }}
            >
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
              >
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle" }}>
                      <table
                        role="presentation"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ color: "#ffffff" }}
                      >
                        <tbody>
                          <tr>
                            {shouldRenderLogo ? (
                              <td style={{ paddingRight: 14 }}>
                                <img
                                  src={resolvedLogo}
                                  alt=""
                                  aria-hidden="true"
                                  role="presentation"
                                  width={140}
                                  height={48}
                                  style={{
                                    display: "block",
                                    maxWidth: "140px",
                                    width: "100%",
                                    height: "auto",
                                    border: 0,
                                  }}
                                />
                              </td>
                            ) : null}
                            <td>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  letterSpacing: 1.6,
                                  textTransform: "uppercase",
                                  color: "#ffffff",
                                }}
                              >
                                Tampa Palms Professional Center
                              </p>
                              <p
                                style={{
                                  margin: "6px 0 0",
                                  fontSize: 16,
                                  fontWeight: 600,
                                  color: "#ffffff",
                                }}
                              >
                                Leasing & Marketing
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                      <h1
                        style={{
                          margin: 0,
                          fontSize: 28,
                          fontWeight: 600,
                          color: "#ffffff",
                        }}
                      >
                        Availability Request Received
                      </h1>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td style={{ padding: "40px 40px 32px", color: "#0f172a" }}>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
                Hi {recipientEmail},
              </p>

              <h2
                style={{
                  margin: "24px 0 12px",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                {headline}
              </h2>

              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#475467",
                }}
              >
                We received your “Notify me” request using{" "}
                <strong>{recipientEmail}</strong>, so we’ll reach out the moment
                suite <strong>{buildingId}</strong> opens up.
              </p>

              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#475467",
                }}
              >
                Our marketing team will message you directly from{" "}
                <strong>{marketingEmail}</strong> with tailored availability
                details, next steps, and a personal walkthrough invitation as
                soon as that space is ready.
              </p>

              <div
                style={{
                  margin: "28px 0",
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  backgroundColor: "#f8fafc",
                }}
              >
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: 15,
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    color: "#0f172a",
                    fontWeight: 600,
                  }}
                >
                  What happens next
                </p>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 18,
                    color: "#475467",
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  <li>
                    We monitor suite <strong>{buildingId}</strong> for status
                    changes in real time.
                  </li>
                  <li>
                    Once it’s available, we email you from {marketingEmail} with
                    photos, specs, and booking options.
                  </li>
                  <li>
                    You can reply directly to coordinate tours or request
                    comparable spaces.
                  </li>
                </ul>
              </div>

              <div style={{ margin: "0 0 28px", padding: 0 }}>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#0f172a",
                  }}
                >
                  Have more questions?
                </p>
                <p
                  style={{ margin: "0 0 16px", fontSize: 15, color: "#475467" }}
                >
                  Email us directly or click the button below to head to our
                  contact page.
                </p>
                <a
                  href="https://tppcgroup5.vercel.app/pages/Contact"
                  target="_blank"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "12px 28px",
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  Contact Page
                </a>
              </div>

              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#0f172a",
                }}
              >
                Warm regards,
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "#475467",
                  lineHeight: 1.6,
                }}
              >
                Tampa Palms Professional Center
                <br />
                (813) 876-7697
              </p>
            </td>
          </tr>

          <tr>
            <td
              style={{
                padding: "24px 40px 32px",
                backgroundColor: "#f8fafc",
                color: "#94a3b8",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 13,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Tampa Palms Professional Center
              </p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                17427 Bridge Hill Ct STE C, Tampa, FL 33647
                <br />
                Prefer not to receive alerts?{" "}
                <a
                  href={`${subscribeUrl}?preference=unsubscribe`}
                  style={{
                    color: "#0f172a",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Update your email preferences
                </a>
                .
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
