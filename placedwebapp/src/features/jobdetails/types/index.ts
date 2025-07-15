import type { JobListing } from '../../search/types';

export interface ContactPerson {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface CompanyDetails {
  id: string;
  name: string;
  website: string;
  logo?: string;
  kununu: {
    rating: number;
    reviews: number;
  };
  contacts: ContactPerson[];
  relationshipStatus: 'existing_client' | 'follow' | 'blacklist' | 'none';
}

export interface AISummary {
  id: string;
  placedScore: number;
  profileMatch: number;
  urgencyScore: number;
  whatsGood: string[];
  whatsBad: string[];
  whatsMissing: string[];
  generatedAt?: string;
}

export interface SalesPitch {
  id: string;
  placedScore?: number;
  profileMatch?: number;
  urgencyScore?: number;
  salesPitch: string[];
  conversationStarters?: string[];
  objectionHandlers?: string[];
  generatedAt?: string;
}

export interface JobDetails extends Omit<JobListing, 'company'> {
  aiSummary?: AISummary;
  salesPitch?: SalesPitch;
  responsibilities: string[];
  yourProfile: string[];
  benefits: string[];
  fullDescription: string;
  company: CompanyDetails;
}

export interface JobDetailsPageState {
  showAISummary: boolean;
  showSalesPitch: boolean;
  isGeneratingAI: boolean;
  isGeneratingSalesPitch: boolean;
  aiSummaryData?: AISummary;
  salesPitchData?: SalesPitch;
  isFavorited: boolean;
  companyRelationship: 'existing_client' | 'follow' | 'blacklist' | 'none';
}

export interface FavoriteJobBoard {
  jobId: string;
  companyName: string;
  location: string;
  jobsFromSameCompany: number;
  isFavorited: boolean;
  addedAt: string;
}

export interface CompanyRelationshipUpdate {
  companyId: string;
  relationshipStatus: 'existing_client' | 'follow' | 'blacklist' | 'none';
} 