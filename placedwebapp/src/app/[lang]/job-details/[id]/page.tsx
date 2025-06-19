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

// Required for static export - generates all possible static paths
export async function generateStaticParams() {
  // Define supported languages
  const languages = ['en', 'de'];
  
  // For demo purposes, generate static paths for job IDs 1-10
  // In a real app, you'd fetch this from your API/database
  const jobIds = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  
  // Generate all combinations of lang and id
  const params = [];
  for (const lang of languages) {
    for (const id of jobIds) {
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
      
      <Container size="xl" className="pt-[69px]">
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
          <JobDetailsPageClient lang={lang} id={id} dict={dict.jobDetailsPage}  />  
        </Suspense>
      </Container>
    </div>
  );
} 