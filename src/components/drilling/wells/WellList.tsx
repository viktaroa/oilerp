import React from 'react';
import { MapPin, Activity, Calendar, AlertTriangle } from 'lucide-react';
import { useDrillingStore } from '../../../store/drillingStore';
import { formatDate } from '../../../utils/date';
import type { Well } from '../../../types/drilling';

interface WellCardProps {
  well: Well;
  onClick: (well: Well) => void;
}

function WellCard({ well, onClick }: WellCardProps) {
  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    drilling: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    suspended: 'bg-orange-100 text-orange-800',
    abandoned: 'bg-red-100 text-red-800',
  };

  return (
    <div
      onClick={() => onClick(well)}
      className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{well.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {well.location.field}, Block {well.location.block}
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[well.status]
          }`}
        >
          {well.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Current Depth</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {well.depth.current.toLocaleString()} {well.depth.unit}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {well.type.charAt(0).toUpperCase() + well.type.slice(1)}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Activity className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">
              Efficiency: {well.metrics.efficiency.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">
              {well.spudDate ? `Spud: ${formatDate(well.spudDate)}` : 'Not spudded'}
            </span>
          </div>
        </div>
        {well.metrics.lastIncident && (
          <div className="mt-2 flex items-center text-red-600">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-sm">Last Incident: {formatDate(well.metrics.lastIncident)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function WellList() {
  const { wells } = useDrillingStore();
  const [selectedWell, setSelectedWell] = React.useState<Well | null>(null);

  const handleWellClick = (well: Well) => {
    setSelectedWell(well);
    // TODO: Implement well details modal or navigation
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wells.map((well) => (
        <WellCard key={well.id} well={well} onClick={handleWellClick} />
      ))}
      {wells.length === 0 && (
        <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No wells</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new well.</p>
        </div>
      )}
    </div>
  );
}