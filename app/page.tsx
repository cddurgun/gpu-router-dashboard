import Link from 'next/link';
import { getBestValueGPUs, getFastestGPUs } from '@/lib/gpu-data';
import { CpuChipIcon, BoltIcon, CurrencyDollarIcon, ServerIcon } from '@heroicons/react/24/outline';

function getAvailabilityBadge(score: number) {
  if (score >= 80) return { text: '✅ High', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  if (score >= 50) return { text: '⚠️ Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
  return { text: '❌ Low', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
}

function getPerformanceIndicator(score: number) {
  if (score >= 80) return '⚡⚡⚡⚡⚡';
  if (score >= 60) return '⚡⚡⚡⚡';
  if (score >= 40) return '⚡⚡⚡';
  if (score >= 20) return '⚡⚡';
  return '⚡';
}

export default function HomePage() {
  const bestValueGPUs = getBestValueGPUs(6);
  const fastestGPUs = getFastestGPUs(6);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 border border-gray-500/30 p-8">
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
              <CpuChipIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">GPU Router</h1>
              <p className="text-gray-200">October 2025 Edition</p>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            Find the most optimal, cost-effective GPU solutions across multiple cloud providers.
            Compare H100, B200, A100, MI300X pricing, performance, and availability in real-time.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors"
            >
              <span>Talk to AI Assistant</span>
            </Link>
            <Link
              href="/gpus"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 border border-gray-700 transition-colors"
            >
              <span>Browse All GPUs</span>
            </Link>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-40 w-40 rounded-full bg-gray-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-40 w-40 rounded-full bg-gray-600/20 blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Cheapest GPU</p>
              <p className="text-2xl font-bold text-white mt-1">$0.45/hr</p>
              <p className="text-sm text-gray-500 mt-1">RTX 4090 • Vast.ai</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Fastest GPU</p>
              <p className="text-2xl font-bold text-white mt-1">B200</p>
              <p className="text-sm text-gray-500 mt-1">20 PFLOPS FP4</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <BoltIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Best Value</p>
              <p className="text-2xl font-bold text-white mt-1">A100 80GB</p>
              <p className="text-sm text-gray-500 mt-1">$0.89/hr • RunPod</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <CpuChipIcon className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Providers</p>
              <p className="text-2xl font-bold text-white mt-1">9+</p>
              <p className="text-sm text-gray-500 mt-1">Active platforms</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <ServerIcon className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Best Value GPUs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">💰</span> Best Value GPUs
            </h2>
            <p className="text-gray-400 text-sm mt-1">Optimal price-to-performance ratio</p>
          </div>
          <Link
            href="/gpus"
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bestValueGPUs.map((offering: any) => {
            const availability = getAvailabilityBadge(offering.pricing.availabilityScore);
            const performance = getPerformanceIndicator(offering.performanceScore);

            return (
              <div
                key={`${offering.gpu.id}-${offering.provider.id}-${offering.pricing.pricePerHour}`}
                className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-5 hover:border-gray-500/50 transition-all hover:shadow-lg hover:shadow-gray-500/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{offering.gpu.name}</h3>
                    <p className="text-sm text-gray-400">{offering.provider.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${availability.color}`}>
                    {availability.text}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">VRAM</span>
                    <span className="text-white font-semibold">{offering.gpu.vram}GB {offering.gpu.vramType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-white font-semibold">{performance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price Type</span>
                    <span className="text-white font-semibold capitalize">{offering.pricing.priceType}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">${offering.pricing.pricePerHour.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">per hour</p>
                    </div>
                    <Link
                      href={`/gpus/${offering.gpu.id}`}
                      className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fastest GPUs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">⚡</span> Fastest GPUs
            </h2>
            <p className="text-gray-400 text-sm mt-1">Highest performance for demanding workloads</p>
          </div>
          <Link
            href="/gpus"
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fastestGPUs.map((offering: any) => {
            const availability = getAvailabilityBadge(offering.pricing.availabilityScore);
            const performance = getPerformanceIndicator(offering.performanceScore);

            return (
              <div
                key={`${offering.gpu.id}-${offering.provider.id}-${offering.pricing.pricePerHour}`}
                className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 p-5 hover:border-gray-500/50 transition-all hover:shadow-lg hover:shadow-gray-500/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{offering.gpu.name}</h3>
                    <p className="text-sm text-gray-400">{offering.provider.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${availability.color}`}>
                    {availability.text}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">FP16 TFLOPS</span>
                    <span className="text-white font-semibold">{offering.gpu.tflops.fp16.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Memory BW</span>
                    <span className="text-white font-semibold">{offering.gpu.memoryBandwidth} TB/s</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-white font-semibold">{performance}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">${offering.pricing.pricePerHour.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">per hour</p>
                    </div>
                    <Link
                      href={`/gpus/${offering.gpu.id}`}
                      className="px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-semibold hover:bg-gray-500 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <div className="rounded-2xl bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Need Help Choosing?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Our AI assistant can help you find the perfect GPU for your workload, budget, and performance requirements.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center px-8 py-4 rounded-lg bg-gray-600 text-white font-semibold text-lg hover:bg-gray-500 transition-colors"
        >
          Start AI Consultation
        </Link>
      </div>
    </div>
  );
}
