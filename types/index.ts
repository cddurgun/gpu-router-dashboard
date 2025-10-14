// GPU Router Types - October 2025

export interface GPU {
  id: string;
  name: string;
  generation: string;
  vendor: 'NVIDIA' | 'AMD' | 'Google' | 'Intel' | 'AWS';
  vram: number; // in GB
  vramType: string; // e.g., "HBM3e", "HBM2e", "GDDR6"
  tflops: {
    fp4?: number;
    fp8?: number;
    fp16: number;
    fp32: number;
    fp64?: number;
  };
  memoryBandwidth: number; // TB/s
  interconnect?: string; // e.g., "NVLink 5", "Infinity Fabric"
  powerDraw: number; // watts
  releaseYear: number;
  features: string[];
  architecture: string;
}

export interface Provider {
  id: string;
  name: string;
  type: 'hyperscaler' | 'specialized' | 'marketplace' | 'emerging';
  website: string;
  regions: string[];
  reliabilityTier: 1 | 2 | 3;
  uptime: number; // percentage
  features: string[];
  supportLevel: 'enterprise' | 'standard' | 'community';
}

export interface GPUPricing {
  gpuId: string;
  providerId: string;
  pricePerHour: number;
  priceType: 'on-demand' | 'spot' | 'reserved-1yr' | 'reserved-3yr';
  availability: 'high' | 'medium' | 'low' | 'waitlist';
  availabilityScore: number; // 0-100
  region: string;
  lastUpdated: string; // ISO date
  minCommitment?: string; // e.g., "1 hour", "1 month"
}

export interface GPUOffering {
  gpu: GPU;
  provider: Provider;
  pricing: GPUPricing;
  performanceScore: number;
  valueScore: number; // price/performance ratio
}

export interface WorkloadRequirement {
  type: 'training' | 'inference' | 'fine-tuning' | 'research' | 'other';
  modelSize?: string; // e.g., "70B", "13B"
  framework?: string; // e.g., "PyTorch", "TensorFlow", "JAX"
  minVram?: number;
  targetLatency?: number; // ms
  batchSize?: number;
  duration?: string; // e.g., "24 hours", "1 week"
  budgetPerHour?: number;
  multiGpu?: boolean;
  gpuCount?: number;
}

export interface Comparison {
  offerings: GPUOffering[];
  workload?: WorkloadRequirement;
  sortBy: 'price' | 'performance' | 'value' | 'availability';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    recommendations?: GPUOffering[];
    comparison?: Comparison;
  };
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Availability indicators
export type AvailabilityStatus = '✅' | '⚠️' | '❌' | '🔮';

// Performance tiers
export type PerformanceTier = '⚡' | '⚡⚡' | '⚡⚡⚡' | '⚡⚡⚡⚡' | '⚡⚡⚡⚡⚡';

// Value indicators
export type ValueIndicator = '💰' | '🎯' | '⚡' | '💎' | '🔬' | '🏢';
