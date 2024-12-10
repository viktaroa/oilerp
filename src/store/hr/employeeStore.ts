import { create } from 'zustand';
import type { Employee } from '../../types/hr';
import { calculateHRMetrics } from '../../utils/hrMetrics';

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  terminateEmployee: (id: string) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],

  addEmployee: (employee) =>
    set((state) => ({
      employees: [
        ...state.employees,
        { ...employee, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateEmployee: (id, updates) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      ),
    })),

  terminateEmployee: (id) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, status: 'inactive' } : emp
      ),
    })),
}));