import { create } from 'zustand';

interface DashboardMetrics {
  totalOffers: number;
  activeOffers: number;
  todaysBookings: number;
  capacity: number;
  bookedSeats: number;
  availableSeats: number;
  conversionRate: number;
}

interface DashboardState {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  setMetrics: (metrics: DashboardMetrics) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: null,
  isLoading: false,
  setMetrics: (metrics) => set({ metrics }),
  setLoading: (isLoading) => set({ isLoading }),
}));
