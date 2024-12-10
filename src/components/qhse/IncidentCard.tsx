import React from 'react';
import { AlertTriangle, Clock, MapPin, User } from 'lucide-react';
import type { SafetyIncident } from '../../types';
import { formatDate } from '../../utils/date';

interface IncidentCardProps {
  incident: SafetyIncident;
  onClick: (incident: SafetyIncident) => void;
}

export function IncidentCard({ incident, onClick }: IncidentCardProps) {
  const statusColors = {
    open: 'bg-red-100 text-red-800',
    investigating: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-green-100 text-green-800',
  };

  return (
    <div 
      onClick={() => onClick(incident)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}
          </h3>
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[incident.status]}`}>
          {incident.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">{incident.description}</p>
      <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {formatDate(incident.date)}
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {incident.location}
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          {incident.reportedBy}
        </div>
      </div>
    </div>
  );
}