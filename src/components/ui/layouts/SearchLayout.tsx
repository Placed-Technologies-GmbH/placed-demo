'use client';

import { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SearchLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showUserActions?: boolean;
  className?: string;
}

export function SearchLayout({ 
  children, 
  showHeader = true, 
  showUserActions = true,
  className = '' 
}: SearchLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {showHeader && (
        <header className="sticky top-0 z-sticky bg-surface border-b border-border">
          <Container>
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <div className="flex items-center">
                <Logo />
              </div>

              {/* User Actions */}
              {showUserActions && (
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <button 
                    className="p-2 text-text-secondary hover:text-text-primary transition-fast rounded-md hover:bg-background-subtle relative"
                    aria-label="Notifications"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h5v12z" />
                    </svg>
                    {/* Notification dot */}
                    <div className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></div>
                  </button>
                  
                  {/* User Avatar */}
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback className="bg-primary text-white text-sm font-medium">U</AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          </Container>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 