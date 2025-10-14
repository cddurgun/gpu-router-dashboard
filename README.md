# GPU Router Dashboard

**October 2025 Edition**

A modern Next.js 15 dashboard for comparing GPU cloud providers, pricing, and performance. Features an AI assistant powered by comprehensive GPU market knowledge.

## Features

- 🔍 **GPU Comparison**: Compare H100, B200, A100, MI300X and more across providers
- 💰 **Real-time Pricing**: October 2025 pricing data from Lambda Labs, RunPod, Vast.ai, and others
- 🤖 **AI Assistant**: Expert GPU advisor with comprehensive system prompt
- 📊 **Provider Analysis**: Reliability tiers, availability scores, and feature comparisons
- 🎨 **Modern UI**: Built with Next.js 15, TypeScript, and Tailwind CSS
- ⚡ **Fast**: Optimized with Turbopack and server components

## Tech Stack

- **Framework**: Next.js 15.5.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Deployment**: Vercel

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
gpu-router-dashboard/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage (Best Value & Fastest GPUs)
│   ├── chat/              # AI Assistant interface
│   ├── gpus/              # GPU catalog
│   ├── providers/         # Provider comparison
│   ├── api/chat/          # AI Assistant API route
│   └── layout.tsx         # Root layout with sidebar
├── components/            # Reusable components
│   └── Sidebar.tsx        # Navigation sidebar
├── lib/                   # Utilities and data
│   └── gpu-data.ts        # GPU, provider, and pricing data
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
└── public/                # Static assets
```

## Data (October 2025)

### GPU Pricing Highlights
- **Cheapest**: RTX 4090 24GB @ $0.45/hr (Vast.ai)
- **Best Value**: A100 80GB @ $0.89/hr (RunPod)
- **Fastest Available**: B200 192GB @ $3.99/hr (DataCrunch)
- **Latest Production**: H200 141GB @ $1.90/hr (Nebius)

### Providers Included
- Lambda Labs (Tier 1, 99.9% uptime)
- RunPod (Spot instances, community marketplace)
- Vast.ai (P2P marketplace, lowest prices)
- Nebius (Competitive H100/H200 pricing)
- CoreWeave (Enterprise Kubernetes)
- Modal (Serverless B200)
- DataCrunch (Lowest B200 pricing)
- Vultr/TensorWave (AMD MI300X)

## AI Assistant

The AI assistant uses a comprehensive system prompt covering:
- Cost optimization strategies
- Performance analysis by workload
- Provider comparison frameworks
- Workload-specific guidance (LLM training, inference, SDXL, etc.)
- Real-time October 2025 market data

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to project: `cd gpu-router-dashboard`
3. Run: `vercel`
4. Follow the prompts
5. Your dashboard will be live!

### Environment Variables

No environment variables required for the base deployment. The AI assistant currently uses local data processing.

## License

MIT License - feel free to use this project for your own GPU comparison needs.

---

**Note**: GPU pricing and availability change frequently. This dashboard reflects October 2025 data. Always verify current pricing with providers before deployment.
