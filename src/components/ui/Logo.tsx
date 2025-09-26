import React from 'react';
import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/logos/Placed_LogoLockup_Blue.svg" // Replace with your logo file name if different
      alt="Placed Logo"
      width={120} // Adjust width as needed
      height={40} // Adjust height as needed
      priority
      className="h-10 w-auto"
    />
  );
} 