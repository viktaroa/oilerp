import { ComplianceAudit } from '../../types/qhse';

interface ComplianceStats {
  complianceRate: number;
  openFindings: number;
  criticalFindings: number;
}

export function getComplianceStats(audits: ComplianceAudit[]): ComplianceStats {
  const totalScore = audits.reduce((sum, audit) => sum + audit.score, 0);
  const averageScore = audits.length ? totalScore / audits.length : 0;

  const findings = audits.flatMap((audit) => audit.findings);
  const openFindings = findings.filter((f) => f.status !== 'closed').length;
  const criticalFindings = findings.filter(
    (f) => f.severity === 'critical' && f.status !== 'closed'
  ).length;

  return {
    complianceRate: Math.round(averageScore),
    openFindings,
    criticalFindings,
  };
}