import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import type { Employee } from '../../../types/hr';
import { formatDate } from '../../../utils/date';
import { useEmployeeStore } from '../../../store/hr';

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { updateEmployee, terminateEmployee } = useEmployeeStore();

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    on_leave: 'bg-yellow-100 text-yellow-800',
  };

  const handleStatusChange = (newStatus: Employee['status']) => {
    if (newStatus === 'inactive') {
      if (window.confirm('Are you sure you want to terminate this employee?')) {
        terminateEmployee(employee.id);
      }
    } else {
      updateEmployee(employee.id, { status: newStatus });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[employee.status]
          }`}
        >
          {employee.status.replace('_', ' ')}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center text-sm text-gray-500">
          <Mail className="h-4 w-4 mr-2" />
          {employee.email}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Phone className="h-4 w-4 mr-2" />
          {employee.contact.phone}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          Joined: {formatDate(employee.joinDate)}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={employee.status}
          onChange={(e) => handleStatusChange(e.target.value as Employee['status'])}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="inactive">Terminated</option>
        </select>
      </div>
    </div>
  );
}