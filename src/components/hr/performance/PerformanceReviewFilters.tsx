import React from 'react';
import { Filter } from 'lucide-react';
import type { PerformanceReview } from '../../../types/hr';

interface PerformanceReviewFiltersProps {
  selectedStatus: PerformanceReview['status'] | 'all';
  setSelectedStatus: (status: PerformanceReview['status'] | 'all') => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
}

export function PerformanceReviewFilters({
  selectedStatus,
  setSelectedStatus,
  selectedPeriod,
  setSelectedPeriod,
}: PerformanceReviewFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as PerformanceReview['status'] | 'all')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
              <option value="acknowledged">Acknowledged</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Periods</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}