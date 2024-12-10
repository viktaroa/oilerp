// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

// QHSE Types
export interface SafetyIncident {
  id: string;
  date: string;
  type: 'near-miss' | 'incident' | 'accident';
  description: string;
  location: string;
  reportedBy: string;
  status: 'open' | 'investigating' | 'closed';
}

// HR Types
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact: {
    email: string;
    phone: string;
  };
}

// Contractor Types
export interface Contractor {
  id: string;
  companyName: string;
  contractType: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending' | 'completed';
  services: string[];
}

// Drilling Operations Types
export interface DrillingOperation {
  id: string;
  wellName: string;
  location: string;
  startDate: string;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  depth: number;
  contractor: string;
}

// Accounting Types
export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}