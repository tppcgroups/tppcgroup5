import React from "react";

type Perk = {
  title: string;
  caption: string;
};

const perks: Perk[] = [
  {
    title: "Fast Process",
    caption: "Apply online anytime",
  },
  {
    title: "Tailored Match",
    caption: "Share team details",
  },
  {
    title: "Quick Follow-Up",
    caption: "Hear back within a day",
  },
];

const Perks: React.FC = () => {
  return (
    <div className="flex w-full max-w-md flex-wrap justify-center gap-5 md:flex-nowrap">
      {perks.map((perk) => (
        <article
          key={perk.title}
          className="flex min-h-[7.5rem] w-32 flex-col items-center justify-center rounded-2xl bg-white px-5 py-6 text-center shadow-md shadow-slate-900/5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h3 className="text-sm font-semibold text-slate-900">{perk.title}</h3>
          <p className="mt-2 text-xs text-slate-500">{perk.caption}</p>
        </article>
      ))}
    </div>
  );
};

export default Perks;
