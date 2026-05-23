import { create } from 'zustand';

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  capacity: number;
  terms: string;
  status: 'active' | 'paused' | 'draft';
  businessId: string;
}

interface OffersState {
  offers: Offer[];
  selectedOffer: Offer | null;
  isLoading: boolean;
  setOffers: (offers: Offer[]) => void;
  setSelectedOffer: (offer: Offer | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useOffersStore = create<OffersState>((set) => ({
  offers: [],
  selectedOffer: null,
  isLoading: false,
  setOffers: (offers) => set({ offers }),
  setSelectedOffer: (offer) => set({ selectedOffer: offer }),
  setLoading: (isLoading) => set({ isLoading }),
}));
