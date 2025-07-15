// Logo configuration for the application
// This centralizes all logo paths and makes them easily configurable

export const LOGO_PATHS = {
  // Company logos (for job cards)
  company: {
    placed: {
      logomark: {
        blue: '/logos/Placed_Logomark_Blue.svg',
        white: '/logos/Placed_Logomark_White.svg',
      },
      logotype: {
        blue: '/logos/Placed_Logotype_Blue.svg',
        white: '/logos/Placed_Logotype_White.svg',
      },
      lockup: {
        blue: '/logos/Placed_LogoLockup_Blue.svg',
        white: '/logos/Placed_LogoLockup_White.svg',
      },
    },
  },
  
  // Job provider logos (for "Listed On" section)
  providers: {
    indeed: '/logos/providerlogos/indeed.svg',
    stepstone: '/logos/providerlogos/stepstone.svg',
    linkedin: '/logos/providerlogos/linkedin.svg',
    monster: '/logos/providerlogos/monster.svg',
  },
  
  // Default fallback logos
  defaults: {
    company: '/logos/Placed_Logomark_Blue.svg',
    provider: '/logos/providerlogos/indeed.svg',
  },
} as const;

// Helper functions for logo management
export const getCompanyLogo = (variant: 'logomark' | 'logotype' | 'lockup' = 'logomark', theme: 'blue' | 'white' = 'blue') => {
  return LOGO_PATHS.company.placed[variant][theme];
};

export const getProviderLogo = (provider: keyof typeof LOGO_PATHS.providers) => {
  return LOGO_PATHS.providers[provider] || LOGO_PATHS.defaults.provider;
};

export const getAllProviderLogos = () => {
  return Object.entries(LOGO_PATHS.providers).map(([key, src]) => ({
    src,
    alt: key.charAt(0).toUpperCase() + key.slice(1),
    provider: key,
  }));
};

// Company logo variants for mock data
export const getCompanyLogoVariants = () => [
  LOGO_PATHS.company.placed.logomark.blue,
  LOGO_PATHS.company.placed.logotype.blue,
  LOGO_PATHS.company.placed.lockup.blue,
]; 