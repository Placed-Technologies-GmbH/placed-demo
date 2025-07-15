/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JobListing } from '@/features/search/types';
import type { JobDetails, AISummary, SalesPitch, ContactPerson, CompanyDetails } from '@/features/jobdetails/types';

// Import CV-specific data
import cv1SalesData from './cv1_data.json';
import cv2ElectricianData from './cv2_electrician_data.json';
import cv3TechData from './cv3_tech_data.json';
import cv4FinanceData from './cv4_finance_data.json';
import cv5HrData from './cv5_hr_data.json';

// Import keyword and location data
import keywordSearchData from './keyword_search_data.json';
import locationSearchData from './location_search_data.json';

// Define proper types for the JSON data structure
interface MockJobData {
  id: string;
  title: string;
  company: string | CompanyDetails; // Can be either string or object in JSON
  location: string;
  postedDate: string;
  matchPercentage: number;
  urgency: 'low' | 'medium' | 'high';
  isPaidAd: boolean;
  isHeadhunter: boolean;
  isMyClient: boolean;
  isFavorited: boolean;
  companyLogo?: string;
  contactPerson: ContactPerson;
  salary: {
    amount: number;
    currency: string;
  };
  kununu?: {
    rating: number;
    reviews: number;
  };
  listedOn: Array<{ src: string; alt: string }>;
  headhunters: number;
  externalSources: Array<{
    name: string;
    logo: string;
    url: string;
  }>;
  responsibilities: string[];
  yourProfile: string[];
  benefits: string[];
  fullDescription: string;
  aiSummary?: AISummary;
  salesPitch?: SalesPitch;
}

// Type the imported data - using any for now due to complex nested structure differences
const cv1SalesTyped = cv1SalesData as any[];
const cv2ElectricianTyped = cv2ElectricianData as any[];
const cv3TechTyped = cv3TechData as any[];
const cv4FinanceTyped = cv4FinanceData as any[];
const cv5HrTyped = cv5HrData as any[];

// Type the keyword and location data
interface KeywordSearchData {
  [key: string]: any[];
}

interface LocationSearchData {
  [key: string]: any[];
}

const keywordSearchTyped = keywordSearchData as KeywordSearchData;
const locationSearchTyped = locationSearchData as LocationSearchData;

// CV File mapping - maps filename to specific dataset
const CV_FILE_MAPPING = {
  'CV 1 - Sales.pdf': 'cv1_sales',
  'CV 2 - Electrician.pdf': 'cv2_electrician', 
  'CV 3 - Tech.pdf': 'cv3_tech',
  'CV 4 - Finance.pdf': 'cv4_finance',
  'CV 5 - HR.pdf': 'cv5_hr',
} as const;

// Keyword-based search mapping
const KEYWORD_MAPPING = {
  'software engineer': 'software_engineer',
  'marketing manager': 'marketing_manager',
  'sales manager': 'sales_manager',
  'financial analyst': 'financial_analyst',
  'hr specialist': 'hr_specialist',
} as const;

// Location-based data variations
const LOCATION_MAPPING = {
  'berlin': 'berlin',
  'munich': 'munich', 
  'hamburg': 'hamburg',
  'frankfurt': 'frankfurt',
  'cologne': 'cologne',
} as const;

export interface CVDataResponse {
  jobs: JobListing[];
  cvSpecific: boolean;
  candidateName?: string;
  fileId: string;
}

export class MockDataManager {
  private static instance: MockDataManager;
  private cvDataCache: Map<string, JobListing[]> = new Map();

  static getInstance(): MockDataManager {
    if (!MockDataManager.instance) {
      MockDataManager.instance = new MockDataManager();
    }
    return MockDataManager.instance;
  }

  /**
   * Parse CV file and return file ID and candidate name
   */
  async parseCVFile(file: File): Promise<{ success: boolean; fileId?: string; candidateName?: string; error?: string }> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if this is a recognized CV file
    const fileName = file.name;
    
    if (!(fileName in CV_FILE_MAPPING)) {
      return { 
        success: false, 
        error: `CV file "${fileName}" not recognized. Please use one of: ${Object.keys(CV_FILE_MAPPING).join(', ')}` 
      };
    }

    // Generate file ID and extract candidate name
    const cvType = CV_FILE_MAPPING[fileName as keyof typeof CV_FILE_MAPPING];
    const fileId = `${cvType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const candidateName = this.extractCandidateName(fileName);

    return { 
      success: true, 
      fileId, 
      candidateName 
    };
  }

  /**
   * Get job listings based on CV file ID
   */
  getCVSpecificJobs(fileId: string): JobListing[] {
    const cvType = this.extractCVTypeFromFileId(fileId);
    
    if (this.cvDataCache.has(cvType)) {
      return this.cvDataCache.get(cvType)!;
    }

    let jobs: JobListing[] = [];
    
    switch (cvType) {
      case 'cv1_sales':
        jobs = this.transformToJobListings(cv1SalesTyped);
        break;
      case 'cv2_electrician':
        jobs = this.transformToJobListings(cv2ElectricianTyped);
        break;
      case 'cv3_tech':
        jobs = this.transformToJobListings(cv3TechTyped);
        break;
      case 'cv4_finance':
        jobs = this.transformToJobListings(cv4FinanceTyped);
        break;
      case 'cv5_hr':
        jobs = this.transformToJobListings(cv5HrTyped);
        break;
      default:
        jobs = this.generateFallbackJobs(cvType);
    }

    this.cvDataCache.set(cvType, jobs);
    return jobs;
  }

  /**
   * Get job details for a specific job ID with CV context
   */
  getCVSpecificJobDetails(jobId: string, fileId?: string): JobDetails | null {
    if (!fileId) return null;
    
    const cvType = this.extractCVTypeFromFileId(fileId);
    const jobs = this.getCVSpecificJobs(fileId);
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) return null;

    // Find the raw data to get extended details
    let rawData: MockJobData | undefined = undefined;
    
    switch (cvType) {
      case 'cv1_sales':
        rawData = cv1SalesTyped.find((item) => item.id === jobId);
        break;
      case 'cv2_electrician':
        rawData = cv2ElectricianTyped.find((item) => item.id === jobId);
        break;
      case 'cv3_tech':
        rawData = cv3TechTyped.find((item) => item.id === jobId);
        break;
      case 'cv4_finance':
        rawData = cv4FinanceTyped.find((item) => item.id === jobId);
        break;
      case 'cv5_hr':
        rawData = cv5HrTyped.find((item) => item.id === jobId);
        break;
    }

    if (!rawData) return null;

    return this.transformToJobDetails(rawData, job);
  }

  /**
   * Get AI Summary for a specific job with CV context
   */
  getCVSpecificAISummary(jobId: string, fileId?: string): AISummary | null {
    if (!fileId) return null;
    
    const cvType = this.extractCVTypeFromFileId(fileId);
    let rawData: MockJobData | undefined = undefined;
    
    switch (cvType) {
      case 'cv1_sales':
        rawData = cv1SalesTyped.find((item) => item.id === jobId);
        break;
      case 'cv2_electrician':
        rawData = cv2ElectricianTyped.find((item) => item.id === jobId);
        break;
      case 'cv3_tech':
        rawData = cv3TechTyped.find((item) => item.id === jobId);
        break;
      case 'cv4_finance':
        rawData = cv4FinanceTyped.find((item) => item.id === jobId);
        break;
      case 'cv5_hr':
        rawData = cv5HrTyped.find((item) => item.id === jobId);
        break;
    }

    return rawData?.aiSummary || null;
  }

  /**
   * Get Sales Pitch for a specific job with CV context
   */
  getCVSpecificSalesPitch(jobId: string, fileId?: string): SalesPitch | null {
    if (!fileId) return null;
    
    const cvType = this.extractCVTypeFromFileId(fileId);
    let rawData: MockJobData | undefined = undefined;
    
    switch (cvType) {
      case 'cv1_sales':
        rawData = cv1SalesTyped.find((item) => item.id === jobId);
        break;
      case 'cv2_electrician':
        rawData = cv2ElectricianTyped.find((item) => item.id === jobId);
        break;
      case 'cv3_tech':
        rawData = cv3TechTyped.find((item) => item.id === jobId);
        break;
      case 'cv4_finance':
        rawData = cv4FinanceTyped.find((item) => item.id === jobId);
        break;
      case 'cv5_hr':
        rawData = cv5HrTyped.find((item) => item.id === jobId);
        break;
    }

    return rawData?.salesPitch || null;
  }

  /**
   * Get keyword-based job listings
   */
  getKeywordSpecificJobs(keyword: string, location?: string): JobListing[] {
    const keywordLower = keyword.toLowerCase();
    
    // Check for exact keyword match
    for (const [searchTerm, dataKey] of Object.entries(KEYWORD_MAPPING)) {
      if (keywordLower.includes(searchTerm)) {
        const keywordData = keywordSearchTyped[dataKey];
        if (keywordData && Array.isArray(keywordData)) {
          let jobs = this.transformToJobListings(keywordData);
          
          // Filter by location if provided
          if (location) {
            const locationLower = location.toLowerCase();
            jobs = jobs.filter(job => 
              job.location.toLowerCase().includes(locationLower)
            );
          }
          
          return jobs;
        }
      }
    }
    
    return [];
  }

  /**
   * Get location-based job listings
   */
  getLocationSpecificJobs(location: string): JobListing[] {
    const locationLower = location.toLowerCase();
    
    // Check for location match
    for (const [cityName, dataKey] of Object.entries(LOCATION_MAPPING)) {
      if (locationLower.includes(cityName)) {
        const locationData = locationSearchTyped[dataKey];
        if (locationData && Array.isArray(locationData)) {
          return this.transformToJobListings(locationData);
        }
      }
    }
    
    return [];
  }

  /**
   * Get job details for keyword-specific job
   */
  getKeywordSpecificJobDetails(jobId: string): JobDetails | null {
    // Search through all keyword data
    for (const [, dataKey] of Object.entries(KEYWORD_MAPPING)) {
      const keywordData = keywordSearchTyped[dataKey];
      if (keywordData && Array.isArray(keywordData)) {
        const rawData = keywordData.find((item) => item.id === jobId);
        if (rawData) {
          const jobListing = this.transformToJobListings([rawData])[0];
          return this.transformToJobDetails(rawData, jobListing);
        }
      }
    }
    return null;
  }

  /**
   * Get job details for location-specific job
   */
  getLocationSpecificJobDetails(jobId: string): JobDetails | null {
    // Search through all location data
    for (const [, dataKey] of Object.entries(LOCATION_MAPPING)) {
      const locationData = locationSearchTyped[dataKey];
      if (locationData && Array.isArray(locationData)) {
        const rawData = locationData.find((item) => item.id === jobId);
        if (rawData) {
          const jobListing = this.transformToJobListings([rawData])[0];
          return this.transformToJobDetails(rawData, jobListing);
        }
      }
    }
    return null;
  }

  /**
   * Transform raw CV data to JobListing format
   */
  private transformToJobListings(rawData: any[]): JobListing[] {
    return rawData.map((item: any) => ({
      id: item.id,
      title: item.title,
      company: typeof item.company === 'string' ? item.company : item.company?.name || 'Unknown Company',
      contactPerson: item.contactPerson,
      location: item.location,
      salary: item.salary,
      postedDate: item.postedDate,
      matchPercentage: item.matchPercentage || 0,
      urgency: item.urgency,
      isPaidAd: item.isPaidAd,
      isHeadhunter: item.isHeadhunter,
      isMyClient: item.isMyClient,
      isFavorited: item.isFavorited,
      companyLogo: item.companyLogo,
      kununu: item.kununu,
      listedOn: item.listedOn,
      headhunters: item.headhunters,
      externalSources: item.externalSources,
      description: item.fullDescription
    }));
  }

  /**
   * Transform raw data to JobDetails format
   */
  private transformToJobDetails(rawData: any, jobListing: JobListing): JobDetails {
    // Check for companyDetails first (CV data structure), then company (other data structures)
    const companyData = rawData.companyDetails || rawData.company;
    
    const companyDetails = typeof companyData === 'object' && companyData ? companyData : {
      id: 'fallback-company',
      name: typeof rawData.company === 'string' ? rawData.company : 'Unknown Company',
      website: 'https://example.com',
      logo: undefined,
      kununu: {
        rating: 4.0,
        reviews: 10
      },
      contacts: [
        {
          id: 'fallback-contact',
          name: 'Contact Person',
          position: 'Recruiter',
          phone: '+49 30 123 456 78',
          email: 'contact@company.com',
          avatar: '/avatars/default.jpg'
        }
      ],
      relationshipStatus: 'none' as const
    };
    
    return {
      ...jobListing,
      responsibilities: rawData.responsibilities,
      yourProfile: rawData.yourProfile,
      benefits: rawData.benefits,
      fullDescription: rawData.fullDescription,
      company: companyDetails,
      aiSummary: rawData.aiSummary,
      salesPitch: rawData.salesPitch
    };
  }

  /**
   * Extract CV type from file ID
   */
  private extractCVTypeFromFileId(fileId: string): string {
    return fileId.split('-')[0] || '';
  }

  /**
   * Extract candidate name from filename
   */
  private extractCandidateName(fileName: string): string {
    const mapping: Record<string, string> = {
      'CV 1 - Sales.pdf': 'Sarah Mueller',
      'CV 2 - Marketing.pdf': 'Michael Weber',
      'CV 3 - Tech.pdf': 'Anna Schmidt',
      'CV 4 - Finance.pdf': 'Thomas Bauer',
      'CV 5 - HR.pdf': 'Lisa Wagner',
    };
    
    return mapping[fileName] || fileName.replace(/\.(pdf|doc|docx)$/i, '');
  }

  /**
   * Generate fallback jobs for CV types without data yet
   */
  private generateFallbackJobs(cvType: string): JobListing[] {
    const templates = {
      cv2_electrician: {
        title: 'Elektriker (m/w/d)',
        company: 'Elektroanlagen GmbH',
        industry: 'Elektro'
      },
      cv3_tech: {
        title: 'Software Engineer (m/w/d)',
        company: 'Tech Innovations AG',
        industry: 'Technology'
      },
      cv4_finance: {
        title: 'Financial Analyst (m/w/d)',
        company: 'Finance Partners GmbH',
        industry: 'Finance'
      },
      cv5_hr: {
        title: 'HR Specialist (m/w/d)',
        company: 'Human Resources Solutions',
        industry: 'Human Resources'
      }
    };

    const template = templates[cvType as keyof typeof templates];
    if (!template) return [];

    // Generate 3-5 jobs based on template
    const jobs: JobListing[] = [];
    const numJobs = Math.floor(Math.random() * 3) + 3; // 3-5 jobs

    for (let i = 1; i <= numJobs; i++) {
      jobs.push({
        id: `${cvType}_job_${i}`,
        title: template.title,
        company: `${template.company} ${i}`,
        location: 'Berlin, Germany',
        salary: {
          amount: Math.floor(Math.random() * 40000) + 60000,
          currency: '€'
        },
        postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        matchPercentage: Math.floor(Math.random() * 30) + 70,
        urgency: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        isPaidAd: Math.random() > 0.5,
        isHeadhunter: Math.random() > 0.7,
        isMyClient: Math.random() > 0.6,
        isFavorited: false,
        contactPerson: {
          name: 'Anna Mustermann',
          position: 'Recruiting Manager',
          phone: '+49 30 123 456 78',
          email: 'anna@example.com',
          avatar: '/avatars/contact-1.jpg'
        },
        externalSources: [
          { name: 'StepStone', logo: '/logos/providerlogos/stepstone.svg', url: 'https://stepstone.com' },
          { name: 'Indeed', logo: '/logos/providerlogos/indeed.svg', url: 'https://indeed.com' }
        ]
      });
    }

    return jobs;
  }
}

export default MockDataManager; 