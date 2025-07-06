#!/bin/bash

# OctoMask GitHub Pages Deployment Script
echo "🎭 OctoMask GitHub Pages Deployment"
echo "=================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run 'git init' and set up your repository first"
    exit 1
fi

# Check if origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ Error: No git origin set"
    echo "Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/sindhu-M-Valerie/OctoMask.git"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🚀 Pushing to GitHub..."
git add .
git commit -m "Deploy OctoMask to GitHub Pages"
git push origin main

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Go to your repository settings on GitHub"
echo "2. Navigate to Pages section"
echo "3. Select 'GitHub Actions' as source"
echo "4. Configure your custom domain (octomask.io)"
echo "5. Enable HTTPS enforcement"
echo ""
echo "Your app will be available at:"
echo "📱 https://sindhu-m-valerie.github.io/OctoMask"
echo "🌐 https://octomask.io (after DNS setup)"
echo ""
echo "🎭 Happy masking!"
