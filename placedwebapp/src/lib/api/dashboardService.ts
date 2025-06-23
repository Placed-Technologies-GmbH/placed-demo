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
      displayName: 'Dev',
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
        searchDetails: 'John Doe',
        cvUploaded: '12.3.2025',
        cv: 'download',
        favoriteJobs: 1,
      },
      {
        id: '2',
        searchDetails: 'Kristin Daume',
        cvUploaded: '12.3.2025',
        cv: 'download',
        favoriteJobs: 4,
      },
      {
        id: '3',
        searchDetails: 'Klempner',
        cvUploaded: '13.3.2025',
        cv: 'download',
        favoriteJobs: 2,
      },
      {
        id: '4',
        searchDetails: 'kloper dame',
        cvUploaded: '14.3.2025',
        cv: 'download',
        favoriteJobs: 2,
      },
      {
        id: '5',
        searchDetails: 'Monteur',
        cvUploaded: '15.3.2025',
        cv: '',
        favoriteJobs: 5,
      },
      {
        id: '6',
        searchDetails: 'Monteur',
        cvUploaded: '15.3.2025',
        cv: '',
        favoriteJobs: 5,
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
          name: 'Techo Electroners',
          location: 'Berlin',
          jobsListed: 4,
          jobsFavorite: 2,
        },
        {
          id: '2',
          name: 'N26',
          location: 'Berlin',
          jobsListed: 50,
          jobsFavorite: 10,
        },
        {
          id: '3',
          name: 'N26',
          location: 'Berlin',
          jobsListed: 20,
          jobsFavorite: 5,
        },
        {
          id: '4',
          name: 'N26',
          location: 'Berlin',
          jobsListed: 10,
          jobsFavorite: 4,
        },
        {
          id: '5',
          name: 'N26',
          location: 'Berlin',
          jobsListed: 25,
          jobsFavorite: 2,
        },
      ],
      following: [
        {
          id: '1',
          name: 'Tech Company A',
          location: 'Munich',
          jobsListed: 12,
          jobsFavorite: 5,
        },
        {
          id: '2',
          name: 'Tech Company B',
          location: 'Munich',
          jobsListed: 12,
          jobsFavorite: 5,
        },    
        {
          id: '3',
          name: 'Tech Company C',
          location: 'Munich',
          jobsListed: 12,
          jobsFavorite: 5,
        },
        {
          id: '4',
          name: 'Tech Company D',
          location: 'Munich',
          jobsListed: 12,
          jobsFavorite: 5,
        },
        {
          id: '5',
          name: 'Tech Company E',
          location: 'Munich',
          jobsListed: 12,
          jobsFavorite: 5,
        },
      ],
      blacklist: [
        {
          id: '1',
          name: 'Blocked Company',
          location: 'Hamburg',
          jobsListed: 0,
          jobsFavorite: 0,
        },
        {
          id: '2',
          name: 'Blocked Company',
          location: 'Hamburg',
          jobsListed: 0,
          jobsFavorite: 0,
        },
        {
          id: '3',
          name: 'Blocked Company',
          location: 'Hamburg',
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