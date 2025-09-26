// import api from '../axios'; // TODO: Uncomment when implementing actual API calls

export interface SearchHistoryItem {
  id: string;
  searchDetails: string;
  cvUploaded: string;
  cv: string;
  favoriteJobs: number;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  jobsListed: number;
  jobsFavorite: number;
}

export interface DashboardData {
  searchHistory: SearchHistoryItem[];
  companies: {
    existingClients: Company[];
    following: Company[];
    blacklist: Company[];
  };
}

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
}

/**
 * Fetch user profile data for welcome message
 * TODO: Implement actual API endpoint
 */
export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    // TODO: Replace with actual endpoint
    // const response = await api.get('/api/user/profile');
    // return response.data;
    
    // Placeholder implementation
    return {
      id: '1',
      email: 'dev@example.com',
      firstName: 'Dev',
      lastName: 'User',
      displayName: 'Admin',
    };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
}

/**
 * Fetch search history data
 * TODO: Implement actual API endpoint
 */
export async function fetchSearchHistory(): Promise<SearchHistoryItem[]> {
  try {
    // TODO: Replace with actual endpoint
    // const response = await api.get('/api/dashboard/search-history');
    // return response.data;
    
    // Placeholder implementation
    return [
      {
        id: '1',
        searchDetails: 'Daniel Wanja',
        cvUploaded: '24.6.2025',
        cv: 'download',
        favoriteJobs: 3,
      },
      {
        id: '2',
        searchDetails: 'Thanh Dung',
        cvUploaded: '24.6.2025',
        cv: 'download',
        favoriteJobs: 2,
      },
      {
        id: '3',
        searchDetails: 'Elektriker',
        cvUploaded: '23.6.2025',
        cv: '',
        favoriteJobs: 4,
      },
      {
        id: '4',
        searchDetails: 'Projektleiter',
        cvUploaded: '23.6.2025',
        cv: '',
        favoriteJobs: 2,
      },
      {
        id: '5',
        searchDetails: 'Kundenbetreuer',
        cvUploaded: '23.6.2025',
        cv: '',
        favoriteJobs: 1,
      },
    ];
  } catch (error) {
    console.error('Failed to fetch search history:', error);
    throw new Error('Failed to fetch search history');
  }
}

/**
 * Fetch companies data (existing clients, following, blacklist)
 * TODO: Implement actual API endpoint
 */
export async function fetchCompaniesData(): Promise<{
  existingClients: Company[];
  following: Company[];
  blacklist: Company[];
}> {
  try {
    // TODO: Replace with actual endpoint
    // const response = await api.get('/api/dashboard/companies');
    // return response.data;
    
    // Placeholder implementation
    return {
      existingClients: [
        {
          id: '1',
          name: 'KPMG',
          location: 'Berlin',
          jobsListed: 4,
          jobsFavorite: 2,
        },
        {
          id: '2',
          name: 'Autohaus Kramm GmbH',
          location: 'Berlin',
          jobsListed: 10,
          jobsFavorite: 1,
        },
        {
          id: '3',
          name: 'AlphaConsult KG',
          location: 'Berlin',
          jobsListed: 14,
          jobsFavorite: 5,
        },
        {
          id: '4',
          name: 'Pflegia GmbH',
          location: 'Berlin',
          jobsListed: 9,
          jobsFavorite: 4,
        },
        {
          id: '5',
          name: 'BAUER Elektroanlagen',
          location: 'Berlin',
          jobsListed: 6,
          jobsFavorite: 2,
        },
      ],
      following: [
        {
          id: '1',
          name: 'Marsh GmbH',
          location: 'Berlin',
          jobsListed: 10,
          jobsFavorite: 1,
        },
        {
          id: '2',
          name: 'Sales Passion GmbH',
          location: 'Berlin',
          jobsListed: 6,
          jobsFavorite: 3,
        },    
        {
          id: '3',
          name: 'Signal Iduna',
          location: 'Berlin',
          jobsListed: 9,
          jobsFavorite: 2,
        },
        {
          id: '4',
          name: 'ANH Hausbesitz GmbH',
          location: 'Berlin',
          jobsListed: 10,
          jobsFavorite: 3,
        },
        {
          id: '5',
          name: 'Apleona Nordost GmbH',
          location: 'Berlin',
          jobsListed: 12,
          jobsFavorite: 5,
        },
      ],
      blacklist: [
        {
          id: '1',
          name: 'Amazon',
          location: 'Berlin',
          jobsListed: 0,
          jobsFavorite: 0,
        },
        {
          id: '2',
          name: 'N26',
          location: 'Berlin',
          jobsListed: 0,
          jobsFavorite: 0,
        },
        {
          id: '3',
          name: 'Apple',
          location: 'Berlin',
          jobsListed: 0,
          jobsFavorite: 0,
        },
      ],
    };
  } catch (error) {
    console.error('Failed to fetch companies data:', error);
    throw new Error('Failed to fetch companies data');
  }
}

/**
 * Fetch complete dashboard data
 * TODO: Implement actual API endpoint or combine individual endpoints
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    // TODO: Replace with actual endpoint or combine calls
    // const response = await api.get('/api/dashboard');
    // return response.data;
    
    // Placeholder implementation using individual functions
    const [searchHistory, companies] = await Promise.all([
      fetchSearchHistory(),
      fetchCompaniesData(),
    ]);
    
    return {
      searchHistory,
      companies,
    };
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
} 