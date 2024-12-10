import React from 'react';
import { Clock, User } from 'lucide-react';
import type { Attendance, Employee } from '../../../types/hr';
import { formatDate } from '../../../utils/date';

interface AttendanceListProps {
  attendance: Attendance[];
  employees: Employee[];
}

export function AttendanceList({ attendance, employees }: AttendanceListProps) {
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find((e) => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const statusColors = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    half_day: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid gap-4">
          {attendance.map((record) => (
            <div
              key={record.id}
              className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">
                  {getEmployeeName(record.employeeId)}
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <div className="text-sm text-gray-500">
                  <div>In: {record.checkIn}</div>
                  {record.checkOut && <div>Out: {record.checkOut}</div>}
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[record.status]
                  }`}
                >
                  {record.status.replace('_', ' ')}
                </span>
              </div>

              {record.notes && (
                <div className="text-sm text-gray-500">
                  Note: {record.notes}
                </div>
              )}
            </div>
          ))}

          {attendance.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No attendance records found for the selected date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}