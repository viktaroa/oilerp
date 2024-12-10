import { create } from 'zustand';
import type { Benefit, BenefitEnrollment } from '../../types/hr';

interface BenefitsState {
  benefits: Benefit[];
  benefitEnrollments: BenefitEnrollment[];
  addBenefit: (benefit: Omit<Benefit, 'id'>) => void;
  updateBenefit: (id: string, updates: Partial<Benefit>) => void;
  enrollInBenefit: (enrollment: Omit<BenefitEnrollment, 'id'>) => void;
  terminateBenefitEnrollment: (id: string) => void;
}

export const useBenefitsStore = create<BenefitsState>((set) => ({
  benefits: [],
  benefitEnrollments: [],

  addBenefit: (benefit) =>
    set((state) => ({
      benefits: [
        ...state.benefits,
        { ...benefit, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updateBenefit: (id, updates) =>
    set((state) => ({
      benefits: state.benefits.map((benefit) =>
        benefit.id === id ? { ...benefit, ...updates } : benefit
      ),
    })),

  enrollInBenefit: (enrollment) =>
    set((state) => ({
      benefitEnrollments: [
        ...state.benefitEnrollments,
        { ...enrollment, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  terminateBenefitEnrollment: (id) =>
    set((state) => ({
      benefitEnrollments: state.benefitEnrollments.map((enrollment) =>
        enrollment.id === id ? { ...enrollment, status: 'terminated' } : enrollment
      ),
    })),
}));