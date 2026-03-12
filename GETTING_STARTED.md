# 🚀 Getting Started with Lexilogeion Development

## Prerequisites ✅

- Node.js 18+ ([download](https://nodejs.org))
- npm 9+ or yarn
- Git
- Firebase account (free tier)
- Code editor (VS Code recommended)

## Setup in 5 Minutes ⚡

### 1. Clone Repository
```bash
git clone https://github.com/your-org/lexilogeion.git
cd lexilogeion
npm install
```

### 2. Configure Firebase
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase project credentials
# Get these from Firebase Console → Project Settings
```

### 3. Start Development Server
```bash
npm run dev
# Opens http://localhost:3000
```

### 4. Make Your First Edit
Edit `src/app/page.tsx` - changes hot-reload instantly!

---

## Project Structure 📁

```
lexilogeion/
├── src/
│   ├── app/                    # Next.js 14 app router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── providers.tsx      # Context providers
│   │   └── auth/              # Auth pages
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layouts/           # Page layouts
│   │   ├── pages/             # Page-level components
│   │   ├── auth/              # Auth components
│   │   ├── error/             # Error handling
│   │   └── toast/             # Toast notifications
│   ├── lib/
│   │   ├── firebase.ts        # Firebase initialization
│   │   ├── context/           # React Context
│   │   └── stores/            # Zustand stores
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── utils/
│   │   └── errors.ts          # Error handling utilities
│   └── styles/
│       └── globals.css        # Global styles
├── public/                     # Static assets
├── .github/
│   └── workflows/             # GitHub Actions CI/CD
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind CSS config
├── next.config.js             # Next.js config
└── DEPLOYMENT.md              # Deployment guide
```

---

## Available Scripts 📜

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm start                # Run production build locally

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Testing
npm test                 # Run Jest tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # Coverage report

# Deployment
npm run deploy:prod      # Deploy to production
npm run deploy:preview   # Deploy preview
npm run analyze          # Analyze bundle size
```

---

## Feature Development Workflow 🔄

### 1. Create Feature Branch
```bash
git checkout -b feature/my-feature
```

### 2. Develop & Test Locally
```bash
npm run dev
# Make changes → Hot reload updates
npm test                 # Run tests
npm run lint             # Check linting
```

### 3. Commit & Push
```bash
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

### 4. Create Pull Request
- Go to GitHub → Create Pull Request
- CI/CD runs automatically:
  - ESLint check
  - TypeScript check
  - Tests
  - Production build
  - Lighthouse scores
  - Preview deployment

### 5. Merge to Main
Once approved and all checks pass:
```bash
# GitHub auto-merges or manual merge
git checkout main
git pull origin main
```

**Production deployment starts automatically! 🚀**

---

## Common Tasks 🛠️

### Add New Page
```bash
# Create route folder
mkdir src/app/new-page

# Create page.tsx
touch src/app/new-page/page.tsx

# Add content:
# export default function Page() { return <div>New Page</div> }
```

### Add New Component
```bash
# Create component file
touch src/components/MyComponent.tsx

# Export component:
# export function MyComponent() { return <div>...</div> }

# Use in page:
# import { MyComponent } from '@/components/MyComponent'
```

### Add New Type
```bash
# Edit src/types/index.ts
# Add your TypeScript interface
```

### Use Firebase in Component
```typescript
'use client'

import { useApp } from '@/lib/context/AppContext'

export function MyComponent() {
  const { currentUser, entries } = useApp()

  return <div>{currentUser?.username}</div>
}
```

### Show Toast Notification
```typescript
'use client'

import { useToastStore } from '@/lib/stores/toastStore'

export function MyComponent() {
  const showToast = useToastStore((state) => state.showToast)

  return (
    <button onClick={() => showToast('Hello! 👋', 'success')}>
      Click Me
    </button>
  )
}
```

---

## IDE Setup (VS Code) 🎨

### Recommended Extensions
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Thunder Client (REST API testing)
- Firebase Explorer

### Settings (.vscode/settings.json)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Testing Guide 🧪

### Unit Tests (Jest)
```typescript
// Example: src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright - Optional)
```bash
npx playwright install
npx playwright test
```

---

## Debugging 🐛

### Browser DevTools
- Open http://localhost:3000
- Press F12 → DevTools
- Console tab for errors
- React DevTools Extension recommended

### VSCode Debugger
```json
// .vscode/launch.json file created - press F5 to debug
```

### Firebase Emulator (Optional)
```bash
firebase emulators:start
# Uses local Firebase for testing
```

---

## Deployment Checklist ✅

Before merging to `main`:

- [ ] Code reviewed
- [ ] Tests passing
- [ ] No lint errors
- [ ] TypeScript strict mode passes
- [ ] Mobile responsive checked
- [ ] Accessibility check (keyboard nav, screen readers)
- [ ] Environment variables set in Vercel
- [ ] Firebase rules updated if needed

---

## Getting Help 🆘

1. **Read the docs**: Check [FEATURES.md](FEATURES.md) & [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Search issues**: GitHub Issues for similar problems
3. **Ask community**: Create GitHub Discussion
4. **Check examples**: Look at existing components for patterns

---

## Key Technologies 🔧

| Tech | Purpose | Version |
|------|---------|---------|
| Next.js | Framework | 14 |
| React | UI Library | 18 |
| TypeScript | Type Safety | 5.3 |
| Tailwind CSS | Styling | 3.4 |
| Firebase | Backend | 10.8 |
| Zustand | State Management | 4.4 |
| Jest | Testing | 29 |
| ESLint | Code Quality | 8 |

---

## Performance Tips 📊

- Use `next/image` for images
- Enable ISR (Incremental Static Regeneration)
- Lazy load components with `dynamic()`
- Monitor Core Web Vitals in Vercel dashboard
- Use production build locally: `npm run build && npm start`

---

## Security Notes 🔒

- Never commit `.env.local`
- Use GitHub Secrets for sensitive data
- Enable 2FA on GitHub & Firebase
- Rotate API keys regularly
- Review Firebase security rules
- Test XSS/CSRF protections

---

## Next Steps 🎯

1. ✅ Set up local environment
2. ✅ Create feature branch
3. ✅ Implement feature following patterns
4. ✅ Write tests
5. ✅ Create PR for review
6. ✅ Merge to main for auto-deployment

---

**Happy coding! 🚀**
