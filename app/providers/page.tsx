import { providers, getOfferingsForProvider } from '@/lib/gpu-data';
import { calculateAverageAvailability, getAvailabilityBadge, getReliabilityBadge } from '@/lib/metrics';
import { ServerIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ProvidersPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-600 flex items-center justify-center">
            <ServerIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GPU Cloud Providers</h1>
            <p className="text-gray-400">Compare reliability, pricing, and availability</p>
          </div>
        </div>
        <p className="text-gray-300 max-w-3xl">
          Comprehensive comparison of GPU cloud providers as of October 2025.
          From hyperscalers to specialized platforms and emerging providers.
        </p>
      </div>

      {/* Provider Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-2">Specialized</h3>
          <p className="text-sm text-gray-400 mb-3">GPU-focused providers</p>
          <p className="text-3xl font-bold text-gray-400">
            {providers.filter(p => p.type === 'specialized').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-2">Hyperscalers</h3>
          <p className="text-sm text-gray-400 mb-3">AWS, GCP, Azure tier</p>
          <p className="text-3xl font-bold text-gray-400">
            {providers.filter(p => p.type === 'hyperscaler').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-2">Marketplaces</h3>
          <p className="text-sm text-gray-400 mb-3">P2P platforms</p>
          <p className="text-3xl font-bold text-green-400">
            {providers.filter(p => p.type === 'marketplace').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
          <h3 className="text-lg font-bold text-white mb-2">Emerging</h3>
          <p className="text-sm text-gray-400 mb-3">New platforms</p>
          <p className="text-3xl font-bold text-orange-400">
            {providers.filter(p => p.type === 'emerging').length}
          </p>
        </div>
      </div>

      {/* Providers List */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Providers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {providers.map((provider) => {
            const reliability = getReliabilityBadge(provider.reliabilityTier);
            const offerings = getOfferingsForProvider(provider.id);
            const lowestPrice = offerings.length > 0
              ? Math.min(...offerings.map(o => o.pricing.pricePerHour))
              : null;
            const averageAvailability = calculateAverageAvailability(offerings);
            const availability = getAvailabilityBadge(averageAvailability);

            return (
              <div
                key={provider.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-500/50 transition-all"
              >
                {/* Provider Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{provider.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-gray-700 text-gray-300 capitalize">
                        {provider.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md border font-semibold ${reliability.className}`}>
                        {reliability.icon} {reliability.label}
                      </span>
                    </div>
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-gray-300"
                    >
                      {provider.website}
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Uptime</p>
                    <p className="text-lg font-bold text-white">{provider.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Support</p>
                    <p className="text-lg font-bold text-white capitalize">{provider.supportLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Availability</p>
                    <p className="text-sm font-semibold text-white">
                      <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold ${availability.className}`}>
                        {availability.label}
                        {averageAvailability !== null && (
                          <span className="ml-2 text-gray-400 font-normal">
                            ({averageAvailability.toFixed(0)}/100)
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Regions */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Regions</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.regions.map((region) => (
                      <span
                        key={region}
                        className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-600"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Features</p>
                  <div className="space-y-1">
                    {provider.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Starting from</p>
                      {lowestPrice !== null ? (
                        <p className="text-2xl font-bold text-white">
                          ${lowestPrice.toFixed(2)}
                          <span className="text-sm text-gray-400 font-normal">/hr</span>
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">Pricing varies</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{offerings.length} GPU{offerings.length !== 1 ? 's' : ''}</p>
                      <Link
                        href={`/providers/${provider.id}`}
                        className="text-sm text-gray-400 hover:text-gray-300 font-medium"
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Tips */}
      <div className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-3">Choosing a Provider</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-semibold text-white mb-1">✅ Tier 1 Providers</p>
            <p>Best for production workloads. 99.9%+ uptime, enterprise support, proven reliability.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">⚠️ Tier 2/3 Providers</p>
            <p>Cost-effective for dev/testing. May have limited support or variable availability.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">💰 Marketplace Platforms</p>
            <p>Cheapest options via P2P. Great for experiments, but check reliability ratings.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">🚀 Emerging Providers</p>
            <p>Often competitive pricing with latest GPUs. Good if you can handle migration risk.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
