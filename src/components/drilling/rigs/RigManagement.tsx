import React from 'react';
import { Plus } from 'lucide-react';
import { RigList } from './RigList';
import { RigForm } from './RigForm';
import { RigMetrics } from './RigMetrics';
import { useDrillingStore } from '../../../store/drillingStore';

export function RigManagement() {
  const [showForm, setShowForm] = React.useState(false);
  const { addRig } = useDrillingStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Rig Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Rig
        </button>
      </div>

      <RigMetrics />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <RigForm
            onSubmit={(data) => {
              addRig(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <RigList />
      )}
    </div>
  );
}