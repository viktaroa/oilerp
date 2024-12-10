import React from 'react';
import { Plus } from 'lucide-react';
import { CompensationList } from './CompensationList';
import { CompensationForm } from './CompensationForm';
import { CompensationStats } from './CompensationStats';
import { useHRStore } from '../../../store/hrStore';

export function CompensationManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { employees, addCompensationRecord } = useHRStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Compensation Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Compensation
        </button>
      </div>

      <CompensationStats />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <CompensationForm
            onSubmit={(data) => {
              addCompensationRecord(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <CompensationList />
      )}
    </div>
  );
}