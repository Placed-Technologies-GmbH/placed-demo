export interface JobListing {
  id: string;
  title: string;
  company: string;
  contactPerson: {
    name: string;
    position: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  location: string;
  salary: {
    amount: number;
    currency: string;
  };
  postedDate: string;
  matchPercentage?: number;
  urgency?: 'low' | 'medium' | 'high';
  isPaidAd: boolean;
  isHeadhunter: boolean;
  isMyClient: boolean;
  externalSources: ExternalSource[];
  description?: string;
  // UI/optional fields for frontend rendering
  isFavorited?: boolean;
  companyLogo?: string;
  kununu?: {
    rating: number;
    reviews: number;
  };
  listedOn?: { src: string; alt: string }[];
  headhunters?: number; // Number of headhunters recruiting for this position
}

export interface ExternalSource {
  name: string;
  logo: string;
  url: string;
}

export interface SearchFilters {
  experienceLevel?: string[];
  industry?: string[];
  onlyPaidAds: boolean;
  excludeHeadhunters: boolean;
  excludeMyClients: boolean;
  location?: string;
  locationRadius?: number;
  salaryMin?: number;
  salaryMax?: number;
  bestandskundenDropdown?: string;
  zeitraum?: string[];
  vertragsart?: string[];
  merklisten?: string[];
  berufsgruppe?: string[];
  ausbildung?: string[];
  placedScore?: string[];
}

export interface ExperienceLevel {
  id: string;
  label: string;
  checked: boolean;
}

export interface Industry {
  id: string;
  label: string;
  checked: boolean;
}

export interface SearchParams {
  keyword?: string;
  page: number;
  limit: number;
  filters: SearchFilters;
}

export interface SearchResponse {
  jobs: JobListing[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ContactDialogData {
  jobId: string;
  company: string;
  role: string;
  contactPerson: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
} 