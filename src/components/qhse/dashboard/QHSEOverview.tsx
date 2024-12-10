import React from 'react';
import { IncidentTrends } from '../analytics/IncidentTrends';
import { ComplianceStats } from '../compliance/ComplianceStats';
import { TrainingProgress } from '../training/TrainingProgress';
import { SafetyMetrics } from '../metrics/SafetyMetrics';

export function QHSEOverview() {
  return (
    <div className="space-y-6">
      <SafetyMetrics />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IncidentTrends />
        <ComplianceStats />
        <TrainingProgress />
      </div>
    </div>
  );
}