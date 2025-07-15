import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { getDictionary } from '../dictionaries';

// Generate static params for all supported languages
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'de' },
  ];
}

interface DashboardProps {
  params: Promise<{ lang: string }>;
}

export default async function Dashboard({ params }: DashboardProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'de');
  
  return <DashboardPage dict={dict} />;
} 