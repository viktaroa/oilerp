import { create } from 'zustand';
import type {
  Employee,
  Attendance,
  LeaveRequest,
  PerformanceReview,
  CompensationRecord,
  PayrollRecord,
  Benefit,
  BenefitEnrollment,
  HRMetrics
} from '../types/hr';
import { calculateHRMetrics } from '../utils/hrMetrics';

interface HRState {
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  performanceReviews: PerformanceReview[];
  payroll: PayrollRecord[];
  benefits: Benefit[];
  benefitEnrollments: BenefitEnrollment[];
  metrics: HRMetrics;

  // Employee Management
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  terminateEmployee: (id: string) => void;

  // Attendance Management
  recordAttendance: (record: Omit<Attendance, 'id'>) => void;
  updateAttendance: (id: string, updates: Partial<Attendance>) => void;

  // Leave Management
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id'>) => void;
  approveLeaveRequest: (id: string, approverId: string) => void;
  rejectLeaveRequest: (id: string, approverId: string) => void;

  // Performance Management
  createPerformanceReview: (review: Omit<PerformanceReview, 'id'>) => void;
  updatePerformanceReview: (id: string, updates: Partial<PerformanceReview>) => void;

  // Payroll Management
  processPayroll: (record: Omit<PayrollRecord, 'id'>) => void;
  updatePayrollStatus: (id: string, status: PayrollRecord['status']) => void;

  // Benefits Management
  addBenefit: (benefit: Omit<Benefit, 'id'>) => void;
  updateBenefit: (id: string, updates: Partial<Benefit>) => void;
  enrollInBenefit: (enrollment: Omit<BenefitEnrollment, 'id'>) => void;
  terminateBenefitEnrollment: (id: string) => void;
}

export const useHRStore = create<HRState>((set) => ({
  employees: [],
  attendance: [],
  leaveRequests: [],
  performanceReviews: [],
  payroll: [],
  benefits: [],
  benefitEnrollments: [],
  metrics: {
    totalEmployees: 0,
    activeEmployees: 0,
    turnoverRate: 0,
    averageAttendance: 0,
    leaveUtilization: 0,
    averagePerformanceScore: 0,
  },

  addEmployee: (employee) =>
    set((state) => {
      const newEmployees = [
        ...state.employees,
        { ...employee, id: Math.random().toString(36).substr(2, 9) },
      ];
      return {
        employees: newEmployees,
        metrics: calculateHRMetrics(
          newEmployees,
          state.attendance,
          state.leaveRequests,
          state.performanceReviews
        ),
      };
    }),

  updateEmployee: (id, updates) =>
    set((state) => {
      const newEmployees = state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updates } : emp
      );
      return {
        employees: newEmployees,
        metrics: calculateHRMetrics(
          newEmployees,
          state.attendance,
          state.leaveRequests,
          state.performanceReviews
        ),
      };
    }),

  terminateEmployee: (id) =>
    set((state) => {
      const newEmployees = state.employees.map((emp) =>
        emp.id === id ? { ...emp, status: 'inactive' } : emp
      );
      return {
        employees: newEmployees,
        metrics: calculateHRMetrics(
          newEmployees,
          state.attendance,
          state.leaveRequests,
          state.performanceReviews
        ),
      };
    }),

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

  submitLeaveRequest: (request) =>
    set((state) => ({
      leaveRequests: [
        ...state.leaveRequests,
        { ...request, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  approveLeaveRequest: (id, approverId) =>
    set((state) => ({
      leaveRequests: state.leaveRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: 'approved',
              approvedBy: approverId,
              approvalDate: new Date().toISOString(),
            }
          : request
      ),
    })),

  rejectLeaveRequest: (id, approverId) =>
    set((state) => ({
      leaveRequests: state.leaveRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              status: 'rejected',
              approvedBy: approverId,
              approvalDate: new Date().toISOString(),
            }
          : request
      ),
    })),

  createPerformanceReview: (review) =>
    set((state) => ({
      performanceReviews: [
        ...state.performanceReviews,
        { ...review, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updatePerformanceReview: (id, updates) =>
    set((state) => ({
      performanceReviews: state.performanceReviews.map((review) =>
        review.id === id ? { ...review, ...updates } : review
      ),
    })),

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

  addBenefit: (benefit) =>
    set((state) => ({
      benefits: [
        ...state.benefits,
        { ...benefit, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateBenefit: (id, updates) =>
    set((state) => ({
      benefits: state.benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, ...updates } : benefit
      ),
    })),

  enrollInBenefit: (enrollment) =>
    set((state) => ({
      benefitEnrollments: [
        ...state.benefitEnrollments,
        { ...enrollment, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  terminateBenefitEnrollment: (id) =>
    set((state) => ({
      benefitEnrollments: state.benefitEnrollments.map((enrollment) =>
        enrollment.id === id ? { ...enrollment, status: 'terminated' } : enrollment
      ),
    })),
}));