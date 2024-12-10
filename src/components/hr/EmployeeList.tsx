import React from 'react';
import { Plus } from 'lucide-react';
import { useEmployeeStore } from '../../store/hr';
import { EmployeeCard } from './employee/EmployeeCard';
import { EmployeeForm } from './employee/EmployeeForm';
import { EmployeeFilters } from './employee/EmployeeFilters';
import type { Employee } from '../../types/hr';

export function EmployeeList() {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all');
  const { employees, addEmployee } = useEmployeeStore();

  const filteredEmployees = employees.filter((employee) => {
    const departmentMatch = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const statusMatch = selectedStatus === 'all' || employee.status === selectedStatus;
    return departmentMatch && statusMatch;
  });

  const handleSubmit = (employeeData: Omit<Employee, 'id'>) => {
    addEmployee(employeeData);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Employees</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      <EmployeeFilters
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <EmployeeForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
}