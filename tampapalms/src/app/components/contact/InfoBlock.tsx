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
  const googleDir =
    "https://www.google.com/maps/dir/?api=1&destination=17427+Bridge+Hill+Court,+Suite+C,+Tampa,+FL+33647";
  const appleDir =
    "https://maps.apple.com/?daddr=17427+Bridge+Hill+Court,+Suite+C,+Tampa,+FL+33647";

  return (
    <div className="space-y-6 text-lg">
      <div>
        <p className="font-semibold">Phone</p>
        <a href="tel:+18138767697" className="underline decoration-neutral-400 hover:decoration-slate-700">
          813.876.7697
        </a>
      </div>

      <div>
        <p className="font-semibold">Email</p>
        <a href="mailto:admin@tampapalmscenter.com" className="underline decoration-neutral-400 hover:decoration-slate-700">
          admin@tampapalmscenter.com
        </a>
      </div>

      <div>
        <p className="font-semibold">Corporate Office &amp; Mailing Address</p>
        <p className="text-neutral-800">17427 Bridge Hill Court, Suite C, Tampa, FL 33647</p>

        <div className="mt-3 flex gap-3">
          <a
            href={googleDir}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm text-white bg-slate-700 hover:bg-slate-800 shadow"
          >
            Google Maps
          </a>
          <a
            href={appleDir}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200"
          >
            Apple Maps
          </a>
        </div>
      </div>

      <div>
        <p className="font-semibold">Office Hours</p>
        <ul className="text-neutral-800 leading-7">
          <li>Mon–Fri: 9:00 AM – 5:00 PM</li>
          <li>Sat–Sun: Closed</li>
        </ul>
        <p className="mt-1 text-sm text-neutral-600">Typical response time: within 1 business day.</p>
      </div>
    </div>
  );
}
