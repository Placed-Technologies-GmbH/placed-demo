import { Suspense } from 'react';
import { InternalNavbar } from '@/components/ui/layouts/InternalNavbar';
import { Container } from '@/components/ui/Container';
import { JobDetailsPageClient } from '@/features/jobdetails/JobDetailsPageClient';
import { getDictionary } from '../../dictionaries';


interface JobDetailsPageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

// Import the JSON data files to count how many jobs exist
import cv1Data from '@/lib/data/cv1_data.json';
import cv2Data from '@/lib/data/cv2_electrician_data.json';
import cv3Data from '@/lib/data/cv3_tech_data.json';
import cv4Data from '@/lib/data/cv4_finance_data.json';
import cv5Data from '@/lib/data/cv5_hr_data.json';
import keywordData from '@/lib/data/keyword_search_data.json';
import locationData from '@/lib/data/location_search_data.json';

// Function to generate incremental job IDs for a CV type
function generateCVJobIds(cvType: string, count: number): string[] {
  const jobIds: string[] = [];
  for (let i = 1; i <= count; i++) {
    jobIds.push(`${cvType}_job_${i}`);
  }
  return jobIds;
}

// Function to generate keyword job IDs
function generateKeywordJobIds(keywordData: Record<string, unknown>): string[] {
  const jobIds: string[] = [];
  Object.keys(keywordData).forEach(keyword => {
    const jobs = keywordData[keyword];
    if (Array.isArray(jobs)) {
      for (let i = 1; i <= jobs.length; i++) {
        jobIds.push(`keyword_${keyword}_${i}`);
      }
    }
  });
  return jobIds;
}

// Function to generate location job IDs
function generateLocationJobIds(locationData: Record<string, unknown>): string[] {
  const jobIds: string[] = [];
  Object.keys(locationData).forEach(location => {
    const jobs = locationData[location];
    if (Array.isArray(jobs)) {
      for (let i = 1; i <= jobs.length; i++) {
        jobIds.push(`location_${location}_${i}`);
      }
    }
  });
  return jobIds;
}

// Generate static params for all supported languages and job IDs
export async function generateStaticParams() {
  // Count jobs in each CV data file and generate incremental IDs
  const cv1JobIds = generateCVJobIds('cv1', cv1Data.length);
  const cv2JobIds = generateCVJobIds('cv2', cv2Data.length);
  const cv3JobIds = generateCVJobIds('cv3', cv3Data.length);
  const cv4JobIds = generateCVJobIds('cv4', cv4Data.length);
  const cv5JobIds = generateCVJobIds('cv5', cv5Data.length);
  
  // Generate keyword-based job IDs
  const keywordJobIds = generateKeywordJobIds(keywordData);
  
  // Generate location-based job IDs
  const locationJobIds = generateLocationJobIds(locationData);
  
  // Combine all job IDs
  const allJobIds = [
    ...cv1JobIds,
    ...cv2JobIds,
    ...cv3JobIds,
    ...cv4JobIds,
    ...cv5JobIds,
    ...keywordJobIds,
    ...locationJobIds,
    // Add some fallback general job IDs
    '1', '2', '3', '4', '5'
  ];

  console.log(`Generated static params for ${allJobIds.length} job IDs:`);
  console.log(`CV1: ${cv1JobIds.length} jobs (${cv1JobIds[0]} to ${cv1JobIds[cv1JobIds.length - 1]})`);
  console.log(`CV2: ${cv2JobIds.length} jobs (${cv2JobIds[0]} to ${cv2JobIds[cv2JobIds.length - 1]})`);
  console.log(`CV3: ${cv3JobIds.length} jobs (${cv3JobIds[0]} to ${cv3JobIds[cv3JobIds.length - 1]})`);
  console.log(`CV4: ${cv4JobIds.length} jobs (${cv4JobIds[0]} to ${cv4JobIds[cv4JobIds.length - 1]})`);
  console.log(`CV5: ${cv5JobIds.length} jobs (${cv5JobIds[0]} to ${cv5JobIds[cv5JobIds.length - 1]})`);

  // Generate params for both languages
  const params = [];
  const languages = ['en', 'de'];
  
  for (const lang of languages) {
    for (const id of allJobIds) {
      params.push({ lang, id });
    }
  }

  return params;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang as 'en' | 'de');


  return (
    <div className="min-h-screen bg-background">
      <InternalNavbar />
      
      <Container size="xl" className="pt-7">
        <Suspense fallback={
          <div className="flex gap-8">
            {/* Loading skeleton */}
            <div className="w-[296px] flex-shrink-0">
              <div className="w-full h-full bg-white border border-border rounded-[4px] p-4 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <div className="w-full max-w-[952px] h-[192px] bg-white border border-border rounded-3xl p-6">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          </div>
        }>
          <JobDetailsPageClient lang={lang} id={id} dict={dict.jobDetailsPage} />  
        </Suspense>
      </Container>
    </div>
  );
} 