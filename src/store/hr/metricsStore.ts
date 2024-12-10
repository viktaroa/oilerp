import { create } from 'zustand';
import type { HRMetrics } from '../../types/hr';
import { calculateHRMetrics } from '../../utils/hrMetrics';
import { useEmployeeStore } from './employeeStore';
import { useAttendanceStore } from './attendanceStore';
import { useLeaveStore } from './leaveStore';
import { usePerformanceStore } from './performanceStore';

interface MetricsState {
  metrics: HRMetrics;
  updateMetrics: () => void;
}

export const useMetricsStore = create<MetricsState>((set) => ({
  metrics: {
    totalEmployees: 0,
    activeEmployees: 0,
    turnoverRate: 0,
    averageAttendance: 0,
    leaveUtilization: 0,
    averagePerformanceScore: 0,
  },

  updateMetrics: () => {
    const employees = useEmployeeStore.getState().employees;
    const attendance = useAttendanceStore.getState().attendance;
    const leaveRequests = useLeaveStore.getState().leaveRequests;
    const performanceReviews = usePerformanceStore.getState().performanceReviews;

    set({
      metrics: calculateHRMetrics(
        employees,
        attendance,
        leaveRequests,
        performanceReviews
      ),
    });
  },
}));