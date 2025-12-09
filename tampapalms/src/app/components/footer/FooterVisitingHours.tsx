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
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f0d4a6]">Business Hours</h3>
      <ul className="mt-4 space-y-2.5 text-sm text-white">
        {visitingHours.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-6">
            <span className="font-medium text-white">{item.label}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterVisitingHours;
