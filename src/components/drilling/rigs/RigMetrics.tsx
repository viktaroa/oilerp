import React from 'react';
import { Activity, Tool, Users, TrendingUp } from 'lucide-react';
import { useDrillingStore } from '../../../store/drillingStore';

export function RigMetrics() {
  const { rigs } = useDrillingStore();

  const metrics = React.useMemo(() => {
    const activeRigs = rigs.filter((r) => r.status === 'active').length;
    const totalCrew = rigs.reduce(
      (sum, rig) => sum + rig.crew.dayshift + rig.crew.nightshift,
      0
    );
    const maintenanceNeeded = rigs.filter(
      (r) => r.maintenance.status === 'due-soon' || r.maintenance.status === 'overdue'
    ).length;
    const utilizationRate =
      (rigs.filter((r) => r.status === 'active' || r.status === 'mobilizing').length /
        (rigs.length || 1)) *
      100;

    return {
      activeRigs,
      totalCrew,
      maintenanceNeeded,
      utilizationRate,
    };
  }, [rigs]);

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
                <dt className="text-sm font-medium text-gray-500 truncate">Active Rigs</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{metrics.activeRigs}</div>
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
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Crew</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{metrics.totalCrew}</div>
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
              <Tool className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Maintenance Needed</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.maintenanceNeeded}
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
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Utilization Rate</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.utilizationRate.toFixed(1)}%
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