'use client';

import { useState } from 'react';
import { InternalNavbar } from '@/components/ui/layouts/InternalNavbar';
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import { DashboardSearchBar } from '@/components/dashboard/DashboardSearchBar';
import { SearchHistoryTable } from '@/components/dashboard/SearchHistoryTable';
import { CompaniesSection } from '@/components/dashboard/CompaniesSection';
import { useUser } from '@/hooks/useUser';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useRouter, useParams } from 'next/navigation';
import { CvErrorBoundary } from '@/components/search/CvErrorBoundry';


interface DashboardPageProps {
  dict?: {
    dashboard?: {
      title?: string;
      navigation?: {
        logoAlt?: string;
      };
      welcome?: string;
      searchPlaceholder?: string;
      locationPlaceholder?: string;
      search?: string;
      dropResume?: string;
      toggles?: {
        onlyPaidAds?: string;
        excludeHeadhunters?: string;
        excludeMyClients?: string;
      };
      searchHistory?: {
        searchDetails?: string;
        cvUploaded?: string;
        cv?: string;
        favoriteJobs?: string;
        searchAgain?: string;
      };
      companies?: {
        companies?: string;
        existingClients?: string;
        following?: string;
        blacklist?: string;
        company?: string;
        location?: string;
        jobsListed?: string;
        jobsFavorite?: string;
        browseJobs?: string;
      };
    };
  };
}

export function DashboardPage({ dict }: DashboardPageProps) {
  const { displayName, loading: userLoading } = useUser();
  const { data: dashboardData, loading: dataLoading, error } = useDashboardData();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'en';
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [toggles, setToggles] = useState({
    onlyPaidAds: false,
    excludeHeadhunters: false,
    excludeMyClients: false,
  });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState(false);

  const handleToggleChange = (key: 'onlyPaidAds' | 'excludeHeadhunters' | 'excludeMyClients', value: boolean) => {
    setToggles(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchClick = () => {
    console.log('Search clicked:', { searchQuery, location, toggles });
  };

  // Mock parseCv function (replace with real API later)
  async function parseCv(file: File): Promise<{ success: boolean, fileId?: string }> {
    // Simulate error for empty file or .txt
    if (!file || file.size === 0 || file.name.endsWith('.txt')) return { success: false };
    return { success: true, fileId: 'mock-file-id' };
  }

  const handleFileChange = (file: File | null) => {
    setAttachedFile(file);
    setCvError(false);
  };

  const handleSearch = async () => {
    if (attachedFile) {
      const result = await parseCv(attachedFile);
      if (!result.success) {
        setCvError(true);
        return;
      }
      router.push(`/${lang}/search?fileId=${result.fileId}`);
      return;
    }
    
    // Normal search logic (no file attached)
    const urlParams = new URLSearchParams();
    if (searchQuery) urlParams.set('q', searchQuery);
    if (location) urlParams.set('location', location);
    router.push(`/${lang}/search?${urlParams.toString()}`);
  };

  // Show loading state
  if (userLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <InternalNavbar dict={dict} />
        <main className="w-full">
          <DashboardContainer>
            <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
              <div className="pt-4">
                <h1 className="font-grotesk font-medium text-xl leading-none text-text-primary">
                  Loading...
                </h1>
              </div>
            </div>
          </DashboardContainer>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <InternalNavbar dict={dict} />
        <main className="w-full">
          <DashboardContainer>
            <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
              <div className="pt-4">
                <h1 className="font-grotesk font-medium text-xl leading-none text-error">
                  Error: {error}
                </h1>
              </div>
            </div>
          </DashboardContainer>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Internal Navigation */}
      <InternalNavbar dict={dict} />
      
      {/* Main Content */}
      <main className="w-full flex flex-row">
        <DashboardContainer>
          <div className="flex flex-col space-y-8 pt-8">
            {/* Welcome Message */}
            <div className="flex items-center">
              <h1 className="font-grotesk font-medium text-xl leading-none text-text-primary">
                {dict?.dashboard?.welcome || 'Welcome'} {displayName},
              </h1>
            </div>
            {/* Show CV Error Boundary if error triggered */}
            {cvError && (
              <div className="flex justify-end w-full mt-4">
                <CvErrorBoundary onTryAnotherFile={() => setCvError(false)} />
              </div>
            )}
            {/* Search Bar */}
            <div className="flex flex-col space-y-8 pt-8">
              <DashboardSearchBar
                searchQuery={searchQuery}
                location={location}
                onSearchQueryChange={setSearchQuery}
                onLocationChange={setLocation}
                onSearchClick={handleSearchClick}
                toggles={toggles}
                onToggleChange={handleToggleChange}
                dict={{
                  searchPlaceholder: dict?.dashboard?.searchPlaceholder || 'Search job titles or drop a CV...',
                  locationPlaceholder: dict?.dashboard?.locationPlaceholder || 'Type something...',
                  search: dict?.dashboard?.search || 'Search',
                  dropResume: dict?.dashboard?.dropResume || 'Drop resume here',
                  toggles: {
                    onlyPaidAds: dict?.dashboard?.toggles?.onlyPaidAds || 'Only paid ads',
                    excludeHeadhunters: dict?.dashboard?.toggles?.excludeHeadhunters || 'Exclude headhunter listings',
                    excludeMyClients: dict?.dashboard?.toggles?.excludeMyClients || 'Exclude my clients',
                  },
                }}
                onFileChange={handleFileChange}
                onSearch={handleSearch}
              />
            </div>

            {/* Search History Table */}
            <div className="flex flex-col space-y-8 pt-16">
              {dashboardData?.searchHistory && (
                <SearchHistoryTable
                  data={dashboardData.searchHistory}
                  dict={{
                    searchDetails: dict?.dashboard?.searchHistory?.searchDetails || 'Search Details',
                    cvUploaded: dict?.dashboard?.searchHistory?.cvUploaded || 'CV Uploaded',
                    cv: dict?.dashboard?.searchHistory?.cv || 'CV',
                    favoriteJobs: dict?.dashboard?.searchHistory?.favoriteJobs || 'No. of favourite jobs',
                    searchAgain: dict?.dashboard?.searchHistory?.searchAgain || 'Search again',
                  }}
                />
              )}
            </div>

            {/* Companies Section */}
            <div className="flex flex-col space-y-8 pt-16">
              {dashboardData?.companies && (
                <CompaniesSection
                  existingClients={dashboardData.companies.existingClients}
                  following={dashboardData.companies.following}
                  blacklist={dashboardData.companies.blacklist}
                  dict={{
                    companies: dict?.dashboard?.companies?.companies || 'Companies',
                    existingClients: dict?.dashboard?.companies?.existingClients || 'Existing Clients',
                    following: dict?.dashboard?.companies?.following || 'Following',
                    blacklist: dict?.dashboard?.companies?.blacklist || 'Blacklist',
                    company: dict?.dashboard?.companies?.company || 'Company',
                    location: dict?.dashboard?.companies?.location || 'Location',
                    jobsListed: dict?.dashboard?.companies?.jobsListed || 'Jobs listed',
                    jobsFavorite: dict?.dashboard?.companies?.jobsFavorite || 'Jobs favorite',
                    browseJobs: dict?.dashboard?.companies?.browseJobs || 'Browse Jobs',
                  }}
                />
              )}
            </div>

            {/* Bottom padding for scroll space */}
            <div className="h-16" />
          </div>
        </DashboardContainer>
      </main>
    </div>
  );
} 