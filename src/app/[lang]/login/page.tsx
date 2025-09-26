import React from 'react';
import { LoginForm } from '@/features/auth/LoginForm';
import { getDictionary } from '../dictionaries';

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

export default async function LoginPage({ params }: PageProps) {
  const awaitedParams = await params;
  const dict = await getDictionary(awaitedParams.lang);

  return (
    <div className="flex min-h-screen bg-background-muted">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <LoginForm dict={dict.login} />
      </div>
    </div>
  );
} 