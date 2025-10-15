// GPU Router Data - October 2025
import { GPU, Provider, GPUPricing, GPUOffering } from '@/types';

export const gpus: GPU[] = [
  // NVIDIA Blackwell Generation
  {
    id: 'nvidia-b200',
    name: 'B200',
    generation: 'Blackwell',
    vendor: 'NVIDIA',
    vram: 192,
    vramType: 'HBM3e',
    tflops: {
      fp4: 20000,
      fp8: 10000,
      fp16: 5000,
      fp32: 2500,
    },
    memoryBandwidth: 8.0,
    interconnect: 'NVLink 5 (1.8TB/s)',
    powerDraw: 1000,
    releaseYear: 2024,
    features: ['Dual-die GB100', 'FP4 support', 'Transformer Engine', 'MIG capable'],
    architecture: 'GB100',
  },
  // NVIDIA Hopper Generation
  {
    id: 'nvidia-h200',
    name: 'H200',
    generation: 'Hopper',
    vendor: 'NVIDIA',
    vram: 141,
    vramType: 'HBM3e',
    tflops: {
      fp8: 3958,
      fp16: 1979,
      fp32: 67,
      fp64: 34,
    },
    memoryBandwidth: 4.8,
    interconnect: 'NVLink 4 (900GB/s)',
    powerDraw: 700,
    releaseYear: 2023,
    features: ['Transformer Engine', 'MIG capable', '141GB VRAM', 'FP8 support'],
    architecture: 'GH100',
  },
  {
    id: 'nvidia-h100-80gb',
    name: 'H100 80GB',
    generation: 'Hopper',
    vendor: 'NVIDIA',
    vram: 80,
    vramType: 'HBM3',
    tflops: {
      fp8: 3958,
      fp16: 1979,
      fp32: 67,
      fp64: 34,
    },
    memoryBandwidth: 3.35,
    interconnect: 'NVLink 4 (900GB/s)',
    powerDraw: 700,
    releaseYear: 2022,
    features: ['Transformer Engine', 'MIG capable', 'Industry standard', 'FP8 support'],
    architecture: 'GH100',
  },
  // NVIDIA Ada/Ampere
  {
    id: 'nvidia-l40s',
    name: 'L40S',
    generation: 'Ada',
    vendor: 'NVIDIA',
    vram: 48,
    vramType: 'GDDR6',
    tflops: {
      fp8: 733,
      fp16: 366,
      fp32: 91.6,
    },
    memoryBandwidth: 0.864,
    powerDraw: 350,
    releaseYear: 2023,
    features: ['Inference optimized', 'RT cores', 'NVENC/NVDEC'],
    architecture: 'Ada Lovelace',
  },
  {
    id: 'nvidia-a100-80gb',
    name: 'A100 80GB',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 80,
    vramType: 'HBM2e',
    tflops: {
      fp16: 312,
      fp32: 19.5,
      fp64: 9.7,
    },
    memoryBandwidth: 2.0,
    interconnect: 'NVLink 3 (600GB/s)',
    powerDraw: 400,
    releaseYear: 2020,
    features: ['MIG capable', 'Mature ecosystem', 'Workhorse GPU', 'Proven reliability'],
    architecture: 'GA100',
  },
  {
    id: 'nvidia-a100-40gb',
    name: 'A100 40GB',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 40,
    vramType: 'HBM2',
    tflops: {
      fp16: 312,
      fp32: 19.5,
      fp64: 9.7,
    },
    memoryBandwidth: 1.6,
    interconnect: 'NVLink 3 (600GB/s)',
    powerDraw: 400,
    releaseYear: 2020,
    features: ['MIG capable', 'Cost-effective', 'Good for LoRA'],
    architecture: 'GA100',
  },
  // Consumer/Prosumer
  {
    id: 'nvidia-rtx-4090',
    name: 'RTX 4090',
    generation: 'Ada',
    vendor: 'NVIDIA',
    vram: 24,
    vramType: 'GDDR6X',
    tflops: {
      fp16: 165.2,
      fp32: 82.6,
    },
    memoryBandwidth: 1.008,
    powerDraw: 450,
    releaseYear: 2022,
    features: ['Best value', 'RT cores', 'DLSS 3', 'Consumer GPU'],
    architecture: 'Ada Lovelace',
  },
  {
    id: 'nvidia-rtx-4080',
    name: 'RTX 4080',
    generation: 'Ada',
    vendor: 'NVIDIA',
    vram: 16,
    vramType: 'GDDR6X',
    tflops: {
      fp16: 121.7,
      fp32: 60.85,
    },
    memoryBandwidth: 0.736,
    powerDraw: 320,
    releaseYear: 2022,
    features: ['RT cores', 'DLSS 3', 'Energy efficient', 'Consumer GPU'],
    architecture: 'Ada Lovelace',
  },
  {
    id: 'nvidia-rtx-3090',
    name: 'RTX 3090',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 24,
    vramType: 'GDDR6X',
    tflops: {
      fp16: 71,
      fp32: 35.5,
    },
    memoryBandwidth: 0.936,
    powerDraw: 350,
    releaseYear: 2020,
    features: ['24GB VRAM', 'Legacy consumer', 'RT cores'],
    architecture: 'GA102',
  },
  {
    id: 'nvidia-a40',
    name: 'A40',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 48,
    vramType: 'GDDR6',
    tflops: {
      fp16: 149.7,
      fp32: 37.4,
    },
    memoryBandwidth: 0.696,
    powerDraw: 300,
    releaseYear: 2020,
    features: ['48GB VRAM', 'Professional', 'RT cores', 'Inference'],
    architecture: 'GA102',
  },
  {
    id: 'nvidia-rtx-a6000',
    name: 'RTX A6000',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 48,
    vramType: 'GDDR6',
    tflops: {
      fp16: 154.8,
      fp32: 38.7,
    },
    memoryBandwidth: 0.768,
    powerDraw: 300,
    releaseYear: 2020,
    features: ['48GB VRAM', 'Professional', 'RT cores', 'Workstation'],
    architecture: 'GA102',
  },
  {
    id: 'nvidia-l4',
    name: 'L4',
    generation: 'Ada',
    vendor: 'NVIDIA',
    vram: 24,
    vramType: 'GDDR6',
    tflops: {
      fp8: 242,
      fp16: 121,
      fp32: 30.3,
    },
    memoryBandwidth: 0.3,
    powerDraw: 72,
    releaseYear: 2023,
    features: ['Ultra-efficient', 'Inference optimized', 'Low power', '72W TDP'],
    architecture: 'Ada Lovelace',
  },
  {
    id: 'nvidia-a10g',
    name: 'A10G',
    generation: 'Ampere',
    vendor: 'NVIDIA',
    vram: 24,
    vramType: 'GDDR6',
    tflops: {
      fp16: 125,
      fp32: 31.2,
    },
    memoryBandwidth: 0.6,
    powerDraw: 150,
    releaseYear: 2021,
    features: ['AWS optimized', 'Inference', 'RT cores', 'Cost-effective'],
    architecture: 'GA102',
  },
  {
    id: 'nvidia-v100',
    name: 'V100',
    generation: 'Volta',
    vendor: 'NVIDIA',
    vram: 32,
    vramType: 'HBM2',
    tflops: {
      fp16: 125,
      fp32: 15.7,
      fp64: 7.8,
    },
    memoryBandwidth: 0.9,
    powerDraw: 300,
    releaseYear: 2017,
    features: ['Legacy', 'HBM2', 'Tensor cores', 'FP64 support'],
    architecture: 'GV100',
  },
  {
    id: 'nvidia-t4',
    name: 'T4',
    generation: 'Turing',
    vendor: 'NVIDIA',
    vram: 16,
    vramType: 'GDDR6',
    tflops: {
      fp16: 65,
      fp32: 8.1,
    },
    memoryBandwidth: 0.32,
    powerDraw: 70,
    releaseYear: 2018,
    features: ['Low cost', 'Inference', 'Legacy', '70W TDP'],
    architecture: 'TU104',
  },
  {
    id: 'nvidia-rtx-6000-ada',
    name: 'RTX 6000 Ada',
    generation: 'Ada',
    vendor: 'NVIDIA',
    vram: 48,
    vramType: 'GDDR6',
    tflops: {
      fp16: 182.5,
      fp32: 91.1,
    },
    memoryBandwidth: 0.96,
    powerDraw: 300,
    releaseYear: 2023,
    features: ['Professional', '48GB VRAM', 'RT cores', 'Ada architecture', 'Workstation'],
    architecture: 'Ada Lovelace',
  },
  // AMD CDNA 3
  {
    id: 'amd-mi350x',
    name: 'MI350X',
    generation: 'CDNA 3',
    vendor: 'AMD',
    vram: 288,
    vramType: 'HBM3E',
    tflops: {
      fp8: 5300,
      fp16: 2650,
      fp32: 163,
      fp64: 81.7,
    },
    memoryBandwidth: 6.0,
    interconnect: 'Infinity Fabric',
    powerDraw: 750,
    releaseYear: 2025,
    features: ['Massive VRAM', 'ROCm 7', 'Competitive inference', 'Latest AMD'],
    architecture: 'CDNA 3',
  },
  {
    id: 'amd-mi325x',
    name: 'MI325X',
    generation: 'CDNA 3',
    vendor: 'AMD',
    vram: 256,
    vramType: 'HBM3E',
    tflops: {
      fp8: 5200,
      fp16: 2600,
      fp32: 163,
      fp64: 81.7,
    },
    memoryBandwidth: 6.0,
    interconnect: 'Infinity Fabric',
    powerDraw: 750,
    releaseYear: 2024,
    features: ['Large VRAM', 'ROCm 6/7', 'Limited availability'],
    architecture: 'CDNA 3',
  },
  {
    id: 'amd-mi300x',
    name: 'MI300X',
    generation: 'CDNA 3',
    vendor: 'AMD',
    vram: 192,
    vramType: 'HBM3',
    tflops: {
      fp8: 5300,
      fp16: 2600,
      fp32: 163,
      fp64: 81.7,
    },
    memoryBandwidth: 5.3,
    interconnect: 'Infinity Fabric',
    powerDraw: 750,
    releaseYear: 2023,
    features: ['Strong memory', 'ROCm maturing', 'Cost-effective VRAM'],
    architecture: 'CDNA 3',
  },
  // AMD CDNA 2
  {
    id: 'amd-mi210',
    name: 'MI210',
    generation: 'CDNA 2',
    vendor: 'AMD',
    vram: 64,
    vramType: 'HBM2e',
    tflops: {
      fp16: 181,
      fp32: 45.3,
      fp64: 22.6,
    },
    memoryBandwidth: 1.6,
    interconnect: 'Infinity Fabric',
    powerDraw: 300,
    releaseYear: 2021,
    features: ['64GB VRAM', 'Cost-effective AMD', 'HPC capable', 'Legacy CDNA'],
    architecture: 'CDNA 2',
  },
];

export const providers: Provider[] = [
  {
    id: 'lambda-labs',
    name: 'Lambda Labs',
    type: 'specialized',
    website: 'https://lambdalabs.com',
    regions: ['US-West', 'US-East', 'US-Central', 'EU-West'],
    reliabilityTier: 1,
    uptime: 99.9,
    features: ['Researcher-focused', 'Simple pricing', 'Great docs', 'Popular'],
    supportLevel: 'standard',
  },
  {
    id: 'runpod',
    name: 'RunPod',
    type: 'specialized',
    website: 'https://runpod.io',
    regions: ['US', 'EU', 'APAC'],
    reliabilityTier: 2,
    uptime: 99.5,
    features: ['Spot instances', 'Community marketplace', 'Kubernetes', 'Flexible'],
    supportLevel: 'community',
  },
  {
    id: 'vast-ai',
    name: 'Vast.ai',
    type: 'marketplace',
    website: 'https://vast.ai',
    regions: ['Global'],
    reliabilityTier: 3,
    uptime: 98.0,
    features: ['P2P marketplace', 'Cheapest options', 'Variable reliability', 'Community'],
    supportLevel: 'community',
  },
  {
    id: 'nebius',
    name: 'Nebius',
    type: 'emerging',
    website: 'https://nebius.com',
    regions: ['US', 'EU'],
    reliabilityTier: 2,
    uptime: 99.5,
    features: ['Competitive H100 pricing', 'Former Yandex Cloud', 'Growing'],
    supportLevel: 'standard',
  },
  {
    id: 'coreweave',
    name: 'CoreWeave',
    type: 'specialized',
    website: 'https://coreweave.com',
    regions: ['US-East', 'US-West', 'EU-West'],
    reliabilityTier: 1,
    uptime: 99.95,
    features: ['Enterprise-grade', 'Kubernetes-native', 'Early B200 access', 'High-performance'],
    supportLevel: 'enterprise',
  },
  {
    id: 'modal',
    name: 'Modal',
    type: 'emerging',
    website: 'https://modal.com',
    regions: ['US'],
    reliabilityTier: 1,
    uptime: 99.9,
    features: ['Serverless', 'Pay-per-second', 'Auto-scaling', 'Developer-focused', 'B200 available'],
    supportLevel: 'standard',
  },
  {
    id: 'datacrunch',
    name: 'DataCrunch',
    type: 'specialized',
    website: 'https://datacrunch.io',
    regions: ['EU'],
    reliabilityTier: 2,
    uptime: 99.0,
    features: ['Lowest B200 pricing', 'European', 'Growing'],
    supportLevel: 'standard',
  },
  {
    id: 'vultr',
    name: 'Vultr',
    type: 'hyperscaler',
    website: 'https://vultr.com',
    regions: ['Global'],
    reliabilityTier: 1,
    uptime: 99.9,
    features: ['AMD MI300X', 'Global presence', 'Competitive pricing'],
    supportLevel: 'standard',
  },
  {
    id: 'tensorwave',
    name: 'TensorWave',
    type: 'specialized',
    website: 'https://tensorwave.com',
    regions: ['US'],
    reliabilityTier: 2,
    uptime: 99.5,
    features: ['AMD focused', 'MI300X under $2/hr', 'ROCm optimized'],
    supportLevel: 'standard',
  },
  {
    id: 'paperspace',
    name: 'Paperspace',
    type: 'specialized',
    website: 'https://paperspace.com',
    regions: ['US-East', 'US-West', 'EU-West'],
    reliabilityTier: 1,
    uptime: 99.9,
    features: ['ML-focused', 'Gradient platform', 'Developer-friendly', 'Jupyter integration'],
    supportLevel: 'standard',
  },
  {
    id: 'together-ai',
    name: 'Together AI',
    type: 'emerging',
    website: 'https://together.ai',
    regions: ['US', 'EU'],
    reliabilityTier: 1,
    uptime: 99.8,
    features: ['LLM inference', 'API-first', 'Open models', 'Fast inference'],
    supportLevel: 'standard',
  },
  {
    id: 'replicate',
    name: 'Replicate',
    type: 'emerging',
    website: 'https://replicate.com',
    regions: ['US'],
    reliabilityTier: 1,
    uptime: 99.9,
    features: ['Serverless ML', 'Pay-per-run', 'Model marketplace', 'Easy deployment'],
    supportLevel: 'standard',
  },
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    type: 'hyperscaler',
    website: 'https://aws.amazon.com/ec2',
    regions: ['Global'],
    reliabilityTier: 1,
    uptime: 99.99,
    features: ['P4d/P5 instances', 'Enterprise-grade', 'Global reach', 'Comprehensive services'],
    supportLevel: 'enterprise',
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    type: 'hyperscaler',
    website: 'https://cloud.google.com',
    regions: ['Global'],
    reliabilityTier: 1,
    uptime: 99.99,
    features: ['A100/H100/TPU', 'Vertex AI', 'Enterprise-grade', 'Global infrastructure'],
    supportLevel: 'enterprise',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    type: 'hyperscaler',
    website: 'https://azure.microsoft.com',
    regions: ['Global'],
    reliabilityTier: 1,
    uptime: 99.99,
    features: ['ND-series', 'Enterprise-grade', 'Microsoft ecosystem', 'Azure ML'],
    supportLevel: 'enterprise',
  },
];

export const gpuPricing: GPUPricing[] = [
  // B200 Pricing
  {
    gpuId: 'nvidia-b200',
    providerId: 'datacrunch',
    pricePerHour: 3.99,
    priceType: 'on-demand',
    availability: 'low',
    availabilityScore: 25,
    region: 'EU-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-b200',
    providerId: 'modal',
    pricePerHour: 6.25,
    priceType: 'on-demand',
    availability: 'low',
    availabilityScore: 30,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // H200 Pricing
  {
    gpuId: 'nvidia-h200',
    providerId: 'coreweave',
    pricePerHour: 2.50,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 60,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-h200',
    providerId: 'nebius',
    pricePerHour: 1.90,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 55,
    region: 'EU-West',
    lastUpdated: '2025-10-14',
  },
  // H100 80GB Pricing
  {
    gpuId: 'nvidia-h100-80gb',
    providerId: 'lambda-labs',
    pricePerHour: 2.10,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-h100-80gb',
    providerId: 'nebius',
    pricePerHour: 2.10,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'EU-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-h100-80gb',
    providerId: 'runpod',
    pricePerHour: 2.39,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 75,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-h100-80gb',
    providerId: 'runpod',
    pricePerHour: 0.99,
    priceType: 'spot',
    availability: 'medium',
    availabilityScore: 50,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // A100 80GB Pricing
  {
    gpuId: 'nvidia-a100-80gb',
    providerId: 'lambda-labs',
    pricePerHour: 1.10,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 95,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-a100-80gb',
    providerId: 'runpod',
    pricePerHour: 0.89,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-a100-80gb',
    providerId: 'runpod',
    pricePerHour: 0.40,
    priceType: 'spot',
    availability: 'high',
    availabilityScore: 70,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // A100 40GB Pricing
  {
    gpuId: 'nvidia-a100-40gb',
    providerId: 'lambda-labs',
    pricePerHour: 0.70,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 95,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-a100-40gb',
    providerId: 'runpod',
    pricePerHour: 0.64,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // RTX 4090 Pricing
  {
    gpuId: 'nvidia-rtx-4090',
    providerId: 'runpod',
    pricePerHour: 0.69,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-rtx-4090',
    providerId: 'vast-ai',
    pricePerHour: 0.45,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 60,
    region: 'Global',
    lastUpdated: '2025-10-14',
  },
  // L40S Pricing
  {
    gpuId: 'nvidia-l40s',
    providerId: 'lambda-labs',
    pricePerHour: 0.80,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-l40s',
    providerId: 'runpod',
    pricePerHour: 0.89,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // RTX 4080 Pricing
  {
    gpuId: 'nvidia-rtx-4080',
    providerId: 'runpod',
    pricePerHour: 0.59,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-rtx-4080',
    providerId: 'vast-ai',
    pricePerHour: 0.38,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 65,
    region: 'Global',
    lastUpdated: '2025-10-14',
  },
  // RTX 3090 Pricing
  {
    gpuId: 'nvidia-rtx-3090',
    providerId: 'runpod',
    pricePerHour: 0.44,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-rtx-3090',
    providerId: 'vast-ai',
    pricePerHour: 0.28,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'Global',
    lastUpdated: '2025-10-14',
  },
  // A40 Pricing
  {
    gpuId: 'nvidia-a40',
    providerId: 'lambda-labs',
    pricePerHour: 0.75,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-a40',
    providerId: 'runpod',
    pricePerHour: 0.68,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // RTX A6000 Pricing
  {
    gpuId: 'nvidia-rtx-a6000',
    providerId: 'lambda-labs',
    pricePerHour: 0.80,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-rtx-a6000',
    providerId: 'runpod',
    pricePerHour: 0.73,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // L4 Pricing
  {
    gpuId: 'nvidia-l4',
    providerId: 'lambda-labs',
    pricePerHour: 0.49,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-l4',
    providerId: 'runpod',
    pricePerHour: 0.44,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // A10G Pricing
  {
    gpuId: 'nvidia-a10g',
    providerId: 'lambda-labs',
    pricePerHour: 0.60,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-a10g',
    providerId: 'runpod',
    pricePerHour: 0.53,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // V100 Pricing
  {
    gpuId: 'nvidia-v100',
    providerId: 'lambda-labs',
    pricePerHour: 0.50,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 95,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-v100',
    providerId: 'runpod',
    pricePerHour: 0.42,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-v100',
    providerId: 'vast-ai',
    pricePerHour: 0.25,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'Global',
    lastUpdated: '2025-10-14',
  },
  // T4 Pricing
  {
    gpuId: 'nvidia-t4',
    providerId: 'lambda-labs',
    pricePerHour: 0.35,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 95,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-t4',
    providerId: 'runpod',
    pricePerHour: 0.29,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 90,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-t4',
    providerId: 'vast-ai',
    pricePerHour: 0.18,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'Global',
    lastUpdated: '2025-10-14',
  },
  // RTX 6000 Ada Pricing
  {
    gpuId: 'nvidia-rtx-6000-ada',
    providerId: 'lambda-labs',
    pricePerHour: 0.95,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 85,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'nvidia-rtx-6000-ada',
    providerId: 'runpod',
    pricePerHour: 0.88,
    priceType: 'on-demand',
    availability: 'high',
    availabilityScore: 80,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // AMD MI300X Pricing
  {
    gpuId: 'amd-mi300x',
    providerId: 'vultr',
    pricePerHour: 1.85,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 65,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'amd-mi300x',
    providerId: 'tensorwave',
    pricePerHour: 1.95,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 60,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // AMD MI210 Pricing
  {
    gpuId: 'amd-mi210',
    providerId: 'vultr',
    pricePerHour: 0.72,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 70,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  {
    gpuId: 'amd-mi210',
    providerId: 'tensorwave',
    pricePerHour: 0.68,
    priceType: 'on-demand',
    availability: 'medium',
    availabilityScore: 65,
    region: 'US-West',
    lastUpdated: '2025-10-14',
  },
  // AMD MI325X Pricing
  {
    gpuId: 'amd-mi325x',
    providerId: 'vultr',
    pricePerHour: 36.92,
    priceType: 'on-demand',
    availability: 'low',
    availabilityScore: 15,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
  // AMD MI350X Pricing
  {
    gpuId: 'amd-mi350x',
    providerId: 'vultr',
    pricePerHour: 2.50,
    priceType: 'on-demand',
    availability: 'low',
    availabilityScore: 20,
    region: 'US-East',
    lastUpdated: '2025-10-14',
  },
];

// Helper function to get GPU by ID
export function getGPUById(id: string): GPU | undefined {
  return gpus.find((gpu) => gpu.id === id);
}

// Helper function to get provider by ID
export function getProviderById(id: string): Provider | undefined {
  return providers.find((provider) => provider.id === id);
}

// Helper function to get pricing for a GPU
export function getPricingForGPU(gpuId: string): GPUPricing[] {
  return gpuPricing.filter((pricing) => pricing.gpuId === gpuId);
}

// Helper function to get all offerings for a GPU
export function getOfferingsForGPU(gpuId: string): GPUOffering[] {
  const gpu = getGPUById(gpuId);
  if (!gpu) return [];

  const pricing = getPricingForGPU(gpuId);
  return pricing.reduce<GPUOffering[]>((acc, price) => {
    const provider = getProviderById(price.providerId);
    if (!provider) {
      return acc;
    }

    acc.push({
      gpu,
      provider,
      pricing: price,
      performanceScore: calculatePerformanceScore(gpu),
      valueScore: calculateValueScore(gpu, price),
    });

    return acc;
  }, []);
}

export function getOfferingsForProvider(providerId: string): GPUOffering[] {
  const provider = getProviderById(providerId);
  if (!provider) return [];

  return gpuPricing.reduce<GPUOffering[]>((acc, pricing) => {
    if (pricing.providerId !== providerId) {
      return acc;
    }

    const gpu = getGPUById(pricing.gpuId);
    if (!gpu) {
      return acc;
    }

    acc.push({
      gpu,
      provider,
      pricing,
      performanceScore: calculatePerformanceScore(gpu),
      valueScore: calculateValueScore(gpu, pricing),
    });

    return acc;
  }, []);
}

// Calculate performance score (0-100)
function calculatePerformanceScore(gpu: GPU): number {
  // Normalized based on highest known values as of Oct 2025
  const vramScore = (gpu.vram / 288) * 100; // MI350X has 288GB
  const tflopsScore = (gpu.tflops.fp16 / 5300) * 100; // MI350X has ~5300 TFLOPS FP16
  const bandwidthScore = (gpu.memoryBandwidth / 8.0) * 100; // B200 has 8TB/s

  return (vramScore * 0.3 + tflopsScore * 0.4 + bandwidthScore * 0.3);
}

// Calculate value score (price/performance ratio, lower is better, inverted for display)
function calculateValueScore(gpu: GPU, pricing: GPUPricing): number {
  const performanceScore = calculatePerformanceScore(gpu);
  const pricePerformance = pricing.pricePerHour / (performanceScore / 100);

  // Invert and normalize (lower price/perf is better)
  // Best value as of Oct 2025: RTX 4090 at ~$0.69/hr
  const normalizedScore = Math.max(0, 100 - (pricePerformance * 10));
  return normalizedScore;
}

// Get best value GPUs
export function getBestValueGPUs(limit: number = 5): GPUOffering[] {
  const allOfferings = gpuPricing.reduce<GPUOffering[]>((acc, pricing) => {
    const gpu = getGPUById(pricing.gpuId);
    const provider = getProviderById(pricing.providerId);

    if (!gpu || !provider) {
      return acc;
    }

    acc.push({
      gpu,
      provider,
      pricing,
      performanceScore: calculatePerformanceScore(gpu),
      valueScore: calculateValueScore(gpu, pricing),
    });

    return acc;
  }, []);

  return allOfferings
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, limit);
}

// Get fastest GPUs
export function getFastestGPUs(limit: number = 5): GPUOffering[] {
  const allOfferings = gpuPricing.reduce<GPUOffering[]>((acc, pricing) => {
    const gpu = getGPUById(pricing.gpuId);
    const provider = getProviderById(pricing.providerId);

    if (!gpu || !provider) {
      return acc;
    }

    acc.push({
      gpu,
      provider,
      pricing,
      performanceScore: calculatePerformanceScore(gpu),
      valueScore: calculateValueScore(gpu, pricing),
    });

    return acc;
  }, []);

  return allOfferings
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, limit);
}
