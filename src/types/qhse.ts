// QHSE Types
export interface SafetyIncident {
  id: string;
  date: string;
  type: 'near-miss' | 'incident' | 'accident';
  description: string;
  location: string;
  reportedBy: string;
  status: 'open' | 'investigating' | 'closed';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  rootCause?: string;
  correctiveActions?: string[];
  witnesses?: string[];
  attachments?: string[];
}

export interface ComplianceAudit {
  id: string;
  date: string;
  type: 'internal' | 'external';
  department: string;
  auditor: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  findings: ComplianceFinding[];
  score: number;
}

export interface ComplianceFinding {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  status: 'open' | 'in-progress' | 'closed';
  assignedTo: string;
}

export interface SafetyTraining {
  id: string;
  title: string;
  type: 'mandatory' | 'optional';
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  assignedTo: string[];
  completedBy: string[];
}

export interface QHSEMetrics {
  incidentRate: number;
  severityRate: number;
  complianceRate: number;
  trainingCompletionRate: number;
  openFindings: number;
  lastIncidentDate: string;
}