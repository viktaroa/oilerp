import React from 'react';
import { ClipboardCheck, Calendar, User, BarChart } from 'lucide-react';
import type { ComplianceAudit } from '../../types/qhse';
import { formatDate } from '../../utils/date';

interface ComplianceAuditCardProps {
  audit: ComplianceAudit;
  onClick: (audit: ComplianceAudit) => void;
}

export function ComplianceAuditCard({ audit, onClick }: ComplianceAuditCardProps) {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div
      onClick={() => onClick(audit)}
      className="cursor-pointer rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <ClipboardCheck className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            {audit.type.charAt(0).toUpperCase() + audit.type.slice(1)} Audit
          </h3>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[audit.status]
          }`}
        >
          {audit.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(audit.date)}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <User className="h-4 w-4 mr-1" />
          {audit.auditor}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <BarChart className="h-4 w-4 mr-1" />
          Score: {audit.score}%
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium text-gray-900">Findings</div>
        <div className="mt-2 space-y-2">
          {audit.findings.slice(0, 2).map((finding) => (
            <div
              key={finding.id}
              className="text-sm text-gray-500 flex items-start"
            >
              <span
                className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                  finding.severity === 'critical'
                    ? 'bg-red-500'
                    : finding.severity === 'high'
                    ? 'bg-orange-500'
                    : finding.severity === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              />
              <span className="line-clamp-1">{finding.description}</span>
            </div>
          ))}
          {audit.findings.length > 2 && (
            <div className="text-sm text-blue-600">
              +{audit.findings.length - 2} more findings
            </div>
          )}
        </div>
      </div>
    </div>
  );
}