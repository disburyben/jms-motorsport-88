# Deployment Guide

This guide covers deploying your racing team website to popular hosting platforms.

## Prerequisites

Before deploying, ensure you have:
- A GitHub, GitLab, or Bitbucket repository with your code
- A Supabase project set up (if using backend features)
- All environment variables ready

## Deploying to Vercel

### Option 1: Using Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to link your project
4. Deploy with `vercel --prod`

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect the framework (Vite/React)
5. Add environment variables if needed:
   - `VITE_SUPABASE_URL` (if using Supabase)
   - `VITE_SUPABASE_ANON_KEY` (if using Supabase)
6. Click "Deploy"

## Deploying to Netlify

### Option 1: Using Netlify CLI
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run `netlify init` in your project directory
3. Follow the prompts to create a new site
4. Deploy with `netlify deploy --prod`

### Option 2: Using Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider and select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables if needed:
   - `VITE_SUPABASE_URL` (if using Supabase)
   - `VITE_SUPABASE_ANON_KEY` (if using Supabase)
6. Click "Deploy site"

## Environment Variables

If you're using Supabase or other external services, you'll need to set up environment variables:

### For Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### For Netlify:
1. Go to "Site settings" → "Environment variables"
2. Add your variables with the same names as above

## Custom Domain

### Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Netlify:
1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Update your DNS records as instructed

## Admin Access

Your site has an admin panel accessible via the `?admin=true` URL parameter:
- Example: `https://your-domain.com?admin=true`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test navigation and routing
- [ ] Check responsive design on mobile devices
- [ ] Verify image loading from Figma assets
- [ ] Test contact form functionality
- [ ] Confirm Supabase connection (if applicable)
- [ ] Set up custom domain
- [ ] Configure SSL certificate (usually automatic)
- [ ] Test admin panel access

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:
- Push to your `main` branch to trigger a production deployment
- Push to other branches to create preview deployments
- Pull requests automatically generate preview URLs

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node version compatibility (use Node 18+)
- Review build logs for specific errors

### Images Not Loading
- Ensure Figma assets are properly imported
- Check that image paths are correct
- Verify asset URLs are accessible

### Routing Issues
- Ensure the rewrite rules in `vercel.json` or `netlify.toml` are configured
- This ensures that all routes redirect to `index.html` for client-side routing

## Support

For platform-specific issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
