import React from 'react';
import { Plus } from 'lucide-react';
import { useLeaveStore, useEmployeeStore } from '../../../store/hr';
import { LeaveRequestList } from './LeaveRequestList';
import { LeaveRequestForm } from './LeaveRequestForm';
import { LeaveStats } from './LeaveStats';
import type { LeaveRequest } from '../../../types/hr';

export function LeaveManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { submitLeaveRequest, leaveRequests } = useLeaveStore();
  const { employees } = useEmployeeStore();

  const handleSubmit = (data: Omit<LeaveRequest, 'id'>) => {
    submitLeaveRequest(data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Leave Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Request Leave
        </button>
      </div>

      <LeaveStats leaveRequests={leaveRequests} />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <LeaveRequestForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <LeaveRequestList />
      )}
    </div>
  );
}