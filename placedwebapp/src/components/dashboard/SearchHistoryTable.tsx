'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SearchHistoryItem {
  id: string;
  searchDetails: string;
  cvUploaded: string;
  cv: string;
  favoriteJobs: number;
}

interface SearchHistoryTableProps {
  data: SearchHistoryItem[];
  dict: {
    searchDetails: string;
    cvUploaded: string;
    cv: string;
    favoriteJobs: string;
    searchAgain: string;
  };
}

type SortField = 'searchDetails' | 'cvUploaded';
type SortDirection = 'asc' | 'desc';

export function SearchHistoryTable({ data, dict }: SearchHistoryTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Ensure minimum 6 rows for consistent spacing
  const minRows = 6;
  const displayData = [...sortedData];
  while (displayData.length < minRows) {
    displayData.push({
      id: `empty-${displayData.length}`,
      searchDetails: '-',
      cvUploaded: '-',
      cv: '',
      favoriteJobs: 0,
    });
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 text-text-secondary" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-3 h-3 text-text-primary" /> : 
      <ChevronDown className="w-3 h-3 text-text-primary" />;
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header with flex spacing */}
      <div className="flex items-center" style={{ height: '25px', marginBottom: '25px' }}>
        <h2 className="font-grotesk font-medium text-lg leading-none text-text-primary">
          Search History
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="w-full bg-surface rounded-lg shadow-md" style={{ height: '300px', width: '840px' }}>
          <ScrollArea className="h-full w-full">
            <Table>
              <TableHeader>
                <TableRow className="gap-5">
                  <TableHead className="h-[36px] px-4 py-0 border-none">
                    <button
                      onClick={() => handleSort('searchDetails')}
                      className="flex items-center gap-2 font-grotesk font-medium text-sm text-text-secondary hover:text-text-primary/80 transition-colors"
                    >
                      {dict.searchDetails}
                      <SortIcon field="searchDetails" />
                    </button>
                  </TableHead>
                  <TableHead className="h-[36px] px-4 py-0 border-none">
                    <button
                      onClick={() => handleSort('cvUploaded')}
                      className="flex items-center gap-2 font-grotesk font-medium text-sm text-text-secondary hover:text-text-primary/80 transition-colors"
                    >
                      {dict.cvUploaded}
                      <SortIcon field="cvUploaded" />
                    </button>
                  </TableHead>
                  <TableHead className="h-[36px] px-4 py-0 border-none font-grotesk font-medium text-sm text-text-secondary">
                    {dict.cv}
                  </TableHead>
                  <TableHead className="h-[36px] px-4 py-0 border-none font-grotesk font-medium text-sm text-text-secondary">
                    {dict.favoriteJobs}
                  </TableHead>
                  <TableHead className="h-[36px] px-4 py-0 border-none font-grotesk font-medium text-sm text-text-secondary">
                    {dict.searchAgain}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((item) => {
                  const isEmpty = item.searchDetails === '-';
                  return (
                    <TableRow key={item.id} className="h-[40px] border-none hover:bg-background-muted/30 hover:shadow-md">
                      <TableCell className="h-[40px] px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : item.searchDetails}
                      </TableCell>
                      <TableCell className="h-[40px] px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : item.cvUploaded}
                      </TableCell>
                      <TableCell className="h-[40px] px-4 py-0">
                        {!isEmpty && item.cv && (
                          <Button
                            variant="ghost"
                            size="xs"
                            className="h-6 text-xs text-text-secondary hover:text-text-primary/80"
                          >
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 9V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V9M3.66667 5.66667L7 9M7 9L10.3333 5.66667M7 9V1" stroke="#757575" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        )}
                        {isEmpty && <span className="text-text-secondary">-</span>}
                      </TableCell>
                      <TableCell className="h-[40px] px-4 py-0 font-grotesk font-normal text-sm text-text-secondary">
                        {isEmpty ? '-' : item.favoriteJobs}
                      </TableCell>
                      <TableCell className="h-[40px] px-4 py-0">
                        {!isEmpty && (
                          <Button
                            variant="ghost"
                            size="lg"
                            className="h-6 px-2 text-xs justify-center item-center text-text-secondary hover:text-text-primary/80"
                          >
                          <svg width="12" height="12" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8.05932C1 4.25885 4.11111 1.17796 8 1.17796C12.6667 1.17796 15 5.00093 15 5.00093M15 5.00093L15 0.940674M15 5.00093H11.3794" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15 9.09321C15 12.8937 11.8889 15.9746 8 15.9746C3.33333 15.9746 1 12.1516 1 12.1516M1 12.1516L1 16.2119M1 12.1516H4.62064" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          </Button>
                        )}
                        {isEmpty && <span className="justify-center item-center text-text-secondary">-</span>}
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
        {data.length > 0 ? (
          sortedData.map((item) => (
            <div key={item.id} className="bg-surface border border-border rounded-lg p-4 shadow-sm">
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-medium text-text-secondary">{dict.searchDetails}</span>
                  <p className="font-grotesk font-normal text-sm text-text-primary">{item.searchDetails}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-text-secondary">{dict.cvUploaded}</span>
                  <p className="font-grotesk font-normal text-sm text-text-primary">{item.cvUploaded}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs font-medium text-text-secondary">{dict.favoriteJobs}: </span>
                    <span className="font-grotesk font-normal text-sm text-text-primary">{item.favoriteJobs}</span>
                  </div>
                  <div className="flex gap-2">
                    {item.cv && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs text-primary hover:text-primary/80"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        {item.cv}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-primary hover:text-primary/80"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      {dict.searchAgain}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface border border-border rounded-lg p-4 shadow-sm text-center">
            <p className="font-grotesk font-normal text-sm text-text-secondary">No search history available</p>
          </div>
        )}
      </div>
    </div>
  );
} 