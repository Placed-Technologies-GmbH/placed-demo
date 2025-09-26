# Placed WebApp

A production-ready, scalable web application built with [Next.js 13+](https://nextjs.org/), TypeScript, and Supabase. Features comprehensive design token system, optimized font loading, robust error handling, and enterprise-grade architecture following strict modular principles.

---

## Architecture

The application follows a modular, feature-first architecture with enterprise-grade patterns:

- **App Router**: File-based routing using Next.js App Router with static generation
- **Design Token System**: Centralized semantic color, typography, and spacing tokens
- **Provider Architecture**: Layered providers for error boundaries, loading states, and notifications
- **i18n**: Dynamic `[lang]` routes with JSON dictionaries for multilingual support
- **State Management**: React Query for API data/state, Context API for global state.
- **Styling**: Tailwind CSS and [@shadcn/ui](https://ui.shadcn.com/) for atomic, accessible UI components.
- **API Integration**: All API calls use a centralized Axios instance.

---

## Features

### Core Functionality
- **Internationalization**: Dynamic language routing with English and German support
- **Authentication**: Supabase-powered with session management via React Context
- **Semantic UI**: Complete design token system with semantic color tokens
- **Error Handling**: Global error boundaries with user-friendly fallback pages

### Performance & UX
- **Font Optimization**: Preloaded custom fonts with optimized fallback stacks
- **Loading States**: Global loading provider with contextual feedback
- **Toast Notifications**: Comprehensive user feedback system for all interactions
- **Responsive Design**: Mobile-first approach with consistent breakpoints

### Developer Experience
- **Type Safety**: End-to-end TypeScript with strict configuration
- **Atomic Components**: Modular, reusable UI components with @shadcn/ui
- **Feature-First Structure**: Domain-based organization for easy scaling
- **Production Guards**: Development-only logging and debug information

---

## Design System

### Design Tokens
- **Colors**: 12 semantic color families (primary, secondary, accent, success, error, etc.)
- **Typography**: Custom FFF Acid Grotesk font with optimized loading
- **Spacing**: Consistent 8px grid system with semantic naming
- **Shadows**: Component-specific elevation system

### Component Library
- **Atomic UI**: Button, Input, Card, Label components with variant support
- **Layout**: Navigation, Error boundaries, Loading states
- **Forms**: Login, Demo signup with validation and error handling
- **Feedback**: Toast notifications, loading indicators, error pages

---

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase project (for authentication and future vector 
search)
- Python 3.8+ (for backend/ML/ETL integration, if needed)
- Modern browser with WOFF2 support

---

## Installation

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Create `.env.local` with your Supabase and API configuration
4. **Start development server**
   ```bash
   npm run dev
   ```

---

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint checks
npm run start    # Start production server
```

### Code Standards
- All components use semantic design tokens (no hardcoded colors)
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Development-only console statements

---

## Architecture Layers

### Provider Hierarchy
```tsx
ErrorBoundary
  └── ReactQueryProvider
      └── LoadingProvider
          └── ToastProvider
              └── AuthProvider
                  └── Application
```

### Data Flow
- User requests routed via App Router with language detection
- Authentication managed by Supabase with Context state
- API calls through centralized Axios instance with React Query
- UI feedback via Loading and Toast providers
- Error handling through Error Boundary with graceful fallbacks

---

## Directory Structure

```
placedwebapp/
├── src/
│   ├── app/
│   │   ├── [lang]/           # Language-specific routes
│   │   │   ├── demo/         # Demo signup page
│   │   │   ├── login/        # Authentication page
│   │   │   ├── search/       # Job search page (new feature)
│   │   │   └── dictionaries/ # Translation files
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── globals.css       # Design tokens and font definitions
│   ├── components/ui/        # Atomic UI components
│   │   ├── button.tsx        # Button with design token variants
│   │   ├── ErrorBoundary.tsx # Global error handling
│   │   ├── Nav.tsx           # Navigation component
│   │   └── search/           # Search UI components (JobCard, filters, etc.)
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx   # Authentication state
│   │   ├── LoadingProvider.tsx # Global loading states
│   │   └── ToastProvider.tsx # Notification system
│   ├── features/             # Domain-specific features
│   │   ├── auth/            # Login forms and auth logic
│   │   ├── demo/            # Demo signup functionality
│   │   └── search/          # Search logic and types (new feature)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and API clients
│   └── locales/             # Translation dictionaries
├── public/fonts/            # Custom font files
├── tailwind.config.js       # Design token configuration
└── package.json
```

- **New Feature:** Job search page available at `/[lang]/search` (e.g., `/en/search`).
  - Main logic: `src/features/search/`
  - UI: `src/components/ui/search/`
  - Route: `src/app/[lang]/search/`

---

## Notes

- All UI components use semantic design tokens for consistent theming
- Font loading optimized with preload hints and fallback stacks
- Error boundaries provide graceful degradation for any component failures
- Authentication ready for Supabase integration with session management
