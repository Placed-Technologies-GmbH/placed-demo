import { Suspense } from 'react';
import { getDictionary } from '../dictionaries';
import { SearchResultsPage } from '@/features/search/SearchResultsPage';

// Generate static params for all supported languages
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'de' },
  ];
}

interface SearchPageProps {
  params: Promise<{ lang: string }>;
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'de');

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <SearchResultsPage dict={dict.searchPage} commonDict={dict} />
      </Suspense>
    </main>
  );
} 