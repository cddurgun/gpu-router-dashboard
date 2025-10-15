import type { GPUOffering } from '@/types';

export interface AvailabilityBadge {
  label: string;
  className: string;
}

export function getAvailabilityBadge(score: number | null): AvailabilityBadge {
  if (score === null) {
    return {
      label: '❌ N/A',
      className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
  }

  if (score >= 80) {
    return {
      label: '✅ High',
      className: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
  }

  if (score >= 50) {
    return {
      label: '⚠️ Medium',
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };
  }

  return {
    label: '❌ Low',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
}

export function getPerformanceIndicator(score: number): string {
  if (score >= 80) return '⚡⚡⚡⚡⚡';
  if (score >= 60) return '⚡⚡⚡⚡';
  if (score >= 40) return '⚡⚡⚡';
  if (score >= 20) return '⚡⚡';
  return '⚡';
}

export function calculateAverageAvailability(offerings: GPUOffering[]): number | null {
  if (offerings.length === 0) return null;
  const total = offerings.reduce((sum, offering) => sum + offering.pricing.availabilityScore, 0);
  return total / offerings.length;
}

export function getLowestPrice(offerings: GPUOffering[]): number | null {
  if (offerings.length === 0) return null;
  return offerings.reduce(
    (min, offering) => Math.min(min, offering.pricing.pricePerHour),
    Infinity,
  );
}

export function getDistinctProviderCount(offerings: GPUOffering[]): number {
  const providerIds = new Set(offerings.map((offering) => offering.provider.id));
  return providerIds.size;
}

export interface ReliabilityBadge {
  label: string;
  className: string;
  icon: string;
}

export function getReliabilityBadge(tier: 1 | 2 | 3): ReliabilityBadge {
  if (tier === 1) {
    return {
      label: 'Tier 1',
      icon: '⭐⭐⭐',
      className: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
  }

  if (tier === 2) {
    return {
      label: 'Tier 2',
      icon: '⭐⭐',
      className: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };
  }

  return {
    label: 'Tier 3',
    icon: '⭐',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
}
