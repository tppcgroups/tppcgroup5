const Row = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 shrink-0 text-emerald-700">{icon}</div>
    <div>
      <p className="font-semibold">{title}</p>
      <div className="text-neutral-800">{children}</div>
    </div>
  </div>
);

export default function InfoBlock() {
  return (
    <div className="space-y-6 text-lg">
      <Row
        title="Phone"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.49a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.02l-2.2 2.2z" />
          </svg>
        }
      >
        <a
          href="tel:+18138767697"
          className="underline decoration-neutral-400 hover:decoration-emerald-700"
        >
          813.876.7697
        </a>
      </Row>

      <Row
        title="Email"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4a2 2 0 00-2 2v.35l10 6.25L22 6.35V6a2 2 0 00-2-2zm0 4.21l-8 5-8-5V18a2 2 0 002 2h12a2 2 0 002-2V8.21z" />
          </svg>
        }
      >
        <a
          href="mailto:admin@tampapalmscenter.com"
          className="underline decoration-neutral-400 hover:decoration-emerald-700"
        >
          admin@tampapalmscenter.com
        </a>
      </Row>

      <Row
        title="Corporate Office & Mailing Address"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
          </svg>
        }
      >
        17427 Bridge Hill Court, Suite C, Tampa, FL 33647
      </Row>
    </div>
  );
}
