'use client';

import { Button } from '@/components/ui/button';

interface SearchContext {
  keyword?: string;
  location?: string;
  cv?: boolean;
  candidateName?: string;
}

interface JobsCountAndSortProps {
  totalCount: number;
  currentSort?: string;
  onSortChange?: (sortKey: string) => void;
  searchContext?: SearchContext;
  dict: {
    jobsFound: string;
    sorting: {
      sortBy: string;
      newJobs: string;
      placedScore: string;
      urgency: string;
      profileMatch: string;
    };
  };
}

// Helper function to generate sign board message
function getSignBoardMessage(context: SearchContext): string {
  const { keyword, location, cv, candidateName } = context;
  
  if (cv && candidateName) {
    // CV-based search
    if (keyword && location) {
      return `Showing jobs for ${candidateName} based on CV  Keyword: ${keyword}  Location: ${location}`;
    } else if (keyword) {
      return `Showing jobs for ${candidateName} based on CV  Keyword: ${keyword}`;
    } else if (location) {
      return `Showing jobs for ${candidateName} based on CV  Location: ${location}`;
    } else {
      return `Showing jobs for ${candidateName} based on CV`;
    }
  } else {
    // Non-CV search
    if (keyword && location) {
      return `Showing jobs for ${keyword} in ${location}`;
    } else if (keyword) {
      return `Showing jobs for ${keyword}`;
    } else if (location) {
      return `Showing jobs for ${location}`;
    } else {
      return 'Showing all jobs';
    }
  }
}

export function JobsCountAndSort({
  totalCount,
  currentSort = 'newJobs',
  onSortChange,
  searchContext = {},
  dict,
}: JobsCountAndSortProps) {
  const sortingOptions = [
    { key: 'newJobs', label: dict.sorting.newJobs },
    { key: 'placedScore', label: dict.sorting.placedScore },
    { key: 'urgency', label: dict.sorting.urgency },
    { key: 'profileMatch', label: dict.sorting.profileMatch },
  ];

  const signBoardMessage = getSignBoardMessage(searchContext);

  return (
    <div className="w-full mb-4">
      {/* Count and Sort Row */}
      <div className="flex items-center gap-3 h-8">
        {/* Job Count */}
        <div className="text-text-primary font-grotesk font-medium text-base px-3">
          {dict.jobsFound.replace('{{count}}', totalCount.toString())}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          {searchContext.cv ? (
            // Static sort text when CV is present
            <span className="text-text-secondary text-sm gap-4">
              Sorted by latest jobs
            </span>
          ) : (
            // Interactive sort buttons when no CV
            <>
              <span className="text-text-secondary text-sm mr-2">{dict.sorting.sortBy}:</span>
              {sortingOptions.map((option) => (
                <Button
                  key={option.key}
                  variant={currentSort === option.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onSortChange?.(option.key)}
                  className={`h-7 px-3 text-sm font-normal ${
                    currentSort === option.key
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-text-secondary bg-background border border-border hover:text-text-primary hover:bg-background-muted'
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Sign Board Message */}
      <div className="mt-3">
        <span className="inline-block text-muted-foreground bg-muted/30 rounded px-3 py-1 text-sm font-grotesk">
          {signBoardMessage}
        </span>
      </div>
    </div>
  );
} 