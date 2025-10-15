import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeftIcon,
  BoltIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import { getGPUById, getOfferingsForGPU } from '@/lib/gpu-data';
import {
  calculateAverageAvailability,
  getAvailabilityBadge,
  getDistinctProviderCount,
  getLowestPrice,
  getPerformanceIndicator,
} from '@/lib/metrics';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type PageParams = {
  params: {
    gpuId: string;
  };
};

export function generateMetadata({ params }: PageParams): Metadata {
  const gpu = getGPUById(params.gpuId);

  if (!gpu) {
    return {
      title: 'GPU Not Found | GPU Router',
    };
  }

  return {
    title: `${gpu.name} Pricing & Availability | GPU Router`,
    description: `Compare ${gpu.name} pricing, provider coverage, and availability across the GPU Router network.`,
  };
}

export default function GPUDetailPage({ params }: PageParams) {
  const gpu = getGPUById(params.gpuId);

  if (!gpu) {
    notFound();
  }

  const offerings = getOfferingsForGPU(gpu.id);
  const averageAvailability = calculateAverageAvailability(offerings);
  const availabilityBadge = getAvailabilityBadge(averageAvailability);
  const providerCount = getDistinctProviderCount(offerings);
  const lowestPrice = getLowestPrice(offerings);
  const performanceScore = offerings[0]?.performanceScore ?? 0;
  const performanceIndicator = getPerformanceIndicator(performanceScore);

  const offeringsByPrice = [...offerings].sort(
    (a, b) => a.pricing.pricePerHour - b.pricing.pricePerHour,
  );
  const offeringsByValue = [...offerings].sort((a, b) => b.valueScore - a.valueScore);
  const offeringsByAvailability = [...offerings].sort(
    (a, b) => b.pricing.availabilityScore - a.pricing.availabilityScore,
  );

  const cheapestOffering = offeringsByPrice[0];
  const bestValueOffering = offeringsByValue[0];
  const highestAvailabilityOffering = offeringsByAvailability[0];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <Link
          href="/gpus"
          className="inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900/60 px-3 py-2 text-gray-300 hover:text-white hover:border-gray-500"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to catalog
        </Link>
        <span className="text-gray-600">/</span>
        <span>{gpu.vendor}</span>
        <span className="text-gray-600">•</span>
        <span>{gpu.generation}</span>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-950 to-gray-900 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700">
              <CpuChipIcon className="h-9 w-9 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{gpu.name}</h1>
              <p className="text-sm text-gray-400">
                {gpu.architecture} • Released {gpu.releaseYear}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span
              className={`flex items-center gap-2 rounded-lg border px-3 py-1 ${availabilityBadge.className}`}
            >
              Availability: {availabilityBadge.label}
              {averageAvailability !== null && (
                <span className="text-gray-400 text-xs font-normal">
                  ({averageAvailability.toFixed(0)}/100)
                </span>
              )}
            </span>
            <span className="rounded-lg border border-gray-700 px-3 py-1 text-gray-300">
              Providers: {providerCount}
            </span>
            <span className="rounded-lg border border-gray-700 px-3 py-1 text-gray-300">
              Performance: {performanceIndicator}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">VRAM</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {gpu.vram}GB <span className="text-sm text-gray-400">{gpu.vramType}</span>
            </p>
            <p className="mt-2 text-sm text-gray-400">Memory Bandwidth: {gpu.memoryBandwidth} TB/s</p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Compute</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {gpu.tflops.fp16.toLocaleString()} TFLOPS
            </p>
            <p className="mt-2 text-sm text-gray-400">FP16 • Transformer Engine support</p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Power Draw</p>
            <p className="mt-2 text-2xl font-semibold text-white">{gpu.powerDraw}W</p>
            {gpu.interconnect && (
              <p className="mt-2 text-sm text-gray-400">{gpu.interconnect}</p>
            )}
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pricing Window</p>
            {lowestPrice !== null ? (
              <p className="mt-2 text-2xl font-semibold text-white">
                {currencyFormatter.format(lowestPrice)}
                <span className="text-sm text-gray-400 font-normal"> / hour</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No public pricing</p>
            )}
            <p className="mt-2 text-sm text-gray-400">
              {offerings.length} tracked offering{offerings.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Cheapest Option</p>
              {cheapestOffering ? (
                <>
                  <p className="text-lg font-semibold text-white">
                    {currencyFormatter.format(cheapestOffering.pricing.pricePerHour)} / hr
                  </p>
                  <p className="text-sm text-gray-400">
                    {cheapestOffering.provider.name} • {cheapestOffering.pricing.region}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Pricing data not available</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <BoltIcon className="h-6 w-6 text-indigo-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Best Value</p>
              {bestValueOffering ? (
                <>
                  <p className="text-lg font-semibold text-white">
                    {currencyFormatter.format(bestValueOffering.pricing.pricePerHour)} / hr
                  </p>
                  <p className="text-sm text-gray-400">
                    {bestValueOffering.provider.name} • Value score{' '}
                    {bestValueOffering.valueScore.toFixed(0)}/100
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Value insights unavailable</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <ServerIcon className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Highest Availability</p>
              {highestAvailabilityOffering ? (
                <>
                  <p className="text-lg font-semibold text-white">
                    {highestAvailabilityOffering.provider.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {highestAvailabilityOffering.pricing.region} •{' '}
                    {highestAvailabilityOffering.pricing.availabilityScore}/100 score
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No availability signals yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-950 to-gray-900 p-6">
        <h2 className="text-xl font-semibold text-white">Provider Offerings</h2>
        <p className="mt-1 text-sm text-gray-400">
          All tracked pricing for {gpu.name}. Sorted by hourly cost by default.
        </p>

        {offerings.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Provider
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Region
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Price / hr
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Price Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Availability
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {offeringsByPrice.map((offering) => {
                  const badge = getAvailabilityBadge(offering.pricing.availabilityScore);
                  return (
                    <tr key={`${offering.provider.id}-${offering.pricing.region}-${offering.pricing.priceType}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Link
                          href={`/providers/${offering.provider.id}`}
                          className="text-sm font-semibold text-white hover:text-gray-200"
                        >
                          {offering.provider.name}
                        </Link>
                        <p className="text-xs text-gray-400 capitalize">
                          {offering.provider.type} provider
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{offering.pricing.region}</td>
                      <td className="px-4 py-3 text-sm text-white font-semibold">
                        {currencyFormatter.format(offering.pricing.pricePerHour)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300 capitalize">
                        {offering.pricing.priceType.replace('-', ' ')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        <span className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-semibold ${badge.className}`}>
                          {badge.label}
                          <span className="text-gray-400 font-normal">
                            ({offering.pricing.availabilityScore}/100)
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {new Date(offering.pricing.lastUpdated).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-gray-700 bg-gray-900/50 p-6 text-sm text-gray-400">
            We do not have public pricing for this GPU yet. Check back soon or explore providers for
            related GPUs.
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white">Workload Guidance</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700/60 bg-gray-900/60 p-4">
            <h3 className="text-sm font-semibold text-white">Ideal Workloads</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>• Large-scale transformer training with {gpu.vram}GB VRAM requirements</li>
              <li>• Mixed-precision training leveraging FP8/FP16 throughput</li>
              <li>• Multi-node deployments requiring {gpu.interconnect ?? 'high-bandwidth interconnects'}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-700/60 bg-gray-900/60 p-4">
            <h3 className="text-sm font-semibold text-white">Considerations</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li>• Power draw of {gpu.powerDraw}W may require dedicated circuits</li>
              <li>• Availability varies by provider; reserve instances for long training runs</li>
              <li>• Validate framework support ({gpu.vendor === 'AMD' ? 'ROCm' : 'CUDA'} stacks)</li>
            </ul>
          </div>
        </div>
        {gpu.features.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-white">Key Features</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {gpu.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-gray-700 bg-gray-900/70 px-3 py-1 text-xs text-gray-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
