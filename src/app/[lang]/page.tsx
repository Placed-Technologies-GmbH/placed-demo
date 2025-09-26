import React from 'react';
import Nav from '@/components/ui/Nav';
import SearchBar from '@/components/ui/searchbar';
import { Switch } from '@/components/ui/switch';
import { getDictionary } from './dictionaries';

// Generate static params for all supported languages
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'de' },
  ];
}

type PageProps = {
  params: Promise<{ lang: 'en' | 'de' }>
};

export default async function LandingPage({ params }: PageProps) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  return (
    <main className="flex flex-col min-h-screen bg-background-subtle">
      {/* Header - responsive padding */}
      <header className="w-full border-b border-border py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Nav dict={dict}/>
        </div>
      </header>
      
      {/* Hero Section - responsive text and spacing */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-4 py-6 md:py-8 lg:py-12 bg-background-primary">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-grotesk font-extrabold text-text-primary mb-3 md:mb-4">
            {dict.title}
          </h1>
          <p className="text-text-lg md:text-text-xl text-text-secondary mb-6 md:mb-8 max-w-full md:max-w-2xl mx-auto">
            {dict.description}
          </p>
          
          {/* Search Bar with Drop Area - responsive width */}
          <div className="relative w-full mx-auto rounded-lg shadow-md hover:shadow-lg">
            <SearchBar dict={{
              searchPlaceholder: dict.searchPlaceholder,
              search: dict.search,
              dropResume: dict.dropResume
            }} />
          </div>
          
          {/* Toggles - responsive layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 mb-4">
            <div className="flex items-center gap-2">
              <Switch id="onlyPaid" />
              <label htmlFor="onlyPaid" className="text-text-sm text-text-primary cursor-pointer">
                {dict.onlyPaid}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="excludeHeadhunter" />
              <label htmlFor="excludeHeadhunter" className="text-text-sm text-text-primary cursor-pointer">
                {dict.excludeHeadhunter}
              </label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 