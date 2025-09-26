import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const containerSizes = {
  sm: 'max-w-3xl',   // ~768px
  md: 'max-w-4xl',   // ~896px  
  lg: 'max-w-5xl',   // ~1024px
  xl: 'max-w-7xl',   // ~1280px
  full: 'max-w-full'
};

export function Container({ 
  children, 
  size = 'xl', 
  className 
}: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-4 md:px-6 lg:px-8 bg-none',
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  );
} 