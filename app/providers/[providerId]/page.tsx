import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeftIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { getProviderById, getOfferingsForProvider } from '@/lib/gpu-data';
import {
  calculateAverageAvailability,
  getAvailabilityBadge,
  getReliabilityBadge,
} from '@/lib/metrics';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type PageParams = {
  params: {
    providerId: string;
  };
};

export function generateMetadata({ params }: PageParams): Metadata {
  const provider = getProviderById(params.providerId);

  if (!provider) {
    return {
      title: 'Provider Not Found | GPU Router',
    };
  }

  return {
    title: `${provider.name} GPU Pricing & Coverage | GPU Router`,
    description: `Explore GPU availability, pricing, and regions offered by ${provider.name}.`,
  };
}

export default function ProviderDetailPage({ params }: PageParams) {
  const provider = getProviderById(params.providerId);

  if (!provider) {
    notFound();
  }

  const offerings = getOfferingsForProvider(provider.id);
  const reliability = getReliabilityBadge(provider.reliabilityTier);

  const lowestPrice = offerings.reduce<number | null>((min, offering) => {
    if (min === null || offering.pricing.pricePerHour < min) {
      return offering.pricing.pricePerHour;
    }
    return min;
  }, null);

  const highestPrice = offerings.reduce<number | null>((max, offering) => {
    if (max === null || offering.pricing.pricePerHour > max) {
      return offering.pricing.pricePerHour;
    }
    return max;
  }, null);

  const offeringsByGpu = offerings.reduce<
    Map<
      string,
      {
        gpuName: string;
        architecture: string;
        vram: number;
        vramType: string;
        entries: typeof offerings;
      }
    >
  >((map, offering) => {
    const key = offering.gpu.id;
    if (!map.has(key)) {
      map.set(key, {
        gpuName: offering.gpu.name,
        architecture: offering.gpu.architecture,
        vram: offering.gpu.vram,
        vramType: offering.gpu.vramType,
        entries: [],
      });
    }
    map.get(key)!.entries.push(offering);
    return map;
  }, new Map());

  const groupedOfferings = Array.from(offeringsByGpu.values()).map((group) => {
    const sortedByPrice = [...group.entries].sort(
      (a, b) => a.pricing.pricePerHour - b.pricing.pricePerHour,
    );
    const bestValue = [...group.entries].sort((a, b) => b.valueScore - a.valueScore)[0];
    const avgAvailability = calculateAverageAvailability(group.entries);
    const availability = getAvailabilityBadge(avgAvailability);

    return {
      ...group,
      cheapest: sortedByPrice[0],
      bestValue,
      availability,
      avgAvailability,
    };
  });

  const totalRegions = new Set([
    ...provider.regions,
    ...offerings.map((offering) => offering.pricing.region),
  ]).size;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <Link
          href="/providers"
          className="inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-900/60 px-3 py-2 text-gray-300 hover:text-white hover:border-gray-500"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to providers
        </Link>
        <span className="text-gray-600">/</span>
        <span className="capitalize">{provider.type}</span>
        <span className="text-gray-600">•</span>
        <span>{provider.supportLevel} support</span>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-950 to-gray-900 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-gray-700">
              <ServerIcon className="h-9 w-9 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{provider.name}</h1>
              <p className="text-sm text-gray-400">
                {provider.type.charAt(0).toUpperCase() + provider.type.slice(1)} provider •{' '}
                {provider.uptime}% uptime
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span
              className={`flex items-center gap-2 rounded-lg border px-3 py-1 ${reliability.className}`}
            >
              {reliability.icon} {reliability.label}
            </span>
            <span className="rounded-lg border border-gray-700 px-3 py-1 text-gray-300">
              Regions: {totalRegions}
            </span>
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
            >
              Visit website
              <GlobeAltIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Support Level</p>
            <p className="mt-2 text-2xl font-semibold text-white capitalize">
              {provider.supportLevel}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {provider.supportLevel === 'enterprise'
                ? '24/7 response times with dedicated TAMs'
                : provider.supportLevel === 'standard'
                  ? 'Business hours support with community slack'
                  : 'Community-driven support with slower SLA'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pricing Range</p>
            {lowestPrice !== null && highestPrice !== null ? (
              <p className="mt-2 text-2xl font-semibold text-white">
                {currencyFormatter.format(lowestPrice)} - {currencyFormatter.format(highestPrice)}
                <span className="text-sm text-gray-400 font-normal"> / hour</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">Pricing varies</p>
            )}
            <p className="mt-2 text-sm text-gray-400">
              {offerings.length} tracked offering{offerings.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">GPU Coverage</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {groupedOfferings.length}{' '}
              <span className="text-sm text-gray-400 font-normal">
                GPU{groupedOfferings.length === 1 ? '' : 's'}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {provider.features[0] ?? 'Specialized GPU workloads catered'}
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">Reliability</p>
            <p className="mt-2 text-2xl font-semibold text-white">{provider.uptime}%</p>
            <p className="mt-2 text-sm text-gray-400">
              {provider.reliabilityTier === 1
                ? 'Mission-critical ready with redundant capacity'
                : provider.reliabilityTier === 2
                  ? 'Balanced between cost and availability'
                  : 'Best for experimentation and burst workloads'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Tier</p>
              <p className="text-lg font-semibold text-white">
                {reliability.icon} {reliability.label}
              </p>
              <p className="text-sm text-gray-400">
                {provider.reliabilityTier === 1
                  ? 'Enterprise-grade SLAs and cluster redundancy'
                  : provider.reliabilityTier === 2
                    ? 'Solid track record with occasional maintenance windows'
                    : 'Community marketplace with variable availability'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <CpuChipIcon className="h-6 w-6 text-indigo-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Most Affordable GPU</p>
              {groupedOfferings.length > 0 ? (
                (() => {
                  const cheapestGroup = [...groupedOfferings].sort(
                    (a, b) =>
                      (a.cheapest?.pricing.pricePerHour ?? Infinity) -
                      (b.cheapest?.pricing.pricePerHour ?? Infinity),
                  )[0];

                  if (!cheapestGroup?.cheapest) {
                    return <p className="text-sm text-gray-500">Pricing unavailable</p>;
                  }

                  return (
                    <>
                      <p className="text-lg font-semibold text-white">
                        {currencyFormatter.format(cheapestGroup.cheapest.pricing.pricePerHour)} / hr
                      </p>
                      <p className="text-sm text-gray-400">{cheapestGroup.gpuName}</p>
                    </>
                  );
                })()
              ) : (
                <p className="text-sm text-gray-500">No tracked GPUs yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <div className="flex items-center gap-3">
            <ServerIcon className="h-6 w-6 text-blue-400" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Regions Covered</p>
              <p className="text-lg font-semibold text-white">{totalRegions} regions</p>
              <p className="text-sm text-gray-400">
                {provider.regions.slice(0, 3).join(', ')}
                {provider.regions.length > 3 ? '…' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-950 to-gray-900 p-6">
        <h2 className="text-xl font-semibold text-white">GPU Portfolio</h2>
        <p className="mt-1 text-sm text-gray-400">
          Drill into each GPU to compare configurations and pricing served by {provider.name}.
        </p>

        {groupedOfferings.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {groupedOfferings.map((group) => (
              <div
                key={group.gpuName}
                className="rounded-lg border border-gray-700 bg-gray-900/60 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/gpus/${group.entries[0].gpu.id}`}
                      className="text-lg font-semibold text-white hover:text-gray-200"
                    >
                      {group.gpuName}
                    </Link>
                    <p className="text-xs text-gray-400">
                      {group.architecture} • {group.vram}GB {group.vramType}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${group.availability.className}`}>
                    {group.availability.label}
                  </span>
                </div>

                {group.cheapest ? (
                  <div className="mt-4 space-y-2 text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Cheapest</span>
                      <span className="font-semibold text-white">
                        {currencyFormatter.format(group.cheapest.pricing.pricePerHour)} / hr
                      </span>
                    </div>
                    {group.bestValue && (
                      <div className="flex items-center justify-between">
                        <span>Best value score</span>
                        <span className="font-semibold text-white">
                          {group.bestValue.valueScore.toFixed(0)}/100
                        </span>
                      </div>
                    )}
                    {group.avgAvailability !== null && (
                      <div className="flex items-center justify-between">
                        <span>Avg availability</span>
                        <span className="text-gray-300">
                          {group.avgAvailability.toFixed(0)}/100
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500">
                    Pricing visibility pending for this GPU.
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-gray-700 bg-gray-900/50 p-6 text-sm text-gray-400">
            We have not indexed GPU offerings for {provider.name} yet. Check back soon or explore
            other providers.
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white">Platform Highlights</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {provider.features.map((feature) => (
            <div key={feature} className="rounded-lg border border-gray-700/60 bg-gray-900/60 p-4">
              <p className="text-sm text-gray-200">{feature}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-white">Support Regions</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {provider.regions.map((region) => (
              <span
                key={region}
                className="rounded-full border border-gray-700 bg-gray-900/70 px-3 py-1 text-xs text-gray-300"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
