# Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
5. Click "Deploy"
6. Your dashboard will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to project directory
cd gpu-router-dashboard

# Login to Vercel
vercel login

# Deploy
vercel

# Or deploy to production directly
vercel --prod
```

The CLI will guide you through the deployment process and provide a URL when complete.

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Build Locally

```bash
# Create production build
npm run build

# Test production build locally
npm start

# Visit http://localhost:3000
```

## Environment Variables

No environment variables are required for the basic deployment. The app uses static data from `lib/gpu-data.ts`.

### Optional: Connect to External API

If you want to connect the AI assistant to an external API (e.g., Anthropic Claude):

1. Add to Vercel environment variables:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

2. Update `app/api/chat/route.ts` to use the API

## Post-Deployment

### Custom Domain

1. Go to your project on Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Analytics

Vercel automatically provides:
- **Web Analytics**: Real-time visitor data
- **Speed Insights**: Core Web Vitals tracking

Enable in Project Settings → Analytics

## Troubleshooting

### Build Fails

1. Check Node.js version: `node -v` (should be 18+)
2. Clear cache: `rm -rf .next && npm run build`
3. Check ESLint errors: `npm run lint`

### Pages Not Loading

1. Check build logs for errors
2. Verify all pages are in `app/` directory
3. Check for missing dependencies: `npm install`

### API Route Not Working

1. Verify route is in `app/api/` directory
2. Check for TypeScript errors
3. Review Vercel function logs in dashboard

## Performance Optimization

The dashboard is already optimized with:
- ✅ Static generation for fast page loads
- ✅ Server components for reduced client bundle
- ✅ Turbopack for faster builds
- ✅ Automatic code splitting

Additional optimizations:
- Enable caching for API routes if adding external data
- Use Vercel Edge Functions for lowest latency
- Implement ISR (Incremental Static Regeneration) for real-time pricing

## Monitoring

Monitor your deployment:
- **Vercel Dashboard**: Real-time logs and metrics
- **Build Logs**: Check deployment status
- **Function Logs**: Debug API routes
- **Analytics**: Track user engagement

## Updating Data

To update GPU pricing/availability:
1. Edit `lib/gpu-data.ts`
2. Commit changes
3. Push to repository
4. Vercel auto-deploys on push

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: Check build logs in Vercel dashboard

---

**Ready to deploy? Run `vercel` in your terminal!**
