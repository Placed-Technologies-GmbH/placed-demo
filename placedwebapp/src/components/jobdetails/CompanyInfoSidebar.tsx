'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Phone, Mail, ExternalLink, Star } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { CopyToClipboardField } from '@/components/ui/CopyToClipboardField';
import type { CompanyDetails } from '@/features/jobdetails/types';

interface CompanyInfoSidebarProps {
  company: CompanyDetails;
  relationshipStatus: 'existing_client' | 'follow' | 'blacklist' | 'none';
  onRelationshipChange: (status: 'existing_client' | 'follow' | 'blacklist' | 'none') => void;
}

export function CompanyInfoSidebar({ 
  company, 
  relationshipStatus, 
  onRelationshipChange 
}: CompanyInfoSidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getDropdownLabel = () => {
    switch (relationshipStatus) {
      default:  
        return 'Nicht kategorisiert';
      case 'existing_client':
        return 'Bestehender Kunde';
      case 'follow':
        return 'Folgen';
      case 'blacklist':
        return 'Schwarze Liste'
    }
  };

  const handleRelationshipChange = (status: 'existing_client' | 'follow' | 'blacklist' | 'none') => {
    onRelationshipChange(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full md:w-[296px] bg-white border border-border rounded-[4px] p-4 space-y-1">
      {/* Company Header */}
      <div className="text-lg font-semibold text-secondary mb-4">
        Company
      </div>

      {/* Company Dropdown */}
      <div className="mb-3">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button className="w-full h-10 px-2 py-2 bg-background border border-border rounded-md flex items-center justify-between text-text-primary hover:bg-background-muted transition-colors hover:cursor-pointer">
              <span className="text-sm font-medium">{getDropdownLabel()}</span>
              <ChevronDown className="h-4 w-4 text-text-secondary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[264px] bg-white border border-border rounded-md shadow-lg p-1">
            <DropdownMenuItem
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-background-muted rounded-sm cursor-pointer"
              onClick={() => handleRelationshipChange('none')}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {relationshipStatus === 'existing_client' && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span>Bestehender Kunde</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-background-muted rounded-sm cursor-pointer"
              onClick={() => handleRelationshipChange('follow')}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {relationshipStatus === 'follow' && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span>Verfolgen</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-background-muted rounded-sm cursor-pointer"
              onClick={() => handleRelationshipChange('blacklist')}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {relationshipStatus === 'blacklist' && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
              <span>Schwarze Liste</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Company Name */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-text-primary">{company.name}</h3>
      </div>

      {/* Company Website */}
      <div className="mb-3">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>{company.website.replace(/^https?:\/\//, '')}</span>
        </a>
      </div>

      {/* Kununu Rating */}
      <div className="mb-10">
        <div className="flex items-center gap-1">
          <Image
            src="/logos/providerlogos/kunnunu.svg"
            alt="Kununu"
            width={60}
            height={16}
            className="h-4 w-auto"
          />
          <span className="text-sm font-medium text-text-primary">
            {company.kununu.rating}
          </span>
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-text-secondary">
            ({company.kununu.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-2">
        <div className="text-lg font-semibold text-secondary">
          Contact
        </div>

        {/* Contact Persons */}
        {company.contacts.map((contact, index) => (
          <div key={contact.id} className="space-y-3">
            {/* Contact Name and Position */}
            <div>
              <h4 className="text-md font-semibold text-text-primary">{contact.name}</h4>
              <p className="text-sm text-text-secondary">{contact.position}</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              {/* Phone */}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <CopyToClipboardField
                  label={contact.phone}
                  className="flex-1 text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-text-secondary flex-shrink-0" />
                <CopyToClipboardField
                  label={contact.email}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            {/* Separator between contacts (except for last one) */}
            {index < company.contacts.length - 1 && (
              <div className="border-t border-none my-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 