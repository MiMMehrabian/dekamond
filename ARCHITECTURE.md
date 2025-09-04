# Dekamond

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   └── dashboard/         # Dashboard page
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── features/         # Feature-specific components
│   ├── common/           # Common components (ErrorBoundary, LoadingSpinner)
│   ├── providers/        # Context providers
│   └── layouts/          # Layout components
├── lib/                  # Core utilities and business logic
│   ├── api/              # API client and configuration
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Business logic services
│   ├── contexts/         # React contexts
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Application constants
│   └── utils/            # Utility functions
├── config/               # Application configuration
├── store/                # State management (if needed)
├── styles/               # Global styles
└── assets/               # Static assets
```
