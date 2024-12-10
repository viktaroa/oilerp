import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { useQHSEStore } from '../../../store/qhseStore';
import { getComplianceStats } from '../../../utils/qhse/compliance';

export function ComplianceStats() {
  const audits = useQHSEStore((state) => state.audits);
  const stats = getComplianceStats(audits);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Compliance Overview</h3>
        <Shield className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Compliance Rate</p>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.complianceRate}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Open Findings</p>
          <div className="flex items-center">
            <p className="text-2xl font-semibold text-gray-900">
              {stats.openFindings}
            </p>
            {stats.criticalFindings > 0 && (
              <AlertTriangle className="ml-2 h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}