import React from 'react';
import { DollarSign, Calendar, User, Clock } from 'lucide-react';
import { useHRStore } from '../../../store/hrStore';
import { formatDate } from '../../../utils/date';

export function CompensationList() {
  const { compensationRecords, employees, approveCompensation, rejectCompensation } = useHRStore();

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid gap-4">
          {compensationRecords.map((record) => (
            <div
              key={record.id}
              className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center"
            >
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {getEmployeeName(record.employeeId)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Effective: {formatDate(record.effectiveDate)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Amount: ${record.amount.toLocaleString()} ({record.frequency})
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    Type: {record.type}
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[record.status]
                  }`}
                >
                  {record.status}
                </span>
                {record.reason && (
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {record.reason}
                  </p>
                )}
              </div>

              {record.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => approveCompensation(record.id, 'admin')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectCompensation(record.id, 'admin')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}

          {compensationRecords.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No compensation records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}