import React from 'react';
import { Plus } from 'lucide-react';
import { PayrollList } from './PayrollList';
import { PayrollForm } from './PayrollForm';
import { PayrollStats } from './PayrollStats';
import { useHRStore } from '../../../store/hrStore';

export function PayrollManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { employees, processPayroll } = useHRStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Payroll Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Process Payroll
        </button>
      </div>

      <PayrollStats />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <PayrollForm
            onSubmit={(data) => {
              processPayroll(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <PayrollList />
      )}
    </div>
  );
}