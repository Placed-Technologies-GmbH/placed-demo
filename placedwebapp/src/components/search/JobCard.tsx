  'use client';

  import { useState } from 'react';
  import { useRouter, useParams } from 'next/navigation';
  import { Button } from '@/components/ui/button';
  import { Dialog, DialogContent, DialogHeader, DialogTitle,  DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
  import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  import { Skeleton } from '@/components/ui/skeleton';
  import { Phone, Star } from 'lucide-react';
  import { SearchService } from '@/lib/api/searchService';
  import { CopyToClipboardField } from '@/components/ui/CopyToClipboardField';
  import type { JobListing } from '@/features/search/types';
  import Image from 'next/image';

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
        return dict.headhunter?.replace('{{count}}', '1') || '1 Headhunter';
      }
      return dict.headhunters?.replace('{{count}}', count.toString()) || `${count} Headhunters`;
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
      router.push(`/${lang}/job-details/${job.id}`);
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
                <Skeleton className="h-5 w-12" />
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
                  className={`h-[22px] w-[24px] ${isFavorited ? 'text-primary' : 'text-primary hover:text-primary/80'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full h-8 flex items-center gap-6 pt-2 pl-6">
            {/* Company Logo + Name */}
            <div className="flex items-center gap-2">
              {job.companyLogo ? (
                <Image src={job.companyLogo} alt={job.company} width={20} height={20} className="h-5 w-5 rounded-full object-contain" />
              ) : (
                <Avatar className="h-5 w-5">
                  <AvatarFallback>{job.company?.[0] || '?'}</AvatarFallback>
                </Avatar>
              )}
              {job.company ? (
                <span className="text-muted-foreground h-[20px]">{job.company}</span>
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
              <span className="flex items-center gap-1 h-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-navy" className="size-4">
                  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>
                {formatSalary(job.salary.amount, job.salary.currency)}
              </span>
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
                  {job.listedOn.slice(0, 5).map((logo, idx) => (
                    <Image key={idx} src={logo.src} alt={logo.alt} width={20} height={16} className="h-4 w-auto" />
                  ))}
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
                  className="min-w-[128px] h-10 rounded-3xl px-6 py-3 font-semibold hover:bg-cta-hover whitespace-nowrap"
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
                      <span className="text-text-navy text-lg font-medium text-primary text-shadow-sm">{job.contactPerson?.name}</span>
                    </div>
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-secondary text-md font-medium">{job.company}</span>
                    </div>
                    {/* Phone with copy-to-clipboard */}
                    {job.contactPerson?.phone && (
                      <CopyToClipboardField
                        label={job.contactPerson.phone}
                        className="text-text-navy text-md font-medium text-primary text-shadow-sm hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    )}
                    {/* Email with copy-to-clipboard */}
                    {job.contactPerson?.email && (
                      <CopyToClipboardField
                        label={job.contactPerson.email}
                        className="text-text-navy text-md font-medium text-primary text-shadow-sm hover:text-shadow-2xl"
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
                      <span className="text-text-navy text-lg font-medium text-primary text-shadow-sm">{job.contactPerson?.name}</span>
                    </div>
                    <div className="flex flex-col gap-2 h-[22px]">
                      <span className="text-text-secondary text-md font-medium">{job.company}</span>
                    </div>
                    {/* Phone with copy-to-clipboard */}
                    {job.contactPerson?.phone && (
                      <CopyToClipboardField
                        label={job.contactPerson.phone}
                        className="text-text-navy text-md font-medium text-primary text-shadow-sm hover:text-shadow-2xl"
                        copiedMessage="Copied!"
                      />
                    )}
                    {/* Email with copy-to-clipboard */}
                    {job.contactPerson?.email && (
                      <CopyToClipboardField
                        label={job.contactPerson.email}
                        className="text-text-navy text-md font-medium text-primary text-shadow-sm hover:text-shadow-2xl"
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