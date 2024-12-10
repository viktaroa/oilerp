import React from 'react';
import { Star, TrendingUp, Users, Clock } from 'lucide-react';
import type { PerformanceReview } from '../../../types/hr';

interface PerformanceStatsProps {
  reviews: PerformanceReview[];
}

export function PerformanceStats({ reviews }: PerformanceStatsProps) {
  const stats = React.useMemo(() => {
    const totalReviews = reviews.length;
    const completedReviews = reviews.filter(r => r.status === 'reviewed' || r.status === 'acknowledged').length;
    const pendingReviews = reviews.filter(r => r.status === 'draft' || r.status === 'submitted').length;
    
    const averageScore = reviews
      .filter(r => r.status === 'reviewed' || r.status === 'acknowledged')
      .reduce((acc, review) => {
        const scores = Object.values(review.ratings);
        const reviewAverage = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        return acc + reviewAverage;
      }, 0) / (completedReviews || 1);

    const categoryAverages = reviews
      .filter(r => r.status === 'reviewed' || r.status === 'acknowledged')
      .reduce((acc, review) => {
        Object.entries(review.ratings).forEach(([category, rating]) => {
          acc[category] = (acc[category] || 0) + rating;
        });
        return acc;
      }, {} as Record<string, number>);

    Object.keys(categoryAverages).forEach(category => {
      categoryAverages[category] = categoryAverages[category] / completedReviews;
    });

    return {
      totalReviews,
      completedReviews,
      pendingReviews,
      averageScore,
      categoryAverages,
    };
  }, [reviews]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Reviews
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalReviews}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Reviews
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pendingReviews}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed Reviews
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.completedReviews}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Score
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.averageScore.toFixed(1)}/5
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
        <div className="space-y-4">
          {Object.entries(stats.categoryAverages).map(([category, average]) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm text-gray-500">{average.toFixed(1)}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(average / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}