import { create } from 'zustand';
import type { LeaveRequest } from '../../types/hr';

interface LeaveState {
  leaveRequests: LeaveRequest[];
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id'>) => void;
  approveLeaveRequest: (id: string, approverId: string) => void;
  rejectLeaveRequest: (id: string, approverId: string) => void;
}

export const useLeaveStore = create<LeaveState>((set) => ({
  leaveRequests: [],

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
}));