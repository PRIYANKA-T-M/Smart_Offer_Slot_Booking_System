import { create } from 'zustand';

interface BusinessProfile {
  id: string;
  name: string;
  type: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  logo?: string;
  openingTime: string;
  closingTime: string;
}

interface BusinessState {
  profile: BusinessProfile | null;
  isLoading: boolean;
  setProfile: (profile: BusinessProfile) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  profile: null,
  isLoading: false,
  setProfile: (profile) => set({ profile }),
  setLoading: (isLoading) => set({ isLoading }),
}));
