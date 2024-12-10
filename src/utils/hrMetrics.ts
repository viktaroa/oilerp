import type { 
  Employee, 
  Attendance, 
  LeaveRequest, 
  PerformanceReview,
  HRMetrics 
} from '../types/hr';
import { subMonths, isWithinInterval } from 'date-fns';

export function calculateHRMetrics(
  employees: Employee[],
  attendance: Attendance[],
  leaveRequests: LeaveRequest[],
  performanceReviews: PerformanceReview[]
): HRMetrics {
  const now = new Date();
  const lastMonth = subMonths(now, 1);

  // Employee metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  
  // Calculate turnover rate (employees who left in last month / total employees)
  const terminatedLastMonth = employees.filter(
    (e) => e.status === 'inactive' && 
    isWithinInterval(new Date(e.joinDate), { start: lastMonth, end: now })
  ).length;
  const turnoverRate = (terminatedLastMonth / totalEmployees) * 100;

  // Attendance metrics
  const lastMonthAttendance = attendance.filter((a) =>
    isWithinInterval(new Date(a.date), { start: lastMonth, end: now })
  );
  const presentDays = lastMonthAttendance.filter(
    (a) => a.status === 'present' || a.status === 'late'
  ).length;
  const totalWorkingDays = 22; // Assuming 22 working days per month
  const averageAttendance = (presentDays / (activeEmployees * totalWorkingDays)) * 100;

  // Leave utilization
  const approvedLeaves = leaveRequests.filter(
    (l) => l.status === 'approved' &&
    isWithinInterval(new Date(l.startDate), { start: lastMonth, end: now })
  ).length;
  const leaveUtilization = (approvedLeaves / activeEmployees) * 100;

  // Performance metrics
  const recentReviews = performanceReviews.filter(
    (r) => r.status === 'reviewed' &&
    isWithinInterval(new Date(r.date), { start: lastMonth, end: now })
  );
  const averageScore = recentReviews.reduce((acc, review) => {
    const scores = Object.values(review.ratings);
    const reviewAverage = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return acc + reviewAverage;
  }, 0) / (recentReviews.length || 1);

  return {
    totalEmployees,
    activeEmployees,
    turnoverRate,
    averageAttendance,
    leaveUtilization,
    averagePerformanceScore: averageScore,
  };
}