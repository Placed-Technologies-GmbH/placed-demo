'use client';

import { JobCard } from './JobCard';
import { JobsCountAndSort } from './JobsCountAndSort';
import { Skeleton } from '@/components/ui/skeleton';
import { SmartPagination } from '@/components/search/SmartPagination';
import { GradientText } from '@/components/ui/gradient-text';
import type { JobListing } from '@/features/search/types';

interface JobListViewProps {
  jobs: JobListing[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentSort?: string;
  onPageChange: (page: number) => void;
  // onSortChange?: (sortKey: string) => void;
  searchContext?: {
    keyword?: string;
    location?: string;
    cv?: boolean;
    candidateName?: string;
  };
  dict: {
    noResults: string;
    noResultsDescription: string;
    loading: string;
    jobsFound: string;
    sorting: {
      sortBy: string;
      newJobs: string;
      placedScore: string;
      urgency: string;
      profileMatch: string;
    };
    jobCard: {
      postedDate: string;
      salary: string;
      location: string;
      matchPercentage: string;
      placeNow: string;
      listedOn: string;
      headhunters?: string;
      headhunter?: string;
      reviews?: string;
      timeAgo?: {
        dayAgo: string;
        daysAgo: string;
        today: string;
        yesterday: string;
      };
      contactDialog: {
        title: string;
        company: string;
        role: string;
        contactPerson: string;
        position: string;
        phone: string;
        email: string;
        close: string;
      };
    };
    pagination: {
      previous: string;
      next: string;
    };
  };
}

function JobCardSkeleton() {
  return (
    <div className="w-full h-[192px] bg-white border border-[#E0DFDF] rounded-3xl pt-6 pb-4 mb-2">
      {/* Desktop Skeleton */}
      <div className="hidden md:block h-full">
        {/* First Row */}
        <div className="w-full h-8 flex justify-between items-center px-6">
          <Skeleton className="h-6 w-1/2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full h-8 flex items-center gap-6 pt-2 pl-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Third Row */}
        <div className="w-full h-8 flex items-center gap-6 pt-2 pl-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Fourth Row */}
        <div className="w-full h-14 flex justify-between items-center pt-4 px-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-[128px] rounded-3xl" />
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="md:hidden">
        <div className="flex justify-between items-start mb-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-5" />
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function NoResults({ dict }: { dict: { noResults: string; noResultsDescription: string } }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-background-muted rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-grotesk font-medium text-text-primary mb-2">
        {dict.noResults}
      </h3>
      <p className="text-text-secondary max-w-md">
        {dict.noResultsDescription}
      </p>
    </div>
  );
}

export function JobListView({
  jobs,
  isLoading,
  currentPage,
  totalPages,
  totalCount,
  currentSort = 'newJobs',
  onPageChange,
  // onSortChange,
  searchContext,
  dict,
}: JobListViewProps) {
  
  // Main container: Left-aligned within content area
  return (
    <div className="w-full">
      {/* Jobs Count and Sort Section - Desktop Only */}
      <div className="hidden lg:block">
        <JobsCountAndSort
          totalCount={totalCount}
          currentSort={currentSort}
          // onSortChange={onSortChange}
          searchContext={searchContext}
          isLoading={isLoading}
          dict={{
            jobsFound: dict.jobsFound,
            sorting: dict.sorting,
          }}
        />
      </div>

      {/* Mobile Results Count */}
      <div className="lg:hidden px-4 py-2">
        {isLoading && searchContext?.cv ? (
          <div className="min-h-[48px] flex items-center justify-start overflow-visible">
            <GradientText
              colors={["var(--brand-navy)", "var(--brand-blue)", "var(--brand-yellow)", "var(--brand-blue)", "var(--brand-navy)"]}
              animationSpeed={3}
              className="text-sm font-grotesk font-medium whitespace-nowrap"
            >
              Finding your perfect matches...
            </GradientText>
          </div>
        ) : (
          <div className="text-sm font-medium text-foreground">
            {dict.jobsFound.replace('{{count}}', totalCount.toString())}
          </div>
        )}
      </div>

      {/* Job Cards Container - 8px gap from count/sort */}
      <div className="mt-2 space-y-8">
        {isLoading ? (
          // Loading state
          Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))
        ) : !jobs || jobs.length === 0 ? (
          // No results state
          <NoResults dict={dict} />
        ) : (
          // Jobs list
          jobs.map((job) => (
            <JobCard key={job.id} job={job} dict={dict.jobCard} />
          ))
        )}
      </div>

      {/* Pagination - Responsive positioning */}
      {totalPages > 1 && !isLoading && jobs && jobs.length > 0 && (
        <div className="mt-8 w-full flex justify-center">
          <SmartPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            labels={{
              previous: dict.pagination.previous,
              next: dict.pagination.next,
            }}
            className="bg-background-primary border-none rounded-lg"
          />
        </div>
      )}
    </div>
  );
} 