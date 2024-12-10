import React from 'react';
import { Shield, Clock, AlertTriangle, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
}

function MetricCard({ title, value, icon: Icon, description }: MetricCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
            </dd>
            <dd className="text-sm text-gray-500">{description}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function SafetyMetrics() {
  const metrics = [
    {
      title: 'Days Without Incident',
      value: 145,
      icon: Shield,
      description: 'Last incident: 2023-10-15',
    },
    {
      title: 'Total Work Hours',
      value: '250,000',
      icon: Clock,
      description: 'Year to date',
    },
    {
      title: 'Near Misses',
      value: 3,
      icon: AlertTriangle,
      description: 'Last 30 days',
    },
    {
      title: 'Incident Rate',
      value: '0.5',
      icon: TrendingDown,
      description: 'Per 100 workers',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}