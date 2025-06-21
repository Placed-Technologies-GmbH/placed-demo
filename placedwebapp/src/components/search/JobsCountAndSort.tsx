'use client';

import { useState, useEffect } from 'react';
import { GradientText } from '@/components/ui/gradient-text';

// import { Button } from '@/components/ui/button';

interface SearchContext {
  keyword?: string;
  location?: string;
  cv?: boolean;
  candidateName?: string;
}

interface JobsCountAndSortProps {
  totalCount: number;
  currentSort?: string;
  // onSortChange?: (sortKey: string) => void;
  searchContext?: SearchContext;
  isLoading?: boolean;
  dict: {
    jobsFound: string;
    sorting: {
      sortBy: string;
      // newJobs: string;
      // placedScore: string;
      // urgency: string;
      // profileMatch: string;
    };
  };
}

// CV Loading Animation Component
function CVLoadingAnimation() {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      title: "Let's start with your CV",
      description: "You're just a few seconds away from your next opportunity. We're reading your CV to understand your strengths, skills, and experience."
    },
    {
      title: "Extracting insights from your experience",
      description: "We're parsing the document for key information: roles, education, skills, certifications, and more."
    },
    {
      title: "Crafting your professional fingerprint",
      description: "We've built a unique profile that reflects your experience, ambitions, and potential."
    },
    {
      title: "Finding the right opportunities for you",
      description: "Now we're searching our network of jobs to find the best fits based on your profile."
    },
    {
      title: "Your personalized job matches are ready!",
      description: "Here are roles where your skills shine. Tailored, relevant, and just for you."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 1200); // 6 seconds / 5 scenes = 1.2 seconds per scene

    // Auto-complete after all scenes have played
    const timeoutId = setTimeout(() => {
      clearInterval(interval);
    }, 6000); // Stop after 6 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [scenes.length]); // Include scenes.length dependency

  return (
    <div className="max-w-4xl mb-4 min-h-[48px] flex items-start overflow-visible">
      <div className="relative w-full min-h-[48px] flex items-start">
        {scenes.map((scene, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-start ${
              index === currentScene
                ? 'translate-x-0 opacity-100'
                // For left-to-right animation: previous scenes slide out to the right, next scenes slide in from the left
                : index < currentScene
                ? 'translate-x-1/2 opacity-0'
                : '-translate-x-1/2 opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 w-full">
              <GradientText
                colors={["#AFCBFF", "#050336", "#F0F2FF", "#E4FD57"]}
                animationSpeed={3}
                className="text-base font-grotesk font-medium whitespace-nowrap"
              >
                {scene.title}
              </GradientText>
              
              {/* Animated dots indicator */}
                {/* {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2 h-2 rounded-full bg-brand-blue transition-opacity duration-300 ${
                      (currentScene + dot) % 3 === 0 ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{
                      animationDelay: `${dot * 0.2}s`,
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  />
                ))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
  currentSort = 'neueste Jobangebote',
  // onSortChange,
  searchContext = {},
  isLoading = false,
  dict,
 }: JobsCountAndSortProps) {
  
  // Debug logs
  console.log('JobsCountAndSort props:', {
    totalCount,
    isLoading,
    searchContext,
    shouldShowAnimation: isLoading && searchContext.cv
  });
//   const sortingOptions = [
//     // { key: 'newJobs', label: dict.sorting.newJobs },
//     // { key: 'placedScore', label: dict.sorting.placedScore },
//     // { key: 'urgency', label: dict.sorting.urgency },
//     // { key: 'profileMatch', label: dict.sorting.profileMatch },
//   ];

  const signBoardMessage = getSignBoardMessage(searchContext);

  // Show CV loading animation when CV search is loading (isLoading=true means CV processing is happening)
  if (isLoading && searchContext.cv) {
    return <CVLoadingAnimation />;
  }

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
            <span className="text-text-primary font-grotesk font-medium text-base px-3">
              {currentSort}
            </span>
          ) : (
            // Interactive sort buttons when no CV
            <>
              <span className="text-text-primary font-grotesk font-medium text-base px-3">{dict.sorting.sortBy}: {currentSort}</span>
              {/* {sortingOptions.map((option) => (
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
                </Button> */}
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