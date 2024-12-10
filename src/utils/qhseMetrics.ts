import type { 
  SafetyIncident, 
  ComplianceAudit, 
  SafetyTraining,
  QHSEMetrics 
} from '../types/qhse';
import { isAfter, subDays } from 'date-fns';

export function calculateMetrics(
  incidents: SafetyIncident[],
  audits: ComplianceAudit[],
  trainings: SafetyTraining[]
): QHSEMetrics {
  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);

  // Calculate incident metrics
  const recentIncidents = incidents.filter(incident => 
    isAfter(new Date(incident.date), thirtyDaysAgo)
  );
  
  const incidentRate = (recentIncidents.length / 30) * 100;
  
  const severityPoints = recentIncidents.reduce((acc, incident) => {
    const points = {
      low: 1,
      medium: 2,
      high: 3,
      critical: 4,
    };
    return acc + (incident.severity ? points[incident.severity] : 1);
  }, 0);
  
  const severityRate = severityPoints / (recentIncidents.length || 1);

  // Calculate compliance metrics
  const recentAudits = audits.filter(audit => 
    isAfter(new Date(audit.date), thirtyDaysAgo)
  );
  
  const complianceRate = recentAudits.reduce(
    (acc, audit) => acc + audit.score,
    0
  ) / (recentAudits.length || 1);

  // Calculate training metrics
  const activeTrainings = trainings.filter(
    training => training.status !== 'completed'
  );
  
  const completionRate = trainings.reduce(
    (acc, training) => acc + (training.completedBy.length / training.assignedTo.length),
    0
  ) / (trainings.length || 1) * 100;

  // Calculate open findings
  const openFindings = audits.reduce(
    (acc, audit) => acc + audit.findings.filter(f => f.status !== 'closed').length,
    0
  );

  // Get last incident date
  const lastIncident = incidents.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return {
    incidentRate,
    severityRate,
    complianceRate,
    trainingCompletionRate: completionRate,
    openFindings,
    lastIncidentDate: lastIncident?.date || '',
  };
}