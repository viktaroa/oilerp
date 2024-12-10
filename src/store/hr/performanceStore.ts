import { create } from 'zustand';
import type { PerformanceReview } from '../../types/hr';

interface PerformanceState {
  performanceReviews: PerformanceReview[];
  createPerformanceReview: (review: Omit<PerformanceReview, 'id'>) => void;
  updatePerformanceReview: (id: string, updates: Partial<PerformanceReview>) => void;
  acknowledgeReview: (id: string) => void;
  getReviewsByEmployee: (employeeId: string) => PerformanceReview[];
  getReviewsByStatus: (status: PerformanceReview['status']) => PerformanceReview[];
}

export const usePerformanceStore = create<PerformanceState>((set, get) => ({
  performanceReviews: [],

  createPerformanceReview: (review) =>
    set((state) => ({
      performanceReviews: [
        ...state.performanceReviews,
        { ...review, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),

  updatePerformanceReview: (id, updates) =>
    set((state) => ({
      performanceReviews: state.performanceReviews.map((review) =>
        review.id === id ? { ...review, ...updates } : review
      ),
    })),

  acknowledgeReview: (id) =>
    set((state) => ({
      performanceReviews: state.performanceReviews.map((review) =>
        review.id === id ? { ...review, status: 'acknowledged' } : review
      ),
    })),

  getReviewsByEmployee: (employeeId) => {
    return get().performanceReviews.filter(
      (review) => review.employeeId === employeeId
    );
  },

  getReviewsByStatus: (status) => {
    return get().performanceReviews.filter(
      (review) => review.status === status
    );
  },
}));