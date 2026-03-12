# 🚀 Deployment Guide - Λεξιλόγειον

## Quick Start - One Command Deployment 🎯

### Prerequisites
- GitHub account with repository access
- Vercel account (free tier eligible)
- Firebase project set up

### Step 1: Connect Repository to Vercel

```bash
npm i -g vercel
vercel link
```

### Step 2: Set Environment Variables

Go to your Vercel project dashboard and add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 3: Deploy with One Command

```bash
# Deploy to production
npm run deploy:prod

# Or deploy preview
npm run deploy:preview
```

---

## GitHub Actions CI/CD Setup

### 1. Generate Vercel Token

- Go to https://vercel.com/account/tokens
- Create new token with "Full Access"

### 2. Add GitHub Secrets

In your GitHub repository settings:

```
VERCEL_TOKEN = <your_vercel_token>
VERCEL_ORG_ID = <your_org_id>
VERCEL_PROJECT_ID = <your_project_id>
```

Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from `.vercel/project.json`

### 3. Firebase Security Rules

Deploy Firestore/RTDB rules:

```bash
firebase deploy --only database
```

---

## Automated Deployment Flow

```
Your Code Commit
    ↓
GitHub Actions Triggered
    ↓
ESLint Check ✅
    ↓
TypeScript Check ✅
    ↓
Jest Tests ✅
    ↓
Production Build ✅
    ↓
Lighthouse Scoring ✅
    ↓
Deploy to Vercel ✅
    ↓
Live at your-domain.vercel.app
```

### What Triggers Deployment?

✅ **Push to `main` branch** → Auto-deploy to production
✅ **Pull Request** → Preview deployment + Lighthouse scores
✅ **Manual trigger** → Run workflow from GitHub Actions tab

---

## Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run development server
npm run dev

# Open http://localhost:3000 in browser
```

---

## Testing Before Deployment

```bash
# Run linter
npm run lint

# Type check
npm run type-check

# Run tests
npm test

# Build locally
npm run build

# Test production build
npm start
```

---

## Vercel Dashboard Tips 🎨

1. **Auto-redeployment**: Enabled by default on push to main
2. **Preview Deployments**: Every PR gets a unique URL
3. **Analytics**: Monitor performance, Core Web Vitals
4. **Edge Config**: Store feature flags without deployment
5. **Rollback**: Click "Rollback" on any previous deployment

---

## Database Deployment

### Firebase Realtime Database

```bash
# Validate rules
firebase rules:test

# Deploy rules
firebase deploy --only database

# Deploy storage rules
firebase deploy --only storage
```

### Backup & Recovery

```bash
# Export data
firebase database:get / > backup.json

# Restore data
firebase database:set / backup.json
```

---

## Monitoring & Logging

### Vercel Logs
```bash
vercel logs <deployment-url>
```

### Firebase Console
- https://console.firebase.google.com
- Check:
  - Authentication user stats
  - Database read/write counts
  - Cloud Storage usage
  - Real-time activity logs

### Error Tracking (Optional)
- Sentry integration available
- DataDog integration available
- LogRocket integration available

---

## Troubleshooting 🔧

### Build Failed?

```bash
# Clear cache
rm -rf .next
npm run build

# Check Node version
node --version  # Should be 18+

# Verify env variables
echo $NEXT_PUBLIC_FIREBASE_API_KEY
```

### Deployment Stuck?

1. Check GitHub Actions logs
2. Verify Vercel token is valid
3. Check Firebase connectivity
4. Review build logs in Vercel dashboard

### Performance Issues?

```bash
# Analyze bundle size
npm run analyze

# Check image optimization
npm run build -- --debug
```

---

## Secret Management Best Practices ✅

Never commit:
- `.env.local` (add to .gitignore ✓)
- Firebase service account keys
- API keys or credentials

Always use GitHub Secrets for CI/CD environment variables.

---

## Scaling Tips 📈

1. **Enable Vercel Pro** for better performance
2. **Use Edge Functions** for real-time routing
3. **Set up CDN caching** for static assets
4. **Use Firebase Blaze plan** for scaling
5. **Implement rate limiting** via middleware

---

