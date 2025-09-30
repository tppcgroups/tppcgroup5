import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TitleCardProps {
  title: string;
}

export const SpacesCard: React.FC<TitleCardProps> = ({ title }) => {
    return (
        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-gray-800">
          {title}
        </h2>
    );
}

export default SpacesCard;