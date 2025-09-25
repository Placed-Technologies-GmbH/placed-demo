'use client';

import { useState } from 'react';
import type { SalesPitch } from '@/features/jobdetails/types';
import { validateSalesPitch } from '@/features/jobdetails/utils';
import MockDataManager from '@/lib/data/mockDataManager';
import { useSearchParams } from 'next/navigation';

// Mock sales pitch data
const mockSalesPitch: SalesPitch = {
  id: 'sales-pitch-1',
  placedScore: 75,
  profileMatch: 87,
  urgencyScore: 62,
  salesPitch: [
    'Hallo [Kandidatenname], ich habe Ihr Profil auf LinkedIn gesehen und bin von Ihrer Erfahrung in der Energie- und Gebäudetechnik beeindruckt.',
    'Basierend auf Ihrer Expertise in der Instandhaltung von Produktionsanlagen haben wir eine spannende Position, die perfekt zu Ihrem Hintergrund passt.',
    'Ihre nachgewiesene Erfahrung in der Fehlerdiagnose und präventiven Wartung ist genau das, was unser Automobilklient sucht.',
    'Die Flexibilität bei Arbeitszeiten, die Sie mitbringen, ist ein großer Vorteil für diese Schichtarbeitsposition.',
    'Mit Ihrer selbstständigen Arbeitsweise würden Sie perfekt in unser dynamisches Produktionsteam passen.',
    'Falls Sie Bedenken wegen der Siemens S7-Steuerungen haben: Wir bieten umfassende Schulungen an, um Sie auf den neuesten Stand zu bringen.',
    'Bezüglich Roboterprogrammierung: Das ist kein Muss für den Start, aber wir würden gerne Ihre Expertise in diesem Bereich ausbauen.',
    'SAP PM-Kenntnisse sind nicht kritisch - unser Team wird Sie gerne in das System einführen.',
    'Schweißkenntnisse sind ein Plus, aber nicht erforderlich. Wir können bei Bedarf entsprechende Zertifizierungen arrangieren.',
    'Lean Manufacturing Prinzipien können Sie bei uns lernen - wir schätzen Ihre Bereitschaft zur kontinuierlichen Verbesserung.'
  ],
  generatedAt: new Date().toISOString()
};

interface UseSalesPitchReturn {
  generateSalesPitch: () => Promise<SalesPitch>;
  isGenerating: boolean;
  error: string | null;
}

export function useSalesPitch(jobId: string): UseSalesPitchReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const generateSalesPitch = async (): Promise<SalesPitch> => {
    setIsGenerating(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await SalesPitchService.generateSalesPitch(jobId);
      // return response.data;
      
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDataManager = MockDataManager.getInstance();
      
      // Check for CV context in URL search params
      const fileId = searchParams.get('fileId');
      
      // Try to get CV-specific sales pitch first
      if (fileId) {
        const cvSalesPitch = mockDataManager.getCVSpecificSalesPitch(jobId, fileId);
        if (cvSalesPitch) {
          console.log(`Found CV-specific sales pitch for jobId: ${jobId}, fileId: ${fileId}`);
          return validateSalesPitch({
            ...cvSalesPitch,
            generatedAt: new Date().toISOString()
          });
        }
      }

      // Check if this is a CV-specific job ID (fallback method)
      if (jobId.startsWith('cv1_') || jobId.startsWith('cv2_') || jobId.startsWith('cv3_') || jobId.startsWith('cv4_') || jobId.startsWith('cv5_')) {
        const cvType = jobId.split('_')[0];
        const fallbackFileId = `${cvType}_sales-${Date.now()}-mock`;
        const cvSalesPitch = mockDataManager.getCVSpecificSalesPitch(jobId, fallbackFileId);
        if (cvSalesPitch) {
          console.log(`Found CV-specific sales pitch using fallback method for jobId: ${jobId}`);
          return validateSalesPitch({
            ...cvSalesPitch,
            generatedAt: new Date().toISOString()
          });
        }
      }

      // Check if this is a keyword-specific job ID
      if (jobId.startsWith('keyword_')) {
        const keywordJobDetails = mockDataManager.getKeywordSpecificJobDetails(jobId);
        if (keywordJobDetails && keywordJobDetails.salesPitch) {
          console.log(`Found keyword-specific sales pitch for jobId: ${jobId}`);
          return validateSalesPitch({
            ...keywordJobDetails.salesPitch,
            generatedAt: new Date().toISOString()
          });
        }
      }

      // Check if this is a location-specific job ID
      if (jobId.startsWith('location_')) {
        const locationJobDetails = mockDataManager.getLocationSpecificJobDetails(jobId);
        if (locationJobDetails && locationJobDetails.salesPitch) {
          console.log(`Found location-specific sales pitch for jobId: ${jobId}`);
          return validateSalesPitch({
            ...locationJobDetails.salesPitch,
            generatedAt: new Date().toISOString()
          });
        }
      }
      
      // Fallback to general mock sales pitch
      console.log(`Using general mock sales pitch for jobId: ${jobId}`);
      return validateSalesPitch({
        ...mockSalesPitch,
        generatedAt: new Date().toISOString()
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate sales pitch';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateSalesPitch,
    isGenerating,
    error
  };
}

// Sales Pitch Service placeholder for easy backend integration
export class SalesPitchService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  static async generateSalesPitch(jobId: string): Promise<{ data: SalesPitch }> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/sales-pitch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate sales pitch');
    }
    
    return response.json();
  }

  static async getSalesPitch(jobId: string): Promise<{ data: SalesPitch | null }> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/sales-pitch`);
    
    if (response.status === 404) {
      return { data: null };
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales pitch');
    }
    
    return response.json();
  }
} 