import { create } from 'zustand';
import type {
  Well,
  DrillingRig,
  DrillingOperation,
  DrillingActivity,
  CrewMember,
  DrillingMetrics,
} from '../types/drilling';

interface DrillingState {
  wells: Well[];
  rigs: DrillingRig[];
  operations: DrillingOperation[];
  metrics: DrillingMetrics;

  // Well Management
  addWell: (well: Omit<Well, 'id'>) => void;
  updateWell: (id: string, updates: Partial<Well>) => void;
  
  // Rig Management
  addRig: (rig: Omit<DrillingRig, 'id'>) => void;
  updateRig: (id: string, updates: Partial<DrillingRig>) => void;
  
  // Operations Management
  startOperation: (operation: Omit<DrillingOperation, 'id'>) => void;
  updateOperation: (id: string, updates: Partial<DrillingOperation>) => void;
  completeOperation: (id: string) => void;
  
  // Activity Management
  addActivity: (activity: Omit<DrillingActivity, 'id'>) => void;
  updateActivity: (id: string, updates: Partial<DrillingActivity>) => void;
  
  // Crew Management
  assignCrew: (operationId: string, crew: Omit<CrewMember, 'id'>[]) => void;
  updateCrewMember: (operationId: string, crewId: string, updates: Partial<CrewMember>) => void;
}

export const useDrillingStore = create<DrillingState>((set) => ({
  wells: [],
  rigs: [],
  operations: [],
  metrics: {
    totalWells: 0,
    activeWells: 0,
    avgROP: 0,
    avgEfficiency: 0,
    totalNPT: 0,
    costPerformance: 0,
  },

  addWell: (well) =>
    set((state) => ({
      wells: [...state.wells, { ...well, id: Math.random().toString(36).substr(2, 9) }],
    })),

  updateWell: (id, updates) =>
    set((state) => ({
      wells: state.wells.map((well) =>
        well.id === id ? { ...well, ...updates } : well
      ),
    })),

  addRig: (rig) =>
    set((state) => ({
      rigs: [...state.rigs, { ...rig, id: Math.random().toString(36).substr(2, 9) }],
    })),

  updateRig: (id, updates) =>
    set((state) => ({
      rigs: state.rigs.map((rig) =>
        rig.id === id ? { ...rig, ...updates } : rig
      ),
    })),

  startOperation: (operation) =>
    set((state) => ({
      operations: [
        ...state.operations,
        { ...operation, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateOperation: (id, updates) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === id ? { ...op, ...updates } : op
      ),
    })),

  completeOperation: (id) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === id
          ? {
              ...op,
              status: 'completed',
              endDate: new Date().toISOString(),
            }
          : op
      ),
    })),

  addActivity: (activity) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === activity.operationId
          ? {
              ...op,
              activities: [
                ...op.activities,
                { ...activity, id: Math.random().toString(36).substr(2, 9) },
              ],
            }
          : op
      ),
    })),

  updateActivity: (id, updates) =>
    set((state) => ({
      operations: state.operations.map((op) => ({
        ...op,
        activities: op.activities.map((activity) =>
          activity.id === id ? { ...activity, ...updates } : activity
        ),
      })),
    })),

  assignCrew: (operationId, crew) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === operationId
          ? {
              ...op,
              crew: crew.map((member) => ({
                ...member,
                id: Math.random().toString(36).substr(2, 9),
              })),
            }
          : op
      ),
    })),

  updateCrewMember: (operationId, crewId, updates) =>
    set((state) => ({
      operations: state.operations.map((op) =>
        op.id === operationId
          ? {
              ...op,
              crew: op.crew.map((member) =>
                member.id === crewId ? { ...member, ...updates } : member
              ),
            }
          : op
      ),
    })),
}));