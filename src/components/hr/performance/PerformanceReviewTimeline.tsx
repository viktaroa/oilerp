import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { PerformanceReview } from '../../../types/hr';
import { formatDate } from '../../../utils/date';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'upcoming';
}

interface PerformanceReviewTimelineProps {
  review: PerformanceReview;
}

export function PerformanceReviewTimeline({ review }: PerformanceReviewTimelineProps) {
  const events: TimelineEvent[] = [
    {
      date: review.date,
      title: 'Review Created',
      description: 'Performance review initiated',
      status: 'completed',
    },
    {
      date: review.date,
      title: 'Self Assessment',
      description: 'Employee self-evaluation phase',
      status: review.status === 'draft' ? 'pending' : 'completed',
    },
    {
      date: review.date,
      title: 'Manager Review',
      description: 'Manager evaluation and feedback',
      status: review.status === 'submitted' ? 'pending' : 
              review.status === 'draft' ? 'upcoming' : 'completed',
    },
    {
      date: review.date,
      title: 'Employee Acknowledgment',
      description: 'Review acknowledgment by employee',
      status: review.status === 'reviewed' ? 'pending' :
              review.status === 'acknowledged' ? 'completed' : 'upcoming',
    },
  ];

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.title}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.status === 'completed'
                        ? 'bg-green-500'
                        : event.status === 'pending'
                        ? 'bg-blue-500'
                        : 'bg-gray-200'
                    }`}
                  >
                    {event.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : event.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-white" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {formatDate(event.date)}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}