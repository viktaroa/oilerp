import { SafetyTraining } from '../../types/qhse';
import { isAfter } from 'date-fns';

interface TrainingProgress {
  Completed: number;
  'In Progress': number;
  Overdue: number;
}

export function getTrainingProgress(trainings: SafetyTraining[]): TrainingProgress {
  return trainings.reduce(
    (acc, training) => {
      if (training.status === 'completed') {
        acc.Completed++;
      } else if (isAfter(new Date(training.dueDate), new Date())) {
        acc['In Progress']++;
      } else {
        acc.Overdue++;
      }
      return acc;
    },
    { Completed: 0, 'In Progress': 0, Overdue: 0 }
  );
}