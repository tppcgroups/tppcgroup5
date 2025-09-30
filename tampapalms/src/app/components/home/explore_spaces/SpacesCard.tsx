// file: components/SpacesCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SpacesCardProps {
  title: string;
  imageUrl: string;
  href: string;
  features: string[];
}

export const SpacesCard: React.FC<SpacesCardProps> = ({
  title,
  imageUrl,
  href,
  features,
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="group block w-full max-w-xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 ease-in-out group-hover:shadow-2xl">
        {/* --- IMAGE & HOVER-REVEAL CONTAINER --- */}
        <div className="relative">
          <div className="aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={`${title} building`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* --- OVERLAY WITH FEATURES (Desktop Only) --- */}
          {/* 'hidden md:flex' makes this only appear on medium screens and up */}
          <div
            className="absolute inset-0 bg-black/60 items-center justify-center p-4
                        opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-opacity duration-300
                        hidden md:flex"
          >
            <ul className="text-white text-xl list-disc list-inside space-y-2">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- TEXT CONTENT & CTA BUTTON --- */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">Commercial Real Estate</p>

          {/* --- FEATURES LIST (Mobile Only) --- */}
          {/* 'md:hidden' makes this only appear on small screens */}
          <div className="mt-4 md:hidden">
            <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div
            className="mt-4 inline-block bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-semibold
                        group-hover:bg-gray-900 transition-colors"
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SpacesCard;
