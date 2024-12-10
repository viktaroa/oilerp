import React from 'react';
import { Star, Calendar, User, Clock } from 'lucide-react';
import type { PerformanceReview } from '../../../types/hr';
import { formatDate } from '../../../utils/date';
import { usePerformanceStore } from '../../../store/hr/performanceStore';

interface PerformanceReviewCardProps {
  review: PerformanceReview;
  employeeName: string;
}

export function PerformanceReviewCard({ review, employeeName }: PerformanceReviewCardProps) {
  const { updatePerformanceReview, acknowledgeReview } = usePerformanceStore();
  
  const averageRating = Object.values(review.ratings).reduce((a, b) => a + b, 0) / 
    Object.values(review.ratings).length;

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    reviewed: 'bg-green-100 text-green-800',
    acknowledged: 'bg-purple-100 text-purple-800',
  };

  const handleStatusChange = (newStatus: PerformanceReview['status']) => {
    if (newStatus === 'acknowledged') {
      acknowledgeReview(review.id);
    } else {
      updatePerformanceReview(review.id, { status: newStatus });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{employeeName}</h3>
            <p className="text-sm text-gray-500">{review.period}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[review.status]
          }`}>
            {review.status}
          </span>
          {review.status !== 'acknowledged' && (
            <select
              value={review.status}
              onChange={(e) => handleStatusChange(e.target.value as PerformanceReview['status'])}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
              <option value="acknowledged">Acknowledged</option>
            </select>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(review.date)}
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Performance Ratings</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(review.ratings).map(([category, rating]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">{rating}/5</span>
                  <div className="ml-2 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Overall Rating</h4>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${(averageRating / 5) * 100}%` }}
              />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-900">
              {averageRating.toFixed(1)}/5
            </span>
          </div>
        </div>

        {review.strengths.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Strengths</h4>
            <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
              {review.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {review.areasForImprovement.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Areas for Improvement</h4>
            <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
              {review.areasForImprovement.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        )}

        {review.goals.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Goals</h4>
            <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
              {review.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
        )}

        {review.comments && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Comments</h4>
            <p className="text-sm text-gray-500">{review.comments}</p>
          </div>
        )}
      </div>
    </div>
  );
}