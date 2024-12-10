import React from 'react';
import { Plus } from 'lucide-react';
import { usePerformanceStore, useEmployeeStore } from '../../../store/hr';
import { PerformanceReviewCard } from './PerformanceReviewCard';
import { PerformanceReviewForm } from './PerformanceReviewForm';
import { PerformanceStats } from './PerformanceStats';
import type { PerformanceReview } from '../../../types/hr';

export function PerformanceReviews() {
  const [showForm, setShowForm] = React.useState(false);
  const { performanceReviews, createPerformanceReview } = usePerformanceStore();
  const { employees } = useEmployeeStore();

  const handleSubmit = (data: Omit<PerformanceReview, 'id'>) => {
    createPerformanceReview(data);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Performance Reviews</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Review
        </button>
      </div>

      <PerformanceStats reviews={performanceReviews} />

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <PerformanceReviewForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            employees={employees}
          />
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {performanceReviews.map((review) => {
            const employee = employees.find(e => e.id === review.employeeId);
            return (
              <PerformanceReviewCard
                key={review.id}
                review={review}
                employeeName={employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee'}
              />
            );
          })}
          {performanceReviews.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">No performance reviews found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}