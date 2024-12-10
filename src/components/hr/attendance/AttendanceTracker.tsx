import React from 'react';
import { Plus } from 'lucide-react';
import { useAttendanceStore, useEmployeeStore } from '../../../store/hr';
import { AttendanceForm } from './AttendanceForm';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceStats } from './AttendanceStats';
import type { Attendance } from '../../../types/hr';

export function AttendanceTracker() {
  const [showForm, setShowForm] = React.useState(false);
  const { recordAttendance } = useAttendanceStore();
  const { employees } = useEmployeeStore();

  const handleSubmit = (data: Omit<Attendance, 'id'>) => {
    recordAttendance(data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Attendance Tracking</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Record Attendance
        </button>
      </div>

      <AttendanceStats />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <AttendanceForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <AttendanceTable />
      )}
    </div>
  );
}