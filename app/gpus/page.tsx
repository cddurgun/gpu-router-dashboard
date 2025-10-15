import { gpus, getOfferingsForGPU } from '@/lib/gpu-data';
import {
  calculateAverageAvailability,
  getAvailabilityBadge,
  getDistinctProviderCount,
  getLowestPrice,
} from '@/lib/metrics';
import { CpuChipIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { GPU } from '@/types';

export default function GPUsPage() {
  const nvidiaGPUs = gpus.filter((gpu) => gpu.vendor === 'NVIDIA');
  const amdGPUs = gpus.filter((gpu) => gpu.vendor === 'AMD');
  const vendorSections: {
    label: string;
    emoji: string;
    description: string;
    cardAccentClass: string;
    ctaClassName: string;
    gpus: GPU[];
  }[] = [
    {
      label: 'NVIDIA GPUs',
      emoji: '🟢',
      description: 'Industry-leading CUDA ecosystem',
      cardAccentClass: 'hover:border-green-500/50',
      ctaClassName: 'bg-green-600 hover:bg-green-500',
      gpus: nvidiaGPUs,
    },
    {
      label: 'AMD GPUs',
      emoji: '🔴',
      description: 'Strong memory capacity, ROCm ecosystem',
      cardAccentClass: 'hover:border-red-500/50',
      ctaClassName: 'bg-red-600 hover:bg-red-500',
      gpus: amdGPUs,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-green-600 flex items-center justify-center">
            <CpuChipIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">GPU Catalog</h1>
            <p className="text-gray-400">October 2025 Edition</p>
          </div>
        </div>
        <p className="text-gray-300 max-w-3xl">
          Complete catalog of available GPUs across cloud providers.
          From latest Blackwell B200 to proven Ampere A100.
        </p>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Total GPUs</p>
          <p className="text-2xl font-bold text-white">{gpus.length}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">NVIDIA</p>
          <p className="text-2xl font-bold text-green-400">{nvidiaGPUs.length}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">AMD</p>
          <p className="text-2xl font-bold text-red-400">{amdGPUs.length}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-1">Price Range</p>
          <p className="text-2xl font-bold text-gray-400">$0.45-$6.25</p>
        </div>
      </div>

      {vendorSections.map((section) => (
        <div key={section.label}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-2">{section.emoji}</span> {section.label}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{section.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.gpus.map((gpu) => {
              const offerings = getOfferingsForGPU(gpu.id);
              const averageAvailability = calculateAverageAvailability(offerings);
              const availability = getAvailabilityBadge(averageAvailability);
              const lowestPrice = getLowestPrice(offerings);
              const providerCount = getDistinctProviderCount(offerings);

              return (
                <div
                  key={gpu.id}
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5 transition-all ${section.cardAccentClass}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{gpu.name}</h3>
                      <p className="text-sm text-gray-400">
                        {gpu.generation} • {gpu.architecture}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${availability.className}`}>
                      {availability.label}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">VRAM</span>
                      <span className="text-white font-semibold">
                        {gpu.vram}GB {gpu.vramType}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">FP16 TFLOPS</span>
                      <span className="text-white font-semibold">
                        {gpu.tflops.fp16.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Memory BW</span>
                      <span className="text-white font-semibold">{gpu.memoryBandwidth} TB/s</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Power</span>
                      <span className="text-white font-semibold">{gpu.powerDraw}W</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {gpu.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        {lowestPrice !== null ? (
                          <>
                            <p className="text-xl font-bold text-white">
                              ${lowestPrice.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">
                              per hour • {providerCount} provider{providerCount !== 1 ? 's' : ''}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">Pricing TBD</p>
                        )}
                      </div>
                      <Link
                        href={`/gpus/${gpu.id}`}
                        className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors ${section.ctaClassName}`}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-3">GPU Selection Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-semibold text-white mb-1">🎯 For 7B-13B Models</p>
            <p>RTX 4090 24GB or A100 40GB. Best value and sufficient VRAM.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">🚀 For 70B Models</p>
            <p>MI300X 192GB (unquantized) or A100 80GB (quantized). H100 for speed.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">⚡ For Production</p>
            <p>H100/H200 for latency-critical. A100 for throughput-optimized batch.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-1">💰 Budget Options</p>
            <p>RTX 4090 @ $0.45-0.69/hr. A100 @ $0.89/hr for reliability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
