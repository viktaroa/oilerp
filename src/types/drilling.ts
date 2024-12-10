interface Well {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    field: string;
    block: string;
  };
  status: 'planned' | 'drilling' | 'completed' | 'suspended' | 'abandoned';
  type: 'exploration' | 'development' | 'injection';
  depth: {
    planned: number;
    current: number;
    unit: 'meters' | 'feet';
  };
  spudDate?: string;
  completionDate?: string;
  operator: string;
  contractor: string;
  rigId: string;
  metrics: {
    lastIncident?: string;
    npTime: number;
    efficiency: number;
    costPerFoot: number;
  };
}

interface DrillingRig {
  id: string;
  name: string;
  type: 'offshore' | 'onshore';
  status: 'active' | 'standby' | 'maintenance' | 'mobilizing';
  capacity: {
    hookload: number;
    depth: number;
  };
  contractor: string;
  crew: {
    dayshift: number;
    nightshift: number;
  };
  location: {
    current: string;
    next?: string;
  };
  maintenance: {
    lastDate: string;
    nextDate: string;
    status: 'up-to-date' | 'due-soon' | 'overdue';
  };
}

interface DrillingOperation {
  id: string;
  wellId: string;
  rigId: string;
  currentDepth: number;
  phase: 'surface' | 'intermediate' | 'production' | 'completion';
  status: 'active' | 'paused' | 'completed';
  activities: DrillingActivity[];
  crew: CrewMember[];
  startDate: string;
  endDate?: string;
  metrics: {
    ropAvg: number;
    costToDate: number;
    daysToComplete: number;
    efficiency: number;
  };
}

interface DrillingActivity {
  id: string;
  operationId: string;
  type: 'drilling' | 'tripping' | 'casing' | 'cementing' | 'logging' | 'testing';
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  startTime: string;
  endTime?: string;
  depth: {
    start: number;
    end?: number;
  };
  parameters: {
    weight: number;
    rpm: number;
    torque: number;
    flow: number;
  };
  comments: string[];
}

interface CrewMember {
  id: string;
  name: string;
  position: string;
  shift: 'day' | 'night';
  certification: string[];
  hoursWorked: number;
}

interface DrillingMetrics {
  totalWells: number;
  activeWells: number;
  avgROP: number;
  avgEfficiency: number;
  totalNPT: number;
  costPerformance: number;
}

export type {
  Well,
  DrillingRig,
  DrillingOperation,
  DrillingActivity,
  CrewMember,
  DrillingMetrics,
};