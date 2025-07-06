# 🎭 OctoMask - GitHub Pages Deployment Guide

This guide will help you deploy your OctoMask app to GitHub Pages with a custom `.io` domain.

## 🚀 Quick Setup

### Step 1: Repository Setup
1. **Push your code** to a GitHub repository
2. **Make sure** your repository is public (required for GitHub Pages on free accounts)
3. **Ensure** your main branch is named `main` or `master`

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will run automatically

### Step 3: Configure Custom Domain
1. **Purchase your `.io` domain** from a registrar like:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **Update DNS settings** in your domain registrar:
   ```
   Type: CNAME
   Name: www (or @)
   Value: sindhu-m-valerie.github.io
   ```

3. **Add A records** for apex domain:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

4. **Update CNAME file** (already configured as `octomask.io`)

### Step 4: Repository Settings
1. In your repository **Settings > Pages**
2. Under **Custom domain**, enter: `octomask.io`
3. Check **Enforce HTTPS**
4. Wait for DNS propagation (can take up to 24 hours)

## 📁 Project Structure

```
OctoMask/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml     # GitHub Actions workflow
├── src/
│   ├── index.tsx               # Main React app
│   ├── OctoMaskLogo.jsx        # Custom logo component
│   └── styles.css              # Styles and animations
├── public/
│   └── index.html              # HTML template
├── landing/                    # Landing page (optional)
├── dist/                       # Build output (auto-generated)
├── CNAME                       # Custom domain configuration
├── package.json                # Dependencies and scripts
└── webpack.config.js           # Build configuration
```

## 🛠️ Build Process

The GitHub Actions workflow automatically:
1. **Installs dependencies** with `npm ci`
2. **Builds the app** with `npm run build`
3. **Deploys to GitHub Pages** from the `dist` folder

## 🎯 Custom Domain Setup (octomask.io)

### DNS Configuration
Your domain needs these DNS records:

```bash
# A Records (for apex domain)
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153

# CNAME Record (for www subdomain)
www → yourusername.github.io
```

### Verification
Check if your domain is working:
```bash
# Check DNS propagation
dig octomask.io

# Check HTTPS certificate
curl -I https://octomask.io
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Preview build locally
npm run preview
```

## 📝 Deployment Checklist

- [ ] Repository is public
- [ ] Code pushed to main branch
- [ ] GitHub Actions workflow enabled
- [ ] Custom domain configured in repository settings
- [ ] DNS records updated with registrar
- [ ] HTTPS enforcement enabled
- [ ] Build successfully deployed

## 🌐 URLs

- **Repository**: `https://github.com/sindhu-M-Valerie/OctoMask`
- **GitHub Pages**: `https://sindhu-m-valerie.github.io/OctoMask`
- **Custom Domain**: `https://octomask.io` (when configured)

## 🚨 Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for TypeScript errors

### Custom Domain Not Working
- Verify DNS propagation (use `dig` command)
- Check CNAME file contains correct domain
- Ensure HTTPS enforcement is enabled
- Wait up to 24 hours for DNS changes

### 404 Errors
- Check `publicPath` in webpack config
- Verify build output in `dist` folder
- Ensure all assets are properly bundled

## 🎨 Customization

### Update Domain
1. Edit `CNAME` file with your domain
2. Update DNS settings
3. Configure in repository settings

### Modify Build
1. Edit `webpack.config.js` for build settings
2. Update `package.json` scripts if needed
3. Modify GitHub Actions workflow if necessary

## 📊 Performance

The built app includes:
- ✅ Minified JavaScript and CSS
- ✅ Optimized images and assets
- ✅ HTTPS encryption
- ✅ CDN delivery via GitHub Pages
- ✅ Responsive design for all devices

## 🔒 Security

- HTTPS enforced by default
- No sensitive data exposed
- Privacy-first design
- No tracking or analytics (by default)

## 📈 Analytics (Optional)

To add analytics, update `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify DNS settings
3. Test build locally
4. Check GitHub Pages status

---

**🎭 Happy masking with OctoMask!**
