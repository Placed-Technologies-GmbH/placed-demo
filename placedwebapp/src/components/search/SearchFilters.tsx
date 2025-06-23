'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, /* RotateCcw */ } from 'lucide-react';
import type { SearchFilters as SearchFiltersType } from '@/features/search/types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  dict: {
    location: string;
    experienceLevel: string;
    industry: string;
    filters: string;
    reset: string;
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
  // Collapsible states - first three open by default
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isToggleFiltersOpen, setIsToggleFiltersOpen] = useState(true);
  const [isSalaryOpen, setIsSalaryOpen] = useState(true);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isBestandskundenOpen, setIsBestandskundenOpen] = useState(false);
  const [isZeitraumOpen, setIsZeitraumOpen] = useState(false);
  const [isVertragsartOpen, setIsVertragsartOpen] = useState(false);
  const [isMerklistenOpen, setIsMerklistenOpen] = useState(false);
  const [isBerufsgruppeOpen, setIsBerufsgruppeOpen] = useState(false);
  const [isAusbildungOpen, setIsAusbildungOpen] = useState(false);
  const [isPlacedScoreOpen, setIsPlacedScoreOpen] = useState(false);

  // Local state for salary inputs
  const [salaryMin, setSalaryMin] = useState(filters.salaryMin?.toString() || '');
  const [salaryMax, setSalaryMax] = useState(filters.salaryMax?.toString() || '');

  // Handler functions
  const handleResetFilters = () => {
    onFiltersChange({
      experienceLevel: [],
      industry: [],
      onlyPaidAds: false,
      excludeHeadhunters: false,
      excludeMyClients: false,
      location: '',
      locationRadius: 30,
      salaryMin: undefined,
      salaryMax: undefined,
      bestandskundenDropdown: '',
      zeitraum: [],
      vertragsart: [],
      merklisten: [],
      berufsgruppe: [],
      ausbildung: [],
      placedScore: []
    });
    setSalaryMin('');
    setSalaryMax('');
  };

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

  const handleCheckboxGroupChange = (filterKey: keyof SearchFiltersType, itemId: string, checked: boolean) => {
    const current = Array.isArray(filters[filterKey]) ? filters[filterKey] as string[] : [];
    if (checked) {
      if (!current.includes(itemId)) {
        onFiltersChange({ [filterKey]: [...current, itemId] });
      }
    } else {
      onFiltersChange({ [filterKey]: current.filter((id) => id !== itemId) });
    }
  };

  const handleSalaryApply = () => {
    onFiltersChange({
      salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
      salaryMax: salaryMax ? parseInt(salaryMax) : undefined
    });
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

  // Zeitraum options
  const zeitraumOptions = [
    { id: '1-woche', label: '1 Woche' },
    { id: '2-wochen', label: '2 Wochen' },
    { id: '1-monat', label: '1 Monat' },
    { id: '2-monate', label: '2 Monate' },
    { id: '6-monate', label: '6 Monate' },
    { id: 'alle', label: 'Alle' }
  ];

  // Vertragsart options
  const vertragsartOptions = [
    { id: 'vollzeit', label: 'Vollzeit' },
    { id: 'teilzeit', label: 'Teilzeit' },
    { id: 'minijob', label: 'Minijob' },
    { id: 'werkstudent', label: 'Werkstudent' },
    { id: 'befristet', label: 'Befristet' },
    { id: 'unbefristet', label: 'Unbefristet' }
  ];

  // Merklisten options
  const merklistenOptions = [
    { id: 'zielkunden', label: 'Zielkunden' },
    { id: 'blacklist', label: 'Blacklist' },
    { id: 'elektroniker-berlin', label: 'Elektroniker Berlin' },
    { id: 'anlagenmechaniker-berlin', label: 'Anlagenmechaniker Berlin' },
    { id: 'sales-manager-remote', label: 'Sales Manager Remote' },
    { id: 'liste-juni-2025', label: 'Liste Juni 2025' },
    { id: 'gvp-event', label: 'GVP Event' }
  ];

  // Berufsgruppe options
  const berufsgruppeOptions = [
    { id: 'land-forst', label: 'Land-Forst-Tierwirtschaft' },
    { id: 'rohstoff-produktion', label: 'Rohstoffgewinnung, Produktion und Fertigung' },
    { id: 'naturwissenschaft', label: 'Naturwissenschaft, Geografie und Informatik' },
    { id: 'verkehr-logistik', label: 'Verkehr, Logistik, Schutz und Sicherheit' },
    { id: 'kaufmaennisch', label: 'Kaufmännische Dienstleistungen' },
    { id: 'unternehmensorganisation', label: 'Unternehmensorganisation' },
    { id: 'gesundheit-soziales', label: 'Gesundheit, Soziales, Lehre und Erziehung' },
    { id: 'sprach-literatur', label: 'Sprach-Literatur' },
    { id: 'militaer', label: 'Militär' }
  ];

  // Ausbildung options
  const ausbildungOptions = [
    { id: 'keine-ausbildung', label: 'Keine Ausbildung' },
    { id: 'ausbildung', label: 'Ausbildung' },
    { id: 'techniker', label: 'Techniker' },
    { id: 'studium-bachelor', label: 'Studium Bachelor' },
    { id: 'studium-master', label: 'Studium Master' }
  ];

  // PLACED-Score options
  const placedScoreOptions = [
    { id: 'gt-40', label: '>40 %' },
    { id: 'gt-50', label: '>50 %' },
    { id: 'gt-60', label: '>60 %' },
    { id: 'gt-70', label: '>70 %' },
    { id: 'gt-80', label: '>80 %' },
    { id: 'gt-90', label: '>90 %' }
  ];

  return (
    <div className="w-full max-w-sm">
      {/* Reset Button */}
      <div className="mb-4 flex justify-between items-center">
        <span className="flex justify-start text-text-primary font-grotesk text-light font-bold">
          {dict.filters}
        </span>        
        <Button 
          onClick={handleResetFilters}
          variant="ghost" 
          size="sm" 
          className="w-[150px] h-[32px] flex items-center gap-3 text-text-primary justify-end"
        >
          {dict.reset}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" stroke="#363853" strokeWidth="1.5"/>
            <path d="M13.7678 10.2322L10.2322 13.7678M13.7678 13.7678L10.2322 10.2322" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </Button>
      </div>

      {/* Outer Filter Box */}
      <div className="bg-white border border-border-filter rounded-lg">
        
        {/* Location Filter */}
        <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    {dict.location}
                  </h3>
                  {isLocationOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full px-7 space-y-4">
                <div>
                  <Label className="font-grotesk font-normal text-medium leading-none text-filter-item mb-2 block">
                    Berlin
                  </Label>
                  <Input
                    value={filters.location || ''}
                    onChange={(e) => onFiltersChange({ location: e.target.value })}
                    placeholder="Enter location"
                    className="h-8"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-grotesk font-normal text-medium leading-none text-filter-item">
                      Radius
                    </Label>
                    <span className="font-grotesk font-normal text-medium leading-none text-filter-item">
                      {filters.locationRadius || 30} KM radius
                    </span>
                  </div>
                  <Slider
                    value={[filters.locationRadius || 30]}
                    onValueChange={(value) => {
                      console.log('Slider value changed:', value);
                      onFiltersChange({ locationRadius: value[0] });
                    }}
                    max={100}
                    min={1}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Toggle Filters */}
        <Collapsible open={isToggleFiltersOpen} onOpenChange={setIsToggleFiltersOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                   Filteroptionen
                  </h3>
                  {isToggleFiltersOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full px-7 space-y-3">
                {/* Headhunter ausblenden */}
                <div className="flex items-center justify-between">
                  <Label className="font-grotesk font-normal text-medium leading-none text-filter-item">
                    Headhunter ausblenden
                  </Label>
                  <Switch
                    checked={filters.excludeHeadhunters}
                    onCheckedChange={(checked) => onFiltersChange({ excludeHeadhunters: checked })}
                  />
                </div>
                
                {/* Bestandskunden */}
                <div className="flex items-center justify-between">
                  <Label className="font-grotesk font-normal text-medium leading-none text-filter-item">
                    Bestandskunden
                  </Label>
                  <Switch
                    checked={filters.excludeMyClients}
                    onCheckedChange={(checked) => onFiltersChange({ excludeMyClients: checked })}
                  />  
                </div>
                
                {/* Nur bezahlte Stellen */}
                <div className="flex items-center justify-between">
                  <Label className="font-grotesk font-normal text-medium leading-none text-filter-item">
                    Nur bezahlte Stellen
                  </Label>
                  <Switch
                    checked={filters.onlyPaidAds}
                    onCheckedChange={(checked) => onFiltersChange({ onlyPaidAds: checked })}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Salary Range */}
        <Collapsible open={isSalaryOpen} onOpenChange={setIsSalaryOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Gehaltsspanne
                  </h3>
                  {isSalaryOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full px-7 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label className="font-grotesk font-normal text-medium leading-none text-filter-item mb-1 block">
                      Min
                    </Label>
                    <Input
                      type="number"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="0"
                      className="h-8"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="font-grotesk font-normal text-medium leading-none text-filter-item mb-1 block">
                      Max
                    </Label>
                    <Input
                      type="number"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="100000"
                      className="h-8"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSalaryApply}
                  size="sm"
                  className="w-full h-8"
                >                
                  anwenden
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Bestandskunden Dropdown */}
        <Collapsible open={isBestandskundenOpen} onOpenChange={setIsBestandskundenOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Bestandskunden
                  </h3>
                  {isBestandskundenOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full px-7">
                <RadioGroup
                  value={filters.bestandskundenDropdown || ''}
                  onValueChange={(value) => onFiltersChange({ bestandskundenDropdown: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amazon" id="amazon" />
                    <Label htmlFor="amazon" className="font-grotesk font-normal text-medium leading-none text-filter-item">
                      Amazon
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google" />
                    <Label htmlFor="google" className="font-grotesk font-normal text-medium leading-none text-filter-item">
                      Google
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple" className="font-grotesk font-normal text-medium leading-none text-filter-item">
                      Apple
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Experience Level Filter */}
        <Collapsible open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
          <div className="w-full border-b border-border-filter pb-4">
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
            
            <CollapsibleContent>
              <div className="w-full">
                {experienceOptions.map((experience) => {
                  const isChecked = Array.isArray(filters.experienceLevel) && filters.experienceLevel.includes(experience.id);
                  return (
                    <div key={experience.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
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
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
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
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Industrie
                  </h3>
                  {isIndustryOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                <ScrollArea className="h-[240px] w-full">
                  <div className="pr-4">
                    {industryOptions.map((industry) => {
                      const isChecked = Array.isArray(filters.industry) && filters.industry.includes(industry.id);
                      return (
                        <div key={industry.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
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
                            className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
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

        {/* Zeitraum Filter */}
        <Collapsible open={isZeitraumOpen} onOpenChange={setIsZeitraumOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Zeitraum
                  </h3>
                  {isZeitraumOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                {zeitraumOptions.map((zeitraum) => {
                  const isChecked = Array.isArray(filters.zeitraum) && filters.zeitraum.includes(zeitraum.id);
                  return (
                    <div key={zeitraum.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                      <Checkbox
                        id={`zeitraum-${zeitraum.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleCheckboxGroupChange('zeitraum', zeitraum.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`zeitraum-${zeitraum.id}`} 
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
                      >
                        {zeitraum.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Vertragsart Filter */}
        <Collapsible open={isVertragsartOpen} onOpenChange={setIsVertragsartOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Vertragsart
                  </h3>
                  {isVertragsartOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                {vertragsartOptions.map((vertragsart) => {
                  const isChecked = Array.isArray(filters.vertragsart) && filters.vertragsart.includes(vertragsart.id);
                  return (
                    <div key={vertragsart.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                      <Checkbox
                        id={`vertragsart-${vertragsart.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleCheckboxGroupChange('vertragsart', vertragsart.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`vertragsart-${vertragsart.id}`} 
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
                      >
                        {vertragsart.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Merklisten Filter */}
        <Collapsible open={isMerklistenOpen} onOpenChange={setIsMerklistenOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Merklisten
                  </h3>
                  {isMerklistenOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                {merklistenOptions.map((merkliste) => {
                  const isChecked = Array.isArray(filters.merklisten) && filters.merklisten.includes(merkliste.id);
                  return (
                      <div key={merkliste.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                      <Checkbox
                        id={`merkliste-${merkliste.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleCheckboxGroupChange('merklisten', merkliste.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`merkliste-${merkliste.id}`} 
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
                      >
                        {merkliste.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Berufsgruppe Filter */}
        <Collapsible open={isBerufsgruppeOpen} onOpenChange={setIsBerufsgruppeOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Berufsgruppe
                  </h3>
                  {isBerufsgruppeOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                <ScrollArea className="h-[240px] w-full">
                  <div className="pr-4">
                    {berufsgruppeOptions.map((berufsgruppe) => {
                      const isChecked = Array.isArray(filters.berufsgruppe) && filters.berufsgruppe.includes(berufsgruppe.id);
                      return (
                        <div key={berufsgruppe.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                          <Checkbox
                            id={`berufsgruppe-${berufsgruppe.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              handleCheckboxGroupChange('berufsgruppe', berufsgruppe.id, checked as boolean)
                            }
                            className="h-[18px] w-[18px]"
                          />
                          <Label 
                            htmlFor={`berufsgruppe-${berufsgruppe.id}`} 
                            className="font-grotesk font-normal text-sm leading-none text-filter-item cursor-pointer"
                          >
                            {berufsgruppe.label}
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

        {/* Ausbildung Filter */}
        <Collapsible open={isAusbildungOpen} onOpenChange={setIsAusbildungOpen}>
          <div className="w-full border-b border-border-filter pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    Ausbildung
                  </h3>
                  {isAusbildungOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                {ausbildungOptions.map((ausbildung) => {
                  const isChecked = Array.isArray(filters.ausbildung) && filters.ausbildung.includes(ausbildung.id);
                  return (
                    <div key={ausbildung.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                      <Checkbox
                        id={`ausbildung-${ausbildung.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleCheckboxGroupChange('ausbildung', ausbildung.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`ausbildung-${ausbildung.id}`} 
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
                      >
                        {ausbildung.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* PLACED-Score Filter */}
        <Collapsible open={isPlacedScoreOpen} onOpenChange={setIsPlacedScoreOpen}>
          <div className="w-full pb-4">
            <div className="w-full h-[49px] flex items-center justify-between pt-4 px-4 pb-2">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <h3 className="font-grotesk font-medium text-lg leading-none text-filter-header">
                    PLACED-Score
                  </h3>
                  {isPlacedScoreOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="w-full">
                {placedScoreOptions.map((score) => {
                  const isChecked = Array.isArray(filters.placedScore) && filters.placedScore.includes(score.id);
                  return (
                    <div key={score.id} className="w-full h-8 flex items-center gap-2 py-1 px-[28px] pr-4">
                      <Checkbox
                        id={`placed-score-${score.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => 
                          handleCheckboxGroupChange('placedScore', score.id, checked as boolean)
                        }
                        className="h-[18px] w-[18px]"
                      />
                      <Label 
                        htmlFor={`placed-score-${score.id}`} 
                        className="font-grotesk font-normal text-medium leading-none text-filter-item cursor-pointer"
                      >
                        {score.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

      </div>
    </div>
  );
} 