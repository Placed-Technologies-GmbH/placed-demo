'use client';

import { useState } from 'react';
import type { AISummary } from '@/features/jobdetails/types';

// Mock AI summary data
const mockAISummary: AISummary = {
  id: 'ai-summary-1',
  placedScore: 78,
  profileMatch: 87,
  urgencyScore: 62,
  whyFits: [
    'Ihre zertifizierte Ausbildung im Bereich Energie- und Gebäudetechnik sowie OT-Deutschkenntnisse decken sämtliche Kernanforderungen dieser Position ab.',
    'Mit Ihrer selbstständigen Arbeitsweise und nachgewiesenen Erfahrung in Fehlerdiagnose und Wartung steigern Sie die Effizienz unserer Betriebsabläufe unmittelbar.',
    'Ihre Expertise in der Instandhaltung von Produktionsanlagen und Maschinen passt perfekt zu unseren Anforderungen in der Automobilindustrie.',
    'Die Bereitschaft zur Schichtarbeit und Ihre Flexibilität bei Arbeitszeiten entsprechen genau unseren operativen Bedürfnissen.',
    'Ihre Kenntnisse in der präventiven Wartung und Störungsbehebung sind essentiell für die Aufrechterhaltung unserer Produktionskapazitäten.',
    'Die Erfahrung mit hydraulischen und pneumatischen Systemen ist ein großer Vorteil für unsere komplexen Fertigungslinien.'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useAISummary(jobId: string): UseAISummaryReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAISummary = async (): Promise<AISummary> => {
    setIsGenerating(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await AISummaryService.generateSummary(jobId);
      // return response.data;
      
      // Note: jobId will be used in the actual API call above

      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock data for now
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