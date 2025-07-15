'use client';

import { useState } from 'react';
import type { AISummary } from '@/features/jobdetails/types';
import MockDataManager from '@/lib/data/mockDataManager';
import { useSearchParams } from 'next/navigation';

// Mock AI summary data
const mockAISummary: AISummary = {
  id: 'ai-summary-1',
  placedScore: 78,
  profileMatch: 87,
  urgencyScore: 62,
  whatsGood: [
    'Ihre zertifizierte Ausbildung im Bereich Energie- und Gebäudetechnik sowie OT-Deutschkenntnisse decken sämtliche Kernanforderungen dieser Position ab.',
    'Mit Ihrer selbstständigen Arbeitsweise und nachgewiesenen Erfahrung in Fehlerdiagnose und Wartung steigern Sie die Effizienz unserer Betriebsabläufe unmittelbar.',
    'Ihre Expertise in der Instandhaltung von Produktionsanlagen und Maschinen passt perfekt zu unseren Anforderungen in der Automobilindustrie.',
    'Die Bereitschaft zur Schichtarbeit und Ihre Flexibilität bei Arbeitszeiten entsprechen genau unseren operativen Bedürfnissen.',
    'Ihre Kenntnisse in der präventiven Wartung und Störungsbehebung sind essentiell für die Aufrechterhaltung unserer Produktionskapazitäten.',
    'Die Erfahrung mit hydraulischen und pneumatischen Systemen ist ein großer Vorteil für unsere komplexen Fertigungslinien.'
  ],
  whatsBad: [
    'Begrenzte Erfahrung mit modernsten Automatisierungstechnologien könnte anfangs eine Herausforderung darstellen.',
    'Keine dokumentierte Erfahrung mit Industrie 4.0 Konzepten, die zunehmend wichtiger werden.'
  ],
  whatsMissing: [
    'Spezifische Erfahrung mit Siemens S7-Steuerungen wäre von Vorteil, kann aber durch interne Schulungen erworben werden.',
    'Kenntnisse in der Roboterprogrammierung (KUKA/ABB) sind nicht vorhanden, aber für zukünftige Projekte wünschenswert.',
    'SAP PM-Kenntnisse für die Wartungsplanung fehlen, können jedoch schnell erlernt werden.',
    'Schweißkenntnisse (MAG/WIG) sind nicht dokumentiert, könnten aber für Reparaturarbeiten nützlich sein.',
    'Lean Manufacturing Prinzipien sind nicht explizit erwähnt, wären aber für Prozessoptimierung hilfreich.'
  ],
  generatedAt: new Date().toISOString()
};


interface UseAISummaryReturn {
  generateAISummary: () => Promise<AISummary>;
  isGenerating: boolean;
  error: string | null;
}

export function useAISummary(jobId: string): UseAISummaryReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const generateAISummary = async (): Promise<AISummary> => {
    setIsGenerating(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await AISummaryService.generateSummary(jobId);
      // return response.data;
      
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDataManager = MockDataManager.getInstance();
      
      // Check for CV context in URL search params
      const fileId = searchParams.get('fileId');
      
      // Try to get CV-specific AI summary first
      if (fileId) {
        const cvAISummary = mockDataManager.getCVSpecificAISummary(jobId, fileId);
        if (cvAISummary) {
          console.log(`Found CV-specific AI summary for jobId: ${jobId}, fileId: ${fileId}`);
          return {
            ...cvAISummary,
            generatedAt: new Date().toISOString()
          };
        }
      }

      // Check if this is a CV-specific job ID (fallback method)
      if (jobId.startsWith('cv1_') || jobId.startsWith('cv2_') || jobId.startsWith('cv3_') || jobId.startsWith('cv4_') || jobId.startsWith('cv5_')) {
        const cvType = jobId.split('_')[0];
        const fallbackFileId = `${cvType}_sales-${Date.now()}-mock`;
        const cvAISummary = mockDataManager.getCVSpecificAISummary(jobId, fallbackFileId);
        if (cvAISummary) {
          console.log(`Found CV-specific AI summary using fallback method for jobId: ${jobId}`);
          return {
            ...cvAISummary,
            generatedAt: new Date().toISOString()
          };
        }
      }

      // Check if this is a keyword-specific job ID
      if (jobId.startsWith('keyword_')) {
        const keywordJobDetails = mockDataManager.getKeywordSpecificJobDetails(jobId);
        if (keywordJobDetails && keywordJobDetails.aiSummary) {
          console.log(`Found keyword-specific AI summary for jobId: ${jobId}`);
          return {
            ...keywordJobDetails.aiSummary,
            generatedAt: new Date().toISOString()
          };
        }
      }

      // Check if this is a location-specific job ID
      if (jobId.startsWith('location_')) {
        const locationJobDetails = mockDataManager.getLocationSpecificJobDetails(jobId);
        if (locationJobDetails && locationJobDetails.aiSummary) {
          console.log(`Found location-specific AI summary for jobId: ${jobId}`);
          return {
            ...locationJobDetails.aiSummary,
            generatedAt: new Date().toISOString()
          };
        }
      }
      
      // Fallback to general mock AI summary
      console.log(`Using general mock AI summary for jobId: ${jobId}`);
      return {
        ...mockAISummary,
        generatedAt: new Date().toISOString()
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate AI summary';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAISummary,
    isGenerating,
    error
  };
}

// AI Summary Service placeholder for easy backend integration
export class AISummaryService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  static async generateSummary(jobId: string): Promise<{ data: AISummary }> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/ai-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate AI summary');
    }
    
    return response.json();
  }

  static async getSummary(jobId: string): Promise<{ data: AISummary | null }> {
    const response = await fetch(`${this.baseUrl}/jobs/${jobId}/ai-summary`);
    
    if (response.status === 404) {
      return { data: null };
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch AI summary');
    }
    
    return response.json();
  }
} 