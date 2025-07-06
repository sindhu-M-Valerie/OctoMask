#!/bin/bash

echo "🎭 OctoMask GitHub Pages Setup Verification"
echo "==========================================="
echo ""

# Check if required files exist
echo "📋 Checking required files..."

files=(
    ".github/workflows/deploy-pages.yml"
    "CNAME" 
    "public/.nojekyll"
    "package.json"
    "webpack.config.js"
    "src/index.tsx"
    "deploy.sh"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done

echo ""
echo "🔧 Checking package.json scripts..."

if grep -q '"build":' package.json; then
    echo "✅ Build script found"
else
    echo "❌ Build script missing"
fi

if grep -q '"start":' package.json; then
    echo "✅ Start script found"
else
    echo "❌ Start script missing"
fi

echo ""
echo "🏗️ Testing build process..."

if npm run build > /dev/null 2>&1; then
    echo "✅ Build process works"
    
    # Check if required files are in dist
    if [ -f "dist/index.html" ]; then
        echo "✅ index.html generated"
    else
        echo "❌ index.html not generated"
    fi
    
    if [ -f "dist/bundle.js" ]; then
        echo "✅ bundle.js generated"
    else
        echo "❌ bundle.js not generated"
    fi
    
    if [ -f "dist/CNAME" ]; then
        echo "✅ CNAME copied to dist"
    else
        echo "❌ CNAME not copied to dist"
    fi
    
    if [ -f "dist/.nojekyll" ]; then
        echo "✅ .nojekyll copied to dist"
    else
        echo "❌ .nojekyll not copied to dist"
    fi
else
    echo "❌ Build process failed"
fi

echo ""
echo "🌐 Domain configuration..."

if [ -f "CNAME" ]; then
    domain=$(cat CNAME)
    echo "✅ Custom domain configured: $domain"
else
    echo "❌ CNAME file missing"
fi

echo ""
echo "📝 Next steps for GitHub Pages deployment:"
echo ""
echo "1. 📤 Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Setup GitHub Pages deployment'"
echo "   git push origin main"
echo ""
echo "2. ⚙️  Enable GitHub Pages:"
echo "   - Go to repository Settings > Pages"
echo "   - Select 'GitHub Actions' as source"
echo "   - The workflow will run automatically"
echo ""
echo "3. 🌐 Configure custom domain:"
echo "   - In Settings > Pages, add custom domain: octomask.io"
echo "   - Update DNS settings with your registrar"
echo "   - Enable 'Enforce HTTPS'"
echo ""
echo "4. 🎉 Your app will be live at:"
echo "   - https://sindhu-m-valerie.github.io/OctoMask"
echo "   - https://octomask.io (after DNS setup)"
echo ""
echo "🎭 Ready to deploy!"
