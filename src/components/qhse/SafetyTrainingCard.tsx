import React from 'react';
import { GraduationCap, Calendar, Users } from 'lucide-react';
import type { SafetyTraining } from '../../types/qhse';
import { formatDate } from '../../utils/date';

interface SafetyTrainingCardProps {
  training: SafetyTraining;
  onComplete: (trainingId: string) => void;
}

export function SafetyTrainingCard({ training, onComplete }: SafetyTrainingCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
  };

  const completionRate = 
    (training.completedBy.length / training.assignedTo.length) * 100;

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[training.status]
          }`}
        >
          {training.status}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          Due: {formatDate(training.dueDate)}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {training.completedBy.length} of {training.assignedTo.length} completed
        </div>
      </div>

      <div className="mt-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                Completion Rate
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {completionRate.toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
            <div
              style={{ width: `${completionRate}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            />
          </div>
        </div>
      </div>

      {training.status !== 'completed' && (
        <button
          onClick={() => onComplete(training.id)}
          className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Mark as Completed
        </button>
      )}
    </div>
  );
}