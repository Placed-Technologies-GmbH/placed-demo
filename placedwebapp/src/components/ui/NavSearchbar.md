# NavSearchbar Implementation

## Overview
The NavSearchbar is a persistent search component integrated into the InternalNavbar that maintains search state across navigation using a hybrid state management approach.

## Components Structure

### Core Files
- `src/context/SearchContext.tsx` - Global search state management with localStorage persistence
- `src/hooks/useSearchState.ts` - Custom hook for hybrid state logic
- `src/components/ui/NavSearchbar.tsx` - Main search bar component
- `src/components/ui/layouts/InternalNavbar.tsx` - Updated to include NavSearchbar

## State Management Strategy

### Hybrid Approach
- **Search Page (`/search`)**: URL parameters as source of truth
- **Job Details Page (`/job-details/[id]`)**: URL parameters as source of truth  
- **Other Pages**: Context + localStorage as source of truth
- **localStorage Expiration**: 5 hours for search context

### State Structure
```typescript
interface SearchState {
  keyword?: string;
  location?: string;
  fileId?: string;
  cvFileName?: string;
  timestamp: number; // for expiration check
}
```

## Component States

### 1. Default State (Clean Slate)
- **When**: No active search context OR on pages other than search/job-details
- **Display**: CV upload icon + "Title, Skill or Company" input + "Location" input + "Search" button
- **Dimensions**: 668px width × 56px height

### 2. Active State (Search Context Visible)
- **When**: On search page OR job-details page with active search parameters
- **Display**: Search summary text + "Clear" button
- **Text Examples**:
  - `"Jobs matched for CV of John Doe"`
  - `"developer in berlin"`
  - `"developer"` (keyword only)
  - `"berlin"` (location only)

## User Interaction Flows

### CV Upload Flow
1. User clicks CV upload icon → file picker opens
2. User selects file → immediately navigate to `/[lang]/search?fileId=[fileId]&cv=[fileName]`
3. Search page handles: file processing, loading animation, toast messages, job recommendations
4. If error: navigate to search page anyway, show error toast there

### Manual Search Flow
1. User enters keyword and/or location → clicks "Search" button
2. Navigate to `/[lang]/search?q=[keyword]&location=[location]`
3. Search bar switches to "Active State" on search page

### Clear Action Flow
1. User clicks "Clear" button
2. Stay on current page, remove search parameters from URL
3. Clear localStorage search context
4. Search bar returns to "Default State"

## Integration

### Provider Setup
The SearchProvider is integrated in the root layout:

```tsx
<SearchProvider>
  {children}
</SearchProvider>
```

### Navbar Integration
The NavSearchbar is centered in the InternalNavbar:

```tsx
{/* Search Bar - Center */}
<div className="flex-1 flex justify-center">
  <NavSearchbar />
</div>
```

## Usage

The NavSearchbar automatically:
- Detects current page type and shows appropriate state
- Manages search state persistence with 5-hour expiration
- Handles CV upload and manual search flows
- Provides clear functionality to reset search state

No additional configuration is required - it works automatically once integrated. 