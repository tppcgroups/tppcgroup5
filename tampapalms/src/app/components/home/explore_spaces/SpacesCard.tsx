import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SpacesCardProps {
  title: string;
  imageUrl: string;
  href: string;
  features: string[];
  label?: string;
}

export const SpacesCard: React.FC<SpacesCardProps> = ({
  title,
  imageUrl,
  href,
  features,
  label = "Commercial Real Estate",
}) => {
  const featureListId = React.useId();
  const featureSummary = `${label}: ${features.join(", ")}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby={featureListId}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900/40 md:max-w-none md:flex-1"
    >
      <div className="relative h-[19.5rem] overflow-hidden md:h-[22rem]">
        <Image
          src={imageUrl}
          alt={`${title} exterior photograph`}
          fill
          sizes="(min-width: 768px) 480px, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 hidden translate-y-6 flex-col gap-3 p-6 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:flex"
          aria-hidden="true"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            {label}
          </p>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <ul className="grid gap-2 text-sm text-white/90">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-7 py-8 md:gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            {label}
          </p>
          <h3 className="text-[1.85rem] font-semibold text-slate-900 md:text-[2rem]">{title}</h3>
        </div>

        <div id={featureListId} className="sr-only">
          {featureSummary}
        </div>

        <div className="md:hidden">
          <ul className="space-y-2.5 text-[0.95rem] text-slate-600">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-slate-300" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 md:text-[1.05rem]">
          View Details
          <svg
            className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default SpacesCard;
