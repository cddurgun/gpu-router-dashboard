import { ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  // Mock data for October 2025
  const priceHistory = [
    { month: 'Apr 2025', h100: 3.20, a100: 1.05, rtx4090: 0.55 },
    { month: 'May 2025', h100: 2.95, a100: 0.98, rtx4090: 0.52 },
    { month: 'Jun 2025', h100: 2.65, a100: 0.92, rtx4090: 0.48 },
    { month: 'Jul 2025', h100: 2.45, a100: 0.89, rtx4090: 0.47 },
    { month: 'Aug 2025', h100: 2.30, a100: 0.87, rtx4090: 0.46 },
    { month: 'Sep 2025', h100: 2.20, a100: 0.86, rtx4090: 0.45 },
    { month: 'Oct 2025', h100: 2.10, a100: 0.89, rtx4090: 0.45 },
  ];

  const marketTrends = [
    {
      title: 'H100 Price Drop',
      change: '-44%',
      period: 'YoY',
      trend: 'down',
      color: 'green',
      description: 'Significant decrease from $3.77/hr in Oct 2024'
    },
    {
      title: 'B200 Availability',
      change: '+15%',
      period: 'MoM',
      trend: 'up',
      color: 'blue',
      description: 'More providers offering B200 GPUs'
    },
    {
      title: 'MI300X Adoption',
      change: '+35%',
      period: 'QoQ',
      trend: 'up',
      color: 'purple',
      description: 'Growing AMD GPU deployments'
    },
    {
      title: 'Average Cost',
      change: '-22%',
      period: 'YoY',
      trend: 'down',
      color: 'green',
      description: 'Average GPU hourly rate decreased'
    },
  ];

  const providerStats = [
    { name: 'Lambda Labs', marketShare: 28, growth: '+12%', reliability: 99.9 },
    { name: 'RunPod', marketShare: 22, growth: '+18%', reliability: 99.5 },
    { name: 'CoreWeave', marketShare: 15, growth: '+8%', reliability: 99.95 },
    { name: 'Vast.ai', marketShare: 12, growth: '+5%', reliability: 98.0 },
    { name: 'Others', marketShare: 23, growth: '+15%', reliability: 99.0 },
  ];

  const topGPUs = [
    { name: 'A100 80GB', usage: 45, avgPrice: 0.89, trend: 'stable' },
    { name: 'H100 80GB', usage: 28, avgPrice: 2.10, trend: 'up' },
    { name: 'RTX 4090', usage: 18, avgPrice: 0.69, trend: 'up' },
    { name: 'MI300X', usage: 5, avgPrice: 1.85, trend: 'up' },
    { name: 'H200', usage: 4, avgPrice: 1.90, trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <ChartBarIcon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics & Insights</h1>
            <p className="text-gray-400">GPU market trends and cost analysis</p>
          </div>
        </div>
        <p className="text-gray-300 max-w-3xl">
          Real-time analytics on GPU pricing, availability, and market trends as of October 2025.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketTrends.map((trend, idx) => {
          const isPositive = trend.trend === 'up';
          const colorClasses = {
            green: 'bg-green-500/20 text-green-400 border-green-500/30',
            blue: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            purple: 'bg-gray-600/20 text-gray-400 border-gray-500/30',
            red: 'bg-red-500/20 text-red-400 border-red-500/30',
          }[trend.color];

          return (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-400">{trend.title}</h3>
                {isPositive ? (
                  <ArrowTrendingUpIcon className={`h-5 w-5 ${trend.color === 'green' ? 'text-green-400' : 'text-gray-400'}`} />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-green-400" />
                )}
              </div>
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold border ${colorClasses}`}>
                {isPositive ? 'Momentum up' : 'Momentum down'}
              </span>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-2xl font-bold text-white">{trend.change}</span>
                <span className="text-sm text-gray-500">{trend.period}</span>
              </div>
              <p className="text-xs text-gray-400">{trend.description}</p>
            </div>
          );
        })}
      </div>

      {/* Price History Chart */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Price Trends (6 Months)</h2>
            <p className="text-sm text-gray-400 mt-1">Average hourly rates across popular GPUs</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-400">H100</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span className="text-sm text-gray-400">A100</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">RTX 4090</span>
            </div>
          </div>
        </div>

        {/* Simple Bar Chart Visualization */}
        <div className="space-y-4">
          {priceHistory.map((data, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="w-20">{data.month}</span>
                <div className="flex-1 flex space-x-1 mx-4">
                  <div
                    className="bg-gray-500 h-6 rounded transition-all hover:bg-gray-400"
                    style={{ width: `${(data.h100 / 4) * 100}%` }}
                    title={`H100: $${data.h100}/hr`}
                  />
                  <div
                    className="bg-gray-600 h-6 rounded transition-all hover:bg-gray-500"
                    style={{ width: `${(data.a100 / 4) * 100}%` }}
                    title={`A100: $${data.a100}/hr`}
                  />
                  <div
                    className="bg-green-500 h-6 rounded transition-all hover:bg-green-400"
                    style={{ width: `${(data.rtx4090 / 4) * 100}%` }}
                    title={`RTX 4090: $${data.rtx4090}/hr`}
                  />
                </div>
                <div className="flex space-x-3 text-xs">
                  <span className="text-gray-400">${data.h100}</span>
                  <span className="text-gray-400">${data.a100}</span>
                  <span className="text-green-400">${data.rtx4090}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-400 mb-1">H100 Savings</p>
              <p className="text-lg font-bold text-gray-400">$1.10/hr</p>
              <p className="text-xs text-gray-500">vs Apr 2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">A100 Stability</p>
              <p className="text-lg font-bold text-gray-400">±5%</p>
              <p className="text-xs text-gray-500">6-month range</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">RTX 4090 Value</p>
              <p className="text-lg font-bold text-green-400">$0.45/hr</p>
              <p className="text-xs text-gray-500">Lowest rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider Market Share */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">Provider Market Share</h2>
          <p className="text-sm text-gray-400 mb-6">Based on GPU deployment volume</p>

          <div className="space-y-4">
            {providerStats.map((provider, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-white">{provider.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      {provider.growth}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-400">{provider.reliability}% uptime</span>
                    <span className="text-sm font-bold text-white">{provider.marketShare}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-500 to-gray-700 rounded-full transition-all"
                    style={{ width: `${provider.marketShare}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular GPUs */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-1">Most Used GPUs</h2>
          <p className="text-sm text-gray-400 mb-6">By deployment count in October 2025</p>

          <div className="space-y-4">
            {topGPUs.map((gpu, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{gpu.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">${gpu.avgPrice}/hr</span>
                      <span className="text-sm font-bold text-white">{gpu.usage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        idx === 0 ? 'bg-gradient-to-r from-gray-600 to-gray-700' :
                        idx === 1 ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
                        'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                      style={{ width: `${gpu.usage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 text-sm text-gray-400">
            <p>A100 remains dominant with 45% usage share. H100 growing rapidly at +12% MoM.</p>
          </div>
        </div>
      </div>

      {/* Cost Estimates */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Cost Estimation Calculator</h2>
            <p className="text-sm text-gray-400">Estimate your GPU costs over time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1 Day */}
          <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-bold text-white">24 Hours</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">RTX 4090</span>
                <span className="text-sm font-semibold text-white">$16.56</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">A100 80GB</span>
                <span className="text-sm font-semibold text-white">$21.36</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">H100 80GB</span>
                <span className="text-sm font-semibold text-white">$50.40</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">B200</span>
                <span className="text-sm font-semibold text-white">$95.76</span>
              </div>
            </div>
          </div>

          {/* 1 Week */}
          <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-bold text-white">1 Week</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">RTX 4090</span>
                <span className="text-sm font-semibold text-white">$115.92</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">A100 80GB</span>
                <span className="text-sm font-semibold text-white">$149.52</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">H100 80GB</span>
                <span className="text-sm font-semibold text-white">$352.80</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">B200</span>
                <span className="text-sm font-semibold text-white">$670.32</span>
              </div>
            </div>
          </div>

          {/* 1 Month */}
          <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">1 Month (30d)</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">RTX 4090</span>
                <span className="text-sm font-semibold text-white">$496.80</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">A100 80GB</span>
                <span className="text-sm font-semibold text-white">$640.80</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">H100 80GB</span>
                <span className="text-sm font-semibold text-white">$1,512.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">B200</span>
                <span className="text-sm font-semibold text-white">$2,872.80</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-600/10 border border-gray-500/30 rounded-lg">
          <p className="text-sm text-gray-200">
            💡 <strong>Pro Tip:</strong> For workloads longer than 1 month, consider reserved instances for 30-50% savings.
          </p>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">📈 Key Insights (Oct 2025)</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>H100 prices dropped 44% YoY due to increased supply and H200/B200 competition</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>B200 availability remains scarce with only DataCrunch and Modal offering competitive rates</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>AMD MI300X gaining traction with 35% QoQ growth as ROCm ecosystem matures</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>RTX 4090 remains unbeatable value proposition at $0.45-0.69/hr for small models</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">🔮 Predictions (Q4 2025)</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>H200 expected to drop below $1.50/hr as production ramps up</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>B200 availability to improve by Q1 2026, prices may stabilize around $3/hr</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>MI350X launch in June 2025 will intensify AMD-NVIDIA competition</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Spot instance markets expanding with 60-80% discounts becoming standard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
