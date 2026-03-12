#!/bin/bash
# 🚀 Lexilogeion Quick Deploy Script

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🎉 Lexilogeion V4+ - Quick Deploy to Vercel              ║"
echo "║  📚 Production-Ready Greek Dictionary                      ║"
echo "╚════════════════════════════════════════════════════════════╝"

echo ""
echo "✅ Prerequisites Check:"
echo "  ☐ Node.js 18+ installed"
echo "  ☐ npm 9+ installed"
echo "  ☐ GitHub account with repository"
echo "  ☐ Vercel account (https://vercel.com)"
echo "  ☐ Firebase project created"

echo ""
echo "📋 Step 1: Setup Local Environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your Firebase credentials"
    echo "   Get them from: Firebase Console → Project Settings"
    exit 1
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🔧 Install Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install 2>&1 | tail -5

echo ""
echo "🏗️  Build Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run build 2>&1 | grep -E "✓|✕" | tail -3

echo ""
echo "📋 Step 2: Push to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Commands to run:"
echo ""
echo "  git init"
echo "  git add ."
echo "  git commit -m 'feat: initial commit - production ready'"
echo "  git remote add origin https://github.com/YOUR_USERNAME/lexilogeion.git"
echo "  git push -u origin main"
echo ""
echo "⚠️  Replace YOUR_USERNAME with your GitHub username"

echo ""
echo "📋 Step 3: Deploy to Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Option A: Automatic (Recommended)"
echo "  1. Go to https://vercel.com/import"
echo "  2. Import GitHub repository"
echo "  3. Set environment variables (same as .env.local)"
echo "  4. Click Deploy 🚀"
echo ""
echo "Option B: Manual via CLI"
echo "  npm i -g vercel"
echo "  vercel deploy --prod"

echo ""
echo "🎯 After Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Your app is live at: https://lexilogeion.vercel.app"
echo ""
echo "Automatic deployment is enabled:"
echo "  • Push to main → Automatic production deploy"
echo "  • Create PR → Preview deployment + tests"
echo ""
echo "Firebase Rules Deployment:"
echo "  firebase login"
echo "  firebase deploy --only database,storage"

echo ""
echo "📊 Development Workflow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  npm run dev       → Development server (http://localhost:3000)"
echo "  npm run build     → Production build"
echo "  npm run lint      → Code quality check"
echo "  npm test          → Run tests"
echo "  npm run format    → Format code"

echo ""
echo "📚 Documentation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📖 GETTING_STARTED.md  → Developer guide"
echo "  🚀 DEPLOYMENT.md       → Full deployment guide"
echo "  ✨ FEATURES.md         → 15+ feature descriptions"
echo "  📚 README.md           → Project overview"

echo ""
echo "🎉 Ready to deploy! Follow the steps above."
echo ""
