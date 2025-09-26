'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface MobileBlockerProps {
  children: React.ReactNode;
}

export function MobileBlocker({ children }: MobileBlockerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet', 'blackberry', 'opera mini'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check screen size as fallback
      const isMobileScreen = window.innerWidth < 768; // Less than md breakpoint
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isMobileUA || (isMobileScreen && isTouchDevice);
    };

    setIsMobile(checkIsMobile());
    setIsLoading(false);

    // Listen for resize events
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show mobile blocking message
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logos/Placed_LogoLockup_Blue.svg"
              alt="Placed Logo"
              width={200}
              height={50}
              priority
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="w-10 h-10 text-primary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
              </svg>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-2xl font-grotesk font-bold text-text-primary mb-4">
            Desktop Required
          </h1>
          
          <p className="text-text-secondary text-lg mb-6">
            Please use a desktop or laptop computer to access the Placed platform for the best experience.
          </p>

          {/* Additional Info */}
          <div className="bg-background-muted rounded-lg p-4 text-left">
            <h3 className="font-semibold text-text-primary mb-2">Why desktop only?</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Complex candidate matching algorithms</li>
              <li>• Advanced AI-powered tools</li>
              <li>• Multi-window workflow optimization</li>
              <li>• Professional recruitment interface</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-text-secondary">
              Need help? Contact us at{' '}
              <a 
                href="mailto:support@placed.com" 
                className="text-primary hover:text-primary/80 underline"
              >
                support@placed.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show app content for desktop
  return <>{children}</>;
} 