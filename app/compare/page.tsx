'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowsRightLeftIcon,
  CpuChipIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { gpus, getGPUById, getOfferingsForGPU } from '@/lib/gpu-data';
import { getAvailabilityBadge } from '@/lib/metrics';
import type { GPUOffering } from '@/types';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export default function ComparePage() {
  const sortedGpuOptions = useMemo(
    () =>
      [...gpus].sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true })),
    [],
  );

  const [selectedGpuId, setSelectedGpuId] = useState(sortedGpuOptions[0]?.id ?? '');

  const selectedGpu = useMemo(
    () => (selectedGpuId ? getGPUById(selectedGpuId) : undefined),
    [selectedGpuId],
  );

  const offerings = useMemo(() => {
    if (!selectedGpuId) return [] as GPUOffering[];
    const data = getOfferingsForGPU(selectedGpuId);
    return [...data].sort(
      (a, b) => a.pricing.pricePerHour - b.pricing.pricePerHour,
    );
  }, [selectedGpuId]);

  const bestValue =
    offerings.length > 0
      ? [...offerings].sort((a, b) => b.valueScore - a.valueScore)[0]
      : undefined;
  const lowestCost = offerings[0];
  const highestAvailability =
    offerings.length > 0
      ? [...offerings].sort(
          (a, b) => b.pricing.availabilityScore - a.pricing.availabilityScore,
        )[0]
      : undefined;

  const allOfferings = useMemo(
    () =>
      gpus
        .map((gpu) => getOfferingsForGPU(gpu.id))
        .flat()
        .filter(Boolean),
    [],
  );

  const providerComparisons = useMemo(() => {
    const map = new Map<
      string,
      { provider: GPUOffering['provider']; offerings: GPUOffering[] }
    >();

    allOfferings.forEach((offering) => {
      if (!offering?.provider) return;
      const existing = map.get(offering.provider.id);
      if (existing) {
        existing.offerings.push(offering);
      } else {
        map.set(offering.provider.id, {
          provider: offering.provider,
          offerings: [offering],
        });
      }
    });

    return Array.from(map.values())
      .map(({ provider, offerings }) => ({
        provider,
        offerings: [...offerings].sort(
          (a, b) => a.pricing.pricePerHour - b.pricing.pricePerHour,
        ),
      }))
      .sort((a, b) => a.provider.name.localeCompare(b.provider.name));
  }, [allOfferings]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-indigo-600 flex items-center justify-center">
              <ArrowsRightLeftIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Compare GPUs</h1>
              <p className="text-gray-400">
                Evaluate pricing, availability, and value across providers for the same GPU.
              </p>
            </div>
          </div>
          <div className="hidden md:block text-xs text-gray-500">
            Updated: October 2025 • Data sourced from provider pricing pages
          </div>
        </div>
      </div>

      {/* GPU Selector */}
      <div className="bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <CpuChipIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Choose a GPU</h2>
            <p className="text-sm text-gray-400">
              We will compare the selected GPU across every provider we track.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              GPU Model
            </span>
            <select
              value={selectedGpuId}
              onChange={(event) => setSelectedGpuId(event.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-900/80 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortedGpuOptions.map((gpuOption) => (
                <option key={gpuOption.id} value={gpuOption.id}>
                  {gpuOption.vendor} • {gpuOption.name} ({gpuOption.vram}GB {gpuOption.vramType})
                </option>
              ))}
            </select>
          </label>

          {selectedGpu && (
            <>
              <div className="rounded-lg border border-gray-700 bg-gray-900/60 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Architecture
                </p>
                <p className="text-sm font-semibold text-white">
                  {selectedGpu.architecture}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedGpu.generation} • {selectedGpu.releaseYear}
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-gray-900/60 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  Performance Snapshot
                </p>
                <p className="text-sm text-gray-300">
                  FP16: <span className="font-semibold text-white">{selectedGpu.tflops.fp16.toLocaleString()} TFLOPS</span>
                </p>
                {selectedGpu.tflops.fp8 && (
                  <p className="text-sm text-gray-300">
                    FP8: <span className="font-semibold text-white">{selectedGpu.tflops.fp8.toLocaleString()} TFLOPS</span>
                  </p>
                )}
                <p className="text-sm text-gray-300">
                  Memory BW: <span className="font-semibold text-white">{selectedGpu.memoryBandwidth} TB/s</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Lowest Hourly Cost
          </p>
          {lowestCost ? (
            <>
              <p className="text-2xl font-bold text-green-400">
                {currencyFormatter.format(lowestCost.pricing.pricePerHour)}
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {lowestCost.provider.name} • {lowestCost.pricing.region}
              </p>
              <a
                href={lowestCost.provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-xs font-semibold text-green-400 hover:text-green-300"
              >
                Visit provider <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500">No active pricing for this GPU.</p>
          )}
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Best Value Score
          </p>
          {bestValue ? (
            <>
              <p className="text-2xl font-bold text-indigo-400">
                {bestValue.valueScore.toFixed(0)} / 100
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {bestValue.provider.name} • {currencyFormatter.format(bestValue.pricing.pricePerHour)}/hr
              </p>
              <a
                href={bestValue.provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Visit provider <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500">We need at least one provider to calculate value.</p>
          )}
        </div>

        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Highest Availability
          </p>
          {highestAvailability ? (
            <>
              <p className="text-2xl font-bold text-blue-400">
                {highestAvailability.pricing.availabilityScore}/100
              </p>
              <p className="text-sm text-gray-300 mt-1">
                {highestAvailability.provider.name} • {highestAvailability.pricing.availability}
              </p>
              <a
                href={highestAvailability.provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                Visit provider <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
              </a>
            </>
          ) : (
            <p className="text-sm text-gray-500">Availability data will appear when providers are listed.</p>
          )}
        </div>
      </div>

      {/* Provider comparison table */}
      <div className="rounded-xl border border-gray-700 bg-gradient-to-bl from-gray-950 to-gray-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Provider Comparison</h2>
            <p className="text-sm text-gray-400">
              Cross-reference official pricing pages, regions, and commitment requirements.
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Showing {offerings.length} provider{offerings.length === 1 ? '' : 's'}
          </span>
        </div>

        {offerings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-900/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Hourly Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Pricing Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {offerings.map((offering) => {
                  const badge = getAvailabilityBadge(offering.pricing.availabilityScore);
                  return (
                    <tr
                      key={`${offering.provider.id}-${offering.pricing.priceType}-${offering.pricing.region}-${offering.pricing.pricePerHour}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          {offering.provider.name}
                        </div>
                        <div className="text-xs text-gray-400 capitalize mt-1">
                          {offering.provider.type} • {offering.provider.supportLevel} support
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={offering.provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-200"
                        >
                          {offering.provider.website.replace(/^https?:\/\//, '')}
                          <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                        {currencyFormatter.format(offering.pricing.pricePerHour)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                        {offering.pricing.priceType.replace('-', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {offering.pricing.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center border ${badge.className}`}>
                          {badge.label}
                          <span className="ml-2 text-gray-400">
                            ({offering.pricing.availabilityScore}/100)
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
          <div className="p-6 text-sm text-gray-400">
            We do not have pricing data for the selected GPU yet. Try choosing a different GPU.
          </div>
        )}
      </div>

      {/* Provider coverage cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Provider Coverage Overview</h2>
        <p className="text-sm text-gray-400">
          Compare how each provider positions their GPU catalog, including hourly rates and availability.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {providerComparisons.map(({ provider, offerings }) => {
            const availabilityAverages =
              offerings.length > 0
                ? Math.round(
                    offerings.reduce(
                      (sum, current) => sum + current.pricing.availabilityScore,
                      0,
                    ) / offerings.length,
                  )
                : 0;

            return (
              <div
                key={provider.id}
                className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-950 to-gray-900 p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">
                      {provider.type} • {provider.supportLevel} support
                    </p>
                  </div>
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-indigo-300 hover:text-indigo-200"
                  >
                    Website
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                  </a>
                </div>

                <div className="flex items-center justify-between mb-4 text-xs text-gray-400 uppercase tracking-wide">
                  <span>{offerings.length} GPU{offerings.length === 1 ? '' : 's'}</span>
                  <span>Avg availability: {availabilityAverages || 'N/A'}/100</span>
                </div>

                <div className="space-y-3 flex-1">
                  {offerings.slice(0, 5).map((offering) => {
                    const badge = getAvailabilityBadge(offering.pricing.availabilityScore);
                    return (
                      <div
                        key={`${provider.id}-${offering.gpu.id}-${offering.pricing.priceType}`}
                        className="border border-gray-700/60 rounded-lg bg-gray-900/60 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {offering.gpu.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {offering.gpu.vram}GB • {offering.gpu.architecture}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-green-400">
                            {currencyFormatter.format(offering.pricing.pricePerHour)}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                          <span className="capitalize">
                            {offering.pricing.priceType.replace('-', ' ')} •{' '}
                            {offering.pricing.region}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-md font-semibold border ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {offerings.length > 5 && (
                  <p className="mt-3 text-xs text-gray-500">
                    +{offerings.length - 5} additional offering
                    {offerings.length - 5 === 1 ? '' : 's'} tracked.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature callouts */}
      {selectedGpu && (
        <div className="rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Why teams choose the {selectedGpu.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedGpu.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 rounded-full border border-gray-700 bg-gray-900/80 text-xs text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
