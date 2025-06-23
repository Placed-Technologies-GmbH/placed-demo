  'use client';

  import { useState } from 'react';
  import { useRouter, useParams, useSearchParams } from 'next/navigation';
  import { Button } from '@/components/ui/button';
  import { Dialog, DialogContent, DialogHeader, DialogTitle,  DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
  import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  import { Skeleton } from '@/components/ui/skeleton';
  import { Phone, Star } from 'lucide-react';
  import { SearchService } from '@/lib/api/searchService';
  import { CopyToClipboardField } from '@/components/ui/CopyToClipboardField';
  import type { JobListing } from '@/features/search/types';
  import Image from 'next/image';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

  interface JobCardProps {
    job: JobListing;
    dict: {
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
  }

  export function JobCard({ job, dict }: JobCardProps) {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const [isFavorited, setIsFavorited] = useState(job.isFavorited || false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return dict.timeAgo?.today || 'today';
      if (diffDays === 1) return dict.timeAgo?.yesterday || 'yesterday';
      if (diffDays === 1) return dict.timeAgo?.dayAgo?.replace('{{days}}', '1') || '1 day ago';
      return dict.timeAgo?.daysAgo?.replace('{{days}}', diffDays.toString()) || `${diffDays} days ago`;
    };

    const formatSalary = (amount: number, currency: string) => {
      return `${amount.toLocaleString()} ${currency}`;
    };

    const formatHeadhunters = (count: number) => {
      if (count === 1) {
        return dict.headhunter?.replace('{{count}}', '1') || '1 Personalvermittler aktiv';
      }
      return dict.headhunters?.replace('{{count}}', count.toString()) || `${count} Personalvermittler aktiv`;
    };

    const handleFavoriteToggle = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isTogglingFavorite) return;

      setIsTogglingFavorite(true);
      const newFavoriteStatus = !isFavorited;

      try {
        // Optimistically update the UI
        setIsFavorited(newFavoriteStatus);

        // Call the API to update the favorite status
        await SearchService.toggleFavorite(job.id, newFavoriteStatus);
      } catch (error) {
        // Revert the optimistic update on error
        setIsFavorited(isFavorited);
        console.error('Failed to toggle favorite:', error);
        // You could show a toast notification here
      } finally {
        setIsTogglingFavorite(false);
      }
    };
     

    const handleCardClick = () => {
      const lang = params.lang || 'en';
      
      // Preserve current search parameters when navigating to job details
      const currentSearchParams = new URLSearchParams(searchParams.toString());
      const searchQuery = currentSearchParams.toString();
      const jobDetailsUrl = searchQuery 
        ? `/${lang}/job-details/${job.id}?${searchQuery}`
        : `/${lang}/job-details/${job.id}`;
      
      router.push(jobDetailsUrl);
    };

    if (!job) {
      return (
        <div className="w-full max-w-4xl h-[192px] bg-white border border-border rounded-3xl pt-6 pb-4 mb-6 hover:shadow-lg cursor-pointer transition-shadow">
          {/* Desktop Skeleton */}
          <div className="hidden md:block h-full">
            {/* First Row */}
            <div className="w-full h-8 flex justify-between items-center px-6">
              <Skeleton className="h-6 w-1/2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-6 w-4" />
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

    return (
      <div 
        className="w-full max-w-4xl h-[192px] bg-white border border-border rounded-3xl pt-6 pb-4 mb-6 hover:shadow-2xl cursor-pointer transition-shadow"
        onClick={handleCardClick}
      >
        {/* Desktop Layout */}
        <div className="hidden md:block h-full">
          {/* First Row */}
          <div className="w-full h-8 flex justify-between items-center px-6">
            {/* Job Title */}
            {job.title ? (
              <h3 className="text-lg font-semibold text-foreground leading-tight">{job.title}</h3>
            ) : (
              <Skeleton className="h-6 w-1/2" />
            )}
            <div className="flex items-center gap-2">
              {/* Placed Score */}
              {job.matchPercentage !== undefined ? (
                <span className="text-md font-semibold h-6 text-primary">[ {job.matchPercentage}% ]</span>
              ) : (
                <Skeleton className="h-5 w-8" />
              )}
              {/* Favorite Star */}
              <button
                aria-label="Favorite"
                className="ml-2"
                onClick={handleFavoriteToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFavorited ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-[22px] w-[24px] hover:cursor-pointer ${isFavorited ? 'text-primary' : 'text-primary hover:text-primary/80 hover:cursor-pointer'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full h-8 flex items-center gap-6 pl-6">
            {/* Company Logo + Name */}
            <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.99992 13.6666C6.08881 13.6666 5.2277 13.4916 4.41659 13.1416C3.60547 12.7916 2.89714 12.3139 2.29159 11.7083C1.68603 11.1028 1.20825 10.3944 0.858252 9.58331C0.508252 8.7722 0.333252 7.91109 0.333252 6.99998C0.333252 6.07776 0.508252 5.21387 0.858252 4.40831C1.20825 3.60276 1.68603 2.8972 2.29159 2.29165C2.89714 1.68609 3.60547 1.20831 4.41659 0.858313C5.2277 0.508313 6.08881 0.333313 6.99992 0.333313C7.92214 0.333313 8.78603 0.508313 9.59159 0.858313C10.3971 1.20831 11.1027 1.68609 11.7083 2.29165C12.3138 2.8972 12.7916 3.60276 13.1416 4.40831C13.4916 5.21387 13.6666 6.07776 13.6666 6.99998C13.6666 7.91109 13.4916 8.7722 13.1416 9.58331C12.7916 10.3944 12.3138 11.1028 11.7083 11.7083C11.1027 12.3139 10.3971 12.7916 9.59159 13.1416C8.78603 13.4916 7.92214 13.6666 6.99992 13.6666ZM6.99992 12.3C7.28881 11.9 7.53881 11.4833 7.74992 11.05C7.96103 10.6166 8.13325 10.1555 8.26659 9.66665H5.73325C5.86659 10.1555 6.03881 10.6166 6.24992 11.05C6.46103 11.4833 6.71103 11.9 6.99992 12.3ZM5.26659 12.0333C5.06659 11.6666 4.89159 11.2861 4.74159 10.8916C4.59159 10.4972 4.46659 10.0889 4.36659 9.66665H2.39992C2.72214 10.2222 3.12492 10.7055 3.60825 11.1166C4.09159 11.5278 4.64436 11.8333 5.26659 12.0333ZM8.73325 12.0333C9.35547 11.8333 9.90825 11.5278 10.3916 11.1166C10.8749 10.7055 11.2777 10.2222 11.5999 9.66665H9.63325C9.53325 10.0889 9.40825 10.4972 9.25825 10.8916C9.10825 11.2861 8.93325 11.6666 8.73325 12.0333ZM1.83325 8.33331H4.09992C4.06659 8.11109 4.04159 7.89165 4.02492 7.67498C4.00825 7.45831 3.99992 7.23331 3.99992 6.99998C3.99992 6.76665 4.00825 6.54165 4.02492 6.32498C4.04159 6.10831 4.06659 5.88887 4.09992 5.66665H1.83325C1.7777 5.88887 1.73603 6.10831 1.70825 6.32498C1.68047 6.54165 1.66659 6.76665 1.66659 6.99998C1.66659 7.23331 1.68047 7.45831 1.70825 7.67498C1.73603 7.89165 1.7777 8.11109 1.83325 8.33331ZM5.43325 8.33331H8.56659C8.59992 8.11109 8.62492 7.89165 8.64159 7.67498C8.65825 7.45831 8.66659 7.23331 8.66659 6.99998C8.66659 6.76665 8.65825 6.54165 8.64159 6.32498C8.62492 6.10831 8.59992 5.88887 8.56659 5.66665H5.43325C5.39992 5.88887 5.37492 6.10831 5.35825 6.32498C5.34159 6.54165 5.33325 6.76665 5.33325 6.99998C5.33325 7.23331 5.34159 7.45831 5.35825 7.67498C5.37492 7.89165 5.39992 8.11109 5.43325 8.33331ZM9.89992 8.33331H12.1666C12.2221 8.11109 12.2638 7.89165 12.2916 7.67498C12.3194 7.45831 12.3333 7.23331 12.3333 6.99998C12.3333 6.76665 12.3194 6.54165 12.2916 6.32498C12.2638 6.10831 12.2221 5.88887 12.1666 5.66665H9.89992C9.93325 5.88887 9.95825 6.10831 9.97492 6.32498C9.99159 6.54165 9.99992 6.76665 9.99992 6.99998C9.99992 7.23331 9.99159 7.45831 9.97492 7.67498C9.95825 7.89165 9.93325 8.11109 9.89992 8.33331ZM9.63325 4.33331H11.5999C11.2777 3.77776 10.8749 3.29442 10.3916 2.88331C9.90825 2.4722 9.35547 2.16665 8.73325 1.96665C8.93325 2.33331 9.10825 2.71387 9.25825 3.10831C9.40825 3.50276 9.53325 3.91109 9.63325 4.33331ZM5.73325 4.33331H8.26659C8.13325 3.84442 7.96103 3.38331 7.74992 2.94998C7.53881 2.51665 7.28881 2.09998 6.99992 1.69998C6.71103 2.09998 6.46103 2.51665 6.24992 2.94998C6.03881 3.38331 5.86659 3.84442 5.73325 4.33331ZM2.39992 4.33331H4.36659C4.46659 3.91109 4.59159 3.50276 4.74159 3.10831C4.89159 2.71387 5.06659 2.33331 5.26659 1.96665C4.64436 2.16665 4.09159 2.4722 3.60825 2.88331C3.12492 3.29442 2.72214 3.77776 2.39992 4.33331Z" fill="#212121"/>
                </svg>
              {job.company ? (
                <span className="text-muted-foreground text-md">{job.company}</span>
              ) : (
                <Skeleton className="h-4 w-24" />
              )}
            </div>
            {/* Contact Info */}
            {job.contactPerson?.phone ? (
              <span className="flex items-center gap-1 text-primary h-[20px]">
                <Phone className="h-4 w-4" />
                {job.contactPerson.phone}
              </span>
            ) : (
              <Skeleton className="h-4 w-20" />
            )}
            {/* Kununu */}
            {job.kununu ? (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Image src={'/logos/providerlogos/kunnunu.svg'} alt="Kununu" width={63} height={16} className="h-4 w-auto" />
                <span>{job.kununu.rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>({job.kununu.reviews} {dict.reviews || 'Reviews'})</span>
              </span>
            ) : null}
          </div>

          {/* Third Row */}
          <div className="w-full h-8 flex items-center gap-6 pt-2 pl-6 text-sm text-muted-foreground">
            {/* Location */}
            {job.location ? (
              <span className="flex items-center gap-1 h-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-4">
                  <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>
                {job.location}
              </span>
            ) : (
              <Skeleton className="h-4 w-16" />
            )}
            {/* Date Posted */}
            {job.postedDate ? (
              <span className="flex items-center gap-1 h-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-4">
                  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                  <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
                </svg>
                {formatDate(job.postedDate)}
              </span>
            ) : (
              <Skeleton className="h-4 w-16" />
            )}
            {/* Salary */}
            {job.salary?.amount ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="flex items-center gap-1 h-[20px]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-4">
                        <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                        <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                      </svg>
                      {formatSalary(job.salary.amount, job.salary.currency)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gehalt für die Platzierung</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Skeleton className="h-4 w-16" />
            )}
            {/* Headhunters */}
            {job.headhunters ? (
              <span className="flex items-center gap-1 h-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                {formatHeadhunters(job.headhunters)}
              </span>
            ) : null}
          </div>

          {/* Fourth Row */}
          <div className="w-full h-14 flex justify-between items-center pt-4 px-6">
            {/* Listed On */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{dict.listedOn}:</span>
              {job.listedOn && job.listedOn.length > 0 && (
                <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="flex items-center gap-3 h-[20px]">
                      {job.listedOn.slice(0, 5).map((logo, idx) => (
                      <Image key={idx} src={logo.src} alt={logo.alt} width={20} height={16} className="h-4 w-auto" />
                      ))}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Links</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                  {job.listedOn.length > 5 && (
                    <div className="relative group">
                      <span className="inline-block px-2 cursor-pointer">...</span>
                      <div className="absolute left-0 top-6 z-10 hidden group-hover:flex flex-col bg-surface border border-border rounded shadow-card p-2">
                        {job.listedOn.slice(5).map((logo, idx) => (
                          <Image key={idx} src={logo.src} alt={logo.alt} width={20} height={20} className="h-5 w-auto my-1" />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Place Now Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="cta"
                  className="min-w-[128px] h-10 rounded-3xl px-6 py-3 font-semibold hover:bg-cta-hover whitespace-nowrap hover:cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {dict.placeNow}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[500px] h-[280px] rounded-lg shadow-md pb-[12px]">
                <DialogHeader className="pl-6 pr-6 h-[28px]">
                  <DialogTitle className="text-text-navy text-xl font-medium ">Contact Details</DialogTitle>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-navy text-lg font-medium text-primary ">{job.contactPerson?.name}</span>
                    </div>
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-secondary text-md font-medium">{job.company}</span>
                    </div>
                    {/* Phone with copy-to-clipboard */}
                    {job.contactPerson?.phone && (
                      <CopyToClipboardField
                        label={job.contactPerson.phone}
                        className="text-text-navy text-md font-medium text-primary hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    )}
                    {/* Email with copy-to-clipboard */}
                    {job.contactPerson?.email && (
                      <CopyToClipboardField
                        label={job.contactPerson.email}
                        className="text-text-navy text-md font-medium text-primary hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    )}
                  </div>
                </DialogHeader>
                <DialogFooter className="mt-30">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="h-[56px] w-[83px]">
                      Hide
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* First Row: Job Role + Favorites */}
          <div className="flex justify-between items-start mb-3">
            {/* Job Title */}
            {job.title ? (
              <h3 className="text-base font-semibold text-foreground leading-tight flex-1 pr-2">{job.title}</h3>
            ) : (
              <Skeleton className="h-5 w-3/4" />
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
                className={`h-5 w-5 ${isFavorited ? 'text-warning' : 'text-warning hover:text-warning/80'}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118l-5.37-3.905c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z"
                />
              </svg>
            </button>
          </div>

          {/* Second Row: Company Name, Phone, Kununu + Placed Score */}
          <div className="flex justify-between items-center mb-3">
            {/* Left: Company, Phone, Kununu */}
            <div className="flex items-center gap-3 text-xs flex-1">
              {/* Company Logo + Name */}
              <div className="flex items-center gap-1">
                {job.companyLogo ? (
                  <Image src={job.companyLogo} alt={job.company} width={16} height={16} className="h-4 w-4 rounded-full object-contain" />
                ) : (
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs">{job.company?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                )}
                {job.company ? (
                  <span className="text-muted-foreground text-xs">{job.company}</span>
                ) : (
                  <Skeleton className="h-3 w-16" />
                )}
              </div>

              {/* Phone */}
              {job.contactPerson?.phone && (
                <span className="flex items-center gap-1 text-primary text-xs">
                  <Phone className="h-3 w-3" />
                  <span className="truncate">{job.contactPerson.phone}</span>
                </span>
              )}

              {/* Kununu */}
              {job.kununu && (
                <div className="flex items-center gap-1 text-xs">
                  <Image src={'/logos/providerlogos/kunnunu.svg'} alt="Kununu" width={16} height={16} className="h-4 w-auto" />
                  <span className="text-muted-foreground">{job.kununu.rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
              )}
            </div>

            {/* Right: Placed Score */}
            {job.matchPercentage !== undefined ? (
              <span className="text-sm font-semibold text-primary flex-shrink-0">[ {job.matchPercentage}% ]</span>
            ) : (
              <Skeleton className="h-4 w-10" />
            )}
          </div>

          {/* Third Row: Location, Date Posted, Salary + Headhunters */}
          <div className="flex justify-between items-center mb-3">
            {/* Left: Location, Date, Salary */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-1">
              {/* Location */}
              {job.location && (
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{job.location}</span>
                </span>
              )}

              {/* Date Posted */}
              {job.postedDate && (
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                  </svg>
                  <span>{formatDate(job.postedDate)}</span>
                </span>
              )}

              {/* Salary */}
              {job.salary?.amount && (
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                    <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                    <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                  </svg>
                  <span>{formatSalary(job.salary.amount, job.salary.currency)}</span>
                </span>
              )}
            </div>

            {/* Right: Headhunters */}
            {job.headhunters && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <span>{formatHeadhunters(job.headhunters)}</span>
              </span>
            )}
          </div>

          {/* Fourth Row: Listed On */}
          <div className="flex items-center justify-between">
            {/* Listed On */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">{dict.listedOn}:</span>
              {job.listedOn && job.listedOn.length > 0 && (
                <div className="flex items-center gap-1">
                  {job.listedOn.slice(0, 3).map((logo, idx) => (
                    <Image key={idx} src={logo.src} alt={logo.alt} width={16} height={16} className="h-4 w-auto" />
                  ))}
                  {job.listedOn.length > 3 && (
                    <span className="text-muted-foreground">+{job.listedOn.length - 3}</span>
                  )}
                </div>
              )}
            </div>

            {/* Place Now Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="cta"
                  className="min-w-[128px] h-10 rounded-3xl px-6 py-3 font-semibold hover:bg-cta-hover whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  {dict.placeNow}
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col w-[500px] h-[280px] rounded-lg shadow-md pb-[12px]">
                <DialogHeader className="pl-6 pr-6 h-[28px]">
                  <DialogTitle className="text-text-navy text-xl font-medium ">Contact Details</DialogTitle>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-navy text-lg font-medium text-primary">{job.contactPerson?.name}</span>
                    </div>
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-secondary text-md font-medium">{job.company}</span>
                    </div>
                    {/* Phone with copy-to-clipboard */}
                      {job.contactPerson?.phone && (
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.11021 12.9223C9.6979 13.0259 10.3021 13.0259 10.8898 12.9223C11.8344 12.7559 12.5952 12.1217 12.8573 11.2824L12.9129 11.1044C12.9707 10.9193 13 10.7279 13 10.5356C13 9.68751 12.2416 9 11.306 9H8.69404C7.75845 9 7 9.68751 7 10.5356C7 10.7279 7.02931 10.9193 7.08709 11.1044L7.14268 11.2824C7.40475 12.1217 8.16561 12.7559 9.11021 12.9223ZM9.11021 12.9223C5.02797 12.1659 1.83405 8.97203 1.07767 4.88979M1.07767 4.88979C0.97411 4.3021 0.974111 3.6979 1.07767 3.11021C1.24412 2.16561 1.8783 1.40475 2.71761 1.14268L2.89563 1.08709C3.08069 1.02931 3.27208 1 3.46441 1C4.31249 1 5.00001 1.75845 5 2.69404L5 5.30596C5 6.24155 4.31249 7 3.4644 7C3.27208 7 3.08068 6.97069 2.89563 6.91291L2.71761 6.85732C1.87829 6.59525 1.24412 5.83439 1.07767 4.88979Z" stroke="#363853" stroke-width="1.5"/>
                          </svg>
                          {job.contactPerson.phone}
                        </div>
                      )}
                      <CopyToClipboardField
                        label={job.contactPerson.phone}
                        className="text-text-navy text-md font-medium text-primary hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    {/* Email with copy-to-clipboard */}
                    {job.contactPerson?.email && (
                      <CopyToClipboardField
                        label={job.contactPerson.email}
                        className="text-text-navy text-md font-medium text-primary hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    )}
                  </div>
                </DialogHeader>
                <DialogFooter className="mt-30">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="h-[56px] w-[83px]">
                      Hide
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }