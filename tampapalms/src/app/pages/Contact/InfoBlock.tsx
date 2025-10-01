const items = [
  {
    label: "Phone",
    value: "813.876.7697",
    href: "tel:+18138767697",
    helper: "Monday – Friday, 8:30 AM – 5:30 PM",
  },
  {
    label: "Email",
    value: "admin@tampapalmscenter.com",
    href: "mailto:admin@tampapalmscenter.com",
    helper: "Tenant support & leasing questions",
  },
  {
    label: "Office & Mailing",
    value: "17427 Bridge Hill Court, Suite C, Tampa, FL 33647",
    helper: "Located within Tampa Palms Professional Center",
  },
];

export default function InfoBlock() {
  return (
    <div className="grid gap-5">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {item.label}
          </p>
          {item.href ? (
            <a
              href={item.href}
              className="mt-2 inline-flex text-lg font-semibold text-slate-900 underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-slate-400"
            >
              {item.value}
            </a>
          ) : (
            <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
          )}
          <p className="mt-1 text-sm text-slate-500">{item.helper}</p>
        </article>
      ))}
    </div>
  );
}
