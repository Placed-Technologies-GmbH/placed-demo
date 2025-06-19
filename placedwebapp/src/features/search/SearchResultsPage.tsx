'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchResults } from '../../hooks/useSearchResults';
import { SearchFilters } from '../../components/search/SearchFilters';
import { SearchBarWithToggles } from '../../components/search/SearchBarWithToggles';
import { JobListView } from '../../components/search/JobListView';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { InternalNavbar } from '@/components/ui/layouts/InternalNavbar';
import { Container } from '@/components/ui/Container';
import { Filter, ChevronDown, SortAsc } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { CvErrorBoundary } from '@/components/search/CvErrorBoundry';


interface SearchResultsPageProps {
  dict: {
    title: string;
    searchPlaceholder?: string;
    locationPlaceholder?: string;
    search?: string;
    go?: string;
    filters: {
      experienceLevel: string;
      industry: string;
      filters: string;
      toggles: {
        onlyPaidAds: string;
        excludeHeadhunters: string;
        excludeMyClients: string;
      };
      experienceOptions?: {
        [key: string]: string;
      };
      industryOptions?: {
        [key: string]: string;
      };
    };
    sorting: {
      sortBy: string;
      newJobs: string;
      placedScore: string;
      urgency: string;
      profileMatch: string;
    };
    results: {
      jobsFound: string;
      noResults: string;
      noResultsDescription: string;
      loading: string;
    };
    jobCard: {
      postedDate: string;
      salary: string;
      location: string;
      matchPercentage: string;
      placeNow: string;
      listedOn: string;
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
  commonDict?: {
    dashboard?: {
      navigation?: {
        logoAlt?: string;
      };
    };
  };
}

export function SearchResultsPage({ dict, commonDict }: SearchResultsPageProps) {
  const {
    jobs,
    isLoading,
    currentParams,
    updateSearchParams,
    handlePageChange,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    totalCount,
  } = useSearchResults();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const lang = params?.lang || 'en';
  
  // Unified search state
  const [searchState, setSearchState] = useState({
    keyword: currentParams.keyword || '',
    location: searchParams.get('location') || '',
    cvFile: null as File | null,
    fileId: searchParams.get('fileId') || null,
    candidateName: '',
  });
  
  const [cvError, setCvError] = useState(false);
  const [currentSort, setCurrentSort] = useState('newJobs');
  
  // Track previous values for debounce fallback
  const prevKeywordRef = useRef(searchState.keyword);
  const prevLocationRef = useRef(searchState.location);
  
  // Debounced values for fallback only
  const [debouncedKeyword] = useDebounce(searchState.keyword, 500);
  const [debouncedLocation] = useDebounce(searchState.location, 500);

  // Mock parseCv function (replace with real API later)
  async function parseCv(file: File): Promise<{ success: boolean, fileId?: string, candidateName?: string }> {
    if (!file || file.size === 0 || file.name.endsWith('.txt')) return { success: false };
    // Mock: extract candidate name from filename
    const candidateName = file.name.replace(/\.(pdf|doc|docx)$/i, '');
    return { success: true, fileId: 'mock-file-id', candidateName };
  }

  // Unified search handler - only triggered by button click
  const handleSearch = async () => {
    setCvError(false);
    
    // If CV file is attached, parse it first
    if (searchState.cvFile && !searchState.fileId) {
      const result = await parseCv(searchState.cvFile);
      if (!result.success) {
        setCvError(true);
        return;
      }
      
      // Update state with CV info
      setSearchState(prev => ({
        ...prev,
        fileId: result.fileId || null,
        candidateName: result.candidateName || '',
      }));
      
      // Trigger search with CV
      updateSearchParams({
        keyword: searchState.keyword,
        filters: currentParams.filters
      });
      
      // Update URL with all params including fileId
      const urlParams = new URLSearchParams();
      if (result.fileId) urlParams.set('fileId', result.fileId);
      if (searchState.keyword) urlParams.set('keyword', searchState.keyword);
      if (searchState.location) urlParams.set('location', searchState.location);
      router.push(`/${lang}/search?${urlParams.toString()}`);
      
    } else {
      // Normal search (with or without existing fileId)
      updateSearchParams({
        keyword: searchState.keyword,
        filters: currentParams.filters
      });
      
      // Update URL with all params
      const urlParams = new URLSearchParams();
      if (searchState.fileId) urlParams.set('fileId', searchState.fileId);
      if (searchState.keyword) urlParams.set('keyword', searchState.keyword);
      if (searchState.location) urlParams.set('location', searchState.location);
      router.push(`/${lang}/search?${urlParams.toString()}`);
    }
  };

  // Handle file change
  const handleFileChange = (file: File | null) => {
    setSearchState(prev => ({
      ...prev,
      cvFile: file,
      // Clear fileId if file is removed
      fileId: file ? prev.fileId : null,
      candidateName: file ? prev.candidateName : '',
    }));
    setCvError(false);
  };

  // Handle keyword change
  const handleKeywordChange = (value: string) => {
    setSearchState(prev => ({ ...prev, keyword: value }));
  };

  // Handle location change
  const handleLocationChange = (value: string) => {
    setSearchState(prev => ({ ...prev, location: value }));
  };

  // Debounce fallback when fields are cleared
  useEffect(() => {
    // Check if keyword was cleared
    if (prevKeywordRef.current && !debouncedKeyword) {
      updateSearchParams({
        keyword: '',
        filters: currentParams.filters
      });
      
      // Update URL to maintain fileId and location
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('q'); // Remove keyword
      if (searchState.fileId) urlParams.set('fileId', searchState.fileId);
      if (searchState.location) urlParams.set('location', searchState.location);
      router.push(`${window.location.pathname}?${urlParams.toString()}`);
    }
    prevKeywordRef.current = debouncedKeyword;
  }, [debouncedKeyword, searchState.fileId, searchState.location, currentParams.filters, updateSearchParams, router]);

  useEffect(() => {
    // Check if location was cleared
    if (prevLocationRef.current && !debouncedLocation) {
      updateSearchParams({
        keyword: searchState.keyword,
        filters: currentParams.filters
      });
      
      // Update URL to maintain fileId
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('location');
      if (searchState.fileId) urlParams.set('fileId', searchState.fileId);
      if (searchState.keyword) urlParams.set('q', searchState.keyword);
      router.push(`${window.location.pathname}?${urlParams.toString()}`);
    }
    prevLocationRef.current = debouncedLocation;
  }, [debouncedLocation, searchState.keyword, searchState.fileId, currentParams.filters, updateSearchParams, router]);

  // Toggle change handler
  const handleToggleChange = useCallback((key: 'onlyPaidAds' | 'excludeHeadhunters' | 'excludeMyClients', value: boolean) => {
    updateSearchParams({ 
      filters: { ...currentParams.filters, [key]: value } 
    });
  }, [currentParams.filters, updateSearchParams]);

  const sortingOptions = [
    { key: 'newJobs', label: dict.sorting.newJobs, active: currentSort === 'newJobs' },
    { key: 'placedScore', label: dict.sorting.placedScore, active: currentSort === 'placedScore' },
    { key: 'urgency', label: dict.sorting.urgency, active: currentSort === 'urgency' },
    { key: 'profileMatch', label: dict.sorting.profileMatch, active: currentSort === 'profileMatch' },
  ];

  const handleSortChange = useCallback((sortKey: string) => {
    setCurrentSort(sortKey);
    // Add sorting logic here when backend integration is ready
  }, []);

  // Create search context for JobsCountAndSort
  const searchContext = {
    keyword: searchState.keyword,
    location: searchState.location,
    cv: !!searchState.fileId,
    candidateName: searchState.candidateName,
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Internal Navigation */}
      <InternalNavbar dict={commonDict} />

      {/* Show CV Error Boundary if error triggered */}
      {cvError && (
        <div className="flex justify-end w-full mt-4 px-4">
          <CvErrorBoundary onTryAnotherFile={() => setCvError(false)} />
        </div>
      )}

      {/* Search Bar with Toggles Component */}
      <SearchBarWithToggles
        searchQuery={searchState.keyword}
        location={searchState.location}
        onSearchQueryChange={handleKeywordChange}
        onLocationChange={handleLocationChange}
        onSearch={handleSearch}
        toggles={{
          onlyPaidAds: currentParams.filters.onlyPaidAds,
          excludeHeadhunters: currentParams.filters.excludeHeadhunters,
          excludeMyClients: currentParams.filters.excludeMyClients
        }}
        onToggleChange={handleToggleChange}
        dict={{
          searchPlaceholder: dict.searchPlaceholder,
          locationPlaceholder: dict.locationPlaceholder,
          search: dict.search,
          dropResume: "Drop resume here",
          toggles: dict.filters.toggles
        }}
        onFileChange={handleFileChange}
      />

      {/* Mobile Filter and Sort Controls */}
      <div className="w-full bg-background-muted py-4 lg:hidden">
        <Container size="xl">
          <div className="flex items-center justify-between gap-4">
            {/* Filter Button with Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {dict.filters.filters}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-80">
                <SheetHeader>
                  <SheetTitle>{dict.filters.filters}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <SearchFilters
                    filters={currentParams.filters}
                    onFiltersChange={(newFilters) => updateSearchParams({ filters: { ...currentParams.filters, ...newFilters } })}
                    dict={dict.filters}
                  />
                  
                  {/* Mobile Toggle Switches in Filter Sheet */}
                  <div className="mt-6 space-y-4 border-t border-border pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="onlyPaidAds-mobile"
                        checked={currentParams.filters.onlyPaidAds}
                        onCheckedChange={(checked) => updateSearchParams({ 
                          filters: { ...currentParams.filters, onlyPaidAds: checked } 
                        })}
                        aria-label={dict.filters.toggles.onlyPaidAds}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                      />
                      <label htmlFor="onlyPaidAds-mobile" className="text-sm font-medium text-foreground cursor-pointer">
                        {dict.filters.toggles.onlyPaidAds}
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="excludeHeadhunters-mobile"
                        checked={currentParams.filters.excludeHeadhunters}
                        onCheckedChange={(checked) => updateSearchParams({ 
                          filters: { ...currentParams.filters, excludeHeadhunters: checked } 
                        })}
                        aria-label={dict.filters.toggles.excludeHeadhunters}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                      />
                      <label htmlFor="excludeHeadhunters-mobile" className="text-sm font-medium text-foreground cursor-pointer">
                        {dict.filters.toggles.excludeHeadhunters}
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="excludeMyClients-mobile"
                        checked={currentParams.filters.excludeMyClients}
                        onCheckedChange={(checked) => updateSearchParams({ 
                          filters: { ...currentParams.filters, excludeMyClients: checked } 
                        })}
                        aria-label={dict.filters.toggles.excludeMyClients}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                      />
                      <label htmlFor="excludeMyClients-mobile" className="text-sm font-medium text-foreground cursor-pointer">
                        {dict.filters.toggles.excludeMyClients}
                      </label>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  {dict.sorting.sortBy}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {sortingOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.key} 
                    className="cursor-pointer"
                    onClick={() => handleSortChange(option.key)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Container>
      </div>

      {/* Main Content with Container and Flex Layout */}
      <div className="w-full">
        <Container size="xl">
          <div className="flex gap-8">
            {/* Left Container - Filters (Desktop Only) */}
            <aside className="hidden lg:block w-[300px] flex-shrink-0">
              <div className="sticky top-60">
                <SearchFilters
                  filters={currentParams.filters}
                  onFiltersChange={(newFilters) => updateSearchParams({ filters: { ...currentParams.filters, ...newFilters } })}
                  dict={dict.filters}
                />
              </div>
            </aside>

            {/* Right Container - Job Results (56px gap from search bar) */}
            <main className="flex-1 min-w-0 pt-14 ">
              <div className="flex flex-col gap-8">
                <JobListView
                  jobs={jobs}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalCount={totalCount}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  currentSort={currentSort}
                  onPageChange={handlePageChange}
                  onSortChange={handleSortChange}
                  searchContext={searchContext}
                  dict={{
                    noResults: dict.results.noResults,
                    noResultsDescription: dict.results.noResultsDescription,
                    loading: dict.results.loading,
                    jobsFound: dict.results.jobsFound,
                    sorting: dict.sorting,
                    jobCard: dict.jobCard,
                    pagination: dict.pagination,
                  }}
                />
              </div>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
} 