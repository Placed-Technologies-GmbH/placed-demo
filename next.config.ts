import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // No i18n block needed for App Router
   output: 'export', 
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
