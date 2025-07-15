// 'use client';

// import React, { useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { Paperclip, MapPin } from 'lucide-react';

// interface DashboardSearchBarProps {
//   // Search values
//   searchQuery: string;
//   location: string;
//   onSearchQueryChange: (value: string) => void;
//   onLocationChange: (value: string) => void;
//   onSearchClick: () => void;
  
//   // Toggle states
//   toggles: {
//     onlyPaidAds: boolean;
//     excludeHeadhunters: boolean;
//     excludeMyClients: boolean;
//   };
//   onToggleChange: (key: 'onlyPaidAds' | 'excludeHeadhunters' | 'excludeMyClients', value: boolean) => void;
  
//   // Dictionary for translations
//   dict: {
//     searchPlaceholder?: string;
//     locationPlaceholder?: string;
//     search?: string;
//     dropResume?: string;
//     toggles: {
//       onlyPaidAds: string;
//       excludeHeadhunters: string;
//       excludeMyClients: string;
//     };
//   };

//   onFileChange?: (file: File | null) => void;
//   onSearch?: () => void;
// }

// export function DashboardSearchBar({
//   searchQuery,
//   location,
//   onSearchQueryChange,
//   onLocationChange,
//   onSearchClick,
//   toggles,
//   onToggleChange,
//   dict,
//   onFileChange,
//   onSearch,
// }: DashboardSearchBarProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [attachedFile, setAttachedFile] = useState<File | null>(null);

//   const handleIconClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setAttachedFile(file);
//     onFileChange?.(file);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files?.[0] || null;
//     setAttachedFile(file);
//     onFileChange?.(file);
//   };

//   const handleSearch = () => {
//     onSearch?.();
//     onSearchClick?.();
//   };

//   return (
//     <div className="w-full">
//       {/* Desktop Layout */}
//       <div className="hidden lg:block">
//         <div className="w-[695px] flex flex-col gap-6">
//           {/* Search Bar - 695×48px */}
//           <div
//             className={`w-full h-12 bg-surface rounded-lg shadow:sm hover:shadow-lg border flex items-center relative transition-normal
//                         ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//           >
//             {/* Attachment Pin */}
//             <button
//               type="button"
//               aria-label="Attach resume"
//               className="ml-2 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary focus:outline-none transition-fast"
//               onClick={handleIconClick}
//             >
//               <Paperclip className="w-4 h-4" />
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 className="hidden"
//                 accept=".pdf,.doc,.docx,.txt"
//                 onChange={handleFileChange}
//               />
//             </button>
//             {/* Show attached file name if present */}
//             {attachedFile && (
//               <span className="ml-2 text-xs text-primary font-medium truncate max-w-[120px]">{attachedFile.name}</span>
//             )}
//             {/* Search Input - 271px */}
//             <div className="w-[271px] h-12 relative">
//               <Input
//                 type="text"
//                 placeholder={dict.searchPlaceholder || "Enter job title, skills, or company"}
//                 value={searchQuery}
//                 onChange={(e) => onSearchQueryChange(e.target.value)}
//                 className="w-full h-full pl-2 pr-8 border-0 border-r focus:ring-0 focus:outline-none border-border bg-transparent rounded-none"
//               />
//             </div>
//             {/* Location Input - 171px */}
//             <div className="w-[171px] h-12 relative flex items-center">
//               <MapPin className="absolute left-2 h-4 w-4 text-text-secondary pointer-events-none z-10" />
//               <Input
//                 type="text"
//                 placeholder={dict.locationPlaceholder || "Enter location"}
//                 value={location}
//                 onChange={(e) => onLocationChange(e.target.value)}
//                 className="w-full h-full pl-8 pr-2 border-0 focus:ring-0 focus:outline-none bg-transparent rounded-none"
//               />
//             </div>
//             {/* CTA Button */}
//             <Button
//               onClick={(e) => {
//                 e.preventDefault();
//                 handleSearch();
//               }}
//               className="min-w-[103px] h-[40px] ml-auto mr-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-3xl px-6 py-3 font-medium text-sm whitespace-nowrap"
//             >
//               {dict.search || "Search"}
//             </Button>
//             {/* Drop area hint */}
//             {isDragging && (
//               <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center pointer-events-none z-50">
//                 <p className="text-primary font-medium text-sm">{dict.dropResume || "Drop resume here"}</p>
//               </div>
//             )}
//           </div>

//           {/* Toggle Switches Container - Desktop */}
//           <div className="w-full h-6 flex justify-center items-center gap-8">
//             {/* Only Paid Ads Switch */}
//             <div className="flex items-center gap-2">
//               <Switch
//                 id="onlyPaidAds"
//                 checked={toggles.onlyPaidAds}
//                 onCheckedChange={(checked) => onToggleChange('onlyPaidAds', checked)}
//                 className="w-[40px] h-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#E4E8EE]"
//               />
//               <Label
//                 htmlFor="onlyPaidAds"
//                 className="text-sm font-medium text-text-primary cursor-pointer leading-none min-w-[91px] whitespace-nowrap"
//               >
//                 {dict.toggles.onlyPaidAds}
//               </Label>
//             </div>

//             {/* Exclude Headhunters Switch */}
//             <div className="flex items-center gap-2">
//               <Switch
//                 id="excludeHeadhunters"
//                 checked={toggles.excludeHeadhunters}
//                 onCheckedChange={(checked) => onToggleChange('excludeHeadhunters', checked)}
//                 className="w-[40px] h-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#E4E8EE]"
//               />
//               <Label
//                 htmlFor="excludeHeadhunters"
//                 className="text-sm font-medium text-text-primary cursor-pointer leading-none min-w-[184px] whitespace-nowrap"
//               >
//                 {dict.toggles.excludeHeadhunters}
//               </Label>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Layout */}
//       <div className="lg:hidden flex flex-col gap-4">
//         {/* Mobile Search Bar */}
//         <div 
//           className={`flex items-center bg-surface border rounded-lg shadow-sm transition-normal
//                       ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}`}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//         >
//           <button
//             type="button"
//             aria-label="Attach resume"
//             className="ml-3 w-6 h-6 flex items-center justify-center text-text-secondary hover:text-primary focus:outline-none transition-fast"
//             onClick={handleIconClick}
//           >
//             <Paperclip className="w-4 h-4" />
//             <input
//               ref={fileInputRef}
//               type="file"
//               className="hidden"
//               accept=".pdf,.doc,.docx,.txt"
//               onChange={handleFileChange}
//             />
//           </button>
          
//           <div className="flex-1 relative">
//             <Input
//               type="text"
//               placeholder={dict.searchPlaceholder || "Enter job title, skills, or company"}
//               value={searchQuery}
//               onChange={(e) => onSearchQueryChange(e.target.value)}
//               className="pl-3 h-12 border-0 focus:ring-0 bg-transparent"
//             />
//           </div>
          
//           {isDragging && (
//             <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center pointer-events-none z-50">
//               <p className="text-primary font-medium text-sm">{dict.dropResume || "Drop resume here"}</p>
//             </div>
//           )}
//         </div>
        
//         {/* Mobile Location Input */}
//         <div className="flex items-center bg-surface border rounded-lg shadow-sm">
//           <div className="flex-1 relative">
//             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none z-10" />
//             <Input
//               type="text"
//               placeholder={dict.locationPlaceholder || "Enter location"}
//               value={location}
//               onChange={(e) => onLocationChange(e.target.value)}
//               className="pl-10 h-12 border-0 focus:ring-0 bg-transparent"
//             />
//           </div>
//         </div>
        
//         {/* Mobile CTA Button */}
//         <Button
//           onClick={(e) => {
//             e.preventDefault();
//             onSearch?.();
//           }}
//           className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium"
//         >
//           {dict.search || "Search"}
//         </Button>
        
//         {/* Mobile Toggle Switches */}
//         <div className="space-y-3 pt-2">
//           <div className="flex items-center space-x-2">
//             <Switch
//               id="onlyPaidAds-mobile"
//               checked={toggles.onlyPaidAds}
//               onCheckedChange={(checked) => onToggleChange('onlyPaidAds', checked)}
//               className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
//             />
//             <Label htmlFor="onlyPaidAds-mobile" className="text-sm font-medium text-text-primary cursor-pointer">
//               {dict.toggles.onlyPaidAds}
//             </Label>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <Switch
//               id="excludeHeadhunters-mobile"
//               checked={toggles.excludeHeadhunters}
//               onCheckedChange={(checked) => onToggleChange('excludeHeadhunters', checked)}
//               className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
//             />
//             <Label htmlFor="excludeHeadhunters-mobile" className="text-sm font-medium text-text-primary cursor-pointer">
//               {dict.toggles.excludeHeadhunters}
//             </Label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 