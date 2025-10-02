import Link from "next/link";

export type FooterLink = {
  label: string;
  href: string;
};

type FooterQuickLinksProps = {
  links: FooterLink[];
};

// Secondary navigation for quickly jumping to key marketing pages.
export function FooterQuickLinks({ links }: FooterQuickLinksProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Quick Links</h3>
      <nav className="mt-6 grid justify-items-center gap-3 text-sm text-center sm:justify-items-start sm:text-left">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:font-bold">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default FooterQuickLinks;
