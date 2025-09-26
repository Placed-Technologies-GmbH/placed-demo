  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        // Brand Colors - Updated to match new color scheme
        colors: {
          // Primary Brand Colors
          brand: {
            navy: '#050336',        // Work blue - brand logo colors and for brackets and avatars
            blue: '#AFCBFF',        // Placed blue for other buttons
            'pale-blue': '#F0F2FF', // Pale blue - accent colors
            yellow: '#E4FD57',      // Signal yellow for search buttons
          },
          
          // Primary Colors (using brand navy as primary)
          primary: {
            DEFAULT: '#050336',     // Brand navy
            foreground: '#FFFFFF',  // White text on navy
            black:'#000000'  // Black 
          },
          
          // Secondary Colors (using placed blue)
          secondary: {
            DEFAULT: '#AFCBFF',     // Placed blue
            foreground: '#101827',  // Primary text on blue
          },
          
          // Neutral Colors (using specified neutrals)
          neutral: {
            DEFAULT: '#6B7280',     // Secondary text
            50: '#F9FAFB',          // Background
            100: '#F0F2FF',         // Pale blue accent
            200: '#D1D5DB',         // Borders
            300: '#6B7280',         // Secondary text
            400: '#6B7280',         // Secondary text
            500: '#101827',         // Primary text
            600: '#101827',         // Primary text
            700: '#050336',         // Brand navy
            800: '#050336',         // Brand navy
            900: '#050336',         // Brand navy
          },
          
          // Semantic System Colors (using specified warning colors)
          success: {
            DEFAULT: '#17A34A',     // Success green
            foreground: '#FFFFFF',  // White text
          },
          
          warning: {
            DEFAULT: '#E4FD57',     // Warning yellow (signal yellow)
            foreground: '#101827',  // Primary text
          },
          
          error: {
            DEFAULT: '#DC2625',     // Error red
            foreground: '#FFFFFF',  // White text
          },
          
          info: {
            DEFAULT: '#2463EB',     // Info blue
            foreground: '#FFFFFF',  // White text
          },
          
          // Background Colors
          background: {
            DEFAULT: '#F9FAFB',     // Background
            muted: '#F0F2FF',       // Pale blue accent
            subtle: '#FFFFFF',      // White
          },
          
          // Surface Colors
          surface: {
            DEFAULT: '#FFFFFF',     // White
            elevated: '#FFFFFF',    // White
            overlay: 'rgba(5, 3, 54, 0.5)', // Brand navy with opacity
          },
          
          // Text Colors
          text: {
            primary: '#101827',     // Primary text
            secondary: '#6B7280',   // Secondary text
            muted: '#6B7280',       // Secondary text (same as secondary)
            inverse: '#FFFFFF',     // White
            'filter-header': '#212121', // Filter header text
            'filter-item': '#757575',   // Filter item text
          },
          
          // Border Colors
          border: {
            DEFAULT: '#D1D5DB',     // Borders
            light: '#F0F2FF',       // Pale blue accent
            medium: '#D1D5DB',      // Borders
            dark: '#6B7280',        // Secondary text
            filter: '#E0E0E0',      // Filter box borders
          },
          
          // Accent Colors (using pale blue)
          accent: {
            DEFAULT: '#F0F2FF',     // Pale blue accent
            foreground: '#101827',  // Primary text
            light: '#F0F2FF',       // Pale blue accent
            dark: '#AFCBFF',        // Placed blue
          },
          
          // Interactive Colors
          interactive: {
            DEFAULT: '#AFCBFF',     // Placed blue for buttons
            foreground: '#101827',  // Primary text
            hover: '#050336',       // Brand navy for hover
            muted: '#6B7280',       // Secondary text
            'muted-hover': '#101827', // Primary text
          },

          // CTA Colors (using signal yellow)
          cta: {
            DEFAULT: '#E4FD57',     // Signal yellow for search buttons
            foreground: '#101827',  // Primary text
            hover: '#AFCBFF',       // Placed blue for hover
            light: '#F0F2FF',       // Pale blue accent
            dark: '#050336',        // Brand navy
          },
          
          // Muted colors (using neutrals)
          muted: {
            DEFAULT: '#F0F2FF',     // Pale blue accent
            foreground: '#6B7280',  // Secondary text
          },
        },
        
        // Typography
        fontFamily: {
          // Primary font family for headings and display text - optimized fallback stack
          display: [
            'FFF Acid Grotesk',
            '"Helvetica Neue"',
            'Helvetica', 
            'Arial',
            'ui-sans-serif',
            'system-ui', 
            'sans-serif'
          ],
          // Body text font family - optimized fallback stack
          body: [
            'FFF Acid Grotesk',
            '"Helvetica Neue"',
            'Helvetica', 
            'Arial',
            'ui-sans-serif',
            'system-ui', 
            'sans-serif'
          ],
          // Custom brand font - FFF Acid Grotesk with better fallbacks
          grotesk: [
            'FFF Acid Grotesk',
            '"Helvetica Neue"',
            'Helvetica', 
            'Arial',
            'ui-sans-serif',
            'system-ui', 
            'sans-serif'
          ],
          // Fallback to Inter for specific cases where needed
          inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          // Monospace font for code
          mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'ui-monospace', 'monospace'],
        },
        
        fontSize: {
          // Display sizes
          'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          'display-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
          'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
          'display-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
          'display-sm': ['1.875rem', { lineHeight: '1.4' }],
          'display-xs': ['1.5rem', { lineHeight: '1.5' }],
          
          // Text sizes
          'text-xl': ['1.25rem', { lineHeight: '1.6' }],
          'text-lg': ['1.125rem', { lineHeight: '1.6' }],
          'text-md': ['1rem', { lineHeight: '1.6' }],
          'text-sm': ['0.875rem', { lineHeight: '1.5' }],
          'text-xs': ['0.75rem', { lineHeight: '1.4' }],
        },
        
        fontWeight: {
          'light': '300',
          'regular': '350',
          'medium': '500',
          'semibold': '600',
          'bold': '700',
          'extrabold': '800',
        },
        
        // Spacing Scale
        spacing: {
          '0.5': '0.125rem',  // 2px
          '1': '0.25rem',     // 4px
          '1.5': '0.375rem',  // 6px
          '2': '0.5rem',      // 8px
          '2.5': '0.625rem',  // 10px
          '3': '0.75rem',     // 12px
          '3.5': '0.875rem',  // 14px
          '4': '1rem',        // 16px
          '5': '1.25rem',     // 20px
          '6': '1.5rem',      // 24px
          '7': '1.75rem',     // 28px
          '8': '2rem',        // 32px
          '9': '2.25rem',     // 36px
          '10': '2.5rem',     // 40px
          '11': '2.75rem',    // 44px
          '12': '3rem',       // 48px
          '14': '3.5rem',     // 56px
          '16': '4rem',       // 64px
          '20': '5rem',       // 80px
          '24': '6rem',       // 96px
          '28': '7rem',       // 112px
          '32': '8rem',       // 128px
          '36': '9rem',       // 144px
          '40': '10rem',      // 160px
          '44': '11rem',      // 176px
          '48': '12rem',      // 192px
          '52': '13rem',      // 208px
          '56': '14rem',      // 224px
          '60': '15rem',      // 240px
          '64': '16rem',      // 256px
          '72': '18rem',      // 288px
          '80': '20rem',      // 320px
          '96': '24rem',      // 384px
          
          // Custom search bar specifications
          '[80px]': '80px',    // Container top position
          '[408px]': '408px',  // Container left position
          '[695px]': '695px',  // Search bar container width
          '[559px]': '559px',  // Toggle switches container width (updated)
          '[271px]': '271px',  // Search input width
          '[171px]': '171px',  // Location input width
          '[103px]': '103px',  // CTA button width (English)
          '[115px]': '115px',  // CTA button width (German)
          '[91px]': '91px',    // Only paid ads text container width
          '[184px]': '184px',  // Exclude headhunters text container width
          '[124px]': '124px',  // Exclude clients text container width
          '[139px]': '139px',  // Only paid ads switch width (legacy)
          '[232px]': '232px',  // Exclude headhunters switch width (legacy)
          '[172px]': '172px',  // Exclude clients switch width (legacy)
          '[40px]': '40px',    // Switch base width/CTA height
          '[32px]': '32px',    // Attachment pin size
          '[18px]': '18px',    // Switch dial width
          '[19.60px]': '19.60px', // Switch dial height
          
          // New job results container specifications
          '[950px]': '950px',  // Main results container width
          '[232px]': '232px',  // Container top position (from toggle switches)
          '[611px]': '611px',  // Jobs count/sort section width
          '[192px]': '192px',  // Job card height
          '[128px]': '128px',  // CTA button width in job card (English)
          '[140px]': '140px',  // CTA button width in job card (German)
        },
        
        // Border Radius
        borderRadius: {
          'none': '0',
          'xs': '0.125rem',   // 2px
          'sm': '0.375rem',   // 6px
          'md': '0.5rem',     // 8px
          'lg': '0.75rem',    // 12px
          'xl': '1rem',       // 16px
          '2xl': '1.5rem',    // 24px
          '3xl': '2rem',      // 32px
          'full': '9999px',
        },
        
        // Box Shadows
        boxShadow: {
          'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          'none': 'none',
          
          // Component-specific shadows
          'card': '0 2px 10px rgba(0, 0, 0, 0.1)',
          'dropdown': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'modal': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          'button': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        
        // Animation & Transitions
        transitionDuration: {
          'fast': '150ms',
          'normal': '250ms',
          'slow': '350ms',
          'slower': '500ms',
        },
        
        transitionTimingFunction: {
          'ease-smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
        
        // Z-Index Scale
        zIndex: {
          'dropdown': '1000',
          'sticky': '1010',
          'fixed': '1020',
          'modal-backdrop': '1030',
          'modal': '1040',
          'popover': '1050',
          'tooltip': '1060',
          'toast': '1070',
        },
        
        // Breakpoints (extending default)
        screens: {
          'xs': '475px',
          '3xl': '1920px',
        },
      },
    },
    plugins: [],
  } 