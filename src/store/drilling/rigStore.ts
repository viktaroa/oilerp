import { create } from 'zustand';
import type { DrillingRig } from '../../types/drilling';

interface RigState {
  rigs: DrillingRig[];
  addRig: (rig: Omit<DrillingRig, 'id'>) => void;
  updateRig: (id: string, updates: Partial<DrillingRig>) => void;
  deleteRig: (id: string) => void;
  getRigById: (id: string) => DrillingRig | undefined;
  getRigsByStatus: (status: DrillingRig['status']) => DrillingRig[];
}

export const useRigStore = create<RigState>((set, get) => ({
  rigs: [],

  addRig: (rig) =>
    set((state) => ({
      rigs: [...state.rigs, { ...rig, id: Math.random().toString(36).substr(2, 9) }],
    })),

  updateRig: (id, updates) =>
    set((state) => ({
      rigs: state.rigs.map((rig) => (rig.id === id ? { ...rig, ...updates } : rig)),
    })),

  deleteRig: (id) =>
    set((state) => ({
      rigs: state.rigs.filter((rig) => rig.id !== id),
    })),

  getRigById: (id) => get().rigs.find((rig) => rig.id === id),

  getRigsByStatus: (status) => get().rigs.filter((rig) => rig.status === status),
}));