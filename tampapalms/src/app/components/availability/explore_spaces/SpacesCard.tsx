import React from "react";
import Image from "next/image";
import { PiArrowCircleRightBold } from "react-icons/pi";

interface SpacesCardProps {
  title: string;
  imageUrl: string;
  features: string[];
}

export const SpacesCard: React.FC<SpacesCardProps> = ({
  title,
  imageUrl,
  features,
}) => {
  const featureListId = React.useId();
  const featureSummary = features.join(", ");

  return (
    <div
      aria-describedby={featureListId}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-[#c8b79f] bg-white shadow-lg shadow-black/5 transition-all duration-400 ease-out hover:-translate-y-1 hover:border-[#5a4b3c] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f1a16]/40 md:max-w-none md:flex-1"
    >
      <div className="relative h-[19.5rem] overflow-hidden md:h-[22rem] ">
        <Image
          src={imageUrl}
          alt={`${title} exterior photograph`}
          fill
          sizes="(min-width: 768px) 480px, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1f1a16]/65 via-[#1f1a16]/10 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden translate-y-6 flex-col gap-3 bg-gradient-to-t from-black/15 via-black/5 to-transparent p-6 text-white opacity-0 backdrop-blur-[3px] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:flex"
          aria-hidden="true"
        >
          <ul className="grid gap-3 text-base font-medium text-white/95 md:text-lg">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/80" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-7 py-6 md:gap-6 ">
        <div className="space-y-2">
          <h3 className="text-[1.65rem] font-semibold text-[#1f1a16] md:text-[1.85rem]">
            {title}
          </h3>
        </div>

        <div id={featureListId} className="sr-only">
          {featureSummary}
        </div>

        <div className="md:hidden">
          <ul className="space-y-2.5 text-[0.95rem] text-[#7a6754]">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#e7ded2]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpacesCard;
