import React from 'react';
import { Plus } from 'lucide-react';
import { useRigStore } from '../../../store/drilling/rigStore';
import { RigCard } from './RigCard';
import { RigForm } from './RigForm';
import { RigStats } from './RigStats';
import type { DrillingRig } from '../../../types/drilling';

export function RigList() {
  const [showForm, setShowForm] = React.useState(false);
  const [selectedRig, setSelectedRig] = React.useState<DrillingRig | null>(null);
  const { rigs, addRig, updateRig } = useRigStore();

  const handleSubmit = (rigData: Omit<DrillingRig, 'id'>) => {
    if (selectedRig) {
      updateRig(selectedRig.id, rigData);
    } else {
      addRig(rigData);
    }
    setShowForm(false);
    setSelectedRig(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Rig Management</h2>
        <button
          onClick={() => {
            setSelectedRig(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Rig
        </button>
      </div>

      <RigStats rigs={rigs} />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <RigForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedRig(null);
            }}
            initialData={selectedRig || undefined}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rigs.map((rig) => (
            <RigCard
              key={rig.id}
              rig={rig}
              onEdit={() => {
                setSelectedRig(rig);
                setShowForm(true);
              }}
            />
          ))}
          {rigs.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">No rigs found. Add your first rig to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}