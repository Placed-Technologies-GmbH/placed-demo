'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, Building } from 'lucide-react';
import type { ContactDialogData } from '@/features/search/types';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: ContactDialogData | null;
  dict: {
    title: string;
    company: string;
    role: string;
    contactPerson: string;
    position: string;
    phone: string;
    email: string;
    close: string;
  };
}

export function ContactDialog({ isOpen, onClose, data, dict }: ContactDialogProps) {
  if (!data) return null;

  const initials = data.contactPerson.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-grotesk font-medium text-text-primary">
            {dict.title}
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            {dict.company}: {data.company}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Person */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={data.contactPerson.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-grotesk font-medium text-text-primary">
                {data.contactPerson.name}
              </h3>
              <p className="text-text-secondary text-text-sm">
                {data.contactPerson.position}
              </p>
            </div>
          </div>

          {/* Job Role */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background-muted">
              <Building className="h-4 w-4 text-text-secondary" />
            </div>
            <div>
              <p className="text-text-xs text-text-muted uppercase tracking-wide">
                {dict.role}
              </p>
              <p className="text-text-primary font-medium">
                {data.role}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background-muted">
                <Phone className="h-4 w-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-text-xs text-text-muted uppercase tracking-wide">
                  {dict.phone}
                </p>
                <a 
                  href={`tel:${data.contactPerson.phone}`}
                  className="text-text-primary font-medium hover:text-primary transition-colors"
                >
                  {data.contactPerson.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background-muted">
                <Mail className="h-4 w-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-text-xs text-text-muted uppercase tracking-wide">
                  {dict.email}
                </p>
                <a 
                  href={`mailto:${data.contactPerson.email}`}
                  className="text-text-primary font-medium hover:text-primary transition-colors"
                >
                  {data.contactPerson.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            {dict.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 