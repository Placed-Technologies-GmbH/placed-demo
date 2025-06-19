'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Euro, Calendar, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import type { JobDetails } from '@/features/jobdetails/types';

interface JobCardProps {
  job: JobDetails;
  isFavorited: boolean;
  onFavoriteToggle: (isFavorited: boolean) => void;
  onBackToSearch: () => void;
  onSalesScriptClick: () => void;
  isGeneratingAI: boolean;
  showAISummary: boolean;
}

export function JobCard({ 
  job, 
  isFavorited, 
  onFavoriteToggle, 
  onBackToSearch, 
  onSalesScriptClick,
  isGeneratingAI,
  showAISummary
}: JobCardProps) {
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const formatSalary = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  const formatHeadhunters = (count: number) => {
    if (count === 1) return '1 headhunter recruiting';
    return `${count} headhunters recruiting`;
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
      <div className="w-full max-w-[952px] h-[192px] bg-white border border-border rounded-[4px] pt-6 pb-4 hover:shadow-lg cursor-pointer transition-shadow">
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
    <div 
      className="w-full max-w-[952px] h-[192px] bg-white border border-border rounded-[6px] pt-6 pb-4 hover:shadow-2xl cursor-pointer transition-shadow"
      onClick={handleCardClick}
    >
      <div className="h-full px-6">
        {/* First Row - Job Title and Favorite */}
        <div className="w-full h-8 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground leading-tight">{job.title}</h3>
          <div className="flex items-center gap-2">
            {/* Placed Score */}
            {job.matchPercentage !== undefined && (
              <span className="text-md font-semibold h-6 text-primary">[ {job.matchPercentage}% ]</span>
            )}
            {/* Favorite Star */}
            <button
              aria-label="Favorite"
              className="ml-2"
              onClick={handleFavoriteToggle}
            >
              <Star
                className={`h-[22px] w-[24px] ${
                  isFavorited 
                    ? 'text-primary fill-current' 
                    : 'text-primary hover:text-primary/80'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Second Row - Company Info */}
        <div className="w-full h-8 flex items-center gap-6 pt-2">         
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">{job.location}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Posted {formatDate(job.postedDate)}</span>
          </div>
        
          <div className="flex items-center gap-1">
            <Euro className="h-4 w-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {formatSalary(job.salary.amount, job.salary.currency)}
            </span>
          </div>
        
          {job.headhunters && job.headhunters > 0 && (
            <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {formatHeadhunters(job.headhunters)}
              </span>
            </div>
          )}
        </div> 
          {/* Third Row - Job Details */}
        <div className="w-full h-8 flex items-center gap-6 pt-2">
          {/* Listed On Sources */}
          {job.listedOn && job.listedOn.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Listed on</span>
              <div className="flex items-center gap-2">
                {job.listedOn.slice(0, 3).map((listedOn, index) => (
                  <Image
                    key={index}
                    src={listedOn.src}
                    alt={listedOn.alt}
                    height={16}
                    width={20}
                    className="h-4 w-auto text-text-secondary"
                  />
                ))}
                {job.listedOn.length > 6 && (
                  <span className="text-xs text-text-secondary">+{job.listedOn.length - 6}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fourth Row - CTA Button */}
        <div className="w-full h-14 flex justify-between items-center pt-5">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSalesScriptClick();
            }}
            disabled={isGeneratingAI}
            className={`h-10 px-6 rounded-3xl font-medium transition-colors ${
              showAISummary 
                ? 'bg-primary text-success-foreground hover:bg-success/90' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isGeneratingAI ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </div>
            ) : showAISummary ? (
              'Sales Script'
            ) : (
              'Sales Script'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 