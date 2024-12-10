import React from 'react';
import { Plus } from 'lucide-react';
import { BenefitsList } from './BenefitsList';
import { BenefitsForm } from './BenefitsForm';
import { BenefitsStats } from './BenefitsStats';
import { useHRStore } from '../../../store/hrStore';

export function BenefitsManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { employees, addBenefit } = useHRStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Benefits Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Benefit
        </button>
      </div>

      <BenefitsStats />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <BenefitsForm
            onSubmit={(data) => {
              addBenefit(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <BenefitsList />
      )}
    </div>
  );
}