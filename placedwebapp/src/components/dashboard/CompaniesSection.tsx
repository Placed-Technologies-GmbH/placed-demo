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
                  <TableHead className="h-[20px] px-4 py-6 flex justify-center items-center font-grotesk font-medium text-sm text-text-secondary">
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
                      <TableCell className="flex justify-center px-4 py-0">
                        {!isEmpty && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              router.push(`/${lang}/search`);
                            }}
                            className="items-center text-xs text-primary hover:text-primary/80"
                          >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.96967 17.5303C8.67678 17.2374 8.67678 16.7626 8.96967 16.4697L13.4393 12L8.96967 7.53033C8.67678 7.23744 8.67678 6.76256 8.96967 6.46967C9.26256 6.17678 9.73744 6.17678 10.0303 6.46967L15.0303 11.4697C15.171 11.6103 15.25 11.8011 15.25 12C15.25 12.1989 15.171 12.3897 15.0303 12.5303L10.0303 17.5303C9.73744 17.8232 9.26256 17.8232 8.96967 17.5303Z" fill="#363853"/>
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
          <div className="w-[400px]">
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