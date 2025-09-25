'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CompanyInfoSidebar } from '@/components/jobdetails/CompanyInfoSidebar';
import { JobCard } from '@/components/jobdetails/JobCard';
import { AISummaryCard } from '@/components/jobdetails/AISummaryCard';
import { AISummaryLoadingCard } from '@/components/jobdetails/AISummaryLoadingCard';
import { SalesPitchCard } from '@/components/jobdetails/SalesPitchCard';
import { SalesPitchLoadingCard } from '@/components/jobdetails/AISummaryLoadingCard';
import { JobDetailsCard } from '@/components/jobdetails/JobDetailsCard';
import AdditionalContactRequest from '@/components/jobdetails/AdditionalContactRequest';
import { useJobDetails } from '@/hooks/jobdetailshook/useJobDetails';
import { useAISummary } from '@/hooks/jobdetailshook/useAISummary';
import { useSalesPitch } from '@/hooks/jobdetailshook/useSalesPitch';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import type { JobDetailsPageState } from '@/features/jobdetails/types';

// Mock additional contacts data
const mockAdditionalContacts = [
  {
    id: 'contact-3',
    name: 'Thomas Schmidt',
    position: 'HR Manager',
    phone: '+49 30 789 123 45',
    email: 'thomas@techvisio.de'
  },
  {
    id: 'contact-4',
    name: 'Sarah Weber',
    position: 'Senior Recruiter',
    phone: '+49 30 456 789 12',
    email: 'sarah@techvisio.de'
  },
  {
    id: 'contact-5',
    name: 'Michael Fischer',
    position: 'People Operations',
    phone: '+49 30 654 321 98',
    email: 'michael@techvisio.de'
  },
  {
    id: 'contact-6',
    name: 'Lisa Wagner',
    position: 'Recruiting Specialist',
    phone: '+49 30 987 654 32',
    email: 'lisa@techvisio.de'
  },
  {
    id: 'contact-7',
    name: 'David Hoffmann',
    position: 'Team Lead Recruiting',
    phone: '+49 30 234 567 89',
    email: 'david@techvisio.de'
  },
  {
    id: 'contact-8',
    name: 'Maria Becker',
    position: 'Talent Acquisition Specialist',
    phone: '+49 30 345 678 90',
    email: 'maria@techvisio.de'
  },
  {
    id: 'contact-9',
    name: 'Alexander Schulz',
    position: 'Head of Recruiting',
    phone: '+49 30 567 890 12',
    email: 'alexander@techvisio.de'
  },
  {
    id: 'contact-10',
    name: 'Julia Meyer',
    position: 'HR Business Partner',
    phone: '+49 30 678 901 23',
    email: 'julia@techvisio.de'
  },
  {
    id: 'contact-11',
    name: 'Stefan Wagner',
    position: 'Recruiting Manager',
    phone: '+49 30 789 012 34',
    email: 'stefan@techvisio.de'
  },
  {
    id: 'contact-12',
    name: 'Katharina Zimmermann',
    position: 'Director of People Operations',
    phone: '+49 30 890 123 45',
    email: 'katharina@techvisio.de'
  }
];

interface JobDetailsPageClientProps {
  lang: string;
  id: string;
  dict: {
    company: {
      title: string;
      dropdown: {
        existingClient: string;
        follow: string;
        blacklist: string;
      };
      contact: string;
      website: string;
      about: string;
    };
    aiSummary: {
      title: string;
      learnMore: string;
      placedScore: string;
      profileMatch: string;
      urgencyScore: string;
      whatsGood: string;
      whatsBad: string;
      whatsMissing: string;
      generatedOn: string;
      feedback: {
        question: string;
        thumbsUp: string;
        thumbsDown: string;
      };
    };
    salesPitch: {
      title: string;
      placedScore: string;
      profileMatch: string;
      urgencyScore: string;
      conversationStarters: string;
      objectionHandlers: string;
      generatedOn: string;
      feedback: {
        question: string;
        thumbsUp: string;
        thumbsDown: string;
      };
    };
    jobDetails: {
      responsibilities: string;
      yourProfile: string;
      benefits: string;
      jobDescription: string;
      alsoListedOn: string;
    };
    additionalContacts: {
      contactNotWorking: string;
      additionalContactDescription: string;
      noCompanyFound: string;
      requestAdditionalContact: string;
      creditsLeft: string;
    };
    actions: {
      profileAnalysis: string;
      salesPitch: string;
      aiGenerated: string;
      generating: string;
      backToSearch: string;
      browseJobs: string;
      favorite: string;
      copyToClipboard: string;
    };
    jobCard: {
      postedToday: string;
      postedYesterday: string;
      postedDaysAgo: string;
      listedOn: string;
      headhunterRecruiting: string;
      headhuntersRecruiting: string;
    };
    errors: {
      jobNotFound: string;
      jobNotFoundDescription: string;
      failedToToggleFavorite: string;
      failedToGenerateAI: string;
    };
    loading: {
      loadingJob: string;
      generatingAI: string;
      aiLoadingMessages: {
        analyzing: string;
        processing: string;
        generating: string;
        finalizing: string;
      };
    };
  };
}

export function JobDetailsPageClient({ lang, id, dict }: JobDetailsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [pageState, setPageState] = useState<JobDetailsPageState>({
    showAISummary: false,
    showSalesPitch: false,
    isGeneratingAI: false,
    isGeneratingSalesPitch: false,
    isFavorited: false,
    companyRelationship: 'none',
  });

  // Additional contacts state
  const [creditsLeft, setCreditsLeft] = useState(10);
  const [revealedContacts, setRevealedContacts] = useState<Array<{
    id: string;
    name: string;
    position: string;
    phone: string;
    email: string;
  }>>([]);


  // Data fetching hooks
  const { data: jobDetails, isLoading, error } = useJobDetails(id);
  const { generateAISummary } = useAISummary(id);
  const { generateSalesPitch } = useSalesPitch(id);

  // Initialize state from job data
  useEffect(() => {
    if (jobDetails) {
      setPageState(prev => ({
        ...prev,
        isFavorited: jobDetails.isFavorited || false,
        companyRelationship: jobDetails.company.relationshipStatus,
        // Note: AI Summary should only be shown after clicking "Sales Script" button
        // Do not auto-show AI summary even if it exists in job details
      }));
    }
  }, [jobDetails]);

  const handleProfileAnalysisClick = async () => {
    if (pageState.showAISummary) return;

    setPageState(prev => ({ ...prev, isGeneratingAI: true }));
    
    try {
      const aiSummary = await generateAISummary();
      setPageState(prev => ({
        ...prev,
        aiSummaryData: aiSummary,
        showAISummary: true,
        isGeneratingAI: false,
      }));
    } catch (error) {
      console.error('Failed to generate AI summary:', error);
      setPageState(prev => ({ ...prev, isGeneratingAI: false }));
    }
  };

  const handleSalesPitchClick = async () => {
    if (pageState.showSalesPitch) return;

    setPageState(prev => ({ ...prev, isGeneratingSalesPitch: true }));

    try {
      const salesPitch = await generateSalesPitch();
      setPageState(prev => ({ ...prev, salesPitchData: salesPitch, showSalesPitch: true, isGeneratingSalesPitch: false }));
    } catch (error) {
      console.error('Failed to generate sales pitch:', error);
      setPageState(prev => ({ ...prev, isGeneratingSalesPitch: false }));
    }
  };

  const handleBackToSearch = () => {
    // Reconstruct the search URL with preserved parameters
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    const searchQuery = currentSearchParams.toString();
    
    const searchUrl = searchQuery 
      ? `/${lang}/search?${searchQuery}`
      : `/${lang}/search`;
    
    router.push(searchUrl);
  };

  const handleFavoriteToggle = (newFavoriteStatus: boolean) => {
    setPageState(prev => ({ ...prev, isFavorited: newFavoriteStatus }));
  };

  const handleCompanyRelationshipChange = (newRelationship: 'existing_client' | 'follow' | 'blacklist' | 'none') => {
    setPageState(prev => ({ ...prev, companyRelationship: newRelationship }));
  };

  const handleRequestAdditionalContact = () => {
    if (creditsLeft <= 0) return;
    
    // Find next unrevealed contact
    const nextContact = mockAdditionalContacts.find(contact => 
      !revealedContacts.some(revealed => revealed.id === contact.id)
    );
    
    if (!nextContact) {
      console.log('No more contacts available');
      return;
    }
    
    // Add to revealed contacts list
    setRevealedContacts(prev => [...prev, nextContact]);
    
    // Decrease credits
    setCreditsLeft(prev => prev - 1);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        {/* Desktop Loading Layout */}
        <div className="hidden md:flex gap-8">
          {/* Company Info Sidebar Skeleton */}
          <div className="w-[296px] flex-shrink-0">
            <div className="w-full h-[580px] bg-white border border-border rounded-[4px] p-4 space-y-4">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              <div className="space-y-2 pt-8">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </div>
          
          {/* Right Content Skeleton */}
          <div className="flex-1 space-y-8">
            {/* Job Card Skeleton */}
            <div className="w-full max-w-[952px] space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
              <div className="bg-white border border-border rounded-[6px] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="flex items-center gap-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-12" />
                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  <div className="h-10 w-32 bg-gray-200 rounded-3xl animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Job Details Card Skeleton */}
            <div className="w-full max-w-[952px] h-[712px] bg-white border border-border rounded-[6px] p-6">
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                </div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Loading Layout */}
        <div className="md:hidden space-y-4 px-4">
          {/* Back Button Skeleton */}
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
          
          {/* Job Card Skeleton */}
          <div className="bg-white border border-border rounded-[6px] p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
              <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Company Info Button Skeleton */}
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
          
          {/* Job Details Card Skeleton */}
          <div className="bg-white border border-border rounded-[6px] p-4 space-y-4">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jobDetails) {
    return (
      <div className="text-center py-12 px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-text-primary mb-4">Job Not Found</h1>
        <p className="text-sm md:text-base text-text-secondary mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <button
          onClick={handleBackToSearch}
          className="px-4 md:px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-8">
        {/* Left Sidebar - Company Info */}
        <div className="w-[296px] flex-shrink-0 space-y-6">
          <CompanyInfoSidebar
            company={jobDetails.company}
            relationshipStatus={pageState.companyRelationship}
            onRelationshipChange={handleCompanyRelationshipChange}
            additionalContacts={revealedContacts}
          />
          
          {/* Request more contacts button */}
          {creditsLeft > 0 && revealedContacts.length < mockAdditionalContacts.length && (
            <AdditionalContactRequest
              creditsLeft={creditsLeft}
              onRequestContact={handleRequestAdditionalContact}
              dict={dict.additionalContacts}
            />
          )}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 space-y-6 ">
          {/* Job Card */}
          <JobCard
            job={jobDetails}
            isFavorited={pageState.isFavorited}
            onFavoriteToggle={handleFavoriteToggle}
            onBackToSearch={handleBackToSearch}
            onProfileAnalysisClick={handleProfileAnalysisClick}
            onSalesPitchClick={handleSalesPitchClick}
            isGeneratingAI={pageState.isGeneratingAI}
            isGeneratingSalesPitch={pageState.isGeneratingSalesPitch}
            showAISummary={pageState.showAISummary}
            showSalesPitch={pageState.showSalesPitch}
            dict={dict.jobCard}
          />

          {/* AI Summary Loading Card - Shows while generating */}
          <AISummaryLoadingCard isGenerating={pageState.isGeneratingAI} />

          {/* AI Summary Card - Appears between Job Card and Job Details Card */}
          {pageState.showAISummary && pageState.aiSummaryData && !pageState.isGeneratingAI && (
            <AISummaryCard aiSummary={pageState.aiSummaryData} dict={dict} />
          )}

          {/* Sales Pitch Loading Card - Shows while generating */}
          <SalesPitchLoadingCard isGenerating={pageState.isGeneratingSalesPitch} />

          {/* Sales Pitch Card - Appears below AI Summary or between Job Card and Job Details Card */}
          {pageState.showSalesPitch && pageState.salesPitchData && !pageState.isGeneratingAI && (
            <SalesPitchCard salesPitch={pageState.salesPitchData} dict={dict} />
          )}

          {/* Job Details Card */}
          <JobDetailsCard jobDetails={jobDetails} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-4 px-4">
        {/* Job Card */}
        <JobCard
          job={jobDetails}
          isFavorited={pageState.isFavorited}
          onFavoriteToggle={handleFavoriteToggle}
          onBackToSearch={handleBackToSearch}
          onProfileAnalysisClick={handleProfileAnalysisClick}
          onSalesPitchClick={handleSalesPitchClick}
          isGeneratingAI={pageState.isGeneratingAI}
          isGeneratingSalesPitch={pageState.isGeneratingSalesPitch}
          showAISummary={pageState.showAISummary}
          showSalesPitch={pageState.showSalesPitch}
          dict={dict.jobCard}
        />

        {/* Company Info Sheet Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 h-12 text-base font-medium"
            >
              <Building2 className="h-5 w-5" />
              {dict.company.title}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-[12px]">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-lg font-semibold text-left">
                {dict.company.title}
              </SheetTitle>
            </SheetHeader>
            <div className="h-full overflow-y-auto pb-6">
              <CompanyInfoSidebar
                company={jobDetails.company}
                relationshipStatus={pageState.companyRelationship}
                onRelationshipChange={handleCompanyRelationshipChange}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* AI Summary Loading Card - Shows while generating */}
        <AISummaryLoadingCard isGenerating={pageState.isGeneratingAI} />

        {/* AI Summary Card - Appears between Job Card and Job Details Card */}
        {pageState.showAISummary && pageState.aiSummaryData && !pageState.isGeneratingAI && (
          <AISummaryCard aiSummary={pageState.aiSummaryData} dict={dict} />
        )}

        {/* Sales Pitch Card - Appears below AI Summary or between Job Card and Job Details Card */}
        {pageState.showSalesPitch && pageState.salesPitchData && !pageState.isGeneratingAI && (
          <SalesPitchCard salesPitch={pageState.salesPitchData} dict={dict} />
        )}

        {/* Job Details Card */}
        <JobDetailsCard jobDetails={jobDetails} />
      </div>
    </div>
  );
} 