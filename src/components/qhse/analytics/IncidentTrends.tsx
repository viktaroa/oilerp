import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';
import { useQHSEStore } from '../../../store/qhseStore';
import { getIncidentTrends } from '../../../utils/qhse/analytics';

export function IncidentTrends() {
  const incidents = useQHSEStore((state) => state.incidents);
  const trends = getIncidentTrends(incidents);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Incident Trends</h3>
        <LineChart className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {Object.entries(trends).map(([type, count]) => (
          <div key={type} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{type}</span>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">{count}</span>
              <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}