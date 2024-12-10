import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Activity,
  DollarSign
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      name: 'Active Wells',
      value: '12',
      icon: Activity,
      change: '+2.5%',
      changeType: 'positive',
    },
    {
      name: 'Safety Incidents',
      value: '0',
      icon: AlertTriangle,
      change: '-80%',
      changeType: 'positive',
    },
    {
      name: 'Active Employees',
      value: '245',
      icon: Users,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Revenue (MTD)',
      value: '$2.4M',
      icon: DollarSign,
      change: '+10.18%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      <span className="ml-1">{stat.change}</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
            {/* Activity feed will go here */}
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Key Metrics</h3>
            {/* Charts will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}