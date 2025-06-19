import api from '../axios';
import type { SearchParams, SearchResponse, JobListing } from '@/features/search/types';
import { getAllProviderLogos, getCompanyLogoVariants } from '../config/logos';

// API Endpoints Configuration
// TODO: Switch to GET /api/search once backend is updated
// Expected format: /api/{locale}/search?q={keyword}&location={location}&limit={limit}&page={page}
// Supported locales: 'en', 'de'
const ENDPOINTS = {
  // Current placeholder endpoint (POST-based)
  SEARCH_JOBS: '/api/v1/jobs/search',
  
  // Future endpoint format (GET-based with query parameters)
  // SEARCH_JOBS: (locale: string = 'en') => `/api/${locale}/search`,
  
  // CV endpoints
  PARSE_CV: (locale: string = 'en') => `/api/${locale}/parse-cv`,
  SEARCH_WITH_CV: (locale: string = 'en') => `/api/${locale}/search-cv`,
  
  GET_JOB: (id: string) => `/api/v1/jobs/${id}`,
  FAVORITE_JOB: (id: string) => `/api/v1/jobs/${id}/favorite`,
  GET_FILTERS: '/api/v1/jobs/filters',
} as const;

/**
 * Search endpoint URL with locale support (for future GET implementation)
 * @param locale - Language code ('en', 'de')
 * @param params - Search parameters for query string
 * @returns Complete endpoint URL with query parameters
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildSearchEndpoint(locale: string = 'en', params: SearchParams): string {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${locale}/search`;
  const searchParams = new URLSearchParams();
  
  if (params.keyword) searchParams.set('q', params.keyword);
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.filters.experienceLevel && Array.isArray(params.filters.experienceLevel) && params.filters.experienceLevel.length > 0) {
    searchParams.set('experienceLevel', params.filters.experienceLevel.join(','));
  } else if (typeof params.filters.experienceLevel === 'string') {
    searchParams.set('experienceLevel', params.filters.experienceLevel);
  }
  if (params.filters.industry && Array.isArray(params.filters.industry) && params.filters.industry.length > 0) {
    searchParams.set('industry', params.filters.industry.join(','));
  } else if (typeof params.filters.industry === 'string') {
    searchParams.set('industry', params.filters.industry);
  }
  if (params.filters.onlyPaidAds) searchParams.set('onlyPaidAds', 'true');
  if (params.filters.excludeHeadhunters) searchParams.set('excludeHeadhunters', 'true');
  if (params.filters.excludeMyClients) searchParams.set('excludeMyClients', 'true');
  
  return `${baseUrl}?${searchParams.toString()}`;
}

// Mock data for development - will be replaced with real API calls
const generateMockJobs = (): JobListing[] => {
  const jobTitles = [
    'Elektroniker (m/w/d) für Energie- und Gebäudetechnik',
    'Software Engineer (m/w/d)',
    'Marketing Manager (m/w/d)',
    'Data Scientist (m/w/d)',
    'Product Manager (m/w/d)',
    'UX/UI Designer (m/w/d)',
    'DevOps Engineer (m/w/d)',
    'Business Analyst (m/w/d)',
    'Project Manager (m/w/d)',
    'Sales Representative (m/w/d)',
    'HR Specialist (m/w/d)',
    'Financial Analyst (m/w/d)',
    'Quality Assurance Engineer (m/w/d)',
    'Technical Writer (m/w/d)',
    'Customer Success Manager (m/w/d)'
  ];

  const companies = [
    'Berliner Elektrotechnik Solutions GmbH',
    'TechCorp Berlin',
    'Innovation Labs GmbH',
    'Digital Solutions AG',
    'Future Tech Berlin',
    'Smart Systems GmbH',
    'Advanced Technologies',
    'Berlin Software House',
    'NextGen Solutions',
    'Modern Tech GmbH'
  ];

  // Company logos mapping - using centralized configuration
  const companyLogos = getCompanyLogoVariants();

  // Provider logos for "Listed On" section - using centralized configuration
  const providerLogos = getAllProviderLogos();

  const locations = ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart'];
  const urgencyLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];

  const jobs: JobListing[] = [];

  for (let i = 1; i <= 55; i++) {
    const randomTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const companyIndex = Math.floor(Math.random() * companies.length);
    const randomCompany = companies[companyIndex];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomUrgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
    const randomSalary = Math.floor(Math.random() * 80000) + 30000;
    const randomMatch = Math.floor(Math.random() * 40) + 60;
    const randomDaysAgo = Math.floor(Math.random() * 30) + 1;
    
    const postedDate = new Date();
    postedDate.setDate(postedDate.getDate() - randomDaysAgo);

    // Generate random provider logos for "Listed On" (1-4 providers)
    const numProviders = Math.floor(Math.random() * 4) + 1;
    const shuffledProviders = [...providerLogos].sort(() => 0.5 - Math.random());
    const selectedProviders = shuffledProviders.slice(0, numProviders);

    // Generate Kununu reviews (70% chance of having reviews)
    const hasKununuReviews = Math.random() > 0.3;
    const kununuData = hasKununuReviews ? {
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Rating between 3.0 and 5.0
      reviews: Math.floor(Math.random() * 500) + 10 // Between 10 and 510 reviews
    } : undefined;

    // Generate headhunters count (60% chance of having headhunters)
    const hasHeadhunters = Math.random() > 0.4;
    const headhuntersCount = hasHeadhunters ? Math.floor(Math.random() * 8) + 1 : undefined; // 1-8 headhunters

    jobs.push({
      id: i.toString(),
      title: randomTitle,
      company: randomCompany,
      companyLogo: companyLogos[companyIndex], // Use corresponding logo or undefined
      contactPerson: {
        name: `Contact Person ${i}`,
        position: 'Recruiting Manager',
        phone: `+49 175444${String(i).padStart(4, '0')}`,
        email: `contact${i}@${randomCompany.toLowerCase().replace(/\s+/g, '')}.de`,
        avatar: `/avatars/contact-${i}.jpg`
      },
      location: randomLocation,
      salary: {
        amount: randomSalary,
        currency: '€'
      },
      postedDate: postedDate.toISOString(),
      matchPercentage: randomMatch,
      urgency: randomUrgency,
      isPaidAd: Math.random() > 0.5,
      isHeadhunter: Math.random() > 0.7,
      isMyClient: Math.random() > 0.8,
      kununu: kununuData,
      listedOn: selectedProviders,
      headhunters: headhuntersCount,
      externalSources: [
        { name: 'Indeed', logo: '/logos/providerlogos/indeed.svg', url: 'https://indeed.com' },
        { name: 'StepStone', logo: '/logos/providerlogos/stepstone.svg', url: 'https://stepstone.com' }
      ]
    });
  }

  return jobs;
};

const mockJobs = generateMockJobs();

export class SearchService {
  /**
   * Parse CV file and extract candidate information
   */
  static async parseCv(file: File, locale: string = 'en'): Promise<{ success: boolean; fileId?: string; candidateName?: string; error?: string }> {
    // Mock implementation for development
    if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate parsing failure for certain file types/names
      if (file.name.endsWith('.txt') || file.size === 0) {
        return { success: false, error: 'Invalid file format or empty file' };
      }
      
      // Extract candidate name from filename (mock)
      const candidateName = file.name.replace(/\.(pdf|doc|docx)$/i, '');
      const fileId = `cv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return { success: true, fileId, candidateName };
    }

    // Production API call
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post<{ success: boolean; fileId?: string; candidateName?: string; error?: string }>(
        ENDPOINTS.PARSE_CV(locale),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('CV parsing API error:', error);
      return { success: false, error: 'Failed to parse CV' };
    }
  }

  /**
   * Search for jobs based on parameters
   * Enhanced to support CV-based search with fileId
   */
  static async searchJobs(params: SearchParams & { fileId?: string | null }, locale: string = 'en'): Promise<SearchResponse> {
    // Use mock data in development or when no backend is available
    if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply filters to mock data
      const filteredJobs = mockJobs.filter(job => {
        if (params.filters.onlyPaidAds && !job.isPaidAd) return false;
        if (params.filters.excludeHeadhunters && job.isHeadhunter) return false;
        if (params.filters.excludeMyClients && job.isMyClient) return false;
        
        // Keyword search simulation
        if (params.keyword) {
          const keyword = params.keyword.toLowerCase();
          const searchableText = `${job.title} ${job.company} ${job.location}`.toLowerCase();
          if (!searchableText.includes(keyword)) return false;
        }
        
        return true;
      });

      // If CV is present, shuffle jobs to simulate CV-based ranking
      let sortedJobs = filteredJobs;
      if (params.fileId) {
        sortedJobs = [...filteredJobs].sort(() => Math.random() - 0.5);
      }

      // Calculate pagination
      const totalCount = sortedJobs.length;
      const totalPages = Math.ceil(totalCount / params.limit);
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      
      const paginatedJobs = sortedJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        totalCount,
        currentPage: params.page,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPreviousPage: params.page > 1
      };
    }

    // Production API call
    try {
      // If fileId is present, use CV search endpoint
      if (params.fileId) {
        const endpoint = ENDPOINTS.SEARCH_WITH_CV(locale);
        const response = await api.post<SearchResponse>(endpoint, {
          fileId: params.fileId,
          keyword: params.keyword,
          filters: params.filters,
          page: params.page,
          limit: params.limit,
        });
        return response.data;
      }
      
      // Otherwise use normal search
      const response = await api.post<SearchResponse>(ENDPOINTS.SEARCH_JOBS, params);
      return response.data;
    } catch (error) {
      console.error('Search API error:', error);
      throw new Error('Failed to search jobs');
    }
  }

  /**
   * Get a specific job by ID
   */
  static async getJob(id: string): Promise<JobListing> {
    if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
      const job = mockJobs.find(j => j.id === id);
      if (!job) throw new Error('Job not found');
      return job;
    }

    try {
      const response = await api.get<JobListing>(ENDPOINTS.GET_JOB(id));
      return response.data;
    } catch (error) {
      console.error('Get job API error:', error);
      throw new Error('Failed to get job');
    }
  }

  /**
   * Toggle favorite status for a job
   */
  static async toggleFavorite(id: string, isFavorited: boolean): Promise<void> {
    if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_API_URL) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    try {
      await api.post(ENDPOINTS.FAVORITE_JOB(id), { isFavorited });
    } catch (error) {
      console.error('Toggle favorite API error:', error);
      throw new Error('Failed to update favorite status');
    }
  }
}

export default SearchService; 