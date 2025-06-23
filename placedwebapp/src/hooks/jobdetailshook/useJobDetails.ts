'use client';

import { useState, useEffect } from 'react';
import type { JobDetails } from '@/features/jobdetails/types';
import MockDataManager from '@/lib/data/mockDataManager';
import { useSearchParams } from 'next/navigation';

// Mock data for development
const mockJobDetails: JobDetails = {
  id: '1',
  title: 'Elektroniker (m/w/d) für Energie- und Gebäudetechnik',
  location: 'Berlin',
  salary: {
    amount: 23000,
    currency: '€'
  },
  postedDate: '2024-01-15T10:00:00Z',
  matchPercentage: 78,
  urgency: 'medium',
  isPaidAd: false,
  isHeadhunter: false,
  isMyClient: true,
  isFavorited: false,
  headhunters: 3,
  externalSources: [
    {
      name: 'StepStone',
      logo: '/logos/providerlogos/stepstone.svg',
      url: 'https://stepstone.de'
    },
    {
      name: 'Indeed',
      logo: '/logos/providerlogos/indeed.svg',
      url: 'https://indeed.de'
    },
    {
      name: 'Monster',
      logo: '/logos/providerlogos/monster.svg',
      url: 'https://monster.de'
    },
    {
      name: 'LinkedIn',
      logo: '/logos/providerlogos/linkedin.svg',
      url: 'https://linkedin.com'
    }
  ],
  listedOn: [
    { src: '/logos/providerlogos/stepstone.svg', alt: 'StepStone' },
    { src: '/logos/providerlogos/indeed.svg', alt: 'Indeed' },
    { src: '/logos/providerlogos/monster.svg', alt: 'Monster' },
    { src: '/logos/providerlogos/linkedin.svg', alt: 'LinkedIn' }
  ],
  company: {
    id: 'techvisio-1',
    name: 'TechVisio GmbH',
    website: 'https://www.techvisio-berlin.de',
    logo: '/logos/techvisio-logo.svg',
    kununu: {
      rating: 4.5,
      reviews: 23
    },
    contacts: [
      {
        id: 'contact-1',
        name: 'Anna Müller',
        position: 'Talent Acquisition',
        phone: '+49 30 123 456 78',
        email: 'anna@techvisio.de',
        avatar: '/avatars/anna-mueller.jpg'
      },
      {
        id: 'contact-2',
        name: 'Ryan Reinhart',
        position: 'Team Lead Marketing',
        phone: '+49 30 346 755 46',
        email: 'ryan@techvisio.de',
        avatar: '/avatars/ryan-reinhart.jpg'
      }
    ],
    relationshipStatus: 'none'
  },
  contactPerson: {
    name: 'Anna Müller',
    position: 'Talent Acquisition',
    phone: '+49 30 123 456 78',
    email: 'anna@techvisio.de',
    avatar: '/avatars/anna-mueller.jpg'
  },
  responsibilities: [
    'Ihre zertifizierte Ausbildung im Bereich Energie- und Gebäudetechnik sowie OT-Deutschkenntnisse decken sämtliche Kernanforderungen dieser Position ab.',
    'Mit Ihrer selbstständigen Arbeitsweise und nachgewiesenen Erfahrung in Fehlerdiagnose und Wartung steigern Sie die Effizienz unserer Betriebsabläufe unmittelbar.',
    'Einsatz an einem festen Standort (Spandau oder Treptow) für unseren Kunden',
    'Gewährleistung des reibungslosen Zustands der elektrischen Anlagen und Durchführung von Elektroinstallationen',
    'Störungsbeseitigung und Wartung von Elektroinstallationen sowie Betriebstechnik',
    'Steuerung und Begleitung von Nachunternehmer und Kunden',
    'Inspektion, Inbetriebnahme und Fehlersuche der Anlagen'
  ],
  yourProfile: [
    'Technische – in Deutschland anerkannte – Ausbildung im elektrotechnischen Bereich, z. B. als Elektroniker / Elektriker / Energieanlagenelektroniker / Fachrichtung Betriebstechnik / Energie- und Gebäudetechnik / Automatisierungs- und Systemtechnik / Elektroninstallateur oder vergleichbare Qualifikation – Berufseinsteiger sind herzlich willkommen!',
    'Kundenorientierter, engagierter Mitarbeiter für den Teamfähigkeit und Zuverlässigkeit selbstverständlich ist',
    'Idealerweise mit erster Berufserfahrung in der Wartung und Instandhaltung von elektrotechnischen Anlagen oder im technischen Facility Management / TGA',
    'Serviceorientiertes Auftreten, verantwortungsbewusste und selbstständige Arbeitsweise',
    'Deutschkenntnisse C1-Level notwendig',
    'Führerschein Klasse B wünschenswert'
  ],
  benefits: [
    'Bis zu 35 Urlaubstage',
    'Überstundenzuschlag',
    'Flexible Arbeitszeiten zur Vereinbarkeit von Familie, Freunde und Beruf',
    'Arbeitstag 13. Monatseinkommen',
    'Bezahlung nach Haustarif',
    'Mitarbeiter-Aktienbetelligungsprogramm (Shareyou)',
    'Firmenhandy, PBA & professionelles Werkzeug',
    'Unbefristete und sichere Anstellung',
    'SPIE Akademie / individuelle, fachliche und persönliche Weiterbildung und Entwicklung'
  ],
  fullDescription: 'Als führender Anbieter von Multi-Technischen Dienstleistungen in den Bereichen Energie und Kommunikation trägt SPIE zur Beschleunigung der Energiewende und der digitalen Transformation bei. Die 50.000 Mitarbeiterinnen und Mitarbeiter von SPIE sind in allen Bereichen der elektrischen, mechanischen, HVAC- und Multi-Technischen Installationen sowie in den Bereichen Energie und Kommunikation tätig.'
};

interface UseJobDetailsReturn {
  data: JobDetails | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobDetails(jobId: string): UseJobDetailsReturn {
  const [data, setData] = useState<JobDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const fetchJobDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await JobDetailsService.getJobDetails(jobId);
      // setData(response.data);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockDataManager = MockDataManager.getInstance();
      
      // Check for CV context in URL search params
      const fileId = searchParams.get('fileId');
      
      // Try to get CV-specific job details first
      if (fileId) {
        const cvJobDetails = mockDataManager.getCVSpecificJobDetails(jobId, fileId);
        if (cvJobDetails) {
          console.log(`Found CV-specific job details for jobId: ${jobId}, fileId: ${fileId}`);
          setData(cvJobDetails);
          return;
        }
      }

      // Check if this is a CV-specific job ID (fallback method)
      if (jobId.startsWith('cv1_') || jobId.startsWith('cv2_') || jobId.startsWith('cv3_') || jobId.startsWith('cv4_') || jobId.startsWith('cv5_')) {
        const cvType = jobId.split('_')[0];
        const fallbackFileId = `${cvType}_sales-${Date.now()}-mock`;
        const cvJobDetails = mockDataManager.getCVSpecificJobDetails(jobId, fallbackFileId);
        if (cvJobDetails) {
          console.log(`Found CV-specific job details using fallback method for jobId: ${jobId}`);
          setData(cvJobDetails);
          return;
        }
      }

      // Check if this is a keyword-specific job ID
      if (jobId.startsWith('keyword_')) {
        const keywordJobDetails = mockDataManager.getKeywordSpecificJobDetails(jobId);
        if (keywordJobDetails) {
          console.log(`Found keyword-specific job details for jobId: ${jobId}`);
          setData(keywordJobDetails);
          return;
        }
      }

      // Check if this is a location-specific job ID
      if (jobId.startsWith('location_')) {
        const locationJobDetails = mockDataManager.getLocationSpecificJobDetails(jobId);
        if (locationJobDetails) {
          console.log(`Found location-specific job details for jobId: ${jobId}`);
          setData(locationJobDetails);
          return;
        }
      }
      
      // Fallback to general mock data
      console.log(`Using general mock data for jobId: ${jobId}`);
      setData(mockJobDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job details');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    data,
    isLoading,
    error,
    refetch: fetchJobDetails
  };
}

// API Service placeholder for easy backend integration
export class JobDetailsService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  static async getJobDetails(jobId: string): Promise<{ data: JobDetails }> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    return response.json();
  }

  static async toggleFavorite(jobId: string, isFavorited: boolean): Promise<void> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isFavorited }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle favorite');
    }
  }

  static async updateCompanyRelationship(
    companyId: string, 
    relationshipStatus: 'existing_client' | 'follow' | 'blacklist' | 'none'
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/companies/${companyId}/relationship`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ relationshipStatus }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update company relationship');
    }
  }
} 