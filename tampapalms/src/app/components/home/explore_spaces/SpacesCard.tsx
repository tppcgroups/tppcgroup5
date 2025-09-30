// file: components/SpacesCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SpacesCardProps {
  title: string;
  imageUrl: string;
  href: string;
  features: string[]; // An array of bullet points for the hover effect
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
      // The 'group' class enables the hover effects on child elements
      className="group block w-full max-w-xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 ease-in-out group-hover:shadow-2xl">
        {/* --- IMAGE & HOVER-REVEAL CONTAINER --- */}
        <div className="relative">
          {/* Using an aspect-ratio container is a robust way to size images */}
          <div className="aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={`${title} building`}
              fill // 'fill' is best when the parent has a defined aspect ratio
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* --- OVERLAY WITH FEATURES (Revealed on hover) --- */}
          <div
            className="absolute inset-0 bg-black/60 flex items-center justify-center p-4
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
          >
            <ul className="text-white list-disc list-inside space-y-2 text-xl font-semibold">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- TEXT CONTENT & CTA BUTTON --- */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
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