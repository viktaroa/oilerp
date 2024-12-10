import React from 'react';
import { Activity, Clock, AlertTriangle, TrendingDown } from 'lucide-react';
import { useDrillingStore } from '../../../store/drillingStore';

export function WellMetrics() {
  const { wells } = useDrillingStore();

  const metrics = React.useMemo(() => {
    const activeWells = wells.filter((w) => w.status === 'drilling').length;
    const totalDepth = wells.reduce((sum, well) => sum + well.depth.current, 0);
    const avgDepth = wells.length ? totalDepth / wells.length : 0;
    const totalNPT = wells.reduce((sum, well) => sum + well.metrics.npTime, 0);
    const avgEfficiency = wells.reduce((sum, well) => sum + well.metrics.efficiency, 0) / (wells.length || 1);

    return {
      activeWells,
      avgDepth,
      totalNPT,
      avgEfficiency,
    };
  }, [wells]);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Wells</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{metrics.activeWells}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Average Depth</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.avgDepth.toLocaleString()}m
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total NPT</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.totalNPT.toFixed(1)}hrs
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Average Efficiency</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.avgEfficiency.toFixed(1)}%
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}