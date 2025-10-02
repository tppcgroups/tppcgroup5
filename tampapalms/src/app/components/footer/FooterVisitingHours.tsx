export type VisitingHour = {
  label: string;
  value: string;
};

type FooterVisitingHoursProps = {
  visitingHours: VisitingHour[];
};

// Lists lobby visiting hours and a reminder about after-hours tours.
export function FooterVisitingHours({ visitingHours }: FooterVisitingHoursProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Visiting Hours</h3>
      <ul className="mt-6 space-y-3 text-sm text-stone-300">
        {visitingHours.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-6">
            <span className="font-medium text-white">{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-stone-300">
        Walk-ins are welcome during visiting hours. To view available suites after hours, please contact
        our leasing team.
      </p>
    </div>
  );
}

export default FooterVisitingHours;
