import { SafetyIncident } from '../../types/qhse';
import { subDays, isWithinInterval } from 'date-fns';

export function getIncidentTrends(incidents: SafetyIncident[]) {
  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);

  const recentIncidents = incidents.filter((incident) =>
    isWithinInterval(new Date(incident.date), {
      start: thirtyDaysAgo,
      end: now,
    })
  );

  return recentIncidents.reduce(
    (acc, incident) => ({
      ...acc,
      [incident.type]: (acc[incident.type] || 0) + 1,
    }),
    {} as Record<string, number>
  );
}