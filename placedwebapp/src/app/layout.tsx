import './globals.css';
import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { LoadingProvider } from '@/context/LoadingProvider';
import { ToastProvider } from '@/context/ToastProvider';
import { SearchProvider } from '@/context/SearchContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { MobileBlocker } from '@/components/ui/MobileBlocker';

export const metadata: Metadata = {
  title: 'Placed',
  description: 'Place candidates. Close deals. Fast.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font Preloading - Critical weights only */}
        <link
          rel="preload"
          href="/fonts/acid-grotesk/FFF-AcidGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/acid-grotesk/FFF-AcidGrotesk-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/acid-grotesk/FFF-AcidGrotesk-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Prefetch fallback format for better support */}
        <link
          rel="prefetch"
          href="/fonts/acid-grotesk/FFF-AcidGrotesk-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="prefetch"
          href="/fonts/acid-grotesk/FFF-AcidGrotesk-Medium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <MobileBlocker>
          <ErrorBoundary>
            <ReactQueryProvider>
              <LoadingProvider>
                <ToastProvider>
                  <AuthProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                      <SearchProvider>
                        {children}
                      </SearchProvider>
                    </Suspense>
                  </AuthProvider>
                </ToastProvider>
              </LoadingProvider>
            </ReactQueryProvider>
          </ErrorBoundary>
        </MobileBlocker>
      </body>
    </html>
  );
}
