# Dekamond - Next.js Application

A modern, scalable, and maintainable Next.js application built with enterprise architecture.

## 🏗️ Architecture Overview

This project follows a **Domain-Driven Design (DDD)** approach with a **Feature-First** structure, ensuring scalability, maintainability, and developer experience.

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers and error boundary
│   ├── page.tsx           # Home page with auth routing
│   ├── login/             # Login page
│   └── dashboard/         # Dashboard page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── common/           # Shared components (ErrorBoundary, LoadingSpinner)
│   ├── features/         # Feature-specific components (auth, dashboard)
│   ├── providers/        # Context providers (QueryProvider)
│   └── layouts/          # Layout components
├── lib/                  # Core utilities and services
│   ├── api/              # API client with interceptors
│   ├── hooks/            # Custom React hooks (useRandomUser, useMobileVerification)
│   ├── services/         # Business logic services (userService)
│   ├── contexts/         # React contexts (UserContext)
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Application constants (validation, API endpoints)
│   └── utils/            # Utility functions
├── config/               # Configuration files
├── store/                # State management
├── styles/               # Global styles
└── assets/               # Static assets
```

## 🚀 Features

### ✅ **Core Features**

- **Next.js 15** with App Router
- **React 19** with latest features
- **TypeScript** with strict mode
- **Tailwind CSS v3** for styling
- **shadcn/ui** for beautiful components
- **TanStack Query** for server state management
- **Zod** for runtime validation
- **Husky** for Git hooks
- **ESLint** + **Prettier** for code quality

### 🎨 **UI/UX Features**

- **Responsive Design** for all devices
- **Accessible Components** following WCAG guidelines
- **Loading States** with custom LoadingSpinner component
- **Error Boundaries** for graceful error handling
- **Toast Notifications** system
- **Form Validation** with Zod schemas

### 🔧 **Developer Experience**

- **Hot Reload** for instant feedback
- **Type Safety** throughout the application
- **Code Formatting** on save
- **Pre-commit Hooks** for quality assurance
- **Comprehensive Error Handling**
- **Performance Monitoring** utilities
- **API Client** with interceptors and error handling

### 🛡️ **Production Ready**

- **SEO Optimized** with metadata
- **Performance Optimized** with Next.js features
- **Security Best Practices**
- **Error Boundaries** and fallbacks
- **Analytics Integration** ready
- **PWA Support** ready

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd dekamond

# Install dependencies
yarn install

# Start development server
yarn dev
```

## 🛠️ Development

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues
yarn format       # Format code with Prettier
yarn type-check   # Run TypeScript type checking
```

### Adding New Components

```bash
# Add shadcn/ui components
yarn dlx shadcn@latest add [component-name]

# Examples
yarn dlx shadcn@latest add button
yarn dlx shadcn@latest add input
yarn dlx shadcn@latest add dialog
```

## 🏛️ Project Structure Deep Dive

### `/src/components/`

Organized by responsibility and reusability:

- **`ui/`** - shadcn/ui components (buttons, inputs, cards, etc.)
- **`common/`** - Shared components (ErrorBoundary, LoadingSpinner)
- **`features/`** - Feature-specific components (MobileVerificationForm)
- **`providers/`** - Context providers (QueryProvider)
- **`layouts/`** - Layout components (header, sidebar, footer)

### `/src/lib/`

Core utilities and services:

- **`api/`** - API client with interceptors and error handling
- **`hooks/`** - Custom React hooks (useRandomUser, useMobileVerification)
- **`services/`** - Business logic services (userService)
- **`contexts/`** - React contexts (UserContext)
- **`types/`** - TypeScript type definitions
- **`constants/`** - Application constants (validation schemas, API endpoints)

### `/src/config/`

Configuration management:

- Environment variables
- Feature flags
- API endpoints
- App settings

### `/src/store/`

State management:

- Global state
- User preferences
- Theme management
- Notifications

## 🎯 Best Practices Implemented

### 1. **Type Safety**

- Comprehensive TypeScript types with strict mode
- Zod validation schemas for runtime type checking
- Generic utilities for type safety
- Type-safe API responses

### 2. **Code Organization**

- Feature-first architecture
- Clear separation of concerns
- Consistent naming conventions
- Modular component design

### 3. **Performance**

- Memoized components with React.memo
- Optimized re-renders with useMemo and useCallback
- Code splitting with dynamic imports
- Font optimization with display: swap
- DNS prefetching for external domains

### 4. **Error Handling**

- Error boundaries for React errors
- Comprehensive API error handling
- Graceful fallbacks
- User-friendly error messages

### 5. **Security**

- Input validation with Zod
- XSS protection
- CSRF protection
- Secure headers

### 6. **Accessibility**

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

### 7. **Testing Strategy**

- Unit tests for utilities
- Component testing
- Integration tests
- E2E testing ready

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_DARK_MODE_ENABLED=true

# External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- shadcn/ui theme integration
- Custom color palette
- Responsive breakpoints
- Animation utilities

### ESLint Configuration

Strict linting rules for:

- TypeScript best practices
- React hooks rules
- Import organization
- Code quality standards

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Docker

```dockerfile
# Build the application
docker build -t dekamond .

# Run the container
docker run -p 3000:3000 dekamond
```

## 📚 Documentation

### Component Documentation

Each component includes:

- Props interface with TypeScript
- Usage examples
- Accessibility notes
- Performance considerations

### API Documentation

Comprehensive API client with:

- Type-safe requests and responses
- Error handling with interceptors
- Retry logic and request deduplication
- Request/response interceptors

### Style Guide

Consistent styling with:

- Design tokens
- Component variants
- Responsive patterns
- Animation guidelines

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Commit Convention

```
type(scope): description

Examples:
feat(auth): add mobile verification functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
refactor(api): improve error handling in client
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Zod](https://zod.dev/) - Schema validation

---

**Built with ❤️**
