'use client';

import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Company {
  id: string;
  name: string;
  location: string;
  jobsListed: number;
  jobsFavorite: number;
}

interface CompaniesSectionProps {
  existingClients: Company[];
  following: Company[];
  blacklist: Company[];
  dict: {
    companies: string;
    existingClients: string;
    following: string;
    blacklist: string;
    company: string;
    location: string;
    jobsListed: string;
    jobsFavorite: string;
    browseJobs: string;
  };
}

function CompanyTable({ companies, dict }: { companies: Company[]; dict: CompaniesSectionProps['dict'] }) {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'en';

  // Ensure minimum 5 rows for consistent spacing
  const minRows = 5;
  const displayData = [...companies];
  while (displayData.length < minRows) {
    displayData.push({
      id: `empty-company-${displayData.length}`,
      name: '-',
      location: '-',
      jobsListed: 0,
      jobsFavorite: 0,
    });
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="w-full bg-surface rounded-lg shadow-md" style={{ height: '250px', width: '100%' }}>
          <ScrollArea className="h-full w-full">
            <Table >
              <TableHeader className="h-[36px]">
                <TableRow>
                  <TableHead className="h-[20px] px-4 font-grotesk font-medium text-sm text-text-secondary">
                    {dict.company}
                  </TableHead>
                  <TableHead className="h-[20px] px-4 font-grotesk font-medium text-sm text-text-secondary">
                    {dict.location}
                  </TableHead>
                  <TableHead className="h-[20px] px-4 font-grotesk font-medium text-sm text-text-secondary">
                    {dict.jobsListed}
                  </TableHead>
                  <TableHead className="h-[20px] px-4 font-grotesk font-medium text-sm text-text-secondary">
                    {dict.jobsFavorite}
                  </TableHead>
                  <TableHead className="h-[20px] px-4 font-grotesk font-medium text-sm text-text-secondary">
                    {dict.browseJobs}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((company) => {
                  const isEmpty = company.name === '-';
                  return (
                    <TableRow key={company.id} className="h-[40px] border-none hover:bg-background-muted/30 hover:shadow-md">
                      <TableCell className=" px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : company.name}
                      </TableCell>
                      <TableCell className="px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : company.location}
                      </TableCell>
                      <TableCell className="px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : company.jobsListed}
                      </TableCell>
                      <TableCell className="px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : company.jobsFavorite}
                      </TableCell>
                      <TableCell className="px-4 py-0">
                        {!isEmpty && (
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => {
                              router.push(`/${lang}/search`);
                            }}
                            className="h-6 text-xs text-primary hover:text-primary/80"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.6365 13.987C10.4122 14.2114 10.4122 14.575 10.6365 14.7993C10.8609 15.0236 11.2245 15.0236 11.4488 14.7993L13.842 12.4061C13.9498 12.2984 14.0103 12.1523 14.0103 12C14.0103 11.8476 13.9498 11.7015 13.842 11.5938L11.4488 9.20062C11.2245 8.97631 10.8609 8.97631 10.6365 9.20062C10.4122 9.42492 10.4122 9.78859 10.6365 10.0129L12.6236 12L10.6365 13.987Z" fill="#363853"/>
                            </svg>
                          </Button>
                        )}
                        {isEmpty && <span className="text-text-secondary">-</span>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div key={company.id} className="bg-surface border border-border rounded-lg p-4 shadow-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-text-secondary">{dict.company}</span>
                  <p className="font-grotesk font-medium text-sm text-text-primary">{company.name}</p>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="mb-1">
                      <span className="text-xs font-medium text-text-secondary">{dict.location}</span>
                      <p className="font-grotesk font-normal text-sm text-text-primary">{company.location}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-text-secondary">{dict.jobsListed}: </span>
                      <span className="font-grotesk font-normal text-sm text-text-primary">{company.jobsListed}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-text-secondary">{dict.jobsFavorite}: </span>
                      <span className="font-grotesk font-normal text-sm text-text-primary">{company.jobsFavorite}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      router.push(`/${lang}/search`);
                    }}
                    className="h-8 px-2 text-xs text-primary hover:text-primary/80 ml-2"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    {dict.browseJobs}
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface border border-border rounded-lg p-4 shadow-sm text-center">
            <p className="font-grotesk font-normal text-sm text-text-secondary">No companies available</p>
          </div>
        )}
      </div>
    </>
  );
}

export function CompaniesSection({ existingClients, following, blacklist, dict }: CompaniesSectionProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header with flex spacing */}            
      <div className="flex items-center" style={{ height: '25px' }}>
        <h2 className="font-grotesk font-medium text-lg leading-none text-text-primary">
          {dict.companies}
        </h2>
      </div>

      {/* Gap between header and tabs */}
      <div className="h-1" />

      {/* Tabs Container with flex spacing */}
      <div className="w-full flex flex-col">
        {/* Tabs List */}
        <Tabs defaultValue="existingClients" className="flex justify-center w-[840px]">
          <div className="w-[273px]">
            <TabsList >
              <TabsTrigger value="existingClients" className="font-grotesk font-medium text-sm">
                {dict.existingClients}
              </TabsTrigger>
              <TabsTrigger value="following" className="font-grotesk font-medium text-sm">
                {dict.following}
              </TabsTrigger>
              <TabsTrigger value="blacklist" className="font-grotesk font-medium text-sm">
                {dict.blacklist}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Gap between tabs and content */}
          <div style={{ height: '16px' }} />

          <TabsContent value="existingClients" className="mt-0">
            <CompanyTable companies={existingClients} dict={dict} />
          </TabsContent>

          <TabsContent value="following" className="mt-0">
            <CompanyTable companies={following} dict={dict} />
          </TabsContent>

          <TabsContent value="blacklist" className="mt-0">
            <CompanyTable companies={blacklist} dict={dict} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 