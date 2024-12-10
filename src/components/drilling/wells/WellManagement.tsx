import React from 'react';
import { Plus } from 'lucide-react';
import { WellList } from './WellList';
import { WellForm } from './WellForm';
import { WellMetrics } from './WellMetrics';
import { useDrillingStore } from '../../../store/drillingStore';

export function WellManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { addWell } = useDrillingStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Well Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Well
        </button>
      </div>

      <WellMetrics />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <WellForm
            onSubmit={(data) => {
              addWell(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <WellList />
      )}
    </div>
  );
}