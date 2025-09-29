import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TitleCardProps {
  title: string;
}

export const SpacesCard: React.FC<TitleCardProps> = ({ title }) => {
    return (
      <div className="text-center my-16 md:my-24">
        {/* The "eyebrow" text adds a touch of color and context */}
        <p className="text-sm font-semibold  uppercase tracking-wider">
          Our Properties
        </p>
        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-800">
          Explore Spaces
        </h2>
      </div>
    );
}

export default SpacesCard;