'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showWhenSinglePage?: boolean;
  className?: string;
  labels?: {
    previous: string;
    next: string;
  };
}

export function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  showWhenSinglePage = false,
  className,
  labels = { previous: 'Previous', next: 'Next' }
}: SmartPaginationProps) {
  // Hide pagination if only 1 page and showWhenSinglePage is false
  if (totalPages <= 1 && !showWhenSinglePage) {
    return null;
  }

  // Calculate which group of 5 pages we're in
  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);
  
  // Calculate the start and end page for current group
  const groupStartPage = (currentGroup - 1) * pagesPerGroup + 1;
  const groupEndPage = Math.min(currentGroup * pagesPerGroup, totalPages);
  
  // Generate pages for current group
  const visiblePages = [];
  for (let i = groupStartPage; i <= groupEndPage; i++) {
    visiblePages.push(i);
  }
  
  // Navigation logic
  const canGoPreviousGroup = currentGroup > 1;
  const canGoNextGroup = currentGroup < totalGroups;
  
  const handlePreviousGroup = () => {
    if (canGoPreviousGroup) {
      // Go to the last page of the previous group
      const previousGroupEnd = groupStartPage - 1;
      onPageChange(previousGroupEnd);
    }
  };
  
  const handleNextGroup = () => {
    if (canGoNextGroup) {
      // Go to the first page of the next group
      const nextGroupStart = groupEndPage + 1;
      onPageChange(nextGroupStart);
    }
  };

  return (
    <div className={cn("w-full py-8", className)}>
      {/* Desktop Pagination - Centered with background */}
      <div className="hidden md:flex justify-center">
        <div className="flex items-center bg-background-primary rounded-lg  h-[38px] w-[38px]">
          <Pagination>
            <PaginationContent className="gap-2">
              {canGoPreviousGroup && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePreviousGroup();
                    }}
                    className="hover:bg-background-primary transition-colors duration-200"
                  >
                    {labels.previous}
                  </PaginationPrevious>
                </PaginationItem>
              )}
              
              {visiblePages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNumber);
                    }}
                    className={cn(
                      "min-w-[30px] h-[30px] flex items-center justify-center transition-all duration-200",
                      pageNumber === currentPage
                        ? "bg-secondary text-text-primary border-border border-md shadow-lg"
                        : "hover:bg-neutral-300 border-border shadow-sm bg-surface"
                    )}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {canGoNextGroup && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNextGroup();
                    }}
                    className="hover:bg-background-muted transition-colors duration-200"
                  >
                    {labels.next}
                  </PaginationNext>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Mobile Pagination - Simplified */}
      <div className="md:hidden px-4">
        <div className="flex items-center justify-between bg-surface border border-border rounded-lg shadow-sm px-4 py-3">
          {canGoPreviousGroup ? (
            <button
              onClick={handlePreviousGroup}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-background-muted rounded-md transition-colors duration-200"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {labels.previous}
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground font-medium">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          {canGoNextGroup ? (
            <button
              onClick={handleNextGroup}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-background-muted rounded-md transition-colors duration-200"
            >
              {labels.next}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
} 