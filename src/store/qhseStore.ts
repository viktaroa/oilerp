import { create } from 'zustand';
import type { 
  SafetyIncident, 
  ComplianceAudit, 
  SafetyTraining,
  QHSEMetrics 
} from '../types/qhse';
import { calculateMetrics } from '../utils/qhseMetrics';

interface QHSEState {
  incidents: SafetyIncident[];
  audits: ComplianceAudit[];
  trainings: SafetyTraining[];
  metrics: QHSEMetrics;
  
  // Incident Management
  addIncident: (incident: Omit<SafetyIncident, 'id'>) => void;
  updateIncidentStatus: (id: string, status: SafetyIncident['status']) => void;
  updateIncident: (id: string, updates: Partial<SafetyIncident>) => void;
  
  // Compliance Management
  addAudit: (audit: Omit<ComplianceAudit, 'id'>) => void;
  updateAudit: (id: string, updates: Partial<ComplianceAudit>) => void;
  
  // Training Management
  addTraining: (training: Omit<SafetyTraining, 'id'>) => void;
  updateTraining: (id: string, updates: Partial<SafetyTraining>) => void;
  completeTraining: (trainingId: string, userId: string) => void;
}

export const useQHSEStore = create<QHSEState>((set, get) => ({
  incidents: [],
  audits: [],
  trainings: [],
  metrics: {
    incidentRate: 0,
    severityRate: 0,
    complianceRate: 0,
    trainingCompletionRate: 0,
    openFindings: 0,
    lastIncidentDate: '',
  },

  addIncident: (incident) =>
    set((state) => {
      const newIncidents = [
        {
          ...incident,
          id: Math.random().toString(36).substr(2, 9),
        },
        ...state.incidents,
      ];
      return {
        incidents: newIncidents,
        metrics: calculateMetrics(newIncidents, state.audits, state.trainings),
      };
    }),

  updateIncidentStatus: (id, status) =>
    set((state) => {
      const newIncidents = state.incidents.map((incident) =>
        incident.id === id ? { ...incident, status } : incident
      );
      return {
        incidents: newIncidents,
        metrics: calculateMetrics(newIncidents, state.audits, state.trainings),
      };
    }),

  updateIncident: (id, updates) =>
    set((state) => {
      const newIncidents = state.incidents.map((incident) =>
        incident.id === id ? { ...incident, ...updates } : incident
      );
      return {
        incidents: newIncidents,
        metrics: calculateMetrics(newIncidents, state.audits, state.trainings),
      };
    }),

  addAudit: (audit) =>
    set((state) => {
      const newAudits = [
        {
          ...audit,
          id: Math.random().toString(36).substr(2, 9),
        },
        ...state.audits,
      ];
      return {
        audits: newAudits,
        metrics: calculateMetrics(state.incidents, newAudits, state.trainings),
      };
    }),

  updateAudit: (id, updates) =>
    set((state) => {
      const newAudits = state.audits.map((audit) =>
        audit.id === id ? { ...audit, ...updates } : audit
      );
      return {
        audits: newAudits,
        metrics: calculateMetrics(state.incidents, newAudits, state.trainings),
      };
    }),

  addTraining: (training) =>
    set((state) => {
      const newTrainings = [
        {
          ...training,
          id: Math.random().toString(36).substr(2, 9),
        },
        ...state.trainings,
      ];
      return {
        trainings: newTrainings,
        metrics: calculateMetrics(state.incidents, state.audits, newTrainings),
      };
    }),

  updateTraining: (id, updates) =>
    set((state) => {
      const newTrainings = state.trainings.map((training) =>
        training.id === id ? { ...training, ...updates } : training
      );
      return {
        trainings: newTrainings,
        metrics: calculateMetrics(state.incidents, state.audits, newTrainings),
      };
    }),

  completeTraining: (trainingId, userId) =>
    set((state) => {
      const newTrainings = state.trainings.map((training) =>
        training.id === trainingId
          ? {
              ...training,
              completedBy: [...training.completedBy, userId],
              status:
                training.assignedTo.length === training.completedBy.length + 1
                  ? 'completed'
                  : training.status,
            }
          : training
      );
      return {
        trainings: newTrainings,
        metrics: calculateMetrics(state.incidents, state.audits, newTrainings),
      };
    }),
}));