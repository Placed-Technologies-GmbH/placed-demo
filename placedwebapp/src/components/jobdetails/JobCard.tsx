'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import type { JobDetails } from '@/features/jobdetails/types';

interface JobCardProps {
  job: JobDetails;
  isFavorited: boolean;
  onFavoriteToggle: (isFavorited: boolean) => void;
  onBackToSearch: () => void;
  onProfileAnalysisClick: () => void;
  onSalesPitchClick: () => void;
  isGeneratingAI: boolean;
  isGeneratingSalesPitch: boolean;
  showAISummary: boolean;
  showSalesPitch: boolean;
  dict: {
    postedToday: string;
    postedYesterday: string;
    postedDaysAgo: string;
    listedOn: string;
    headhunterRecruiting: string;
    headhuntersRecruiting: string;
  };
}

export function JobCard({ 
  job, 
  isFavorited, 
  onFavoriteToggle, 
  onBackToSearch, 
  onProfileAnalysisClick,
  onSalesPitchClick,
  isGeneratingAI,
  isGeneratingSalesPitch,
  showAISummary,
  showSalesPitch,
  dict
}: JobCardProps) {
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return dict.postedToday;
    if (diffDays === 1) return dict.postedYesterday;
    return dict.postedDaysAgo.replace('{{days}}', diffDays.toString());
  };

  const formatSalary = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const formatHeadhunters = (count: number) => {
    if (count === 1) {
      return dict.headhunterRecruiting.replace('{{count}}', '1');
    }
    return dict.headhuntersRecruiting.replace('{{count}}', count.toString());
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTogglingFavorite) return;

    setIsTogglingFavorite(true);
    const newFavoriteStatus = !isFavorited;

    try {
      // Optimistically update the UI
      onFavoriteToggle(newFavoriteStatus);
      
      // TODO: Call API to update favorite status
      // await JobDetailsService.toggleFavorite(job.id, newFavoriteStatus);
    } catch (error) {
      // Revert the optimistic update on error
      onFavoriteToggle(isFavorited);
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleCardClick = () => {
    onBackToSearch();
  };

  if (!job) {
    return (
      <div className="w-full max-w-[952px] h-[192px] bg-white border border-border rounded-[4px] pt-4 pb-4 transition-shadow">
        <div className="h-full px-6">
          {/* First Row */}
          <div className="w-full h-8 flex justify-between items-center">
            <Skeleton className="h-6 w-1/2" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-6 w-6" />
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full h-8 flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Third Row */}
          <div className="w-full h-8 flex items-center gap-6 pt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Fourth Row */}
          <div className="w-full h-14 flex justify-between items-center pt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-[128px] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4"> 
      {/* Back Button */}
      <div className="flex flex-start">
        <button 
          onClick={handleCardClick} 
          className="flex items-center gap-2 md:gap-2 text-text-secondary text-sm md:text-md font-medium rounded-full hover:cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-8 md:h-8">
            <g opacity="0.5">
              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" fill="white"/>
              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E4E4E7"/>
              <path d="M15.9997 20.6667L11.333 16L15.9997 11.3333" stroke="#09090B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.6663 16H11.333" stroke="#09090B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
          <span className="hidden sm:inline">Zurück</span>
        </button>
      </div>

      {/* Job Card Content */}
      <div className="bg-white border border-border rounded-[6px] p-4 md:p-6 transition-shadow">
        {/* First Row - Job Title and Favorite */}
        <div className="flex justify-between items-start gap-4 mb-3 md:mb-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground leading-tight flex-1 pr-2">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Placed Score */}
            {job.matchPercentage !== undefined && (
              <span className="text-md font-semibold text-primary whitespace-nowrap">
                [ {job.matchPercentage}% ]
              </span>
            )}
            {/* Favorite Star */}
            <button
              aria-label="Favorite"
              onClick={handleFavoriteToggle}
              className="flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isFavorited ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-5 w-5 md:h-[22px] md:w-[24px] hover:cursor-pointer ${isFavorited ? 'text-primary' : 'text-primary hover:text-primary/80 hover:cursor-pointer'}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Second Row - Company Info */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-3 md:mb-4">         
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-3 md:size-4 flex-shrink-0">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            <span className="text-xs md:text-sm text-text-secondary truncate">{job.location}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-3 md:size-4 flex-shrink-0">
              <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
              <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
            </svg>
            <span className="text-xs md:text-sm text-text-secondary">{formatDate(job.postedDate)}</span>
          </div>

          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-3 md:size-4 flex-shrink-0">
              <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
              <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
            </svg>
            <span className="text-xs md:text-sm text-text-secondary">
              {formatSalary(job.salary.amount, job.salary.currency)}
            </span>
          </div>
        
          {job.headhunters && job.headhunters > 0 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 md:size-4 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              <span className="text-xs md:text-sm text-text-secondary">
                {formatHeadhunters(job.headhunters)}
              </span>
            </div>
          )}
        </div> 

        {/* Third Row - Job Details */}
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-4 md:mb-6">
          {/* Listed On Sources */}
          {job.listedOn && job.listedOn.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs md:text-sm text-text-secondary">{dict.listedOn}</span>
              <div className="flex items-center gap-3 md:gap-3">
                {job.listedOn.slice(0, 5).map((listedOn, index) => (
                  <Image
                    key={index}
                    src={listedOn.src}
                    alt={listedOn.alt}
                    height={12}
                    width={16}
                    className="h-3 md:h-4 w-auto text-text-secondary"
                  />
                ))}
                {job.listedOn.length > 5 && (
                  <span className="text-xs text-text-secondary">+{job.listedOn.length - 5}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fourth Row - CTA Button */}
        <div className="flex justify-start gap-6">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onProfileAnalysisClick();
            }}
            disabled={isGeneratingAI}
            className={`h-8 md:h-10 px-4 md:px-6 rounded-full text-sm md:text-base font-light transition-colors hover:cursor-pointer ${
              showAISummary 
                ? 'bg-primary text-success-foreground hover:bg-success/90' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isGeneratingAI ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-primary-foreground text-sm border-t-transparent rounded-full animate-spin" />
                <span>Generiere...</span>
              </div>
            ) : showAISummary ? (
              'KI Profiloptimierer'
            ) : (
              'KI Profiloptimierer'
            )}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSalesPitchClick();
            }}
            disabled={isGeneratingSalesPitch}
            className={`h-8 md:h-10 px-4 md:px-6 rounded-full text-sm md:text-base font-light transition-colors hover:cursor-pointer ${
              showSalesPitch 
                ? 'bg-primary text-success-foreground hover:bg-success/90' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isGeneratingSalesPitch ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-primary-foreground text-sm border-t-transparent rounded-full animate-spin" />
                <span>Generiere...</span>
              </div>
            ) : showSalesPitch ? (
              'KI Gesprächsleitfaden'
            ) : (
              'KI Gesprächsleitfaden'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 