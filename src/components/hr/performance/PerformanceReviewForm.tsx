import React from 'react';
import type { PerformanceReview, Employee } from '../../../types/hr';
import { Star } from 'lucide-react';

interface PerformanceReviewFormProps {
  onSubmit: (review: Omit<PerformanceReview, 'id'>) => void;
  onCancel: () => void;
  employees: Employee[];
  initialData?: Partial<PerformanceReview>;
}

export function PerformanceReviewForm({
  onSubmit,
  onCancel,
  employees,
  initialData,
}: PerformanceReviewFormProps) {
  const [formData, setFormData] = React.useState<Omit<PerformanceReview, 'id'>>({
    employeeId: initialData?.employeeId || '',
    reviewerId: initialData?.reviewerId || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    period: initialData?.period || '',
    ratings: initialData?.ratings || {
      productivity: 3,
      quality: 3,
      initiative: 3,
      teamwork: 3,
      leadership: 3,
    },
    strengths: initialData?.strengths || [],
    areasForImprovement: initialData?.areasForImprovement || [],
    goals: initialData?.goals || [],
    comments: initialData?.comments || '',
    status: initialData?.status || 'draft',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleRatingChange = (category: keyof PerformanceReview['ratings'], value: number) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [category]: value,
      },
    });
  };

  const handleListChange = (
    field: 'strengths' | 'areasForImprovement' | 'goals',
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: value.split('\n').filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee</label>
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select Employee</option>
            {employees
              .filter((e) => e.status === 'active')
              .map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Review Period</label>
          <input
            type="text"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            placeholder="e.g., Q1 2024"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Review Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reviewer ID</label>
          <input
            type="text"
            value={formData.reviewerId}
            onChange={(e) => setFormData({ ...formData, reviewerId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-900">Performance Ratings</h4>
        {Object.entries(formData.ratings).map(([category, rating]) => (
          <div key={category}>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <span className="text-sm text-gray-500">{rating}/5</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    handleRatingChange(
                      category as keyof PerformanceReview['ratings'],
                      value
                    )
                  }
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Key Strengths</label>
        <textarea
          value={formData.strengths.join('\n')}
          onChange={(e) => handleListChange('strengths', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter each strength on a new line"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Areas for Improvement</label>
        <textarea
          value={formData.areasForImprovement.join('\n')}
          onChange={(e) => handleListChange('areasForImprovement', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter each area on a new line"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Goals</label>
        <textarea
          value={formData.goals.join('\n')}
          onChange={(e) => handleListChange('goals', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter each goal on a new line"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Review
        </button>
      </div>
    </form>
  );
}