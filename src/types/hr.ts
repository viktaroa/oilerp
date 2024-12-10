export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  employmentType: 'full_time' | 'part_time' | 'contract';
  contact: {
    phone: string;
    address: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
  approvedBy?: string;
  approvalDate?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  date: string;
  period: string;
  ratings: {
    productivity: number;
    quality: number;
    initiative: number;
    teamwork: number;
    leadership: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  comments: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'acknowledged';
}

export interface CompensationRecord {
  id: string;
  employeeId: string;
  effectiveDate: string;
  type: 'salary' | 'bonus' | 'commission' | 'adjustment';
  amount: number;
  currency: string;
  frequency?: 'hourly' | 'monthly' | 'annual' | 'one-time';
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string;
  basePay: number;
  overtime: number;
  deductions: {
    tax: number;
    insurance: number;
    other: number;
  };
  allowances: {
    housing: number;
    transport: number;
    other: number;
  };
  netPay: number;
  status: 'pending' | 'processed' | 'cancelled';
  notes?: string;
}

export interface Benefit {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'life' | 'retirement' | 'other';
  provider: string;
  coverage: {
    individual: number;
    family: number;
  };
  eligibility: {
    minServiceMonths: number;
    employmentTypes: Employee['employmentType'][];
  };
  enrollmentPeriod: {
    start: string;
    end: string;
  };
  description: string;
  status: 'active' | 'inactive';
  enrolledEmployees: string[];
}

export interface BenefitEnrollment {
  id: string;
  employeeId: string;
  benefitId: string;
  coverageType: 'individual' | 'family';
  startDate: string;
  status: 'pending' | 'active' | 'terminated';
  dependents?: {
    name: string;
    relationship: string;
    dateOfBirth: string;
  }[];
}

export interface HRMetrics {
  totalEmployees: number;
  activeEmployees: number;
  turnoverRate: number;
  averageAttendance: number;
  leaveUtilization: number;
  averagePerformanceScore: number;
}