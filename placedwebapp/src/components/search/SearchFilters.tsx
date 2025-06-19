'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SearchFilters as SearchFiltersType } from '@/features/search/types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  dict: {
    experienceLevel: string;
    industry: string;
    filters: string;
    toggles: {
      onlyPaidAds: string;
      excludeHeadhunters: string;
      excludeMyClients: string;
    };
    experienceOptions?: {
      [key: string]: string;
    };
    industryOptions?: {
      [key: string]: string;
    };
  };
}

export function SearchFilters({ filters, onFiltersChange, dict }: SearchFiltersProps) {
  // Collapsible states
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  // Handler functions
  const handleExperienceChange = (experienceId: string, checked: boolean) => {
    const current = Array.isArray(filters.experienceLevel) ? filters.experienceLevel : [];
    if (checked) {
      if (!current.includes(experienceId)) {
        onFiltersChange({ experienceLevel: [...current, experienceId] });
      }
    } else {
      onFiltersChange({ experienceLevel: current.filter((id) => id !== experienceId) });
    }
  };

  const handleIndustryChange = (industryId: string, checked: boolean) => {
    const current = Array.isArray(filters.industry) ? filters.industry : [];
    if (checked) {
      if (!current.includes(industryId)) {
        onFiltersChange({ industry: [...current, industryId] });
      }
    } else {
      onFiltersChange({ industry: current.filter((id) => id !== industryId) });
    }
  };

  // Experience level options with German translations
  const experienceOptions = [
    { id: 'internship', label: dict.experienceOptions?.internship || 'Praktikum' },
    { id: 'entry-level', label: dict.experienceOptions?.['entry-level'] || 'Berufseinsteiger' },
    { id: 'associate', label: dict.experienceOptions?.associate || 'Fachkraft' },
    { id: 'mid-senior', label: dict.experienceOptions?.['mid-senior'] || 'Erfahrene Fachkraft' },
    { id: 'director', label: dict.experienceOptions?.director || 'Führungskraft' },
    { id: 'executive', label: dict.experienceOptions?.executive || 'Geschäftsführung' }
  ];

  // Industry options with German translations
  const industryOptions = [
    { id: 'technology', label: dict.industryOptions?.technology || 'Technologie' },
    { id: 'it-services', label: dict.industryOptions?.['it-services'] || 'IT-Dienstleistungen' },
    { id: 'business-consulting', label: dict.industryOptions?.['business-consulting'] || 'Unternehmensberatung' },
    { id: 'environmental-services', label: dict.industryOptions?.['environmental-services'] || 'Umweltdienstleistungen' },
    { id: 'electronics', label: dict.industryOptions?.electronics || 'Elektronik' },
    { id: 'automotive', label: dict.industryOptions?.automotive || 'Automobilindustrie' },
    { id: 'healthcare', label: dict.industryOptions?.healthcare || 'Gesundheitswesen' },
    { id: 'finance', label: dict.industryOptions?.finance || 'Finanzwesen' },
    { id: 'education', label: dict.industryOptions?.education || 'Bildung' },
    { id: 'retail', label: dict.industryOptions?.retail || 'Einzelhandel' },
    { id: 'manufacturing', label: dict.industryOptions?.manufacturing || 'Fertigung' },
    { id: 'media', label: dict.industryOptions?.media || 'Medien & Kommunikation' },
    { id: 'real-estate', label: dict.industryOptions?.['real-estate'] || 'Immobilien' },
    { id: 'hospitality', label: dict.industryOptions?.hospitality || 'Gastgewerbe' },
    { id: 'transportation', label: dict.industryOptions?.transportation || 'Transport & Logistik' }
  ];

  return (
    <div className="w-full max-w-sm">
      {/* Outer Filter Box */}
      <div className="bg-white border border-border-filter rounded-lg">
        {/* Experience Level Filter */}
        <Collapsible open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            {/* Collapsible Header */}
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    {dict.experienceLevel}
                  </h3>
                  {isExperienceOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            {/* Collapsible Content */}
            <CollapsibleContent>
              <div className="w-full">
                {experienceOptions.map((experience) => {
                  const isChecked = Array.isArray(filters.experienceLevel) && filters.experienceLevel.includes(experience.id);
                  return (
                    <div key={experience.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4 hover:shadow-lg">
                      <Checkbox
                        id={`experience-${experience.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleExperienceChange(experience.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`experience-${experience.id}`} 
                        className="font-grotesk font-normal text-xs leading-none text-filter-item cursor-pointer"
                      >
                        {experience.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Industry Filter */}
        <Collapsible open={isIndustryOpen} onOpenChange={setIsIndustryOpen}>
          <div className="w-full pb-4">
            {/* Collapsible Header */}
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    {dict.industry}
                  </h3>
                  {isIndustryOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            {/* Collapsible Content with Scroll */}
            <CollapsibleContent>
              <div className="w-full">
                <ScrollArea className="h-[240px] w-full">
                  <div className="pr-4">
                    {industryOptions.map((industry) => {
                      const isChecked = Array.isArray(filters.industry) && filters.industry.includes(industry.id);
                      return (
                        <div key={industry.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4 hover:shadow-lg">
                          <Checkbox
                            id={`industry-${industry.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              handleIndustryChange(industry.id, checked as boolean)
                            }
                            className="h-[18px] w-[18px]"
                          />
                          <Label 
                            htmlFor={`industry-${industry.id}`} 
                            className="font-grotesk font-normal text-xs leading-none text-filter-item cursor-pointer"
                          >
                            {industry.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
} 