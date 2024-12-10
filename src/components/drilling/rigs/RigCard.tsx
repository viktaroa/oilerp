import React from 'react';
import { Truck, Wrench, Users, MapPin } from 'lucide-react';
import type { DrillingRig } from '../../../types/drilling';
import { formatDate } from '../../../utils/date';

interface RigCardProps {
  rig: DrillingRig;
  onEdit: () => void;
}

export function RigCard({ rig, onEdit }: RigCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    standby: 'bg-yellow-100 text-yellow-800',
    maintenance: 'bg-orange-100 text-orange-800',
    mobilizing: 'bg-blue-100 text-blue-800',
  };

  const maintenanceStatusColors = {
    'up-to-date': 'text-green-600',
    'due-soon': 'text-yellow-600',
    overdue: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Truck className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{rig.name}</h3>
            <p className="text-sm text-gray-500">
              {rig.type.charAt(0).toUpperCase() + rig.type.slice(1)} Rig
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[rig.status]
          }`}
        >
          {rig.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Hookload Capacity</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {rig.capacity.hookload.toLocaleString()} lbs
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Depth Capacity</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {rig.capacity.depth.toLocaleString()} ft
          </p>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">
              Crew: {rig.crew.dayshift + rig.crew.nightshift}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{rig.location.current}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center">
          <Wrench className="h-4 w-4 mr-1" />
          <span className={`text-sm ${maintenanceStatusColors[rig.maintenance.status]}`}>
            Next Maintenance: {formatDate(rig.maintenance.nextDate)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onEdit}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit Rig
        </button>
      </div>
    </div>
  );
}