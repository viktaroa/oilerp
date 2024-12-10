import { create } from 'zustand';
import type { PayrollRecord } from '../../types/hr';

interface PayrollState {
  payroll: PayrollRecord[];
  processPayroll: (record: Omit<PayrollRecord, 'id'>) => void;
  updatePayrollStatus: (id: string, status: PayrollRecord['status']) => void;
}

export const usePayrollStore = create<PayrollState>((set) => ({
  payroll: [],

  processPayroll: (record) =>
    set((state) => ({
      payroll: [
        ...state.payroll,
        { ...record, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updatePayrollStatus: (id, status) =>
    set((state) => ({
      payroll: state.payroll.map((record) =>
        record.id === id ? { ...record, status } : record
      ),
    })),
}));