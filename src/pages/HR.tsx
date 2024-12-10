import React from 'react';
import { EmployeeList } from '../components/hr/EmployeeList';
import { AttendanceTracker } from '../components/hr/attendance/AttendanceTracker';
import { LeaveManagement } from '../components/hr/leave/LeaveManagement';
import { PerformanceReviews } from '../components/hr/performance/PerformanceReviews';
import { PayrollManagement } from '../components/hr/payroll/PayrollManagement';
import { BenefitsManagement } from '../components/hr/benefits/BenefitsManagement';
import { HRMetrics } from '../components/hr/HRMetrics';
import { useMetricsStore } from '../store/hr/metricsStore';

export function HR() {
  const [activeTab, setActiveTab] = React.useState<
    'employees' | 'attendance' | 'leave' | 'performance' | 'payroll' | 'benefits'
  >('employees');

  const { metrics } = useMetricsStore();

  // Update metrics when tab changes
  React.useEffect(() => {
    useMetricsStore.getState().updateMetrics();
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">HR Management</h1>
      </div>

      <HRMetrics metrics={metrics} />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'employees', name: 'Employees' },
            { id: 'attendance', name: 'Attendance' },
            { id: 'leave', name: 'Leave Management' },
            { id: 'performance', name: 'Performance' },
            { id: 'payroll', name: 'Payroll' },
            { id: 'benefits', name: 'Benefits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'employees' && <EmployeeList />}
        {activeTab === 'attendance' && <AttendanceTracker />}
        {activeTab === 'leave' && <LeaveManagement />}
        {activeTab === 'performance' && <PerformanceReviews />}
        {activeTab === 'payroll' && <PayrollManagement />}
        {activeTab === 'benefits' && <BenefitsManagement />}
      </div>
    </div>
  );
}