import { create } from 'zustand';
import type { Attendance } from '../../types/hr';

interface AttendanceState {
  attendance: Attendance[];
  recordAttendance: (record: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, updates: Partial<Attendance>) => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendance: [],

  recordAttendance: (record) =>
    set((state) => ({
      attendance: [
        ...state.attendance,
        { ...record, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateAttendance: (id, updates) =>
    set((state) => ({
      attendance: state.attendance.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      ),
    })),
}));