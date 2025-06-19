'use client';

import { useCallback, useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SearchService } from '@/lib/api/searchService';
import { getItemsPerPage } from '@/lib/config/paginationConfig';
import type { SearchParams, SearchResponse } from '../features/search/types';

export function useSearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Get appropriate items per page based on screen size
  const itemsPerPage = getItemsPerPage(isMobile);

  // Parse current search parameters from URL
  const currentParams = useMemo((): SearchParams => {
    const keyword = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const experienceLevelParam = searchParams.get('experienceLevel') || '';
    const industryParam = searchParams.get('industry') || '';
    const onlyPaidAds = searchParams.get('onlyPaidAds') === 'true';
    const excludeHeadhunters = searchParams.get('excludeHeadhunters') === 'true';
    const excludeMyClients = searchParams.get('excludeMyClients') === 'true';

    // Parse comma-separated values into arrays
    const experienceLevel = experienceLevelParam ? experienceLevelParam.split(',').filter(Boolean) : [];
    const industry = industryParam ? industryParam.split(',').filter(Boolean) : [];

    return {
      keyword,
      page,
      limit: itemsPerPage,
      filters: {
        experienceLevel,
        industry,
        onlyPaidAds,
        excludeHeadhunters,
        excludeMyClients,
      },
    };
  }, [searchParams, itemsPerPage]);

  // Use React Query for data fetching with caching
  const {
    data: searchResponse,
    isLoading,
    error,
    refetch,
  } = useQuery<SearchResponse>({
    queryKey: ['searchJobs', currentParams],
    queryFn: () => SearchService.searchJobs(currentParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Update URL parameters
  const updateSearchParams = useCallback((newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update keyword
    if (newParams.keyword !== undefined) {
      if (newParams.keyword) {
        params.set('q', newParams.keyword);
      } else {
        params.delete('q');
      }
    }

    // Update page (reset to 1 when filters change, unless explicitly setting page)
    if (newParams.page !== undefined) {
      params.set('page', newParams.page.toString());
    } else if (newParams.keyword !== undefined || newParams.filters) {
      params.set('page', '1');
    }

    // Update filters
    if (newParams.filters) {
      const filters = newParams.filters;

      // Experience level
      if (filters.experienceLevel !== undefined) {
        if (Array.isArray(filters.experienceLevel) && filters.experienceLevel.length > 0) {
          params.set('experienceLevel', filters.experienceLevel.join(','));
        } else {
          params.delete('experienceLevel');
        }
      }

      // Industry
      if (filters.industry !== undefined) {
        if (Array.isArray(filters.industry) && filters.industry.length > 0) {
          params.set('industry', filters.industry.join(','));
        } else {
          params.delete('industry');
        }
      }

      // Boolean filters
      if (filters.onlyPaidAds !== undefined) {
        if (filters.onlyPaidAds) {
          params.set('onlyPaidAds', 'true');
        } else {
          params.delete('onlyPaidAds');
        }
      }

      if (filters.excludeHeadhunters !== undefined) {
        if (filters.excludeHeadhunters) {
          params.set('excludeHeadhunters', 'true');
        } else {
          params.delete('excludeHeadhunters');
        }
      }

      if (filters.excludeMyClients !== undefined) {
        if (filters.excludeMyClients) {
          params.set('excludeMyClients', 'true');
        } else {
          params.delete('excludeMyClients');
        }
      }
    }

    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  // Convenience function for page changes
  const handlePageChange = useCallback((page: number) => {
    updateSearchParams({ page });
    
    // Scroll to top of page when page changes (client-side only)
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [updateSearchParams]);

  // Return search results and utilities
  return {
    // Data
    jobs: searchResponse?.jobs || [],
    totalCount: searchResponse?.totalCount || 0,
    currentPage: searchResponse?.currentPage || 1,
    totalPages: searchResponse?.totalPages || 1,
    hasNextPage: searchResponse?.hasNextPage || false,
    hasPreviousPage: searchResponse?.hasPreviousPage || false,

    // State
    isLoading,
    error,

    // Current parameters
    currentParams,

    // Actions
    updateSearchParams,
    handlePageChange,
    refetch,
  };
} 