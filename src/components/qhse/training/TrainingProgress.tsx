import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useQHSEStore } from '../../../store/qhseStore';
import { getTrainingProgress } from '../../../utils/qhse/training';

export function TrainingProgress() {
  const trainings = useQHSEStore((state) => state.trainings);
  const progress = getTrainingProgress(trainings);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Training Progress</h3>
        <GraduationCap className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {Object.entries(progress).map(([status, count]) => (
          <div key={status} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{status}</span>
              <span className="font-medium text-gray-900">{count}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className={`h-full rounded-full ${
                  status === 'Completed'
                    ? 'bg-green-500'
                    : status === 'In Progress'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${(count / trainings.length) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}