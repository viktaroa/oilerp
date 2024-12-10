import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { SafetyMetrics } from '../components/qhse/SafetyMetrics';
import { IncidentCard } from '../components/qhse/IncidentCard';
import { IncidentForm } from '../components/qhse/IncidentForm';
import { ComplianceAuditCard } from '../components/qhse/ComplianceAuditCard';
import { SafetyTrainingCard } from '../components/qhse/SafetyTrainingCard';
import { useQHSEStore } from '../store/qhseStore';
import type { SafetyIncident, ComplianceAudit } from '../types/qhse';

export function QHSE() {
  const [activeTab, setActiveTab] = React.useState<'incidents' | 'audits' | 'training'>('incidents');
  const [showForm, setShowForm] = React.useState(false);
  const { 
    incidents, 
    audits, 
    trainings,
    addIncident, 
    updateIncidentStatus,
    completeTraining
  } = useQHSEStore();

  const handleIncidentSubmit = (incident: Omit<SafetyIncident, 'id'>) => {
    addIncident(incident);
    setShowForm(false);
  };

  const handleIncidentClick = (incident: SafetyIncident) => {
    const newStatus = incident.status === 'open' ? 'investigating' : 
                     incident.status === 'investigating' ? 'closed' : 'open';
    updateIncidentStatus(incident.id, newStatus);
  };

  const handleAuditClick = (audit: ComplianceAudit) => {
    // Handle audit click - could open a detailed view
    console.log('Audit clicked:', audit);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">QHSE Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Report Incident
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <SafetyMetrics />

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['incidents', 'audits', 'training'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Report New Incident</h2>
          <IncidentForm
            onSubmit={handleIncidentSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === 'incidents' && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {incidents.map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onClick={handleIncidentClick}
                />
              ))}
            </div>
          )}

          {activeTab === 'audits' && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {audits.map((audit) => (
                <ComplianceAuditCard
                  key={audit.id}
                  audit={audit}
                  onClick={handleAuditClick}
                />
              ))}
            </div>
          )}

          {activeTab === 'training' && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training) => (
                <SafetyTrainingCard
                  key={training.id}
                  training={training}
                  onComplete={completeTraining}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}